<template>
  <div class="nav-page-modern">
    <h1>功能总览</h1>

    <!-- 搜索框 -->
    <div class="search-box">
      <input type="text" v-model="searchText" placeholder="搜索路由..." />
    </div>

    <!-- 新增滚动容器 -->
    <div class="scroll-wrapper">
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
              :class="{
                active: module.children.some((c) => c.path === activePath)
              }"
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
  </div>
</template>

<script>
import { menus } from "./data.js";

export default {
  name: "NavPageModern",
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
/* 新增滚动容器 */
.scroll-wrapper {
  flex: 1 1 auto;
  overflow-y: auto;
  width: 100vw; /* 撑满浏览器宽度，让滚动条靠右 */
  height: calc(
    100vh - 30px - 20px - 50px
  ); /* 高度 = 100vh - 顶部h1和搜索框等 */
  box-sizing: border-box;
}

/* 页面整体 */
.nav-page-modern {
  height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
  background: linear-gradient(135deg, #e0f7fa, #f0f4ff);
  box-sizing: border-box;
  padding-top: 30px;
}

/* 标题 */
h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 36px;
  color: #333;
  font-weight: 600;
}

/* 搜索框 */
.search-box {
  text-align: center;
  margin-bottom: 20px;
  flex: 0 0 auto;
}

.search-box input {
  width: 300px;
  max-width: 90%;
  padding: 10px 16px;
  font-size: 16px;
  border: none;
  border-radius: 12px;
  outline: none;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.search-box input:focus {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.module-list {
  flex: 1 1 auto;
  overflow-y: auto;
  scroll-behavior: smooth;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

/* 内部内容左右间距 */
.module-list > .module {
  padding: 0 15px; /* 内边距，不影响滚动条 */
}

/* 自定义滚动条 */
.module-list::-webkit-scrollbar {
  width: 8px;
}
.module-list::-webkit-scrollbar-thumb {
  background-color: rgba(24, 144, 255, 0.6);
  border-radius: 4px;
}
.module-list::-webkit-scrollbar-thumb:hover {
  background-color: rgba(24, 144, 255, 0.9);
}
.module-list::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

/* 模块标题 */
.module h2 {
  font-size: 22px;
  color: #1890ff;
  margin-bottom: 12px;
  border-bottom: 2px solid rgba(24, 144, 255, 0.3);
  padding-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.module-icon {
  font-size: 20px;
}

/* 菜单卡片 */
.menu-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding-right: 30px; /* 保留卡片与右边的间距 */
}

.menu-item {
  background: rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  color: #333;
  padding: 14px 26px;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
  font-weight: 500;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  flex: 0 1 auto; /* 响应式 */
  min-width: 120px; /* 保证小屏幕也能显示 */
}

/* 悬浮效果 */
.menu-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  background: rgba(255, 255, 255, 0.5);
}

/* 当前激活 */
.menu-item.active {
  box-shadow: 0 0 0 2px #1890ff inset;
  font-weight: 600;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.6);
}

/* 搜索高亮 */
::v-deep(.highlight) {
  background-color: #ffe58f;
  color: #000;
  padding: 0 3px;
  border-radius: 3px;
}

/* 无结果提示 */
.no-result {
  text-align: center;
  font-size: 18px;
  color: #999;
  margin-top: 20px;
}

/* 响应式：小屏幕卡片换行 */
@media screen and (max-width: 768px) {
  .menu-grid {
    justify-content: center;
  }
  .menu-item {
    flex: 0 1 40%; /* 两列布局 */
  }
}

@media screen and (max-width: 480px) {
  .menu-item {
    flex: 0 1 80%; /* 单列布局 */
  }
}
</style>
