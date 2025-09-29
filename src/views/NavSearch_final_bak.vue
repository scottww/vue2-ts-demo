<template>
  <div class="nav-page">
    <h1>功能总览</h1>

    <!-- 搜索框 -->
    <div class="search-box">
      <input
        type="text"
        v-model="searchText"
        placeholder="输入关键词搜索路由..."
      />
    </div>

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
            :class="{ active: module.children.some(c => c.path === activePath) }"
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
      activePath: this.$route.path
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
    }
  },
  watch: {
    $route(to) {
      this.activePath = to.path;
    }
  },
  methods: {
    toPath(path) {
      this.$router.push(path);
      this.activePath = path;
    },
    highlightText(text) {
      if (!this.searchText) return text;
      const keyword = this.searchText.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      const regex = new RegExp(`(${keyword})`, "gi");
      return text.replace(regex, '<span class="highlight">$1</span>');
    }
  }
};
</script>

<style scoped>
.nav-page {
  padding: 30px;
  background: #f5f7fa;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 36px;
  color: #333;
  font-weight: 600;
}

.search-box {
  text-align: center;
  margin-bottom: 20px;
  flex: 0 0 auto;
}

.search-box input {
  width: 300px;
  padding: 8px 14px;
  font-size: 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s;
}

.search-box input:focus {
  border-color: #1890ff;
  box-shadow: 0 0 8px rgba(24, 144, 255, 0.3);
}

.module-list {
  flex: 1 1 auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-right: 8px;
  scroll-behavior: smooth;
}

/* 美化滚动条 */
.module-list::-webkit-scrollbar {
  width: 6px;
}
.module-list::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}
.module-list::-webkit-scrollbar-track {
  background: transparent;
}

.module h2 {
  font-size: 22px;
  color: #1890ff;
  margin-bottom: 12px;
  border-bottom: 2px solid #eee;
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.module-icon {
  font-size: 20px;
}

.menu-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.menu-item {
  background: linear-gradient(145deg, #6dd5fa, #2980b9);
  color: #fff;
  padding: 12px 24px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  font-weight: 500;
}

.menu-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
  background: linear-gradient(145deg, #2980b9, #6dd5fa);
}

/* 当前激活路由高亮 */
.menu-item.active {
  box-shadow: 0 0 0 2px #1890ff inset;
  font-weight: 600;
  border-radius: 12px;
}

/* 高亮搜索关键字 */
::v-deep(.highlight) {
  background-color: #ffe58f;
  color: #000;
  padding: 0 2px;
  border-radius: 2px;
}

.no-result {
  text-align: center;
  font-size: 18px;
  color: #999;
  margin-top: 20px;
}
</style>
