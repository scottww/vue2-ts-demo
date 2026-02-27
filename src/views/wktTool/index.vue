<template>
  <div class="wkt-tool-page" style="padding: 20px; max-width: 800px; margin: auto;">
    <h2>WKT 转 GeoJSON 工具</h2>

    <div class="form-group" style="margin-bottom: 20px;">
      <label>输入 WKT:</label>
      <textarea
        v-model="wktInput"
        rows="6"
        style="width: 100%; padding: 8px; font-family: monospace;"
        placeholder="请输入 WKT 字符串"
      ></textarea>
    </div>

    <div class="form-group" style="margin-bottom: 20px;">
      <label>选择转换方式:</label>
      <select v-model="method" style="margin-left: 10px; padding: 4px 8px;">
        <option value="ol">OpenLayers</option>
        <option value="wellknown">wellknown</option>
      </select>
    </div>

    <button @click="convertWKT" style="padding: 6px 12px;">转换</button>
    <button @click="copyResult" style="padding: 6px 12px; margin-left: 10px;">复制结果</button>

    <div v-if="geoJSONResult" class="result" style="margin-top: 20px;">
      <label>GeoJSON 结果:</label>
      <pre style="background: #f5f5f5; padding: 10px; overflow-x: auto;">{{ geoJSONResult }}</pre>
    </div>
  </div>
</template>

<script>
// 必须安装：ol 和 wellknown
import WKT from 'ol/format/WKT'
import GeoJSON from 'ol/format/GeoJSON'
// import wellknown from 'wellknown'

export default {
  name: 'WktToolPage',
  data() {
    return {
      wktInput: '',
      method: 'ol', // ol 或 wellknown
      geoJSONResult: ''
    }
  },
  methods: {
    convertWKT() {
      if (!this.wktInput) {
        this.geoJSONResult = ''
        return
      }

      try {
        let result = null
        if (this.method === 'ol') {
          const format = new WKT()
          const feature = format.readFeature(this.wktInput, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:4326'
          })
          result = new GeoJSON().writeFeatureObject(feature)
        } else if (this.method === 'wellknown') {
        //   result = wellknown.parse(this.wktInput)
        }

        this.geoJSONResult = JSON.stringify(result, null, 2)
      } catch (e) {
        console.error('转换失败', e)
        this.geoJSONResult = '转换失败，请检查 WKT 格式'
      }
    },
    copyResult() {
      if (!this.geoJSONResult) return
      navigator.clipboard.writeText(this.geoJSONResult).then(() => {
        alert('已复制到剪贴板')
      })
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}
button {
  cursor: pointer;
}
</style>