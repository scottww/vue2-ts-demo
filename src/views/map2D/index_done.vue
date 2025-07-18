<template>
  <div class="map-viewer">
    <div class="controls new-group">
      <span>经纬度 (格式: 经度,纬度):</span>
      <input v-model="coordinates" placeholder="输入经度,纬度" />
      <button @click="locatePoint">定位至</button>
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
              @click="handleMenu(item)"
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
        <div class="tool-bar-item" @click="clearAllLayer">
          <img
            src="../../assets/mapToolBar/delete.png"
            alt="删除"
            title="清除所有图层"
          />
        </div>

        <!-- 分割线 -->
        <div class="tool-bar-divider-line"></div>
        <div class="tool-bar-item" @click="setDelButtonsVisible">
          <img
            src="../../assets/mapToolBar/close.png"
            alt="显示/隐藏删除标记"
            :title="visibleDel ? '隐藏删除标记' : '显示删除标记'"
          />
        </div>
      </div>

      <div class="layer-buttons">
        <el-row>
          <el-button
            v-for="buttontype in showButtons"
            :key="buttontype"
            :type="getButtonStyle(buttontype)"
            @click="itemClick(buttontype)"
            round
            >{{ buttontype }}</el-button
          >
        </el-row>
      </div>

      <div id="layer-overlays">
        <!-- 你的标签 -->
      </div>
    </div>

    <el-dialog
      title="提交"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="handleCancelForm"
      width="500px"
    >
      <el-form :model="formData" label-width="80px">
        <el-form-item label="绘制类型">
          <!-- <el-input v-model="formData.type" disabled /> -->
          <el-select
            v-model="formData.type"
            placeholder="请选择"
            style="width: 100%"
            disabled
          >
            <el-option
              v-for="item in drawTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="面积">
          <!-- <el-input v-model="formData.type" disabled /> -->
          <el-input
            v-model="formData.area"
            @input="handleInput"
            maxlength="30"
            placeholder="请输入面积"
          >
            <template slot="append">㎡</template>
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancelForm">取消</el-button>
          <el-button type="primary" @click="handleSaveForm">保存</el-button>
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
import { getLength, getArea, getCenter } from "ol/sphere";
import { LineString, Polygon } from "ol/geom";
import { Select } from "ol/interaction";
import { pointerMove } from "ol/events/condition";
import GeoJSON from "ol/format/GeoJSON";

import HoverMenu from "./tool-bar.vue";
import { v4 as uuidv4 } from "uuid";
import { MOCK_DATA2 } from "./data.js";

export default {
  components: { HoverMenu },
  data() {
    return {
      type: "2D",
      currentMaptype: "img",
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
        // itemInfoGuid: "945B5327-A07E-48D1-A68D-786B41B5D81A",
        id: null, // 唯一标识
        type: "",
        area: "",
        coordinates: "" //序列化后的字符串
      },
      pendingFeature: null,
      nodeOverlays: [], // 存储红色圆圈和 x 按钮
      distanceOverlay: null, // 显示距离的 overlay

      savedLayer: null, // 保存的图层
      savedSource: null, // 保存的图层源
      savedOverlays: [], // 保存的overlay

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
          value: "规划",
          icon: require("../../assets/mapToolBar/type3.png"),
          hoverIcon: require("../../assets/mapToolBar/type3_hover.png")
        },
        {
          label: "新增占用",
          value: "占用",
          icon: require("../../assets/mapToolBar/type12.png"),
          hoverIcon: require("../../assets/mapToolBar/type12_hover.png")
        },
        {
          label: "新增补偿",
          value: "补偿",
          icon: require("../../assets/mapToolBar/type12.png"),
          hoverIcon: require("../../assets/mapToolBar/type12_hover.png")
        }
      ],
      drawTypeOptions: [
        // { label: "规划", value: "plan" },
        // { label: "占用", value: "occupy" },
        // { label: "补偿", value: "compensate" }
        { label: "规划", value: "规划" },
        { label: "占用", value: "占用" },
        { label: "补偿", value: "补偿" }
      ],
      onFormSave: null, // 保存回调
      onCancel: null, // 取消回调
      featureCloseButtons: null, // 存储关闭按钮的数组
      delButtons: null, // 存储删除按钮的数组
      visibleDel: false, //删除按钮 总开关 标识
      lastHoveredFeature: null, //上一个被hover的feature
      showButtons: [], // 存储显示要素类型的数组
      isAction1: true,
      isAction2: true,
      isAction3: true,
      featureIdToClose: null, // 存储需要关闭的feature的id
      isDrawing: false // 是否正在绘制
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
      this.tileLayerManager = createTileLayerManager(this.map);
      // this.tileLayerManager.switchTo("TDT_vec");
      // this.tileLayerManager.switchTo("TDT_img");

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
      this.initSavedLayer();

      //注册hover事件(要在savedLayer之后注册)
      // mapService.on("pointermove", this.handleMapPointerMove);
      this.addCustomDrawPolygon();
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
    //在startDraw2的基础上改造
    startDraw2_1(type) {
      // 不再全局清除交互和图层，只移除当前 draw 交互
      if (this.draw) this.map.removeInteraction(this.draw);

      // 保留之前的图层，初始化新交互
      this.draw = new Draw({
        source: this.drawSource,
        type: type
      });
      this.map.addInteraction(this.draw);

      this.isDrawing = true;
      this.draw.on("drawend", (event) => {
        this.isDrawing = false;
        //绘制结束后，清空draw激活状态
        this.map.removeInteraction(this.draw);
        this.draw = null;
        const feature = event.feature;
        // const geometry = feature.getGeometry();
        const geometry = event.feature.getGeometry();
        const geomType = geometry.getType();

        let labelText = "";
        let displayCoord;
        let closeDisplayCoord;

        if (geomType === "LineString") {
          const length = getLength(geometry, { projection: "EPSG:4326" });
          labelText =
            length > 1000
              ? { value: (length / 1000).toFixed(2), unit: "km" }
              : { value: length.toFixed(2), unit: "m" };
          const coords = geometry.getCoordinates();
          displayCoord = coords[coords.length - 1];
        } else if (geomType === "Polygon") {
          // const area = getArea(geometry, { projection: "EPSG:4326" });
          labelText = this.getFormattedArea(geometry, 2); //应返回 { value, unit }
          const coords = geometry.getCoordinates()[0];
          closeDisplayCoord = [coords[0][0], coords[0][1]];
          displayCoord = geometry.getInteriorPoint().getCoordinates();
        }

        // 每次绘制创建新的 overlay 数组用于后续删除
        const overlaysForThisFeature = [];

        // 节点圆点 Overlay
        const coordinates = geometry.getCoordinates()[0];
        // console.log(`geometry.getCoordinates() ...`, geometry.getCoordinates());
        //存储原始结构
        this.formData.coordinates = geometry.getCoordinates();
        coordinates.forEach((coord) => {
          const node = document.createElement("div");
          node.style.width = "10px";
          node.style.height = "10px";
          node.style.backgroundColor = "#fff";
          node.style.border = "2px solid red";
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
          overlaysForThisFeature.push(nodeOverlay);
        });

        // 面积标签 Overlay
        const label = document.createElement("div");
        Object.assign(label.style, {
          fontFamily: "sans-serif",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#FFCB00"
        });
        label.innerHTML = `${labelText.value} ${labelText.unit}`;

        const areaOverlay = new Overlay({
          element: label,
          offset: [0, -10],
          positioning: "center-center"
        });
        this.map.addOverlay(areaOverlay);
        areaOverlay.setPosition(displayCoord);
        overlaysForThisFeature.push(areaOverlay);

        // 删除按钮 Overlay
        const close = document.createElement("div");
        close.title = "点击删除";
        close.innerText = "x";
        Object.assign(close.style, {
          color: "red",
          background: "#fff",
          border: "1px solid red",
          cursor: "pointer",
          width: "16px",
          height: "16px",
          textAlign: "center",
          lineHeight: "12px",
          fontWeight: "700"
        });

        close.addEventListener("click", () => {
          this.drawSource.removeFeature(feature);
          overlaysForThisFeature.forEach((o) => this.map.removeOverlay(o));
        });

        const closeOverlay = new Overlay({
          element: close,
          offset: [0, -10],
          positioning: "bottom-left",
          stopEvent: false
        });
        this.map.addOverlay(closeOverlay);
        closeOverlay.setPosition(closeDisplayCoord);
        overlaysForThisFeature.push(closeOverlay);

        // 添加进全局列表（如果你还需要统一管理）
        this.nodeOverlays.push(...overlaysForThisFeature);

        // 更新线或面数据
        const features = this.drawSource.getFeatures();
        this.lineData = features.map((f) => f.getGeometry().getCoordinates());

        console.log("this.lineData ...", this.lineData);
        // 弹出表单
        // this.showFormWithArea(labelText.value, labelText.unit);

        this.showFormWithArea(labelText.value, labelText.unit)
          .then((action) => {
            if (action === "save") {
              // 用户最终点击了保存
              console.log("用户已保存，执行保存逻辑");
              // 例如：调用接口 this.saveFeatureData(feature)
            }
          })
          .catch((reason) => {
            // 无论是 confirm 阶段点击了取消，还是 form 中取消，统一清理 feature 和 overlay
            this.drawSource.removeFeature(feature);
            overlaysForThisFeature.forEach((o) => this.map.removeOverlay(o));
            console.log("用户取消绘制，已清除", reason);
          });
      });
    },

    clearNodeOverlays() {
      this.nodeOverlays.forEach((o) => this.map.removeOverlay(o));
      this.nodeOverlays = [];
    },
    clearAll() {
      this.drawSource.clear();
      this.overlays.forEach((o) => this.map.removeOverlay(o));
      this.overlays = [];
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
    initDrawLayer(zIndex = 20) {
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
        },
        zIndex: 20
      });

      this.map.addLayer(drawLayer);
    },
    initSavedLayer(zIndex = 20) {
      this.savedSource = new VectorSource();

      // const hoverStyle = new Style({
      //   fill: new Fill({ color: "rgba(255, 255, 0, 0.7)" }),
      //   stroke: new Stroke({ color: "#ff0", width: 2 })
      // });
      const hoverStyle = new Style({
        fill: new Fill({ color: "rgba(255, 255, 0, 0.5)" }), // 透明且柔和的黄色填充
        stroke: new Stroke({ color: "#ffcc00", width: 4, lineDash: [10, 10] }) // 橙黄色虚线，更醒目
      });
      const savedLayer = new VectorLayer({
        source: this.savedSource,
        // style: (feature) => this.getFeatureRenderStyles(feature),
        style: (feature) => {
          if (feature.get("hidden")) {
            return null; // 这句话非常关键，return null 就是不渲染这个要素
          }
          return feature.get("hover")
            ? hoverStyle
            : this.getFeatureRenderStyles(feature);
        },
        zIndex: zIndex
      });

      this.savedLayer = savedLayer; // ✅保留图层引用
      this.map.addLayer(savedLayer);

      // this.map.on("singleclick", (evt) => {
      //   // 1. 通过坐标获取对应的要素
      //   this.map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
      //     // 2. 判断点击位置是否在删除按钮范围内（通常在右上角）
      //     if (this.isClickOnDeleteIcon(evt.coordinate, feature)) {
      //       // 3. 删除对应的 feature
      //       this.savedSource.removeFeature(feature);
      //       console.log("删除了feature", feature.getId());
      //       return true; // 结束遍历
      //     }
      //   });
      // });
    },
    isClickOnDeleteIcon(clickCoord, feature) {
      const geometry = feature.getGeometry();
      if (!(geometry instanceof Polygon)) return false;

      const extent = geometry.getExtent();
      const topRight = [extent[2], extent[3]];

      // 转成像素点
      const clickPixel = this.map.getPixelFromCoordinate(clickCoord);
      const iconPixel = this.map.getPixelFromCoordinate(topRight);

      const dx = clickPixel[0] - iconPixel[0];
      const dy = clickPixel[1] - iconPixel[1];
      const distance = Math.sqrt(dx * dx + dy * dy);

      const tolerancePx = 15; // 像素容差

      return distance < tolerancePx;
    },
    getFeatureRenderStyles(feature) {
      const styles = [];

      const areaType = feature.get("type");
      const area = feature.get("area");
      // if (!areaType || !area || !(geometry instanceof Polygon)) return [];
      const geometry = feature.getGeometry();

      // 主体样式，即使没有属性也可以默认显示
      const baseStyle =
        this.getStyleByType(areaType) ||
        new Style({
          stroke: new Stroke({ color: "#aaa", width: 2 }),
          fill: new Fill({ color: "rgba(170, 170, 170, 0.2)" })
        });
      styles.push(baseStyle);

      // 👉 有 area 和 geometry 才加标签和按钮
      // if (area && geometry instanceof Polygon) {
      //   const center = geometry.getInteriorPoint();
      //   styles.push(
      //     new Style({
      //       geometry: center,
      //       text: new Text({
      //         text: `${(area / 10000).toFixed(2)} 万㎡`,
      //         font: "14px sans-serif",
      //         fill: new Fill({ color: "#000" }),
      //         stroke: new Stroke({ color: "#fff", width: 2 }),
      //         offsetY: -12
      //       })
      //     })
      //   );

      //   const extent = geometry.getExtent();
      //   const topRight = [extent[2], extent[3]];
      //   styles.push(
      //     new Style({
      //       geometry: new Point(topRight),
      //       image: new Icon({
      //         src: require("@/assets/mapToolBar/remove.png"),
      //         scale: 1, // 放大1倍，默认是0.5，试试 0.8、1、1.2 逐步调试
      //         anchor: [0.5, 0.5] // 图标锚点，0.5,0.5 是中心
      //         // size: [32, 32],    // 你可以指定图标大小，单位px（需要图标本身支持）
      //       })
      //     })
      //   );
      // }

      return styles;
    },
    formatArea(area, precision = 4) {
      //按照面积大小显示不同的单位
      if (area > 1000000) {
        return {
          value: (area / 1000000).toFixed(precision),
          unit: "km²"
        };
        // } else if (area > 10000) {
        //   return {
        //     value: (area / 10000).toFixed(precision),
        //     unit: "ha" //公顷  1 ha => 10000 m²
        //   };
      } else {
        return {
          value: area.toFixed(precision),
          unit: "m²"
        };
      }

      //始终显示km²
      // return {
      //   value: (area / 1000000).toFixed(precision), // 始终转成平方千米
      //   unit: "km²"
      // };
      // return {
      //   value: area.toFixed(precision),
      //   unit: "m²"
      // };
    },
    getFormattedArea(geometry, precision = 2) {
      const projection = this.map.getView().getProjection();
      const area = getArea(geometry, { projection });
      //面积赋值到表单，单位为平方米
      this.formData.area = area.toFixed(precision);

      return area > 1000000
        ? { value: (area / 1000000).toFixed(precision), unit: "km²" }
        : { value: area.toFixed(precision), unit: "m²" };
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
    //限制输入框只能输入数字
    handleInput(val) {
      // 只允许数字和小数点
      let filtered = val.replace(/[^\d.]/g, "");

      // 只保留第一个小数点
      const parts = filtered.split(".");
      filtered =
        parts[0] +
        (parts[1] !== undefined ? "." + parts.slice(1).join("") : "");

      // 去除整数部分前导0（但保留 '0' 和 '0.xxx'）
      const [integerPart, decimalPart] = filtered.split(".");
      let normalizedInt = integerPart.replace(/^0+(?=\d)/, "") || "0";

      // 拼接小数部分
      filtered =
        decimalPart !== undefined
          ? normalizedInt + "." + decimalPart
          : normalizedInt;

      this.formData.area = filtered;
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

      this.isDrawing = true;
      drawInteraction.on("drawend", (event) => {
        this.isDrawing = false;
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
    showFormWithArea0(area, unit) {
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
        // this.formData.area = area;
      });
    },
    showFormWithArea(area, unit) {
      return new Promise((resolve, reject) => {
        this.$confirm(
          `绘制完成，面积为 ${area} ${unit}。是否填写信息？`,
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info"
          }
        )
          .then(() => {
            // 用户点击了“确定” → 打开真正的表单填写
            this.dialogVisible = true;

            // 用于 resolve/reject 表单操作结果
            this.onFormSave = async () => {
              console.log("onFormSave");
              try {
                // 假设 formData 是你要提交的数据
                // const res = await this.saveFeatureApi(this.formData);
                // TODO 模拟接口返回
                const res = await this.saveFeatureApiMock(this.formData);

                console.log("保存结果", res);

                if (res && res.success) {
                  this.clearNodeOverlays();

                  // 根据返回结果进行绘制
                  this.drawFeatureByType(res); // 你可以根据 res.data.type 判断怎么画

                  this.dialogVisible = false;
                  this.$message.success("保存成功");
                  resolve("save");
                } else {
                  this.$message.error("保存失败");
                }
              } catch (err) {
                console.error("保存失败", err);
                this.$message.error("请求出错");
              }
            };

            this.onFormCancel = () => {
              console.log("onFormCancel");
              this.dialogVisible = false;
              reject("cancelForm");
            };
          })
          .catch(() => {
            // 用户点击了“取消” → 不进入填写表单
            reject("cancelConfirm");
          });
      });
    },
    saveFeatureApi(data) {
      return this.$axios.post("/api/saveFeature", data);
    },
    saveFeatureApiMock(formData) {
      let _dataForm = { ...formData };
      const coordinates = JSON.stringify(_dataForm.coordinates);
      delete _dataForm.coordinates;
      _dataForm.id = uuidv4();
      _dataForm.geom = {
        type: "Polygon",
        coordinates: coordinates
      };

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            code: 200,
            success: true,
            message: "保存成功",
            data: [
              {
                itemInfoGuid: "945B5327-A07E-48D1-A68D-786B41B5D81A",
                type: "规划",
                //旧有接口返回的这个是一个整体 多个面 （看这次接口改造是否需要新增一个字段或者数据进行拆分标识数据）
                spaceArea:
                  '{"type":"Polygon","coordinates":[[[121.50118163912144,28.346588891364323],[121.50034078110218,28.346642221161627],[121.50034042676931,28.34635349112079],[121.50118118226578,28.346219046971495],[121.50118163912144,28.346588891364323]]]}',
                drawArea: [_dataForm]
              }
            ]
          });
        }, 800);
      });
    },
    //根据接口返回数据，绘制要素面
    drawFeatureByType(res) {
      console.log("模拟接口返回 ...", res);
      const drawAreas = res.data[0].drawArea;
      this.clearDrawLayer();
      drawAreas.forEach((item) => {
        const { geom } = item;
        const coords =
          typeof geom.coordinates === "string"
            ? JSON.parse(geom.coordinates)
            : geom.coordinates;
        // let feature = new Feature(new Polygon(coords), {
        //   type: item.type,
        //   id: item.id,
        //   area: item.area
        // });
        let feature = new Feature({
          geometry: new Polygon(coords)
        });
        feature.setProperties({
          type: item.type,
          // id: item.id,
          id: uuidv4(),
          area: item.area,
          hidden: false //用于控制显、隐
        });
        // feature.setStyle(this.getStyleByType(item.type));
        const type = feature.get("type");
        console.log("绘制类型 ...", type);
        if (!this.showButtons.includes(type)) {
          this.showButtons.push(type);
        }

        this.savedSource.addFeature(feature);
        // 添加面积和删除按钮Overlay
        this.addOverlaysForFeature(feature);
      });
      // this.savedLayer.setStyle((feature) =>
      //   this.getFeatureRenderStyles(feature)
      // );
    },
    addOverlaysForFeature0(feature) {
      const overlaysForThisFeature = [];
      const geometry = feature.getGeometry();

      if (!(geometry instanceof Polygon)) return overlaysForThisFeature;

      // 面积标签
      const area = this.getFormattedArea(geometry, 2); // 返回 { value, unit }
      const label = document.createElement("div");
      Object.assign(label.style, {
        fontFamily: "sans-serif",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#FFCB00",
        userSelect: "none",
        pointerEvents: "none" // 让面积标签不阻塞点击
      });
      label.innerHTML = `${area.value} ${area.unit}`;

      const areaOverlay = new Overlay({
        element: label,
        offset: [0, -10],
        positioning: "center-center",
        stopEvent: false
      });
      this.map.addOverlay(areaOverlay);
      areaOverlay.setPosition(geometry.getInteriorPoint().getCoordinates());
      overlaysForThisFeature.push(areaOverlay);

      // 删除按钮
      const coords = geometry.getCoordinates()[0];
      const closeDisplayCoord = [coords[0][0], coords[0][1]];
      // const extent = geometry.getExtent();
      // const topLeftCoord = [extent[0], extent[3]]; // 取左上角或右上角，根据你的需求
      const close = document.createElement("div");
      close.title = "点击删除";
      close.innerText = "×";
      Object.assign(close.style, {
        color: "red",
        background: "#fff",
        border: "1px solid red",
        cursor: "pointer",
        width: "16px",
        height: "16px",
        textAlign: "center",
        lineHeight: "14px",
        fontWeight: "700",
        userSelect: "none",
        display: "none" // 初时不展示
      });
      close.addEventListener("click", () => {
        this.savedSource.removeFeature(feature);
        overlaysForThisFeature.forEach((o) => this.map.removeOverlay(o));
      });

      const closeOverlay = new Overlay({
        element: close,
        offset: [0, -10],
        positioning: "bottom-left",
        stopEvent: true
      });
      this.map.addOverlay(closeOverlay);
      closeOverlay.setPosition(closeDisplayCoord);
      overlaysForThisFeature.push(closeOverlay);

      // 为几何体绑定点击事件，展示删除按钮
      this.map.on("click", (evt) => {
        // 检查是不是点到了这个feature
        this.map.forEachFeatureAtPixel(evt.pixel, (foundFeature) => {
          if (foundFeature === feature) {
            close.style.display = "";
          } else {
            close.style.display = "none";
          }
        });
      });

      // 记下来方便后续根据外部按钮进行展示
      // if (!this.featureCloseButtons) {
      //   this.featureCloseButtons = new Map();
      // }
      // this.featureCloseButtons.set(feature, close);

      //总开关删除按钮显示、隐藏
      // 记下来方便后续统一展示/隐藏
      if (!this.delButtons) {
        this.delButtons = []; // 统一保存
      }
      this.delButtons.push(close);

      // 记得存起来方便后续管理
      this.savedOverlays.push(...overlaysForThisFeature);

      return overlaysForThisFeature;
    },
    addOverlaysForFeature(feature) {
      const overlaysForThisFeature = [];

      if (feature.get("hidden")) return overlaysForThisFeature;

      const geometry = feature.getGeometry();

      if (geometry instanceof Polygon) {
        // 面积标签
        const area = this.getFormattedArea(geometry, 2);
        const label = document.createElement("div");

        Object.assign(label.style, {
          fontFamily: "sans-serif",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#FFCB00",
          userSelect: "none",
          pointerEvents: "none"
        });

        label.innerHTML = `${area.value} ${area.unit}`;

        const areaOverlay = new Overlay({
          element: label,
          offset: [0, -10],
          positioning: "center-center",
          stopEvent: false
        });

        this.map.addOverlay(areaOverlay);
        areaOverlay.setPosition(geometry.getInteriorPoint().getCoordinates());

        overlaysForThisFeature.push(areaOverlay);

        // 删除按钮
        const coords = geometry.getCoordinates()[0];
        const closeDisplayCoord = [coords[0][0], coords[0][1]];
        const close = document.createElement("div");

        close.title = "点击删除";

        close.innerText = "×";

        Object.assign(close.style, {
          color: "red",
          background: "#fff",
          border: "1px solid red",
          cursor: "pointer",
          width: "16px",
          height: "16px",
          textAlign: "center",
          lineHeight: "14px",
          fontWeight: "700",
          userSelect: "none",
          display: this.visibleDel ? "" : "none", // 初始不展示
          transform: "none",
          transition: "transform 0.2s ease, opacity 0.2s ease",
          opacity: "0.5"
        });
        close.classList.add("close-button");
        // const id = feature.getId();
        const id = feature.get("id");
        this.featureIdToClose = this.featureIdToClose || {};
        this.featureIdToClose[id] = close;

        close.addEventListener("click", () => {
          //删除前 确认框
          this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.savedSource.removeFeature(feature);
            overlaysForThisFeature.forEach((o) => this.map.removeOverlay(o));
          });
        });

        const closeOverlay = new Overlay({
          element: close,
          offset: [0, -10],
          positioning: "bottom-left",
          stopEvent: true
        });

        this.map.addOverlay(closeOverlay);
        closeOverlay.setPosition(closeDisplayCoord);
        overlaysForThisFeature.push(closeOverlay);

        if (!this.delButtons) {
          this.delButtons = []; // 统一保存
        }
        this.delButtons.push(close);
      }

      // 绑定到要素方便后续对其进行展示/隐藏
      feature.set("overlays", overlaysForThisFeature);

      this.savedOverlays.push(...overlaysForThisFeature);

      return overlaysForThisFeature;
    },

    getStyleByType(type) {
      // const type = feature.get("type");
      console.log("getStyleByType ...", type);
      const styles = {
        规划: new Style({
          stroke: new Stroke({
            color: "#ff0606",
            width: 2
          })
          // fill: new Fill({
          //   color: "#ff0606"
          // })
        }),
        占用: new Style({
          stroke: new Stroke({
            color: [76, 175, 80, 1],
            width: 4
          }),
          fill: new Fill({
            color: [76, 175, 80, 1]
          })
        }),
        补偿: new Style({
          stroke: new Stroke({
            color: "#0080ff",
            width: 4
          }),
          fill: new Fill({
            color: "#0080ff"
          })
        })
      };

      return styles[type];
    },
    handleSaveForm() {
      if (this.onFormSave) this.onFormSave();
    },
    handleCancelForm() {
      if (this.onFormCancel) this.onFormCancel();
    },
    //tool-bar
    handleMenu(item) {
      console.log("点击了菜单：", item);
      this.showMenu = false;
      // 这里可执行实际功能逻辑
      this.formData.type = item.value;
      this.startDraw2_1("Polygon");
    },
    clearDrawLayer() {
      this.drawSource.clear();
    },
    clearAllLayer() {
      this.drawSource.clear();
      this.savedSource.clear();
      this.savedOverlays.forEach((o) => this.map.removeOverlay(o));
    },
    // 点击删除按钮才显示要素删除按钮
    showCloseButtonsForFeature(feature) {
      const close = this.featureCloseButtons?.get(feature);
      if (close) {
        close.style.display = "";
      }
    },
    hideCloseButtonsForFeature(feature) {
      const close = this.featureCloseButtons?.get(feature);
      if (close) {
        close.style.display = "none";
      }
    },
    toggleCloseButtonsForFeature() {
      this.isShowCloseButtons = !this.isShowCloseButtons;
    },
    // 是否显示 删除按钮  总开关 标识：
    setDelButtonsVisible() {
      // 取非
      this.visibleDel = !this.visibleDel;

      // 每时刻根据总开关渲染每一个要素
      this.savedSource.getFeatures().forEach((feature) => {
        // 要素若为hidden，不展示删除按钮
        if (feature.get("hidden")) return;

        const overlays = feature.get("overlays") || [];
        overlays.forEach((o) => {
          if (o.getElement().classList.contains("close-button")) {
            o.getElement().style.display = this.visibleDel ? "" : "none";
          }
        });
      });
    },
    hideFeaturesByType(type) {
      this.savedSource.getFeatures().forEach((feature) => {
        if (feature.get("type") === type) {
          feature.set("hidden", true);

          // 显示对应的 overlays
          const overlays = feature.get("overlays") || [];
          overlays.forEach((o) => (o.getElement().style.display = "none"));
        }
      });
      this.savedSource.changed();
    },
    showFeaturesByType(type) {
      this.savedSource.getFeatures().forEach((feature) => {
        if (feature.get("type") === type) {
          feature.unset("hidden"); // 解除

          // 每个要素上绑定的 overlays 都需要一同展示，但是需要根据总开关进行渲染
          const overlays = feature.get("overlays") || [];
          overlays.forEach((o) => {
            if (o.getElement().classList.contains("close-button")) {
              o.getElement().style.display = this.visibleDel ? "" : "none";
            } else {
              o.getElement().style.display = "";
            }
          });
        }
      });
      this.savedSource.changed();
    },
    getButtonStyle(type) {
      switch (type) {
        case "占用":
          return "success";
        case "补偿":
          return "primary";
        case "规划":
          return "danger";
        default:
          return "";
      }
    },
    itemClick(type) {
      console.log("type", type);
      switch (type) {
        case "占用":
          if (this.isAction1) {
            // this.delZyLayer();
            this.hideFeaturesByType("占用");
            this.isAction1 = false;
          } else {
            this.isAction1 = true;
            this.showFeaturesByType("占用");
            // this.addZyLayer();
          }
          break;
        case "补偿":
          if (this.isAction2) {
            // this.delBcLayer();
            this.hideFeaturesByType("补偿");
            this.isAction2 = false;
          } else {
            // this.addBcLayer();
            this.showFeaturesByType("补偿");
            this.isAction2 = true;
          }
          break;
        case "规划":
          if (this.isAction3) {
            // this.delGhLayer();
            this.hideFeaturesByType("规划");
            this.isAction3 = false;
          } else {
            // this.addGhLayer();
            this.showFeaturesByType("规划");
            this.isAction3 = true;
          }
          break;
      }
    },
    handleMapPointerMove0(evt) {
      // 检查鼠标是不是在哪个要素上
      const hovered = this.map.forEachFeatureAtPixel(
        evt.pixel,
        (feature) => feature
      );

      console.log("hovered feature ...", hovered);
      const { lastHoveredFeature } = this;
      // 清空上一个
      if (this.lastHoveredFeature && this.lastHoveredFeature !== hovered) {
        this.lastHoveredFeature.unset("hover"); // 解除 hover
      }

      // 设置当前为 hover
      if (hovered && hovered !== this.lastHoveredFeature) {
        hovered.set("hover", true);
      }

      // 记录到 this
      this.lastHoveredFeature = hovered;

      this.savedSource.changed();
      // 重新渲染
      // this.savedLayer.changed();

      // 设置鼠标样式为 pointer
      if (hovered) {
        this.map.getTargetElement().style.cursor = "pointer";
      } else {
        this.map.getTargetElement().style.cursor = "default";
      }
    },
    handleMapPointerMove(evt) {
      console.log("handleMapPointerMove ...", evt, this.isDrawing);
      if (this.isDrawing) return;
      // 检查鼠标是不是在哪个要素上
      const hovered = this.map.forEachFeatureAtPixel(
        evt.pixel,
        (feature) => feature
      );

      // 清空上一个
      if (this.lastHoveredFeature && this.lastHoveredFeature !== hovered) {
        this.lastHoveredFeature.unset("hover");

        //复原上一个对应标签样式
        const prevId = this.lastHoveredFeature.get("id");
        const prevClose = this.featureIdToClose[prevId];
        if (prevClose) {
          prevClose.style.opacity = "0.5";
          prevClose.style.transform = "none";
        }
      }

      // 设置当前为 hover
      if (hovered && hovered !== this.lastHoveredFeature) {
        hovered.set("hover", true);

        // 高亮当前标签样式
        const id = hovered.get("id");
        const close = this.featureIdToClose[id];
        if (close) {
          close.style.opacity = "1";
          close.style.transform = "scale(1.2)";
        }
      }

      // 记录到 this
      this.lastHoveredFeature = hovered;

      this.savedSource.changed();

      // 设置鼠标样式为 pointer
      if (hovered) {
        this.map.getTargetElement().style.cursor = "pointer";
      } else {
        this.map.getTargetElement().style.cursor = "default";
      }
    },
    // ====================================绘制自定义区域========================================
    addCustomDrawPolygon(data = []) {
      const targetData = MOCK_DATA2;
      // 默认样式
      // const normalStyle = new Style({
      //   stroke: new Stroke({ color: "#3399CC", width: 2 }),
      //   fill: new Fill({ color: "rgba(0, 153, 255, 0.3)" })
      // });

      // const hoverStyle = new Style({
      //   stroke: new Stroke({ color: "#FF0000", width: 2 }),
      //   fill: new Fill({ color: "rgba(255, 0, 0, 0.3)" })
      // });
      // 样式映射
      const styleMap = {
        规划: {
          stroke: "#1E90FF",
          fill: "rgba(30,144,255,0.3)",
          hoverStroke: "#104E8B",
          hoverFill: "rgba(30,144,255,0.6)"
        },
        占用: {
          stroke: "#FFA500",
          fill: "rgba(255,165,0,0.3)",
          hoverStroke: "#CC8400",
          hoverFill: "rgba(255,165,0,0.6)"
        },
        补偿: {
          stroke: "#32CD32",
          fill: "rgba(50,205,50,0.3)",
          hoverStroke: "#228B22",
          hoverFill: "rgba(50,205,50,0.6)"
        },
        default: {
          stroke: "#666666",
          fill: "rgba(102,102,102,0.3)",
          hoverStroke: "#444",
          hoverFill: "rgba(102,102,102,0.6)"
        }
      };

      const source = new VectorSource();

      targetData.forEach((item) => {
        const geo = this.parseGeometry(item.spaceArea);
        if (!geo) return;

        const feature = new GeoJSON().readFeature(
          {
            type: "Feature",
            geometry: geo,
            properties: {
              ...item
            }
          },
          {
            featureProjection: "EPSG:4326"
          }
        );

        // feature.setStyle(normalStyle);
        //根据类型获取样式
        feature.setStyle(this.getStyleByType2(styleMap, item.type));
        source.addFeature(feature);
      });

      const vectorLayer = new VectorLayer({
        source
        // style: (f) => this.getStyleByType2(styleMap, f.get("type")) // 再保险
      });

      this.map.addLayer(vectorLayer);

      // hover 效果：闪烁
      const selectPointerMove = new Select({
        condition: pointerMove,
        style: (f) => this.getStyleByType2(styleMap, f.get("type"), true)
      });

      this.map.addInteraction(selectPointerMove);

      // hover 闪烁效果（简单版，定时器模拟）
      this.drawHoverEffect(selectPointerMove, styleMap);
    },
    parseGeometry(spaceArea) {
      try {
        // 第一步，解析整个 spaceArea 字符串
        let geo =
          typeof spaceArea === "string" ? JSON.parse(spaceArea) : spaceArea;

        // 第二步，若 coordinates 是字符串，则再解析一次
        if (typeof geo.coordinates === "string") {
          geo.coordinates = JSON.parse(geo.coordinates);
        }

        return geo;
      } catch (e) {
        console.warn("无法解析 geometry：", spaceArea, e);
        return null;
      }
    },
    getStyleByType2(styleMap, type, isHover = false) {
      const styleConf = styleMap[type] || styleMap["default"];
      return new Style({
        stroke: new Stroke({
          color: isHover ? styleConf.hoverStroke : styleConf.stroke,
          width: 2
        }),
        fill: new Fill({
          color: isHover ? styleConf.hoverFill : styleConf.fill
        })
      });
    },
    drawHoverEffect(selectPointerMove, styleMap) {
      let lastFeature = null;
      let flickerTimer = null;
      const _that = this;

      selectPointerMove.on("select", (e) => {
        const feature = e.selected[0];
        console.log("hover feature:", feature && feature.get("id"));

        if (lastFeature && lastFeature !== feature) {
          lastFeature.setStyle(
            _that.getStyleByType2(styleMap, lastFeature.get("type"))
          );
        }

        if (feature) {
          if (flickerTimer) clearInterval(flickerTimer);
          let visible = true;
          flickerTimer = setInterval(() => {
            feature.setStyle(
              _that.getStyleByType2(styleMap, feature.get("type"), visible)
            );
            visible = !visible;
          }, 400);
        } else {
          if (flickerTimer) clearInterval(flickerTimer);
        }

        lastFeature = feature;
      });
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
// .measure-label {
//   background: white;
//   border: 1px solid #ccc;
//   padding: 2px 4px;
//   font-size: 12px;
//   border-radius: 4px;
//   white-space: nowrap;
// }

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

//要素类型控制组
.layer-buttons {
  position: absolute;
  left: 50%;
  bottom: 40px;
  transform: translateX(-50%);
  z-index: 2000;
}

// 删除按钮 样式
.close-button {
  color: red;
  background: #fff;
  border: 1px solid red;
  cursor: pointer;
  width: 16px;
  height: 16px;
  textalign: center;
  line-height: 14px;
  fontweight: 700;
  userselect: none;
  display: none;
  transform: none;
  transition: transform 0.2s ease, opacity 0.2s ease;
  opacity: 0.5;
}

.close-button.active {
  transform: scale(1.2);
  opacity: 1;
}

// 测量工具(包含外部css样式的，结合css使用)
@import url("../../utils/map/mapUtils/features/MeasureTool.css");
</style>
