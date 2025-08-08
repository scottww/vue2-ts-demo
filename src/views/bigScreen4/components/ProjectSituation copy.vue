<template>
  <div class="panel">
    <div class="panel-header">
      <span>工程情况</span>
    </div>
    <div class="panel-body">
      <div class="top">
        <div class="left">图片</div>
        <div class="right">文案描述</div>
      </div>
      <div class="center">
        <div class="top">
          <div class="left">闸门5孔</div>
          <div class="right">泵组6台</div>
        </div>
        <div class="down">
          <!-- item左右布局 -->
          <div class="item">
            <span>机组累计运行总台时</span>
            <span>71703 h</span>
          </div>
          <div class="item">
            <span>机组累计总抽水量</span>
            <span>46.46 亿m³</span>
          </div>
          <div class="item">
            <span>节制闸累计总泄洪量</span>
            <span>243.38 亿m³</span>
          </div>
        </div>
      </div>
      <div class="down2">
        <!-- 时间轴，自动滚动 -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProjectSituation"
};
</script>
<style scoped>
.panel {
  background: rgba(0, 76, 153, 0.2);
  border: 1px solid rgba(0, 153, 255, 0.3);
  border-radius: 6px;
  padding: 12px;
  color: #fff;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
}

.panel-year {
  font-size: 14px;
  color: #66ccff;
}

.panel-body {
  height: calc(100% - 40px);

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>