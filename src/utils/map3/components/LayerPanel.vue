<template>
  <div>
    <h3>图层控制</h3>
    <div style="margin-bottom: 8px">
      <a-switch v-model="baseVecVisible" @change="toggle('TDT_vec')" /> 矢量地图
      <a-switch v-model="baseVecAnnoVisible" @change="toggle('TDT_vec_anno')" />
      矢量标注
      <a-switch v-model="baseImgVisible" @change="toggle('TDT_img')" /> 影像地图
      <a-switch v-model="baseImgAnnoVisible" @change="toggle('TDT_img_anno')" />
      影像标注
    </div>

    <div style="margin-bottom: 8px">
      <a-switch v-model="pointsVisible" @change="toggle('points')" /> 点图层
    </div>

    <div style="margin-top: 12px">
      <a-button type="primary" size="small" @click="clearPoints"
        >清空点</a-button
      >
    </div>
  </div>
</template>

<script>
import MapApp from "../map";

export default {
  data() {
    return {
      baseVecVisible: true,
      baseVecAnnoVisible: true,
      baseImgVisible: false,
      baseImgAnnoVisible: false,
      pointsVisible: true
    };
  },
  methods: {
    toggle(key) {
      // if(key === 'base'){
      //   MapApp.layers.toggleVisible('base_0');
      //   MapApp.layers.toggleVisible('base_1');
      //   return;
      // }
      MapApp.layers.toggleVisible(key);
    },
    clearPoints() {
      MapApp.features.clear("points");
    }
  }
};
</script>
