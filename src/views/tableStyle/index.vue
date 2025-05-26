<template>
  <div class="tableStyle">
    <div class="head-box">
      <span>数据列表</span>
    </div>
    <div class="table-container">
      <div class="header">
        <div class="right">#</div>
        <div class="left">列 1</div>
        <div class="left">列 2</div>
        <div class="left">列 3</div>
      </div>
      <div v-if="!hasData" class="no-data-row">暂无数据</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hasData: false // 假设这里未来根据实际数据动态判断
    };
  }
};
</script>

<style lang="scss" scoped>
.tableStyle {
}

.table-container {
  width: 50%;
  height: 300px;
  padding: 20px;
  background-color: #000;
}

.header {
  display: flex;
  .left {
    flex: 1 1;
    height: 32px;
    background: rgba(5, 118, 178, 0.24);
    border: 1px solid rgba(68, 204, 255, 0.45);
    font-family: AlibabaPuHuiTi_3_55_Regular;
    font-size: 13px;
    color: #90bddd;
    line-height: 32px;
    text-align: center;
    font-style: normal;
  }
  .right {
    width: 120px;
    height: 32px;
    background: rgba(5, 118, 178, 0.24);
    border: 1px solid rgba(68, 204, 255, 0.45);
    font-family: AlibabaPuHuiTi_3_55_Regular;
    font-size: 13px;
    color: #90bddd;
    line-height: 32px;
    text-align: center;
    font-style: normal;
  }
}

.no-data-row0 {
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #aaa;
  font-size: 13px;
  border: 1px dashed rgba(255, 255, 255, 0.2);
  margin-top: 10px;
  background-color: rgba(255, 255, 255, 0.05);
  font-family: AlibabaPuHuiTi_3_55_Regular;
}

.no-data-row {
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #aaa;
  font-size: 13px;
  border: 1px solid rgba(68, 204, 255, 0.45);
  border-top: none;
  background-color: rgba(255, 255, 255, 0.05);
  font-family: AlibabaPuHuiTi_3_55_Regular;
}

.head-box {
  position: relative;
  padding: 20px;
}

.head-box span::before {
  content: "";
  position: absolute;
  left: 0;
  top: 20px;
  bottom: 20px;
  width: 3px;
  background-color: #4c84ff;
}
</style>