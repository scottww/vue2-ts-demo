// wkt格式
export const WKT_DATA = {
  data: {
    list: [
      // 杭州：西湖断桥残雪（点）
      {
        id: 1,
        name: "断桥残雪",
        proLineCoord: "POINT(120.1528 30.2605)"
      },
      // 杭州：西湖苏堤到雷峰塔（线）
      {
        id: 2,
        name: "苏堤漫步",
        proLineCoord:
          "LINESTRING(120.1475 30.2501, 120.1489 30.2523, 120.1502 30.2550, 120.1530 30.2569)"
      },
      // 杭州：多条河道（多线）
      {
        id: 3,
        name: "钱塘江支流",
        proLineCoord:
          "MULTILINESTRING((120.1900 30.2300, 120.1950 30.2350), (120.2000 30.2400, 120.2050 30.2450))"
      },
      // 杭州：西湖轮廓（面）
      {
        id: 4,
        name: "西湖",
        proLineCoord:
          "POLYGON((120.1300 30.2400, 120.1400 30.2500, 120.1500 30.2480, 120.1450 30.2380, 120.1300 30.2400))"
      },
      // 杭州：西溪湿地（多面）
      {
        id: 5,
        name: "西溪湿地",
        proLineCoord:
          "MULTIPOLYGON(((120.0800 30.2700, 120.0900 30.2750, 120.1000 30.2700, 120.0900 30.2650, 120.0800 30.2700)))"
      }
    ]
  }
};
//经纬度格式
export const points = [
  {
    id: 1,
    name: "断桥残雪",
    longitude: 120.1528,
    latitude: 30.2605
  },
  {
    id: 2,
    name: "雷峰塔",
    longitude: 120.1489,
    latitude: 30.2523
  }
];
export const lines = [
  {
    id: 1,
    name: "苏堤漫步",
    coordinates: [
      [120.1475, 30.2501],
      [120.1489, 30.2523],
      [120.1502, 30.255],
      [120.153, 30.2569]
    ]
  },
  {
    id: 2,
    name: "钱塘江支流",
    coordinates: [
      [120.19, 30.23],
      [120.195, 30.235],
      [120.2, 30.24],
      [120.205, 30.245]
    ]
  }
];
export const polygons = [
  {
    id: 1,
    name: "西湖",
    coordinates: [
      [120.13, 30.24],
      [120.14, 30.25],
      [120.15, 30.248],
      [120.145, 30.238],
      [120.13, 30.24]
    ]
  },
  {
    id: 2,
    name: "西溪湿地",
    coordinates: [
      [120.08, 30.27],
      [120.09, 30.275],
      [120.1, 30.27],
      [120.09, 30.265],
      [120.08, 30.27]
    ]
  }
];

//geojson格式
export const geojson_point = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: 1,
        name: "断桥残雪"
      },
      geometry: {
        type: "Point",
        coordinates: [120.1528, 30.2605]
      }
    }
  ]
};

export const geojson_line = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: 2,
        name: "苏堤漫步"
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [120.1475, 30.2501],
          [120.1489, 30.2523],
          [120.1502, 30.255],
          [120.153, 30.2569]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: 3,
        name: "钱塘江支流"
      },
      geometry: {
        type: "MultiLineString",
        coordinates: [
          [
            [120.19, 30.23],
            [120.195, 30.235]
          ],
          [
            [120.2, 30.24],
            [120.205, 30.245]
          ]
        ]
      }
    }
  ]
};

export const geojson_polygon = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: 4,
        name: "西湖"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [120.13, 30.24],
            [120.14, 30.25],
            [120.15, 30.248],
            [120.145, 30.238],
            [120.13, 30.24]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: 5,
        name: "西溪湿地"
      },
      geometry: {
        type: "MultiPolygon",
        coordinates: [
          [
            [
              [120.08, 30.27],
              [120.09, 30.275],
              [120.1, 30.27],
              [120.09, 30.265],
              [120.08, 30.27]
            ]
          ]
        ]
      }
    }
  ]
};
