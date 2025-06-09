<template>
  <div class="hover-menu-wrapper">
    <!-- 菜单 -->
    <div class="menu" v-if="showMenu">
      <div
        class="menu-item"
        v-for="(item, index) in items"
        :key="index"
        @mouseenter="hoverIndex = index"
        @mouseleave="hoverIndex = -1"
        @click="handleClick(item)"
      >
        <img
          class="menu-icon"
          :src="hoverIndex === index ? item.hoverIcon : item.icon"
          :alt="item.label"
        />
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HoverMenu",
  props: {
    normalIcon: {
      type: String,
      required: true
    },
    hoverIcon: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
      // item 结构：{ label: '选项一', icon: '路径', hoverIcon: '路径' }
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      showMenu: false,
      hoverIndex: -1
    };
  },
  mounted: {
    show: {
      immediate: true,
      handler(val) {
        this.showMenu = val;
      }
    }
  },
  methods: {
    handleClick(item) {
      this.$emit("select", item); // 通知父组件
      this.showMenu = false;
    }
  },
  watch: {
    show(val) {
      this.showMenu = val;
    }
  }
};
</script>

<style scoped>
.hover-menu-wrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.main-icon {
  width: 15px;
  height: 16px;
}

.menu {
  position: absolute;
  top: 30px;
  right: 0;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  z-index: 100;
  min-width: 100px;
  padding: 4px 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  gap: 6px;
  white-space: nowrap;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-icon {
  width: 14px;
  height: 14px;
}
</style>
