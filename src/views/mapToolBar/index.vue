<template>
  <div class="tools-box">
    <div class="tools-box_item" @click="selectTool('add')" title="新增">
      <!-- <img class="img-box" :src="require('@/assets/images/mapToolBar/add.png')" alt="" /> -->
      <!-- <img class="img-box" src="@/assets/mapToolBar/add.png" alt="" /> -->
      <img
        class="img-box"
        :src="selectedTool === 'add' ? activeImage : defaultImage"
        alt="动态图片"
      />
    </div>
    <div class="tools-box_item" @click="selectTool('edit')" title="编辑">
      <img
        class="img-box"
        :src="selectedTool === 'edit' ? activeImageEdit : defaultImageEdit"
        alt="动态图片"
      />
    </div>
  </div>
</template>

<script>
const defaultImage = require("@/assets/mapToolBar/add_grey.png"); // 默认图片
const activeImage = require("@/assets/mapToolBar/add.png"); // 悬停时的图片
const defaultImageEdit = require("@/assets/mapToolBar/edit_grey.png"); // 默认图片
const activeImageEdit = require("@/assets/mapToolBar/edit.png"); // 悬停时的图片

export default {
  data() {
    return {
      defaultImage,
      activeImage,
      defaultImageEdit,
      activeImageEdit,
      hover: false,
      selectedTool: ""
    };
  },
  methods: {
    selectTool(tool) {
      console.log("selectTool", tool);
      // 切换选中的工具，确保只有一个工具被选中
      this.selectedTool = this.selectedTool === tool ? "" : tool;
    }
  }
};
</script>

<style lang="scss" scoped>
.tools-box {
  background: #fff;
  display: flex;
  border: 1px solid grey;
}
.tools-box_item {
  padding: 4px;
  cursor: pointer;
}

.tools-box_item .img-box {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>