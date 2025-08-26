// src/directives/autoScroll.js
export default {
  mounted(el, binding) {
    const step = binding.value?.step || 1;   // 每次滚动的像素
    const speed = binding.value?.speed || 30; // 滚动速度(ms)

    let timer = null;

    const move = () => {
      // 注意：这里取一半高度是因为内容是翻倍的
      const maxScroll = (el.scrollHeight - el.clientHeight) / 2;

      if (el.scrollTop >= maxScroll) {
        el.scrollTop = 0;
      } else {
        el.scrollTop += step;
      }
    };

    timer = setInterval(move, speed);

    // 鼠标移入暂停
    el.addEventListener("mouseenter", () => clearInterval(timer));

    // 鼠标移出继续
    el.addEventListener("mouseleave", () => {
      timer = setInterval(move, speed);
    });

    // 销毁时清理
    el._autoScrollDestroy = () => clearInterval(timer);
  },
  unmounted(el) {
    el._autoScrollDestroy && el._autoScrollDestroy();
  }
};
