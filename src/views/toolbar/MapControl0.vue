<template>
  <div class="map-toolbar">
    <div
      v-for="(item, index) in tools"
      :key="index"
      class="tool-button"
      :title="item.title"
      @click="item.onClick"
    >
      <img :src="item.icon" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "MapToolbar",
  data() {
    return {
      tools: [
        {
          title: "放大",
          icon: require("@/assets/mapToolBar/zoom-in.png"),
          onClick: () => this.$emit("zoom-in"),
        },
        {
          title: "缩小",
          icon: require("@/assets/mapToolBar/zoom-out.png"),
          onClick: () => this.$emit("zoom-out"),
        },
        {
          title: "定位",
          icon: require("@/assets/mapToolBar/locate.png"),
          onClick: () => this.$emit("locate"),
        },
        {
          title: "测距",
          // icon: require("@/assets/mapToolBar/ruler.png"),
          icon: require("@/assets/mapToolBar/ruler.svg"),
          onClick: () => this.$emit("measure"),
        },
        {
          title: "全屏",
          icon: require("@/assets/mapToolBar/fullscreen.png"),
          onClick: () => this.$emit("fullscreen"),
        },
      ],
    };
  },
};
</script>

<style scoped>
.map-toolbar {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  padding: 6px 4px;
  z-index: 999;
}
.tool-button {
  width: 36px;
  height: 36px;
  margin: 4px 0;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 0.2s;
}
.tool-button:hover {
  background-color: #f0f0f0;
  color: red;
}
.tool-button img {
  width: 20px;
  height: 20px;
}
</style>
