// scripts/astRules.ts
import * as t from "@babel/types";

export interface Issue {
  file: string;
  line: number;
  column: number;
  rule: string;
  detail: string;
}

export type RuleFn = (args: {
  file: string;
  code: string;
  ast: t.File;
  issues: Issue[];
}) => void;

// ---- 工具 ----
function pushIssue(
  issues: Issue[],
  file: string,
  node: t.Node,
  rule: string,
  detail: string
) {
  issues.push({
    file,
    line: node.loc?.start.line || 0,
    column: node.loc?.start.column || 0,
    rule,
    detail,
  });
}

// ---- 20+ 条规则 ----
export const rules: RuleFn[] = [

  // 1) innerHTML
  ({ file, ast, issues }) => {
    t.traverseFast(ast, (node) => {
      if (
        t.isAssignmentExpression(node) &&
        t.isMemberExpression(node.left) &&
        node.left.property &&
        "name" in node.left.property &&
        node.left.property.name === "innerHTML"
      ) {
        pushIssue(issues, file, node, "innerHTML-assign", "innerHTML 会导致严重 XSS 漏洞");
      }
    });
  },

  // 2) outerHTML
  ({ file, ast, issues }) => {
    t.traverseFast(ast, (node) => {
      if (
        t.isAssignmentExpression(node) &&
        t.isMemberExpression(node.left) &&
        "name" in node.left.property &&
        node.left.property.name === "outerHTML"
      ) {
        pushIssue(issues, file, node, "outerHTML", "outerHTML 可写入不可信 HTML");
      }
    });
  },

  // 3) dangerouslySetInnerHTML（react 项目也能扫）
  ({ file, ast, issues }) => {
    t.traverseFast(ast, (node) => {
      if (t.isJSXAttribute(node) && node.name.name === "dangerouslySetInnerHTML") {
        pushIssue(issues, file, node, "dangerous-React", "React dangerouslySetInnerHTML 存在 XSS 风险");
      }
    });
  },

  // 4) eval()
  ({ file, ast, issues }) => {
    t.traverseFast(ast, (node) => {
      if (t.isCallExpression(node) && t.isIdentifier(node.callee, { name: "eval" })) {
        pushIssue(issues, file, node, "eval", "eval 存在代码注入风险");
      }
    });
  },

  // 5) new Function
  ({ file, ast, issues }) => {
    t.traverseFast(ast, (node) => {
      if (t.isNewExpression(node) && t.isIdentifier(node.callee, { name: "Function" })) {
        pushIssue(issues, file, node, "new-Function", "new Function 存在执行注入风险");
      }
    });
  },

  // 6) document.write
  ({ file, ast, issues }) => {
    t.traverseFast(ast, (node) => {
      if (
        t.isCallExpression(node) &&
        t.isMemberExpression(node.callee) &&
        t.isIdentifier(node.callee.object, { name: "document" }) &&
        t.isIdentifier(node.callee.property, { name: "write" })
      ) {
        pushIssue(issues, file, node, "document.write", "document.write 存在 XSS 风险");
      }
    });
  },

  // 7) Vue template 中的 v-html
  ({ file, code, issues }) => {
    if (code.includes("v-html=")) {
      const reg = /v-html="([^"]+)"/g;
      let m;
      while ((m = reg.exec(code))) {
        issues.push({
          file,
          line: 0,
          column: 0,
          rule: "v-html",
          detail: `使用 v-html 渲染不可信内容：${m[1]}`,
        });
      }
    }
  },

  // 8) 动态组件 is=
  ({ file, code, issues }) => {
    if (code.includes(":is=") || code.includes("v-bind:is")) {
      issues.push({
        file,
        line: 0,
        column: 0,
        rule: "dynamic-component",
        detail: ":is 动态组件可能加载外部注入内容",
      });
    }
  },

  // 9) URL 注入（href/src）
  ({ file, code, issues }) => {
    const reg = /(href|src)=["']\{\{[^}]+\}\}/g;
    if (reg.test(code)) {
      issues.push({
        file,
        line: 0,
        column: 0,
        rule: "url-injection",
        detail: "href/src 存在模板拼接，可能为恶意 URL",
      });
    }
  },

  // 10) URL JS scheme
  ({ file, code, issues }) => {
    const reg = /(href|src)=["']javascript:/i;
    if (reg.test(code)) {
      issues.push({
        file,
        line: 0,
        column: 0,
        rule: "javascript-url",
        detail: "发现 javascript: URL，会触发 XSS",
      });
    }
  },

  // 11) setTimeout("string")
  ({ file, ast, issues }) => {
    t.traverseFast(ast, (node) => {
      if (
        t.isCallExpression(node) &&
        t.isIdentifier(node.callee, { name: "setTimeout" }) &&
        node.arguments.length &&
        t.isStringLiteral(node.arguments[0])
      ) {
        pushIssue(issues, file, node, "setTimeout-string", "setTimeout 执行字符串存在注入");
      }
    });
  },

  // 12) setInterval("string")
  ({ file, ast, issues }) => {
    t.traverseFast(ast, (node) => {
      if (
        t.isCallExpression(node) &&
        t.isIdentifier(node.callee, { name: "setInterval" }) &&
        node.arguments.length &&
        t.isStringLiteral(node.arguments[0])
      ) {
        pushIssue(issues, file, node, "setInterval-string", "setInterval 执行字符串存在注入");
      }
    });
  },

  // 13) window.location = 拼接字符串
  ({ file, ast, issues }) => {
    t.traverseFast(ast, (node) => {
      if (
        t.isAssignmentExpression(node) &&
        t.isMemberExpression(node.left) &&
        node.left.property &&
        "name" in node.left.property &&
        node.left.property.name === "location" &&
        t.isBinaryExpression(node.right)
      ) {
        pushIssue(issues, file, node, "location-assign", "window.location 拼接 URL 存在风险");
      }
    });
  },

  // 14) new URL(动态值)
  ({ file, ast, issues }) => {
    t.traverseFast(ast, (node) => {
      if (t.isNewExpression(node) && t.isIdentifier(node.callee, { name: "URL" })) {
        if (!t.isStringLiteral(node.arguments[0])) {
          pushIssue(issues, file, node, "new-URL", "URL() 参数不是字面量，可能造成注入");
        }
      }
    });
  },

  // 15) dangerously import() 动态路径
  ({ file, ast, issues }) => {
    t.traverseFast(ast, (node) => {
      if (t.isImportExpression(node) && !t.isStringLiteral(node.source)) {
        pushIssue(issues, file, node, "dynamic-import", "动态 import() 路径可能被注入");
      }
    });
  },

  // 16) Vue render() 中 h('tag', { domProps: { innerHTML: ... } })
  ({ file, ast, issues }) => {
    t.traverseFast(ast, (node) => {
      if (
        t.isObjectProperty(node) &&
        t.isIdentifier(node.key, { name: "domProps" }) &&
        t.isObjectExpression(node.value)
      ) {
        const htmlProp = node.value.properties.find(
          (p) => t.isObjectProperty(p) && t.isIdentifier(p.key, { name: "innerHTML" })
        );
        if (htmlProp) {
          pushIssue(issues, file, htmlProp, "render-innerHTML", "render 函数中使用 innerHTML");
        }
      }
    });
  },

  // 17) template {{ userInput }} + HTML 组合成标签
  ({ file, code, issues }) => {
    const reg = /\<[\w-]+\s+[^\>]*\{\{[^}]+\}\}/g;
    if (reg.test(code)) {
      issues.push({
        file,
        line: 0,
        column: 0,
        rule: "template-attr-binding",
        detail: "模板中属性包含变量，可能构造恶意 HTML",
      });
    }
  },

  // 18) 正则匹配 <script>{{ var }}</script>
  ({ file, code, issues }) => {
    if (/<script>[\s\S]*\{\{/.test(code)) {
      issues.push({
        file,
        line: 0,
        column: 0,
        rule: "script-template",
        detail: "script 标签中包含模板变量，存在注入风险",
      });
    }
  },

  // 19) Vue directive 传入未校验表达式
  ({ file, code, issues }) => {
    if (/v-\w+="\{\{/.test(code)) {
      issues.push({
        file,
        rule: "directive-injection",
        line: 0,
        column: 0,
        detail: "自定义指令的绑定值包含模板表达式，可能注入恶意内容",
      });
    }
  },

  // 20) style={{ userInput }}（Vue2 不支持，但项目可能有 jsx）
  ({ file, code, issues }) => {
    if (/style=\{\{[^}]+\}\}/.test(code)) {
      issues.push({
        file,
        line: 0,
        column: 0,
        rule: "style-object",
        detail: "style 中存在模板注入",
      });
    }
  },

  // 21) dangerously assign event handlers：@click="userInput"
  ({ file, code, issues }) => {
    if (/@\w+="\{\{[^}]+\}\}/.test(code)) {
      issues.push({
        file,
        rule: "event-injection",
        line: 0,
        column: 0,
        detail: "事件绑定中包含模板变量，可能执行注入代码",
      });
    }
  },

];
