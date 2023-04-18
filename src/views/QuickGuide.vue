<template>
  <div class="quick-guide">
    <ul>
      <li v-for="item in items" :key="item.id" @click="toPath(item.path)">
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "QuickGuide",
  data() {
    return {
      items: [
        // { id: 0, text: "快速向导", path: "/guide" },
        { id: 1, text: "虚拟列表", path: "/virtualList" },
        { id: 2, text: "读取文件", path: "/loadReadFile" },
        { id: 3, text: "表格", path: "/table" },
        { id: 4, text: "组件", path: "/components" }
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

<style lang="scss" scoped>
.quick-guide {
  padding: 20px;
  width: 1200px;
  ul {
    display: flex;
    // width: 300px;
    li {
      flex: 1;
      text-align: center;
      line-height: 120px;
      width: 120px;
      height: 120px;
    }
  }
  ul li {
    list-style: none;
    background: #6bc3e6;
    border-right: 1px solid #fff;
    color: #fff;
  }
  body,
  p {
    margin: 0;
  }
}
</style>
