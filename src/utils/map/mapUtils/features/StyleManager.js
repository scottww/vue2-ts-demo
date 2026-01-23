import { Style, Fill, Stroke, Circle as CircleStyle, Icon, Text } from 'ol/style';

class StyleManager {
  // 创建边界阴影样式
  static getBoundaryShadowStyle(options) {
    const {
      strokeColor = 'rgba(26,155,232,0.7)',
      strokeWidth = 1,
      fillColor = 'rgba(26,155,232,0.3)',
      shadowColor = 'rgba(128, 0, 128, 0.5)',
      shadowBlur = 10
    } = options || {};

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

  // 可以添加其他样式方法...
}

export default StyleManager;