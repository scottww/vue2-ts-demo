<template>
  <div class="app-wrapper">
    <!-- <div class="app__header" v-if="!isFull">
      <AppHeader />
    </div> -->

    <div v-if="!isFull">
      <div class="app__sidebar" :class="{ isHide: !isOpen }">
        <SideBar @on-change="onChange" />
      </div>
    </div>

    <div class="app__main" ref="main">
      <div v-if="!isFull">
        <div class="breadcrumb-container">
          <h-breadcrumb />
        </div>
      </div>

      <div class="container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/Header.vue";
import SideBar from "@/components/SideBar3.vue";
import HBreadcrumb from "@/components/h-ui/breadcrumb";
export default {
  components: {
    AppHeader,
    SideBar,
    HBreadcrumb
  },
  data() {
    return {
      isOpen: true,
      isFull: false
    };
  },
  created() {
    this.isFull = this.$route.meta.isFull || false;
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

<style lang="scss" scoped>
$width: 280px;
.app-wrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow: hidden;
}

.app__sidebar {
  width: $width;
  /* left: 0; */
  background-color: #fff;
  /* #e5e6eb */
  border-right: 1px solid #e5e6eb;
  transition: width 0.3s ease;
  
  height: calc(100vh - 60px);
  overflow-y: auto; // 让内容可滚动
}

// .app__sidebar.isHide {
//   width: 0;
//   /* left: -200px; */
// }

// .app__sidebar.isFull {
//   display: none;
// }

.app__main {
  flex: 1;
  width: 100%;
  background-color: #f8f8f8;
  /* border: 1px solid #888; */
  height: calc(100% - 20px);
  /* overflow-y: auto; */
  overflow: hidden;
}

.app__main > .breadcrumb-container {
  margin: 20px;
}

.app__main > .container {
  /* BFC */
  /* overflow: hidden; */
  overflow-y: auto;
  padding: 20px;
  // height: calc(100% - 20px);
  height: calc(100% - 120px);
  margin: 20px;
  background-color: #fff;
  border-radius: 4px;
}
.isHide {
  width: 0;
}
.isFull {
  display: none;
}
</style>
