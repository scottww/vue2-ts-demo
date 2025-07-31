<template>
  <div class="virtual-scroll__container" ref="containerRef">
    <div
      class="virtual-scroll-list"
      ref="listRef"
      @scroll="onScroll"
      :style="containerStyle"
    >
      <div class="itemContainer">
        <div
          v-for="(item, index) in dataList"
          :key="item.uuid"
          class="item"
          :class="{ active: item.uuid === selectedId, 'is-click': itemCanClick }"
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
          v-if="hasMore && !loadingMore"
          class="load-next-page"
          @click="triggerNextPage"
        >
          加载更多
        </div>
        <div v-else-if="loadingMore" class="loading-more">
          加载中...
        </div>
      </div>
    </div>
    <div v-if="dataList.length === 0" class="no-data">暂无数据</div>
  </div>
</template>

<script>
export default {
  name: "HVirtualListNew",
  props: {
    dataList: {
      type: Array,
      required: true
    },
    defaultSelectedKey: {
      type: String,
      required: false,
      default: null
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
      required: false
    },
    hasMore: {
      type: Boolean,
      default: false
    },
    loadingMore: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedId: this.defaultSelectedKey,
      internalHeight: 350,
      ticking: false,
      resizeObserver: null
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
    }
  },
  mounted() {
    if (!this.containerHeight) {
      this.$nextTick(() => {
        const container = this.$refs.containerRef;
        if (container) {
          this.resizeObserver = new ResizeObserver(() => {
            this.internalHeight = container.clientHeight || 350;
          });
          this.resizeObserver.observe(container);
          this.internalHeight = container.clientHeight || 350;
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
      const listRef = this.$refs.listRef;
      if (!this.ticking) {
        this.ticking = true;
        window.requestAnimationFrame(() => {
          const { scrollTop, scrollHeight, clientHeight } = listRef;
          this.ticking = false;
          if (scrollTop + clientHeight >= scrollHeight - 60) {
            this.triggerNextPage();
          }
        });
      }
    },
    triggerNextPage() {
      if (this.hasMore && !this.loadingMore) {
        this.$emit("to-next");
      }
    },
    onSelect(item) {
      this.selectedId = item.uuid;
      this.$emit("on-select", item);
    },
    onDetail(item) {
      this.$emit("on-detail", item);
    },
    onItemClick(item) {
      if (!this.itemCanClick) return;
      this.onSelect(item);
    },
    removeSpanTags(str) {
      return str.replace(/<span[^>]*>(.*?)<\/span>/g, "$1");
    }
  },
  watch: {
    defaultSelectedKey(newVal) {
      this.selectedId = newVal;
    }
  }
};
</script>

<style scoped lang="scss">
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
.loading-more {
  text-align: center;
  padding: 10px;
  font-size: 14px;
  color: #999;
}
</style>
