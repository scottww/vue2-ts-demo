export function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
export function loadData(key, fallback = []) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
}
export function exportJson(data, filename = '书法打卡备份.json') {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}
export function importJson(file, callback) {
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      callback(data);
    } catch {
      alert('导入失败，文件格式不正确');
    }
  };
  reader.readAsText(file);
}
