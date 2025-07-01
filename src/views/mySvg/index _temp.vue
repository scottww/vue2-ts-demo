<template>
  <div class="mySvg">
    <!-- 直接使用 -->
    <i class="mySvg mySvg-1"></i>
    <i class="mySvg mySvg-2"></i>
    <!-- 使用base组件的方式 -->
    <MySvgBase name="mySvg-3" />
    <MySvgBase name="mySvg-4" />
    <!-- MySvg_1 -->
    <MySvg name="mySvg-5" />
    <MySvg name="mySvg-6" :size="30" color="red" />

    <!-- last version -->
    <div class="demo-box">
      <!-- 普通图标 -->
      <MySvg name="mySvg-7" :size="28" color="#666" />

      <!-- 悬停变色 -->
      <MySvg name="mySvg-8" :size="32" color="#888" hoverColor="#f00" />

      <!-- 旋转图标 -->
      <MySvg name="mySvg-9" :size="30" color="#09f" :spin="true" />
    </div>
  </div>
</template>

<script>
import MySvgBase from "./MySvg_base.vue";
import MySvg1 from "./MySvg_1.vue";
import MySvg from "./MySvg.vue";
export default {
  components: {
    MySvgBase,
    MySvg1,
    MySvg
  }
};
</script>

<style lang="scss" scoped>
.demo-box{
  display: flex;
  align-items: center;
  height: 100px;
  border: 1px solid #ccc;
  gap: 10px;
}
</style>