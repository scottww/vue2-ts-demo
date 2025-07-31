<template>
  <div>
    <div class="virtual-scroll-list" ref="listRef" :style="containerH">
      <div class="list" :style="{ height: `${listHeight}px` }">
        <div
          :style="`transform: translateY(${translateY}px)`"
          class="itemContainer"
        >
          <div
            v-for="(i, index) in displayData"
            :key="index"
            class="item"
            :style="{ height: `${itemHeight}px` }"
          >
            {{ i }}
          </div>
        </div>
      </div>
    </div>
    <div class="info">
      <i>当前开始索引： {{ start }}，结束索引： {{ end }}</i>
    </div>
  </div>
</template>
<script>
export default {
  name: "HVirtualList2",
  data() {
    return {
      dataList: [],
      itemHeight: 30, //每行数据所占高度
      containerHeight: 300, //容器高
      scrollTop: 0
    };
  },
  computed: {
    listHeight({ dataList, itemHeight }) {
      return dataList.length * itemHeight;
    },
    containerH({ containerHeight }) {
      return {
        "--height": `${containerHeight}px`
      };
    },
    // +1准备多一个数据，防止滚动留白
    itemCount({ containerHeight, itemHeight }) {
      return Math.ceil(containerHeight / itemHeight) + 1;
    },
    start({ scrollTop, itemHeight }) {
      return Math.floor(scrollTop / itemHeight);
    },
    end({ start, itemCount }) {
      return start + itemCount;
    },
    displayData({ dataList, start, end }) {
      return dataList.slice(start, end);
    },
    translateY({ start, itemHeight }) {
      return start * itemHeight;
    }
  },
  mounted() {
    this.dataList = Array.from({ length: 500 }, (v, k) => `内容${k}`);
    this.itemHeight = 30;
    const listRef = this.$refs.listRef;
    listRef.addEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll(e) {
      this.scrollTop = e.target.scrollTop;
    }
  },
  beforeDestroy() {
    const listRef = this.$refs.listRef;
    listRef.removeEventListener("scroll", this.onScroll);
  }
};
</script>

<style scoped>
.virtual-scroll-list {
  position: relative;
  inset: 0;
  margin: 0 auto;

  border: 2px solid orange;
  width: 500px;
  overflow-y: auto;
  max-height: var(--height);
}

.item {
  box-sizing: border-box;
  /* background-color: gray; */
  border-bottom: 1px dashed gray;
}
</style>
