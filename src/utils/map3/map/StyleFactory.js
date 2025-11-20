// StyleFactory.js - 统一样式创建工具
import { Fill, Stroke, Style, Text, Circle as CircleStyle, Icon } from "ol/style";

export default class StyleFactory {
  pointCircle(color = "rgba(0, 122, 255, 0.9)", radius = 6) {
    return new Style({
      image: new CircleStyle({
        radius,
        fill: new Fill({ color }),
        stroke: new Stroke({ color: "#fff", width: 2 })
      })
    });
  }

  icon(url, scale = 1, anchor = [0.5, 1]) {
    return new Style({
      image: new Icon({ src: url, scale, anchor })
    });
  }

  label(text, offsetY = -40, bgColor = "rgba(0,0,0,0.6)") {
    return new Text({
      text,
      font: "12px PingFangSC-Regular, sans-serif",
      fill: new Fill({ color: "#fff" }),
      offsetY,
      padding: [6, 6, 3, 6],
      backgroundFill: new Fill({ color: bgColor })
    });
  }
}
