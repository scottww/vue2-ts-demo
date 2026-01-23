// services/MapService.js

import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";

// import Draw from 'ol/interaction/Draw';
import Feature from "ol/Feature";
import { Point, Polygon } from "ol/geom";
import { getTopLeft, getWidth, getCenter } from "ol/extent";
import Zoom from "ol/control/Zoom";

// import VectorSource from 'ol/source/Vector';
// import { Vector as VectorLayer } from 'ol/layer';
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Icon,
  Text
} from "ol/style";
import { fromLonLat, toLonLat, transform } from "ol/proj";
import { GeoJSON, WKT } from "ol/format";

import { defaults as defaultControls } from "ol/control";
import { defaults as defaultInteractions } from "ol/interaction";
import { Modify, Draw, Translate, Select } from "ol/interaction";

var gridLayerIndex = 0; //网格图层索引
var colorMap = {
  绿: "rgb(0, 255, 0)"
};

const defaultOptions = {
  center: [0, 0],
  zoom: 7,
  minZoom: 4,
  maxZoom: 18,
  projection: "EPSG:4326",
  controls: defaultControls({ zoom: false }),
  // 有绘制能力的地图，统一禁用双击缩放
  interactions: defaultInteractions({
    doubleClickZoom: false
  })
};

class MapService {
  constructor(mapId, options) {
    let { center, zoom, minZoom, maxZoom, projection, controls } = options;

    this.center = center || defaultOptions.center;
    this.zoom = zoom || defaultOptions.zoom;
    this.minZoom = minZoom || defaultOptions.minZoom;
    this.maxZoom = maxZoom || defaultOptions.maxZoom;
    this.projection = projection || defaultOptions.projection;
    this.controls = controls || defaultOptions.controls;

    this.map = new Map({
      target: mapId,
      layers: [
        // new TileLayer({
        //   source: new OSM()
        // })
      ],
      view: new View({
        center: this.center,
        zoom: this.zoom,
        minZoom: this.minZoom,
        maxZoom: this.maxZoom,
        projection: this.projection
      }),
      controls: this.controls,
      interactions: defaultInteractions({
        doubleClickZoom: false
      })
    });

    //wkt
    this.WKT_FORMAT = new WKT();
    this.eventListeners = {};
  }

  // 获取地图对象实例
  getMapInstance() {
    return this.map;
  }

  getDefaultOptions() {
    return defaultOptions;
  }

  // 添加瓦片图层
  addTileLayer(tileUrl) {
    const tileLayer = new TileLayer({
      source: new XYZ({
        url: tileUrl
      }),
      zIndex: 0
    });
    this.map.addLayer(tileLayer);
    return tileLayer;
  }

  // 添加矢量图层
  addVectorLayer() {
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource
    });
    this.map.addLayer(vectorLayer);
    return vectorLayer;
  }

  // 设置地图中心
  setCenter(lon, lat) {
    this.map.getView().setCenter([lon, lat]);
  }
  setZoom(zoom) {
    this.map.getView().setZoom(zoom);
  }

  // ==================== 样式style ====================
  getHoverPointIconStyle(feature, imgPath, hoverImgPath) {
    if (feature) {
      console.error(`[getHoverPointIconStyle]: feature is null ...`);
      return;
    }
    console.log(
      "getHoverPointIconStyle ...",
      feature,
      imgPath,
      hoverImgPath,
      feature.get("hovered")
    );
    const iconUrl = feature.get("hovered") ? hoverImgPath : imgPath;
    return new Style({
      image: new Icon({
        src: iconUrl,
        scale: 1,
        opacity: 1, //透明度
        anchor: [0.5, 1]
      })
    });
  }
  getPointIconStyle(iconPath, { scale, opacity, anchor } = {}) {
    // const iconUrl = feature.get("hovered")
    //           ? "./images/device2.png"
    //           : "./images/device.png";
    let iconStyle = new Style({
      image: new Icon({
        src: iconPath, //传入图片的相对路径
        scale: scale || 1, // 设置图标的缩放大小
        opacity: opacity || 1, //透明度
        anchor: anchor || [0.5, 1]
      })
    });

    return iconStyle;
  }

  // 定义样式函数
  getStyleFunction(feature) {
    const colorProp = feature.get("Color");
    // const color = this.identifyColorFormat(colorProp) || '#ffffff'; // 获取 color 属性，默认为白色
    // const color = this.identifyColorFormat(colorProp) || '#ffffff'; // 获取 color 属性，默认为白色
    return new Style({
      fill: new Fill({
        // color: colorMap[color]
        // color: color
        color: colorProp
      }),
      stroke: new Stroke({
        color: "rgba(255,255,255,0.35)",
        width: 1
      })
    });
  }

  getDefaultTextStyle(
    text = "My Point",
    offsetY = -50,
    fillColor = "rgba(0,107,255, 0.4)"
  ) {
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
      textAlign: "center",
      font: "14px PingFangSC-Regular",
      fill: new Fill({
        color: "#ffffff"
      }),
      offsetY: offsetY, // 文本的垂直偏移量
      padding: [6, 6, 3, 6],
      backgroundStroke: new Stroke({
        color: "rgba(0, 0, 0, 0)",
        width: 1
      }),
      backgroundStroke: new Stroke({
        color: "rgba(0, 0, 0, 0)",
        width: 1
      }),
      backgroundFill: new Fill({
        color: fillColor
      })
    });

    return label;
  }

  // ==================== 查询操作 ===================================
  // 根据ID查找要素
  findFeatureById(id, layer) {
    let findFeature = null;
    const allFeatures = layer.getSource().getFeatures();
    allFeatures.forEach(function(feature) {
      if (feature.getId() === id) {
        findFeature = feature;
      }
    });
    return findFeature;
  }

  // ====================要素操作===================================
  // 添加点要素
  createPointFeature(coordinates, style) {
    const point = new Point(coordinates);
    const feature = new Feature({
      geometry: point
    });
    if (style) {
      feature.setStyle(style);
    }
    //自行选择添加的图层，这里不做封装
    // const vectorSource = this.getVectorSource();
    // vectorSource.addFeature(feature);
    return feature;
  }
  /**
   * 批量添加点
   * coordinates 点位的数据,带经纬度 id 名称
   * style 点位的共用图标样式
   * isShowText 是否需要显示名称
   */
  // addBatchPointFeature(coordinates, style) {
  //   var vectorLayer = new VectorLayer({
  //     source: new VectorSource(),
  //     zIndex: 10
  //   });
  //   for (var i = 0; i < coordinates.length; i++) {
  //     if (coordinates[i].longitude && coordinates[i].latitude) {
  //       var point = new Feature({
  //         geometry: new Point([coordinates[i].longitude, coordinates[i].latitude]),
  //         name: 'Point',
  //         id: coordinates[i].id ? coordinates[i].id : ''
  //       });
  //       if (style) {
  //         point.setStyle(style);
  //       }
  //       vectorLayer.getSource().addFeature(point);
  //     }
  //   }
  //   // this.map.addLayer(vectorLayer);
  //   return vectorLayer;
  // }
  //批量添加点
  addBatchPointFeature(coordinates, style) {
    const vectorLayer = new VectorLayer({
      source: new VectorSource(),
      zIndex: 11
    });

    coordinates.forEach(coord => {
      if (coord.longitude && coord.latitude) {
        const point = new Feature({
          geometry: new Point([coord.longitude, coord.latitude]),
          // name: coord.stnm,
          name: "Point",
          stnm: coord.stnm,
          id: coord.id || ""
        });

        const newStyle = style.clone();
        // 加入文本样式
        const text = this.getDefaultTextStyle(coord.stnm, -40);
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

    map.on("pointermove", function(evt) {
      let hit = false;

      map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
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
      }),
      zIndex: 10
    });

    return satelliteLayer;
  }
  // 添加返回的geojson面要素, 图层新建+1
  addGridFeaturesByGeojson(geojsonData) {
    // console.log('addGridFeaturesByGeojson ...');
    // const { features } = GRID_FEATURES_DATA;

    const geojson = geojsonData;
    let vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geojson)
    });

    const name = `grid_` + gridLayerIndex++;
    const _that = this;
    const vectorLayer = new VectorLayer({
      properties: {
        // name: "GeoJSON Layer",
        name: name
      },
      source: vectorSource,
      zIndex: 10,
      style: this.getStyleFunction
    });
    this.map.addLayer(vectorLayer);
    //删除图层测试
    // setTimeout(()=>{
    //   this.removeLayerByName(vectorLayer.get("name"));
    // }, 3000)
    return vectorLayer;
  }

  // 添加geojson格式到地图中
  addGeojsonToMap(geojson) {
    var vectorSource = new VectorSource();
    var features = new GeoJSON().readFeatures(geojson);

    //加点的
    // features.forEach((feature) => {
    //   const value = feature.values_;
    //   vectorSource.addFeature(feature);
    //   feature.setStyle(styleFunction());
    // });

    //加面的
    features.forEach(feature => {
      const value = feature.values_;
      //其他属性
      const gridCode = value.GridCode;
      const geometry = feature.getGeometry();
      vectorSource.addFeature(feature);
      //设置样式
      const styles = new Style({
        fill: new Fill({
          // color: 'rgba(0, 51, 102, 0.2)'
          color: `rgba(26,155,232,0.3)`
        }),
        stroke: new Stroke({
          // color: 'rgba(255,204,51,0.8)', //#ffcc33
          // color: 'rgba(0, 255, 0, 0.5)', //#ffcc33
          // color: 'rgba(0, 51, 102, 0.7)',
          color: `rgba(26,155,232,0.7)`,
          width: 1
        })
      });
      feature.setStyle(styles);
    });
    var vectorLayer = new VectorLayer({
      source: vectorSource,
      name: "geojson_layer"
    });
    this.map.addLayer(vectorLayer);
    const extent = vectorSource.getExtent();
    this.map.getView().fit(extent, { padding: [150, 150, 150, 150] });
    return vectorLayer;
  }

  // 获取矢量图层源
  getVectorSource() {
    const layers = this.map.getLayers().getArray();
    for (let layer of layers) {
      if (layer instanceof VectorLayer) {
        return layer.getSource();
      }
    }
    return null;
  }

  // 根据名称查找图层 未找到返回undefined
  findLayerByName(layerName) {
    const layers = this.map.getLayers().getArray();
    const layer = layers.find(layer => layer.get("name") === layerName);
    return layer;
  }

  // 清空矢量图层
  clearVectorLayer() {
    const vectorSource = this.getVectorSource();
    if (vectorSource) {
      vectorSource.clear();
    }
  }

  // 根据图层名称，清除图层所有要素
  clearFeaturesByLayerName(name) {
    const findLayer = this.findLayerByName(name);
    if (findLayer) {
      // 获取图层中所有要素
      const features = findLayer.getSource().getFeatures();
      features.forEach(feature => {
        findLayer.getSource().removeFeature(feature);
      });
    } else {
      console.warn("REMOVE LAYER: not find layer.");
    }
  }

  // 根据名称删除图层
  removeLayerByName(name) {
    var layers = this.map.getLayers().getArray();
    var layerToRemove = null;
    layers.forEach(function(layer) {
      if (layer.get("name") === name) {
        layerToRemove = layer;
      }
    });
    if (layerToRemove) {
      // layers.remove(layerToRemove);
      this.map.removeLayer(layerToRemove);
      console.log("Removed layer:", name);
    } else {
      console.log("Layer not found:", name);
    }
  }

  // 根据坐标范围设置地图视图
  fitExtent(extent, options) {
    this.map.getView().fit(extent, options);
  }

  // 获取地图视图的投影
  getProjection() {
    return this.map.getView().getProjection();
  }

  // 获取当前地图的zoom等级
  getZoom() {
    return this.map.getView().getZoom();
  }

  // 获取当前地图的中心点坐标
  getCenter() {
    return this.map.getView().getCenter();
  }

  // 获取当前地图的extent
  getExtent() {
    return this.map.getView().calculateExtent(this.map.getSize());
  }

  // 获取当前地图的中心点坐标（转换为经纬度）
  getCenterAsLonLat() {
    const center = this.map.getView().getCenter();
    return toLonLat(center);
  }

  // 获取当前地图的extent（转换为经纬度）
  getExtentAsLonLat() {
    const extent = this.map.getView().calculateExtent(this.map.getSize());
    return [toLonLat([extent[0], extent[1]]), toLonLat([extent[2], extent[3]])];
  }

  //load geojson
  loadAndProcessGeoJSON(geojsonUrl) {
    return new Promise((resolve, reject) => {
      const geojsonSource = new VectorSource({
        url: geojsonUrl,
        format: new GeoJSON()
      });

      const vectorLayer = new VectorLayer({
        source: geojsonSource,
        name: "base_map"
      });

      this.map.addLayer(vectorLayer);

      vectorLayer.getSource().on("change", event => {
        if (vectorLayer.getSource().getState() === "ready") {
          const features = vectorLayer.getSource().getFeatures();
          resolve(features);
        }
      });
    });
  }

  // ========================格式判断============================
  identifyColorFormat(color) {
    const rgbaPattern = /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/;
    const rgbPattern = /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/;
    // 十六进制
    const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;

    let format = "Unknown";
    if (rgbaPattern.test(color)) {
      format = "RGBA";
    } else if (rgbPattern.test(color)) {
      format = "RGB";
    } else if (hexPattern.test(color)) {
      format = "Hex";
    } else {
      format = "Unknown";
    }

    console.log("format color: ", format);

    return ["RGBA", "RGB", "Hex"].includes(color) ? true : false;
  }

  // ========================draw tool============================
  addDrawInteraction0(geometryType) {
    // 清除之前的绘制交互
    this.map.getInteractions().forEach(interaction => {
      if (interaction instanceof Draw) {
        this.map.removeInteraction(interaction);
      }
    });

    //只创建一次base_draw_layer
    if (!this.findLayerByName("base_draw_layer")) {
      // 创建新的绘制交互
      var source = new VectorSource({
        name: "base_draw_layer"
      });
      var vectorLayer = new VectorLayer({
        name: "base_draw_layer",
        source: source,
        style: new Style({
          fill: new Fill({
            color: "rgba(255, 255, 255, 0.2)"
          }),
          stroke: new Stroke({
            color: "#ffcc33",
            width: 2
          }),
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({
              color: "#ffcc33"
            })
          })
        })
      });
      this.map.addLayer(vectorLayer);
    }

    const targetLayer = this.findLayerByName("base_draw_layer");

    const draw = new Draw({
      source: targetLayer.getSource(),
      type: geometryType,
      style: new Style({
        fill: new Fill({
          color: "rgba(255, 255, 255, 0.2)"
        }),
        stroke: new Stroke({
          color: "#ffcc33",
          width: 2
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: "#ffcc33"
          })
        })
      })
    });

    // draw.on('drawend', event => {
    //   let feature = event.feature;
    //   let geom = feature.getGeometry();
    //   let coordinates = geom.getCoordinates();
    //   console.log('drawend ...', feature, geom, coordinates);
    //   //feature.getType(), feature.getRadius()
    //   //Circle对象
    //   if (geom.getType() === 'Circle') {
    //     console.log('Circle ...', feature, coordinates, geom, geom.getCenter(), geom.getRadius(), geom.getType());
    //   }
    // });

    this.map.addInteraction(draw);

    return draw;
  }

  addDrawInteraction(geometryType, styleOptions = {}) {
    // 清除之前的绘制交互
    this.map.getInteractions().forEach(interaction => {
      if (interaction instanceof Draw) {
        this.map.removeInteraction(interaction);
      }
    });

    // 确保绘制图层存在
    const vectorLayer = this.getOrCreateDrawLayer("wktPolygon_0");
    const source = vectorLayer.getSource();

    // 创建绘制工具
    const draw = new Draw({
      source: source,
      type: geometryType,
      style: this.createDrawStyle(styleOptions)
    });

    // 添加绘制工具到地图
    this.map.addInteraction(draw);

    return draw;
  }
  // 获取或创建绘制图层
  getOrCreateDrawLayer(layerName) {
    let layer = this.findLayerByName(layerName);
    // if (!layer) {
    //   const source = new VectorSource({ name: layerName });
    //   layer = new VectorLayer({
    //     name: layerName,
    //     source: source,
    //     style: this.createDrawStyle()
    //   });
    //   // this.map.addLayer(layer);
    // }
    return layer;
  }

  // 创建绘制样式
  createDrawStyle({
    fillColor = "rgba(255, 255, 255, 0.2)",
    strokeColor = "#ffcc33",
    strokeWidth = 2,
    circleRadius = 7
  } = {}) {
    return new Style({
      fill: new Fill({
        color: fillColor
      }),
      stroke: new Stroke({
        color: strokeColor,
        width: strokeWidth
      }),
      image: new CircleStyle({
        radius: circleRadius,
        fill: new Fill({
          color: strokeColor
        })
      })
    });
  }

  /**
   * 从指定图层中移除具有特定属性值的特征
   * @param {ol.layer.Vector} layerName - 要处理的图层名
   * @param {string} attribute - 特征的属性名
   * @param {string} value - 属性值，用于匹配特征
   */
  removeFeaturesByAttribute(layerName, attribute, value) {
    let layer = this.findLayerByName(layerName);
    if (!layer) {
      console.error("removeFeaturesByAttribute: layar not find ...");
      return;
    }
    var source = layer.getSource();
    var features = source.getFeatures();
    features.forEach(function(feature) {
      console.log("removeFeaturesByAttribute ", feature.get(attribute));
      if (feature.get(attribute) === value) {
        source.removeFeature(feature);
      }
    });
  }

  // createPolygon(coordinates) {
  //   return new Polygon(coordinates);
  // }
  // ========================转换工具wkt tool============================
  // 转换工具
  // 将点几何对象转换为 WKT 格式的字符串
  // 形如： [0, 0]
  convertPointToWKT(pointGeometry) {
    return this.WKT_FORMAT.writeGeometry(pointGeometry);
  }

  // 将线几何对象转换为 WKT 格式的字符串
  // 形如： [[0, 0], [10, 10]]
  convertLineStringToWKT(lineStringGeometry) {
    return this.WKT_FORMAT.writeGeometry(lineStringGeometry);
  }

  // 将面几何对象转换为 WKT 格式的字符串
  // 形如： [[[0, 0], [10, 0], [10, 10], [0, 10], [0, 0]]]
  convertPolygonToWKT(polygonGeometry) {
    return this.WKT_FORMAT.writeGeometry(polygonGeometry);
  }

  /**
   * 判断wktstring是单面还是多面
   * @param {string} wktstring
   * @returns
   */
  getWktType(wktstring) {
    if (wktstring.startsWith("POLYGON")) {
      return "POLYGON";
    } else if (wktstring.startsWith("MULTIPOLYGON")) {
      return "MULTIPOLYGON";
    } else {
      return "Unknown";
    }
  }

  /**
   * 判断polygon的坐标是几层[]
   * @param {} wktstring
   * @returns
   */
  getPolygonCoordsType(wktstring) {
    if (wktstring.startsWith("POLYGON")) {
      return "POLYGON";
    } else if (wktstring.startsWith("MULTIPOLYGON")) {
      return "MULTIPOLYGON";
    } else {
      return "Unknown";
    }
  }

  /**
   * 生成矩形网格
   * @param {*} extent 范围
   * @param {*} distance 距离
   */
  getSquareGrid(extent, distance = 1) {
    console.log("getSquareGrid ...", extent, distance);
    let bbox = extent;
    const cellSide = distance; //option不传默认1km
    // var options = { units: "miles" };
    const options = { units: "kilometers" }; //默认值千米
    const grid = turf.squareGrid(bbox, cellSide, options);

    return grid;
  }
  /**
   * coords格式转换 [[]] <=> [[[]]]
   * @param {Array} coords
   * @param {Boolean} toNested 是否转换为嵌套结构 [[]] => [[[]]]
   * @returns
   */
  normalizeCoords(coords, toNested = false) {
    if (toNested) {
      // 如果需要转换为嵌套结构 [[[x1,y1],[x2,y2]]]
      if (!Array.isArray(coords[0][0])) {
        return [coords];
      }
    } else {
      // 如果需要转换为非嵌套结构 [[x1,y1],[x2,y2]]
      if (Array.isArray(coords[0][0])) {
        return coords[0];
      }
    }
    return coords;
  }
  /**
   * 获取turf生成的polygon
   * polygonCoords => [[x1, y1], [x2, y2], [x3, y3], [x1, y1]]
   * @param {*} polygonCoords
   * @param {*} options
   * @returns
   */
  getTurfPolygon(polygonCoords = [], options = {}) {
    const isMulti = polygonCoords.length > 1 ? true : false;
    if (options.name) {
      return isMulti
        ? turf.multiPolygon(polygonCoords, { name: options.name })
        : turf.polygon(polygonCoords, { name: options.name });
    } else {
      return isMulti
        ? turf.multiPolygon(polygonCoords)
        : turf.polygon(polygonCoords);
    }
  }
  /**
   * 根据网格模式mode保存网格坐标geojson
   * @param {*} polygonCoords
   * @param {*} gridData
   * @param {*} mode
   * @returns
   */
  getGridInteractionByMode0(polygonCoords, gridData, mode = "extent") {
    const poly1 = this.getTurfPolygon(polygonCoords);
    const { features } = gridData;

    let intersectionCoords = [];
    console.time("time: ");
    for (let i = 0; i < features.length; i++) {
      const item = features[i];
      const coordinates = item.geometry.coordinates;
      const poly2 = this.getTurfPolygon(coordinates);

      if (!turf.booleanIntersects(poly1, poly2)) continue;

      //获取交集，无交集返回null
      //featureCollection
      const intersection = turf.intersect(poly1, poly2);
      // console.log('intersection ...', intersection);

      if (mode === "grid") {
        //只保留网格
        if (intersection) {
          // const coords = intersection.geometry.coordinates[0];
          intersectionCoords.push(item);
        }
      }
      if (mode === "extent") {
        // generateSquareGrid2(1, bj_wkt_extent_new);
      }
      if (mode === "interaction") {
        //边界裁剪网格，只保留相交部分 (这个没问题)
        if (intersection) {
          intersectionCoords.push(intersection);
          // intersectionCoords.push({
          //   properties: { name: `GRID-${i}` },
          //   coords: coords
          // });
          // addPolygonByCoords(coords, {
          //   strokeColor: 'blue', //"#e2e2e2",
          //   strokeWidth: 2,
          //   fillColor: 'rgba(255, 255, 0, 0.7)'
          // });
        }
      }
    }
    console.timeEnd("time: ");

    if (mode === "grid") {
      // const gridGeoJson = {
      //   ...gridData,
      //   features: intersectionCoords
      // };
      gridGeoJson.features = intersectionCoords;
      console.log("返回结果 ...1", gridGeoJson);
      return gridGeoJson;
    }

    console.log("返回结果 ...2", intersectionCoords);

    if (mode === "interaction") {
      // const gridGeoJson = {
      //   ...gridData,
      //   features: intersectionCoords
      // };
      gridGeoJson.features = intersectionCoords;
      console.log("返回结果 ...3", gridGeoJson);
      return gridGeoJson;
    }

    return intersectionCoords;
  }

  async getGridInteractionByMode(polygonCoords, gridData, mode = "extent") {
    // const bj_polygon = this.getTurfPolygon(polygonCoords);
    const tolerance = mode === "interaction" ? 0.0001 : 0.001; // 设置简化的公差，值越大，简化程度越高
    const highQuality = true; // 是否高质量简化（更慢，但更精确）
    const poly1 = turf.simplify(this.getTurfPolygon(polygonCoords), {
      tolerance,
      highQuality
    });
    // const simplifiedPolygon = turf.simplify(bj_polygon, {
    //   tolerance: 0.005,  // 设置简化的公差，值越大，简化程度越高
    //   highQuality: true  // 是否高质量简化（更慢，但更精确）
    // });
    // const poly1 = turf.simplify(simplifiedPolygon);
    var poly1Bbox = turf.bbox(poly1);
    const { features } = gridData;

    console.time("filter");
    // const overlapFeatures = features.map(feature =>{
    //   const coords = feature.geometry.coordinates;
    //   const cellPolygon = this.getTurfPolygon(coords);
    //   if(turf.booleanOverlap(this.getTurfPolygon(polygonCoords), cellPolygon)){
    //     return feature;
    //   }
    // })
    console.timeEnd("filter");

    // 使用RBush建立空间索引
    const tree = new RBush();
    const boundingBoxes = features.map((item, index) => {
      const bbox = turf.bbox(item);
      return {
        minX: bbox[0],
        minY: bbox[1],
        maxX: bbox[2],
        maxY: bbox[3],
        index
      };
    });
    tree.load(boundingBoxes);

    // 查找可能相交的网格
    const potentialIntersections = tree.search({
      minX: poly1Bbox[0],
      minY: poly1Bbox[1],
      maxX: poly1Bbox[2],
      maxY: poly1Bbox[3]
    });

    let intersectionCoords = [];
    console.time("time: ");

    const promises = potentialIntersections.map(bbox => {
      const item = features[bbox.index];
      const coordinates = item.geometry.coordinates;
      const poly2 = this.getTurfPolygon(coordinates);

      return new Promise(resolve => {
        const intersection = turf.intersect(poly1, poly2);
        if (intersection) {
          if (mode === "grid") {
            resolve(item);
          } else if (mode === "interaction") {
            resolve(intersection);
          }
        } else {
          resolve(null);
        }
      }).catch(e => {
        console.log(e);
      });
    });

    return await Promise.all(promises)
      .then(results => {
        intersectionCoords = results.filter(Boolean); // 过滤掉 null 值

        console.timeEnd("time: ");
        console.time("time2: ");
        if (mode === "grid" || mode === "interaction") {
          // const gridGeoJson = {
          //   ...gridData,
          //   features: intersectionCoords
          // };
          gridData.features = intersectionCoords;
          console.log("返回结果 ...1", gridData);
          return gridData;
        }
        console.timeEnd("time2: ");
        console.log("返回结果 ...2", intersectionCoords);
        return intersectionCoords;
      })
      .catch(e => {
        console.log(e);
      });
  }

  async getGridInteractionByMode2(polygonCoords, gridData, mode = "extent") {
    const poly1 = this.getTurfPolygon(polygonCoords);
    const { features } = gridData;

    const chunkSize = 1000; // 每次处理1000个网格
    let intersectionCoords = [];

    console.time("time: ");
    for (let i = 0; i < features.length; i += chunkSize) {
      const chunk = features.slice(i, i + chunkSize);

      const promises = chunk.map(item => {
        const coordinates = item.geometry.coordinates;
        const poly2 = this.getTurfPolygon(coordinates);

        return new Promise(resolve => {
          const intersection = turf.intersect(poly1, poly2);
          if (intersection) {
            if (mode === "grid") {
              resolve(item);
            } else if (mode === "interaction") {
              resolve(intersection);
            }
          } else {
            resolve(null);
          }
        });
      });

      const results = await Promise.all(promises);
      intersectionCoords = intersectionCoords.concat(results.filter(Boolean)); // 过滤掉 null 值
    }
    console.timeEnd("time: ");

    if (mode === "grid" || mode === "interaction") {
      const gridGeoJson = {
        ...gridData,
        features: intersectionCoords
      };
      return gridGeoJson;
    }

    return intersectionCoords;
  }

  getGridInteractionByMode3(polygonCoords, gridData, mode = "extent") {
    // const poly1 = this.getTurfPolygon(polygonCoords);
    // const { features } = gridData;
    // let intersectionCoords = [];
    // const workers = [];
    // console.time('time: ');
    // features.forEach((item, i) => {
    //     workers[i] = new Worker('./worker.js');
    //     workers[i].postMessage({ poly1, item, mode });
    //     workers[i].onmessage = function(e) {
    //       debugger
    //         if (e.data) {
    //             intersectionCoords.push(e.data.item || e.data.intersection);
    //         }
    //         if (i === features.length - 1) {
    //             console.timeEnd('time: ');
    //             if (mode === 'grid' || mode === 'interaction') {
    //                 const gridGeoJson = {
    //                     ...gridData,
    //                     features: intersectionCoords
    //                 };
    //                 return gridGeoJson;
    //             }
    //         }
    //     };
    // });
  }

  getGridInteractionByMode4(polygonCoords, gridData, mode = "extent") {
    const bufferSize = 0.001; // 设置一个适当的缓冲区大小
    const poly1 = turf.buffer(this.getTurfPolygon(polygonCoords), bufferSize);

    const { features } = gridData;
    let intersectionCoords = [];
    console.time("time: ");

    for (let i = 0; i < features.length; i++) {
      const item = features[i];
      const coordinates = item.geometry.coordinates;
      const poly2 = turf.buffer(this.getTurfPolygon(coordinates), bufferSize);

      // 获取缓冲区的交集
      const intersection = turf.intersect(poly1, poly2);

      if (mode === "grid" && intersection) {
        intersectionCoords.push(item);
      } else if (mode === "interaction" && intersection) {
        intersectionCoords.push(intersection);
      }
    }

    console.timeEnd("time: ");

    if (mode === "grid" || mode === "interaction") {
      const gridGeoJson = {
        ...gridData,
        features: intersectionCoords
      };
      return gridGeoJson;
    }

    return intersectionCoords;
  }

  /**
   * 根据模式生成网格，并添加地图中 0815
   * @param {*} polygonCoords 区域坐标
   * @param {*} gridData 网格geojson数据
   * @param {*} mode extent|grid|interaction
   * @returns
   */
  async generateSquareGridByMode(polygonCoords, gridData, mode = "extent") {
    console.log("mapservice generateSquareGridByMode ...", mode);

    //TODO 求交集网格数据
    const squareGrid = await this.getGridInteractionByMode(
      polygonCoords,
      gridData,
      mode
    );
    console.log("generateSquareGridByMode ...", squareGrid);
    if (!squareGrid) {
      console.warn("no interaction grid ...");
    }

    const targetLayer = this._addGridToMap(squareGrid, "grid_layer_0");
    return targetLayer;
  }

  /**
   * 添加结果网格到地图
   * @param {*} gridData geojson
   * @param {*} layerName
   * @returns
   */
  _addGridToMap(gridData, layerName) {
    //判断图层是否存在
    let targetLayer = this.findLayerByName(layerName);
    if (targetLayer) {
      // 如果图层存在，添加新的要素到该图层
      const source = targetLayer.getSource();
      //清除图层所有要素
      source.clear();
      const features = new GeoJSON().readFeatures(gridData);
      source.addFeatures(features);
    } else {
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(gridData)
      });
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        // properties:{
        //   name: 'grid_layer_0'
        // }
        name: "grid_layer_0",
        style: new Style({
          // fill: new Fill({
          //   color: 'rgba(255, 255, 255, 0.2)'
          // }),
          stroke: new Stroke({
            // color: 'rgba(255,204,51,0.8)', //#ffcc33
            color: "rgba(0, 255, 0, 0.7)", //#ffcc33
            // color: 'rgba(255, 255, 255, 0.7)', //#ffcc33
            width: 1
          })
          // image: new CircleStyle({
          //   radius: 7,
          //   fill: new Fill({
          //     color: '#ffcc33'
          //   })
          // })
        }),
        zIndex: 0
      });
      this.map.addLayer(vectorLayer);
      targetLayer = vectorLayer;
    }

    return targetLayer;
  }

  /**
   * 根据距离计算extent缓冲区 默认单位千米
   * @param {*} distance
   */
  calculateBufferedExtent(extent = [-180, -90, 180, 90], distance = 1) {
    const bufferedExtent = turf.bbox(
      turf.buffer(turf.bboxPolygon(extent), distance / 2)
    );
    return { bufferedExtent };
  }

  /**
   * 根据距离自适应扩展extent
   * @param {*} extent 要素范围
   * @param {*} distance 距离, 单位km
   * @returns
   */
  calculateExpandExtent(extent = [-180, -90, 180, 90], distance = 5) {
    const [minX, minY, maxX, maxY] = extent;

    // 计算每度经度和纬度的实际千米长度
    const latToKm = 111.32;
    const lonToKm = 111.32 * Math.cos((((minY + maxY) / 2) * Math.PI) / 180);

    // 将千米转换为度数
    const distanceInLat = distance / latToKm;
    const distanceInLon = distance / lonToKm;

    // 计算当前宽度和高度
    const width = maxX - minX;
    const height = maxY - minY;

    // 计算需要扩展的度数
    const widthRemainder = width % distanceInLon;
    const heightRemainder = height % distanceInLat;

    const widthExpand =
      widthRemainder === 0 ? 0 : distanceInLon - widthRemainder;
    const heightExpand =
      heightRemainder === 0 ? 0 : distanceInLat - heightRemainder;

    return {
      widthExpand,
      heightExpand,
      expandedExtent: [
        minX - widthExpand,
        minY - heightExpand,
        maxX + widthExpand,
        maxY + heightExpand
      ]
    };
  }

  /**
   * 获取要素的geojson格式
   * @param {*} targetLayer 操作的图层对象
   * @param {*} isNeedString 是否返回字符串
   * @returns
   */
  getGeojsonByLayer(targetLayer, isNeedString) {
    const features = targetLayer.getSource().getFeatures();
    // 创建 GeoJSON 格式器
    const geoJsonFormat = new GeoJSON();
    // 将要素转换为 GeoJSON 格式
    const geojson = geoJsonFormat.writeFeaturesObject(features);
    // 是否需要字符串化
    if (isNeedString) {
      // return JSON.stringify(geojson, null, 2);
      return JSON.stringify(geojson, this.customReplacer);
    }
    return geojson;
  }

  // 自定义的 replacer 函数来避免将空对象转换为 null
  customReplacer(key, value) {
    // 如果值是一个对象且为空对象，则返回一个空对象字符串
    if (
      typeof value === "object" &&
      value !== null &&
      Object.keys(value).length === 0
    ) {
      return "{}";
    }
    return value;
  }

  // 事件
  // 注册事件监听器
  addEventListener(eventType, callback) {
    if (!this.eventListeners[eventType]) {
      this.eventListeners[eventType] = [];
    }
    this.eventListeners[eventType].push(callback);
    this.map.on(eventType, callback);
  }

  // 移除事件监听器
  removeEventListener(eventType, callback) {
    if (this.eventListeners[eventType]) {
      const index = this.eventListeners[eventType].indexOf(callback);
      if (index > -1) {
        this.eventListeners[eventType].splice(index, 1);
      }
    }
    this.map.un(eventType, callback);
  }

  // 清除所有事件监听器
  removeAllEventListeners() {
    for (const eventType in this.eventListeners) {
      this.eventListeners[eventType].forEach(callback => {
        this.map.un(eventType, callback);
      });
    }
    this.eventListeners = {};
  }

  // 初始化地图交互事件监听
  initMapInteractionEvents() {
    // 监听地图移动结束事件（包括缩放、平移）
    this.addEventListener("moveend", () => {
      // 获取当前地图信息
      const mapInfo = {
        zoom: this.getZoom(),
        center: this.getCenter(),
        centerLonLat: this.getCenterAsLonLat(),
        extent: this.getExtent(),
        extentLonLat: this.getExtentAsLonLat()
      };

      // 触发自定义地图信息变化事件
      this._triggerMapInfoChangeEvent(mapInfo);
    });
  }

  // 触发地图信息变化事件
  _triggerMapInfoChangeEvent(mapInfo) {
    // 检查是否有监听器注册了map-info-change事件
    if (this.eventListeners["map-info-change"]) {
      this.eventListeners["map-info-change"].forEach(callback => {
        try {
          callback(mapInfo);
        } catch (error) {
          console.error("Error in map-info-change listener:", error);
        }
      });
    }
  }

  // 添加边界阴影样式方法(已移至StyleManager.js)
  getBoundaryShadowStyle({
    strokeColor = "rgba(26,155,232,0.7)",
    strokeWidth = 1,
    fillColor = "rgba(26,155,232,0.3)",
    shadowColor = "rgba(128, 0, 128, 0.5)",
    shadowBlur = 10
  } = {}) {
    // 创建阴影样式
    const shadowStyle = new Style({
      stroke: new Stroke({
        color: shadowColor,
        width: strokeWidth + shadowBlur
      })
    });

    // 创建主样式
    const mainStyle = new Style({
      fill: new Fill({
        color: fillColor
      }),
      stroke: new Stroke({
        color: strokeColor,
        width: strokeWidth
      })
    });

    // 返回样式数组，先绘制阴影再绘制主样式
    return [shadowStyle, mainStyle];
  }
}

export default MapService;
