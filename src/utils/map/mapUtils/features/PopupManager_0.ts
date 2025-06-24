// src/features/PopupManager.ts
import Overlay from 'ol/Overlay';
import { Map } from 'ol';

export class PopupManager {
  private map: Map;
  private overlay: Overlay;
  private container: HTMLElement;

  constructor(map: Map) {
    this.map = map;

    // 创建容器
    this.container = document.createElement('div');
    this.container.className = 'ol-popup';
    Object.assign(this.container.style, {
      position: 'absolute',
      background: '#fff',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
      padding: '10px',
      borderRadius: '6px',
      minWidth: '120px',
      zIndex: '999',
    });

    document.body.appendChild(this.container);

    this.overlay = new Overlay({
      element: this.container,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });

    this.map.addOverlay(this.overlay);
  }

  /**
   * 显示弹窗
   * @param coord [lon, lat]
   * @param content HTML 字符串或 HTMLElement
   */
  showPopup(coord: [number, number], content: string | HTMLElement) {
    if (typeof content === 'string') {
      this.container.innerHTML = content;
    } else {
      this.container.innerHTML = '';
      this.container.appendChild(content);
    }

    this.overlay.setPosition(coord);
    this.container.style.display = 'block';
  }

  /**
   * 隐藏弹窗
   */
  hidePopup() {
    this.overlay.setPosition(undefined);
    this.container.style.display = 'none';
  }

  /**
   * 销毁弹窗
   */
  destroy() {
    this.map.removeOverlay(this.overlay);
    this.container.remove();
  }
}
