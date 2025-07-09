<template>
  <div class="legend-panel">
    <div class="panel-title">图例</div>
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
        <div class="legend-item"><span class="circle lightgreen" /> 10-25</div>
        <div class="legend-item"><span class="circle blue" /> 25-50</div>
        <div class="legend-item"><span class="circle purple" /> 50-100</div>
        <div class="legend-item"><span class="circle pink" /> 100-250</div>
        <div class="legend-item"><span class="circle red" /> ＞250</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LegendPanel",
};
</script>

<style scoped>
.legend-panel {
  background: rgba(10, 32, 61, 0.85);
  border-radius: 6px;
  padding: 10px;
  color: #fff;
  width: 200px;
}
.panel-title {
  font-weight: bold;
  margin-bottom: 8px;
}
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
</style>
