<template>
  <div>
    <div id="cesiumContainer">
      <div id="info" ref="info"></div>
    </div>
  </div>
</template>

<script>
import { Cesium, viewer, initCesium } from "./initCesium";
import { DATA } from "./data";
export default {
  name: "CesiumIndex",
  data() {
    return {
      infoPosition: "test",
      infoDom: document.getElementById("info")
    };
  },
  mounted() {
    // const self = this;
    initCesium("cesiumContainer");
    let promise = Cesium.GeoJsonDataSource.load("/data/zj.json", {
      // fill: true,
      // material: Cesium.Color.YELLOW.withAlpha(0.1),
      // outline: true,
      // outlineColor: Cesium.Color.BLACK,
      // outlineWidth: 2
    });
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
    /**
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
    */

    // 创建实体
    const pinBuilder = new Cesium.PinBuilder();
    var entity = viewer.entities.add({
      position: Cesium.Cartesian3.fromDegrees(120, 31), // 设置实体的位置
      billboard: {
        image: pinBuilder.fromText("吴", Cesium.Color.RED, 50).toDataURL()
      },
      description:
        "<h2>Entity Information</h2>" + // 设置实体的描述信息
        "<p>This is additional information about the entity.</p>"
    });
    // const that = this;

    // 添加点击事件处理函数
    handler.setInputAction( (movement) => {
      var pickedObject = viewer.scene.pick(movement.position);
      console.log('点击到的实体 ...',pickedObject);
      if (Cesium.defined(pickedObject) && pickedObject.id === entity) {
        // 如果点击的是实体
        // viewer.selectedEntity = entity; // 将实体设置为选定实体，以触发 InfoBox 的显示
        this.$refs.info.innerHTML = pickedObject.id.description._value;
        this.$refs.info.style.display = 'block';
      }else{
        this.$refs.info.style.display = 'none';
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  },
  methods: {
    addLabel(dataSource, viewer) {
      let names = [];
      let entities = dataSource.entities.values;

      const pinBuilder = new Cesium.PinBuilder();
      entities.forEach((i) => {
        const name = i.name;
        if (names.includes(name)) return;
        names.push(name);
        // console.log(i.properties.centroid.getValue());
        const [lng, lat] = i.properties.centroid.getValue();
        const labelEntity = new Cesium.Entity({
          position: Cesium.Cartesian3.fromDegrees(lng, lat),
          name: `label-${name}`,
          label: this.getLabelStyle(1, name)
        });
        viewer.entities.add(labelEntity);

        const pointEntity = new Cesium.Entity({
          name: `point-${name}`,
          position: Cesium.Cartesian3.fromDegrees(lng + 1, lat + 1),
          billboard: {
            image: pinBuilder.fromText("吴", Cesium.Color.BLUE, 50).toDataURL()
          },
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          data:
            "<h2>Point Information</h2>" +
            "<p>This is additional information about the point.</p>"
        });

        // 添加点击事件处理函数
        viewer.selectedEntityChanged.addEventListener(function (
          selectedEntity
        ) {
          if (Cesium.defined(selectedEntity)) {
            viewer.selectedEntity = null; // 关闭默认信息框
          }
        });

        viewer.entities.add(pointEntity);

        //修改entity样式
        let polyPositions = i.polygon.hierarchy.getValue(
          Cesium.JulianDate.now()
        ).positions;
        let positions = i.polygon.hierarchy._value.positions;

        i.polyline = {
          positions,
          // width:2,
          // material:Cesium.Color.fromBytes(3, 255,255)

          // material: new Cesium.PolylineGlowMaterialProperty({
          //   glowPower: 0.2,
          //   color: Cesium.Color.BLUE
          // }),
          // followSurface: false //是否贴着地表

          width: 10,
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.2,
            color: Cesium.Color.BLUE
          }),
          followSurface: true //是否贴着地表
        };
      });
    },
    getLabelStyle(type, name) {
      switch (type) {
        case 0: //有背景
          console.log(0);
          return {
            text: name,
            scale: 1,
            showBackground: true, //显示背景
            backgroundColor: Cesium.Color.DARKGREY, //背景色
            backgroundPadding: new Cesium.Cartesian2(50, 5), //padding值
            fillColor: Cesium.Color.AQUA,
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT, //对齐方式
            verticalOrigin: Cesium.VerticalOrigin.CENTER
          };
        case 1: //有边框
          console.log(1);
          return {
            text: name === "金华市" ? "我爱xxx" : name,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE, //有填充和边框
            scale: 1,
            fillColor: name === "金华市" ? Cesium.Color.RED : Cesium.Color.AQUA,
            outlineColor: Cesium.Color.BLACK,
            outlineWidth: 2,
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT, //对齐方式
            verticalOrigin: Cesium.VerticalOrigin.CENTER,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
            // disableDepthTestDistance: 10000.0
          };
        case 2:
          return {
            text: "Hello, World!", // 文字内容
            font: "24px Helvetica", // 字体样式
            fillColor: Cesium.Color.RED, // 文字颜色
            outlineColor: Cesium.Color.BLACK, // 描边颜色
            outlineWidth: 2, // 描边宽度
            style: Cesium.LabelStyle.FILL_AND_OUTLINE, // 文字样式
            horizontalOrigin: Cesium.HorizontalOrigin.CENTER, // 水平对齐方式
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // 垂直对齐方式
            pixelOffset: new Cesium.Cartesian2(0, -50) // 偏移量，调整文字位置
          };

        default:
          console.log(2);
          return {
            text: name,
            scale: 0.8, //放大倍数
            fillColor: Cesium.Color.AQUA, //文字颜色
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT, //对齐方式
            verticalOrigin: Cesium.VerticalOrigin.CENTER, //水平位置
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND //相对于地形的位置
          };
      }
    },
    addHightLightLine(data, viewer) {
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push(data[i].lng);
        arr.push(data[i].lat);
      }
      let glowingLine = viewer.entities.add({
        name: "具有发光效果的线",
        polyline: {
          positions: Cesium.Cartesian3.fromDegreesArray(arr),
          width: 10,
          material: new Cesium.PolylineGlowMaterialProperty({
            glowPower: 0.2,
            color: Cesium.Color.BLUE
          }),
          followSurface: false //是否贴着地表
        }
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
#info {
  position: absolute;
  width: 100px;
  height: 100px;
  z-index: 1000;
  display: none;
  background: rgba(255, 255, 255, 0.5);
  border: 2px solid greenyellow;
  border-radius: 4px;
}
</style>
