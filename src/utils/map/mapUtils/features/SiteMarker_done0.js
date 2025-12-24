import Overlay from 'ol/Overlay';

// 动态创建并添加样式
const createSiteMarkerStyles = () => {
  // 检查样式是否已经存在
  if (document.getElementById('site-marker-styles')) {
    return;
  }
  
  const style = document.createElement('style');
  style.id = 'site-marker-styles';
  style.textContent = `
    .site-marker-container {
      position: relative;
      z-index: 100;
    }
    
    .site-marker-label {
      display: inline-flex;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.95);
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 6px 12px;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      font-size: 14px;
      white-space: nowrap;
      z-index: 101;
    }
    
    .site-marker-label * {
      box-sizing: border-box;
    }
    
    .site-name {
      font-weight: bold;
      color: #333;
      margin-right: 10px;
      border-right: 1px solid #ddd;
      padding-right: 10px;
    }
    
    .site-status {
      color: white;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
    }
    
    .site-marker-line {
      position: absolute;
      left: 50%;
      top: 100%;
      transform: translateX(-50%);
      z-index: 99;
    }
    
    .site-marker-line::after {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      border-width: 8px;
      border-style: solid;
      border-color: #ddd transparent transparent transparent;
    }
    
    .site-marker-icon {
      position: absolute;
      left: 50%;
      top: calc(100% + 16px);
      width: 36px;
      height: 36px;
      background-color: white;
      border: 2px solid #4CAF50;
      border-radius: 50%;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      z-index: 100;
    }
    
    .site-marker-icon-inner {
      color: #4CAF50;
      font-size: 18px;
      font-weight: bold;
    }
  `;
  
  document.head.appendChild(style);
};

// 初始化样式
createSiteMarkerStyles();

export class SiteMarker {
  constructor(map, coordinate, options = {}) {
    this.map = map;
    this.coordinate = coordinate;
    this.name = options.name || '站点名称';
    this.status = options.status || '正常';
    this.statusColor = options.statusColor || '#4CAF50';
    
    // 创建标签元素
    this.element = this.createMarkerElement();
    
    // 创建Overlay
    this.overlay = new Overlay({
      element: this.element,
      position: coordinate,
      positioning: 'bottom-center',
      offset: [0, -20], // 调整标签位置，使其在图标上方
      stopEvent: false
    });
    
    // 添加到地图
    this.map.addOverlay(this.overlay);
  }
  
  createMarkerElement() {
    const container = document.createElement('div');
    container.className = 'site-marker-container';
    
    // 站点信息标签
    const label = document.createElement('div');
    label.className = 'site-marker-label';
    label.innerHTML = `
      <span class="site-name">${this.name}</span>
      <span class="site-status" style="background-color: ${this.statusColor}">${this.status}</span>
    `;
    
    // 站点图标
    const icon = document.createElement('div');
    icon.className = 'site-marker-icon';
    icon.innerHTML = '<div class="site-marker-icon-inner">✓</div>';
    
    // 连接标签和图标的线条
    const line = document.createElement('div');
    line.className = 'site-marker-line';
    
    container.appendChild(label);
    container.appendChild(line);
    container.appendChild(icon);
    
    return container;
  }
  
  // 更新标记位置
  setPosition(coordinate) {
    this.coordinate = coordinate;
    this.overlay.setPosition(coordinate);
  }
  
  // 更新站点信息
  updateInfo(name, status, statusColor) {
    if (name) this.name = name;
    if (status) this.status = status;
    if (statusColor) this.statusColor = statusColor;
    
    // 更新DOM元素
    const label = this.element.querySelector('.site-marker-label');
    const siteName = this.element.querySelector('.site-name');
    const siteStatus = this.element.querySelector('.site-status');
    
    if (siteName) siteName.textContent = this.name;
    if (siteStatus) {
      siteStatus.textContent = this.status;
      siteStatus.style.backgroundColor = this.statusColor;
    }
  }
  
  // 移除标记
  remove() {
    this.map.removeOverlay(this.overlay);
  }
}