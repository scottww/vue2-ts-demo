<template>
  <div class="monitoring-indicators-container">
    <div 
      v-for="(indicator, index) in indicators"
      :key="index"
      class="indicator-item"
      @click="handleIndicatorClick(indicator)"
    >
      <div class="indicator-label">{{ indicator.label }}</div>
      <div class="indicator-icon">
        <div class="dashes">
          <span class="dash"></span>
          <span class="dash"></span>
        </div>
        <i class="arrow-up"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MonitoringIndicators',
  props: {
    // 允许外部传入自定义指标数据
    customIndicators: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 默认指标数据
      defaultIndicators: [
        { label: '水平位移', key: 'displacement' },
        { label: '沉降', key: 'settlement' },
        { label: '渗压', key: 'seepage' }
      ]
    };
  },
  computed: {
    // 如果有自定义指标数据则使用自定义数据，否则使用默认数据
    indicators() {
      return this.customIndicators.length > 0 ? this.customIndicators : this.defaultIndicators;
    }
  },
  methods: {
    // 处理指标点击事件
    handleIndicatorClick(indicator) {
      // 触发点击事件，传递指标信息
      this.$emit('indicator-click', indicator);
    }
  }
};
</script>

<style scoped>
.monitoring-indicators-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0f4c81 0%, #1a73e8 100%);
  border-radius: 8px;
  padding: 15px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: relative;
}

/* 波浪背景效果 */
.monitoring-indicators-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent),
    linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .05) 25%, rgba(255, 255, 255, .05) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .05) 75%, rgba(255, 255, 255, .05) 76%, transparent 77%, transparent);
  background-size: 50px 50px;
  opacity: 0.1;
  pointer-events: none;
  z-index: 1;
}

.indicator-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  cursor: pointer;
  padding: 10px 30px;
  transition: all 0.3s ease;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

/* 最后一个指标项移除右边框 */
.indicator-item:last-child {
  border-right: none;
}

.indicator-item:hover {
  transform: translateY(-2px);
}

.indicator-label {
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
  text-align: center;
}

.indicator-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.dashes {
  display: flex;
  gap: 4px;
  align-items: center;
}

.dash {
  display: inline-block;
  width: 12px;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 1px;
}

.arrow-up {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 10px solid #fff;
  transform: translateY(-2px);
}

/* 添加选中效果 */
.indicator-item.active {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .monitoring-indicators-container {
    flex-direction: column;
    padding: 10px;
  }
  
  .indicator-item {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding: 8px 20px;
    width: 100%;
  }
  
  .indicator-item:last-child {
    border-bottom: none;
  }
  
  .indicator-label {
    font-size: 14px;
  }
}
</style>