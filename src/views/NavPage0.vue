<template>
  <div class="nav-page">
    <h1>功能导航</h1>
    <div class="module-list">
      <div
        class="module"
        v-for="(module, mIndex) in items"
        :key="mIndex"
      >
        <h2>{{ module.name }}</h2>
        <div class="cards">
          <div
            class="card"
            v-for="child in module.children"
            :key="child.id"
            @click="toPath(child.path)"
          >
            {{ child.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavPage",
  data() {
    return {
      items: [
        {
          name: "引导类",
          children: [{ id: 0, text: "Guide 快速向导", path: "/guide" }]
        },
        {
          name: "数据可视化与图表",
          children: [
            { id: 1, text: "Chart 图表", path: "/chart" },
            { id: 6, text: "Table 表格", path: "/table" },
            { id: 22, text: "Skeleton 骨架屏", path: "/skeleton" },
            { id: 9, text: "Indicators 指示器", path: "/indicators" },
            { id: 18, text: "3D map 三维可视化", path: "/cesium" }
          ]
        },
        {
          name: "GIS 地图",
          children: [
            { id: 24, text: "2D map 二维地图", path: "/map" },
            { id: 19, text: "Toolbar 地图工具栏", path: "/mapToolbar" },
            { id: 34, text: "Map2 测试2", path: "/Map2" },
            { id: 35, text: "Map3 测试3", path: "/Map3" },
            { id: 18, text: "3D map 三维地图", path: "/cesium" }
          ]
        },
        {
          name: "组件",
          children: [
            { id: 2, text: "Tabs 组件", path: "/components" },
            { id: 11, text: "Categorys 分类菜单", path: "/categorys" },
            { id: 4, text: "VirtualList 虚拟列表", path: "/virtualList" },
            { id: 5, text: "Decorator 装饰器", path: "/decorator" },
            { id: 14, text: "FlexAnimationCycle 动画循环", path: "/flexAnimationCycle" },
            { id: 15, text: "Title 标题", path: "/title" },
            { id: 16, text: "Avatar 头像", path: "/avatar" },
            { id: 17, text: "Form 表单", path: "/form" },
            { id: 27, text: "DynamicForm 动态表单", path: "/dynamicForm" },
            { id: 20, text: "HeaderSection 头部", path: "/headerSection" },
            { id: 21, text: "CustomTabs 自定义标签", path: "/customTabs" },
            { id: 32, text: "SvgIcon 图标", path: "/svgIcon" },
            { id: 33, text: "Cityselector 城市选择卡", path: "/cityselector" }
          ]
        },
        // 其他模块同理...
      ]
    };
  },
  methods: {
    toPath(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped>
.nav-page {
  padding: 40px;
  background: #f5f7fa;
  min-height: 100vh;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 36px;
  color: #333;
}

.module-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.module {
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  width: 320px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.module:hover {
  transform: translateY(-5px);
}

.module h2 {
  margin-bottom: 15px;
  font-size: 20px;
  color: #1890ff;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.card {
  flex: 1 1 100%;
  background: #f0f5ff;
  padding: 10px 15px;
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.card:hover {
  background: #1890ff;
  color: #fff;
  transform: translateY(-3px);
}
</style>
