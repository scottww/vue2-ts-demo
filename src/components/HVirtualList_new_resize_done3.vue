<!-- HVirtualList_new_resize_done2的加强版，引入了节流滚动，避免频繁 slice，GUP加速，提前优化 layout，预加载更多数据，减少闪现 -->
<template>
  <div class="virtual-scroll__container" ref="containerRef">
    <div
      class="virtual-scroll-list"
      ref="listRef"
      @scroll="onScroll"
      :style="containerStyle"
    >
      <div
        :style="`transform: translateY(${translateY}px)`"
        class="itemContainer"
      >
        <div
          v-for="(item, index) in displayData"
          :key="item.uuid"
          class="item"
          :class="{
            active: item.uuid === selectedId,
            'is-click': itemCanClick
          }"
          :style="{ height: `${itemHeight}px` }"
          @click="onItemClick(item, index)"
        >
          <div class="item__top">
            <span
              class="item-name ellipsis"
              :title="removeSpanTags(item.name)"
              v-html="item.name"
            ></span>
            <span
              class="item-btn"
              v-if="!itemCanClick && item.uuid"
              @click.stop="onSelect(item, index)"
              >选择</span
            >
          </div>
          <div class="item__down">
            <span class="item-time ellipsis" :title="item.time"
              >发布时间：{{ item.time }}</span
            >
            <span
              class="item-btn"
              v-if="!itemCanClick"
              @click.stop="onDetail(item, index)"
              >详情</span
            >
          </div>
        </div>
        <div
          v-if="showNextPage"
          class="load-next-page"
          @click="onNextPageClick"
        >
          下一页
        </div>
      </div>
    </div>
    <div v-if="list.length === 0" class="no-data">暂无数据</div>
  </div>
</template>

<script>
const BUFFER_COUNT = 10; // 缓冲条数
export default {
  name: "HVirtualListNew",
  props: {
    dataList: {
      type: Array,
      required: true
    },
    defaultSelectedKey: {
      type: String,
      required: true
    },
    itemHeight: {
      type: Number,
      default: 60
    },
    itemCanClick: {
      type: Boolean,
      default: false
    },
    containerHeight: {
      type: Number,
      required: false // 可选传入
    }
  },
  data() {
    return {
      scrollTop: 0,
      ticking: false, // 新增
      selectedId: null,
      list: [],
      internalHeight: 350,
      resizeObserver: null,
      // 加入缓存逻辑
      lastStart: 0,
      lastEnd: 0,
      cachedData: []
    };
  },
  computed: {
    effectiveHeight() {
      return this.containerHeight || this.internalHeight;
    },
    containerStyle() {
      return {
        height: this.effectiveHeight + "px",
        maxHeight: this.effectiveHeight + "px"
      };
    },
    itemCount() {
      // return Math.ceil(this.effectiveHeight / this.itemHeight) + 2; //改为+2让滚动更丝滑
      return Math.ceil(this.effectiveHeight / this.itemHeight) + BUFFER_COUNT;
    },
    start() {
      return Math.floor(this.scrollTop / this.itemHeight);
    },
    end() {
      return this.start + this.itemCount;
    },
    displayData() {
      // return this.list.slice(this.start, this.end);
      // 加入缓存逻辑
      if (this.start !== this.lastStart || this.end !== this.lastEnd) {
        this.cachedData = this.list.slice(this.start, this.end);
        this.lastStart = this.start;
        this.lastEnd = this.end;
      }
      return this.cachedData;
    },
    translateY() {
      return this.start * this.itemHeight;
    },
    showNextPage() {
      return false && this.list.length > 0;
    }
  },
  mounted() {
    this.selectedId = this.defaultSelectedKey;
    this.list = [...this.dataList];
    if (!this.containerHeight) {
      this.$nextTick(() => {
        const container = this.$refs.containerRef;
        if (container) {
          this.resizeObserver = new ResizeObserver(() => {
            this.internalHeight = container.clientHeight || 350;
            console.log("组件内部高度 ...", this.internalHeight);
          });
          this.resizeObserver.observe(container);
          this.internalHeight = container.clientHeight || 350;
          console.log("初始化高度 ...", this.internalHeight);
        } else {
          console.warn("containerRef 没找到");
        }
      });
    }
  },
  beforeDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  },
  methods: {
    onScroll() {
      // this.scrollTop = this.$refs.listRef.scrollTop;
      // const { scrollTop, scrollHeight, clientHeight } = this.$refs.listRef;
      // if (scrollTop + clientHeight >= scrollHeight - 10) {
      //   console.log("滚动到底部");
      // }
      const listRef = this.$refs.listRef;
      if (!this.ticking) {
        this.ticking = true;
        requestAnimationFrame(() => {
          this.scrollTop = listRef.scrollTop;
          this.ticking = false;
        });
      }
    },
    onSelect(item, index) {
      this.selectedId = item.uuid;
      this.$emit("on-select", item);
    },
    onDetail(item, index) {
      this.$emit("on-detail", item);
    },
    onItemClick(item, index) {
      if (!this.itemCanClick) return;
      this.onSelect(item, index);
    },
    removeSpanTags(str) {
      return str.replace(/<span[^>]*>(.*?)<\/span>/g, "$1");
    },
    onNextPageClick() {
      this.$emit("to-next");
    }
  },
  watch: {
    defaultSelectedKey(newV) {
      this.selectedId = newV;
    },
    dataList(newV) {
      this.list = [...newV];
      this.scrollTop = 0;
      // this.$forceUpdate();
    }
  }
};
</script>

<style lang="scss" scoped>
.virtual-scroll__container {
  position: relative;
  overflow: hidden;
  height: 100%;
}
.virtual-scroll-list {
  position: relative;
  overflow-y: auto;
  width: 100%;
}

.itemContainer {
  height: 100%;
  transform: translateZ(0);
  will-change: transform;
}
.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #d8e3ff;
  padding: 10px;
  background: #f7f9ff;
  margin-bottom: 10px;
}
.item.active {
  border-color: #4c84ff;
}
.item__top,
.item__down {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item .item-name {
  flex: 7;
  width: 200px;
  color: #666;
  font-size: 16px;
  padding-right: 5px;
}
.item .item-time {
  flex: 7;
  width: 200px;
  color: #666;
  font-size: 14px;
}
.item .item-btn {
  color: #4c84ff;
  font-size: 14px;
  cursor: pointer;
  opacity: 1;
  transition: color 0.3s ease, opacity 0.3s ease;
}
.item .item-btn:hover {
  opacity: 0.7;
}
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.virtual-scroll-list::-webkit-scrollbar {
  width: 8px;
}
.virtual-scroll-list::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
  border: 2px solid #fff;
}
.virtual-scroll-list::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
.virtual-scroll-list::-webkit-scrollbar-track {
  background-color: #f1f1f1;
  border-radius: 10px;
}
.virtual-scroll-list::-webkit-scrollbar-track:hover {
  background-color: #e0e0e0;
}
.virtual-scroll-list::-webkit-scrollbar-button {
  display: none;
}
.no-data {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
}
.is-click {
  cursor: pointer;
}
.is-click > .item__top span,
.item__down span {
  cursor: pointer;
}
.load-next-page {
  text-align: center;
  padding: 10px;
  cursor: pointer;
  color: #4c84ff;
  font-size: 14px;
  border-top: 1px solid #ddd;
  background: #f7f9ff;
}
.load-next-page:hover {
  opacity: 0.7;
}
</style>
