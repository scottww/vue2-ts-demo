<template>
  <div class="toolbar-demo">
    <div class="tool-bar">
      <div
        class="tool-bar-item-wrapper-with-menu"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <!-- 主按钮 -->
        <div class="tool-bar-item-wrapper">
          <div class="tool-bar-item">
            <img :src="showMenu ? hoverIcon : normalIcon" alt="新增" />
          </div>
        </div>

        <!-- 子菜单 -->
        <div class="menu" v-if="showMenu">
          <div
            class="menu-item"
            v-for="(item, index) in menuItems"
            :key="index"
            @click="handleMenu(item)"
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
      </div>

      <!-- 分割线 -->
      <div class="tool-bar-divider-line"></div>

      <!-- 删除按钮 -->
      <div class="tool-bar-item" @click="clearAllLayer">
        <img
          src="../../assets/mapToolBar/delete.png"
          alt="删除"
          title="清除所有图层"
        />
      </div>

      <!-- 分割线 -->
      <div class="tool-bar-divider-line"></div>
      <div class="tool-bar-item" @click="setDelButtonsVisible">
        <img
          src="../../assets/mapToolBar/close.png"
          alt="显示/隐藏删除标记"
          :title="visibleDel ? '隐藏删除标记' : '显示删除标记'"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // tool-bar
      hideTimer: null,
      showMenu: false,
      hoverIndex: -1, // 用于追踪当前 hover 的菜单项
      hoverIcon: require("@/assets/mapToolBar/add3_hover.png"),
      normalIcon: require("@/assets/mapToolBar/add3.png"),
      menuItems: [
        {
          label: "新增规划",
          value: "规划",
          icon: require("../../assets/mapToolBar/type3.png"),
          hoverIcon: require("../../assets/mapToolBar/type3_hover.png")
        },
        {
          label: "新增占用",
          value: "占用",
          icon: require("../../assets/mapToolBar/type12.png"),
          hoverIcon: require("../../assets/mapToolBar/type12_hover.png")
        },
        {
          label: "新增补偿",
          value: "补偿",
          icon: require("../../assets/mapToolBar/type12.png"),
          hoverIcon: require("../../assets/mapToolBar/type12_hover.png")
        }
      ],
      visibleDel: false, //删除按钮 总开关 标识
    };
  },
  methods: {
    //tool-bar
    handleMenu(item) {
      console.log("点击了菜单：", item);
      this.showMenu = false;
    },
    onMouseEnter() {
      clearTimeout(this.hideTimer);
      this.showMenu = true;
    },
    onMouseLeave() {
      this.hideTimer = setTimeout(() => {
        this.showMenu = false;
      }, 200); // 延迟隐藏
    },
    clearAllLayer(){},
    setDelButtonsVisible() {}
  }
};
</script>

<style lang="scss" scoped>
.toolbar-demo {
  position: relative;
}
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

.tool-bar-item-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
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
  margin: 0 4px;
  color: #ccc;
  font-weight: bold;
  user-select: none;
}

.tool-bar-divider-line {
  width: 1px;
  height: 24px;
  background-color: #ccc;
  margin: 0 8px;
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
  color: #409eff;
}

.menu-icon {
  width: 14px;
  height: 14px;
  transition: all 0.2s;
}
</style>