// src/features/PointManager_0.ts
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Style, Icon, Text, Fill, Stroke } from 'ol/style';
import { Map } from 'ol';

interface PointData {
  longitude: number;
  latitude: number;
  stnm: string;
  id?: string;
  styleConfig?: any;
  hoverStyleConfig?: any;
}

interface PointManagerOptions {
  map: Map;
  defaultIcon: string;
  hoverIcon?: string;
}

export class PointManager {
  private map: Map;
  private vectorLayer: VectorLayer<any>;
  private lastFeature: any;
  private options: PointManagerOptions;

  constructor(options: PointManagerOptions) {
    this.map = options.map;
    this.options = options;
    this.vectorLayer = new VectorLayer({
      source: new VectorSource(),
      zIndex: 11,
    });
    this.map.addLayer(this.vectorLayer);
  }

  addPoints(points: PointData[]) {
    // ... 填入你封装好的 addPoints 逻辑 ...
  }

  clearPoints() {
    this.vectorLayer.getSource().clear();
  }

  getLayer() {
    return this.vectorLayer;
  }
}
