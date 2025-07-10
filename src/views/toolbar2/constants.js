export const columnMap = {
  tab1: [
    { label: "序号", prop: "index", width: 60, minWidth: 60 },
    { label: "时间", prop: "time", minWidth: 120 },
    { label: "名称", prop: "name" },
    { label: "状态", prop: "status", minWidth: 80 }
  ],
  tab2: [
    { label: "序号", prop: "index", width: 60, minWidth: 60 },
    { label: "时间", prop: "time", minWidth: 120 },
    { label: "名称", prop: "name", minWidth: 100 },
    {
      label: "字段1",
      prop: "f1",
      unit: "(mm)",
      formatter: (val) => val || "--"
    },
    {
      label: "字段2",
      prop: "字段2",
      unit: "(m³/s)",
      formatter: (val) => val || "--"
    },
    { label: "在线", prop: "status", minWidth: 80 }
  ],
  tab3: [
    { label: "序号", prop: "index", width: 60, minWidth: 60 },
    { label: "时间", prop: "time", minWidth: 120 },
    { label: "名称", prop: "name", minWidth: 100 },
    { label: "字段1", prop: "f1", unit: "(mm)" },
    { label: "字段2", prop: "f2" },
    { label: "字段3", prop: "f3" }
  ],
  tab4: [
    { label: "序号", prop: "index", width: 60, minWidth: 60 },
    { label: "监测时间", prop: "time", minWidth: 120 },
    { label: "站点名称", prop: "name", minWidth: 100 },
    { label: "瞬间流量", prop: "f1", unit: "(m³/s)" },
    { label: "今日水量", prop: "f2", unit: "(m³)" },
  ],
  tab5: [] // tab5 是 Tree，不用 StatusTable
};

export const tableDataMap = {
  tab1: [],
  tab2: []
  // ...
};
