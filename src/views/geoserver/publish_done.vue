<template>
  <div>
    <h2>GeoServer 自动化发布示例</h2>
    <input type="file" @change="handleFileUpload" accept=".zip" />
    <button @click="publishLayer">发布图层</button>
    <p v-if="status">{{ status }}</p>
  </div>
</template>

<script>
import JSZip from "jszip";
import axios from "axios";

export default {
  data() {
    return {
      file: null,
      workspace: "beilun",        // workspace 英文
      datastore: "大浦河",        // datastore 英文
      layerTitle: "大浦河",       // 图层中文名
      geoserverUrl: "http://localhost:8888/geoserver",
      auth: { username: "admin", password: "geoserver" },
      status: ""
    };
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },

    async checkWorkspace() {
      try {
        await axios.get(`${this.geoserverUrl}/rest/workspaces/${this.workspace}`, {
          auth: this.auth
        });
        return true;
      } catch (err) {
        if (err.response && err.response.status === 404) return false;
        throw err;
      }
    },

    async createWorkspace() {
      const exists = await this.checkWorkspace();
      if (exists) return;
      const url = `${this.geoserverUrl}/rest/workspaces`;
      const data = `<workspace><name>${this.workspace}</name></workspace>`;
      await axios.post(url, data, {
        headers: { "Content-Type": "text/xml" },
        auth: this.auth
      });
    },

    // 过滤 zip，只保留 shp/shx/dbf/prj
    async filterShapefileZip(file) {
      const zip = await JSZip.loadAsync(file);
      const newZip = new JSZip();
      const allowedExt = [".shp", ".shx", ".dbf", ".prj"];

      await Promise.all(Object.keys(zip.files).map(async (filename) => {
        const ext = filename.slice(filename.lastIndexOf(".")).toLowerCase();
        if (allowedExt.includes(ext)) {
          const content = await zip.files[filename].async("arraybuffer");
          newZip.file(filename, content);
        }
      }));

      const filteredBlob = await newZip.generateAsync({ type: "blob" });
      return filteredBlob;
    },

    async uploadShapefile() {
      if (!this.file) throw new Error("请选择 Shapefile zip 文件");
      this.status = "处理上传文件...";
      const filteredZip = await this.filterShapefileZip(this.file);

      this.status = "上传 Shapefile 并创建 datastore...";
      const url = `${this.geoserverUrl}/rest/workspaces/${this.workspace}/datastores/${this.datastore}/file.shp`;
      await axios.put(url, filteredZip, {
        headers: { "Content-Type": "application/zip" },
        auth: this.auth
      });
    },

    async setLayerTitle() {
      const layerUrl = `${this.geoserverUrl}/rest/layers/${this.workspace}:${this.datastore}`;
      const xml = `<layer><defaultStyle><name>${this.datastore}</name><title>${this.layerTitle}</title></defaultStyle></layer>`;
      await axios.put(layerUrl, xml, {
        headers: { "Content-Type": "text/xml" },
        auth: this.auth
      });
    },

    async publishLayer() {
      if (!this.file) {
        this.status = "请先选择 Shapefile zip 文件";
        return;
      }

      try {
        this.status = "检查并创建工作空间...";
        await this.createWorkspace();

        await this.uploadShapefile();
        await this.setLayerTitle();

        this.status = "图层发布完成";
      } catch (err) {
        console.error(err);
        this.status = "发布失败：" + (err.response?.data || err.message);
      }
    }
  }
};
</script>

<style>
/* 可选：简单样式 */
div {
  margin: 20px;
}
input {
  margin-right: 10px;
}
</style>
