<template>
  <div class="icon-demo">
    <h2>Glyphter 图标演示</h2>
    <input
      v-model="keyword"
      placeholder="搜索图标名，比如 mySvg-camera"
      class="search-input"
    />
    <div class="icon-grid">
      <div
        v-for="icon in filteredIcons"
        :key="icon"
        class="icon-item"
        @click="copy(icon)"
        title="点击复制类名"
      >
        <SvgIcon :name="icon" :size="32" color="#555" hoverColor="#f56c6c" />
        <div class="icon-name">{{ icon }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import icons from "./icons.js";
import SvgIcon from "./SvgIcon.vue";

export default {
  components: { SvgIcon },
  data() {
    return {
      keyword: "",
      icons
    };
  },
  computed: {
    filteredIcons() {
      return this.icons.filter((i) => i.includes(this.keyword));
    }
  },
  methods: {
    copy(text) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      this.$message.success(`复制成功: ${text}`); // 如果用 Element UI 的 this.$message
    }
  }
};
</script>

<style scoped>
.icon-demo {
  padding: 20px;
  max-width: 900px;
  margin: auto;
}

.search-input {
  padding: 8px 12px;
  font-size: 16px;
  margin-bottom: 24px;
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  /* gap: 8px; */
}

.icon-item {
  cursor: pointer;
  text-align: center;
  user-select: none;
  /* border-radius: 6px; */
  padding: 12px;
  transition: background-color 0.3s ease;
  border: 1px solid #eee;
  /* border-right: 1px solid #eee;
  border-bottom: 1px solid #eee; */
  margin-right: -1px;
  margin-bottom: -1px;
}

.icon-item:hover {
  background-color: #f0f0f0;
}

.icon-name {
  margin-top: 8px;
  font-size: 13px;
  color: #666;
  word-break: break-all;
}
</style>
