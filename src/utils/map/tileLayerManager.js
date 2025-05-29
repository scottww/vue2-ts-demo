// utils/tileLayerManager.js
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";

const tk = `a76b9ea6e49fb0eecdb1ed34d1e75930`;

// 图层配置（分组）
// 每组表示一个底图组合：底图图层 + 注记图层
const baseMapGroups = {
  TDT_vec: [
    {
      key: "TDT_vec",
      url: `http://t{0-6}.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=${tk}`,
      zIndex: 0
    },
    {
      key: "TDT_vec_anno",
      url: `http://t{0-6}.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=${tk}`,
      zIndex: 1
    }
  ],
  TDT_img: [
    {
      key: "TDT_img",
      url: `http://t{0-6}.tianditu.gov.cn/DataServer?T=img_w&X={x}&Y={y}&L={z}&tk=${tk}`,
      zIndex: 0
    },
    {
      key: "TDT_img_anno",
      url: `http://t{0-6}.tianditu.gov.cn/DataServer?T=cia_w&X={x}&Y={y}&L={z}&tk=${tk}`,
      zIndex: 1
    }
  ]
};

export function createTileLayerManager(map) {
  const baseLayerCache = new Map(); // key => TileLayer
  let currentGroup = null;

  function switchTo(groupName) {
    if (!baseMapGroups[groupName]) {
      console.warn(`图层组 "${groupName}" 不存在`);
      return;
    }

    // 只隐藏底图图层
    hideAll();

    // 加载新组
    baseMapGroups[groupName].forEach((cfg) => {
      let layer = baseLayerCache.get(cfg.key);
      if (!layer) {
        layer = new TileLayer({
          source: new XYZ({ url: cfg.url }),
          zIndex: cfg.zIndex,
          visible: true
        });
        layer.set("isBaseLayer", true);
        map.addLayer(layer);
        baseLayerCache.set(cfg.key, layer);
      } else {
        layer.setVisible(true);
      }
    });

    currentGroup = groupName;
  }

  function hideAll() {
    // 只操作底图图层缓存
    baseLayerCache.forEach((layer) => {
      layer.setVisible(false);
    });
    currentGroup = null;

    //两种方式都可
    // const layers = map
    //   .getLayers()
    //   .getArray()
    //   .filter((l) => l.get("isBaseLayer"));
    // layers.forEach((layer) => {
    //   layer.setVisible(false);
    // });
    // currentGroup = null;
  }

  function getCurrentGroup() {
    return currentGroup;
  }

  return {
    switchTo,
    hideAll,
    getCurrentGroup
  };
}
