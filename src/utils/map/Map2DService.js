import BaseMapService from "./BaseMapService";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";

import { Feature } from "ol";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
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
        projection: "EPSG:4326"
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

  getMapInsatance() {
    return this.map;
  }

  //扩展
  addMarker(marker) {
    // this.map.addOverlay(marker);
  }
  //根据经纬度标记
  addMarkerByLngLat(lngLat, iconPath) {
    const point = new Feature(new Point(lngLat));
    point.setStyle(
      new Style({
        image: new Icon({ src: iconPath, anchor: [0.5, 1], scale: 1 })
      })
    );

    const vectorSource = new VectorSource({ features: [point] });
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      zIndex: 10
    });

    this.map.addLayer(vectorLayer);
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
