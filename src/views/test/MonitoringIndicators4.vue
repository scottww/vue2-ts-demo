<template>
  <div class="metric-cards-container">
    <VirtualList
      :data-key="'key'"
      :data-sources="metrics"
      :data-component="MetricItem"
      :keeps="20"
      size="100"
      class="metric-list"
      @metric-click="$emit('metric-click', $event)"
    />
  </div>
</template>

<script>
import VirtualList from 'vue-virtual-scroll-list'

const MetricItem = {
  name: 'MetricItem',
  props: ['source'],
  methods: {
    clickItem() {
      this.$emit('metric-click', this.source)
    },
    formatValue(val, placeholder = '--') {
      return val === null || val === undefined || val === '' ? placeholder : val
    },
  },
  render(h) {
    const d = this.source || {}
    return h(
      'div',
      {
        class: {
          'metric-card': true,
          'metric-card--active': d.active,
        },
        on: { click: this.clickItem },
      },
      [
        h('div', { class: 'metric-card__label' }, d.label),
        h('div', { class: 'metric-card__value' }, [
          h('div', { class: 'metric-card__number' }, this.formatValue(d.value)),
          h('div', { class: 'metric-card__unit' }, d.unit || '个'),
        ]),
        h('div', { class: 'metric-card__glow' }) // 光晕/动态效果
      ]
    )
  },
}

export default {
  name: 'MetricCardList',
  components: { VirtualList },
  props: {
    customMetrics: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    metrics() {
      return this.customMetrics.length
        ? this.customMetrics
        : Array.from({ length: 300 }).map((_, i) => ({
            label: `指标 ${i + 1}`,
            key: `metric-${i}`,
            value: Math.round(Math.random() * 5000),
            unit: '个',
          }))
    },
  },
  data() {
    return { MetricItem }
  },
}
</script>

<style>
.metric-cards-container {
  height: 500px;
  overflow-y: auto;
  padding: 12px;
  background: linear-gradient(to bottom, #0a1f3d, #07172b);
  border-radius: 12px;
}

.metric-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.metric-card {
  height: 100px;
  margin: 16px;
  min-width: 160px;
  background: linear-gradient(145deg, #0f2a55, #193066);
  border-radius: 12px;
  padding: 16px 20px;
  cursor: pointer;
  color: #fff;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  
}
.metric-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(61, 189, 255, 0.5);
}

/* 选中状态 */
.metric-card--active {
  border: 2px solid #3dbdff;
}

/* 指标标签 */
.metric-card__label {
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  color: #cbd8ff;
}

/* 指标值 */
.metric-card__value {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.metric-card__number {
  font-size: 20px;
  font-weight: 700;
  color: #3dbdff;
}

.metric-card__unit {
  font-size: 14px;
  opacity: 0.8;
}

/* 光晕 / 动态背景效果 */
.metric-card__glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(61,189,255,0.1) 0%, transparent 70%);
  pointer-events: none;
  animation: rotate-glow 6s linear infinite;
}

@keyframes rotate-glow {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 响应式 */
@media (max-width: 768px) {
  .metric-card {
    flex: 1 1 100%;
    min-width: auto;
  }
}
</style>
