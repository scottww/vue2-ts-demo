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
  // const names = ['名称名称', '中心监测点', '边坡站', '库区站'];
  const names = ['名称名称']
  const devices  = ['1#闸', '1#泵'];
  // 水情
  const waterLevelNames = ['**灌片1-1'];
  const waterLevelValue = ['1.52'];
  // 雨情
  const rainfallNames = ['名称名称']
  const rainfallValue = ['1.5'];
  // 工情
  // 流量
  const instantFlows = ['1.03'];
  const totalWaterValues = ['1289.35'];
  // 水质
  const waterQualityNames = ['名称名称']
  const ph = ['7.59'];
  const temperature = ['22.71'];

  return Array.from({ length: count }, (_, i) => ({
    id: i.toString(),
    index: i + 1,
    time: generateRandomTime(),
    name: names[Math.floor(Math.random() * names.length)],
    count: Math.floor(Math.random() * 5) + 1,
    type: types[Math.floor(Math.random() * types.length)],
    device: devices[Math.floor(Math.random() * devices.length)],
    waterLevelName: waterLevelNames[Math.floor(Math.random() * waterLevelNames.length)],
    waterLevel: waterLevelValue[Math.floor(Math.random() * waterLevelValue.length)],
    rainfallName: rainfallNames[Math.floor(Math.random() * rainfallNames.length)],
    rainfall: rainfallValue[Math.floor(Math.random() * rainfallValue.length)],
    instantFlow: instantFlows[Math.floor(Math.random() * instantFlows.length)],
    totalWaterValue: totalWaterValues[Math.floor(Math.random() * totalWaterValues.length)],
    ph: ph[Math.floor(Math.random() * ph.length)],
    temperature: temperature[Math.floor(Math.random() * temperature.length)],
    status: Math.random() > 0.3 ? 'online' : 'offline'
  }));
}

export function generateData(prefix, count, start = 1) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + start,
    name: `${prefix}${i + start}`
  }));
}
