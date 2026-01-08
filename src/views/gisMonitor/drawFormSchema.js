export const DRAW_FORM_SCHEMA = {
  Point: {
    title: '点位信息',
    fields: [
      {
        prop: 'pointLnglat',
        label: '经纬度',
        type: 'input',
        required: true,
        // disabled: true
      },
      {
        prop: 'pointType',
        label: '点位类型',
        type: 'select',
        default: 'waterLevel', // 默认水情监测
        options: [
          { label: '水情监测', value: 'waterLevel' },
          { label: '雨情监测', value: 'rainfall' },
          { label: '工情监测', value: 'gate' },
          { label: '流量监测', value: 'flow' },
          { label: '水质监测', value: 'waterQuality' },
          { label: '安全监测', value: 'safety' },
          { label: '土壤墒情', value: 'soilMoisture' },
          { label: '视频监控', value: 'video' },
        ]
      },
      {
        prop: 'pointName',
        label: '点位名称',
        type: 'input',
        placeholder: '请输入',
        maxlength: 30,
        required: true
      },
    ]
  },

  LineString: {
    title: '新建标线',
    fields: [
      {
        prop: 'polylineType',
        label: '标线类型',
        type: 'select',
        default: 'mainCanal', // 默认干渠
        options: [
          { label: '干渠', value: 'mainCanal' },
          { label: '支渠', value: 'branchCanal' }
        ]
      },
      {
        prop: 'polylineName',
        label: '标线名称',
        type: 'input',
        placeholder: '请输入',
        maxLength: 30,
        required: true
      },
      {
        prop: 'polylineLength',
        label: '长度',
        type: 'number',
        unit: 'km',
        required: true
      },
    ]
  },

  Polygon: {
    title: '新建绘面',
    fields: [
      {
        prop: 'polygonType',
        label: '绘面类型',
        type: 'select',
        default: 'irrigation', // 默认干渠
        options: [
          { label: '灌片', value: 'irrigation' },
        ]
      },
      {
        prop: 'polygonName',
        label: '绘面名称',
        type: 'input',
        placeholder: '请输入',
        maxlength: 30,
        required: true
      },
      
      {
        prop: 'polygonArea',
        label: '面积',
        type: 'number',
        unit: 'km²',
        required: true
      }
    ]
  }
}
