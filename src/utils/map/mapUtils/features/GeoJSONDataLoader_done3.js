import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Fill, Stroke } from 'ol/style';
import Feature from 'ol/Feature';
import { Polygon } from 'ol/geom';

export default class GeoJSONDataLoader {
  constructor(map) {
    this.map = map;
    this.dataLayers = {}; // 存储不同类型的数据图层
    this.currentDataType = null; // 当前显示的数据类型
    this.defaultStyles = {
      gdmj: new Style({
        fill: new Fill({ color: 'rgba(255, 165, 0, 0.3)' }),
        stroke: new Stroke({ color: '#ff8c00', width: 1 })
      }),
      gdbh: new Style({
        fill: new Fill({ color: 'rgba(255, 0, 0, 0.3)' }),
        stroke: new Stroke({ color: '#ff0000', width: 1 })
      })
    };
    
    // 卷帘功能相关属性
    this.swipeEnabled = false; // 是否启用卷帘
    this.baseLayerType = null; // 基础图层类型
    this.compareLayerType = null; // 比较图层类型
    this.swipePosition = 0.5; // 卷帘位置（0-1之间，默认中间）
    this.swipeMask = null; // 卷帘遮罩
    
    // 种植结构类别颜色映射
    this.zzjgColorMap = {
      '苗木': { fill: 'rgba(144, 238, 144, 0.3)', stroke: '#32CD32' }, // 浅绿色
      '果园': { fill: 'rgba(255, 215, 0, 0.3)', stroke: '#FFD700' },  // 金色
      '茶园': { fill: 'rgba(0, 255, 255, 0.3)', stroke: '#00FFFF' },  // 青色
      '其他': { fill: 'rgba(128, 128, 128, 0.3)', stroke: '#808080' }   // 灰色
    };
    
    // 种植结构样式函数
    this.zzjgStyleFunction = (feature) => {
      // 获取所有属性
      const properties = feature.getProperties();
      console.log('Feature properties:', properties);
      
      // 优先查找DLMC字段（用户提供的正确字段名）
      let dimc = feature.get('DLMC');
      if (!dimc) {
        dimc = feature.get('dlmc'); // 小写
      }
      // 如果还是没有找到，尝试其他可能的字段名
      if (!dimc) {
        dimc = feature.get('DIMC');
      }
      if (!dimc) {
        dimc = feature.get('dimc');
      }
      if (!dimc) {
        dimc = feature.get('NAME');
      }
      if (!dimc) {
        dimc = feature.get('name');
      }
      if (!dimc) {
        dimc = '其他';
      }
      
      console.log('Selected value:', dimc);
      
      // 获取颜色映射
      let color = this.zzjgColorMap[dimc];
      
      // 如果没有直接匹配，尝试关键字匹配
      if (!color) {
        for (const [key, value] of Object.entries(this.zzjgColorMap)) {
          if (dimc && dimc.includes(key)) {
            color = value;
            console.log('Matched by keyword:', key);
            break;
          }
        }
      }
      
      // 如果仍然没有匹配，使用默认颜色
      if (!color) {
        color = this.zzjgColorMap['其他'];
        console.log('Using default color');
      }
      
      return new Style({
        fill: new Fill({ color: color.fill }),
        stroke: new Stroke({ color: color.stroke, width: 1 })
      });
    };
  }

  // 根据类型加载GeoJSON数据
  async loadData(type, year = '2021', removeCurrent = true) {
    try {
      // 移除当前显示的图层（可选择）
      if (removeCurrent) {
        this.removeCurrentLayer();
      }

      // 检查是否已有该类型的图层
      if (!this.dataLayers[type]) {
        // 构建文件路径
        let fileName;
        switch (type) {
          case 'gdmj':
            fileName = `gdmj_${year}.json`;
            break;
          case 'gdbh':
            fileName = `gdbh_${year}.json`;
            break;
          case 'zzjg':
            fileName = `plant_${year}.json`; // 注意zzjg对应plant_2021.json
            break;
          default:
            console.error('未知的数据类型:', type);
            return false;
        }

        // 加载GeoJSON文件
        const response = await fetch(`/static/${fileName}`);
        if (!response.ok) {
          throw new Error(`加载数据失败: ${response.status}`);
        }

        const geoJsonData = await response.json();
        
        // 创建矢量数据源
        const source = new VectorSource({
          features: new GeoJSON().readFeatures(geoJsonData)
        });

        // 创建矢量图层
        let style;
        if (type === 'zzjg') {
          // 种植结构使用样式函数
          style = this.zzjgStyleFunction;
        } else {
          // 其他类型使用默认样式
          style = this.defaultStyles[type] || this.getDefaultStyle();
        }
        
        const layer = new VectorLayer({
          source: source,
          style: style,
          zIndex: 5
        });

        // 存储图层
        this.dataLayers[type] = layer;
      }

      // 添加图层到地图
      this.map.addLayer(this.dataLayers[type]);
      this.currentDataType = type;
      
      return true;
    } catch (error) {
      console.error('加载GeoJSON数据失败:', error);
      return false;
    }
  }

  // 移除当前显示的图层
  removeCurrentLayer() {
    if (this.currentDataType && this.dataLayers[this.currentDataType]) {
      this.map.removeLayer(this.dataLayers[this.currentDataType]);
    }
  }

  // 设置图层透明度
  setOpacity(opacity) {
    if (this.currentDataType && this.dataLayers[this.currentDataType]) {
      this.dataLayers[this.currentDataType].setOpacity(opacity / 100);
    }
  }

  // 获取默认样式
  getDefaultStyle() {
    return new Style({
      fill: new Fill({ color: 'rgba(0, 0, 255, 0.3)' }),
      stroke: new Stroke({ color: '#0000ff', width: 1 })
    });
  }

  // 获取当前数据类型
  getCurrentDataType() {
    return this.currentDataType;
  }

  // 清理资源
  destroy() {
    // 移除所有图层
    Object.values(this.dataLayers).forEach(layer => {
      this.map.removeLayer(layer);
    });
    this.dataLayers = {};
    this.currentDataType = null;
    
    // 清理卷帘功能
    this.disableSwipe();
  }
  
  // 初始化卷帘遮罩
  _initSwipeMask() {
    if (this.swipeMask) {
      return;
    }
    
    const extent = this.map.getView().calculateExtent(this.map.getSize());
    const width = extent[2] - extent[0];
    const maskPosition = extent[0] + width * this.swipePosition;
    
    // 创建垂直分割的遮罩多边形（右侧区域）
    const polygon = new Polygon([[
      [maskPosition, extent[1]],
      [extent[2], extent[1]],
      [extent[2], extent[3]],
      [maskPosition, extent[3]],
      [maskPosition, extent[1]]
    ]]);
    
    // 创建遮罩要素
    const maskFeature = new Feature({ geometry: polygon });
    
    // 创建遮罩样式 - 使用白色遮罩，覆盖在图层上
    const maskStyle = new Style({
      fill: new Fill({ color: 'rgba(255, 255, 255, 0.5)' })
    });
    maskFeature.setStyle(maskStyle);
    
    // 创建遮罩图层
    const maskSource = new VectorSource({ features: [maskFeature] });
    this.swipeMask = new VectorLayer({
      source: maskSource,
      zIndex: 7, // 确保遮罩在图层之上
      name: 'swipe-mask'
    });
    
    this.map.addLayer(this.swipeMask);
  }
  
  // 更新遮罩位置
  _updateSwipeMask() {
    if (!this.swipeMask || !this.swipeEnabled) {
      return;
    }
    
    const extent = this.map.getView().calculateExtent(this.map.getSize());
    const width = extent[2] - extent[0];
    const maskPosition = extent[0] + width * this.swipePosition;
    
    // 更新遮罩多边形
    const maskFeature = this.swipeMask.getSource().getFeatures()[0];
    const polygon = new Polygon([[
      [maskPosition, extent[1]],
      [extent[2], extent[1]],
      [extent[2], extent[3]],
      [maskPosition, extent[3]],
      [maskPosition, extent[1]]
    ]]);
    
    maskFeature.setGeometry(polygon);
  }
  
  // 启用卷帘功能
  enableSwipe() {
    if (this.swipeEnabled) {
      this.disableSwipe();
      return;
    }
    
    // 确保当前有图层加载
    if (!this.currentDataType || !this.dataLayers[this.currentDataType]) {
      console.error('启用卷帘失败：当前没有加载的图层');
      return false;
    }
    
    // 初始化并添加遮罩
    this._initSwipeMask();
    
    // 设置遮罩的z-index在当前图层之上
    this.swipeMask.setZIndex(7);
    
    // 启用卷帘
    this.swipeEnabled = true;
    
    // 监听地图视图变化事件
    this.moveEndListener = this._updateSwipeMask.bind(this);
    this.map.on('moveend', this.moveEndListener);
    
    return true;
  }
  
  // 禁用卷帘功能
  disableSwipe() {
    if (!this.swipeEnabled) {
      return;
    }
    
    // 移除事件监听
    if (this.moveEndListener) {
      this.map.un('moveend', this.moveEndListener);
      this.moveEndListener = null;
    }
    
    // 移除遮罩
    if (this.swipeMask) {
      this.map.removeLayer(this.swipeMask);
      this.swipeMask = null;
    }
    
    // 重置属性
    this.swipeEnabled = false;
    this.swipePosition = 0.5;
  }
  
  // 设置卷帘位置
  setSwipePosition(position) {
    // 确保位置在0-1之间
    this.swipePosition = Math.max(0, Math.min(1, position));
    
    // 如果卷帘已启用，更新遮罩
    if (this.swipeEnabled) {
      this._updateSwipeMask();
      return true;
    }
    
    return false;
  }
  
  // 获取当前卷帘位置
  getSwipePosition() {
    return this.swipePosition;
  }
  
  // 检查卷帘是否启用
  isSwipeEnabled() {
    return this.swipeEnabled;
  }
  
  // 获取基础图层类型
  getBaseLayerType() {
    return this.baseLayerType;
  }
  
  // 获取比较图层类型
  getCompareLayerType() {
    return this.compareLayerType;
  }
}