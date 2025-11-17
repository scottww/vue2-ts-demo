/**
 * Vue2 XSS Scanner – SFC 版本（AST + DOMPurify + 异步扫描 + 白名单）
 */

const fs = require("fs").promises;
const path = require("path");
const babelParser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { parse: parseSFC } = require("@vue/compiler-sfc");

// 输出路径
const REPORT_DIR = path.resolve(process.cwd(), "xss-report");
const OUTPUT_JSON = path.join(REPORT_DIR, "scan-xss-report.json");
const OUTPUT_HTML = path.join(REPORT_DIR, "scan-xss-report.html");

// 扫描目录
const ROOT_DIR = path.resolve(process.cwd(), "src");

// 忽略目录（支持正则）
const IGNORE_REGEX = /node_modules|dist|xss-report|\.git|\.vscode/;

// 动态组件白名单
const COMPONENT_WHITELIST = ["MyButton", "MyDialog", "SafeComponent"];

// 用户输入判断
const USER_INPUT_PATTERNS = [
  /\$route\.query\./,
  /\$route\.params\./,
  /query\./,
  /params\./,
  /form\./,
  /row\./,
  /item\./,
  /data\./,
  /props\./
];

// 扫描规则
const RULES_TEMPLATE = [
  {
    id: "v-html",
    pattern: /v-html="?([^">]+)"?/g,
    level: "HIGH",
    type: "attribute",
    message: "使用 v-html 存在 XSS 风险，请使用 v-safe-html 或 DOMPurify 处理。"
  },
  {
    id: "dynamic-is",
    pattern: /<component[^>]*:is="([^"]+)"[^>]*>/g,
    level: "MEDIUM",
    type: "component",
    message: "动态组件 :is 检测，需要确认来源是否安全。"
  }
];

// 判断用户可控
function isUserControlled(value) {
  return USER_INPUT_PATTERNS.some((pattern) => pattern.test(value));
}

// 递归异步扫描目录
async function scanDir(dir, results = []) {
  if (IGNORE_REGEX.test(dir)) return results;

  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await scanDir(fullPath, results);
    } else if (/\.(vue|js|ts|html)$/.test(entry.name)) {
      await scanFile(fullPath, results);
    }
  }
  return results;
}

// 扫描单文件
async function scanFile(filePath, results) {
  const content = await fs.readFile(filePath, "utf8");
  const lines = content.split("\n");

  if (filePath.endsWith(".vue")) {
    // --- 处理 .vue 文件 ---
    const sfc = parseSFC(content);

    // 1️⃣ template 检测 v-html + :is
    if (sfc.descriptor.template) {
      const templateContent = sfc.descriptor.template.content;
      RULES_TEMPLATE.forEach((rule) => {
        let match;
        while ((match = rule.pattern.exec(templateContent)) !== null) {
          const rawMatch = match[0];
          const captured = match[1] || "";
          const lineNumber = templateContent
            .substr(0, match.index)
            .split("\n").length;
          let level = rule.level;
          let message = rule.message;

          if (rule.id === "dynamic-is") {
            if (isUserControlled(captured)) {
              level = "HIGH";
              message =
                "动态组件 :is 来自用户输入（高危），请使用白名单过滤组件名称。";
            } else if (!COMPONENT_WHITELIST.includes(captured)) {
              level = "MEDIUM";
              message = "动态组件 :is 未在白名单中，建议添加白名单。";
            } else {
              level = "LOW";
              message = "动态组件 :is 在白名单中，相对安全。";
            }
          }

          results.push({
            ruleId: rule.id,
            file: filePath,
            line: lineNumber,
            column: match.index,
            match: rawMatch.trim(),
            level,
            message
          });
        }
      });
    }

    // 2️⃣ script 检测 innerHTML + DOMPurify
    const scriptContent =
      sfc.descriptor.script?.content ||
      sfc.descriptor.scriptSetup?.content ||
      "";
    await scanScriptContent(scriptContent, filePath, results);
  } else if (/\.(js|ts)$/.test(filePath)) {
    // --- 处理 JS/TS 文件 ---
    await scanScriptContent(content, filePath, results);
  }
}

// AST 分析 script 内容
async function scanScriptContent(scriptContent, filePath, results) {
  if (!scriptContent) return;

  try {
    const ast = babelParser.parse(scriptContent, {
      sourceType: "module",
      plugins: [
        "typescript",
        "jsx",
        ["decorators", { legacy: true }], // 加上 decorators-legacy, 支持 TypeScript/Vue 2 装饰器语法（@Component 等）
        "classProperties" // 支持类属性 @Prop() myProp!: string;
      ]
    });

    traverse(ast, {
      AssignmentExpression(pathNode) {
        const left = pathNode.node.left;
        const right = pathNode.node.right;

        if (
          left.type === "MemberExpression" &&
          left.property.type === "Identifier" &&
          left.property.name === "innerHTML"
        ) {
          let level = "HIGH";
          let message = "直接使用 innerHTML 存在高危 XSS 风险";

          // 检查 DOMPurify
          if (
            right.type === "CallExpression" &&
            right.callee.type === "MemberExpression" &&
            right.callee.object.name === "DOMPurify" &&
            right.callee.property.name === "sanitize"
          ) {
            level = "LOW";
            message = "innerHTML 已通过 DOMPurify.sanitize 处理，相对安全";
          }

          results.push({
            ruleId: "innerHTML",
            file: filePath,
            line: pathNode.node.loc.start.line,
            column: pathNode.node.loc.start.column,
            match: scriptContent
              .split("\n")
              [pathNode.node.loc.start.line - 1].trim(),
            level,
            message
          });
        }
      }
    });
  } catch (err) {
    console.warn(`⚠️ AST 解析失败: ${filePath}`, err.message);
  }
}

// 生成 HTML 报告
function generateHtml0(results) {
  const rows = results
    .map((r, idx) => {
      const colorMap = { HIGH: "#e60000", MEDIUM: "#e65c00", LOW: "#0066cc" };
      const textColor = colorMap[r.level] || "#000";

      let context = "";
      try {
        const content = fs.readFileSync(r.file, "utf8").split("\n");
        const start = Math.max(0, r.line - 2);
        const end = Math.min(content.length, r.line + 1);
        context = content
          .slice(start, end)
          .map((l, i) => `${start + i + 1}: ${l}`)
          .join("<br>");
      } catch {}

      return `
      <tr>
        <td>${idx + 1}</td>
        <td style="color: ${textColor};"><strong>${r.level}</strong></td>
        <td>${r.file}</td>
        <td>${r.line}</td>
        <td>${r.column}</td>
        <td>${r.match.replace(/</g, "&lt;")}</td>
        <td>${context}</td>
        <td>${r.message}</td>
      </tr>`;
    })
    .join("");

  return `
  <html>
  <head>
    <meta charset="utf-8">
    <title>XSS 扫描报告</title>
    <style>
      body { font-family: Arial; padding: 20px; }
      table { width: 100%; border-collapse: collapse; }
      th, td { padding: 8px 12px; border: 1px solid #ccc; text-align: left; vertical-align: top; }
      th { background: #eee; }
      tr:nth-child(even) { background: #fafafa; }
      td:first-child { width: 50px; text-align: center; }
      #search { margin-bottom: 10px; padding: 5px; width: 300px; }
    </style>
  </head>
  <body>
    <h2>Vue2 XSS 扫描报告</h2>
    <p>共检测到 <strong>${results.length}</strong> 项可能的安全风险。</p>
    <input id="search" placeholder="搜索文件/代码..." oninput="filter(this.value)">
    <table id="report">
      <tr>
        <th>序号</th>
        <th>风险等级</th>
        <th>文件</th>
        <th>行号</th>
        <th>列号</th>
        <th>代码</th>
        <th>上下文</th>
        <th>说明</th>
      </tr>
      ${rows}
    </table>
    <script>
      function filter(val) {
        val = val.toLowerCase();
        document.querySelectorAll('#report tr').forEach((tr, i) => {
          if(i===0) return;
          tr.style.display = tr.innerText.toLowerCase().includes(val) ? '' : 'none';
        });
      }
    </script>
  </body>
  </html>`;
}

function generateHtml(results) {
  const rows = results
    .map((r, index) => {
      let textColor = "";
      switch (r.level) {
        case "HIGH":
          textColor = "#e60000";
          break;
        case "MEDIUM":
          textColor = "#e65c00";
          break;
        case "LOW":
          textColor = "#0066cc";
          break;
        default:
          textColor = "#000000";
      }

      return `
      <tr>
        <td>${index + 1}</td>
        <td style="color: ${textColor};"><strong>${r.level}</strong></td>
        <td>${r.file}</td>
        <td>${r.line}</td>
        <td><pre style="white-space: pre-wrap; word-wrap: break-word;">${r.match.replace(
          /</g,
          "&lt;"
        )}</pre></td>
        <td>${r.message}</td>
      </tr>
      `;
    })
    .join("");

  return `
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Vue2 XSS 扫描报告</title>
      <style>
        body {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          padding: 20px;
          background: #f9f9f9;
        }
        h2 {
          color: #333;
        }
        .table-container {
          max-height: 75vh;
          overflow: auto;
          border: 1px solid #ccc;
          // border-radius: 8px;
          background: #fff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
        }
        th, td {
          padding: 10px 12px;
          border-bottom: 1px solid #eee;
          text-align: left;
          vertical-align: top;
        }
        th {
          position: sticky;
          top: 0;
          background: #fafafa;
          z-index: 2;
          box-shadow: inset 0 -1px #ccc;
        }
        th.index{
          width: 80px;
        }
        th:before {
          position: absolute;
          top: 50%;
          inset-inline-end: 0;
          width: 1px;
          height: 1.6em;
          background-color: #f0f0f0;
          transform: translateY(-50%);
          transition: background-color 0.2s;
          content: "";
        }
        tr:nth-child(even) { background: #fafafa; }
        tr:hover { background: #f0f8ff; }
        td:first-child { width: 50px; }
        td:nth-child(2) { width: 100px; }
        td:nth-child(4) { width: 60px; }
        td:nth-child(5) { word-break: break-word; max-width: 400px; }
        pre { margin: 0; font-family: monospace; font-size: 13px; }
        #search { margin-bottom: 10px; padding: 5px; width: 300px; }
        @media (max-width: 768px) {
          .table-container { overflow-x: auto; }
          table { min-width: 700px; }
        }
      </style>
    </head>
    <body>
      <h2>Vue2 XSS 扫描报告</h2>
      <p>共检测到 <strong>${results.length}</strong> 项可能的安全风险。</p>
      <input id="search" placeholder="搜索文件/代码..." oninput="filter(this.value)">
      <div class="table-container">
        <table id="report">
          <thead>
            <tr>
              <th class="index">序号</th>
              <th>风险等级</th>
              <th>文件</th>
              <th>行号</th>
              <th>代码</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
      <script>
      function filter(val) {
        val = val.toLowerCase();
        document.querySelectorAll('#report tr').forEach((tr, i) => {
          if(i===0) return;
          tr.style.display = tr.innerText.toLowerCase().includes(val) ? '' : 'none';
        });
      }
    </script>
    </body>
  </html>`;
}

// 主流程
(async function main() {
  try {
    await fs.mkdir(REPORT_DIR, { recursive: true });
    console.log("🚀 开始扫描可能的 XSS 风险...");
    const results = await scanDir(ROOT_DIR);
    await fs.writeFile(OUTPUT_JSON, JSON.stringify(results, null, 2), "utf8");
    await fs.writeFile(OUTPUT_HTML, generateHtml(results), "utf8");
    console.log(`✅ 扫描完成！共发现 ${results.length} 项可疑风险。`);
    console.log(`📁 报告已生成： ${OUTPUT_HTML}`);
  } catch (err) {
    console.error("扫描失败：", err);
  }
})();
