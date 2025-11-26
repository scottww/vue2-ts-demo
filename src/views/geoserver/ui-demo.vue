<template>
  <div class="ui-wrapper">

    <!-- 顶部标题区 -->
    <div class="ui-header">
      <h2 class="ui-title">数据监控面板</h2>

      <div class="ui-actions">
        <button class="btn-primary">刷新</button>
        <button class="btn-default">设置</button>
      </div>
    </div>

    <!-- 内容网格 -->
    <div class="ui-grid">

      <!-- 卡片 1 -->
      <div class="ui-card ui-panel">
        <div class="panel-title">运行统计</div>
        <div class="panel-content">
          数据内容示例：<br/>
          • 今日运行时长：12h 22min<br/>
          • 启动次数：16 次
        </div>
      </div>

      <!-- 卡片 2 -->
      <div class="ui-card ui-panel">
        <div class="panel-title">水量监控</div>
        <div class="panel-content">
          水位：15.2 m<br/>
          流量：102 m³/s
        </div>
      </div>

      <!-- 卡片 3 -->
      <div class="ui-card ui-panel">
        <div class="panel-title">设备状态</div>
        <div class="panel-content">
          • 设备 A：正常<br/>
          • 设备 B：维护中
        </div>
      </div>

      <!-- 卡片 4 -->
      <div class="ui-card ui-panel">
        <div class="panel-title">天气 & 雨量</div>
        <div class="panel-content">
          今日降雨：8.6mm<br/>
          明日预报：小雨转阴
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "ModernPanel"
};
</script>

<style scoped>
/* 外部容器 */
.ui-wrapper {
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

/* 顶部标题区 */
.ui-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e6e6e6;
}

.ui-title {
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

/* 按钮 */
.btn-primary {
  background: #1677ff;
  color: #fff;
  padding: 7px 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: .2s;
  margin-left: 10px;
}

.btn-primary:hover {
  background: #0f5ddb;
}

.btn-default {
  background: #fff;
  color: #333;
  padding: 7px 18px;
  border-radius: 8px;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: .2s;
  margin-left: 10px;
}

.btn-default:hover {
  background: #f5f5f5;
}

/* 现代网格布局 */
.ui-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  grid-gap: 18px;
}

/* 卡片（现代圆角 + 阴影） */
.ui-card {
  background: #fff;
  border-radius: 14px;
  padding: 18px 20px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  transition: all .25s ease;
}

.ui-card:hover {
  box-shadow: 0 6px 22px rgba(0,0,0,0.12);
}

/* 卡片标题 */
.panel-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #222;
}

/* 卡片内容 */
.panel-content {
  font-size: 14px;
  color: #555;
  line-height: 1.6;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .ui-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .ui-card {
    padding: 16px;
  }
}
</style>
