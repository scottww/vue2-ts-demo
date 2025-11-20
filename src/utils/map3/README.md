# 使用/API快速参考

## 初始化
```js
MapApp.init("mapDiv", { core: { center: [lng,lat], zoom: 8, projection: "EPSG:4326" }});
```

## 管理图层
```js
MapApp.layers.addTileLayer("osm", "https://tile.osm.org/{z}/{x}/{y}.png");
MapApp.layers.addVectorLayer("points", new VectorSource());
MapApp.layers.setVisible("points", false);
MapApp.layers.removeLayer("osm");
```

## 管理要素
```js
MapApp.features.addFeature("points", feature);
MapApp.features.removeFeature("points", feature);
MapApp.features.clear("points");
```

## Marker 操作
```js
MapApp.markers.addMarker("points", [lng,lat], "/img/icon.png", { id: "m1", onClick: (f) => {} });
MapApp.markers.clearMarkers("points");
```

## 交互/事件
```js
MapApp.interaction.on("myClick", "singleclick", (evt) => {});
MapApp.interaction.off("myClick");
```

## Hover
```js
// bind to a layer instance or layerKey (if you pass layerKey, HoverManager currently expects layer instance; 可按需改造)
MapApp.hover.bind(layerInstance, (f)=>hoverStyle, (f)=>defaultStyle);
MapApp.hover.unbind();
```