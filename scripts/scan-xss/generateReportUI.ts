// scripts/generateReportUI.ts
import fs from "fs";

export function generateReportHTML(issues: any[]) {
  const grouped = issues.reduce((acc, i) => {
    acc[i.file] = acc[i.file] || [];
    acc[i.file].push(i);
    return acc;
  }, {});

  const html = `
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8" />
<title>XSS Scan Report</title>
<style>
body {
  font-family: Arial, sans-serif;
  background: white;
  padding: 20px;
}
h1 {
  font-size: 26px;
}
.file-block {
  margin-bottom: 25px;
  border: 1px solid #eee;
  padding: 10px 20px;
  border-radius: 6px;
}
.file-title {
  font-size: 18px;
  cursor: pointer;
  margin: 0;
  padding: 10px;
  background: #fafafa;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 12px;
}
th, td {
  padding: 8px 12px;
  border-bottom: 1px solid #eee;
}
th {
  text-align: left;
  background: #f8f8f8;
}
</style>
<script>
function toggle(id){
  const el = document.getElementById(id);
  el.style.display = el.style.display === "none" ? "block" : "none";
}
</script>
</head>

<body>
<h1>XSS 扫描报告（共 ${issues.length} 个问题）</h1>

${Object.entries(grouped)
  .map(
    ([file, list], idx) => `
<div class="file-block">
  <h3 class="file-title" onclick="toggle('tb${idx}')">${file}（${list.length}）</h3>
  <table id="tb${idx}" style="display:none">
    <tr>
      <th>规则</th>
      <th>说明</th>
      <th>位置</th>
    </tr>
    ${list
      .map(
        (x) => `
      <tr>
        <td>${x.rule}</td>
        <td>${x.detail}</td>
        <td>${x.line}:${x.column}</td>
      </tr>`
      )
      .join("")}
  </table>
</div>
`
  )
  .join("")}

</body>
</html>
`;

  return html;
}
