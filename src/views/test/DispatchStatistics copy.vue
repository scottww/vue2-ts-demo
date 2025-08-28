<template>
  <div class="dispatch-statistics-container">
    <!-- 标题部分 -->
    <div class="title-container">
      <h2 class="title">调度统计</h2>
    </div>

    <!-- 统计数据网格布局 -->
    <div class="statistics-grid">
      <div v-for="(item, index) in statisticsData" :key="index" class="statistic-item">
        <div class="value-container">
          <div class="value">
            {{ item.value }}
          </div>
        </div>
        <div class="label">{{ item.label }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DispatchStatistics',
  props: {
    // 允许传入自定义统计数据
    customData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // 默认统计数据
      defaultData: [
        { value: '85', label: '今日调度' },
        { value: '24', label: '待处理' },
        { value: '168', label: '本周累计' },
        { value: '56', label: '异常情况' },
      ],
    }
  },
  computed: {
    // 优先使用自定义数据，没有则使用默认数据
    statisticsData() {
      return this.customData.length > 0 ? this.customData : this.defaultData
    },
  },
  methods: {
    // 可以添加点击事件处理等方法
    handleItemClick(item) {
      // 触发事件供父组件使用
      this.$emit('item-click', item)
    },
  },
}
</script>

<style scoped>
/* 容器样式 */
.dispatch-statistics-container {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #0a2463 0%, #0f3460 50%, #16213e 100%);
  border-radius: 8px;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
}

/* 背景纹理效果 */
.dispatch-statistics-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(rgba(30, 64, 175, 0.15) 1px, transparent 1px),
    radial-gradient(rgba(30, 64, 175, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  background-position: 0 0, 25px 25px;
  z-index: 1;
  pointer-events: none;
}

/* 标题样式 */
.title-container {
  position: relative;
  z-index: 2;
  margin-bottom: 30px;
}

.title {
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-align: left;
  margin: 0;
  padding-left: 10px;
  border-left: 4px solid #3b82f6;
}

/* 网格布局 */
.statistics-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  height: calc(100% - 80px);
}

/* 统计项样式 */
.statistic-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.5);
  border-radius: 8px;
  padding: 15px;
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid rgba(59, 130, 246, 0.3);
}

.statistic-item:hover {
  background: rgba(30, 64, 175, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* 数值容器 - 菱形背景 */
.value-container {
  position: relative;
  margin-bottom: 10px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.value-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  transform: rotate(45deg);
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.5);
}

/* 数值样式 */
.value {
  position: relative;
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  z-index: 1;
}

/* 标签样式 */
.label {
  color: white;
  font-size: 14px;
  text-align: center;
  opacity: 0.9;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .statistics-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
    gap: 15px;
  }

  .value-container {
    width: 60px;
    height: 60px;
  }

  .value {
    font-size: 20px;
  }

  .label {
    font-size: 12px;
  }
}
</style>