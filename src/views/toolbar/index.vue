<template>
  <div class="toolbar-demo">
    <!-- 工具栏 -->
    <div class="tool-bar">
      <!-- 主按钮，点击展开 -->
      <div class="tool-bar-item" @click="toggleMenu">
        <img :src="showMenu ? hoverIcon : normalIcon" alt="展开菜单" />
        <span>杭州市</span>
      </div>

      <!-- 下拉弹出区域 -->
      <div class="district-menu" v-if="showMenu">
        <div class="menu-header">当前位置：浙江省 > 杭州市</div>
        <div class="district-list">
          <div
            v-for="(item, index) in menuItems"
            :key="index"
            :class="[
              'district-item',
              activeItem === item.value ? 'active' : ''
            ]"
            @click="selectDistrict(item)"
          >
            {{ item.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMenu: false,
      activeItem: "",
      hoverIcon: require("@/assets/mapToolBar/add3_hover.png"),
      normalIcon: require("@/assets/mapToolBar/add3.png"),
      menuItems: [
        { label: "全市", value: "全市" },
        { label: "上城区", value: "上城区" },
        { label: "拱墅区", value: "拱墅区" },
        { label: "西湖区", value: "西湖区" },
        { label: "滨江区", value: "滨江区" },
        { label: "萧山区", value: "萧山区" },
        { label: "余杭区", value: "余杭区" },
        { label: "临平区", value: "临平区" },
        { label: "钱塘区", value: "钱塘区" },
        { label: "富阳区", value: "富阳区" },
        { label: "临安区", value: "临安区" },
        { label: "建德市", value: "建德市" },
        { label: "桐庐县", value: "桐庐县" },
        { label: "淳安县", value: "淳安县" }
      ]
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    selectDistrict(item) {
      this.activeItem = item.value;
      this.showMenu = false;
      console.log("选中区域：", item.label);
      // 可在此 emit 或执行地图定位等操作
    }
  }
};
</script>

<style lang="scss" scoped>
.toolbar-demo {
  position: relative;
}
.tool-bar {
  position: absolute;
  top: 10px;
  left: 160px;
  background: #fff;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 2px 0px 8px 0px #000000;
  z-index: 999;
}

.tool-bar-item img {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.tool-bar-item span {
  vertical-align: middle;
  margin-left: 10px;
  cursor: pointer;
}

// 下拉菜单
.district-menu {
  position: absolute;
  top: 40px;
  left: 0;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  padding: 12px;
  min-width: 360px;
}

.menu-header {
  margin-bottom: 10px;
  font-weight: bold;
  color: #333;
}

.district-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.district-item {
  padding: 4px 10px;
  background: #f5f5f5;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.2s;
}

.district-item:hover {
  background: #e0e0e0;
}

.district-item.active {
  background: #409eff;
  color: white;
}
</style>