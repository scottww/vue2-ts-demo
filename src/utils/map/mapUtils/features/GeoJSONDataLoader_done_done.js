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
    this.swipePosition = 1; // 卷帘位置（0-1之间，默认中间）
    this.swipeDirection = 'vertical'; // 切割方向：'horizontal'（水平切割/上下滑动）或 'vertical'（垂直切割/左右滑动）
    this.moveEndListener = null; // 地图移动结束事件监听器
    
    // 种植结构类别颜色映射
    this.zzjgColorMap = {
      '水稻': { fill: 'rgba(65, 211, 254, 0.3)', stroke: '#41D3FE' },  // 天蓝色
      '茶园': { fill: 'rgba(23, 143, 255, 0.3)', stroke: '#178FFF' },  // 蓝色
      '果园': { fill: 'rgba(4, 212, 73, 0.3)', stroke: '#04D449' },    // 绿色
      '苗木': { fill: 'rgba(193, 122, 3, 0.3)', stroke: '#C17A03' },   // 深金色 / 橙棕色
      '其他': { fill: 'rgba(253, 197, 1, 0.3)', stroke: '#FDC501' }    // 金黄色
    };
    
    // 种植结构样式函数
    this.zzjgStyleFunction = (feature) => {
      // 获取所有属性
      const properties = feature.getProperties();
      console.log('Feature properties:', properties);
      
      let type = feature.get('DLMC');
      if (!type) {
        dimc = '其他';
      }
      
      console.log('Selected value:', type);
      
      // 获取颜色映射
      let color = this.zzjgColorMap[type];
      
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

      // 确保图层在地图上
      this.map.addLayer(this.dataLayers[type]);
      
      this.currentDataType = type;
      
      // 确保在加载新图层时，根据卷帘状态更新裁剪范围
      if (this.swipeEnabled) {
        this._updateLayerClipExtent();
      } else {
        // 卷帘禁用时清除裁剪范围
        this.dataLayers[type].setExtent(null);
      }
      
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
  
  // 更新图层裁剪范围
  _updateLayerClipExtent() {
    if (!this.swipeEnabled || !this.currentDataType || !this.dataLayers[this.currentDataType]) {
      // 确保在卷帘禁用时清除裁剪范围
      if (this.currentDataType && this.dataLayers[this.currentDataType]) {
        this.dataLayers[this.currentDataType].setExtent(null);
      }
      return;
    }
    
    const layer = this.dataLayers[this.currentDataType];
    const extent = this.map.getView().calculateExtent(this.map.getSize());
    let clipExtent;
    
    if (this.swipeDirection === 'horizontal') {
      // 水平切割（上下滑动）：只显示遮罩上方的内容
      const height = extent[3] - extent[1];
      const maskPosition = extent[3] - height * this.swipePosition;
      
      clipExtent = [
        extent[0], // 左边界
        maskPosition, // 下边界（卷帘位置）
        extent[2], // 右边界
        extent[3]  // 上边界
      ];
    } else {
      // 垂直切割（左右滑动）：只显示遮罩左侧的内容
      const width = extent[2] - extent[0];
      const maskPosition = extent[0] + width * this.swipePosition;
      
      clipExtent = [
        extent[0], // 左边界
        extent[1], // 下边界
        maskPosition, // 右边界（卷帘位置）
        extent[3]  // 上边界
      ];
    }
    
    // 设置图层裁剪范围
    layer.setExtent(clipExtent);
  }
  
  // 启用卷帘功能
  enableSwipe() {
    if (this.swipeEnabled) {
      this.disableSwipe();
      return;
    }
    
    // 启用卷帘
    this.swipeEnabled = true;
    
    // 如果有图层加载，更新裁剪范围
    if (this.currentDataType && this.dataLayers[this.currentDataType]) {
      this._updateLayerClipExtent();
    }
    
    // 监听地图视图变化事件
    this.moveEndListener = this._updateLayerClipExtent.bind(this);
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
    
    // 清除图层裁剪范围
    if (this.currentDataType && this.dataLayers[this.currentDataType]) {
      this.dataLayers[this.currentDataType].setExtent(null);
    }
    
    // 重置属性
    this.swipeEnabled = false;
    this.swipePosition = 0.5;
  }
  
  // 设置卷帘位置
  setSwipePosition(position) {
    // 确保位置在0-1之间
    this.swipePosition = Math.max(0, Math.min(1, position));
    
    // 如果卷帘尚未启用，自动启用
    if (!this.swipeEnabled) {
      this.enableSwipe();
    } else {
      // 卷帘已启用，更新图层裁剪范围
      this._updateLayerClipExtent();
    }
    
    return true;
  }
  
  // 获取当前卷帘位置
  getSwipePosition() {
    return this.swipePosition;
  }
  
  // 检查卷帘是否启用
  isSwipeEnabled() {
    return this.swipeEnabled;
  }
  
  // 设置卷帘切割方向
  setSwipeDirection(direction) {
    // 确保方向是有效的值
    if (direction === 'horizontal' || direction === 'vertical') {
      this.swipeDirection = direction;
      
      // 如果卷帘已启用，更新裁剪范围
      if (this.swipeEnabled) {
        this._updateLayerClipExtent();
      }
      
      return true;
    }
    
    return false;
  }
  
  // 获取当前卷帘切割方向
  getSwipeDirection() {
    return this.swipeDirection;
  }
  

}