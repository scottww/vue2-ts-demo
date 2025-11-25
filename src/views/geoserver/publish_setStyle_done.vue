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
    <button @click="publishLayer">发布图层</button>
    <p v-if="status">{{ status }}</p>
  </div>
</template>

<script>
import JSZip from "jszip";
import axios from "axios";
import pinyin from "pinyin"; // npm install pinyin

// 中文转拼音，非中文字符保持原样，拼音用小写拼接
function toPinyinName(str) {
  return pinyin(str, {
    style: pinyin.STYLE_NORMAL, // 普通风格，不带音调
    heteronym: false
  })
    .flat()
    .join("")
    .toLowerCase()
    .replace(/\s+/g, ""); // 去掉空格
}

/** 解析 SLD/XML 中的 <Title> 或 <sld:Title>，兼容命名空间 */
function parseTitleFromSld(sldText) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(sldText, "application/xml");
    // 尝试常见标签
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
    // 额外尝试：有些 style xml 使用 <title>
    const t2 = doc.getElementsByTagName("title");
    if (t2 && t2.length) {
      const txt = t2[0].textContent && t2[0].textContent.trim();
      if (txt) return txt;
    }
  } catch (e) {
    // ignore
  }
  return null;
}

export default {
  data() {
    return {
      file: null,
      workspace: "beilun", // workspace 英文
      datastore: "", // datastore 英文，自动生成
      layerTitle: "大浦河", // 图层中文名，UI显示
      geoserverUrl: "http://localhost:8888/geoserver",
      auth: { username: "admin", password: "geoserver" },
      status: "",

      styleList: [], // ⭐ GeoServer 现有样式列表
      selectedStyle: null // ⭐ 选择的样式
    };
  },
  created() {
    // 根据中文 layerTitle 自动生成 datastore 名称（拼音）
    this.datastore = toPinyinName(this.layerTitle);
    // this.loadStyles(); // ⭐ 页面加载时获取样式列表
    // 页面加载时尝试拉取样式
    this.loadStyles().catch(() => {});
  },
  methods: {
    /** 把样式绑定到 layer（设置 title 和 defaultStyle） */
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

    /** ------- 样式加载函数（核心改动） ------- */
    async loadStyles() {
      this.status = "加载 GeoServer 样式列表...";
      const styles = new Map(); // name -> { name, title }

      // 2) 再拉当前 workspace 下的样式（如果存在）
      try {
        const resWs = await axios.get(
          `${this.geoserverUrl}/rest/workspaces/${this.workspace}/styles.json`,
          {
            auth: this.auth
          }
        );
        const list2 = resWs.data?.styles?.style || [];
        for (const s of list2) {
          styles.set(`${this.workspace}:${s.name}`, {
            name: `${this.workspace}:${s.name}`,
            title: null
          });
        }
      } catch (e) {
        // workspace 样式可能不存在，不必抛错
        console.info("或无 workspace 专有样式：", e.message || e);
      }

      // 1) 先拉全局样式列表（JSON）
      try {
        const resGlobal = await axios.get(
          `${this.geoserverUrl}/rest/styles.json`,
          {
            auth: this.auth
          }
        );
        const list = resGlobal.data?.styles?.style || [];
        for (const s of list) {
          styles.set(s.name, { name: s.name, title: null });
        }
      } catch (e) {
        console.warn("获取全局样式失败：", e.message || e);
      }

      // 3) 对每个样式尝试获取它的 SLD 内容 以解析 <Title>（并发但限速）
      const names = Array.from(styles.keys());
      const concurrency = 6;
      let idx = 0;
      const workers = new Array(concurrency).fill(0).map(async () => {
        while (idx < names.length) {
          const name = names[idx++];
          try {
            // 尝试获取 style body (sld). 优先 workspace 样式 URL，再全局
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
              // fallback to global
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
              } catch (e2) {
                // 无法获取 sld 内容（权限或不存在），忽略
              }
            }

            if (sldText) {
              const title = parseTitleFromSld(sldText);
              if (title) styles.set(name, { name, title });
            }
          } catch (e) {
            // 忽略单个样式读取失败
            console.warn("读取样式失败", name, e.message || e);
          }
        }
      });

      await Promise.all(workers);

      // 4) 填充 styleList，优先显示 title（中文）
      this.styleList = Array.from(styles.values()).sort((a, b) =>
        a.name > b.name ? 1 : -1
      );

      if (this.styleList.length > 0 && !this.selectedStyle) {
        this.selectedStyle = this.styleList[0].name;
      }
      this.status = "";
    },

    handleFileUpload(event) {
      this.file = event.target.files[0];
    },

    async checkWorkspace() {
      try {
        await axios.get(
          `${this.geoserverUrl}/rest/workspaces/${this.workspace}`,
          {
            auth: this.auth
          }
        );
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

    // 过滤 zip，只保留 shp/shx/dbf/prj，并把文件名中文转拼音
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
      const xml = `<layer>
          <name>${this.datastore}</name>
          <title>${this.layerTitle}</title>
          <defaultStyle>
            <name>${styleName}</name>
          </defaultStyle>
      </layer>`;
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

        this.status = "设置图层标题和默认样式...";
        await this.setLayerTitleAndStyle(this.selectedStyle);

        // await this.setLayerTitle();

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
div {
  margin: 20px;
}
input {
  margin-right: 10px;
}
</style>
