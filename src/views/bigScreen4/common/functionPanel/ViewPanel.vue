<template>
  <div class="view-panel-container">
    <div class="view-list">
      <div
        class="view-item"
        :class="{ active: value === 'defaultView' }"
        @click="handleViewClick('defaultView')"
      >
        <span class="view-name">默认视角</span>
      </div>
      <div
        class="view-item"
        :class="{ active: value === 'mainPlant' }"
        @click="handleViewClick('mainPlant')"
      >
        <span class="view-name">主厂房视角</span>
      </div>
      <div
        class="view-item"
        :class="{ active: value === 'controlRoom' }"
        @click="handleViewClick('controlRoom')"
      >
        <span class="view-name">中控室视角</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ViewPanel",
  props: {
    value: {
      type: String,
      default: "defaultView"
    }
  },
  methods: {
    handleViewClick(viewType) {
      this.$emit("input", viewType); // 支持 v-model
      this.$emit("viewChange", viewType); // 自定义事件
    }
  }
};
</script>

<style scoped>
.view-panel-container {
  width: 100%;
  height: 100%;
  padding: 22px 12px;
}

/* 视角列表 */
.view-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* 视角项 */
.view-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 4px;
  border-radius: 6px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

/* 激活状态 */
.view-item.active {
  background: #0f7ec6;
  border: 1px solid rgba(100, 200, 255, 0.5);
}

/* 名称 */
.view-name {
  color: #fff;
  font-size: 18px;
  margin-left: 10px;
}
</style>
