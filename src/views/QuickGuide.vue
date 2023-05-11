<template>
  <div class="quick-guide">
    <ul>
      <li
        v-for="(item, index) in items"
        :key="item.id"
        @click="toPath(item.path)"
        :style="{ '--bgColor': getBgColor(index) }"
      >
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
        { id: 1, text: "骨架屏", path: "/skeleton" },
        { id: 2, text: "虚拟列表", path: "/virtualList" },
        { id: 3, text: "读取文件", path: "/loadReadFile" },
        { id: 4, text: "表格", path: "/table" },
        { id: 5, text: "组件", path: "/components" }
      ],
      // colors: ["#6bc3e6", "#019fde", "#ff8345", "#ff5675", "#f8bd0b"]
      // selectedColor: "",
      // usedColors: [],
      randomColors: []
    };
  },
  mounted() {
    //生成随机颜色数组
    this.generatorColors();
  },
  methods: {
    generatorColors() {
      const colors = ["#6bc3e6", "#019fde", "#ff8345", "#ff5675", "#f8bd0b"];
      const genColors = [];
      for (let i = 0; i < this.items.length; i++) {
        let bgColor = this.getRandomColor(colors);
        genColors.push(bgColor);
      }
      this.randomColors = genColors;
    },
    getBgColor(index) {
      let defaultColor = "#6bc3e6"; //默认色
      if (index > this.randomColors.length) {
        console.log("All colors have been used, use default color!");
        return defaultColor;
      }
      return this.randomColors[index];
    },
    // infinite loop
    // getBgColor() {
    //   const unusedColors = this.colors.filter(
    //     (color) => !this.usedColors.includes(color)
    //   );
    //   if (unusedColors.length === 0) {
    //     this.usedColors = [];
    //     this.selectedColor = "";
    //     console.log("All colors have been used, start over!");
    //     return "#6bc3e6";
    //   }
    //   const randomIndex = Math.floor(Math.random() * unusedColors.length);
    //   const selectedColor = unusedColors[randomIndex];
    //   this.usedColors.push(selectedColor);

    //   return selectedColor;
    // },
    getRandomColor(colors) {
      const colorIndex = Math.floor(Math.random() * colors.length);
      const color = colors[colorIndex];
      colors.splice(colorIndex, 1);
      return color;
    },
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
    background: var(--bgColor); //#6bc3e6;
    border-right: 1px solid #fff;
    color: #fff;
  }
  body,
  p {
    margin: 0;
  }
}
</style>
