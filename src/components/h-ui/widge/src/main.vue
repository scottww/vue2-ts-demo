<template>
  <div class="h-widge">
    <h3 class="h-widge__title">
      <span>{{ title }}</span>
    </h3>
    <div class="h-widge__tags">
      <!-- <div class="tags-item">
        <a href="https:www.baidu.com/" target="_blank">百度</a>
        <a href="https://kian-404.github.io/vue-class-component-zh/" target="_blank">Vue Class Component</a>
      </div> -->
      <div
        class="tags-item"
        style="float: left"
        v-for="(item, index) in data"
        :key="`tag-${index}`"
      >
        <a :href="item.url" target="_blank" :title="item.label">{{
          item.label
        }}</a>
      </div>
      <div class="tags-item" title="查看更多">
        <a href="#">...</a>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "HWidge",
  props: {
    title: {
      type: String,
      default: "标题"
    },
    data: {
      type: Array,
      default: () => []
    }
  }
})
export default class HWidge extends Vue {
  onClick() {
    console.log("onClick");
  }
}
</script>

<style lang="scss" scoped>
$main-color: #6bc3e6;
.h-widge {
  margin-bottom: 30px;
  clear: both;
  position: relative;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 5px 10px 0 rgba(146, 146, 146, 0.1);
  padding: 27px;

  h3 {
    font-size: 18px;
    color: #282828;
    font-weight: 400;
    margin: 0;
    text-transform: uppercase;
    padding-bottom: 18px;
    margin-bottom: 28px;
    position: relative;
    &:after {
      content: "";
      background-color: $main-color;
      left: 0;
      width: 50px;
      height: 2px;
      bottom: -2px;
      position: absolute;
    }
  }

  &__tags {
    .tags-item a {
      text-transform: uppercase;
      transition: all 0.3s ease;
      display: inline-block;
      vertical-align: top;
      font-size: 13px;
      line-height: 20px;
      padding: 4px 15px;
      margin: 0 8px 8px 0;
      border: 1px solid #e0e0e0;
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.44);
      background-color: rgba(255, 255, 255, 0.97);
      &:hover {
        color: #fff;
        background: $main-color;
        border-color: $main-color;
      }
    }
    a {
      color: inherit;
      text-decoration: none;
      transition: all 0.3s ease;
    }
  }
}
</style>
