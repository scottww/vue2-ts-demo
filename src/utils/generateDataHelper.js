// mockTableData.js

// 随机生成一条时间（格式：07-DD HH:mm）
function generateRandomTime() {
  const day = String(Math.floor(Math.random() * 30 + 1)).padStart(2, '0');
  const hour = String(Math.floor(Math.random() * 24)).padStart(2, '0');
  const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0');
  return `07-${day} ${hour}:${minute}`;
}

// 主方法：生成指定数量的 mock 数据
export function generateMockTableData(count = 100) {
  const types = ['位移', '沉降', '倾斜', '应力', '裂缝'];
  const names = ['名称名称', '名称名称位移名称', '中心监测点', '边坡站', '库区站'];

  return Array.from({ length: count }, (_, i) => ({
    id: i.toString(),
    index: i + 1,
    time: generateRandomTime(),
    name: names[Math.floor(Math.random() * names.length)],
    count: Math.floor(Math.random() * 5) + 1,
    type: types[Math.floor(Math.random() * types.length)],
    status: Math.random() > 0.3 ? 'online' : 'offline'
  }));
}

export function generateData(prefix, count, start = 1) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + start,
    name: `${prefix}${i + start}`
  }));
}
