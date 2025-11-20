<template>
  <div style="display:flex; height:100vh;">
    <div style="width: 260px; padding: 12px; background: #f8f8f8;">
      <layer-panel />
    </div>

    <div id="map" style="flex: 1; height: 100%;"></div>
  </div>
</template>

<script>
import MapApp from "@/utils/map3/map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import { fromLonLat } from "ol/proj"; // 视你的 projection 决定是否使用
import LayerPanel from "@/components/LayerPanel.vue";

export default {
  components: { LayerPanel },
  mounted() {
    // 初始化地图，使用 EPSG:4326（与上面代码一致）
    MapApp.init("map", {
      core: { center: [120, 30], zoom: 6, projection: "EPSG:4326" }
    });

    // 添加底图
    const base = new TileLayer({ source: new OSM(), visible: true });
    MapApp.layers.addLayer("base", base);

    // 添加一个矢量 layer（points）
    const pointSource = new VectorSource();
    MapApp.layers.addVectorLayer("points", pointSource, { zIndex: 20 });

    // 添加几个示例 marker（使用 MarkerManager）
    MapApp.markers.addMarker("points", [120.1, 30.2], null, {
      // 如果不需要图片 icon，可以用 StyleFactory 提供的 pointCircle
      data: { name: "A" },
      onClick: (f) => {
        console.log("点击 marker", f.get("data"));
      }
    });

    // 也可以直接用 Feature + Style 手动添加
    const f = new Feature({
      geometry: new Point([120.5, 30.5]),
      name: "手动添加"
    });
    // 需要 map box style factory: MapApp.style.pointCircle()
    f.setStyle(MapApp.style.pointCircle("rgba(255,0,0,0.9)", 8));
    MapApp.features.addFeature("points", f);
  },
  beforeDestroy() {
    // 清理（可选）
    // MapApp.destroy();
  }
};
</script>
