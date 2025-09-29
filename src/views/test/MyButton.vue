<template>
  <div class="my-button-demo">
    <h2>固定颜色</h2>
    <MyButton_done0 />
    <h2>随机颜色</h2>
    <MyButton_done1 />
    <h2>随机固定颜色</h2>
    <MyButton_done2 />
  </div>
</template>

<script>
import MyButton_done0 from "./MyButton_done0.vue";
import MyButton_done1 from "./MyButton_done1.vue";
import MyButton_done2 from "./MyButton_done2.vue";
export default {
  components: {
    MyButton_done0,
    MyButton_done1,
    MyButton_done2
  }
};
</script>

<style scoped>
.my-button-demo {
  background: #fff;
  padding: 20px;
  border: 1px solid #e5e6eb;
}
</style>