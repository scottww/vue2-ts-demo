// scripts/scan-xss/scan-xss-ast.ts
const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const rules = require("./astRules").rules;
const generateReportHTML = require("./generateReportUI").generateReportHTML;

const ignoreList = ["node_modules", "dist", "xss-report"];

function walk(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  files.forEach((file: string) => {
    const full = path.join(dir, file);
    if (ignoreList.some((x) => full.includes(x))) return;
    if (fs.statSync(full).isDirectory()) {
      walk(full, fileList);
    } else if (/\.(vue|js|ts)$/.test(full)) {
      fileList.push(full);
    }
  });
  return fileList;
}

function scanFile(file: string): any[] {
  const code = fs.readFileSync(file, "utf8");
  const issues: any[] = [];
  let ast: any;
  try {
    ast = parser.parse(code, {
      sourceType: "module",
      plugins: ["typescript", "jsx"],
    });
  } catch (e) {
    return [];
  }
  rules.forEach((rule: Function) => rule({ file, code, ast, issues }));
  return issues;
}

function main() {
  const root = path.resolve("./src");
  const reportDir = path.resolve("./xss-report");
  if (!fs.existsSync(reportDir)) fs.mkdirSync(reportDir);

  const files = walk(root);
  let allIssues: any[] = [];

  files.forEach((file: string) => {
    const issues = scanFile(file);
    allIssues = allIssues.concat(issues);
  });

  const html = generateReportHTML(allIssues);
  fs.writeFileSync(path.join(reportDir, "index.html"), html);

  console.log(`扫描完成！发现 ${allIssues.length} 个潜在 XSS 问题`);
  console.log("报告已生成：xss-report/index.html");
}

main();
