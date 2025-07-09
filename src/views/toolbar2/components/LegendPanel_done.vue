<template>
  <CollapsePanel title="图例">
    <div class="legend-scroll-container">
      <div class="legend-section">
        <div class="legend-label">水位</div>
        <div class="legend-items">
          <div class="legend-item"><span class="dot blue" /> 正常</div>
          <div class="legend-item"><span class="dot orange" /> 超警</div>
          <div class="legend-item"><span class="dot red" /> 超汛/超保</div>
        </div>
      </div>

      <div class="legend-section">
        <div class="legend-label">雨量</div>
        <div class="legend-items">
          <div class="legend-item"><span class="circle gray" /> 无降雨</div>
          <div class="legend-item"><span class="circle green" /> 0-10</div>
          <div class="legend-item">
            <span class="circle lightgreen" /> 10-25
          </div>
          <div class="legend-item"><span class="circle blue" /> 25-50</div>
          <div class="legend-item"><span class="circle purple" /> 50-100</div>
          <div class="legend-item"><span class="circle pink" /> 100-250</div>
          <div class="legend-item"><span class="circle red" /> ＞250</div>
          <!-- 临时复制雨量项多几行 -->
          <div class="legend-item"><span class="circle red" /> ＞250</div>
          <div class="legend-item"><span class="circle red" /> ＞250</div>
          <div class="legend-item"><span class="circle red" /> ＞250</div>
          <div class="legend-item"><span class="circle red" /> ＞250</div>
          <div class="legend-item"><span class="circle red" /> ＞250</div>
        </div>
      </div>

      <!-- 可继续添加更多图例类型... -->
    </div>
  </CollapsePanel>
</template>

<script>
import CollapsePanel from "./CollapsePanel.vue";
export default {
  name: "LegendPanel",
  components: { CollapsePanel }
};
</script>

<style lang="scss" scoped>
.legend-scroll-container {
  height: 200px;
  max-height: 200px; /* 控制最大高度 */
  /* 动态调整 */
  /* max-height: calc(100vh - 100px); */
  overflow-y: auto;
  // padding-right: 4px;
  padding: 10px;
}

// 滚动条样式
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

.legend-scroll-container::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 5px;
  border: 2px solid transparent;
  background-clip: content-box;
}

.legend-scroll-container::-webkit-scrollbar-track {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
}

/* 内容样式 */
.legend-section {
  margin-top: 10px;
}
.legend-label {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
}
.legend-items {
  display: flex;
  flex-wrap: wrap;
}
.legend-item {
  width: 50%;
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}
.dot,
.circle {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 6px;
}
.blue {
  background: #3fa9f5;
}
.orange {
  background: #f59e0b;
}
.red {
  background: #ef4444;
}
.gray {
  background: #a1a1aa;
}
.green {
  background: #10b981;
}
.lightgreen {
  background: #6ee7b7;
}
.purple {
  background: #a78bfa;
}
.pink {
  background: #f472b6;
}

::v-deep .panel-body {
  padding: 0;
}
</style>
