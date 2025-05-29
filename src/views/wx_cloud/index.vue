<template>
  <div class="cloud-player">
    <div ref="mapContainer" class="map"></div>
    <div class="controls">
      <button @click="togglePlay">{{ isPlaying ? '暂停' : '播放' }}</button>
    </div>
  </div>
</template>

<script>
import Map from 'ol/Map';
import View from 'ol/View';
import ImageLayer from 'ol/layer/Image';
import ImageStatic from 'ol/source/ImageStatic';
import { fromLonLat } from 'ol/proj';

export default {
  name: 'CloudPlayer',
  data() {
    return {
      map: null,
      imageLayer: null,
      totalFrames: 10, // 假设你有 cloud1.png ~ cloud10.png
      currentIndex: 1,
      timer: null,
      intervalMs: 1500,
      isPlaying: true,
    };
  },
  mounted() {
    this.initMap();
    this.startAnimation();
  },
  beforeDestroy() {
    this.stopAnimation();
  },
  methods: {
    initMap() {
      this.map = new Map({
        target: this.$refs.mapContainer,
        view: new View({
          center: fromLonLat([105, 30]),
          zoom: 4,
        }),
        layers: [],
      });
    },
    loadCloudFrame(index) {
      const url = `/satellite/cloud${index}.png`;
      const imageExtent = [70, 10, 140, 55]; // EPSG:4326

      if (this.imageLayer) {
        this.map.removeLayer(this.imageLayer);
      }

      this.imageLayer = new ImageLayer({
        source: new ImageStatic({
          url,
          imageExtent,
          projection: 'EPSG:4326',
        }),
        zIndex: 10,
      });

      this.map.addLayer(this.imageLayer);
    },
    startAnimation() {
      this.stopAnimation(); // 避免重复定时器
      this.isPlaying = true;
      this.timer = setInterval(() => {
        this.loadCloudFrame(this.currentIndex);
        this.currentIndex++;
        if (this.currentIndex > this.totalFrames) {
          this.currentIndex = 1;
        }
      }, this.intervalMs);
    },
    stopAnimation() {
      this.isPlaying = false;
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    togglePlay() {
      if (this.isPlaying) {
        this.stopAnimation();
      } else {
        this.startAnimation();
      }
    },
  },
};
</script>

<style scoped>
.cloud-player {
  position: relative;
  width: 100%;
  height: 100%;
}

.map {
  width: 100%;
  height: 100%;
}

.controls {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 1000;
}

button {
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
}
</style>
