<template>
  <div class="coordinate-converter">
    <a-card class="converter-card" title="坐标转换工具">
      <a-form
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
        layout="horizontal"
      >
        <!-- 源坐标系选择 -->
        <a-form-item label="源坐标系">
          <a-select v-model="fromEPSG" class="select">
            <a-select-option value="EPSG:4549"
              >EPSG:4549 - CGCS2000 / 3-degree Gauss-Kruger CM
              120E</a-select-option
            >
            <a-select-option value="EPSG:4550"
              >EPSG:4550 - CGCS2000 / 3-degree Gauss-Kruger CM
              123E</a-select-option
            >
            <a-select-option value="EPSG:4551"
              >EPSG:4551 - CGCS2000 / 3-degree Gauss-Kruger CM
              126E</a-select-option
            >
            <a-select-option value="EPSG:4552"
              >EPSG:4552 - CGCS2000 / 3-degree Gauss-Kruger CM
              129E</a-select-option
            >
            <a-select-option value="EPSG:4553"
              >EPSG:4553 - CGCS2000 / 3-degree Gauss-Kruger CM
              132E</a-select-option
            >
            <a-select-option value="EPSG:4554"
              >EPSG:4554 - CGCS2000 / 3-degree Gauss-Kruger CM
              135E</a-select-option
            >
            <a-select-option value="EPSG:4555"
              >EPSG:4555 - CGCS2000 / 3-degree Gauss-Kruger CM
              138E</a-select-option
            >
            <a-select-option value="EPSG:4556"
              >EPSG:4556 - CGCS2000 / 3-degree Gauss-Kruger CM
              141E</a-select-option
            >

            <a-select-option value="EPSG:4326"
              >EPSG:4326 - WGS 84 / Geographic</a-select-option
            >
            <a-select-option value="EPSG:4490"
              >EPSG:4490 - CGCS2000 / Geographic</a-select-option
            >
            <a-select-option value="EPSG:3857"
              >EPSG:3857 - WGS 84 / Pseudo-Mercator</a-select-option
            >
          </a-select>
        </a-form-item>

        <!-- 目标坐标系选择 -->
        <a-form-item label="目标坐标系">
          <a-select v-model="toEPSG" class="select">
            <a-select-option value="EPSG:4549"
              >EPSG:4549 - CGCS2000 / 3-degree Gauss-Kruger CM
              120E</a-select-option
            >
            <a-select-option value="EPSG:4550"
              >EPSG:4550 - CGCS2000 / 3-degree Gauss-Kruger CM
              123E</a-select-option
            >
            <a-select-option value="EPSG:4551"
              >EPSG:4551 - CGCS2000 / 3-degree Gauss-Kruger CM
              126E</a-select-option
            >
            <a-select-option value="EPSG:4552"
              >EPSG:4552 - CGCS2000 / 3-degree Gauss-Kruger CM
              129E</a-select-option
            >
            <a-select-option value="EPSG:4553"
              >EPSG:4553 - CGCS2000 / 3-degree Gauss-Kruger CM
              132E</a-select-option
            >
            <a-select-option value="EPSG:4554"
              >EPSG:4554 - CGCS2000 / 3-degree Gauss-Kruger CM
              135E</a-select-option
            >
            <a-select-option value="EPSG:4555"
              >EPSG:4555 - CGCS2000 / 3-degree Gauss-Kruger CM
              138E</a-select-option
            >
            <a-select-option value="EPSG:4556"
              >EPSG:4556 - CGCS2000 / 3-degree Gauss-Kruger CM
              141E</a-select-option
            >

            <a-select-option value="EPSG:4326"
              >EPSG:4326 - WGS 84 / Geographic</a-select-option
            >
            <a-select-option value="EPSG:4490"
              >EPSG:4490 - CGCS2000 / Geographic</a-select-option
            >
            <a-select-option value="EPSG:3857"
              >EPSG:3857 - WGS 84 / Pseudo-Mercator</a-select-option
            >
          </a-select>
        </a-form-item>

        <!-- 输入坐标 -->
        <a-form-item label="输入坐标">
          <textarea
            v-model="inputText"
            rows="6"
            class="textarea"
            placeholder="例如 [[664373,3307642],[664374,3307639]]"
          ></textarea>
        </a-form-item>

        <!-- 操作按钮 -->
        <a-form-item wrapper-col="{ span: 24 }" class="button-group">
          <a-button type="primary" @click="convert">转换</a-button>
          <a-button style="margin-left: 10px" @click="clearAll">清空</a-button>
          <a-button style="margin-left: 10px" @click="copyResult"
            >复制结果</a-button
          >
        </a-form-item>
      </a-form>

      <!-- 输出结果 -->
      <div v-if="result.length" class="result-section">
        <h4>转换结果（JSON）</h4>
        <textarea
          :value="resultText"
          rows="6"
          class="textarea"
          readonly
        ></textarea>
      </div>
    </a-card>
  </div>
</template>

<script>
import proj4 from "proj4";

// 注册 CGCS2000 投影 3°分带
proj4.defs(
  "EPSG:4549",
  "+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs"
);
proj4.defs(
  "EPSG:4550",
  "+proj=tmerc +lat_0=0 +lon_0=123 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs"
);
proj4.defs(
  "EPSG:4551",
  "+proj=tmerc +lat_0=0 +lon_0=126 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs"
);
proj4.defs(
  "EPSG:4552",
  "+proj=tmerc +lat_0=0 +lon_0=129 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs"
);
proj4.defs(
  "EPSG:4553",
  "+proj=tmerc +lat_0=0 +lon_0=132 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs"
);
proj4.defs(
  "EPSG:4554",
  "+proj=tmerc +lat_0=0 +lon_0=135 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs"
);
proj4.defs(
  "EPSG:4555",
  "+proj=tmerc +lat_0=0 +lon_0=138 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs"
);
proj4.defs(
  "EPSG:4556",
  "+proj=tmerc +lat_0=0 +lon_0=141 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs"
);

// 注册地理坐标系和 Web Mercator
proj4.defs("EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs");
proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
proj4.defs(
  "EPSG:3857",
  "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs"
);

import { dingjiashan } from "./data.js";
export default {
  name: "CoordinateConverter",
  data() {
    return {
      fromEPSG: "EPSG:4549",
      toEPSG: "EPSG:4326",
      inputText: "",
      result: []
    };
  },
  computed: {
    resultText() {
      return JSON.stringify(this.result, null, 2);
    }
  },
  methods: {
    convert() {
      try {
        // const points = JSON.parse(this.inputText);
        // 使用静态数据
        const points = JSON.stringify(
          dingjiashan.features[0].geometry.coordinates[0][0],
          null,
          2
        );
        if (
          !Array.isArray(points) ||
          !points.every((p) => Array.isArray(p) && p.length === 2)
        ) {
          throw new Error("请输入二维数组");
        }
        this.result = points.map(([x, y]) =>
          proj4(this.fromEPSG, this.toEPSG, [Number(x), Number(y)])
        );
      } catch (err) {
        this.$message.error("输入格式有误，请输入二维数组 JSON");
      }
    },
    clearAll() {
      this.inputText = "";
      this.result = [];
    },
    copyResult() {
      if (!this.result.length) {
        this.$message.warning("请先进行转换");
        return;
      }
      navigator.clipboard
        .writeText(this.resultText)
        .then(() => {
          this.$message.success("结果已复制到剪贴板");
        })
        .catch(() => {
          this.$message.error("复制失败，请手动复制");
        });
    }
  }
};
</script>

<style scoped>
.coordinate-converter {
  max-width: 900px;
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

.button-group {
  text-align: right;
}

.button-group a-button {
  min-width: 100px;
}

.result-section {
  margin-top: 20px;
}

.result-section h4 {
  margin-bottom: 10px;
}
</style>
