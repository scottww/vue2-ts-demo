// directives/horizontalScroll.js
export default {
  inserted(el) {
    const onWheel = (e) => {
      // 只有在纵向滚动时才拦截，避免误操作
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el._onWheelScroll = onWheel; // 绑定到元素上，便于解绑
    el.addEventListener("wheel", onWheel, { passive: false });
  },
  unbind(el) {
    el.removeEventListener("wheel", el._onWheelScroll);
    delete el._onWheelScroll;
  },
};
