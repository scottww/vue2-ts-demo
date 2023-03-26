<template>
  <div class="wrapper">
    <div class="sidebar" :class="{ isHide: !isOpen }">
      <SideBar @on-change="onChange" />
    </div>
    <div class="main">
      <div class="main-container">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar2.vue";
export default {
  components: {
    SideBar,
  },
  data() {
    return {
      isOpen: true,
    };
  },
  methods: {
    onChange(v) {
      this.isOpen = v;
    },
  },
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

.main-container {
  height: 100%;
  margin: 20px;
  background-color: #f8f8f8;
  border-radius: 4px;
}
</style>
