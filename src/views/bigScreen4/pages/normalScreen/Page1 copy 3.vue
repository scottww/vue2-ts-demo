<template>
  <div class="page-layout">
    <div class="left-panel">
      <component
        v-for="(mod, idx) in leftPanels"
        :key="'left-' + mod.type + idx"
        :is="getComponent(mod.type)"
        :title="mod.title"
        class="panel"
      />
    </div>
    <div class="right-panel">
      <component
        v-for="(mod, idx) in rightPanels"
        :key="'right-' + mod.type + idx"
        :is="getComponent(mod.type)"
        :title="mod.title"
        class="panel"
      />
    </div>
  </div>
</template>

<script>
import PanelA from '../../components/PanelA.vue'
import PanelB from '../../components/PanelB.vue'
import PanelC from '../../components/PanelC.vue'

export default {
  data() {
    return {
      leftPanels: [
        { type: 'a', title: '天气情况' },
        { type: 'b', title: '摄像监控' },
        { type: 'c', title: '数据统计' }
      ],
      rightPanels: [
        { type: 'a', title: '告警信息' },
        { type: 'b', title: '任务信息' },
        { type: 'c', title: '风险分析' },
        { type: 'a', title: '设备运行' }
      ]
    }
  },
  methods: {
    getComponent(type) {
      const map = {
        a: 'PanelA',
        b: 'PanelB',
        c: 'PanelC'
      }
      return map[type] || 'PanelA'
    }
  },
  components: {
    PanelA,
    PanelB,
    PanelC
  }
}
</script>

<style scoped>
.page-layout {
  position: absolute;
  top: 120px;
  left: 0;
  width: 100%;
  height: calc(100% - 120px);
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  z-index: 2;
}
.left-panel, .right-panel {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 400px;
}
.panel {
  background: rgba(50, 50, 50, 0.8);
  border-radius: 8px;
  padding: 16px;
  color: #fff;
  height: 160px;
}
</style>

