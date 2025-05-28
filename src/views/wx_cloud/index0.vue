<template>
  <div id="map" style="width: 100%; height: 600px;"></div>
</template>

<script>
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import { Tile as TileSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';

export default {
  name: 'CloudMap',
  data() {
    return {
      map: null,
      wmsLayer: null,
      timestamps: [],
      timer: null,
      currentIndex: 0,
    };
  },
  mounted() {
    this.initMap();
    this.prepareTimestamps();
  },
  beforeDestroy() {
    if (this.timer) clearInterval(this.timer);
  },
  methods: {
    initMap() {
      this.wmsLayer = new TileLayer({
        source: new TileWMS({
          url: 'https://www.nsmc.org.cn/NSMC_WMS/WMSServer',
          params: {
            LAYERS: 'FY4A_AGRI_DISK_1339E_L1C_ASIA_CHANNEL1', // 可见光通道
            FORMAT: 'image/png',
            TRANSPARENT: true,
          },
          crossOrigin: 'anonymous',
        }),
      });

      this.map = new Map({
        target: 'map',
        layers: [
          // new TileLayer({
          //   source: new ol.source.OSM(),
          // }),
          this.wmsLayer,
        ],
        view: new View({
          center: fromLonLat([110, 30]),
          zoom: 4,
        }),
      });
    },

    prepareTimestamps() {
      const now = new Date();
      for (let i = 0; i < 12; i++) {
        const d = new Date(now.getTime() - i * 60 * 60 * 1000);
        this.timestamps.unshift(this.formatTime(d));
      }
      this.startAnimation();
    },

    startAnimation() {
      this.timer = setInterval(() => {
        const time = this.timestamps[this.currentIndex];
        this.wmsLayer.getSource().updateParams({
          TIME: time,
        });
        this.currentIndex = (this.currentIndex + 1) % this.timestamps.length;
      }, 1000);
    },

    formatTime(date) {
      const yyyy = date.getUTCFullYear();
      const MM = String(date.getUTCMonth() + 1).padStart(2, '0');
      const dd = String(date.getUTCDate()).padStart(2, '0');
      const hh = String(date.getUTCHours()).padStart(2, '0');
      return `${yyyy}-${MM}-${dd}T${hh}:00:00Z`;
    },
  },
};
</script>
