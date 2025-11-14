/**
 * scanner-core.js
 * Vue2 XSS AST 扫描核心模块
 */

const fs = require("fs");
const path = require("path");
const babelParser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const compiler = require("vue-template-compiler");

const USER_CONTROLLED = [
  "$route.query",
  "$route.params",
  "query.",
  "params.",
  "form.",
  "item.",
  "row.",
  "data.",
  "props.",
  "req.",
  "res."
];

// -------------------------
// 判断是否用户可控数据
// -------------------------
function isUserControlled(str = "") {
  return USER_CONTROLLED.some(key => str.includes(key));
}

// -------------------------
// 解析 Vue 模板 AST
// -------------------------
function scanTemplateAst(templateContent, filePath, results) {
  const compiled = compiler.compile(templateContent);

  if (!compiled || !compiled.ast) return;

  function walk(node) {
    if (!node) return;

    // 检查 attributes
    if (node.attrsList) {
      node.attrsList.forEach(attr => {
        const name = attr.name;
        const value = attr.value || "";

        // 1. v-html
        if (name === "v-html") {
          results.push({
            file: filePath,
            line: node.start || 0,
            code: `${name}="${value}"`,
            level: "HIGH",
            rule: "v-html",
            message: "使用 v-html 极易造成 XSS，应使用 DOMPurify 或 v-safe-html。"
          });
        }

        // 2. v-text
        if (name === "v-text" && isUserControlled(value)) {
          results.push({
            file: filePath,
            line: node.start || 0,
            code: `${name}="${value}"`,
            level: "MEDIUM",
            rule: "v-text-user",
            message: "v-text 绑定用户输入，可能造成 XSS。请进行 sanitize。"
          });
        }

        // 3. 动态 src/href
        if (/^(v-bind:|:)src$/.test(name)) {
          if (/javascript:/i.test(value)) {
            results.push({
              file: filePath,
              line: node.start || 0,
              code: `${name}="${value}"`,
              level: "HIGH",
              rule: "javascript-src",
              message: "src 使用 javascript: 协议，属于高危 XSS。"
            });
          }
        }

        if (/^(v-bind:|:)href$/.test(name)) {
          if (/^(javascript:|data:)/i.test(value)) {
            results.push({
              file: filePath,
              line: node.start || 0,
              code: `${name}="${value}"`,
              level: "HIGH",
              rule: "javascript-href",
              message: "href 使用不安全协议。"
            });
          }
        }

        // 4. 动态组件 :is
        if (name === ":is" || name === "v-bind:is") {
          const level = isUserControlled(value) ? "HIGH" : "LOW";
          const msg = isUserControlled(value)
            ? "动态组件 :is 来自用户输入，高危。必须使用白名单过滤组件。"
            : "动态组件 :is 使用，建议加白名单校验。";

          results.push({
            file: filePath,
            line: node.start || 0,
            code: `${name}="${value}"`,
            level,
            rule: "dynamic-is",
            message: msg
          });
        }

        // 5. 动态指令 :[xxx]
        if (/^v-bind:\[.*\]/.test(name) || /^:\[.*\]/.test(name)) {
          results.push({
            file: filePath,
            line: node.start || 0,
            code: `${name}="${value}"`,
            level: "HIGH",
            rule: "dynamic-directive",
            message: "动态指令名称可能造成 sandbox escape，请避免将用户输入作为指令名。"
          });
        }

        // 6. 动态事件 @[xxx]
        if (/^@\[.*\]/.test(name)) {
          results.push({
            file: filePath,
            line: node.start || 0,
            code: `${name}="${value}"`,
            level: "HIGH",
            rule: "dynamic-event",
            message: "动态事件名可导致任意事件执行风险，应避免用户输入。"
          });
        }
      });
    }

    // 深度遍历 children
    if (node.children) {
      node.children.forEach(child => walk(child));
    }
  }

  walk(compiled.ast);
}

// -------------------------
// 扫描 <script> AST
// -------------------------
function scanScriptAst(scriptContent, filePath, results) {
  let ast = null;
  try {
    ast = babelParser.parse(scriptContent, {
      sourceType: "module",
      plugins: ["jsx", "typescript"]
    });
  } catch (e) {
    return; // ignore parse error
  }

  traverse(ast, {
    // innerHTML / outerHTML
    AssignmentExpression(path) {
      const left = path.node.left;
      const right = path.node.right;

      if (
        left.type === "MemberExpression" &&
        (left.property.name === "innerHTML" ||
          left.property.name === "outerHTML")
      ) {
        const code = scriptContent.substring(path.node.start, path.node.end);

        const level = isUserControlled(generateCode(right))
          ? "HIGH"
          : "MEDIUM";

        results.push({
          file: filePath,
          line: path.node.loc.start.line,
          code,
          level,
          rule: "innerHTML",
          message:
            "innerHTML/outerHTML 极易造成 XSS，必须使用 DOMPurify.sanitize()。"
        });
      }
    },

    // document.write
    CallExpression(path) {
      const callee = path.node.callee;

      // document.write
      if (
        callee.type === "MemberExpression" &&
        callee.object.name === "document" &&
        callee.property.name === "write"
      ) {
        const code = path.toString();
        results.push({
          file: filePath,
          line: path.node.loc.start.line,
          code,
          level: "HIGH",
          rule: "document.write",
          message: "document.write 存在 XSS 风险。"
        });
      }

      // eval
      if (callee.name === "eval") {
        results.push({
          file: filePath,
          line: path.node.loc.start.line,
          code: path.toString(),
          level: "HIGH",
          rule: "eval",
          message: "eval 可执行任意代码，高危漏洞。"
        });
      }

      // new Function
      if (
        callee.type === "Identifier" &&
        callee.name === "Function" &&
        path.parent.type === "NewExpression"
      ) {
        results.push({
          file: filePath,
          line: path.node.loc.start.line,
          code: path.toString(),
          level: "HIGH",
          rule: "new-function",
          message: "new Function 存在 XSS 代码注入风险。"
        });
      }
    },

    // setTimeout("code")
    CallExpression(path) {
      const calleeName =
        path.node.callee.name || (path.node.callee.property && path.node.callee.property.name);

      if (calleeName === "setTimeout" || calleeName === "setInterval") {
        const args = path.node.arguments;
        if (args.length > 0 && args[0].type === "StringLiteral") {
          results.push({
            file: filePath,
            line: path.node.loc.start.line,
            code: path.toString(),
            level: "HIGH",
            rule: "setTimeout-string",
            message: "setTimeout 传入字符串将被当成代码执行（XSS）。"
          });
        }
      }
    }
  });
}

// -------------------------
// 提取 .vue 文件的 template/script
// -------------------------
function parseVueFile(filePath, results) {
  const content = fs.readFileSync(filePath, "utf8");
  const parsed = compiler.parseComponent(content);

  if (parsed.template && parsed.template.content) {
    scanTemplateAst(parsed.template.content, filePath, results);
  }

  if (parsed.script && parsed.script.content) {
    scanScriptAst(parsed.script.content, filePath, results);
  }
}

module.exports = {
  scanTemplateAst,
  scanScriptAst,
  parseVueFile
};
