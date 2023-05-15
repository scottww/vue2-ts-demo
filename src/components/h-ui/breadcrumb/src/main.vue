<template>
  <div class="h-breadcrumb">
    <div
      class="h-breadcrumb__item"
      v-for="(item, index) in routeList"
      :key="index"
    >
      {{ item.meta.title }}
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "HBreadcrumb",
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  }
})
export default class HBreadcrumb extends Vue {
  routeList = []; // 路由集合

  created() {
    this.getBreadcrumb();
  }

  isHome(route) {
    return route.name === "Home";
  }
  getBreadcrumb() {
    let matched = this.$route.matched;
    //如果不是首页
    if (!this.isHome(matched[0])) {
      matched = [{ path: "/Home", meta: { title: "首页" } }].concat(matched);
    }
    this.routeList = matched;
  }
}
</script>

<style lang="scss" scoped>
$active-color: #808080;
$other-color: #000;
.h-breadcrumb {
  align-items: center;
  display: flex;
  line-height: 20px;
  color: #575d6c;
  .h-breadcrumb__item {
    margin: 0 0.5rem;
    position: relative;

    color: $other-color;
    font-size: 14px;
  }

  .h-breadcrumb__item:not(:last-child)::after {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(0.5rem, 0px);

    content: "/";

    color: $active-color;
  }

  .h-breadcrumb__item:last-child {
    color: $active-color;
  }
}
</style>
