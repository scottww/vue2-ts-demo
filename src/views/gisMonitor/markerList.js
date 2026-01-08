// 水情监测
export const WATER_MARKER_LIST = [
  {
    name: "水情监测",
    type: "water",
    icon: "",
    list: [
      { name: "水情1", type: "water", longitude: 119.62, latitude: 30.62, value: "1.2", threshold1: 2, threshold2: 2, status: "正常", offline: false },
      { name: "水情2", type: "water", longitude: 119.74, latitude: 30.68, value: "1.2", threshold1: 2, threshold2: 2, status: "超汛", offline: false },
      { name: "水情3", type: "water", longitude: 119.55, latitude: 30.58, value: "1.2", threshold1: 2, threshold2: 2, status: "超保", offline: true }
    ]
  }
];

// 雨情监测
export const RAIN_MARKER_LIST = [
  {
    name: "雨情监测",
    type: "rain",
    icon: "",
    list: [
      { name: "雨量站1", type: "rain", longitude: 119.80, latitude: 30.70, value: "12.4", threshold1: 30, threshold2: 50, status: "无降雨", offline: false },
      { name: "雨量站2", type: "rain", longitude: 119.68, latitude: 30.75, value: "38.6", threshold1: 30, threshold2: 50, status: "0_10", offline: false },
      { name: "雨量站3", type: "rain", longitude: 119.50, latitude: 30.60, value: "0.0", threshold1: 30, threshold2: 50, status: "10_25", offline: true }
    ]
  }
];

// 工情监测
export const PROJECT_MARKER_LIST = [
  {
    name: "工情监测",
    type: "project",
    icon: "",
    list: [
      { name: "闸门1", type: "gate", longitude: 119.66, latitude: 30.66, value: "开启", status: "闸门开启", offline: false },
      { name: "泵组1", type: "pump", longitude: 119.78, latitude: 30.60, value: "开启", status: "泵组开启", offline: false },
      { name: "闸门2", type: "gate", longitude: 119.58, latitude: 30.72, value: "关闭", status: "闸门关闭", offline: false }
    ]
  }
];

// 流量监测
export const FLOW_MARKER_LIST = [
  {
    name: "流量监测",
    type: "flow",
    icon: "",
    list: [
      { name: "流量站1", type: "flow", longitude: 119.70, latitude: 30.55, value: "86.3", threshold1: 100, threshold2: 150, status: "正常", offline: false },
      { name: "流量站2", type: "flow", longitude: 119.85, latitude: 30.65, value: "128.5", threshold1: 100, threshold2: 150, status: "异常", offline: false },
      { name: "流量站2", type: "flow", longitude: 119.90, latitude: 30.65, value: "120.5", threshold1: 100, threshold2: 150, status: "离线", offline: true }
    ]
  }
];

// 水质监测
export const WATER_QUALITY_MARKER_LIST = [
  {
    name: "水质监测",
    type: "waterQuality",
    icon: "",
    list: [
      { name: "水质点1", type: "waterQuality", longitude: 119.60, latitude: 30.78, value: "Ⅱ类", status: "正常", offline: false },
      { name: "水质点2", type: "waterQuality", longitude: 119.72, latitude: 30.63, value: "Ⅲ类", status: "预警", offline: false },
      { name: "水质点3", type: "waterQuality", longitude: 119.48, latitude: 30.52, value: "--", status: "离线", offline: true }
    ]
  }
];

// 安全监测
export const SAFETY_MARKER_LIST = [
  {
    name: "安全监测",
    type: "safety",
    icon: "",
    list: [
      { name: "位移监测点1", type: "safety", longitude: 119.65, latitude: 30.70, value: "2.1", status: "正常", offline: false },
      { name: "位移监测点2", type: "safety", longitude: 119.82, latitude: 30.58, value: "6.8", status: "预警", offline: false }
    ]
  }
];

// 土壤监测
export const SOIL_MARKER_LIST = [
  {
    name: "土壤监测",
    type: "soil",
    icon: "",
    list: [
      { name: "土壤点1", type: "soil", longitude: 119.54, latitude: 30.65, value: "32", status: "正常", offline: false },
      { name: "土壤点2", type: "soil", longitude: 119.77, latitude: 30.73, value: "78", status: "偏高", offline: false }
    ]
  }
];

// 视频监控
export const VIDEO_MARKER_LIST = [
  {
    name: "视频监控",
    type: "video",
    icon: "",
    list: [
      { name: "摄像头1", type: "video", longitude: 119.69, latitude: 30.60, status: "在线", offline: false },
      { name: "摄像头2", type: "video", longitude: 119.88, latitude: 30.72, status: "离线", offline: true }
    ]
  }
];

export const MARKER_LIST = [
  ...WATER_MARKER_LIST,
  ...RAIN_MARKER_LIST,
  ...PROJECT_MARKER_LIST,
  ...FLOW_MARKER_LIST,
  ...WATER_QUALITY_MARKER_LIST,
  ...SAFETY_MARKER_LIST,
  ...SOIL_MARKER_LIST,
  ...VIDEO_MARKER_LIST
];
