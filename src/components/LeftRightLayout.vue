<template>
  <div class="wrapper">
    <div class="sidebar" :class="{ isHide: !isOpen }">
      <SideBar @on-change="onChange" />
    </div>
    <div class="main" ref="main">
      <div class="breadcrumb-container">
        <h-breadcrumb />
      </div>

      <div class="main-container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar2.vue";
import HBreadcrumb from "@/components/h-ui/breadcrumb";
export default {
  components: {
    SideBar,
    HBreadcrumb
  },
  data() {
    return {
      isOpen: true
    };
  },
  methods: {
    onChange(v) {
      this.isOpen = v;
    }
  },
  watch: {
    $route: function (to, from) {
      this.$refs.main.scrollTo({
        top: 0,
        left: 0
        // behavior: 'smooth' //平滑过渡
      });
    }
  }
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.sidebar {
  width: 200px;
  /* left: 0; */
  background-color: #fff;
  /* #e5e6eb */
  border-right: 1px solid #e5e6eb;
  transition: width 0.3s ease;
}

.sidebar.isHide {
  width: 0;
  /* left: -200px; */
}

.main {
  flex: 1;
  background-color: #fff;
  /* border: 1px solid #888; */
  overflow-y: auto;
}

.main > .breadcrumb-container{
  margin: 20px;
}

.main-container {
  /* BFC */
  overflow: hidden;
  padding: 20px;
  height: 100%;
  margin: 20px;
  background-color: #f8f8f8;
  border-radius: 4px;
}
</style>
