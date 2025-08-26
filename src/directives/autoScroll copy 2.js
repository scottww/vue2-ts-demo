// src/directives/autoScroll.js
export default {
  inserted(el, binding) {
    const step = binding.value?.step || 1;
    const speed = binding.value?.speed || 30;

    let timer = null;

    const move = () => {
      const maxScroll = (el.scrollHeight - el.clientHeight) / 2;
      if (el.scrollTop >= maxScroll) {
        el.scrollTop = 0;
      } else {
        el.scrollTop += step;
      }
    };

    timer = setInterval(move, speed);

    el.addEventListener("mouseenter", () => clearInterval(timer));
    el.addEventListener("mouseleave", () => {
      timer = setInterval(move, speed);
    });

    // 保存销毁函数
    el._autoScrollDestroy = () => clearInterval(timer);
  },
  unbind(el) {
    el._autoScrollDestroy && el._autoScrollDestroy();
  }
};
