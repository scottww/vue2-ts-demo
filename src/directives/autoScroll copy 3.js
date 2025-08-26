// src/directives/autoScroll.js
export default {
  inserted(el, binding) {
    const step = binding.value?.step || 1;    // 每次滚动像素
    const speed = binding.value?.speed || 30; // 滚动速度(ms)

    // 先把容器里内容复制一份放在底部，实现循环效果
    const content = el.innerHTML;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = content;
    el.appendChild(wrapper);

    let timer = null;

    const move = () => {
      if (el.scrollTop >= el.scrollHeight / 2) {
        // 到底瞬移到顶部
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

    el._autoScrollDestroy = () => clearInterval(timer);
  },
  unbind(el) {
    el._autoScrollDestroy && el._autoScrollDestroy();
  }
};
