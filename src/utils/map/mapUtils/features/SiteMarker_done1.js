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
      font-weight: 500;
    }
    
    .site-marker-line {
      position: absolute;
      left: 50%;
      top: 100%;
      transform: translateX(-50%);
      z-index: 99;
    }
    
    .site-marker-triangle {
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
      width: auto;
      height: auto;
      background-color: transparent;
      border: none;
      border-radius: 0;
      transform: translateX(-50%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: none;
      z-index: 100;
    }
    
    .site-marker-icon-inner {
      color: #4CAF50;
      font-size: 18px;
      font-weight: bold;
      width: auto;
      height: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      margin: 0;
    }
    
    .site-marker-icon-inner img {
      display: block;
      width: 36px;
      height: 36px;
      border-radius: 0;
      object-fit: contain;
      background-color: transparent;
      border: none;
    }
  `;
  
  document.head.appendChild(style);
};

// 初始化样式
createSiteMarkerStyles();

export default class SiteMarker {
  constructor(map, coordinate, options = {}) {
    // 验证map参数
    if (!map) {
      console.error('SiteMarker: map参数不能为空');
      return;
    }
    
    this.map = map;
    this.coordinate = coordinate;
    this.name = options.name || '名称';
    this.status = options.status || '正常';
    this.statusColor = options.statusColor || '#4CAF50';
    this.borderColor = options.borderColor || options.statusColor || '#4CAF50'; // 边框颜色，默认与状态颜色相同
    this.icon = options.icon || '✓'; // 自定义图标
    this.iconColor = options.iconColor || options.borderColor || options.statusColor || '#4CAF50'; // 图标颜色，默认与边框颜色相同
    this.iconWidth = options.iconWidth || 36; // 图标宽度，默认36px
    this.iconHeight = options.iconHeight || 36; // 图标高度，默认36px
    this.iconOffset = options.iconOffset || [0, 0]; // 图标指针偏移量，默认[0, 0]
    
    // 创建标签元素
    this.element = this.createMarkerElement();
    
    // 创建Overlay，考虑图标指针位置
    this.overlay = new Overlay({
      element: this.element,
      position: coordinate,
      positioning: 'bottom-center',
      offset: [this.iconOffset[0], -this.iconOffset[1] - 20], // 调整标签位置，使其在图标上方，并考虑图标指针偏移
      // offset: [this.iconOffset[0], -this.iconOffset[1]],
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
    label.style.borderColor = this.borderColor; // 设置标签边框颜色
    label.innerHTML = `
      <span class="site-name" style="color: ${this.statusColor}">${this.name}</span>
      <span class="site-status" style="color: ${this.statusColor}">${this.status}</span>
    `;
    
    // 站点图标
    const icon = document.createElement('div');
    icon.className = 'site-marker-icon';
    
    // 判断图标是否为图片路径
    const iconInner = document.createElement('div');
    iconInner.className = 'site-marker-icon-inner';
    
    // 调试信息：打印图标类型和值
    console.log('SiteMarker: icon信息', {
      type: typeof this.icon,
      value: this.icon,
      isObject: typeof this.icon === 'object' && this.icon !== null,
      hasDefault: typeof this.icon === 'object' && this.icon !== null && this.icon.default,
      isString: typeof this.icon === 'string',
      objectKeys: typeof this.icon === 'object' && this.icon !== null ? Object.keys(this.icon) : []
    });
    
    // 处理图片图标
    if (typeof this.icon === 'string' || typeof this.icon === 'object') {
      // 清空iconInner内容
      iconInner.innerHTML = '';
      
      // 创建img元素
      const img = document.createElement('img');
      
      // 设置图片源
      if (typeof this.icon === 'string') {
        img.src = this.icon;
      } else if (this.icon && typeof this.icon === 'object') {
        img.src = this.icon.default || this.icon;
      }
      
      // 设置图片样式
      img.style.width = this.iconWidth + 'px';
      img.style.height = this.iconHeight + 'px';
      img.style.objectFit = 'contain';
      img.style.display = 'block';
      img.style.border = 'none';
      img.style.padding = '0';
      img.style.margin = '0';
      img.style.background = 'transparent';
      
      // 调试：打印img元素和src
      console.log('SiteMarker: 创建的img元素', img);
      console.log('SiteMarker: img.src', img.src);
      
      // 添加图片加载事件监听
      img.onload = function() {
        console.log('SiteMarker: 图片加载成功', this.src);
      };
      
      img.onerror = function() {
        console.error('SiteMarker: 图片加载失败', this.src);
      };
      
      // 添加到DOM
      iconInner.appendChild(img);
      
      // 调试：打印iconInner的HTML和父元素
      console.log('SiteMarker: iconInner的HTML', iconInner.innerHTML);
      console.log('SiteMarker: iconInner的父元素', iconInner.parentElement);
      console.log('SiteMarker: iconInner的offsetWidth/offsetHeight', iconInner.offsetWidth, iconInner.offsetHeight);
      console.log('SiteMarker: img元素的offsetWidth/offsetHeight', img.offsetWidth, img.offsetHeight);
      
      // 确保img元素可见
      img.style.visibility = 'visible';
      img.style.opacity = '1';
    } else {
      // 使用文本或字体图标
      iconInner.innerHTML = '';
      iconInner.textContent = this.icon;
      iconInner.style.color = this.iconColor;
    }
    
    icon.appendChild(iconInner);
    
    // 连接标签和图标的线条
    const line = document.createElement('div');
    line.className = 'site-marker-line';
    // 设置三角形颜色与边框颜色一致
    const triangle = document.createElement('div');
    triangle.className = 'site-marker-triangle';
    triangle.style.borderTopColor = this.borderColor;
    line.appendChild(triangle);
    
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
  updateInfo(name, status, statusColor, borderColor, icon, iconColor, iconWidth, iconHeight) {
    if (name) this.name = name;
    if (status) this.status = status;
    if (statusColor) this.statusColor = statusColor;
    if (borderColor) this.borderColor = borderColor;
    if (icon) this.icon = icon;
    if (iconColor) this.iconColor = iconColor;
    if (iconWidth) this.iconWidth = iconWidth;
    if (iconHeight) this.iconHeight = iconHeight;
    
    // 更新DOM元素
    const label = this.element.querySelector('.site-marker-label');
    const siteName = this.element.querySelector('.site-name');
    const siteStatus = this.element.querySelector('.site-status');
    const iconElement = this.element.querySelector('.site-marker-icon');
    const iconInner = this.element.querySelector('.site-marker-icon-inner');
    const triangle = this.element.querySelector('.site-marker-triangle');
    
    if (siteName) siteName.textContent = this.name;
    if (siteStatus) {
      siteStatus.textContent = this.status;
      siteStatus.style.backgroundColor = this.statusColor;
    }
    if (label) {
      label.style.borderColor = this.borderColor;
    }
    if (iconElement) {
      // 不再设置边框颜色，由CSS控制为透明
    }
    if (iconInner) {
      // 清空现有内容
      iconInner.innerHTML = '';
      
      // 调试信息：打印图标类型和值
      console.log('SiteMarker updateInfo: icon信息', {
        type: typeof this.icon,
        value: this.icon,
        isObject: typeof this.icon === 'object' && this.icon !== null,
        hasDefault: typeof this.icon === 'object' && this.icon !== null && this.icon.default,
        isString: typeof this.icon === 'string',
        objectKeys: typeof this.icon === 'object' && this.icon !== null ? Object.keys(this.icon) : []
      });
      
      // 处理图片图标
      if (typeof this.icon === 'string' || typeof this.icon === 'object') {
        // 创建img元素
        const img = document.createElement('img');
        
        // 设置图片源
        if (typeof this.icon === 'string') {
          img.src = this.icon;
        } else if (this.icon && typeof this.icon === 'object') {
          img.src = this.icon.default || this.icon;
        }
        
        // 设置图片样式
        img.style.width = this.iconWidth + 'px';
        img.style.height = this.iconHeight + 'px';
        img.style.objectFit = 'contain';
        img.style.display = 'block';
        img.style.border = 'none';
        img.style.padding = '0';
        img.style.margin = '0';
        img.style.background = 'transparent';
        
        // 调试：打印img元素和src
        console.log('SiteMarker updateInfo: 创建的img元素', img);
        console.log('SiteMarker updateInfo: img.src', img.src);
        
        // 添加图片加载事件监听
        img.onload = function() {
          console.log('SiteMarker updateInfo: 图片加载成功', this.src);
        };
        
        img.onerror = function() {
          console.error('SiteMarker updateInfo: 图片加载失败', this.src);
        };
        
        // 添加到DOM
        iconInner.appendChild(img);
        
        // 调试：打印iconInner的HTML和父元素
        console.log('SiteMarker updateInfo: iconInner的HTML', iconInner.innerHTML);
        console.log('SiteMarker updateInfo: iconInner的父元素', iconInner.parentElement);
        console.log('SiteMarker updateInfo: iconInner的offsetWidth/offsetHeight', iconInner.offsetWidth, iconInner.offsetHeight);
        console.log('SiteMarker updateInfo: img元素的offsetWidth/offsetHeight', img.offsetWidth, img.offsetHeight);
        
        // 确保img元素可见
        img.style.visibility = 'visible';
        img.style.opacity = '1';
      } else {
        // 使用文本或字体图标
        iconInner.textContent = this.icon;
        iconInner.style.color = this.iconColor;
      }
    }
    if (triangle) {
      triangle.style.borderTopColor = this.borderColor;
    }
  }
  
  // 移除标记
  remove() {
    if (this.map && this.overlay) {
      this.map.removeOverlay(this.overlay);
    }
  }
}