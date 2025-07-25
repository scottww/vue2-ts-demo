<template>
  <div id="map" style="width: 100%; height: 100vh; position: relative">
    <div class="toolbar">
      <button class="small button" @click="load(1)">加载点</button>
      <button class="small button" @click="load(2)">加载线</button>
      <button class="small button" @click="load(3)">加载面</button>

      <div class="switch-map">
        <!-- <div class="btn">
          <input type="checkbox" id="yx" />
          <label for="yx">影像底图</label>
        </div> -->
        <div class="btn" @click="setVisible">
          <input type="checkbox" id="yx" :checked="anno_visible" />
          <label for="yx">标注</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import WKT from "ol/format/WKT";
import { Feature, Observable } from "ol";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Point, LineString, Polygon } from "ol/geom";
import { Style, Stroke, Fill, Circle } from "ol/style";

// import request from "@/utils/request";
import { mockResponse } from "./my-data";

export default {
  name: "OpenLayersMap",
  data() {
    return {
      map: null,
      view: null,
      points: [],
      polylines: [],
      polygons: [],
      anno_yx: null,
      anno_visible: true
    };
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.initMap();
  },
  methods: {
    fetchData() {
      // request({
      //   url: `/api/project/ProjecttreeProinfoGeometry/GetAll`,
      //   method: "GET",
      // })
      //   .then((res) => {
      //     console.log("fetchData ...", res);
      //     //分类
      //     const datas = res.data.list;
      //     datas.forEach((i) => {
      //       if (i.proLineCoord.indexOf("POINT") > -1) {
      //         this.points.push(i.proLineCoord);
      //       } else if (i.proLineCoord.indexOf("LINESTRING") > -1 || i.proLineCoord.indexOf("MULTILINESTRING") > -1) {
      //         this.polylines.push(i.proLineCoord);
      //       } else if (i.proLineCoord.indexOf("POLYGON") > -1 || i.proLineCoord.indexOf("MULTIPOLYGON") > -1) {
      //         this.polygons.push(i.proLineCoord);
      //       }
      //     });
      //     const { points, polylines, polygons } = this;
      //     console.log(points, polylines, polygons);
      //   })
      //   .catch(() => {});

      // 替代真实请求，直接使用 mock 数据
      const res = mockResponse;
      console.log("fetchData ...", res);
      const datas = res.data.list;

      this.points = [];
      this.polylines = [];
      this.polygons = [];

      datas.forEach((i) => {
        if (i.proLineCoord.indexOf("POINT") > -1) {
          this.points.push(i.proLineCoord);
        } else if (
          i.proLineCoord.indexOf("LINESTRING") > -1 ||
          i.proLineCoord.indexOf("MULTILINESTRING") > -1
        ) {
          this.polylines.push(i.proLineCoord);
        } else if (
          i.proLineCoord.indexOf("POLYGON") > -1 ||
          i.proLineCoord.indexOf("MULTIPOLYGON") > -1
        ) {
          this.polygons.push(i.proLineCoord);
        }
      });

      const { points, polylines, polygons } = this;
      console.log("分类结果：", points, polylines, polygons);
    },

    initMap() {
      const key = "c3e13f43d5f380c070aaff0b2920fae8";
      // 定义投影
      const projection = "EPSG:4326"; // 使用 WGS 84 地理坐标系

      const img_w = new TileLayer({
        title: "影像图",
        source: new XYZ({
          url:
            "http://t{0-7}.tianditu.gov.cn/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=" +
            key +
            ""
        })
      });

      const cia_w = new TileLayer({
        title: "影像图标注",
        source: new XYZ({
          url:
            "http://t{0-7}.tianditu.gov.cn/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=" +
            key +
            ""
        })
      });

      this.anno_yx = cia_w;

      // 创建地图视图
      const view = new View({
        projection: projection, // 设置投影
        center: [120.153576, 30.287459],
        zoom: 13
      });

      const map = new Map({
        target: "map",
        layers: [img_w, cia_w],
        // layers: [img_w],
        view: view
      });

      this.map = map;
      this.view = view;
    },
    load(type) {
      switch (type) {
        case 1:
          this.loadPoint();
          break;
        case 2:
          this.loadPolyline();
          break;
        case 3:
          this.loadPolygon();
          break;
      }
    },
    getStyles(feature) {
      let style;
      const geometryType = feature.getGeometry().getType();
      console.log('getStyles ...', geometryType);
      switch (geometryType) {
        case "Point":
          style = new Style({
            image: new Circle({
              radius: 10,
              fill: new Fill({
                color: "rgba(255, 0, 0, 0.5)"
              }),
              stroke: new Stroke({
                color: "blue",
                width: 3
              })
            })
          });
          break;
        case "LineString":
        case "MultiLineString":
          style = new Style({
            stroke: new Stroke({
              color: "blue",
              width: 5
            })
          });
          break;
        case "Polygon":
        case "MultiPolygon":
          style = new Style({
            fill: new Fill({
              color: "rgba(255, 255, 255, 0.2)"
            }),
            stroke: new Stroke({
              color: "blue",
              width: 5
            })
          });
          // style.getStroke().setWidth(13); // 设置多边形边框宽度为 13
          break;
      }
      return style;
    },
    loadPoint() {
      // 创建 WKT 格式对象
      const wktFormat = new WKT();

      // 将 WKT 字符串解析为几何对象
      const geometry = wktFormat.readGeometry(this.points[0]);
      // const styles = this.getStyles(point);

      const that = this;
      // 创建矢量图层和矢量数据源
      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [
            new Feature({
              geometry: geometry
            })
          ]
        }),
        style: that.getStyles(
          new Feature({
            geometry: geometry
          })
        )
      });

      // 将矢量图层添加到地图中
      this.map.addLayer(vectorLayer);

      // 将视图定位到点的位置
      this.view.setCenter(geometry.getCoordinates());

      // 定义要闪烁的位置
      // const coordinates = [0, 0];

      // // 定义闪烁的样式
      // const blinkStyle = new Style({
      //   image: new CircleStyle({
      //     radius: 8,
      //     fill: new Fill({ color: "yellow" }),
      //   }),
      // });

      // // 添加闪烁的特征
      // const blinkFeature = new Feature({
      //   geometry: new Point(coordinates),
      // });
      // vectorSource.addFeature(blinkFeature);

      // // 定义闪烁动画
      // const blinkAnimation = () => {
      //   const duration = 1000; // 闪烁持续时间（毫秒）
      //   const start = new Date().getTime();
      //   const listenerKey = vectorSource.on("change", function (event) {
      //     const elapsed = new Date().getTime() - start;
      //     const elapsedRatio = elapsed / duration;
      //     if (elapsedRatio > 1) {
      //       ol.Observable.unByKey(listenerKey);
      //       vectorSource.removeFeature(blinkFeature);
      //     } else {
      //       blinkFeature.setStyle(elapsedRatio < 0.5 ? blinkStyle : null);
      //     }
      //   });
      // };
    },
    loadPolyline() {
      //加载wkt
      // WKT 格式的几何数据
      // const wktString = "POINT(0 0)";

      // 创建 WKT 格式对象
      const wktFormat = new WKT();

      // 将 WKT 字符串解析为几何对象
      // const geometry = wktFormat.readGeometry(polyline3);
      const geometry = wktFormat.readGeometry(this.polylines[1]);

      const that = this;
      // 创建矢量图层和矢量数据源
      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [
            new Feature({
              geometry: geometry
            })
          ]
        }),
        style: that.getStyles(
          new Feature({
            geometry: geometry
          })
        )
      });

      // 将矢量图层添加到地图中
      this.map.addLayer(vectorLayer);

      // 将视图定位到多边形的中心
      this.view.fit(geometry.getExtent(), { padding: [50, 50, 50, 50] });
    },
    loadPolygon() {
      //加载wkt
      // 创建 WKT 格式对象
      const wktFormat = new WKT();
      // 将 WKT 字符串解析为几何对象
      // const geometry = wktFormat.readGeometry(polygon2);
      const geometry = wktFormat.readGeometry(this.polygons[1]);
      // 创建矢量数据源
      const vectorSource = new VectorSource();
      // 创建要加载的面的特征
      const polygonFeature = new Feature({
        geometry: geometry
      });

      const that = this;
      // 创建矢量图层和矢量数据源
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: that.getStyles(polygonFeature)
      });

      // 将矢量图层添加到地图中
      this.map.addLayer(vectorLayer);

      // 将视图定位到多边形的中心
      this.view.fit(geometry.getExtent(), { padding: [50, 50, 50, 50] });

      // 添加要加载的面的特征到矢量数据源中
      vectorSource.addFeature(polygonFeature);

      let interval;
      // 定义闪烁的样式
      const blinkStyle2 = new Style({
        fill: new Fill({ color: "rgba(255, 255, 0, 0.5)" })
      });
      let flag = 0;
      interval && window.clearInterval(interval);
      interval = setInterval(() => {
        if (flag <= 8) {
          if (flag % 2 == 0) {
            polygonFeature.setStyle(null);
          } else {
            polygonFeature.setStyle(blinkStyle2);
          }
          flag++;
        } else {
          polygonFeature.setStyle(null);
          window.clearInterval(interval);
        }
      }, 500);
    },
    setVisible() {
      if (this.anno_yx) {
        this.anno_visible = !this.anno_visible;
        this.anno_yx.setVisible(this.anno_visible);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.toolbar {
  position: absolute;
  top: 20px;
  left: 120px;
  z-index: 100;
  display: flex;
}

.switch-map {
  background: #3333338f;
  color: #fff;
  font-size: 14px;
  line-height: 27px;
  margin-left: 10px;

  .btn {
    padding: 0 4px;
  }
  input,
  label {
    vertical-align: middle;
  }
  label {
    margin-left: 4px;
  }
}

.button::-moz-focus-inner {
  border: 0;
  padding: 0;
}

.button {
  display: inline-block;
  *display: inline;
  zoom: 1;
  padding: 6px 20px;
  margin: 0;
  cursor: pointer;
  border: 1px solid #bbb;
  overflow: visible;
  font: bold 13px arial, helvetica, sans-serif;
  text-decoration: none;
  white-space: nowrap;
  color: #555;

  background-color: #ddd;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(rgba(255, 255, 255, 1)),
    to(rgba(255, 255, 255, 0))
  );
  background-image: -webkit-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
  background-image: -moz-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
  background-image: -ms-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
  background-image: -o-linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );

  -webkit-transition: background-color 0.2s ease-out;
  -moz-transition: background-color 0.2s ease-out;
  -ms-transition: background-color 0.2s ease-out;
  -o-transition: background-color 0.2s ease-out;
  transition: background-color 0.2s ease-out;
  background-clip: padding-box; /* Fix bleeding */
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -moz-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.3), 0 2px 2px -1px rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(255, 255, 255, 0.3) inset;
  -webkit-box-shadow: 0 1px 0 rgba(0, 0, 0, 0.3),
    0 2px 2px -1px rgba(0, 0, 0, 0.5), 0 1px 0 rgba(255, 255, 255, 0.3) inset;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.3), 0 2px 2px -1px rgba(0, 0, 0, 0.5),
    0 1px 0 rgba(255, 255, 255, 0.3) inset;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9);

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.button:hover {
  background-color: #eee;
  color: #555;
}

.button.small {
  padding: 4px 12px;
}
</style>
