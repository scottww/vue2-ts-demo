export const columnMap = {
  // 水情监测
  tab1: [
    { label: "序号", prop: "index", width: 60, minWidth: 60 },
    { label: "监测时间", prop: "time", minWidth: 100 },
    { label: "站点名称", prop: "waterLevelName" },
    { label: "水位", prop: "waterLevel", unit: "(m)" }
  ],
  // 雨情监测
  // tab2: [
  //   { label: "序号", prop: "index", width: 60, minWidth: 60 },
  //   { label: "时间", prop: "time", minWidth: 100 },
  //   { label: "名称", prop: "name", minWidth: 100 },
  //   {
  //     label: "字段1",
  //     prop: "f1",
  //     unit: "(mm)",
  //     formatter: (val) => val || "--"
  //   },
  //   {
  //     label: "字段2",
  //     prop: "字段2",
  //     unit: "(m³/s)",
  //     formatter: (val) => val || "--"
  //   },
  //   { label: "在线", prop: "status", minWidth: 80 }
  // ],
  tab2: [
    { label: "序号", prop: "index", width: 60, minWidth: 60 },
    { label: "监测时间", prop: "time", minWidth: 100 },
    { label: "站点名称", prop: "name", minWidth: 100 },
    {
      label: "雨量",
      prop: "rainfall",
      unit: "(mm)",
      formatter: (val) => val || "--"
    },
  ],
  // 工请监测
  tab3: [
    { label: "序号", prop: "index", width: 60, minWidth: 60 },
    { label: "监测时间", prop: "time", minWidth: 100 },
    { label: "站点名称", prop: "name", minWidth: 100 },
    { label: "闸门/泵组", prop: "device" },
    { label: "在线", prop: "status", minWidth: 80 }
  ],
  // 流量监测
  tab4: [
    { label: "序号", prop: "index", width: 60, minWidth: 60 },
    { label: "监测时间", prop: "time", minWidth: 100 },
    { label: "站点名称", prop: "name", minWidth: 100 },
    { label: "瞬间流量", prop: "instantFlow", unit: "(m³/s)", unitInline: false },
    { label: "今日水量", prop: "totalWaterValue", unit: "(m³)", unitInline: false },
  ],
  // 水质监测
  tab5: [
    { label: "序号", prop: "index", width: 60, minWidth: 60 },
    { label: "监测时间", prop: "time", minWidth: 100 },
    { label: "站点名称", prop: "name", minWidth: 100 },
    { label: "PH", prop: "ph" },
    { label: "温度", prop: "temperature", unit: "(℃)", unitInline: true }, //unitInline不配置，默认为true
    // {label: '电导率', prop: 'conductivity', unit: '(μS/cm)', unitInline: false},
  ],
  // 视频监控
  tab6: [] // tab6 是 Tree，不用 StatusTable
};

export const tableDataMap = {
  tab1: [],
  tab2: []
  // ...
};
