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
    let zjJSON = Cesium.GeoJsonDataSource.load("/data/zj.json");
    viewer.dataSources.add(zjJSON);

    var mapOptions = {
      scene: {
        center: {
          lng: 120.2,
          lat: 24.5,
          alt: 937783,
          heading: 355,
          pitch: -63,
          roll: 0.0022007032132071057
        }
      }
    };
    viewer.camera.flyTo({
      orientation: {
        // roll: Cesium.Math.toRadians(mapOptions.scene.center.roll),
        heading: Cesium.Math.toRadians(mapOptions.scene.center.heading),
        pitch: Cesium.Math.toRadians(mapOptions.scene.center.pitch)
      },
      destination: Cesium.Cartesian3.fromDegrees(
        mapOptions.scene.center.lng,
        mapOptions.scene.center.lat,
        mapOptions.scene.center.alt
      ),
      duration: 0
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
  methods: {}
};
</script>
<style lang="scss" scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>
