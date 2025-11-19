<template>
  <div class="coordinate-converter__container">
    <div class="left-panel">
      <a-card
        class="converter-card"
        title="坐标转换工具（支持 GeoJSON & 数组）"
      >
        <a-form
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
          layout="horizontal"
        >
          <!-- 源坐标系 -->
          <a-form-item label="源坐标系">
            <a-select v-model="fromEPSG" class="select">
              <a-select-option value="EPSG:4549"
                >EPSG:4549（CGCS2000 / 3° GK 120E）</a-select-option
              >
              <a-select-option value="EPSG:4490"
                >EPSG:4490（CGCS2000 经纬度）</a-select-option
              >
              <a-select-option value="EPSG:4326"
                >EPSG:4326（WGS84 经纬度）</a-select-option
              >
              <a-select-option value="EPSG:3857"
                >EPSG:3857（Web Mercator）</a-select-option
              >
            </a-select>
          </a-form-item>

          <!-- 目标坐标系 -->
          <a-form-item label="目标坐标系">
            <a-select v-model="toEPSG" class="select">
              <a-select-option value="EPSG:4326"
                >EPSG:4326（WGS84 经纬度）</a-select-option
              >
              <a-select-option value="EPSG:4549"
                >EPSG:4549（CGCS2000 / 3° GK 120E）</a-select-option
              >
              <a-select-option value="EPSG:4490"
                >EPSG:4490（CGCS2000 经纬度）</a-select-option
              >
              <a-select-option value="EPSG:3857"
                >EPSG:3857（Web Mercator）</a-select-option
              >
            </a-select>
          </a-form-item>

          <!-- 输入 -->
          <a-form-item label="输入数据">
            <textarea
              v-model="inputText"
              rows="8"
              class="textarea"
              placeholder="可直接粘贴 GeoJSON 或 [[x,y],[x,y]] 格式数组"
            ></textarea>
          </a-form-item>

          <!-- 按钮 -->
          <a-form-item wrapper-col="{ span: 24 }" class="button-group">
            <a-button type="primary" @click="convert">转换</a-button>
            <a-button style="margin-left: 10px" @click="clearAll"
              >清空</a-button
            >
            <a-button style="margin-left: 10px" @click="copyResult"
              >复制结果</a-button
            >
          </a-form-item>
        </a-form>

        <!-- 结果：Prism 高亮显示 -->
        <!-- <div v-if="resultText" class="result-section">
        <h4>转换结果（JSON）</h4>
        <pre
          class="language-json"
        ><code ref="codeBlock">{{ resultText }}</code></pre>
      </div> -->
      </a-card>
    </div>

    <!-- 结果：Prism 高亮显示 -->
    <div class="right-panel" v-if="resultText">
      <a-card class="converter-card" title="转换结果（JSON）">
        <pre
          class="language-json"
        ><code ref="codeBlock">{{ resultText }}</code></pre>
      </a-card>
    </div>
  </div>
</template>

<script>
import proj4 from "proj4";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import "prismjs/themes/prism.css";

// 注册常用坐标系
proj4.defs(
  "EPSG:4549",
  "+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs"
);
proj4.defs("EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs");
proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
proj4.defs(
  "EPSG:3857",
  "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs"
);

export default {
  name: "CoordinateConverter",
  data() {
    return {
      fromEPSG: "EPSG:4549",
      toEPSG: "EPSG:4326",
      inputText: "",
      result: null
    };
  },
  computed: {
    resultText() {
      return this.result ? JSON.stringify(this.result, null, 2) : "";
    }
  },
  watch: {
    resultText() {
      this.$nextTick(() => {
        if (this.$refs.codeBlock) {
          Prism.highlightElement(this.$refs.codeBlock);
        }
      });
    }
  },
  methods: {
    // 解析 GeoJSON 或 数组
    parseInput() {
      const json = JSON.parse(this.inputText);

      // 如果是数组 -> [[x,y]]
      if (Array.isArray(json) && Array.isArray(json[0])) {
        return json;
      }

      // 如果是 GeoJSON
      if (json.type === "FeatureCollection") {
        const coords = [];

        json.features.forEach((f) => {
          const g = f.geometry;

          // MultiPolygon: [[[ [x,y], ... ]]]
          if (g.type === "MultiPolygon") {
            g.coordinates.forEach((poly) => {
              poly.forEach((ring) => {
                ring.forEach((point) => coords.push(point));
              });
            });
          }

          // Polygon: [[ [x,y], ... ]]
          if (g.type === "Polygon") {
            g.coordinates.forEach((ring) => {
              ring.forEach((point) => coords.push(point));
            });
          }
        });

        return coords;
      }

      throw new Error("输入格式不支持，请输入数组或 GeoJSON");
    },

    convert() {
      try {
        const pts = this.parseInput();

        const converted = pts.map(([x, y]) =>
          proj4(this.fromEPSG, this.toEPSG, [Number(x), Number(y)])
        );

        this.result = converted;
        this.$message.success("转换成功");
      } catch (err) {
        console.error(err);
        this.$message.error("输入格式有误，无法解析");
      }
    },

    clearAll() {
      this.inputText = "";
      this.result = null;
    },

    copyResult() {
      if (!this.resultText) {
        this.$message.warning("没有可复制的结果");
        return;
      }
      navigator.clipboard
        .writeText(this.resultText)
        .then(() => this.$message.success("已复制到剪贴板"))
        .catch(() => this.$message.error("复制失败"));
    }
  }
};
</script>

<style scoped>
.coordinate-converter__container {
  max-width: 1200px;
  margin: 40px auto;
}

.converter-card {
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 20px;
}

.select {
  width: 100%;
}

.textarea {
  width: 100%;
  border-radius: 6px;
  border: 1px solid #d9d9d9;
  padding: 10px;
  font-family: monospace;
  font-size: 14px;
  resize: vertical;
}

.result-section {
  margin-top: 25px;
}

.result-section pre {
  background: #f6f8fa;
  padding: 16px;
  border-radius: 8px;
  max-height: 400px;
  overflow: auto;
}
</style>
