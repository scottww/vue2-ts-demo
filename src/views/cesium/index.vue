<template>
  <div>
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
import { Cesium, viewer, initCesium } from "./initCesium";
import { DATA } from "./data";
export default {
  name: "CesiumIndex",
  data() {
    return {};
  },
  mounted() {
    initCesium("cesiumContainer");
    let promise = Cesium.GeoJsonDataSource.load("/data/zj.json");
    promise.then((dataSource) => {
      viewer.dataSources.add(dataSource);
      console.log("zj ...", dataSource, dataSource.entities.values);
      viewer.flyTo(dataSource.entities.values);
      this.addLabel(dataSource, viewer);
      
    });

    

    //获取json名称
    // let selectname = "";
    // var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    // handler.setInputAction(function (movement) {
    //   var pickingEntity = viewer.scene.pick(movement.endPosition);
    //   if (!pickingEntity) return false;

    //   if (pickingEntity.id._name == "China") return false;
    //   if (selectname == pickingEntity.id._name) return false;
    //   selectname = pickingEntity.id._name;

    //   console.log(pickingEntity.id._name, movement.endPosition);

    //   //将笛卡尔坐标转化为经纬度坐标
    //   var cartographic = Cesium.Cartographic.fromCartesian(movement.endPosition);
    //   var x = Cesium.Math.toDegrees(cartographic.longitude);
    //   var y = Cesium.Math.toDegrees(cartographic.latitude);
    //   var z = cartographic.height;

    //   var heading = Cesium.Math.toDegrees(viewer.scene.camera.heading);
    //   var pitch = Cesium.Math.toDegrees(viewer.scene.camera.pitch);
    //   var roll = Cesium.Math.toDegrees(viewer.scene.camera.roll);
    //   console.log(heading, pitch, roll, x, y,z);
    // }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    //点击获取点坐标
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    handler.setInputAction((click) => {
      //   viewer.clock.onTick.removeEventListener(onTickCallback);

      //查看当前视角的 x,y,z,heading,pitch,roll值
      var e = click;
      var position = viewer.scene.pickPosition(e.position);
      //将笛卡尔坐标转化为经纬度坐标
      var cartographic = Cesium.Cartographic.fromCartesian(position);
      var x = Cesium.Math.toDegrees(cartographic.longitude);
      var y = Cesium.Math.toDegrees(cartographic.latitude);
      var z = cartographic.height;
      var h = viewer.scene.camera.heading;
      var p = viewer.scene.camera.pitch;
      var r = viewer.scene.camera.roll;

      console.log(x, y, z, h, p, r);
      handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  },
  methods: {
    addLabel(dataSource, viewer){
      let names = [];
      dataSource.entities.values.forEach((i) => {
        const name = i.name;
        if(names.includes(name)) return;
        names.push(name);
        console.log(i.properties.centroid.getValue());
        const [lng, lat] = i.properties.centroid.getValue();
        const labelEntity = new Cesium.Entity({
          position: Cesium.Cartesian3.fromDegrees(lng, lat),
          name: `label-${name}`,
          label: {
            text: name,
            scale: 0.8, //放大倍数
            fillColor: Cesium.Color.AQUA, //文字颜色
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT, //对齐方式
            verticalOrigin: Cesium.VerticalOrigin.CENTER, //水平位置
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND //相对于地形的位置
          }
        });
        viewer.entities.add(labelEntity);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>
