<template>
  <div class="big-screen">
    <div class="bg-layer"></div>

    <!-- 顶部栏 -->
    <div class="header-bar">
      <div class="header-title">xxx驾驶舱</div>
      <div class="header-nav">
        <button>首页</button>
        <button>工程管理</button>
        <button>监测管理</button>
      </div>
    </div>

    <!-- 主体内容区域 -->
    <div class="main-content">
      <!-- 左侧面板 -->
      <div class="left-panel">
        <div class="panel">工情概况</div>
        <div class="panel">水情信息</div>
        <div class="panel">天气预报</div>
      </div>

      <!-- 中间UE区域 -->
      <div class="center-panel">
        <iframe
          class="ue-frame"
          src="https://your-ue-url.com"
          frameborder="0"
        ></iframe>
      </div>

      <!-- 右侧面板 -->
      <div class="right-panel">
        <div class="panel">闸门统计</div>
        <div class="panel">水质预警</div>
        <div class="panel">防汛预警</div>
        <div class="panel">风险地图</div>
      </div>
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
  background-color: #000d1a;
}

.bg-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  /* background: url('@/assets/bg.jpg') no-repeat center center; */
  background-size: cover;
  z-index: 0;
  opacity: 0.2;
}

.header-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #00cfff;
  font-size: 36px;
  z-index: 2;
  background: rgba(0, 0, 0, 0.4);
}

.header-title {
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
  padding: 10px 20px;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
}

.main-content {
  display: flex;
  height: 980px;
  margin-top: 100px;
  position: relative;
  z-index: 1;
}

.left-panel,
.right-panel {
  width: 870px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  box-sizing: border-box;
  background: rgba(0, 0, 50, 0.4);
}

.left-panel .panel,
.right-panel .panel {
  flex: 1;
  background: rgba(0, 30, 60, 0.6);
  border: 1px solid #00cfff;
  border-radius: 12px;
  padding: 16px;
  box-sizing: border-box;
  color: #fff;
  margin-bottom: 20px;
}

.left-panel .panel:last-child,
.right-panel .panel:last-child {
  margin-bottom: 0;
}

.panel-title {
  font-size: 24px;
  color: #00cfff;
  margin-bottom: 12px;
}

.center-panel {
  width: 4200px;
  height: 980px;
  background-color: #000;
}

.ue-frame {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
