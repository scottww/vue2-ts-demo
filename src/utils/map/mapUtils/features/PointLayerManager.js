// PointLayerManager.js
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Style, Icon, Text, Fill, Stroke } from "ol/style";

export class PointLayerManager {
  constructor(map, mapService) {
    this.map = map;
    this.mapService = mapService; // 注入依赖的 mapService（用于文字样式）
    this.vectorLayer = new VectorLayer({
      source: new VectorSource(),
      zIndex: 11,
    });
    this.lastFeature = null;
    map.addLayer(this.vectorLayer);
  }

  getIconStyle(src, scale = 0.5) {
    return new Style({
      image: new Icon({
        src,
        anchor: [0.5, 1],
        scale,
      }),
    });
  }

  getTextStyle(text = '', offsetY = -40, fillColor = 'rgba(0,107,255, 0.4)') {
    return new Text({
      text,
      textAlign: 'center',
      font: '14px PingFangSC-Regular',
      fill: new Fill({ color: '#fff' }),
      offsetY,
      padding: [6, 6, 3, 6],
      backgroundFill: new Fill({ color: fillColor }),
      backgroundStroke: new Stroke({ color: 'rgba(0, 0, 0, 0)', width: 1 }),
    });
  }

  /**
   * 添加点数据, 样式固定了，不灵活
   * @param {*} pointList [{longitude, latitude, stnm, id}]
   * @param {*} icon 图标地址
   * @param {*} hoverIcon 悬浮图标地址
   */
  // addPoints(pointList = [], icon, hoverIcon) {
  //   const baseStyle = this.getIconStyle(icon, 0.5);
  //   const hoverStyleFn = (feature) => {
  //     const style = this.getIconStyle(hoverIcon || icon, 0.6);
  //     style.setText(this.getTextStyle(feature.get('stnm'), -40));
  //     return style;
  //   };

  //   pointList.forEach((item) => {
  //     if (item.longitude && item.latitude) {
  //       const feature = new Feature({
  //         geometry: new Point([item.longitude, item.latitude]),
  //         stnm: item.stnm,
  //         id: item.id || '',
  //       });

  //       const style = baseStyle.clone();
  //       style.setText(this.getTextStyle(item.stnm, -40));
  //       feature.setStyle(style);
  //       feature.set('defaultStyle', style);
  //       this.vectorLayer.getSource().addFeature(feature);
  //     }
  //   });

  //   this._enableHover(hoverStyleFn);
  // }

  addPoints(pointList = [], options = {}) {
    const {
      icon,
      hoverIcon,
      scale = 0.5,
      hoverScale = 0.6,
      textStyle = {},
      hoverTextStyle = {},
    } = options;
  
    const getIconStyle = (src, scaleVal) =>
      new Style({
        image: new Icon({
          src,
          anchor: [0.5, 1],
          scale: scaleVal,
        }),
      });
  
    const getText = (text, styleOpt = {}) => {
      const {
        offsetY = -40,
        font = '14px PingFangSC-Regular',
        fillColor = '#fff',
        bgColor = 'rgba(0,107,255, 0.4)',
      } = styleOpt;
  
      return new Text({
        text,
        textAlign: 'center',
        font,
        fill: new Fill({ color: fillColor }),
        offsetY,
        padding: [6, 6, 3, 6],
        backgroundFill: new Fill({ color: bgColor }),
        backgroundStroke: new Stroke({ color: 'rgba(0, 0, 0, 0)', width: 1 }),
      });
    };
  
    const hoverStyleFn = (feature) => {
      const style = getIconStyle(hoverIcon || icon, hoverScale);
      style.setText(getText(feature.get('stnm'), hoverTextStyle));
      return style;
    };
  
    pointList.forEach((item) => {
      if (item.longitude && item.latitude) {
        const feature = new Feature({
          geometry: new Point([item.longitude, item.latitude]),
          stnm: item.stnm,
          id: item.id || '',
        });
  
        const style = getIconStyle(icon, scale);
        style.setText(getText(item.stnm, textStyle));
  
        feature.setStyle(style);
        feature.set('defaultStyle', style);
  
        this.vectorLayer.getSource().addFeature(feature);
      }
    });
  
    this._enableHover(hoverStyleFn);
  }
  

  _enableHover(getHoverStyle) {
    this.map.on('pointermove', (evt) => {
      let hit = false;
      this.map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
        if (layer === this.vectorLayer) {
          hit = true;

          if (this.lastFeature && this.lastFeature !== feature) {
            const style = this.lastFeature.get('defaultStyle');
            this.lastFeature.setStyle(style);
          }

          feature.setStyle(getHoverStyle(feature));
          this.lastFeature = feature;
        }
      });

      if (!hit && this.lastFeature) {
        const style = this.lastFeature.get('defaultStyle');
        this.lastFeature.setStyle(style);
        this.lastFeature = null;
      }

      this.map.getTargetElement().style.cursor = hit ? 'pointer' : '';
    });
  }
}
