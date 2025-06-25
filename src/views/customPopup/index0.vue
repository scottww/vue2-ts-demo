<template>
  <div class="measure-tool">
    <div class="measure-buttons">
      <button @click="startMeasure('LineString')">测距</button>
      <button @click="startMeasure('Polygon')">测面</button>
      <button @click="clearMeasure">清除</button>
    </div>
  </div>
</template>

<script>
import Draw from "ol/interaction/Draw";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { getArea, getLength } from "ol/sphere";
import Overlay from "ol/Overlay";

export default {
  name: "MeasureTool",

  data() {
    return {
      draw: null,
      source: null,
      vector: null,
      measureTooltipElement: null,
      measureTooltip: null,
      sketch: null
    };
  },

  mounted() {
    // 初始化图层
    this.source = new VectorSource();
    this.vector = new VectorLayer({
      source: this.source,
      style: new Style({
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.2)"
        }),
        stroke: new Stroke({
          color: "#ffcc33",
          width: 2
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: "#ffcc33"
          })
        })
      })
    });

    // 将图层添加到地图
    this.$emit("add-layer", this.vector);
  },

  methods: {
    // 开始测量
    startMeasure(type) {
      this.clearMeasure();

      // 创建绘制工具
      this.draw = new Draw({
        source: this.source,
        type: type,
        style: new Style({
          fill: new Fill({
            color: "rgba(255, 255, 255, 0.2)"
          }),
          stroke: new Stroke({
            color: "rgba(0, 0, 0, 0.5)",
            lineDash: [10, 10],
            width: 2
          }),
          image: new CircleStyle({
            radius: 5,
            stroke: new Stroke({
              color: "rgba(0, 0, 0, 0.7)"
            }),
            fill: new Fill({
              color: "rgba(255, 255, 255, 0.2)"
            })
          })
        })
      });

      // 创建测量提示框
      this.createMeasureTooltip();

      // 监听绘制事件
      this.draw.on("drawstart", this.onDrawStart);
      this.draw.on("drawend", this.onDrawEnd);

      // 添加绘制工具到地图
      this.$emit("add-interaction", this.draw);
    },

    // 清除测量
    clearMeasure() {
      if (this.draw) {
        this.$emit("remove-interaction", this.draw);
        this.draw = null;
      }
      if (this.measureTooltip) {
        this.$emit("remove-overlay", this.measureTooltip);
        this.measureTooltip = null;
      }
      if (this.source) {
        this.source.clear();
      }
    },

    // 创建测量提示框
    createMeasureTooltip() {
      if (this.measureTooltipElement) {
        this.measureTooltipElement.parentNode?.removeChild(
          this.measureTooltipElement
        );
      }
      this.measureTooltipElement = document.createElement("div");
      this.measureTooltipElement.className = "ol-tooltip ol-tooltip-measure";
      this.measureTooltip = new Overlay({
        element: this.measureTooltipElement,
        offset: [0, -15],
        positioning: "bottom-center",
        stopEvent: false
      });
      this.$emit("add-overlay", this.measureTooltip);
    },

    // 绘制开始事件
    onDrawStart(evt) {
      this.sketch = evt.feature;
      let tooltipCoord = evt.coordinate;

      this.sketch.getGeometry().on("change", (evt) => {
        const geom = evt.target;
        let output;
        if (geom.getType() === "LineString") {
          output = this.formatLength(geom);
        } else if (geom.getType() === "Polygon") {
          output = this.formatArea(geom);
        }
        if (this.measureTooltipElement) {
          this.measureTooltipElement.innerHTML = output || "";
        }
        if (this.measureTooltip) {
          this.measureTooltip.setPosition(tooltipCoord);
        }
      });
    },

    // 绘制结束事件
    onDrawEnd() {
      if (this.measureTooltipElement) {
        this.measureTooltipElement.className = "ol-tooltip ol-tooltip-static";
      }
      if (this.measureTooltip) {
        this.measureTooltip.setOffset([0, -7]);
      }
      this.sketch = null;
      this.createMeasureTooltip();
    },

    // 格式化长度
    formatLength(line) {
      const length = getLength(line);
      let output;
      if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + " km";
      } else {
        output = Math.round(length * 100) / 100 + " m";
      }
      return output;
    },

    // 格式化面积
    formatArea(polygon) {
      const area = getArea(polygon);
      let output;
      if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 + " km²";
      } else {
        output = Math.round(area * 100) / 100 + " m²";
      }
      return output;
    }
  }
};
</script>

<style scoped>
.measure-tool {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
}

.measure-buttons {
  display: flex;
  gap: 10px;
}

.measure-buttons button {
  padding: 5px 10px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.measure-buttons button:hover {
  background-color: #f0f0f0;
}

::v-deep .ol-tooltip {
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: white;
  padding: 4px 8px;
  white-space: nowrap;
  font-size: 12px;
}

::v-deep .ol-tooltip-measure {
  opacity: 1;
  font-weight: bold;
}

::v-deep .ol-tooltip-static {
  background-color: #ffcc33;
  color: black;
  border: 1px solid white;
}
</style>
