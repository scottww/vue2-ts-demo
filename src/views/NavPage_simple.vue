<template>
  <div class="nav-page">
    <h1>功能导航</h1>
    <div class="module-list">
      <div class="module" v-for="(module, mIndex) in items" :key="mIndex">
        <h2>{{ module.name }}</h2>
        <div class="menu-grid">
          <div
            class="menu-item"
            v-for="child in module.children"
            :key="child.id"
            @click="toPath(child.path)"
          >
            {{ child.text }}
          </div>
        </div>
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
      items: [...menus]
    };
  },
  methods: {
    toPath(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped>
.nav-page {
  padding: 40px;
  background: #f5f7fa;
  min-height: 100vh;
}

h1 {
  text-align: center;
  margin-bottom: 40px;
  font-size: 36px;
  color: #333;
}

.module-list {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.module h2 {
  font-size: 22px;
  color: #1890ff;
  margin-bottom: 20px;
  border-bottom: 2px solid #eee;
  padding-bottom: 5px;
}

.menu-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.menu-item {
  background: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.menu-item:hover {
  background: #1890ff;
  color: #fff;
  transform: translateY(-2px);
}
</style>
