<template>
  <div class="tools-box">
    <div class="tools-box_item" @mouseover="hover = true" @mouseleave="hover = false">
      <!-- <img class="img-box" :src="require('@/assets/images/mapToolBar/add.png')" alt="" /> -->
      <!-- <img class="img-box" src="@/assets/mapToolBar/add.png" alt="" /> -->
      <img class="img-box" :src="hover ? hoverImage : defaultImage" alt="动态图片" />
    </div>
  </div>
</template>

<script>
const defaultImage = require('@/assets/mapToolBar/add_grey.png');  // 默认图片
const hoverImage = require('@/assets/mapToolBar/add.png');  // 悬停时的图片

export default {
  data(){
    return {
      defaultImage,
      hoverImage,
      hover: false
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