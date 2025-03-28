<template>
  <div
    class="virtual-scroll-list"
    ref="listRef"
    @scroll="onScroll"
    :style="containerH"
  >
    <div v-if="dataList.length" class="list">
      <div
        :style="`transform: translateY(${translateY}px)`"
        class="itemContainer"
      >
        <div
          v-for="(item, index) in displayData"
          :key="index"
          class="item"
          :class="{
            active: item.uuid === selectedId,
            'is-click': itemCanClick,
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
              @click="onSelect(item, index)"
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
              @click="onDetail(item, index)"
              >详情</span
            >
          </div>
        </div>
      </div>
    </div>
    <div v-if="dataList.length === 0" class="no-data">暂无数据</div>
  </div>
</template>

<script>
export default {
  name: "VirtualList",
  props: {
    dataList: {
      type: Array,
      required: true,
    },
    defaultSelectedKey: {
      type: String,
      required: true,
    }, //默认选中某项，值为item的唯一标识，比如id
    itemHeight: {
      type: Number,
      default: 60, // 每项高度
    },
    containerHeight: {
      type: Number,
      default: 300, // 容器高度
    },
    itemCanClick: {
      type: Boolean,
      default: false, // 是否启用item点击事件
    },
  },
  data() {
    return {
      scrollTop: 0,
      selectedId: null,
    };
  },
  computed: {
    listHeight() {
      return this.dataList.length * this.itemHeight;
    },
    containerH({ containerHeight }) {
      return {
        "--height": `${containerHeight}px`,
      };
    },
    itemCount() {
      return Math.ceil(this.containerHeight / this.itemHeight) + 1;
    },
    start() {
      return Math.floor(this.scrollTop / this.itemHeight);
    },
    end() {
      return this.start + this.itemCount;
    },
    displayData() {
      return this.dataList.slice(this.start, this.end);
    },
    translateY() {
      return this.start * this.itemHeight;
    },
  },
  mounted() {
    this.selectedId = this.defaultSelectedKey;
  },
  methods: {
    onScroll() {
      this.scrollTop = this.$refs.listRef.scrollTop;
    },
    onSelect(item, index) {
      console.log("onSelect ...", item, index);
      this.selectedId = item.uuid;
      this.$emit("on-select", item);
    },
    onDetail(item, index) {
      console.log("onDetail ...", item, index);
      // this.selectedId = item.uuid;
      this.$emit("on-detail", item);
    },
    onItemClick(item, index) {
      console.log("onItemClick ...", item, index);
      if (!this.itemCanClick) return;
      this.onSelect(item, index);
    },
    // 筛选之后，使用的span包裹，显示title时，去掉span标签
    removeSpanTags(inputString) {
      // 正则匹配 <span> 标签及其内容
      return inputString.replace(/<span[^>]*>(.*?)<\/span>/g, "$1");
    },
  },
  watch: {
    defaultSelectedKey(newV, oldV) {
      console.log("defaultSelectedKey watch ...", newV, oldV);
      if (newV === oldV) return;
      this.selectedId = newV;
    },
  },
};
</script>

<style scoped>
.virtual-scroll-list {
  position: relative;
  overflow-y: auto;
  height: var(--height);
  /* border: 1px solid #ddd; */
  max-height: var(--height); /* 确保内容不超过父容器的高度 */
  width: 100%; /* 或者根据需要设置 */
}

/* 列表项样式 */
.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* border: 1px solid #4c84ff; */
  border: 1px solid #d8e3ff;
  padding: 10px;
  background: #f7f9ff;
  margin-bottom: 10px;
}

.item.active {
  border: 1px solid #4c84ff;
}

.item__top,
.item__down {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 0 8px; */
}
.item__top span,
.item__down span {
  cursor: default;
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
  opacity: 0.7; /* 透明度调整 */
}

/* 省略号文本 */
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 美化滚动条 */
/* .virtual-scroll-list::-webkit-scrollbar {
  width: 6px;
}
.virtual-scroll-list::-webkit-scrollbar-thumb {
  background-color: #888;
  border-radius: 10px;
}
.virtual-scroll-list::-webkit-scrollbar-track {
  background-color: #f1f1f1;
} */

/* 针对 Webkit 浏览器（Chrome/Safari） */
.virtual-scroll-list::-webkit-scrollbar {
  width: 8px; /* 设置滚动条宽度 */
}

.virtual-scroll-list::-webkit-scrollbar-thumb {
  background-color: #888; /* 滚动条的颜色 */

  border-radius: 10px; /* 滚动条圆角 */
  border: 2px solid #fff; /* 滚动条与轨道的分隔 */
}

.virtual-scroll-list::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* 悬浮时的颜色 */
}

.virtual-scroll-list::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* 滚动条轨道背景色 */
  border-radius: 10px; /* 滚动条轨道圆角 */
}

.virtual-scroll-list::-webkit-scrollbar-track:hover {
  background-color: #e0e0e0; /* 悬浮时的轨道颜色 */
}

.virtual-scroll-list::-webkit-scrollbar-button {
  display: none; /* 隐藏箭头按钮 */
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
</style>
