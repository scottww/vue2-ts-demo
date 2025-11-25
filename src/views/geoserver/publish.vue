<template>
  <div>
    <h2>GeoServer 自动化发布示例</h2>
    <input type="file" @change="handleFileUpload" accept=".zip" />
    <div style="margin-bottom: 10px">
      <label>选择已有样式：</label>
      <select v-model="selectedStyle">
        <option v-for="s in styleList" :key="s.name" :value="s.name">
          {{ s.name }} <span v-if="s.title">（{{ s.title }}）</span>
        </option>
      </select>
      <button @click="loadStyles">刷新样式列表</button>
    </div>
    <div style="margin-bottom: 10px">
      <label>选择编码：</label>
      <select v-model="shpCharset">
        <option value="UTF-8">UTF-8</option>
        <option value="GB2312">GB2312</option>
        <option value="GBK">GBK</option>
      </select>
    </div>
    <button @click="publishLayer">发布图层</button>
    <p v-if="status">{{ status }}</p>
  </div>
</template>

<script>
import JSZip from "jszip";
import axios from "axios";
import pinyin from "pinyin";

function toPinyinName(str) {
  return pinyin(str, { style: pinyin.STYLE_NORMAL, heteronym: false })
    .flat()
    .join("")
    .toLowerCase()
    .replace(/\s+/g, "");
}

function parseTitleFromSld(sldText) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(sldText, "application/xml");
    const candidates = [
      doc.getElementsByTagName("Title"),
      doc.getElementsByTagName("sld:Title"),
      doc.getElementsByTagName("ogc:Title")
    ];
    for (const nodeList of candidates) {
      if (nodeList && nodeList.length) {
        const txt = nodeList[0].textContent && nodeList[0].textContent.trim();
        if (txt) return txt;
      }
    }
    const t2 = doc.getElementsByTagName("title");
    if (t2 && t2.length) {
      const txt = t2[0].textContent && t2[0].textContent.trim();
      if (txt) return txt;
    }
  } catch (e) {}
  return null;
}

export default {
  data() {
    return {
      file: null,
      workspace: "beilun",
      datastore: "",
      layerTitle: "大浦河",
      geoserverUrl: "http://localhost:8888/geoserver",
      auth: { username: "admin", password: "geoserver" },
      status: "",
      styleList: [],
      selectedStyle: null,
      shpCharset: "UTF-8"
    };
  },
  created() {
    this.datastore = toPinyinName(this.layerTitle);
    this.loadStyles().catch(() => {});
  },
  methods: {
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },

    async loadStyles() {
      this.status = "加载 GeoServer 样式列表...";
      const styles = new Map();
      try {
        const resGlobal = await axios.get(
          `${this.geoserverUrl}/rest/styles.json`,
          { auth: this.auth }
        );
        const list = resGlobal.data?.styles?.style || [];
        for (const s of list) styles.set(s.name, { name: s.name, title: null });
      } catch (e) {}
      try {
        const resWs = await axios.get(
          `${this.geoserverUrl}/rest/workspaces/${this.workspace}/styles.json`,
          { auth: this.auth }
        );
        const list2 = resWs.data?.styles?.style || [];
        for (const s of list2)
          styles.set(`${this.workspace}:${s.name}`, {
            name: `${this.workspace}:${s.name}`,
            title: null
          });
      } catch (e) {}
      const names = Array.from(styles.keys());
      const concurrency = 6;
      let idx = 0;
      const workers = new Array(concurrency).fill(0).map(async () => {
        while (idx < names.length) {
          const name = names[idx++];
          try {
            let sldText = null;
            try {
              const r = await axios.get(
                `${this.geoserverUrl}/rest/workspaces/${this.workspace}/styles/${name}`,
                {
                  auth: this.auth,
                  headers: { Accept: "application/vnd.ogc.sld+xml" },
                  responseType: "text"
                }
              );
              sldText = r.data;
            } catch (e1) {
              try {
                const r2 = await axios.get(
                  `${this.geoserverUrl}/rest/styles/${name}`,
                  {
                    auth: this.auth,
                    headers: { Accept: "application/vnd.ogc.sld+xml" },
                    responseType: "text"
                  }
                );
                sldText = r2.data;
              } catch (e2) {}
            }
            if (sldText) {
              const title = parseTitleFromSld(sldText);
              if (title) styles.set(name, { name, title });
            }
          } catch (e) {}
        }
      });
      await Promise.all(workers);
      this.styleList = Array.from(styles.values()).sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
      if (this.styleList.length > 0 && !this.selectedStyle)
        this.selectedStyle = this.styleList[0].name;
      this.status = "";
    },

    async filterShapefileZip(file) {
      const zip = await JSZip.loadAsync(file);
      const newZip = new JSZip();
      const allowedExt = [".shp", ".shx", ".dbf", ".prj"];
      await Promise.all(
        Object.keys(zip.files).map(async (filename) => {
          const ext = filename.slice(filename.lastIndexOf(".")).toLowerCase();
          if (allowedExt.includes(ext)) {
            const namePart = filename.slice(0, filename.lastIndexOf("."));
            const cleanName = toPinyinName(namePart) + ext;
            const content = await zip.files[filename].async("arraybuffer");
            newZip.file(cleanName, content);
          }
        })
      );
      return await newZip.generateAsync({ type: "blob" });
    },

    async createWorkspace() {
      try {
        await axios.get(
          `${this.geoserverUrl}/rest/workspaces/${this.workspace}`,
          { auth: this.auth }
        );
      } catch (err) {
        if (err.response && err.response.status === 404) {
          const data = `<workspace><name>${this.workspace}</name></workspace>`;
          await axios.post(`${this.geoserverUrl}/rest/workspaces`, data, {
            headers: { "Content-Type": "text/xml" },
            auth: this.auth
          });
        } else throw err;
      }
    },

    async setCharset(filePath, charset) {
      if (!filePath) throw new Error("请提供 shapefile 服务器路径");
      if (!charset) charset = "UTF-8";
      const datastoreXml = `
<dataStore>
  <name>${this.datastore}</name>
  <connectionParameters>
    <entry key="url">${filePath}</entry>
    <entry key="charset">${charset}</entry>
  </connectionParameters>
</dataStore>
`;
      const dsUrl = `${this.geoserverUrl}/rest/workspaces/${this.workspace}/datastores/${this.datastore}`;
      await axios.put(dsUrl, datastoreXml, {
        headers: { "Content-Type": "text/xml" },
        auth: this.auth
      });
    },

    async setCharsetFromDatastore() {
      // charset: 用户选择的编码，例如 "UTF-8" / "GB2312"
      const charset = this.shpCharset || "UTF-8";

      // 获取 GeoServer data_dir 根路径（REST API /rest/about/ 可获取 data_dir 绝对路径）
      let dataDir = "";
      try {
        const res = await axios.get(`${this.geoserverUrl}/rest/about/`, {
          auth: this.auth,
          headers: { Accept: "application/json" }
        });
        dataDir = res.data?.dataDir; // 返回类似 /opt/geoserver/data_dir/
        if (!dataDir) throw new Error("未获取到 GeoServer data_dir");
      } catch (e) {
        throw new Error("获取 GeoServer data_dir 失败：" + (e.message || e));
      }

      // 拼接 datastore 路径
      let filePath = dataDir;
      if (!filePath.endsWith("/")) filePath += "/";
      filePath += `${this.workspace}/${this.datastore}/`;

      // 生成 datastore XML
      const datastoreXml = `<dataStore>   <name>${this.datastore}</name>   <connectionParameters>     <entry key="url">file:${filePath}</entry>     <entry key="charset">${charset}</entry>   </connectionParameters> </dataStore>`;

      const dsUrl = `${this.geoserverUrl}/rest/workspaces/${this.workspace}/datastores/${this.datastore}`;
      await axios.put(dsUrl, datastoreXml, {
        headers: { "Content-Type": "text/xml" },
        auth: this.auth
      });
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
      // 上传完成后动态设置 charset（假设 GeoServer 数据目录可访问）
      // 服务器路径一般为： GeoServer/ data/ workspace/, 这个根据版本以及安装的路径不同而不同，新版本路径可能是/data_dir/data/workspace/
      // 本地安装的geoserver带盘符，安装时，设置的数据目录路径是E:\GeoServerData
      const filePath = `file:/E:/GeoServerData/data/${this.workspace}/${this.datastore}/`;
      // await this.setCharset(filePath, this.shpCharset);
    },

    async setLayerTitleAndStyle(styleName) {
      const layerUrl = `${this.geoserverUrl}/rest/layers/${this.workspace}:${this.datastore}`;
      const xml = `
<layer>
  <name>${this.datastore}</name>
  <title>${this.layerTitle}</title>
  <defaultStyle><name>${styleName}</name></defaultStyle>
</layer>
`;
      await axios.put(layerUrl, xml, {
        headers: { "Content-Type": "text/xml" },
        auth: this.auth
      });
    },

    async uploadShapefileAndSetCharset() {
      if (!this.file) throw new Error("请选择 Shapefile zip 文件");

      this.status = "处理上传文件...";
      const filteredZip = await this.filterShapefileZip(this.file);

      this.status = "上传 Shapefile...";
      // 上传 Shapefile
      const url = `${this.geoserverUrl}/rest/workspaces/${this.workspace}/datastores/${this.datastore}/file.shp`;
      await axios.put(url, filteredZip, {
        headers: { "Content-Type": "application/zip" },
        auth: this.auth
      });

      this.status = "设置 datastore 编码...";
      // 拼接相对路径，不依赖 /rest/about/
      const filePath = `data/${this.workspace}/${this.datastore}/`;

      const datastoreXml = `
        <dataStore>
          <name>${this.datastore}</name>
          <connectionParameters>
            <entry key="url">file:${filePath}</entry>
            <entry key="charset">${this.shpCharset}</entry>
          </connectionParameters>
        </dataStore>
      `;
      const dsUrl = `${this.geoserverUrl}/rest/workspaces/${this.workspace}/datastores/${this.datastore}`;

      console.log(`charset ....`, this.datastore, dsUrl, datastoreXml);
      await axios.put(dsUrl, datastoreXml, {
        headers: { "Content-Type": "text/xml" },
        auth: this.auth
      });

      this.status = "完成";
    },

    async publishLayer() {
      if (!this.file) {
        this.status = "请先选择 Shapefile zip 文件";
        return;
      }
      try {
        this.status = "检查并创建工作空间...";
        await this.createWorkspace();
        // await this.uploadShapefile();  // 先上传 Shapefile
        await this.uploadShapefileAndSetCharset();
        // await this.setCharsetFromDatastore(); // 再动态设置 charset
        this.status = "设置图层标题和默认样式...";
        await this.setLayerTitleAndStyle(this.selectedStyle);
        this.status = "图层发布完成";
      } catch (err) {
        console.error(err);
        this.status = "发布失败：" + (err.response?.data || err.message);
      }
    }
  }
};
</script>
