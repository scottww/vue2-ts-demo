## ol 地图优化清单

1. 图层管理器 LayerManager

   > 多图层场景： 卫星图、预警图层、行政边界图层等；

2. 点位、图标 MarkerManager (--已实现部分)  

    > 进一步支持： 

   - 点位管理器 MarkerManager
   - 点位图标 MarkerIcon
   - 点位弹窗 MarkerPopup
   - 点位聚合 MarkerCluster
   - icon 支持 SVG 动态变色
   - 自定义 marker（含文字/图表）
   - 点聚合（cluster）
   
3. 弹窗 PopupManager

    > 常见：点击点位显示卡片、图表、详情等

    可以兼容：
      *DOM 自定义弹窗*
      **OpenLayers Overlay 弹窗**

   - 弹窗管理器 PopupManager
   - 弹窗 Popup
   - 弹窗内容 PopupContent
   - 弹窗样式 PopupStyle
   - 弹窗事件 PopupEvent
   - 弹窗工具 PopupTool


4. 标注管理器 LabelManager

5. 图例 LegendManager

6. 图层控制 LayerControl

7. 绘图工具 DrawTool

    > 画多边形、线、点等，结合业务用途如选区域、画范围等

8. 测量工具 MeasureTool

    > 测量距离、面积，自动提示长度面积  
     - startMeasure(type) // type = 'length' | 'area'  
     - stopMeasure()

9. 搜索工具 SearchTool

10. 缩放工具 ZoomTool

11. 地图工具 MapTool

12. 地图事件 MapEvent

    > 地图事件统一封装  
     - onMapEvent('click', handler)  
     - offMapEvent('pointermove')

13. 地图控件 MapControl

14. 地图工具栏 MapToolbar

15. 可视区域数据加载器 ViewportLoader
     > 地图移动时只加载当前视野内数据（适合大数据量场景）
     * loadInView(fetchFn) // fetchFn(bounds) => 返回视野内的数据

16. 行政区划边界展示工具（行政高亮）BoundaryManager

    * loadAdcodeBoundary(code, level) // 自动请求、展示边界线
    * highlightBoundary(code)
