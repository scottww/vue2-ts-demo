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
        <div class="panel top">
          <!-- 可替换为组件 -->
          <div class="panel-title">设备统计管理</div>
        </div>
        <div class="panel bottom">
          <div class="panel-title">闸门实时监测</div>
        </div>
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
        <div class="panel top">
          <div class="panel-title">闸门历史运行统计</div>
        </div>
        <div class="panel bottom">
          <div class="panel-title">其他图表</div>
        </div>
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
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  color: #00cfff;
  font-size: 36px;
  z-index: 2;
  background: rgba(0, 0, 0, 0.4);
}

.header-title {
  flex: 1;
  text-align: center;
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
  height: 48%;
  background: rgba(0, 30, 60, 0.6);
  border: 1px solid #00cfff;
  border-radius: 12px;
  padding: 16px;
  box-sizing: border-box;
  color: #fff;
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
