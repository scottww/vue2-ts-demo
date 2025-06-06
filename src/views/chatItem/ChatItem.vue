<template>
  <div
    class="chat-item"
    @mouseenter="hover = true"
    @mouseleave="onMouseLeave"
  >
    <div class="chat-title">{{ title }}</div>

    <el-dropdown
      trigger="click"
      @visible-change="onDropdownVisibleChange"
      @command="handleCommand"
      class="dropdown"
    >
      <span
        class="el-dropdown-link chat-more-wrapper"
        :class="{ visible: hover || dropdownVisible }"
      >
        <i class="el-icon-more chat-more-icon"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="rename">重命名</el-dropdown-item>
        <el-dropdown-item command="delete">删除</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "ChatItem",
  props: {
    title: {
      type: String,
      default: "对话标题",
    },
  },
  data() {
    return {
      hover: false,
      dropdownVisible: false,
    };
  },
  methods: {
    onMouseLeave() {
      // 如果菜单没展开，就隐藏三个点
      if (!this.dropdownVisible) {
        this.hover = false;
      }
    },
    onDropdownVisibleChange(val) {
      this.dropdownVisible = val;

      // 如果菜单被关闭，并且鼠标没有在上面，就隐藏三个点
      if (!val && !this.isHoveringOverItem()) {
        this.hover = false;
      }
    },
    handleCommand(command) {
      if (command === "rename") {
        this.$message.success("点击了重命名");
      } else if (command === "delete") {
        this.$message.warning("点击了删除");
      }
    },
    isHoveringOverItem() {
      const itemEl = this.$el;
      return itemEl && itemEl.matches(':hover');
    },
  },
};
</script>

<style scoped>
.chat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 12px;
  background: #f5f7fa;
  border-radius: 4px;
  margin-bottom: 6px;
  position: relative;
  cursor: pointer;
}

.chat-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chat-more-wrapper {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.chat-more-wrapper.visible {
  opacity: 1;
  pointer-events: auto;
}

.chat-more-icon {
  font-size: 18px;
  color: #909399;
  cursor: pointer;
}
</style>
