<template>
  <div class="dev-wrapper" :style="devWrapperStyle">
    <div class="big-screen" :style="bigScreenStyle">
      <iframe class="ue-frame" src="https://your-ue-url.com" frameborder="0"></iframe>

      <div class="header-bar">
        <div class="header-title">xxx驾驶舱</div>
        <div class="header-nav">
          <button
            v-for="(page, idx) in pages"
            :key="page.name"
            :class="{ active: currentPage === idx }"
            @click="currentPage = idx"
          >{{ page.name }}</button>
        </div>
      </div>

      <component :is="pages[currentPage].component" />
    </div>
  </div>
</template>

<script>
import Page1 from './pages/Page1.vue'
import Page2 from './pages/Page2.vue'
import Page3 from './pages/Page3.vue'
import Page4 from './pages/Page4.vue'
import Page5 from './pages/Page5.vue'

export default {
  data() {
    return {
      currentPage: 0,
      scale: process.env.NODE_ENV === 'development' ? 0.3 : 1,
      pages: [
        { name: '首页', component: 'Page1' },
        { name: '工程管理', component: 'Page2' },
        { name: '监测管理', component: 'Page3' },
        { name: '防汛预案', component: 'Page4' },
        { name: '数据分析', component: 'Page5' }
      ]
    }
  },
  computed: {
    bigScreenStyle() {
      return {
        transform: `scale(${this.scale})`,
        transformOrigin: 'top left',
        width: '5940px',
        height: '1080px'
      }
    },
    devWrapperStyle() {
      return {
        width: '100vw',
        height: '100vh',
        overflow: 'auto',
        background: '#000'
      }
    }
  },
  components: {
    Page1,
    Page2,
    Page3,
    Page4,
    Page5
  }
}
</script>

<style scoped>
.ue-frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 5940px;
  height: 1080px;
  z-index: 0;
}
.header-bar {
  position: absolute;
  top: 20px;
  width: 100%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.header-title {
  font-size: 36px;
  color: #fff;
  margin-bottom: 10px;
}
.header-nav {
  display: flex;
  gap: 20px;
}
.header-nav button {
  padding: 6px 20px;
  font-size: 18px;
  cursor: pointer;
}
.header-nav .active {
  background: #0af;
  color: #fff;
  border-radius: 4px;
}
</style>
