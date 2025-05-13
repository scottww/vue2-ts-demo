<template>
  <div class="wrapper">
    <div class="sidebar" :class="{ isFull: isFull, isHide: !isOpen }">
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
      isOpen: true,
      isFull: false
    };
  },
  methods: {
    onChange(v) {
      this.isOpen = v;
    }
  },
  watch: {
    $route: function (to, from) {
      console.log("watch $route ...", to, from);
      this.isFull = to.meta.isFull || false;
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

.sidebar.isFull {
  display: none;
}

.main {
  flex: 1;
  width: 100%;
  background-color: #f8f8f8;
  /* border: 1px solid #888; */
  height: calc(100% - 20px);
  /* overflow-y: auto; */
  overflow: hidden;
}

.main > .breadcrumb-container {
  margin: 20px;
}

.main-container {
  /* BFC */
  /* overflow: hidden; */
  overflow-y: auto;
  padding: 20px;
  height: calc(100% - 20px);
  margin: 20px;
  background-color: #fff;
  border-radius: 4px;
}
</style>
