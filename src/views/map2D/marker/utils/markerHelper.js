const STATUS_MAP = {
  正常: "normal",
  超汛: "overWarn",
  超保: "overProtect",
  
  // 雨量
  无降雨: '无降雨',
  '0_10': '0_10',
  '10_25': '10_25',
  '25_50': '25_50',
  '50_100': '50_100',
  '100_250': '100_250',
  '250_plus': '250_plus',
};

export function resolveMarkerStyle(typeConfig, markerData) {
  if (markerData.offline) {
    return typeConfig.offline;
  }

  const statusKey = STATUS_MAP[markerData.status] || "normal";
  return typeConfig[statusKey];
}
