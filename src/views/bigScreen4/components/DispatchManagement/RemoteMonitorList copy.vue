<template>
  <div class="remote-control-list">
    <div 
      v-for="pump in pumps" 
      :key="pump.id" 
      class="pump-item"
    >
      <!-- 左侧图片区域 -->
      <div class="left-image-section">
        <div class="pump-icon-container">
          <img 
            :src="pump.iconPath" 
            alt="泵图标"
            class="pump-icon"
          >
          <div class="pump-number">{{ pump.id }}#泵</div>
        </div>
      </div>
      
      <!-- 中间信息区域 -->
      <div class="middle-info-section">
        <div class="info-row">
          <span class="info-label">电流:</span>
          <span class="info-value">{{ pump.current }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">电压:</span>
          <span class="info-value">{{ pump.voltage }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">状态:</span>
          <span class="info-value">{{ pump.status }}</span>
        </div>
      </div>
      
      <!-- 右侧按钮区域 -->
      <div class="right-button-section">
        <button 
          class="control-button"
          @click="handleControlClick(pump.id)"
        >
          {{ pump.buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RemoteControlList',
  props: {
    // 允许从父组件传入泵的数据
    pumpData: {
      type: Array,
      default: () => []
    },
    // 自定义图标路径
    iconPaths: {
      type: Object,
      default: () => ({
        default: './assets/pump-icon.png'
      })
    }
  },
  data() {
    return {
      // 默认泵数据
      defaultPumps: [
        { id: 5, current: '--A', voltage: '--V', status: '停机', buttonText: '开启', iconPath: './assets/pump-icon.png' },
        { id: 6, current: '--A', voltage: '--V', status: '停机', buttonText: '开启', iconPath: './assets/pump-icon.png' },
        { id: 7, current: '--A', voltage: '--V', status: '停机', buttonText: '开启', iconPath: './assets/pump-icon.png' },
        { id: 8, current: '--A', voltage: '--V', status: '停机', buttonText: '开启', iconPath: './assets/pump-icon.png' },
        { id: 9, current: '--A', voltage: '--V', status: '停机', buttonText: '开启', iconPath: './assets/pump-icon.png' },
        { id: 10, current: '--A', voltage: '--V', status: '停机', buttonText: '开启', iconPath: './assets/pump-icon.png' }
      ]
    }
  },
  computed: {
    // 合并默认数据和传入的数据
    pumps() {
      if (this.pumpData && this.pumpData.length > 0) {
        return this.pumpData.map(pump => ({
          ...pump,
          iconPath: pump.iconPath || this.iconPaths.default || './assets/pump-icon.png'
        }));
      }
      // 如果没有传入数据，使用默认数据并应用自定义图标路径
      return this.defaultPumps.map(pump => ({
        ...pump,
        iconPath: this.iconPaths.default || pump.iconPath
      }));
    }
  },
  methods: {
    // 处理控制按钮点击事件
    handleControlClick(pumpId) {
      // 触发自定义事件，通知父组件
      this.$emit('control-click', pumpId);
      // 在实际应用中，这里可以添加调用API的逻辑
      console.log(`控制${pumpId}#泵: ${this.pumps.find(p => p.id === pumpId)?.buttonText}`);
    }
  }
}
</script>

<style scoped>
/* 主容器样式 */
.remote-control-list {
  background: linear-gradient(135deg, #0a1929, #112d4e);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

/* 单个泵项样式 */
.pump-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  margin-bottom: 15px;
  background: rgba(17, 45, 78, 0.6);
  border-radius: 6px;
  border: 1px solid rgba(100, 149, 237, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.pump-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(100, 149, 237, 0.2);
}

/* 左侧图片区域 */
.left-image-section {
  flex: 0 0 auto;
}

.pump-icon-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pump-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: radial-gradient(circle, #4a90e2, #112d4e);
  padding: 10px;
  box-shadow: 0 0 20px rgba(74, 144, 226, 0.6);
}

.pump-number {
  margin-top: 8px;
  color: #6495ED;
  font-weight: bold;
  font-size: 14px;
  text-shadow: 0 0 10px rgba(100, 149, 237, 0.7);
}

/* 中间信息区域 */
.middle-info-section {
  flex: 1;
  margin: 0 30px;
  min-width: 200px;
}

.info-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  padding: 4px 0;
  border-bottom: 1px dashed rgba(100, 149, 237, 0.2);
}

.info-row:last-child {
  margin-bottom: 0;
  border-bottom: none;
}

.info-label {
  color: #6495ED;
  width: 60px;
  font-size: 13px;
}

.info-value {
  color: #fff;
  font-size: 13px;
  font-family: 'Courier New', monospace;
}

/* 右侧按钮区域 */
.right-button-section {
  flex: 0 0 auto;
}

.control-button {
  background: linear-gradient(45deg, #4a90e2, #6495ED);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(74, 144, 226, 0.4);
}

.control-button:hover {
  background: linear-gradient(45deg, #357abd, #4a90e2);
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(74, 144, 226, 0.6);
}

.control-button:active {
  transform: translateY(0);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .pump-item {
    flex-direction: column;
    text-align: center;
  }
  
  .middle-info-section {
    margin: 15px 0;
  }
  
  .info-row {
    justify-content: center;
  }
}
</style>