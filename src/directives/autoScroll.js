export default {
  inserted(el, binding) {
    const step = binding.value?.step || 1;
    let isPaused = false;

    // 找到 el-table 的内容容器，如果不是表格就用 el 本身
    const bodyWrapper = el.querySelector(".el-table__body-wrapper");
    const scrollEl = bodyWrapper || el;

    let animationId;

    const animate = () => {
      if (!isPaused) {
        scrollEl.scrollTop += step;
        if (scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight) {
          scrollEl.scrollTop = 0; // 回到顶部
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();

    scrollEl.addEventListener("mouseenter", () => (isPaused = true));
    scrollEl.addEventListener("mouseleave", () => (isPaused = false));

    scrollEl._autoScrollDestroy = () => cancelAnimationFrame(animationId);
  },
  unbind(el) {
    const bodyWrapper = el.querySelector(".el-table__body-wrapper");
    (bodyWrapper || el)._autoScrollDestroy?.();
  }
};
