<template>
  <div class="menu" v-if="showMenu">
    <div
      class="menu-item"
      v-for="(item, index) in menuItems"
      :key="index"
      @click="handleMenu(item.label)"
      @mouseenter="hoverIndex = index"
      @mouseleave="hoverIndex = -1"
    >
      <img
        class="menu-icon"
        :src="hoverIndex === index ? item.hoverIcon : item.icon"
        alt="图标"
      />
      {{ item.label }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
      hoverIndex: -1, // 用于追踪当前 hover 的菜单项
      normalIcon: require("../../assets/mapToolBar/add3.png"),
      hoverIcon: require("../../assets/mapToolBar/add3_hover.png"),
      menuItems: [
        {
          label: "新增规划",
          icon: require("../../assets/mapToolBar/type12.png"),
          hoverIcon: require("../../assets/mapToolBar/type12_hover.png")
        },
        {
          label: "新增占用",
          icon: require("../../assets/mapToolBar/type12.png"),
          hoverIcon: require("../../assets/mapToolBar/type12_hover.png")
        },
        {
          label: "新增补偿",
          icon: require("../../assets/mapToolBar/type3.png"),
          hoverIcon: require("../../assets/mapToolBar/type3_hover.png")
        }
      ]
    };
  },
  methods: {
    handleMenu(label) {
      console.log("点击菜单项：", label);
      this.showMenu = false;
    }
  }
};
</script>

<style lang="scss" scoped>
// tool-bar
.tool-bar {
  position: absolute;
  background-color: #fff;
  // border: 1px solid #ccc;
  width: 100px;
  height: 32px;
  display: flex;
  align-items: center;
  // border-radius: 4px;
  width: fit-content;
  padding: 4px 8px;
  box-shadow: 2px 0px 8px 0px #000000;
  border-radius: 2px 2px 2px 2px;
  top: 10px;
  left: 160px;
  z-index: 999;
}

.tool-bar-item {
  position: relative;
  padding: 4px;
  cursor: pointer;
}

.tool-bar-item img {
  width: 15px;
  height: 16px;
  transition: all 0.2s;
}

.tool-bar-divider {
  width: 1px;
  height: 24px;
  background-color: #ccc;
  margin: 0 8px;
}

.tool-bar-divider-line {
  margin: 0 4px;
  color: #ccc;
  font-weight: bold;
  user-select: none;
}

/* 弹出菜单 */
.menu {
  position: absolute;
  top: 40px;
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  z-index: 10;
  min-width: 80px;
}

.menu-item {
  padding: 6px 12px;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #f0f0f0;
}

.menu-icon {
  width: 14px;
  height: 14px;
  transition: all 0.2s;
}
</style>