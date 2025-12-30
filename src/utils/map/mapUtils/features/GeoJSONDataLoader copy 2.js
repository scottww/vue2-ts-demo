import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Style, Fill, Stroke } from 'ol/style';

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
    
    // 种植结构类别颜色映射
    this.zzjgColorMap = {
      '苗木': { fill: 'rgba(144, 238, 144, 0.3)', stroke: '#32CD32' }, // 浅绿色
      '果园': { fill: 'rgba(255, 215, 0, 0.3)', stroke: '#FFD700' },  // 金色
      '茶园': { fill: 'rgba(0, 255, 255, 0.3)', stroke: '#00FFFF' },  // 青色
      '其他': { fill: 'rgba(128, 128, 128, 0.3)', stroke: '#808080' }   // 灰色
    };
    
    // 种植结构样式函数
    this.zzjgStyleFunction = (feature) => {
      // 调试信息
      console.log('Feature properties:', feature.getProperties());
      
      // 尝试获取不同可能的属性名
      let dimc = feature.get('DLMC');
      if (!dimc) {
        dimc = feature.get('dlmc'); // 小写
      }
      if (!dimc) {
        dimc = feature.get('NAME'); // 名称字段
      }
      if (!dimc) {
        dimc = '其他';
      }
      
      console.log('DIMC value:', dimc);
      const color = this.zzjgColorMap[dimc] || this.zzjgColorMap['其他'];
      return new Style({
        fill: new Fill({ color: color.fill }),
        stroke: new Stroke({ color: color.stroke, width: 1 })
      });
    };
  }

  // 根据类型加载GeoJSON数据
  async loadData(type, year = '2021') {
    try {
      // 移除当前显示的图层
      this.removeCurrentLayer();

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
  }
}