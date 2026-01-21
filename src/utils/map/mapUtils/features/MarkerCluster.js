import Overlay from 'ol/Overlay';

// 动态创建并添加聚合样式
const createClusterMarkerStyles = () => {
  if (document.getElementById('cluster-marker-styles')) return;

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
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      font-weight: bold;
      color: #2196F3;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);
};
createClusterMarkerStyles();

export class MarkerCluster {
  constructor(map, options = {}) {
    if (!map) {
      console.error('MarkerCluster: map参数不能为空');
      return;
    }

    this.map = map;
    this.markers = [];
    this.isClustered = false;
    this.zoomThreshold = options.zoomThreshold || 11;
    this.clusterDistance = options.clusterDistance || 60; // 聚合半径（像素）
    this.clusterIcon = options.clusterIcon || '';
    this.iconWidth = options.iconWidth || 54;
    this.iconHeight = options.iconHeight || 53;
    this.clusterOverlays = [];
    this.visible = true; // 控制是否显示点位标记

    this.handleViewChange = this.updateClusterState.bind(this);
    this.map.getView().on('change:resolution', this.handleViewChange);

    // 初始化聚合状态
    this.isClustered = this.map.getView().getZoom() < this.zoomThreshold;
  }

  // 设置是否显示点位标记
  setVisible(visible) {
    this.visible = visible;
    if (visible) {
      this.showAllMarkers();
      this.updateClusterMarker();
    } else {
      this.hideAllMarkers();
      this.removeAllClusterOverlays();
    }
  }

  addMarker(marker) {
    if (!marker || !marker.remove || !marker.coordinate) {
      console.error('MarkerCluster: 添加的不是有效的SiteMarker实例');
      return;
    }
    this.markers.push(marker);

    // 如果当前处于聚合状态，先隐藏新 marker
    if (this.isClustered) this.hideMarker(marker);

    // 等地图渲染完成后再生成聚合
    this.map.once('rendercomplete', () => {
      this.updateClusterMarker();
    });
  }

  removeMarker(marker) {
    const index = this.markers.indexOf(marker);
    if (index > -1) {
      this.markers.splice(index, 1);
      if (this.isClustered) this.showMarker(marker);
      this.updateClusterMarker();
    }
  }

  removeAllMarkers() {
    this.markers.forEach(m => {
      this.showMarker(m);
      m.remove();
    });
    this.markers = [];
    this.removeAllClusterOverlays();
  }

  hideMarker(marker) {
    if (marker.anchor) marker.anchor.style.display = 'none';
  }

  showMarker(marker) {
    if (marker.anchor) marker.anchor.style.display = '';
  }

  hideAllMarkers() {
    this.markers.forEach(m => this.hideMarker(m));
  }

  showAllMarkers() {
    this.markers.forEach(m => this.showMarker(m));
  }

  removeAllClusterOverlays() {
    this.clusterOverlays.forEach(o => this.map.removeOverlay(o));
    this.clusterOverlays = [];
  }

  updateClusterState() {
    if (!this.visible) return;

    const currentZoom = this.map.getView().getZoom();
    const shouldCluster = currentZoom < this.zoomThreshold;

    if (shouldCluster !== this.isClustered) {
      this.isClustered = shouldCluster;
      if (shouldCluster) {
        this.hideAllMarkers();
        this.updateClusterMarker();
      } else {
        this.showAllMarkers();
        this.removeAllClusterOverlays();
      }
    } else if (shouldCluster) {
      this.updateClusterMarker();
    }
  }

  updateClusterMarker() {
    if (!this.visible || !this.isClustered) return;

    const validMarkers = this.markers.filter(m => m && m.coordinate);
    if (validMarkers.length === 0) {
      this.removeAllClusterOverlays();
      return;
    }

    this.removeAllClusterOverlays();
    const clustered = new Set();

    for (let i = 0; i < validMarkers.length; i++) {
      const marker = validMarkers[i];
      if (!marker.coordinate || clustered.has(marker)) continue;

      const clusterGroup = [marker];
      const pixel1 = this.map.getPixelFromCoordinate(marker.coordinate);
      if (!pixel1) continue;

      for (let j = i + 1; j < validMarkers.length; j++) {
        const marker2 = validMarkers[j];
        if (!marker2.coordinate || clustered.has(marker2)) continue;

        const pixel2 = this.map.getPixelFromCoordinate(marker2.coordinate);
        if (!pixel2) continue;

        const dx = pixel1[0] - pixel2[0];
        const dy = pixel1[1] - pixel2[1];
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance <= this.clusterDistance) {
          clusterGroup.push(marker2);
          clustered.add(marker2);
        }
      }

      clustered.add(marker);

      // ---------- 计算质心位置 ----------
      let sumX = 0, sumY = 0;
      clusterGroup.forEach(m => {
        sumX += m.coordinate[0];
        sumY += m.coordinate[1];
      });
      const position = [sumX / clusterGroup.length, sumY / clusterGroup.length];

      const clusterElement = this.createClusterElement(clusterGroup.length);
      const overlay = new Overlay({
        element: clusterElement,
        position,
        positioning: 'center-center',
        stopEvent: false
      });

      clusterElement.addEventListener('click', () => {
        this.map.getView().animate({
          zoom: this.zoomThreshold,
          duration: 500
        });
      });

      this.map.addOverlay(overlay);
      this.clusterOverlays.push(overlay);

      clusterGroup.forEach(m => this.hideMarker(m));
    }
  }

  createClusterElement(count) {
    const container = document.createElement('div');
    container.className = 'cluster-marker-container';
    container.style.width = this.iconWidth + 'px';
    container.style.height = this.iconHeight + 'px';
    container.style.position = 'relative';
    container.style.pointerEvents = 'auto';

    const cluster = document.createElement('div');
    cluster.className = 'cluster-marker';

    if (this.clusterIcon) {
      cluster.style.backgroundImage = `url(${this.clusterIcon})`;
      cluster.style.backgroundSize = 'cover';
      cluster.style.backgroundPosition = 'center';
      cluster.style.width = this.iconWidth + 'px';
      cluster.style.height = this.iconHeight + 'px';
      cluster.style.display = 'flex';
      cluster.style.alignItems = 'center';
      cluster.style.justifyContent = 'center';
      cluster.style.color = '#ffffff';
      cluster.style.fontSize = '18px';
      cluster.style.fontWeight = 'bold';
      cluster.style.textShadow = '1px 1px 2px rgba(0,0,0,0.8)';
      cluster.textContent = count.toString(); // 所有聚合数量都显示
    } else {
      cluster.textContent = count.toString();
    }

    container.appendChild(cluster);
    return container;
  }

  destroy() {
    this.map.getView().un('change:resolution', this.handleViewChange);
    this.removeAllMarkers();
    this.removeAllClusterOverlays();
  }
}
