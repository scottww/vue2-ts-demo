<template>
  <div class="big-screen">
    <!-- UE背景 iframe -->
    <iframe class="ue-frame" src="https://your-ue-url.com" frameborder="0"></iframe>

    <!-- 顶部导航栏 -->
    <div class="header-bar">
      <div class="header-title">xxx驾驶舱</div>
      <div class="header-nav">
        <button>首页</button>
        <button>工程管理</button>
        <button>监测管理</button>
      </div>
    </div>

    <!-- 左侧面板 -->
    <div class="left-panel">
      <div class="panel">工情概况</div>
      <div class="panel">水情信息</div>
      <div class="panel">天气预报</div>
    </div>

    <!-- 右侧面板 -->
    <div class="right-panel">
      <div class="panel">闸门统计</div>
      <div class="panel">水质预警</div>
      <div class="panel">防汛预警</div>
      <div class="panel">风险地图</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BigScreenLayout'
}
</script>

<style scoped>
.big-screen {
  position: relative;
  width: 5940px;
  height: 1080px;
  overflow: hidden;
  background-color: #000;
}

/* 中间UE背景 */
.ue-frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 5940px;
  height: 1080px;
  z-index: 0;
  border: none;
}

/* 顶部栏 */
.header-bar {
  position: absolute;
  top: 20px;
  left: 0;
  width: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: auto;
}

.header-title {
  font-size: 40px;
  color: #00cfff;
  margin-bottom: 10px;
}

.header-nav {
  display: flex;
  gap: 40px;
}

.header-nav button {
  font-size: 24px;
  background: #004466;
  border: none;
  padding: 10px 30px;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
}

/* 左侧面板 */
.left-panel {
  position: absolute;
  top: 150px;
  left: 50px;
  width: 800px;
  height: calc(100% - 200px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;
}

/* 右侧面板 */
.right-panel {
  position: absolute;
  top: 150px;
  right: 50px;
  width: 800px;
  height: calc(100% - 200px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;
}

/* 通用面板样式 */
.panel {
  flex: 1;
  margin-bottom: 20px;
  background: rgba(0, 30, 60, 0.7);
  border: 1px solid #00cfff;
  border-radius: 12px;
  padding: 20px;
  color: #fff;
  font-size: 28px;
}

.panel:last-child {
  margin-bottom: 0;
}
</style>
