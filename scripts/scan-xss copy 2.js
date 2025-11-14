/**
 * 超强版 Vue2 XSS 扫描器
 * 输出：console + JSON + HTML 报告
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(process.cwd(), "src");
// 输出目录（自动创建）
const REPORT_DIR = path.resolve(process.cwd(), "xss-report");
// 若不存在则创建目录
if (!fs.existsSync(REPORT_DIR)) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
}
const OUTPUT_JSON = path.resolve(REPORT_DIR, "scan-xss-report.json");
const OUTPUT_HTML = path.resolve(REPORT_DIR, "scan-xss-report.html");

console.log("🔍 开始扫描 Vue2 项目的 XSS 风险...\n");

// 扫描规则（可自行扩展）
const rules = [
  { regex: /v-html\s*=/g, label: "使用 v-html（需 DOMPurify）", level: "high" },
  { regex: /innerHTML/g, label: "innerHTML（需过滤）", level: "high" },
  { regex: /outerHTML/g, label: "outerHTML（需过滤）", level: "high" },
  { regex: /document\.write/g, label: "document.write（高危）", level: "critical" },
  { regex: /eval\(/g, label: "eval（最高危）", level: "critical" },
  { regex: /new Function/g, label: "new Function（高危）", level: "critical" },
  { regex: /onerror=/g, label: "onerror（可能注入）", level: "medium" },
  { regex: /onclick=/g, label: "onclick（可能注入）", level: "medium" },
  { regex: /:\s*src=/g, label: "绑定 src（需校验 URL）", level: "medium" },
  { regex: /:\s*href=/g, label: "绑定 href（需校验 URL）", level: "medium" },
  { regex: /<script[\s\S]*?>[\s\S]*?<\/script>/g, label: "script 标签（需检查内容）", level: "medium" },
  { regex: /\+\s*['"`]<.*?>/g, label: "字符串拼接 HTML（潜在注入）", level: "medium" },
  { regex: /:\s*is=/g, label: "动态组件注入风险（is）", level: "medium" },
];

// 扫描文件
function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");
  const result = [];

  rules.forEach(({ regex, label, level }) => {
    lines.forEach((line, idx) => {
      if (regex.test(line)) {
        result.push({
          file: filePath,
          line: idx + 1,
          level,
          type: label,
          code: line.trim()
        });
      }
    });
  });

  return result;
}

// 遍历目录
function walk(dir) {
  let files = [];

  fs.readdirSync(dir).forEach((file) => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      files = files.concat(walk(full));
    } else if (/\.(vue|js|ts)$/.test(full)) {
      files = files.concat(scanFile(full));
    }
  });

  return files;
}

const results = walk(ROOT);

// 彩色输出工具
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
};

function colorLevel(level) {
  switch (level) {
    case "critical":
      return colors.red;
    case "high":
      return colors.red;
    case "medium":
      return colors.yellow;
    default:
      return colors.green;
  }
}

// 控制台输出
if (results.length === 0) {
  console.log(colors.green + "✨ 没有发现潜在 XSS 风险！" + colors.reset);
} else {
  console.log(`⚠ 共发现 ${results.length} 个可能的 XSS 风险：\n`);

  results.forEach((item, i) => {
    const c = colorLevel(item.level);
    console.log(
      `${c}${i + 1}. [${item.level.toUpperCase()}] ${item.type}${colors.reset}`
    );
    console.log(`文件: ${item.file}`);
    console.log(`行号: ${item.line}`);
    console.log(`代码: ${item.code}\n`);
  });
}

// 输出 JSON 报告
fs.writeFileSync(OUTPUT_JSON, JSON.stringify(results, null, 2), "utf8");
console.log(`📄 JSON 报告: ${OUTPUT_JSON}`);

// 输出 HTML 报告
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>XSS 扫描报告</title>
  <style>
    body { font-family: Arial; padding: 20px; }
    h1 { color: #d9534f; }
    .item { border-bottom: 1px solid #ccc; margin-bottom: 15px; padding-bottom: 10px; }
    .critical { color: red; }
    .high { color: orangered; }
    .medium { color: #f0ad4e; }
  </style>
</head>
<body>
  <h1>Vue2 XSS 扫描报告</h1>
  <p>共发现 ${results.length} 个风险点</p>
  ${results
    .map(
      (r) => `
      <div class="item ${r.level}">
        <b>[${r.level.toUpperCase()}] ${r.type}</b><br/>
        文件：${r.file} <br/>
        行号：${r.line} <br/>
        <pre>${r.code}</pre>
      </div>
    `
    )
    .join("")}
</body>
</html>
`;

fs.writeFileSync(OUTPUT_HTML, htmlContent, "utf8");
console.log(`📄 HTML 报告: ${OUTPUT_HTML}\n`);

console.log("✔ 扫描完成！");
