<template>
  <div class="map-viewer">
    <div class="controls new-group">
      <span>经纬度 (格式: 经度,纬度):</span>
      <input v-model="coordinates" placeholder="输入经度,纬度" />
      <button @click="locatePoint">定位至</button>
      <button @click="startDraw('Point')">绘制点</button>
      <button @click="startDraw('LineString')">绘制线</button>
      <button @click="startDraw('Polygon')">绘制面</button>
      <button @click="measure('LineString')">测量距离</button>
      <button @click="measure('Polygon')">测量面积</button>
      <button @click="measure('None')">取消测量</button>
      <button @click="measure2()">测量2</button>
      <button @click="measure3()">测量3</button>
      <button @click="clearAll()">全部清除</button>
      <button @click="addPictureToMap()">图片覆盖物</button>
    </div>
    <div ref="mapContainer" class="map-container">
      <div class="map-change-btns">
        <el-button-group>
          <el-button
            :type="currentMaptype === 'vec' ? 'primary' : ''"
            @click="mapChage('vec')"
            >矢量</el-button
          >
          <el-button
            :type="currentMaptype === 'img' ? 'primary' : ''"
            @click="mapChage('img')"
            >影像</el-button
          >
        </el-button-group>
      </div>

      <div class="tool-bar">
        <div
          class="tool-bar-item-wrapper-with-menu"
          @mouseenter="onMouseEnter"
          @mouseleave="onMouseLeave"
        >
          <!-- 主按钮 -->
          <div class="tool-bar-item-wrapper">
            <div class="tool-bar-item">
              <img :src="showMenu ? hoverIcon : normalIcon" alt="新增" />
            </div>
          </div>

          <!-- 子菜单 -->
          <div class="menu" v-if="showMenu">
            <div
              class="menu-item"
              v-for="(item, index) in menuItems"
              :key="index"
              @click="handleMenu(item.label)"
              @mouseenter="hoverIndex = index"
              @mouseleave="hoverIndex = -1"
            >
              <img
                class="menu-icon"
                :src="hoverIndex === index ? item.hoverIcon : item.icon"
                alt="图标"
              />
              {{ item.label }}
            </div>
          </div>
        </div>

        <!-- 分割线 -->
        <div class="tool-bar-divider-line"></div>

        <!-- 删除按钮 -->
        <div class="tool-bar-item" @click="clearDrawLayer">
          <img src="../../assets/mapToolBar/delete.png" alt="删除" />
        </div>
      </div>
    </div>

    <el-dialog title="提交" :visible.sync="dialogVisible" width="500px">
      <el-form :model="formData" label-width="80px">
        <el-form-item label="绘制类型">
          <el-input v-model="formData.type" disabled />
        </el-form-item>
        <el-form-item label="面积">
          <!-- <el-input v-model="formData.type" disabled /> -->
          <el-input v-model="formData.area" placeholder="请输入面积">
            <template slot="append">㎡</template>
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelSave">取消</el-button>
          <el-button type="primary" @click="saveFeature">保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { createMapService } from "@/utils/map";
import { createTileLayerManager } from "@/utils/map/tileLayerManager";
const pointMarker = require("@/assets/mapIcon/marker.png");

import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { fromLonLat } from "ol/proj";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style, Stroke, Fill, Text } from "ol/style";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Draw from "ol/interaction/Draw";
import CircleStyle from "ol/style/Circle";
import Overlay from "ol/Overlay";
import { getLength, getArea } from "ol/sphere";
import { LineString, Polygon } from "ol/geom";
import HoverMenu from "./tool-bar.vue";

export default {
  components: { HoverMenu },
  data() {
    return {
      type: "2D",
      currentMaptype: "vec",
      center: [120.153576, 30.287459],
      zoom: 11,
      pointMarker,
      coordinates: "120.153576,30.287459",
      mapService: null,
      map: null,
      markerLayer: null,
      // draw

      draw: null,
      overlay: null,
      drawType: null, // point / line / polygon
      drawSource: null,
      drawLayer: null,
      drawInteraction: null,

      dialogVisible: false,
      formData: {
        name: "",
        type: "",
        area: ""
      },
      pendingFeature: null,
      nodeOverlays: [], // 存储红色圆圈和 x 按钮
      distanceOverlay: null, // 显示距离的 overlay

      // 新版比那辆
      overlays: [],
      totalLength: 0, // 总距离
      imageLayer: null,
      tileLayerManager: null, //图层管理器
      // tool-bar
      hideTimer: null,
      showMenu: false,
      hoverIndex: -1, // 用于追踪当前 hover 的菜单项
      hoverIcon: require("@/assets/mapToolBar/add3_hover.png"),
      normalIcon: require("@/assets/mapToolBar/add3.png"),
      menuItems: [
        {
          label: "新增规划",
          icon: require("../../assets/mapToolBar/type3.png"),
          hoverIcon: require("../../assets/mapToolBar/type3_hover.png")
        },
        {
          label: "新增占用",
          icon: require("../../assets/mapToolBar/type12.png"),
          hoverIcon: require("../../assets/mapToolBar/type12_hover.png")
        },
        {
          label: "新增补偿",
          icon: require("../../assets/mapToolBar/type12.png"),
          hoverIcon: require("../../assets/mapToolBar/type12_hover.png")
        }
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      console.log("init");
      const mapService = createMapService(this.type, this.$refs.mapContainer, {
        zoom: this.zoom
      });
      // mapService.addTileLayer("TDT_vec");

      // 切换中心
      mapService.setCenter(this.center);

      // 注册点击事件
      mapService.on("singleclick", this.handleMapClick);

      // 注册地图加载完成事件
      // mapService.on("load", () => {
      //   console.log("地图加载完成");
      //   mapService.addMarkerByLngLat(this.center, pointMarker);
      // });

      mapService.addMarkerByLngLat(this.center, pointMarker);
      this.mapService = mapService;
      this.map = mapService.getMapInsatance();

      // 只控制底图图层，不影响其他业务图层
      // this.tileLayerManager = createTileLayerManager(this.map);
      // this.tileLayerManager.switchTo("TDT_vec");

      // 初始化图层用于显示图标
      this.markerLayer = new VectorLayer({
        source: new VectorSource(),
        zIndex: 10
      });
      this.map.addLayer(this.markerLayer);

      // 初始化绘图图层
      // this.drawSource = new VectorSource();
      // this.drawLayer = new VectorLayer({
      //   source: this.drawSource,
      //   zIndex: 20
      // });
      // this.map.addLayer(this.drawLayer);

      this.initDrawLayer();
    },
    handleMapClick(event) {
      console.log("地图点击事件:", event);
      const coordinate = event.coordinate;
      console.log("地图点击经纬度:", coordinate);
    },
    locatePoint() {
      const coords = this.coordinates.split(",");
      const lon = parseFloat(coords[0]);
      const lat = parseFloat(coords[1]);

      // 确保经纬度有效
      if (isNaN(lon) || isNaN(lat)) {
        alert("无效的经纬度格式");
        return;
      }

      // 清除旧图标，添加新图标
      this.markerLayer.getSource().clear();

      // const coord = fromLonLat([lon, lat]);
      const coord = [lon, lat];

      // 设置视图中心
      this.map.getView().animate({
        center: coord,
        duration: 1000,
        zoom: 15
      });

      // 创建图标 Feature
      const feature = new Feature({
        geometry: new Point(coord)
      });

      // 设置图标样式
      feature.setStyle(
        new Style({
          image: new Icon({
            src: require("@/assets/mapIcon/plus.png"), // 确保你有这个图标
            anchor: [0.5, 1],
            scale: 1
          })
        })
      );

      // 清除旧图标，添加新图标
      this.markerLayer.getSource().clear();
      this.markerLayer.getSource().addFeature(feature);
    },
    startDraw0(type) {
      if (this.draw) {
        this.map.removeInteraction(this.draw);
      }

      this.draw = new Draw({
        source: this.drawSource,
        type
      });

      this.drawLayer.setStyle(
        new Style({
          stroke: new Stroke({
            color: "blue",
            width: 2
          }),
          fill: new Fill({
            color: "rgba(0, 0, 255, 0.1)"
          }),
          image: new CircleStyle({
            radius: 6,
            fill: new Fill({ color: "blue" })
          })
        })
      );

      this.draw.on("drawend", (event) => {
        const feature = event.feature;
        const geom = feature.getGeometry();

        this.formData.name = "";
        this.formData.type = geom.getType();
        this.pendingFeature = feature;
        this.dialogVisible = true;
      });

      this.map.addInteraction(this.draw);
    },
    startDraw(type) {
      // 清除之前图层和交互
      this.map.removeInteraction(this.draw);
      this.map.removeLayer(this.drawLayer);
      this.clearNodeOverlays();

      // 初始化 source 和 layer
      this.drawSource = new VectorSource();
      this.drawLayer = new VectorLayer({
        source: this.drawSource,
        style: new Style({
          fill: new Fill({ color: "rgba(255, 255, 255, 0.2)" }),
          stroke: new Stroke({ color: "#ffcc33", width: 2 }),
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({ color: "#ffcc33" })
          })
        })
      });
      this.map.addLayer(this.drawLayer);

      // 初始化绘制交互
      this.draw = new Draw({
        source: this.drawSource,
        type: type
      });
      this.map.addInteraction(this.draw);

      // 监听绘制开始
      this.draw.on("drawstart", (event) => {
        this.clearNodeOverlays(); // 清除之前的节点 overlay

        const geometry = event.feature.getGeometry();

        geometry.on("change", () => {
          this.clearNodeOverlays(); // 每次改变都清空旧 overlay

          const coords = geometry.getCoordinates();
          coords.forEach((coord, index) => {
            // 红色节点圆点
            const node = document.createElement("div");
            node.style.width = "8px";
            node.style.height = "8px";
            node.style.backgroundColor = "red";
            node.style.borderRadius = "50%";
            node.style.position = "absolute";
            node.style.transform = "translate(-50%, -50%)";

            const nodeOverlay = new Overlay({
              element: node,
              position: coord,
              positioning: "center-center",
              stopEvent: false
            });
            this.map.addOverlay(nodeOverlay);
            this.nodeOverlays.push(nodeOverlay);

            // 最后一个节点添加关闭按钮 ✕
            if (index === coords.length - 1) {
              const close = document.createElement("div");
              // close.innerText = "✕";
              close.innerText = "x";
              close.style.color = "red";
              close.style.background = "#fff";
              close.style.border = "1px solid red";
              // close.style.padding = "2px 4px";
              // close.style.borderRadius = "4px";
              close.style.cursor = "pointer";
              // close.style.fontSize = "14px";
              close.style.width = "16px";
              close.style.height = "16px";
              close.style.textAlign = "center";
              close.style.lineHeight = "12px";
              close.style.fontWeight = "700";


              close.addEventListener("click", () => {
                // 点击后移除绘制和所有图层内容
                this.map.removeInteraction(this.draw);
                this.drawSource.removeFeature(event.feature);
                this.clearNodeOverlays();
                if (this.distanceOverlay) {
                  this.map.removeOverlay(this.distanceOverlay);
                  this.distanceOverlay = null;
                }
              });

              const closeOverlay = new Overlay({
                element: close,
                position: coord,
                // offset: [10, -10],
                offset: [10, 20],
                positioning: "bottom-left"
              });
              this.map.addOverlay(closeOverlay);
              this.nodeOverlays.push(closeOverlay);
            }
          });

          // 显示测量距离
          const length = getLength(geometry, { projection: "EPSG:4326" });
          const output =
            length > 1000
              ? (length / 1000).toFixed(2) + " km"
              : length.toFixed(2) + " m";

          // 创建或更新距离 overlay
          if (!this.distanceOverlay) {
            const label = document.createElement("div");
            label.className = "distance-label";
            label.style.background = "white";
            label.style.padding = "2px 6px";
            label.style.border = "1px solid #ccc";
            label.style.borderRadius = "4px";
            label.style.fontSize = "12px";
            this.distanceOverlay = new Overlay({
              element: label,
              offset: [0, -10],
              positioning: "bottom-center"
            });
            this.map.addOverlay(this.distanceOverlay);
          }

          this.distanceOverlay.setPosition(coords[coords.length - 1]);
          this.distanceOverlay.getElement().innerHTML = output;
        });
      });

      // 绘制完成后更新所有 features 数组
      this.draw.on("drawend", (event) => {
        const features = this.drawSource.getFeatures();
        this.lineData = features.map((f) => f.getGeometry().getCoordinates());
      });
    },

    clearNodeOverlays() {
      this.nodeOverlays.forEach((o) => this.map.removeOverlay(o));
      this.nodeOverlays = [];
    },
    measure(type) {
      if (this.draw) {
        this.map.removeInteraction(this.draw);
      }

      this.draw = new Draw({
        source: this.drawSource,
        type
      });

      this.draw.on("drawend", (event) => {
        const geom = event.feature.getGeometry();
        let output;

        if (type === "LineString") {
          const length = getLength(geom);
          output =
            length > 1000
              ? (length / 1000).toFixed(2) + " km"
              : length.toFixed(2) + " m";
        } else if (type === "Polygon") {
          const area = getArea(geom);
          output =
            area > 1000000
              ? (area / 1000000).toFixed(2) + " km²"
              : area.toFixed(2) + " m²";
        }

        this.$message.success(`测量结果：${output}`);
      });

      this.map.addInteraction(this.draw);
    },

    measure2() {
      this.map.removeInteraction(this.draw);
      this.map.removeLayer(this.drawLayer);
      this.drawLayer = new VectorLayer({
        source: this.drawSource,
        style: new Style({
          stroke: new Stroke({
            color: "red",
            width: 3
          })
        })
      });

      const draw = new Draw({
        source: this.drawSource,
        type: "LineString",
        style: new Style({
          stroke: new Stroke({ color: "red", width: 2 }),
          image: new CircleStyle({
            radius: 5,
            fill: new Fill({ color: "red" })
          })
        })
      });

      this.map.addInteraction(draw);
      this.map.addLayer(this.drawLayer);

      const that = this;
      draw.on("drawstart", (e) => {
        that.overlays.forEach((o) => that.map.removeOverlay(o));
        that.overlays = [];
        that.totalLength = 0;

        const sketch = e.feature;
        const geometry = sketch.getGeometry();

        let tempPoints = []; // 用于记录当前临时拐点的红点 Feature

        // 每次 geometry 改变（用户点击添加新点）
        geometry.on("change", (evt) => {
          const geom = evt.target;
          const coords = geom.getCoordinates();

          // 清空旧的红点
          tempPoints.forEach((f) => this.drawSource.removeFeature(f));
          tempPoints = [];

          // 绘制新拐点红点（不含终点文字）
          coords.forEach((coord, i) => {
            const pointFeature = new Feature(new Point(coord));
            pointFeature.setStyle(
              new Style({
                image: new CircleStyle({
                  radius: 6,
                  fill: new Fill({ color: "red" }),
                  stroke: new Stroke({ color: "#fff", width: 2 })
                }),
                // text:
                //   i === 0
                //     ? new Text({
                //         text: "起点",
                //         offsetY: -15,
                //         fill: new Fill({ color: "#000" }),
                //         stroke: new Stroke({ color: "#fff", width: 2 })
                //       })
                //     : undefined
                text:
                  i === 0
                    ? this.addLabel(this.map, coord, "起点", true)
                    : undefined
              })
            );
            this.drawSource.addFeature(pointFeature);
            tempPoints.push(pointFeature);
          });
        });
      });

      draw.on("drawend", (e) => {
        // const geometry = e.feature.getGeometry();
        // const coords = geometry.getCoordinates();

        // for (let i = 1; i < coords.length; i++) {
        //   const seg = new LineString([coords[i - 1], coords[i]]);
        //   const length = getLength(seg, { projection: "EPSG:4326" });
        //   that.totalLength += length;

        //   const mid = [
        //     (coords[i - 1][0] + coords[i][0]) / 2,
        //     (coords[i - 1][1] + coords[i][1]) / 2
        //   ];
        //   that.addLabel(that.map, mid, `${(length / 1000).toFixed(2)} 公里`);
        // }

        // const last = coords[coords.length - 1];
        // that.addLabel(
        //   that.map,
        //   last,
        //   `共 ${(that.totalLength / 1000).toFixed(2)} 公里`,
        //   true
        // );
        const geometry = e.feature.getGeometry();
        const coords = geometry.getCoordinates();

        // 添加每个拐点的红点
        coords.forEach((coord) => {
          const pointFeature = new Feature({
            geometry: new Point(coord)
          });
          pointFeature.setStyle(
            new Style({
              image: new CircleStyle({
                radius: 5,
                fill: new Fill({ color: "red" })
              })
            })
          );
          this.drawSource.addFeature(pointFeature);
        });

        for (let i = 1; i < coords.length; i++) {
          const seg = new LineString([coords[i - 1], coords[i]]);
          const length = getLength(seg, { projection: "EPSG:4326" });
          this.totalLength += length;

          // 添加起点标注
          if (false && i === 1) {
            this.addLabel(this.map, coords[i], "起点", true);
          } else {
            //标记在中点
            // const mid = [
            //   (coords[i - 1][0] + coords[i][0]) / 2,
            //   (coords[i - 1][1] + coords[i][1]) / 2
            // ];
            // this.addLabel(this.map, mid, `${(length / 1000).toFixed(2)} 公里`);

            // 使用拐点作为标注位置
            const point = coords[i];
            //传入this.totalLength 标记总长，传入length 标记每段长
            this.addLabel(
              this.map,
              point,
              `${(this.totalLength / 1000).toFixed(2)} 公里`
            );
          }
          // 添加终点标注
          if (i === coords.length - 1) {
            // this.addLabel(this.map, coords[i], '终点', true)
          }
        }

        that.map.render(); // 确保强制刷新地图
      });
    },
    measure3() {
      // 图层和数据源
      // const vectorSource = new VectorSource();
      // const vectorLayer = new VectorLayer({
      //   source: vectorSource
      // });
      this.map.removeInteraction(this.draw);
      this.map.removeLayer(this.drawLayer);
      // 绘制交互
      const draw = new Draw({
        source: this.drawSource,
        type: "LineString"
      });
      this.map.addInteraction(draw);
      this.map.addLayer(this.drawLayer);

      // 样式函数
      const createPointFeature = (coord, label) => {
        const point = new Feature(new Point(coord));
        point.setStyle(
          new Style({
            image: new CircleStyle({
              radius: 5,
              fill: new Fill({ color: "red" })
            }),
            text: new Text({
              text: label,
              offsetY: -15,
              font: "12px sans-serif",
              fill: new Fill({ color: "black" }),
              stroke: new Stroke({ color: "white", width: 2 })
            })
          })
        );
        this.drawSource.addFeature(point);
      };

      // 中间标注
      const addLabelAt = (coord, label) => {
        const feature = new Feature(new Point(coord));
        feature.setStyle(
          new Style({
            text: new Text({
              text: label,
              offsetY: -15,
              font: "12px sans-serif",
              fill: new Fill({ color: "blue" }),
              stroke: new Stroke({ color: "white", width: 2 })
            })
          })
        );
        this.drawSource.addFeature(feature);
      };

      // 绘制完成事件
      draw.on("drawend", (e) => {
        const geometry = e.feature.getGeometry();
        const coords = geometry.getCoordinates();

        let totalLength = 0;

        coords.forEach((coord, i) => {
          if (i === 0) {
            createPointFeature(coord, "起点");
          } else if (i === coords.length - 1) {
            createPointFeature(
              coord,
              `共 ${(totalLength / 1000).toFixed(2)} 公里`
            );
          } else {
            createPointFeature(coord, "");
          }
        });

        for (let i = 1; i < coords.length; i++) {
          const segment = new LineString([coords[i - 1], coords[i]]);
          const length = getLength(segment, { projection: "EPSG:3857" });
          totalLength += length;

          const mid = [
            (coords[i - 1][0] + coords[i][0]) / 2,
            (coords[i - 1][1] + coords[i][1]) / 2
          ];
          addLabelAt(mid, `${(length / 1000).toFixed(2)} 公里`);
        }

        this.map.render();
      });
    },
    addLabel(map, coord, text, isTotal = false) {
      const div = document.createElement("div");
      div.className = "measure-label";
      div.innerText = text;
      if (true || isTotal) {
        div.style.fontWeight = "bold";
        div.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
      }

      const overlay = new Overlay({
        element: div,
        position: coord,
        positioning: "bottom-center",
        stopEvent: false
      });
      this.overlays.push(overlay);
      map.addOverlay(overlay);
    },
    clearMeasure() {
      this.drawSource.clear();
      this.overlays.forEach((o) => this.map.removeOverlay(o));
      this.overlays = [];
    },

    saveFeature() {
      if (this.formData.name.trim() === "") {
        this.$message.warning("请输入名称");
        return;
      }

      this.pendingFeature.setProperties({
        name: this.formData.name
      });

      console.log(
        "保存成功：",
        this.pendingFeature.getGeometry().getType(),
        this.formData.name
      );

      this.dialogVisible = false;
      this.pendingFeature = null;
    },

    cancelSave() {
      // 用户取消则移除该要素
      if (this.pendingFeature) {
        this.drawSource.removeFeature(this.pendingFeature);
        this.pendingFeature = null;
      }
      this.dialogVisible = false;
    },
    clearAll() {
      this.drawSource.clear();
      this.overlays.forEach((o) => this.map.removeOverlay(o));
      this.overlays = [];
    },
    addPictureToMap() {
      if (this.imageLayer) {
        this.map.removeLayer(this.imageLayer);
      }
      const extent = [116.38536, 39.91138, 116.39594, 39.9214];
      const imgPath = `/satellite/gugong.jpg`;
      // const imgPath = `/satellite/cloud1.png`;

      const layer = this.mapService.createSatelliteMap(imgPath, extent);
      this.map.addLayer(layer);
      this.map.getView().fit(extent, { size: this.map.getSize() });
    },
    mapChage(mapType) {
      this.currentMaptype = mapType;
      if (mapType === "vec") {
        this.tileLayerManager.switchTo("TDT_vec"); // type 为 "TDT_vec" 或 "TDT_img"
      } else if (mapType === "img") {
        this.tileLayerManager.switchTo("TDT_img");
      }
    },
    onMouseEnter() {
      clearTimeout(this.hideTimer);
      this.showMenu = true;
    },
    onMouseLeave() {
      this.hideTimer = setTimeout(() => {
        this.showMenu = false;
      }, 200); // 延迟隐藏
    },
    initDrawLayer() {
      this.drawSource = new VectorSource();

      const drawLayer = new VectorLayer({
        source: this.drawSource,
        style: (feature) => {
          const geometry = feature.getGeometry();
          const styles = [];

          // 主体样式
          styles.push(
            new Style({
              stroke: new Stroke({
                color: "#FD6204",
                width: 2
              }),
              fill: new Fill({
                color: "rgba(23,143,255, 0.1)" //#178FFF
              })
            })
          );

          // 添加红色节点标记
          if (geometry instanceof Polygon) {
            const coords = geometry.getCoordinates()[0];
            coords.forEach((coord) => {
              styles.push(
                new Style({
                  geometry: new Point(coord),
                  image: new CircleStyle({
                    radius: 4,
                    fill: new Fill({ color: "red" }),
                    stroke: new Stroke({ color: "#fff", width: 1 })
                  })
                })
              );
            });
          }

          return styles;
        }
      });

      this.map.addLayer(drawLayer);
    },
    formatArea(area, precision = 4) {
      //按照面积大小显示不同的单位
      // if (area > 1000000) {
      //   return {
      //     value: (area / 1000000).toFixed(2),
      //     unit: "km²"
      //   };
      // } else if (area > 10000) {
      //   return {
      //     value: (area / 10000).toFixed(2),
      //     unit: "ha"
      //   };
      // } else {
      //   return {
      //     value: area.toFixed(2),
      //     unit: "m²"
      //   };
      // }

      //始终显示km²
      // return {
      //   value: (area / 1000000).toFixed(precision), // 始终转成平方千米
      //   unit: "km²"
      // };
      return {
        value: area.toFixed(precision),
        unit: "m²"
      };
    },
    //千位分隔符显示
    formatArea2(area) {
      const formatNumber = (num, decimals = 0) =>
        Number(num).toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        });

      if (area >= 1000000) {
        return {
          value: formatNumber(area / 1000000, 2),
          unit: "km²"
        };
      } else {
        return {
          value: formatNumber(area, 0),
          unit: "m²"
        };
      }
    },
    startDrawPolygon() {
      let { drawInteraction, drawSource } = this;
      if (drawInteraction) {
        this.map.removeInteraction(drawInteraction);
      }

      drawInteraction = new Draw({
        source: drawSource,
        type: "Polygon"
      });

      this.map.addInteraction(drawInteraction);

      drawInteraction.on("drawend", (event) => {
        // 使用 feature 本身而不是 event.geometry
        // const polygon = event.feature;
        const polygon = event.feature.getGeometry();
        const area = getArea(polygon);
        console.log("获取到的面积 ...", area);
        const { value: formattedArea, unit } = this.formatArea(area, 4);

        // 添加面积标注
        const center = polygon.getInteriorPoint().getCoordinates();

        const areaFeature = new Feature({
          geometry: new Point(center)
        });

        areaFeature.setStyle(
          new Style({
            text: new Text({
              text: `${formattedArea} ${unit}`,
              font: "16px sans-serif",
              fill: new Fill({ color: "#FFCB00" }),
              stroke: new Stroke({ color: "white", width: 2 }),
              offsetY: -10
            })
          })
        );

        drawSource.addFeature(areaFeature);

        // 弹出表单
        this.showFormWithArea(formattedArea, unit);

        this.map.removeInteraction(drawInteraction);
        drawInteraction = null;
      });
    },
    showFormWithArea(area, unit) {
      // 示例：ElementUI 弹窗逻辑
      this.$confirm(
        `绘制完成，面积为 ${area} ${unit}。是否填写信息？`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        }
      ).then(() => {
        // 打开自定义表单
        this.dialogVisible = true;
        this.formData.area = area;
      });
    },
    //tool-bar
    handleMenu(option) {
      console.log("点击了菜单：", option);
      this.showMenu = false;
      // 这里可执行实际功能逻辑
      this.startDrawPolygon();
    },
    onMenuSelect(item) {
      console.log("点击菜单：", item.label);
    },
    clearDrawLayer() {
      this.drawSource.clear();
    }
  }
};
</script>
<style lang="scss" scoped>
.map-viewer {
  width: 100%;
  height: 600px;
}
.controls {
  margin: 10px;
}
.map-container {
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  position: relative;
}

.input-group {
  display: flex;
  max-width: 800px;
  margin: 10px 0;

  input {
    flex: 1;
    padding: 10px 14px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-right: none;
    border-radius: 4px 0 0 4px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #409eff;
    }
  }

  button {
    padding: 10px 20px;
    font-size: 14px;
    background-color: #409eff;
    color: white;
    border: 1px solid #409eff;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #66b1ff;
    }
  }
}

.new-group {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 12px 0;
  width: 500px;

  span {
    font-size: 14px;
    white-space: nowrap;
  }

  input {
    flex: 1;
    min-width: 200px;
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.3s;

    &:focus {
      border-color: #409eff; // Element UI 蓝色
    }
  }

  button {
    padding: 8px 16px;
    background-color: #409eff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color 0.3s;

    &:hover {
      background-color: #66b1ff;
    }

    &:active {
      background-color: #3a8ee6;
    }
  }
}

//measure2
.measure-label {
  background: white;
  border: 1px solid #ccc;
  padding: 2px 4px;
  font-size: 12px;
  border-radius: 4px;
  white-space: nowrap;
}

.map-change-btns {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0px 2px 1px 0px rgba(0, 0, 0, 0.14);
  z-index: 98;
}

// tool-bar
.tool-bar {
  position: absolute;
  background-color: #fff;
  // border: 1px solid #ccc;
  width: 100px;
  height: 32px;
  display: flex;
  align-items: center;
  // border-radius: 4px;
  width: fit-content;
  padding: 4px 8px;
  box-shadow: 2px 0px 8px 0px #000000;
  border-radius: 2px 2px 2px 2px;
  top: 10px;
  left: 160px;
  z-index: 999;
}

.tool-bar-item-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

.tool-bar-item {
  position: relative;
  padding: 4px;
  cursor: pointer;
}

.tool-bar-item img {
  width: 15px;
  height: 16px;
  transition: all 0.2s;
}

.tool-bar-divider {
  margin: 0 4px;
  color: #ccc;
  font-weight: bold;
  user-select: none;
}

.tool-bar-divider-line {
  width: 1px;
  height: 24px;
  background-color: #ccc;
  margin: 0 8px;
}

/* 弹出菜单 */
.menu {
  position: absolute;
  top: 40px;
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  z-index: 10;
  min-width: 80px;
}

.menu-item {
  padding: 6px 12px;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #f0f0f0;
  color: #409eff;
}

.menu-icon {
  width: 14px;
  height: 14px;
  transition: all 0.2s;
}
</style>
