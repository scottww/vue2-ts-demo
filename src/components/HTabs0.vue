<template>
  <div class="tabs">
    <div class="tabs-header" :class="{ 'is-no-bg-color': noBgColor }">
      <div class="tabs-nav-wrap">
        <div class="tabs-nav-scroll">
          <div class="tabs-list">
            <div
              class="tabs-item"
              v-for="(item, index) in data"
              :key="index"
              :class="{ 'is-active': curType === item.value }"
              @click="handleClick(item)"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tabs-content" :style="{ height: isNaN(h) ? h : `${h}px` }">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabs",
  props: {
    data: {
      type: Array,
      required: true
    },
    curType: {
      type: String,
      required: true
    },
    noBgColor: {
      type: Boolean,
      default: true
    },
    h: {
      type: [Number, String],
      default: ""
    }
  },
  methods: {
    handleClick(item) {
      this.$emit("tab-click", item);
    }
  }
};
</script>

<style lang="scss" scoped>
$borderColor: var(--theme-color);
.tabs {
  & > .tabs-header {
    border-bottom: 1px solid $borderColor;
    background-color: #f9f9f9;
    .tabs-item {
      border-bottom: 1px solid transparent;
      border: 1px solid #e4e7ed;
      transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}
.tabs-nav-wrap {
  overflow: hidden;
  margin-bottom: -1px;
  position: relative;
  .tabs-nav-scroll {
    overflow: hidden;
    .tabs-list {
      border-bottom: none;
      border-radius: 4px 4px 0 0;
      box-sizing: border-box;

      white-space: nowrap;
      position: relative;
      transition: transform 0.3s;
      float: left;
      z-index: 2;
      .tabs-item {
        padding: 0 20px;
        height: 30px;
        box-sizing: border-box;
        line-height: 30px;
        display: inline-block;
        list-style: none;
        // font-size: var(--small-font-size);
        font-weight: 500;
        color: #303133;
        position: relative;
        border-top: 1px solid #e4e7ed;
        border-bottom: 1px solid $borderColor;
        &:not(:first-child) {
          border-left: 1px solid transparent;
        }
        &:hover {
          color: var(--theme-color);
          cursor: pointer;
        }
      }
    }
  }
}

.tabs > .tabs-nav {
  white-space: nowrap;
  position: relative;
  transition: transform 0.3s;
  z-index: 2;
  transform: translateX(0px);
}

.tabs-header {
  padding: 0;
  position: relative;
}

.is-no-bg-color {
  background-color: transparent !important;
}

.is-active {
  background-color: #fff;
  border-top-color: $borderColor !important;
  border-left-color: $borderColor !important;
  border-right-color: $borderColor !important;
  border-bottom: none !important;
}
.tabs-content {
  border: 1px solid $borderColor;
  border-top: none;
  min-height: 200px;
  padding: 10px;

  background-color: #fff;
}
</style>
