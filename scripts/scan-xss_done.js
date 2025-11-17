/**
 * Vue2 XSS Scanner – 扩展版（含 :is 动态组件检测 + DOMPurify识别）
 */

const fs = require('fs');
const path = require('path');

// 输出路径
const REPORT_DIR = path.resolve(process.cwd(), 'xss-report');
if (!fs.existsSync(REPORT_DIR)) fs.mkdirSync(REPORT_DIR, { recursive: true });

const OUTPUT_JSON = path.join(REPORT_DIR, 'scan-xss-report.json');
const OUTPUT_HTML = path.join(REPORT_DIR, 'scan-xss-report.html');

// 扫描目录
const ROOT_DIR = path.resolve(process.cwd(), 'src');

// 需要忽略的文件或文件夹
const IGNORE_LIST = ['node_modules', 'dist', 'xss-report'];

/** 危险来源判断 */
const USER_INPUT_PATTERNS = [/\$route\.query\./, /\$route\.params\./, /query\./, /params\./, /form\./, /row\./, /item\./, /data\./, /props\./];

/** 扫描的 XSS 关键规则 */
const RULES = [
  {
    id: 'v-html',
    pattern: /v-html="?([^">]+)"?/g,
    level: 'HIGH',
    type: 'attribute',
    message: '使用 v-html 存在 XSS 风险，请使用 v-safe-html 或 DOMPurify 处理。'
  },
  {
    id: 'innerHTML',
    pattern: /\.innerHTML\s*=/g,
    level: 'HIGH',
    type: 'code',
    message: '直接使用 innerHTML 存在高危 XSS 风险，必须加 DOMPurify。'
  },
  {
    id: 'dangerous-url',
    pattern: /(href|src)\s*=\s*["']javascript:/gi,
    level: 'HIGH',
    type: 'attribute',
    message: '检测到 javascript: 协议，可被利用执行 XSS 攻击。'
  },
  {
    id: 'dynamic-is',
    pattern: /<component[^>]*:is="([^"]+)"[^>]*>/g,
    level: 'MEDIUM',
    type: 'component',
    message: '检测到动态组件 :is，需要确认来源是否可控。'
  }
];

/** 判断是否属于用户可控数据 */
function isUserControlled(value) {
  return USER_INPUT_PATTERNS.some(pattern => pattern.test(value));
}

/** 递归扫描目录 */
function scanDir(dir, results = []) {
  if (IGNORE_LIST.includes(path.basename(dir))) return results;

  const entries = fs.readdirSync(dir);

  for (const entry of entries) {
    const full = path.join(dir, entry);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) {
      scanDir(full, results);
    } else if (/\.(vue|js|ts|html)$/.test(entry)) {
      scanFile(full, results);
    }
  }
  return results;
}

/** 扫描单个文件 */
function scanFile(filePath, results) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  RULES.forEach(rule => {
    let match;
    while ((match = rule.pattern.exec(content)) !== null) {
      const rawMatch = match[0];
      const captured = match[1] || '';

      const lineNumber = content.substr(0, match.index).split('\n').length;

      let level = rule.level;
      let message = rule.message;

      // ====== DOMPurify 检测 ======
      const allLines = content.split('\n');
      if (rule.id === 'innerHTML') {
        const lineText = allLines[lineNumber - 1];
        // 检查本行或前一行是否有 DOMPurify
        const surrounding = allLines[lineNumber - 2] + ' ' + lineText;
        if (/DOMPurify\.sanitize\s*\(/.test(surrounding)) {
          level = 'LOW';
          message = 'innerHTML 已通过 DOMPurify.sanitize 处理，相对安全';
        }
      }

      // 针对 dynamic :is 做进一步检测
      if (rule.id === 'dynamic-is') {
        if (isUserControlled(captured)) {
          level = 'HIGH';
          message = '动态组件 :is 来自用户输入（高危）。请使用白名单过滤组件名称。';
        } else {
          level = 'LOW';
          message = '动态组件 :is 检测到，但未来自用户输入（相对安全）。最好仍采用白名单。';
        }
      }

      results.push({
        file: filePath,
        line: lineNumber,
        match: rawMatch.trim(),
        level,
        message
      });
    }
  });
}

/** 生成 HTML 报告（带颜色区分 + 序号） */
function generateHtml(results) {
  const rows = results
    .map((r, index) => {
      let textColor = '';
      switch (r.level) {
        case 'HIGH':
          textColor = '#e60000';
          break;
        case 'MEDIUM':
          textColor = '#e65c00';
          break;
        case 'LOW':
          textColor = '#0066cc';
          break;
        default:
          textColor = '#000000';
      }

      return `
      <tr>
        <td>${index + 1}</td>
        <td style="color: ${textColor};"><strong>${r.level}</strong></td>
        <td>${r.file}</td>
        <td>${r.line}</td>
        <td>${r.match.replace(/</g, '&lt;')}</td>
        <td>${r.message}</td>
      </tr>
      `;
    })
    .join('');

  return `
  <html>
    <head>
      <meta charset="utf-8" />
      <title>XSS 扫描报告</title>
      <style>
        body { font-family: Arial; padding: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 8px 12px; border: 1px solid #ccc; text-align: left; }
        th { background: #eee; }
        tr:nth-child(even) { background: #fafafa; }
        td:first-child { width: 50px; text-align: center; }
      </style>
    </head>
    <body>
      <h2>Vue2 XSS 扫描报告</h2>
      <p>共检测到 <strong>${results.length}</strong> 项可能的安全风险。</p>
      <table>
        <tr>
          <th>序号</th>
          <th style="width: 120px;">风险等级</th>
          <th>文件</th>
          <th>行号</th>
          <th>代码</th>
          <th>说明</th>
        </tr>
        ${rows}
      </table>
    </body>
  </html>`;
}

/** 主流程 */
function main() {
  console.log('🚀 开始扫描可能的 XSS 风险...');

  const results = scanDir(ROOT_DIR);

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(results, null, 2), 'utf8');
  fs.writeFileSync(OUTPUT_HTML, generateHtml(results), 'utf8');

  console.log(`✅ 扫描完成！共发现 ${results.length} 项可疑风险。`);
  console.log(`📁 报告已生成： ${OUTPUT_HTML}`);
}

main();
