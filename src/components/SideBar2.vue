<template>
  <div class="sidebar-container" :class="{ isHide: !isOpen2 }">
    <div class="sidebar-toggle" @click="toggleSidebar">
      <!-- <i class="fas fa-bars"></i> -->
      <i>{{ toggleText }}</i>
    </div>
    <div class="sidebar-content" v-if="isOpen2">
      <ul>
        <li v-for="item in items" :key="item.id" @click="toPath(item.path)">
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      isOpen2: true,
      items: [
        { id: 0, text: "快速向导", path: "/guide" },
        { id: 1, text: "图表", path: "/chart" },
        { id: 2, text: "组件", path: "/components" },
        { id: 3, text: "类组件", path: "/classComponents" },
        { id: 4, text: "虚拟列表", path: "/virtualList" },
        { id: 5, text: "装饰器", path: "/decorator" },
        { id: 6, text: "表格", path: "/table" },
        { id: 7, text: "读取文件", path: "/loadReadFile" },
        { id: 8, text: "常用网站", path: "/widge" },
        { id: 9, text: "指示器", path: "/indicators" },
        { id: 10, text: "走马灯", path: "/carousel" },
        { id: 11, text: "分类菜单", path: "/categorys" },
        { id: 12, text: "BackgroundClip", path: "/backgroundClip" },
        { id: 13, text: "Radio", path: "/radio" },
        { id: 14, text: "FlexAnimationCycle", path: "/flexAnimationCycle" },
        { id: 15, text: "Title", path: "/title" },
        { id: 16, text: "Avatar", path: "/avatar" },
        { id: 17, text: "Form", path: "/form" },
        { id: 18, text: "三维可视化", path: "/cesium" },
        { id: 19, text: "地图工具栏", path: "/mapToolbar" }
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

<style scoped>
.sidebar-container {
  text-align: center;
  position: relative;
  width: 200px;
  /* width: 100%; */
  height: 100%;
  left: 0;
  background-color: #fff;
  /* background-color: #7ac4e1; */
  transition: left 0.3s ease;
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
  right: -17px;
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
}

.sidebar-container.isHide {
  left: -200px;
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
