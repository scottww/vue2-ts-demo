import BaseMapService from "./BaseMapService";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";

import { Feature } from "ol";
import Point from "ol/geom/Point";
// import { Icon, Style } from "ol/style";
import { Circle as CircleStyle, Fill, Stroke, Style, Icon, Text } from 'ol/style';
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { fromLonLat } from "ol/proj";
import ImageLayer from "ol/layer/Image";
import ImageStatic from "ol/source/ImageStatic";

export default class Map2DService extends BaseMapService {
  constructor(target, options = {}) {
    super(target);
    this.map = null;
    this.initMap(options);
  }

  initMap(options) {
    this.map = new Map({
      target: this.target,
      // layers: [
      //   new TileLayer({
      //     source: new XYZ({
      //       url: "https://tile.osm.org/{z}/{x}/{y}.png"
      //     })
      //   })
      // ],
      view: new View({
        center: options.center || [0, 0],
        zoom: options.zoom || 11,
        // projection: 'EPSG:3857',
        projection: "EPSG:4326" //默认为EPSG:4326
      })
    });
  }

  addTileLayer(mapType, map, tk = "a76b9ea6e49fb0eecdb1ed34d1e75930") {
    // const tileUrl = `https://tile.osm.org/{z}/{x}/{y}.png`;
    // const tk = `a76b9ea6e49fb0eecdb1ed34d1e75930`;
    // switch (maptype) {
    //   case "TDT_vec": //矢量图
    //     tileUrl = `http://t{0-6}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=${tk}`;
    //   case "TDT_vec_anno": //矢量图注记
    //     tileUrl = `http://t{0-6}.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=${tk}`;
    //   case "TDT_img": //影像图
    //     tileUrl = `http://t{0-6}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=${tk}`;
    //   case "TDT_img_anno": //影像图注记
    //     tileUrl = `http://t{0-6}.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=${tk}`;
    // }

    const urls = {
      OSM: "https://tile.osm.org/{z}/{x}/{y}.png",
      //矢量图
      TDT_vec: `http://t{0-6}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=${tk}`,
      //矢量图注记
      TDT_vec_anno: `http://t{0-6}.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=${tk}`,
      //影像图
      TDT_img: `http://t{0-6}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=${tk}`,
      //影像图注记
      TDT_img_anno: `http://t{0-6}.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=${tk}`
    };

    const zIndexMap = {
      OSM: 0,
      TDT_vec: 0,
      TDT_vec_anno: 1,
      TDT_img: 0,
      TDT_img_anno: 1
    };
    const url = urls[mapType];
    if (!url) {
      console.warn(`未识别的地图类型: ${mapType}`);
      return null;
    }

    const tileLayer = new TileLayer({
      source: new XYZ({ url }),
      zIndex: zIndexMap[mapType] ?? 0
    });

    return tileLayer;
  }

  setCenter(center, zoom) {
    this.map.getView().setCenter(center);
    if (zoom) this.map.getView().setZoom(zoom);
  }

  on(type, handler) {
    this.map.on(type, handler);

    // const eventMap = {
    //   LEFT_CLICK: "singleclick",
    //   DBL_CLICK: "dblclick",
    //   MOUSE_MOVE: "pointermove"
    // };

    // const realEvent = eventMap[type] || type;

    // this.map.on(realEvent, (evt) => {
    //   const coordinate = evt.coordinate;
    //   const lonLat = toLonLat(coordinate);
    //   handler({ coordinate, lonLat, originalEvent: evt });
    // });
  }

  off(type, handler) {
    this.map.un(type, handler);
  }

  destroy() {
    this.map.setTarget(null);
  }

  getMapInstance() {
    return this.map;
  }

  //扩展
  addMarker(marker) {
    // this.map.addOverlay(marker);
  }
  //根据经纬度标记
  addMarkerByLngLat(lngLat, iconPath, options = {}) {
    const point = new Feature(new Point(lngLat));
    console.log("options.color ...", options.color);
    point.setStyle(
      new Style({
        image: new Icon({
          src: iconPath,
          anchor: [0.5, 1],
          scale: 1,
          color: options.color
        })
      })
    );

    const vectorSource = new VectorSource({ features: [point] });
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      zIndex: 10
    });

    this.map.addLayer(vectorLayer);
  }

  /**
   * 添加一个 Marker 到地图上
   * @param map - OpenLayers Map 实例
   * @param lngLat - 经纬度坐标 [lng, lat]
   * @param iconPath - 图标路径
   * @param options - 可选项，包括 zIndex、scale、anchor 等
   * @returns 返回创建的 vectorLayer 实例（可用于后续移除）
   */
  addMarkerByLngLat2(map, lngLat, iconPath, options = {}) {
    const {
      zIndex = 10,
      scale = 1,
      anchor = [0.5, 1],
      data = null // 绑定附加数据
    } = options;

    const pointFeature = new Feature({
      geometry: new Point(lngLat),
      data // 可选：附加数据，后续事件使用
    });

    pointFeature.setStyle(
      new Style({
        image: new Icon({
          src: iconPath,
          anchor,
          scale
        })
      })
    );

    const vectorSource = new VectorSource({
      features: [pointFeature]
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      zIndex
    });

    map.addLayer(vectorLayer);

    return vectorLayer;
  }
  /**
   * 添加一个 marker 到地图
   * @param map - ol.Map 实例
   * @param lngLat - [lng, lat] 坐标
   * @param iconPath - 图标地址
   * @param options - 可选项
   * @returns vectorLayer 实例（用于后续移除或控制）
   */
  addMarkerByLngLat3(map, lngLat, iconPath, options = {}) {
    if (!map || !lngLat || !iconPath) {
      console.warn("mapService.addMarkerByLngLat 缺少必要参数");
      return null;
    }

    const {
      zIndex = 10,
      scale = 1,
      anchor = [0.5, 1],
      data = null,
      onClick = null
    } = options;

    const feature = new Feature({
      geometry: new Point(lngLat),
      data
    });

    feature.setStyle(
      new Style({
        image: new Icon({
          src: iconPath,
          anchor,
          scale
        })
      })
    );

    const vectorSource = new VectorSource({
      features: [feature]
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      zIndex
    });

    map.addLayer(vectorLayer);

    if (onClick) {
      const clickHandler = (evt) => {
        map.forEachFeatureAtPixel(evt.pixel, (feat) => {
          if (feat === feature) {
            onClick(feat, evt.coordinate);
          }
        });
      };
      map.on("singleclick", clickHandler);

      // 为了方便后续移除，可以绑定 handler 引用
      vectorLayer._clickHandler = clickHandler;
    }

    return vectorLayer;
  }
  /**
   * 移除指定 marker 层
   * @param map - ol.Map 实例
   * @param layer - VectorLayer 实例
   */
  removeMarkerLayer(map, layer) {
    if (layer?._clickHandler) {
      map.un("singleclick", layer._clickHandler);
    }
    if (map && layer) {
      map.removeLayer(layer);
    }
  }
  getDefaultTextStyle(text = 'My Point', offsetY = -50, fillColor = 'rgba(0,107,255, 0.4)') {
    // const label = new Text({
    //   text,
    //   font: '14px sans-serif', //默认是 '10px sans-serif'
    //   fill: new Fill({
    //     color: '#000000',
    //   }),
    //   stroke: new Stroke({
    //     color: '#FFFFFF',
    //     width: 2, // 文本描边宽度
    //   }),
    //   offsetY: -45, // 文本偏移量，负值表示向上偏移
    // });

    const label = new Text({
      text,
      textAlign: 'center',
      font: '14px PingFangSC-Regular',
      fill: new Fill({
        color: '#ffffff'
      }),
      offsetY: offsetY, // 文本的垂直偏移量
      padding: [6, 6, 3, 6],
      backgroundStroke: new Stroke({
        color: 'rgba(0, 0, 0, 0)',
        width: 1
      }),
      backgroundStroke: new Stroke({
        color: 'rgba(0, 0, 0, 0)',
        width: 1
      }),
      backgroundFill: new Fill({
        color: fillColor
      })
    });

    return label;
  }
  addBatchPointFeature(data = [], style) {
    const vectorLayer = new VectorLayer({
      source: new VectorSource(),
      zIndex: 11
    });

    data.forEach((i) => {
      if (i.longitude && i.latitude) {
        const point = new Feature({
          geometry: new Point([i.longitude, i.latitude]),
          name: "Point",
          stnm: i.stnm,
          id: i.id || ""
        });

        const newStyle = style.clone();
        // 加入文本样式
        const text = this.getDefaultTextStyle(i.stnm, -40);
        newStyle.setText(text);

        point.setStyle(newStyle);
        point.set("defaultStyle", newStyle); // 保存默认样式

        vectorLayer.getSource().addFeature(point);
      }
    });

    return vectorLayer;
  }
  enableFeatureHover(map, vectorLayer, getHoverStyle, getDefaultStyle) {
    let lastFeature = null;

    map.on("pointermove", function (evt) {
      let hit = false;

      map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
        if (layer === vectorLayer) {
          hit = true;

          if (lastFeature && lastFeature !== feature) {
            const defaultStyle =
              lastFeature.get("defaultStyle") || getDefaultStyle(lastFeature);
            lastFeature.setStyle(defaultStyle);
          }

          feature.setStyle(getHoverStyle(feature));
          lastFeature = feature;
        }
      });

      if (!hit && lastFeature) {
        const defaultStyle =
          lastFeature.get("defaultStyle") || getDefaultStyle(lastFeature);
        lastFeature.setStyle(defaultStyle);
        lastFeature = null;
      }

      map.getTargetElement().style.cursor = hit ? "pointer" : "";
    });
  }
  createSatelliteMap(imgPath, extent, options = {}) {
    // const extent = [95, -2, 160, 43];
    const satelliteLayer = new ImageLayer({
      source: new ImageStatic({
        url: imgPath,
        imageExtent: extent,
        projection: "EPSG:4326"
      })
      // zIndex: 10
    });

    return satelliteLayer;
  }
}
