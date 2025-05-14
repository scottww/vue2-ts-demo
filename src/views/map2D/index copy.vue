<template>
  <div class="map-viewer">
    <MapViewer :type="type" :center="center" :zoom="zoom" @mapClick="handleMapClick" />
  </div>
</template>

<script>
import MapViewer from "../../utils/map/components/MapViewer.vue";

export default {
  components: {
    MapViewer
  },
  data() {
    return {
      type: "2D",
      center: [120.153576, 30.287459],
      zoom: 11
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      console.log("init");
    },
    handleMapClick(event){
      console.log('地图点击事件:', event);
    }
  }
};
</script>
<style lang="scss" scoped>
.map-viewer {
  width: 100%;
  height: 600px;
}
</style>
