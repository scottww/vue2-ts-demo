<template>
  <div class="legend-scroll-container">
    <div class="item" v-for="n in 50" :key="n">图例项 {{ n }}</div>
  </div>
</template>

<script>
export default {
  name: "LegendScrollTest",
  mounted() {
    const container = document.querySelector(".legend-scroll-container");
    console.log("clientHeight:", container.clientHeight);
    console.log("scrollHeight:", container.scrollHeight);
  }
};
</script>

<style scoped>
.legend-scroll-container {
  width: 200px;
  height: 200px; /* 固定高度 */
  overflow-y: auto;
  border: 1px solid #ccc;
  background: #001f3f;
  color: #fff;
  font-size: 14px;
  /* padding: 8px; */
}

/* 自定义滚动条（webkit内核浏览器有效） */
/* 设置整个滚动条宽度 */
.legend-scroll-container::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.legend-scroll-container11::-webkit-scrollbar-thumb {
  background-color: #00ff00;
  border-radius: 6px;
  min-height: 24px; /* 保证滑块最小高度 */
  background-clip: content-box;
}
/* 滑块 */
.legend-scroll-container::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 5px;
  border: 2px solid transparent;
  background-clip: content-box; /* 边框透明让滑块更有层次感 */
}
/* 轨道 */
.legend-scroll-container::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
}

/* 内容项 */
.item {
  padding: 12px 0; /* 保证足够高度撑满滚动条 */
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
</style>
