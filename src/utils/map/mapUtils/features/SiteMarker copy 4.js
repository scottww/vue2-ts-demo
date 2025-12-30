import Overlay from 'ol/Overlay';

/* ================== 样式注入 ================== */
const createSiteMarkerStyles = () => {
  if (document.getElementById('site-marker-styles')) return;

  const style = document.createElement('style');
  style.id = 'site-marker-styles';
  style.textContent = `
    .site-marker-anchor {
      position: relative;
      pointer-events: none;
    }

    .site-marker-icon {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      pointer-events: auto;
    }

    .site-marker-icon-inner img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
      background: transparent;
      border: none;
    }

    // .site-marker-line {
    //   position: absolute;
    //   left: 50%;
    //   transform: translateX(-50%);
    //   width: 2px;
    //   background-color: #ddd;
    // }

    .site-marker-triangle {
      position: relative;
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid var(--border-color);
      margin-top: -1px;
    }
    
    .site-marker-triangle::after {
      content: '';
      position: absolute;
      top: -8px;
      left: -8px;
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-top: 8px solid white;
    }

    .site-marker-label {
      display: inline-flex;
      align-items: center;
      background: rgba(255, 255, 255, 1);
      border: 1px solid #ddd;
      border-radius: 4px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: none;
      padding: 6px 12px;
      font-size: 14px;
      white-space: nowrap;
      pointer-events: auto;
      box-shadow: 0 2px 6px rgba(0,0,0,.1);
    }

    .site-name {
      font-weight: bold;
      margin-right: 8px;
      padding-right: 8px;
      border-right: 1px solid #ddd;
    }

    .site-status {
      font-weight: 500;
    }
  `;
  document.head.appendChild(style);
};

createSiteMarkerStyles();

/* ================== Marker 类 ================== */
export default class SiteMarker {
  constructor(map, coordinate, options = {}) {
    if (!map) return;

    this.map = map;
    this.coordinate = coordinate;

    this.name = options.name || '名称';
    this.status = options.status || '正常';
    this.statusColor = options.statusColor || '#4CAF50';
    this.borderColor = options.borderColor || this.statusColor;
    this.icon = options.icon || '';
    this.iconWidth = options.iconWidth || 36;
    this.iconHeight = options.iconHeight || 36;
    this.iconOffset = options.iconOffset || [0, 0];
    this.onClickHandler = null;

    // 固定尺寸 = 锚点
    this.anchor = this.createAnchor();

    this.overlay = new Overlay({
      element: this.anchor,
      position: coordinate,
      positioning: 'center-center',
      offset: this.iconOffset, // 用 offset 调整位置
      stopEvent: false
    });

    this.map.addOverlay(this.overlay);
  }

  /* ================== DOM ================== */
  createAnchor() {
    const anchor = document.createElement('div');
    anchor.className = 'site-marker-anchor';
    anchor.style.width = this.iconWidth + 'px';
    anchor.style.height = this.iconHeight + 'px';

    /* icon */
    const icon = document.createElement('div');
    icon.className = 'site-marker-icon';

    const iconInner = document.createElement('div');
    iconInner.className = 'site-marker-icon-inner';
    iconInner.style.width = this.iconWidth + 'px';
    iconInner.style.height = this.iconHeight + 'px';

    if (this.icon) {
      const img = document.createElement('img');
      img.src = typeof this.icon === 'string'
        ? this.icon
        : this.icon.default || this.icon;
      iconInner.appendChild(img);
    }

    icon.appendChild(iconInner);

    /* triangle and label container */
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '50%';
    container.style.transform = 'translateX(-50%)';
    container.style.bottom = this.iconHeight + 10 + 'px';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.alignItems = 'center';

    /* label */
    const label = document.createElement('div');
    label.className = 'site-marker-label';
    label.style.borderColor = this.borderColor;
    label.style.borderBottomLeftRadius = '0';
    label.style.borderBottomRightRadius = '0';
    label.style.borderBottom = 'none'; // 去掉底部边框，与三角形连接

    const triangle = document.createElement('div');
    triangle.className = 'site-marker-triangle';
    // 设置伪元素的边框颜色与label边框颜色一致
    triangle.style.setProperty('--border-color', this.borderColor);
    triangle.style.marginTop = '-2px'; // 调整重叠量，确保边框正确显示

    label.innerHTML = `
      <span class="site-name" style="color:${this.statusColor}">
        ${this.name}
      </span>
      <span class="site-status" style="color:${this.statusColor}">
        ${this.status}
      </span>
    `;

    // 将label和三角形添加到容器中（顺序很重要）
    container.appendChild(label);
    container.appendChild(triangle);

    // 添加点击事件监听
    const clickableElements = [icon, label];
    clickableElements.forEach(element => {
      element.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.onClickHandler) {
          this.onClickHandler(e, this, {
            name: this.name,
            status: this.status,
            coordinate: this.coordinate,
            statusColor: this.statusColor,
            borderColor: this.borderColor
          });
        }
      });
    });

    anchor.appendChild(icon);
    // anchor.appendChild(line); //不要连接线
    anchor.appendChild(container);

    return anchor;
  }

  /* ================== API ================== */
  setPosition(coordinate) {
    this.coordinate = coordinate;
    this.overlay.setPosition(coordinate);
  }

  onClick(handler) {
    if (typeof handler === 'function') {
      this.onClickHandler = handler;
    }
    return this;
  }

  updateInfo(name, status, statusColor, borderColor) {
    if (name) this.name = name;
    if (status) this.status = status;
    if (statusColor) this.statusColor = statusColor;
    if (borderColor) this.borderColor = borderColor;

    const label = this.anchor.querySelector('.site-marker-label');
    const nameEl = this.anchor.querySelector('.site-name');
    const statusEl = this.anchor.querySelector('.site-status');
    const triangle = this.anchor.querySelector('.site-marker-triangle');

    if (nameEl) nameEl.textContent = this.name;
    if (statusEl) {
      statusEl.textContent = this.status;
      statusEl.style.color = this.statusColor;
    }
    if (label) label.style.borderColor = this.borderColor;
    if (triangle) {
      // 更新三角形边框颜色
      triangle.style.borderTopColor = this.borderColor;
    }
  }

  remove() {
    this.map.removeOverlay(this.overlay);
  }
}
