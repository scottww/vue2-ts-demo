import Overlay from 'ol/Overlay';

// 动态创建并添加聚合样式
const createClusterMarkerStyles = () => {
  // 检查样式是否已经存在
  if (document.getElementById('cluster-marker-styles')) {
    return;
  }
  
  const style = document.createElement('style');
  style.id = 'cluster-marker-styles';
  style.textContent = `
    .cluster-marker-container {
      position: relative;
      z-index: 100;
      pointer-events: auto;
    }
    
    .cluster-marker {
      width: 54px;
      height: 53px;
      background-color: rgba(255, 255, 255, 0.95);
      border: 2px solid #2196F3;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      font-size: 18px;
      font-weight: bold;
      color: #2196F3;
      cursor: pointer;
    }
    
    .cluster-marker:hover {
      background-color: rgba(33, 150, 243, 0.1);
      border-color: #1976D2;
      color: #1976D2;
    }
  `;
  
  document.head.appendChild(style);
};

// 初始化样式
createClusterMarkerStyles();

export class MarkerCluster {
  constructor(map, options = {}) {
    // 验证map参数
    if (!map) {
      console.error('MarkerCluster: map参数不能为空');
      return;
    }
    
    this.map = map;
    this.markers = []; // 存储所有标记
    this.clusterOverlay = null; // 聚合标记的overlay
    this.zoomThreshold = options.zoomThreshold || 11; // 缩放阈值，默认11
    this.isClustered = false; // 当前是否处于聚合状态
    this.clusterIcon = options.clusterIcon || ''; // 聚合标记图标路径
    this.iconWidth = options.iconWidth || 54; // 图标宽度，默认54
    this.iconHeight = options.iconHeight || 53; // 图标高度，默认53
    
    // 监听地图缩放事件
    this.map.getView().on('change:resolution', () => {
      this.updateClusterState();
    });
    
    // 初始化聚合状态
    this.updateClusterState();
  }
  
  // 添加标记到聚合
  addMarker(marker) {
    if (!marker || !marker.remove || !marker.overlay) {
      console.error('MarkerCluster: 添加的不是有效的SiteMarker实例');
      return;
    }
    
    this.markers.push(marker);
    
    // 如果当前处于聚合状态，隐藏新添加的标记
    if (this.isClustered) {
      this.hideMarker(marker);
    }
    
    // 更新聚合标记
    this.updateClusterMarker();
  }
  
  // 从聚合中移除标记
  removeMarker(marker) {
    const index = this.markers.indexOf(marker);
    if (index > -1) {
      this.markers.splice(index, 1);
      
      // 更新聚合标记
      this.updateClusterMarker();
      
      // 如果标记被聚合类隐藏，确保在移除前显示它（如果需要）
      if (this.isClustered) {
        this.showMarker(marker);
      }
    }
  }
  
  // 移除所有标记
  removeAllMarkers() {
    this.markers.forEach(marker => {
      this.showMarker(marker); // 先显示所有标记
      marker.remove(); // 然后移除标记
    });
    this.markers = [];
    this.removeClusterMarker();
  }
  
  // 更新聚合状态
  updateClusterState() {
    const currentZoom = this.map.getView().getZoom();
    const shouldCluster = currentZoom < this.zoomThreshold;
    
    if (shouldCluster !== this.isClustered) {
      this.isClustered = shouldCluster;
      
      if (shouldCluster) {
        // 进入聚合状态
        this.hideAllMarkers();
        this.createClusterMarker();
      } else {
        // 退出聚合状态
        this.showAllMarkers();
        this.removeClusterMarker();
      }
    }
  }
  
  // 隐藏所有标记
  hideAllMarkers() {
    this.markers.forEach(marker => this.hideMarker(marker));
  }
  
  // 显示所有标记
  showAllMarkers() {
    this.markers.forEach(marker => this.showMarker(marker));
  }
  
  // 隐藏单个标记
  hideMarker(marker) {
    if (marker.anchor) {
      marker.anchor.style.display = 'none';
    }
  }
  
  // 显示单个标记
  showMarker(marker) {
    if (marker.anchor) {
      marker.anchor.style.display = '';
    }
  }
  
  // 创建聚合标记
  createClusterMarker() {
    // 如果没有标记，不创建聚合标记
    if (this.markers.length === 0) {
      return;
    }
    
    // 计算聚合标记的位置（使用第一个标记的位置）
    const position = this.markers[0].coordinate;
    
    // 创建聚合标记元素
    const clusterElement = this.createClusterElement();
    
    // 创建Overlay
    this.clusterOverlay = new Overlay({
      element: clusterElement,
      position: position,
      positioning: 'center-center', // 居中定位
      stopEvent: false
    });
    
    // 添加到地图
    this.map.addOverlay(this.clusterOverlay);
  }
  
  // 创建聚合标记元素
  createClusterElement() {
    const container = document.createElement('div');
    container.className = 'cluster-marker-container';
    container.style.position = 'relative';
    container.style.width = this.iconWidth + 'px';
    container.style.height = this.iconHeight + 'px';
    container.style.zIndex = '100';
    container.style.pointerEvents = 'auto';
    
    let cluster;
    
    if (this.clusterIcon) {
      // 如果提供了自定义图标，使用图片作为背景
      cluster = document.createElement('div');
      cluster.className = 'cluster-marker';
      cluster.style.position = 'relative';
      cluster.style.width = this.iconWidth + 'px';
      cluster.style.height = this.iconHeight + 'px';
      cluster.style.backgroundImage = `url(${this.clusterIcon})`;
      cluster.style.backgroundSize = 'cover';
      cluster.style.backgroundPosition = 'center';
      cluster.style.display = 'flex';
      cluster.style.alignItems = 'center';
      cluster.style.justifyContent = 'center';
      cluster.style.color = '#ffffff';
      cluster.style.fontSize = '18px';
      cluster.style.fontWeight = 'bold';
      cluster.style.textShadow = '1px 1px 2px rgba(0,0,0,0.8)';
      cluster.textContent = this.markers.length.toString(); // 显示聚合数量
    } else {
      // 默认样式
      cluster = document.createElement('div');
      cluster.className = 'cluster-marker';
      cluster.textContent = this.markers.length.toString(); // 显示聚合数量
    }
    
    // 添加点击事件，点击后放大地图到阈值
    cluster.addEventListener('click', () => {
      this.map.getView().animate({
        zoom: this.zoomThreshold,
        duration: 500
      });
    });
    
    container.appendChild(cluster);
    return container;
  }
  
  // 更新聚合标记
  updateClusterMarker() {
    if (!this.isClustered) {
      return;
    }
    
    if (this.markers.length === 0) {
      // 如果没有标记，移除聚合标记
      this.removeClusterMarker();
      return;
    }
    
    if (this.clusterOverlay) {
      // 更新聚合标记的位置
      const position = this.markers[0].coordinate;
      this.clusterOverlay.setPosition(position);
      
      // 更新聚合数量
      const clusterElement = this.clusterOverlay.getElement().querySelector('.cluster-marker');
      if (clusterElement) {
        clusterElement.textContent = this.markers.length.toString();
        
        // 如果使用自定义图标，确保样式保持正确
        if (this.clusterIcon) {
          clusterElement.style.backgroundImage = `url(${this.clusterIcon})`;
          clusterElement.style.width = this.iconWidth + 'px';
          clusterElement.style.height = this.iconHeight + 'px';
        }
      }
    } else {
      // 创建新的聚合标记
      this.createClusterMarker();
    }
  }
  
  // 移除聚合标记
  removeClusterMarker() {
    if (this.clusterOverlay && this.map) {
      this.map.removeOverlay(this.clusterOverlay);
      this.clusterOverlay = null;
    }
  }
  
  // 销毁聚合类
  destroy() {
    // 移除地图事件监听
    this.map.getView().un('change:resolution', () => {
      this.updateClusterState();
    });
    
    // 移除所有标记
    this.removeAllMarkers();
    
    // 移除聚合标记
    this.removeClusterMarker();
  }
}
