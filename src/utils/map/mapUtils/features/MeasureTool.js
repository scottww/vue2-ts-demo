import { Draw } from "ol/interaction";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Style, Stroke, Fill } from "ol/style";
import { getLength, getArea } from "ol/sphere";
import { LineString } from "ol/geom";
import Overlay from "ol/Overlay";

export class MeasureTool {
  constructor(map) {
    this.map = map;
    this.featureGroups = []; // 每个测量对象的信息
    this.currentDraw = null;
  }

  clearAll() {
    this.featureGroups.forEach(({ layer, overlays }) => {
      this.map.removeLayer(layer);
      overlays.forEach((ov) => this.map.removeOverlay(ov));
    });
    this.featureGroups = [];
  }

  createNodeOverlay(coord) {
    const node = document.createElement("div");
    Object.assign(node.style, {
      width: "10px",
      height: "10px",
      backgroundColor: "#fff",
      border: "2px solid red",
      borderRadius: "50%",
      position: "absolute",
      transform: "translate(-50%, -50%)",
      pointerEvents: "none"
    });
    return new Overlay({
      element: node,
      position: coord,
      positioning: "center-center",
      stopEvent: false
    });
  }

  createLabelOverlay(coord, text) {
    const label = document.createElement("div");
    Object.assign(label.style, {
      fontSize: "12px",
      fontWeight: "bold",
      // color: "#fff",
      // backgroundColor: "#000",
      color: "#7a7a7a",
      backgroundColor: "#fff",
      border: "1px solid #7a7a7a",
      padding: "2px 4px",
      borderRadius: "4px",
      opacity: 0.8,
      whiteSpace: "nowrap"
    });
    label.innerHTML = text;
    return new Overlay({
      element: label,
      position: coord,
      positioning: "bottom-center",
      offset: [0, -6],
      stopEvent: false
    });
  }

  createFinalLabelOverlay(coord, text) {
    const div = document.createElement("div");
    div.innerHTML = text;

    Object.assign(div.style, {
      position: "absolute",
      display: "inline",
      cursor: "inherit",
      backgroundColor: "rgb(255, 255, 255)",
      border: "1px solid rgb(255, 1, 3)",
      padding: "3px 5px",
      whiteSpace: "nowrap",
      fontSize: "12px",
      color: "rgb(51, 51, 51)",
      userSelect: "none",
      zIndex: 999
    });

    return new Overlay({
      element: div,
      position: coord,
      positioning: "bottom-left", // 可调
      offset: [8, -8],
      stopEvent: false
    });
  }

  formatLength(line) {
    const length = getLength(line, { projection: "EPSG:4326" });
    return length > 1000
      ? { value: (length / 1000).toFixed(2), unit: "km" }
      : { value: length.toFixed(2), unit: "m" };
  }

  formatArea(polygon) {
    const area = getArea(polygon, { projection: "EPSG:4326" });
    return area > 1000000
      ? { value: (area / 1000000).toFixed(2), unit: "km²" }
      : { value: area.toFixed(2), unit: "㎡" };
  }

  start(type) {
    // 移除当前正在绘制的交互（不移除已绘制内容）
    if (this.currentDraw) {
      this.map.removeInteraction(this.currentDraw);
      this.currentDraw = null;
    }

    const source = new VectorSource();
    const layer = new VectorLayer({
      source,
      style: new Style({
        stroke: new Stroke({ color: "#f00", width: 2 }),
        fill: new Fill({ color: "rgba(255,0,0,0.1)" })
      }),
      zIndex: 10
    });
    this.map.addLayer(layer);

    const draw = new Draw({
      source,
      type,
      style: new Style({
        // stroke: new Stroke({ color: "#2196F3", width: 2 }),
        // fill: new Fill({ color: "rgba(33,150,243,0.2)" })
        stroke: new Stroke({ color: "#f00", width: 2 }),
        fill: new Fill({ color: "rgba(33,150,243,0.2)" })
      })
    });
    this.map.addInteraction(draw);
    this.currentDraw = draw;

    const overlays = [];

    draw.on("drawstart", (e) => {
      const geom = e.feature.getGeometry();

      geom.on("change", () => {
        const coords =
          type === "Polygon"
            ? geom.getCoordinates()[0].slice(0, -1)
            : geom.getCoordinates();

        // 清除上一次绘制时生成的 overlays
        overlays.forEach((ov) => this.map.removeOverlay(ov));
        overlays.length = 0;

        coords.forEach((c, i) => {
          const nodeOverlay = this.createNodeOverlay(c);
          this.map.addOverlay(nodeOverlay);
          overlays.push(nodeOverlay);

          if (type === "LineString") {
            if (i === 0) {
              const label = this.createLabelOverlay(c, "起点");
              this.map.addOverlay(label);
              overlays.push(label);
            } else {
              const line = new LineString(coords.slice(0, i + 1));
              const len = this.formatLength(line);
              const label = this.createLabelOverlay(
                c,
                `${len.value} ${len.unit}`
              );
              this.map.addOverlay(label);
              overlays.push(label);
            }
          }
        });
      });
    });

    draw.on("drawend", (e) => {
      const feature = e.feature;
      const geom = feature.getGeometry();
      const coords =
        type === "Polygon"
          ? geom.getCoordinates()[0].slice(0, -1)
          : geom.getCoordinates();

      // 清除绘制中的 overlays，重新绘制静态版本
      overlays.forEach((ov) => this.map.removeOverlay(ov));
      overlays.length = 0;

      coords.forEach((c, i) => {
        const nodeOverlay = this.createNodeOverlay(c);
        this.map.addOverlay(nodeOverlay);
        overlays.push(nodeOverlay);

        if (type === "LineString") {
          if (i === 0) {
            const label = this.createLabelOverlay(c, "起点");
            this.map.addOverlay(label);
            overlays.push(label);
          } else {
            const line = new LineString(coords.slice(0, i + 1));
            const len = this.formatLength(line);
            const label = this.createLabelOverlay(
              c,
              `${len.value} ${len.unit}`
            );
            this.map.addOverlay(label);
            overlays.push(label);
            //定制化结尾标签
            // if (i === coords.length - 1) {
            //   const label = this.createFinalLabelOverlay(
            //     c,
            //     `总长：${len.value} ${len.unit}`
            //   );
            //   this.map.addOverlay(label);
            //   overlays.push(label);
            // } else {
            //   const label = this.createLabelOverlay(
            //     c,
            //     `${len.value} ${len.unit}`
            //   );
            //   this.map.addOverlay(label);
            //   overlays.push(label);
            // }
          }
        }
      });

      if (type === "Polygon") {
        const area = this.formatArea(geom);
        const center = geom.getInteriorPoint().getCoordinates();
        const label = this.createLabelOverlay(
          center,
          `${area.value} ${area.unit}`
        );
        //定制化标签
        // const label = this.createFinalLabelOverlay(
        //   center,
        //   `总面积：${area.value} ${area.unit}`
        // );
        this.map.addOverlay(label);
        overlays.push(label);
      }

      // 删除按钮
      const closeBtn = document.createElement("div");
      closeBtn.innerText = "✖";
      closeBtn.title = "清除";
      Object.assign(closeBtn.style, {
        color: "red",
        background: "#fff",
        border: "1px solid red",
        // borderRadius: "50%",
        width: "14px",
        height: "14px",
        textAlign: "center",
        lineHeight: "12px",
        cursor: "pointer",
        fontSize: "12px",
        // fontWeight: "bold",
        zIndex: 999
      });

      closeBtn.addEventListener("click", () => {
        this.map.removeLayer(layer);
        overlays.forEach((ov) => this.map.removeOverlay(ov));
        this.featureGroups = this.featureGroups.filter(
          (g) => g.feature !== feature
        );
      });

      const closeOverlay = new Overlay({
        element: closeBtn,
        positioning: "top-right",
        offset: [10, 10],
        stopEvent: false
      });
      closeOverlay.setPosition(coords[coords.length - 1]);
      this.map.addOverlay(closeOverlay);
      overlays.push(closeOverlay);

      this.featureGroups.push({ feature, layer, overlays });
      this.map.removeInteraction(draw);
      this.currentDraw = null;
    });
  }
}
