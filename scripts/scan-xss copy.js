// scripts/scan-xss.js

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(process.cwd(), "src");

const patterns = [
  { regex: /v-html=/g, label: "使用 v-html（需 DOMPurify）" },
  { regex: /innerHTML/g, label: "使用 innerHTML（需过滤）" },
  { regex: /outerHTML/g, label: "使用 outerHTML（需过滤）" },
  { regex: /document\.write/g, label: "使用 document.write（危险）" },
  { regex: /eval\(/g, label: "使用 eval（严重危险）" },
  { regex: /new Function/g, label: "使用 new Function（危险）" },
  { regex: /onerror=/g, label: "使用 onerror 属性（可能注入）" },
  { regex: /onclick=/g, label: "使用 onclick 属性（可能注入）" },
  { regex: /src=/g, label: "动态 src 属性（检查 URL 安全）" },
  { regex: /href=/g, label: "动态 href 属性（检查 URL 安全）" },
  { regex: /<script[\s\S]*?>[\s\S]*?<\/script>/g, label: "script 标签（注意内部内容）" },
  { regex: /:\s*src=/g, label: "绑定 src（需校验）" },
  { regex: /:\s*href=/g, label: "绑定 href（需校验）" },
  { regex: /dangerouslySetInnerHTML/g, label: "React 风险 API（如存在）" },
  { regex: /\+\s*['"`]<.*?>/g, label: "字符串拼接 HTML（潜在注入）" }
];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  let results = [];

  patterns.forEach(({ regex, label }) => {
    lines.forEach((line, idx) => {
      if (regex.test(line)) {
        results.push({
          file: filePath,
          line: idx + 1,
          label,
          code: line.trim()
        });
      }
    });
  });

  return results;
}

function walk(dir) {
  let results = [];

  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (
      fullPath.endsWith(".vue") ||
      fullPath.endsWith(".js") ||
      fullPath.endsWith(".ts")
    ) {
      results = results.concat(scanFile(fullPath));
    }
  });

  return results;
}

console.log("🔍 开始扫描 XSS 风险...\n");

const results = walk(ROOT);

if (results.length === 0) {
  console.log("✨ 未发现潜在 XSS 风险！");
  process.exit(0);
}

results.forEach((item, index) => {
  console.log(
    `\n${index + 1}. ⚠ 发现风险：${item.label}\n` +
    `文件: ${item.file}\n` +
    `行号: ${item.line}\n` +
    `代码: ${item.code}`
  );
});

console.log(`\n共发现 ${results.length} 个可疑点，请手动确认。\n`);
console.log("✔ 建议：v-html / innerHTML 的内容必须使用 DOMPurify 过滤。\n");
