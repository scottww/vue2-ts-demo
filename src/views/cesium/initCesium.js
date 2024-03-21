import { TOKEN } from "./define";

const Cesium = window.Cesium;
let viewer = null;

async function initCesium(container) {
  Cesium.Ion.defaultAccessToken = TOKEN;
  try {
    viewer = new Cesium.Viewer(container, {
      animation: false, //是否显示动画控件
      baseLayerPicker: true, //是否显示图层选择控件
      vrButton: false, //是否显示VR控件
      geocoder: false, //是否显示地名查找控件
      timeline: false, //是否显示时间线控件
      sceneMode: 3, //MORPHING:0,COLUMBUS_VIEW:1,SCENE2D:2,SCENE3D:3
      sceneModePicker: true, //是否显示投影方式控件
      navigationHelpButton: false, //是否显示帮助信息控件
      navigationInstructionsInitiallyVisible: true, //帮助按钮，初始化的时候是否展开
      infoBox: false, //是否显示点击要素之后显示的信息
      fullscreenButton: true, //是否显示全屏按钮
      selectionIndicator: true, //是否显示选中指示框
      homeButton: false, //是否显示返回主视角控件
      scene3DOnly: true, //如果设置为true, 所有几何图形以3D模式绘制以节约GPU资源
    //   terrainProvider: await Cesium.createWorldTerrainAsync({
    //     // 光照阴影
    //     requestVertexNormals: true,
    //     // 水流效果
    //     requestWaterMask: true
    //   })
      terrainProvider: new Cesium.EllipsoidTerrainProvider({}), //不显示地形
    //   imageryProvider: new Cesium.WebMapTileServiceImageryProvider({
    //     url: 'http://t{s}.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles&tk=${tk}',
    //     layer: "天地图影像",
    //     style: "default",
    //     format: "image/jpeg",
    //     subdomains: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
    //     tileMatrixSetID: "GoogleMapsCompatible",
    //   })
    });
    
  } catch (error) {
    console.log(error);
  }
  updateResolutionScale(viewer);
  // 去掉logo
  viewer.cesiumWidget.creditContainer.style.display = "none";
  viewer.scene.skyBox.show = false;
}

export function updateResolutionScale(viewer) {
    //判断是否支持图像渲染像素化处理
    if (Cesium.FeatureDetection.supportsImageRenderingPixelated()) {
      viewer.resolutionScale = window.devicePixelRatio;
    }
  }

export { Cesium, viewer, initCesium };
