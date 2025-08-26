// src/directives/autoScroll.js
// 自动滚动指令
// 使用方法：v-auto-scroll="{ step: 1 }"
// step: 每帧滚动的像素，默认为1
// 鼠标移入暂停，移出继续
// 组件销毁时清理动画
// 流畅版本，使用requestAnimationFrame
export default {
  inserted(el, binding) {
    const step = binding.value?.step || 1;  // 每帧滚动像素
    let isPaused = false;

    // 克隆内容，保持无缝
    const content = el.innerHTML;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = content;
    el.appendChild(wrapper);

    let animationId;

    const animate = () => {
      if (!isPaused) {
        if (el.scrollTop >= el.scrollHeight / 2) {
          el.scrollTop = 0;
        } else {
          el.scrollTop += step;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // 鼠标移入暂停
    el.addEventListener("mouseenter", () => {
      isPaused = true;
    });

    // 鼠标移出继续
    el.addEventListener("mouseleave", () => {
      isPaused = false;
    });

    // 清理
    el._autoScrollDestroy = () => cancelAnimationFrame(animationId);
  },
  unbind(el) {
    el._autoScrollDestroy && el._autoScrollDestroy();
  }
};
