<template>
  <div class="coordinate-converter">
    <a-card class="converter-card" title="坐标转换工具">
      <a-form :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" layout="horizontal">

        <a-form-item label="源坐标系">
          <a-select v-model="fromEPSG" class="select">
            <a-select-option value="EPSG:4549">EPSG:4549 - CGCS2000 / 3-degree Gauss-Kruger CM 120E</a-select-option>
            <a-select-option value="EPSG:4550">EPSG:4550 - CGCS2000 / 3-degree Gauss-Kruger CM 123E</a-select-option>
            <a-select-option value="EPSG:4551">EPSG:4551 - CGCS2000 / 3-degree Gauss-Kruger CM 126E</a-select-option>
            <a-select-option value="EPSG:4552">EPSG:4552 - CGCS2000 / 3-degree Gauss-Kruger CM 129E</a-select-option>
            <a-select-option value="EPSG:4553">EPSG:4553 - CGCS2000 / 3-degree Gauss-Kruger CM 132E</a-select-option>
            <a-select-option value="EPSG:4554">EPSG:4554 - CGCS2000 / 3-degree Gauss-Kruger CM 135E</a-select-option>
            <a-select-option value="EPSG:4555">EPSG:4555 - CGCS2000 / 3-degree Gauss-Kruger CM 138E</a-select-option>
            <a-select-option value="EPSG:4556">EPSG:4556 - CGCS2000 / 3-degree Gauss-Kruger CM 141E</a-select-option>

            <a-select-option value="EPSG:4326">EPSG:4326 - WGS 84 / Geographic</a-select-option>
            <a-select-option value="EPSG:4490">EPSG:4490 - CGCS2000 / Geographic</a-select-option>
            <a-select-option value="EPSG:3857">EPSG:3857 - WGS 84 / Pseudo-Mercator</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="目标坐标系">
          <a-select v-model="toEPSG" class="select">
            <a-select-option value="EPSG:4326">EPSG:4326 - WGS 84 / Geographic</a-select-option>
            <a-select-option value="EPSG:4549">EPSG:4549 - CGCS2000 / 3-degree Gauss-Kruger CM 120E</a-select-option>
            <a-select-option value="EPSG:4490">EPSG:4490 - CGCS2000 / Geographic</a-select-option>
            <a-select-option value="EPSG:3857">EPSG:3857 - WGS 84 / Pseudo-Mercator</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="输入坐标 / GeoJSON">
          <textarea v-model="inputText" rows="8" class="textarea" placeholder='支持二维数组 [[x,y],[x,y]] 或 GeoJSON（FeatureCollection / Feature / Polygon / MultiPolygon）'></textarea>
        </a-form-item>

        <a-form-item wrapper-col="{ span: 24 }" class="button-group">
          <a-button type="primary" @click="convert">转换</a-button>
          <a-button style="margin-left:10px;" @click="clearAll">清空</a-button>
          <a-button style="margin-left:10px;" @click="copyResult">复制结果</a-button>
        </a-form-item>

      </a-form>

      <div v-if="result && result.length" class="result-section">
        <h4>转换结果（JSON）</h4>
        <div class="json-viewer">
          <pre>{{ resultText }}</pre>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import proj4 from "proj4";

// 注册投影（按需可扩展）
proj4.defs("EPSG:4549", "+proj=tmerc +lat_0=0 +lon_0=120 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs");
proj4.defs("EPSG:4550", "+proj=tmerc +lat_0=0 +lon_0=123 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs");
proj4.defs("EPSG:4551", "+proj=tmerc +lat_0=0 +lon_0=126 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs");
proj4.defs("EPSG:4552", "+proj=tmerc +lat_0=0 +lon_0=129 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs");
proj4.defs("EPSG:4553", "+proj=tmerc +lat_0=0 +lon_0=132 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs");
proj4.defs("EPSG:4554", "+proj=tmerc +lat_0=0 +lon_0=135 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs");
proj4.defs("EPSG:4555", "+proj=tmerc +lat_0=0 +lon_0=138 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs");
proj4.defs("EPSG:4556", "+proj=tmerc +lat_0=0 +lon_0=141 +k=1 +x_0=500000 +y_0=0 +ellps=GRS80 +units=m +no_defs");

proj4.defs("EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs");
proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
proj4.defs("EPSG:3857", "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs");

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
    // 递归提取所有 [x,y] 点对，保证返回 Array<[number,number]>
    extractCoords(coords) {
      const out = [];

      const recurse = arr => {
        if (!Array.isArray(arr)) return;
        // 如果是 [number, number]（点）
        if (arr.length >= 2 && typeof arr[0] === "number" && typeof arr[1] === "number") {
          out.push([arr[0], arr[1]]);
          return;
        }
        // 否则是更深层级数组，继续递归
        for (let i = 0; i < arr.length; i++) {
          recurse(arr[i]);
        }
      };

      recurse(coords);
      return out;
    },

    convert() {
      if (!this.inputText || !this.inputText.trim()) {
        this.$message.warning("请输入坐标或 GeoJSON");
        return;
      }

      let parsed;
      try {
        parsed = JSON.parse(this.inputText);
      } catch (e) {
        this.$message.error("JSON 解析失败，请确认输入是合法的 JSON 字符串");
        return;
      }

      let points = [];

      // 情形 A: 是 FeatureCollection
      if (parsed && parsed.type === "FeatureCollection" && Array.isArray(parsed.features)) {
        parsed.features.forEach(f => {
          if (!f || !f.geometry) return;
          points = points.concat(this.extractCoords(f.geometry.coordinates));
        });
      }
      // 情形 B: 是单个 Feature
      else if (parsed && parsed.type === "Feature" && parsed.geometry) {
        points = this.extractCoords(parsed.geometry.coordinates);
      }
      // 情形 C: 是 Geometry（直接给 geometry）
      else if (parsed && parsed.type && parsed.coordinates) {
        points = this.extractCoords(parsed.coordinates);
      }
      // 情形 D: 直接给数组（二维或多级嵌套）
      else if (Array.isArray(parsed)) {
        points = this.extractCoords(parsed);
      } else {
        this.$message.error("不支持的 GeoJSON/输入结构，请传入 FeatureCollection / Feature / Geometry / 坐标数组");
        return;
      }

      if (!points.length) {
        this.$message.warning("未从输入中提取到坐标点");
        this.result = [];
        return;
      }

      // 去重（可选），保留点对格式
      const unique = [];
      const seen = new Set();
      points.forEach(([x, y]) => {
        const key = `${x},${y}`;
        if (!seen.has(key)) {
          seen.add(key);
          unique.push([Number(x), Number(y)]);
        }
      });

      // 执行 proj4 转换，返回 [[lon,lat],...]
      try {
        this.result = unique.map(([x, y]) => {
          const [lon, lat] = proj4(this.fromEPSG, this.toEPSG, [Number(x), Number(y)]);
          return [lon, lat];
        });
      } catch (err) {
        console.error(err);
        this.$message.error("坐标转换出错（请确认已注册所选 EPSG）");
      }
    },

    clearAll() {
      this.inputText = "";
      this.result = [];
    },

    copyResult() {
      if (!this.result || !this.result.length) {
        this.$message.warning("请先进行转换");
        return;
      }
      navigator.clipboard.writeText(this.resultText).then(() => {
        this.$message.success("结果已复制到剪贴板");
      }).catch(() => {
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
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
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

.result-section .textarea {
  height: 400px !important;
}

.result-section h4 {
  margin-bottom: 10px;
}

.json-viewer {
  background: #f7f7f7;
  padding: 16px;
  border-radius: 8px;
  height: 450px;
  overflow: auto;
  font-size: 14px;
  font-family: Consolas, monospace;
  white-space: pre-wrap;
  word-break: break-word;
  border: 1px solid #ddd;
}
</style>
