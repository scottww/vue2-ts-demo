<template>
  <div class="nav-page-wrapper">
    <!-- 标题和搜索框固定在顶部 -->
    <div class="header">
      <h1>功能导航</h1>
      <div class="search-box">
        <input
          type="text"
          v-model="searchText"
          placeholder="输入关键词搜索路由..."
        />
      </div>
    </div>

    <!-- 模块列表滚动 -->
    <div class="module-list">
      <div
        class="module"
        v-for="(module, mIndex) in filteredItems"
        :key="mIndex"
      >
        <h2>
          <i class="module-icon">📁</i>
          {{ module.name }}
        </h2>
        <div class="menu-grid">
          <div
            class="menu-item"
            v-for="child in module.children"
            :key="child.id"
            @click="toPath(child.path)"
            v-html="highlightText(child.text)"
          ></div>
        </div>
      </div>

      <div v-if="filteredItems.length === 0" class="no-result">
        没有匹配的路由
      </div>
    </div>
  </div>
</template>

<script>
import { menus } from "./data.js";

export default {
  name: "NavPage",
  data() {
    return {
      searchText: "",
      items: [...menus],
    };
  },
  computed: {
    filteredItems() {
      if (!this.searchText) return this.items;

      return this.items
        .map((module) => {
          const matchedChildren = module.children.filter((child) =>
            child.text.toLowerCase().includes(this.searchText.toLowerCase())
          );
          if (matchedChildren.length > 0) {
            return { ...module, children: matchedChildren };
          }
          return null;
        })
        .filter(Boolean);
    },
  },
  methods: {
    toPath(path) {
      this.$router.push(path);
    },
    highlightText(text) {
      if (!this.searchText) return text;
      const keyword = this.searchText.replace(
        /[-\/\\^$*+?.()|[\]{}]/g,
        "\\$&"
      ); // 转义正则
      const regex = new RegExp(`(${keyword})`, "gi");
      return text.replace(regex, '<span class="highlight">$1</span>');
    },
  },
};
</script>

<style scoped>
/* 外层占满视口，滚动条贴边 */
.nav-page-wrapper {
  height: 100vh;
  overflow-y: auto;
  background: #f5f7fa;
}

/* 内部内容加 padding */
.nav-page-wrapper .header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #f5f7fa;
  padding: 20px 40px 10px 40px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
}

h1 {
  text-align: center;
  font-size: 36px;
  color: #333;
  margin: 0 0 10px 0;
}

.search-box {
  text-align: center;
}

.search-box input {
  width: 300px;
  padding: 8px 12px;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  outline: none;
  transition: all 0.3s;
}

.search-box input:focus {
  border-color: #1890ff;
  box-shadow: 0 0 5px rgba(24, 144, 255, 0.5);
}

/* 菜单模块列表滚动 */
.module-list {
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* 模块标题 */
.module h2 {
  font-size: 22px;
  color: #1890ff;
  margin-bottom: 15px;
  border-bottom: 2px solid #eee;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.module-icon {
  font-size: 20px;
}

/* 平铺菜单 */
.menu-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.menu-item {
  background: linear-gradient(135deg, #6dd5fa, #2980b9);
  color: #fff;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.menu-item:hover {
  background: linear-gradient(135deg, #2980b9, #6dd5fa);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* 高亮关键字 */
::v-deep(.highlight) {
  background-color: yellow;
  color: #000;
  padding: 0 2px;
  border-radius: 2px;
}

/* 没有匹配结果 */
.no-result {
  text-align: center;
  font-size: 18px;
  color: #999;
  margin-top: 30px;
}
</style>
