<template>
  <div class="monitoringRemoteSensing-map__wrapper" v-loading="loading">
    <div class="SECK-common-layout">
      <!-- <div class="HONGAN4D-common-layout-center HONGAN4D-flex-main"> -->
      <div id="gis-map2" ref="mapContainer" class="map-container"></div>
      <!-- </div> -->

      <MapTopControl
        :value="currentLayer"
        @tool="handleTool"
        @change-layer="switchMap"
        @select="handleAreaSelect"
        @close="handleClose"
      />

      <div class="toggleButton-box" :class="{ collapsed: isPanelCollapsed }">
        <IconButtonGroup
          v-model="rightPanelActiveIndex"
          :items="rightPanelButtons"
          width="152px"
          height="53px"
          @click="handleRightPanelButtonClick"
        />
      </div>

      <!-- 底部年份选择组件 -->
      <div class="year-picker-box" :class="{ collapsed: isPanelCollapsed }">
        <Yearpicker />
      </div>

      <div class="control-slider-box" :class="{ collapsed: isPanelCollapsed }">
        <RollerBlind
          label="卷帘"
          :initial-position="rollerBlindValue"
          :width="300"
          :handle-color="'#ffffff'"
          @position-change="handleRollerBlindChange"
        />
        <RollerBlind
          label="透明度"
          :initial-position="transparencyValue"
          :width="300"
          :handle-color="'#ffffff'"
          @position-change="handleTransparencyChange"
        />
      </div>

      <div class="right-panel-box">
        <PanelGdmj
          v-if="rightPanelActiveIndex === 0"
          ref="gdmjPanelRef"
          @toggle="handlePanelToggle"
        />
        <PanelGdbh
          v-if="rightPanelActiveIndex === 1"
          ref="gdbhPanelRef"
          @toggle="handlePanelToggle"
        />
        <PanelZzjg
          v-if="rightPanelActiveIndex === 2"
          ref="zzjgPanelRef"
          @toggle="handlePanelToggle"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { DRAW_FORM_SCHEMA } from "./drawFormSchema.js";
import { WATER_MARKER_LIST } from "./markerList.js";

import request from "@/utils/request";
// import gcj02Mecator from '@/utils/gcj02Mecator';

import { mapGetters } from "vuex";

import PanelGdmj from "./PanelGdmj.vue";
import PanelGdbh from "./PanelGdbh.vue";
import PanelZzjg from "./PanelZzjg.vue";
import MapTopControl from "./components/MapTopControl.vue";
import LayerControl from "./components/LayerControl.vue";
import LegendPanel from "./components/LegendPanel.vue";
import ToggleButton from "./components/ToggleButton.vue";
import SvgImage from "./components/SvgImage.vue";
import SearchPanel from "./components/SearchPanel.vue";

import searchIcon from "@/assets/images/oneMap/search.svg";
import warningIcon from "@/assets/images/oneMap/waring.svg";
import IconButtonGroup from "./components/IconButtonGroup.vue";
import Yearpicker from "./components/YearPicker.vue";
import RollerBlind from "./components/RollerBlind.vue";

const _ = require("lodash");
export default {
  components: {
    PanelGdmj,
    PanelGdbh,
    PanelZzjg,
    MapTopControl,
    LayerControl,
    LegendPanel,
    ToggleButton,
    SvgImage,
    SearchPanel,
    IconButtonGroup,
    Yearpicker,
    RollerBlind,
  },
  data() {
    return {
      WATER_MARKER_LIST, //测试数据
      DRAW_FORM_SCHEMA,
      isPanelCollapsed: null,
      current: "search",
      searchIcon,
      warningIcon,
      currentLayer: "satellite",
      loading: false,
      map: null,
      mapService: null,
      tileLayerManager: null, //图层管理器
      drawManager: null, //绘制管理器
      currentFeature: null,
      dialogVisible: false,
      currentSchema: null, // 当前表单配置
      form: {
        // name: "",
        // remark: "",
      },
      formRules: {},
      // ===== 坐标拾取 =====
      pickCoordVisible: false,
      pickCoord: "", // 坐标字符串
      pickOverlay: null, // Overlay
      // ===== 测量 =====
      measureDraw: null,
      measureOverlays: [],

      // vectorSource: null,
      // vectorSourceAdd: null,
      // vectorLayer: null,

      //测量图层
      measureSource: null,
      measureLayer: null,
      measureTool: null,
      markerCluster: null,
      geojsonLoader: null, // geojson加载器

      // 子页面控制按钮组
      rightPanelActiveIndex: 0,
      rightPanelButtons: [
        {
          id: 1,
          name: "耕地面积",
          type: "gdmj",
          icon: require("@/assets/images/monitoringRemoteSensing/icon1.png"),
        },
        {
          id: 2,
          name: "耕地变化",
          type: "gdbh",
          icon: require("@/assets/images/monitoringRemoteSensing/icon2.png"),
        },
        {
          id: 3,
          name: "种植结构",
          type: "zzjg",
          icon: require("@/assets/images/monitoringRemoteSensing/icon2.png"),
        },
      ],

      // 卷帘
      rollerBlindValue: 100,
      // 透明度
      transparencyValue: 100,
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  created() {
    document.getElementsByTagName("body")[0].style.zoom = 1;
  },
  mounted() {
    console.log("userInfo ...", this.userInfo);
    // this.initMap();
    // 监听窗口大小变化事件
    window.addEventListener("resize", this.resizeEvent);
  },
  methods: {
    fetchPointList() {
      // request({
      //   url: "/api/irrigation/point/list",
      //   method: "get",
      //   params: {
      //     userId: this.userInfo.id,
      //   },
      // })
      //   .then((res) => {
      //     console.log("fetchPointList ...", res);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //     console.log("请求失败");
      //   });
    },
    handleMapClick(evt) {
      console.log("evt ...", evt);
      const feature = this.map.forEachFeatureAtPixel(
        evt.pixel,
        (feature) => feature
      );
      if (feature) {
        console.log("feature ...", feature);
      }
    },
    resizeEvent() {
      //zoom被改变，导致ol对地图点位及鼠标相对位置相关操作发生偏移
      document.getElementsByTagName("body")[0].style.zoom = 1;
    },
    initMap() {
      console.log("initMap");
      const anjiConfig = {
        center: [119.66477354981258, 30.737449851030508],
        zoom: 11.9863,
        maxZoom: 18,
        minZoom: 4,
        projection: "EPSG:4326",
      };
      const hangzhouConfig = {
        center: [120.2, 30.2],
        zoom: 11,
        maxZoom: 18,
        minZoom: 4,
      };
      const mapService = new MapService("gis-map2", {
        center: anjiConfig.center,
        zoom: anjiConfig.zoom,
        maxZoom: 18,
        minZoom: 4,
        projection: "EPSG:4326",
      });
      // mapService.addTileLayer("TDT_vec");

      // 切换中心
      // mapService.setCenter(this.center);

      // 注册点击事件
      // mapService.on("singleclick", this.handleMapClick);

      // 注册地图加载完成事件
      // mapService.on("load", () => {
      //   console.log("地图加载完成");
      //   mapService.addMarkerByLngLat(this.center, pointMarker);
      // });

      // mapService.addMarkerByLngLat(this.center, pointMarker);
      this.mapService = mapService;
      this.map = mapService.getMapInstance();

      // 初始化GeoJSON数据加载器
      this.geojsonLoader = new GeoJSONDataLoader(this.map);

      // 只控制底图图层，不影响其他业务图层
      this.tileLayerManager = createTileLayerManager(this.map);
      // this.tileLayerManager.switchTo("TDT_vec");
      this.tileLayerManager.switchTo("TDT_img");

      // ====== 绘制工具 ======
      // DrawManager 自己的 source/layer
      const drawSource = new VectorSource();
      const drawLayer = new VectorLayer({
        source: drawSource,
        zIndex: 10,
      });
      this.map.addLayer(drawLayer);

      this.drawManager = new DrawManager(this.map, {
        onDrawEnd: this.handleDrawEnd,
      });
      // 将 DrawManager 的 source 替换为独立 drawSource
      this.drawManager.source = drawSource;
      this.drawManager.layer = drawLayer;

      // ====== 测量工具 ======
      // MeasureTool 自己的 source/layer
      const measureSource = new VectorSource();
      const measureLayer = new VectorLayer({
        source: measureSource,
        zIndex: 11,
        style: () => null, // 默认不渲染样式，样式在 MeasureTool 内部控制
      });
      this.map.addLayer(measureLayer);

      this.measureSource = measureSource;
      this.measureLayer = measureLayer;
      // this.measureTool = new MeasureTool(this.map, measureSource);
      this.measureTool = new MeasureTool(this.map);

      // 初始化标记聚合
      this.markerCluster = new MarkerCluster(this.map, {
        zoomThreshold: 11,
        clusterIcon: require("@/assets/images/oneMap/marker/cluster.png"),
        iconWidth: 54,
        iconHeight: 53,
      });

      // 初始化时自动加载默认数据（耕地面积）
      if (this.geojsonLoader) {
        this.geojsonLoader.loadData(this.rightPanelButtons[0].type);
      }

      // 初始化地图交互事件
      mapService.initMapInteractionEvents();

      // 监听地图信息变化事件
      mapService.addEventListener("map-info-change", (mapInfo) => {
        console.log("地图信息变化：", {
          zoom: mapInfo.zoom,
          center: mapInfo.center,
          centerLonLat: mapInfo.centerLonLat,
          extent: mapInfo.extent,
          extentLonLat: mapInfo.extentLonLat,
        });
      });
    },
    onMapSingleClick(event) {},
    onHoverPointerMove(event) {},
    handleTool(type) {
      this.drawManager.deactivate(); // 禁用 DrawManager
      // this.measureTool.deactivate(); // 停止测量

      if (type === "pick_coordinate") {
        this.current = null; // 隐藏搜索框
        this.pickCoordVisible = true;
        // 初始化坐标拾取工具
        const picker = new CoordinatePicker(this.map);
        // 开始拾取坐标
        picker.start();
        // const coordinates = picker.getCoordinates(); // 获取已拾取的坐标列表

        // 监听每次拾取的坐标
        picker.on("picked", (coord) => {
          console.log("用户点击的坐标:", coord);
          if (coord.length) {
            const [lng, lat] = coord;
            this.pickCoord = `${lng.toFixed(8)}, ${lat.toFixed(8)}`;
          }
        });
      } else if (type === "measure_distance") {
        // this.measureTool.activate("LineString");
        this.measureTool.start("LineString");
      } else if (type === "measure_area") {
        // this.measureTool.activate("Polygon");
        this.measureTool.start("Polygon");
      } else if (type.startsWith("add_")) {
        this.drawManager.start(
          type === "add_point"
            ? "Point"
            : type === "add_polyline"
            ? "LineString"
            : "Polygon"
        );
      }
    },
    // 测量结束回调后恢复 DrawManager
    onMeasureFinish() {
      this.measureTool.deactivate();
      this.drawManager.stop();
    },
    clearAllTools() {
      // 1清除绘制
      this.drawManager && this.drawManager.clear();

      // 清除坐标拾取
      if (this.pickClickKey) {
        this.map.un("singleclick", this.pickClickKey);
        this.pickClickKey = null;
      }
      this.pickCoord = "";

      // 清除测量
      if (this.measureDraw) {
        this.map.removeInteraction(this.measureDraw);
        this.measureDraw = null;
      }

      this.measureOverlays.forEach((o) => {
        this.map.removeOverlay(o);
      });
      this.measureOverlays = [];
    },
    drawPoint() {
      this.drawManager.start("Point");
    },
    drawLine() {
      this.drawManager.start("LineString");
    },
    drawPolygon() {
      this.drawManager.start("Polygon");
    },
    handleDrawEnd0(feature) {
      this.currentFeature = feature;
      const geomType = feature.getGeometry().getType();
      this.currentSchema = DRAW_FORM_SCHEMA[geomType];

      this.form = {};
      this.formRules = {}; // 清空之前的规则

      this.currentSchema.fields.forEach((f) => {
        // 初始化值
        if (f.prop.includes("Lnglat")) {
          const coords = feature.getGeometry().getCoordinates();
          this.$set(
            this.form,
            f.prop,
            geomType === "Point" ? coords.join(", ") : JSON.stringify(coords)
          );
        } else if (f.default !== undefined) {
          this.$set(this.form, f.prop, f.default);
        } else {
          this.$set(this.form, f.prop, "");
        }

        // 动态生成校验规则
        if (f.required) {
          let rules = [
            { required: true, message: `${f.label}不能为空`, trigger: "blur" },
          ];

          if (f.type === "number") {
            rules.push({
              validator: (rule, value, callback) => {
                if (value === "" || value === null || isNaN(value)) {
                  callback(new Error(`${f.label}必须为数字`));
                } else if (Number(value) <= 0) {
                  callback(new Error(`${f.label}必须大于0`));
                } else {
                  callback();
                }
              },
              trigger: "blur",
            });
          }

          this.$set(this.formRules, f.prop, rules);
        }
      });

      this.dialogVisible = true;
    },
    handleDrawEnd(feature) {
      console.log("handleDrawEnd 111...");
      this.currentFeature = feature;
      const geom = feature.getGeometry();
      const geomType = geom.getType();
      this.currentSchema = DRAW_FORM_SCHEMA[geomType];

      this.form = {};
      this.formRules = {};

      this.currentSchema.fields.forEach((f) => {
        /** ---------- 点：经纬度（8 位小数） ---------- */
        if (geomType === "Point" && f.prop.includes("Lnglat")) {
          const [lng, lat] = geom.getCoordinates();
          const lnglatStr = `${lng.toFixed(8)}, ${lat.toFixed(8)}`;
          this.$set(this.form, f.prop, lnglatStr);
          return;
        }

        /** ---------- 线：长度（km，2 位小数） ---------- */
        if (
          geomType === "LineString" &&
          f.prop.toLowerCase().includes("length")
        ) {
          const length = getLength(geom, { projection: "EPSG:4326" }); // 米
          const km = (length / 1000).toFixed(2);
          this.$set(this.form, f.prop, km);
          return;
        }

        /** ---------- 面：面积（km²，2 位小数） ---------- */
        if (geomType === "Polygon" && f.prop.toLowerCase().includes("area")) {
          const area = getArea(geom, { projection: "EPSG:4326" }); // m²
          const km2 = (area / 1e6).toFixed(2);
          this.$set(this.form, f.prop, km2);
          return;
        }

        /** ---------- 默认值 ---------- */
        if (f.default !== undefined) {
          this.$set(this.form, f.prop, f.default);
        } else {
          this.$set(this.form, f.prop, "");
        }

        /** ---------- 校验规则 ---------- */
        if (f.required) {
          const rules = [
            {
              required: true,
              message: `${f.label}不能为空`,
              trigger: ["blur", "change"],
            },
          ];

          if (f.type === "number") {
            rules.push({
              validator: (rule, value, callback) => {
                if (value === "" || value === null || isNaN(value)) {
                  callback(new Error(`${f.label}必须为数字`));
                } else if (Number(value) <= 0) {
                  callback(new Error(`${f.label}必须大于0`));
                } else {
                  callback();
                }
              },
              trigger: "blur",
            });
          }

          this.$set(this.formRules, f.prop, rules);
        }
      });

      this.dialogVisible = true;
    },
    handleSubmit() {
      if (!this.currentFeature) return;

      this.$refs.drawFormRef.validate((valid) => {
        if (!valid) {
          // this.$message.warning("表单未填写完整，无法提交！");
          return;
        }

        // 校验通过，绑定属性
        this.currentFeature.setProperties({
          ...this.form,
          __geomType: this.currentFeature.getGeometry().getType(),
        });

        const geojson = new GeoJSON().writeFeatureObject(this.currentFeature);
        console.log("提交数据", geojson);

        // 清理状态并关闭弹窗
        this.clearCurrentFeature();
        this.dialogVisible = false;
      });
    },
    // 判断表单是否有修改
    isFormDirty() {
      if (!this.currentSchema) return false;
      return this.currentSchema.fields.some((f) => {
        const defaultValue = f.default !== undefined ? f.default : "";
        return this.form[f.prop] !== defaultValue;
      });
    },

    // 清理 feature
    clearCurrentFeature() {
      if (this.currentFeature) {
        this.drawManager.source.removeFeature(this.currentFeature);
        this.currentFeature = null;
      }
      this.form = {};
      this.formRules = {};
    },

    handleCancel() {
      if (this.currentFeature) {
        this.drawManager.source.removeFeature(this.currentFeature);
        this.currentFeature = null;
      }
      this.dialogVisible = false;
    },
    handleDialogClose() {
      // 如果表单有内容未保存，可以提示用户
      // this.handleCancel();
      this.beforeCloseDialog(() => {
        this.handleCancel();
      });
    },
    // 点击 X 或遮罩或取消按钮触发
    beforeCloseDialog() {
      if (this.currentFeature && this.isFormDirty()) {
        this.$confirm("数据未保存，是否放弃？", "提示", {
          confirmButtonText: "放弃",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.clearCurrentFeature();
            this.handleCancel(); // 关闭弹窗
          })
          .catch(() => {
            // 用户取消放弃，弹窗保持打开
          });
      } else {
        // 没有修改数据，直接关闭
        this.clearCurrentFeature();
        this.handleCancel();
      }
    },
    formatNumber(prop, val, len = 2) {
      if (val === undefined) return;
      let newVal = val.toString().replace(/[^0-9.]/g, "");
      const parts = newVal.split(".");
      if (parts.length > 2) newVal = parts[0] + "." + parts[1];
      if (parts[1]) parts[1] = parts[1].slice(0, len);
      newVal = parts[1] ? parts[0] + "." + parts[1] : parts[0];
      this.$set(this.form, prop, newVal);
    },

    switchMap(mapType) {
      // eg. 调用百度地图 API 切换图层
      console.log("切换地图为:", mapType);
      this.currentLayer = mapType;
      if (mapType === "vector") {
        // 切换到矢量图
        this.tileLayerManager.switchTo("TDT_vec");
      } else if (mapType === "satellite") {
        // 切换到卫星图
        this.tileLayerManager.switchTo("TDT_img");
      } else if (mapType === "terrain") {
        // 切换到地形图
        this.tileLayerManager.switchTo("TDT_ter");
      }
    },
    handleAreaSelect(area) {
      console.log("选中的区域：", area);
      // TODO: 可根据选中区域定位地图
      // area = { province, city, district, longitude, latitude, zoomLevel }

      const { longitude, latitude, zoomLevel } = area;
      if (longitude != null && latitude != null) {
        flyTo(this.map, longitude, latitude, zoomLevel, 1000);
      } else {
        console.warn("该区县没有经纬度，无法飞行");
      }
    },
    // 关闭dropdown逻辑
    handleClose() {},
    handleLayerChange(val) {
      console.log("选中的图层：", val);
      // TODO: 控制图层显示隐藏
    },
    handlePanelToggle(isCollapsed) {
      console.log("handlePanelToggle ...", isCollapsed);
      this.isPanelCollapsed = isCollapsed;
    },
    closePickCoord() {
      this.pickCoordVisible = false;
      this.pickCoord = "";
      this.current = "search";
    },
    handleRightPanelButtonClick(panel) {
      console.log("handleRightPanelButtonClick ...", panel);

      // 添加null检查，防止取消选择时出错
      if (!panel) return;

      // 根据按钮类型加载对应的数据
      // if (this.geojsonLoader) {
      //   // 如果是耕地变化按钮，先加载数据再启用卷帘模式
      //   if (panel.type === 'gdbh') {
      //     this.geojsonLoader.loadData(panel.type).then(() => {
      //       this.geojsonLoader.enableSwipe();
      //     }).catch(error => {
      //       console.error('加载耕地变化数据失败:', error);
      //     });
      //   } else {
      //     // 其他情况禁用卷帘并加载单个图层
      //     this.geojsonLoader.disableSwipe();
      //     this.geojsonLoader.loadData(panel.type);
      //   }
      // }

      if (this.geojsonLoader) {
        // 先加载数据再启用卷帘模式, true是清除之前的图层
        this.geojsonLoader
          .loadData(panel.type, "2021", true)
          .then(() => {
            //恢复默认值
            // 卷帘
            this.rollerBlindValue = 100;
            // 透明度
            this.transparencyValue = 100;
            this.geojsonLoader.setSwipePosition(1);
            this.geojsonLoader.enableSwipe();
          })
          .catch((error) => {
            console.error("加载耕地变化数据失败:", error);
          });
      }
    },
    handleRollerBlindChange(position) {
      console.log(`handleRollerBlindChange ...`, position);
      // this.sliderPosition = position.toFixed(2);
      this.rollerBlindValue = position;

      // 设置卷帘位置（转换为0-1范围）
      if (this.geojsonLoader) {
        this.geojsonLoader.setSwipePosition(position / 100);
      }
    },
    handleTransparencyChange(position) {
      console.log(`handleTransparencyChange ...`, position);
      // this.sliderPosition = position.toFixed(2);
      this.transparencyValue = position;

      // 将透明度设置应用到数据图层
      if (this.geojsonLoader) {
        this.geojsonLoader.setOpacity(position);
      }
    },
  },
  beforeDestroy() {
    // 清理资源
    if (this.geojsonLoader) {
      this.geojsonLoader.destroy();
    }
    window.removeEventListener("resize", this.resizeEvent);
  },
};
</script>

<style lang="scss" scoped>
.monitoringRemoteSensing-map__wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.SECK-common-layout {
  position: relative;
  height: 100%;
}
.map-container {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  position: relative;
}

// 定制dropdown样式
::v-deep .dropdown-content.dropdown-BaseDropdown {
  width: auto;
}

.right-panel-box {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  /* 不要写 width 和 background，交给子组件控制 */
}

.LayerControl-box {
  position: absolute;
  bottom: 20px;
  left: 10px;
}
.legendPanel-box {
  position: absolute;
  bottom: 20px;
  left: 220px;
}
.searchPanel-box {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 10px;
  z-index: 20;
}
.toggleButton-box {
  position: absolute;
  top: 10px;
  right: 30px;
  display: flex;
  flex-direction: column;
  z-index: 20;
  transition: transform 0.3s ease;
  // 初始状态：RightPanel 是展开的，按钮不平移
  transform: translateX(0);
}
.toggleButton-box.collapsed {
  transform: translateX(-455px); // 注意：= RightPanel宽度(440) + 自己宽度(15)
  right: 0;
}

.yearPicker-box {
  position: absolute;
  top: 10px;
  right: 100px;
  z-index: 20;
}

.coord-picker-box {
  position: absolute;
  top: 12px;
  right: 0;
  transform: translateX(-530px);
  z-index: 999;
  width: 260px;
}

::v-deep .el-input__suffix-inner {
  color: #333;
}

// 坐标拾取
.coord-picker-box {
  position: absolute;
  top: 12px;
  right: 0;
  transform: translateX(-530px);
  z-index: 999;
  width: 260px;

  ::v-deep .el-icon-close {
    font-size: 20px;
    cursor: pointer;
  }
}

// 年份选择组件容器
.year-picker-box0 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
  z-index: 20;
}

.year-picker-box {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  display: flex;
  justify-content: center;
  // width: 1225px;
}

.year-picker-box.collapsed {
  left: 0;
  right: 440px;
  transform: none;
}

// 卷帘、透明度
.control-slider-box {
  position: absolute;
  left: 130px;
  left: 350px;
  // left: 50%;
  // transform: translateX(-50%);
  bottom: 120px;
  z-index: 20;
  display: flex;
  // justify-content: center;
  width: 1225px;
  gap: 20px;
}

// 与年份选择器左对齐（折叠状态）
.control-slider-box.collapsed {
  // left: 0;
  left: 130px;
  right: 440px;
  transform: none;
}
</style>