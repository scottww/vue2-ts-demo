<template>
  <div class="big-screen">
    <!-- 背景 UE -->
    <iframe class="ue-frame" src="https://your-ue-url.com" frameborder="0"></iframe>

    <!-- 顶部标题导航 -->
    <div class="header-bar">
      <div class="header-title">xxx驾驶舱</div>
      <div class="header-nav">
        <button
          v-for="(page, idx) in pages"
          :key="page.name + idx"
          :class="{ active: currentPage === idx }"
          @click="currentPage = idx"
        >
          {{ page.name }}
        </button>
      </div>
    </div>

    <!-- 左面板动态模块 -->
    <div class="left-panel">
      <component
        v-for="(mod, index) in pages[currentPage].leftPanel"
        :key="mod.type + index"
        :is="getComponent(mod.type)"
        :title="mod.title"
        class="panel"
      />
    </div>

    <!-- 右面板动态模块 -->
    <div class="right-panel">
      <component
        v-for="(mod, index) in pages[currentPage].rightPanel"
        :key="mod.type + index"
        :is="getComponent(mod.type)"
        :title="mod.title"
        class="panel"
      />
    </div>
  </div>
</template>

<script>
// 示例组件引入
import PanelA from './components/PanelA.vue'
import PanelB from './components/PanelB.vue'
import PanelC from './components/PanelC.vue'
import DefaultPanel from './components/common/PlaceholderBlock.vue'

export default {
  name: 'BigScreenLayout',
  data() {
    return {
      currentPage: 0,
      pages: [
        {
          name: '首页',
          leftPanel: [
            { type: 'a', title: '工情概况' },
            { type: 'b', title: '水情信息' },
            { type: 'c', title: '天气预报' }
          ],
          rightPanel: [
            { type: 'a', title: '闸门统计' },
            { type: 'b', title: '水质预警' },
            { type: 'c', title: '防汛预警' },
          ]
        },
        {
          name: '工程管理',
          leftPanel: [
            { type: 'a', title: '项目总览' },
            { type: 'b', title: '施工进度' }
          ],
          rightPanel: [
            { type: 'c', title: '质量检测' },
            { type: 'a', title: '监理日志' }
          ]
        },
        {
          name: '监测管理',
          leftPanel: [
            { type: 'b', title: '监测点状态' },
            { type: 'c', title: '传感器实时数据' }
          ],
          rightPanel: [
            { type: 'a', title: '报警记录' },
            { type: 'b', title: '视频监控' }
          ]
        },
        {
          name: '防汛预案',
          leftPanel: [
            { type: 'a', title: '预案总览' } 
          ],
          rightPanel: [
            { type: 'b', title: '演练计划' },
            { type: 'c', title: '物资储备' }
          ]
        },
        {
          name: '数据分析',
          leftPanel: [
            { type: 'c', title: '统计图表' },
            { type: 'a', title: '趋势预测' }
          ],
          rightPanel: [
            { type: 'b', title: '报表生成' }]
        }
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
      return map[type] || 'DefaultPanel'
    }
  },
  components: {
    PanelA,
    PanelB,
    PanelC,
    DefaultPanel
  }
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

.ue-frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 5940px;
  height: 1080px;
  z-index: 0;
  border: none;
}

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
  transition: background 0.3s;
}

.header-nav button.active,
.header-nav button:hover {
  background: #0077aa;
}

.left-panel,
.right-panel {
  position: absolute;
  top: 150px;
  width: 800px;
  height: calc(100% - 200px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;
}

.left-panel {
  left: 50px;
}

.right-panel {
  right: 50px;
}

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
