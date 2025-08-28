<template>
  <div class="sidebar-container" :class="{ isHide: !isOpen2 }">
    <div class="sidebar-toggle" @click="toggleSidebar">
      <!-- <i class="fas fa-bars"></i> -->
      <i>{{ toggleText }}</i>
    </div>
    <div class="sidebar-content" v-if="isOpen2">
      <HCategorys :data="items" />
    </div>
  </div>
</template>

<script>
import { HCategorys } from "@/components/h-ui";
export default {
  name: "Sidebar",
  components: {
    HCategorys
  },
  data() {
    return {
      isOpen2: true,
      items: [
        {
          name: "功能总览",
          children: [{ id: -1, text: "NavPage 功能总览", path: "/navPage" }]
        },
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
            // { id: 24, text: "2D map 二维地图", path: "/map" },
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

            {
              id: 14,
              text: "FlexAnimationCycle 动画循环",
              path: "/flexAnimationCycle"
            },
            { id: 15, text: "Title 标题", path: "/title" },
            { id: 16, text: "Avatar 头像", path: "/avatar" },
            { id: 17, text: "Form 表单", path: "/form" },
            { id: 27, text: "DynamicForm 动态表单", path: "/dynamicForm" },
            { id: 20, text: "HeaderSection 头部", path: "/headerSection" },
            { id: 21, text: "CustomTabs 自定义标签", path: "/customTabs" },
            { id: 32, text: "SvgIcon 图标", path: "/svgIcon" },
            { id: 33, text: "Cityselector 城市选择卡", path: "/cityselector" },

            // 功能类
            { id: 7, text: "LoadReadFile 读取文件", path: "/loadReadFile" },
            // { id: 19, text: "MapToolbar 地图工具栏", path: "/mapToolbar" },
            { id: 3, text: "ClassComponents 类组件", path: "/classComponents" },
            { id: 5, text: "Decorator 装饰器", path: "/decorator" },
            { id: 27, text: "ChatItem 聊天选项", path: "/chatItem" },
            {
              id: 28,
              text: "CustomCalendar 自定义日历",
              path: "/customCalendar"
            },
            { id: 29, text: "PdfPreview 预览PDF", path: "/pdfPreview" },
            {
              id: 30,
              text: "CustomNumberInput 自定义数字输入框",
              path: "/customNumberInput"
            },
            { id: 31, text: "TxtRender 文本渲染", path: "/txtRender" },
            {
              id: 36,
              text: "MultiSelectDropdown 多选下拉框",
              path: "/multiSelectDropdown"
            }
          ]
        },
        {
          name: "Ant Design 自定义",
          children: [
            { id: 37, text: "aTag 自定义", path: "/aTag" },
            { id: 38, text: "aSpin 自定义", path: "/customSpin" }
          ]
        },
        {
          name: "UI",
          children: [
            { id: 10, text: "Carousel 走马灯", path: "/carousel" },
            { id: 25, text: "CarouselCard 轮播卡", path: "/carouselCard" },
            {
              id: 12,
              text: "BackgroundClip 裁剪背景",
              path: "/backgroundClip"
            },
            { id: 13, text: "Radio 单选框", path: "/radio" },
            { id: 26, text: "Table 样式", path: "/tableStyle" },
            {
              id: 39,
              text: "bigScreenLayout 大屏适配",
              path: "/bigScreenLayout"
            }
          ]
        },
        {
          name: "Tool 工具",
          children: [{ id: 23, text: "URL 编码/解码", path: "/urlTransform" }]
        },
        {
          name: "Others",
          children: [{ id: 8, text: "Widge 常用网站", path: "/widge" }]
        }
        // { id: 0, text: "快速向导", path: "/guide" },
        // { id: 1, text: "图表", path: "/chart" },
        // { id: 2, text: "组件", path: "/components" },
        // { id: 3, text: "类组件", path: "/classComponents" },
        // { id: 4, text: "虚拟列表", path: "/virtualList" },
        // { id: 5, text: "装饰器", path: "/decorator" },
        // { id: 6, text: "表格", path: "/table" },
        // { id: 7, text: "读取文件", path: "/loadReadFile" },
        // { id: 8, text: "常用网站", path: "/widge" },
        // { id: 9, text: "指示器", path: "/indicators" },
        // { id: 10, text: "走马灯", path: "/carousel" },
        // { id: 11, text: "分类菜单", path: "/categorys" },
        // { id: 12, text: "BackgroundClip", path: "/backgroundClip" },
        // { id: 13, text: "Radio", path: "/radio" },
        // { id: 14, text: "FlexAnimationCycle", path: "/flexAnimationCycle" },
        // { id: 15, text: "Title", path: "/title" },
        // { id: 16, text: "Avatar", path: "/avatar" },
        // { id: 17, text: "Form", path: "/form" },
        // { id: 18, text: "3D map 三维可视化", path: "/cesium" },
        // { id: 19, text: "地图工具栏", path: "/mapToolbar" },
        // { id: 20, text: "HeaderSection", path: "/headerSection" },
        // { id: 21, text: "customTabs", path: "/customTabs" },
        // { id: 22, text: "Skeleton 骨架屏", path: "/skeleton" },
        // { id: 23, text: "URL 编码/解码", path: "/urlTransform" },
        // { id: 24, text: "2D map 二维地图", path: "/map" },
        // { id: 25, text: "CarouselCard 轮播卡", path: "/carouselCard" },
        // { id: 26, text: "Table 样式", path: "/tableStyle" }
        // { id: 27, text: "ChatItem 聊天选项", path: "/chatItem" },
        // { id: 28, text: "CustomCalendar 自定义日历", path: "/customCalendar" },
        // { id: 29, text: "PdfPreview 预览PDF", path: "/pdfPreview" },customNumberInput
        // { id: 30, text: "CustomNumberInput 自定义数字输入框", path: "/customNumberInput" },
        // { id: 31, text: "TxtRender 文本渲染", path: "/txtRender" },
        // { id: 32, text: "SvgIcon 图标", path: "/SvgIcon" },
        // { id: 33, text: "Cityselector 城市选择卡", path: "/cityselector" },
        // { id: 34, text: "Map2 测试2", path: "/Map2" },
        // { id: 35, text: "Map3 测试3", path: "/Map3" },
        // { id: 36, text: "MultiSelectDropdown 多选下拉框", path: "/multiSelectDropdown" },
        // { id: 37, text: "aTag 自定义", path: "/aTag" },
        // { id: 38, text: "aSpin 自定义", path: "/customSpin"
        // { id: 39, text: "bigScreenLayout 大屏适配", path: "/bigScreenLayout"
      ]
    };
  },
  computed: {
    toggleText({ isOpen2 }) {
      return isOpen2 ? "<" : ">";
    }
  },
  methods: {
    toggleSidebar() {
      this.isOpen2 = !this.isOpen2;
      this.$emit("on-change", this.isOpen2);
    },
    toPath(path) {
      console.log("togo", path);
      this.$router.push(path);
    }
  }
};
</script>

<style lang="scss" scoped>
.sidebar-container {
  /* text-align: center; */
  position: relative;
  /* width: 200px; */
  /* width: 100%; */
  height: 100%;
  left: 0;
  background-color: #fff;
  /* background-color: #7ac4e1; */
  transition: left 0.3s ease;

  overflow: auto;
  /* padding-bottom: 100px; */
  padding: 10px 20px 100px 20px;
}

.sidebar-toggle {
  /* position: absolute;
  top: 50%;
  right: -32px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; */

  position: absolute;
  top: 45%;
  right: -7px;
  width: 16px;
  height: 60px;
  border: 1px solid #ccc;
  border-left: none;
  line-height: 60px;
  background-color: #fff;
  opacity: 0.6;
  z-index: 1000;
  cursor: pointer;
  transition: all 1s;

  display: none; /* 暂时隐藏 */
}

.sidebar-container.isHide {
  left: -240px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  padding: 10px;
  /* border-bottom: 1px solid #e5e6eb; */
}
li:hover {
  cursor: pointer;
  /* background-color: #d5d5d5; */
  background-color: #7ac4e1;
  color: #fff;
}

li:last-child {
  /* border-bottom: none; */
}

.switchBtn {
  position: absolute;
  top: 45%;
  right: -17px;
  width: 16px;
  height: 60px;
  border: 1px solid #ccc;
  border-left: none;
  line-height: 60px;
  background: #fff;
  opacity: 0.6;
  z-index: 1000;
  cursor: pointer;
  transition: all 1s;
}
</style>
