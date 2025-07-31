<template>
  <div>
    <custom-a-spin :spinning="loading" tip="加载中...">
      <div style="width: 200px; height: 100px; background: #eee; padding: 20px">
        这里是需要加载的内容区域
      </div>
    </custom-a-spin>

    <button @click="loading = !loading">切换加载状态</button>

    <br /><br />

    <!-- 模拟的 -->
    <div class="section">
      <custom-a-spin :spinning="true" />
    </div>

    <!-- Ant Design Spin -->
    <div class="section">
      <a-spin :spinning="true" tip="加载中..." />
    </div>
    <!-- 四个点阵 旋转 -->
    <div class="section">
      <sim-spin :spinning="loading" tip="加载中..." />
    </div>
    <div class="section">
      <sim-spin2 :spinning="loading" tip="加载中..." />
    </div>
  </div>
</template>

<script>
import CustomASpin from "./CustomSpin.vue";
import SimSpin from "./SimSpin.vue";
import SimSpin2 from "./SimSpin2.vue";

export default {
  components: { CustomASpin, SimSpin, SimSpin2 },
  data() {
    return {
      loading: true
    };
  }
};
</script>
<style scoped>
.section {
  margin-top: 20px;
}
</style>
