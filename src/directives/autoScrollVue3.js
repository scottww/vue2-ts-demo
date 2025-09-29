// src/directives/autoScrollVue3.js
export default {
  mounted(el, binding) {
    let step = binding.value?.step ?? 1  // 每帧滚动的像素，可小于1

    // 限制最小和最大滚动速度
    const MIN_STEP = 0.1  // 最慢每帧0.1px
    const MAX_STEP = 3    // 最快每帧3px
    step = Math.max(MIN_STEP, Math.min(step, MAX_STEP))

    let animationId = null
    let accumulated = 0

    const bodyWrapper = el.querySelector(".el-table__body-wrapper")
    const scrollEl = bodyWrapper || el

    const animate = () => {
      accumulated += step
      const intStep = Math.floor(accumulated)  // 只滚动整数像素
      if (intStep > 0) {
        scrollEl.scrollTop += intStep
        accumulated -= intStep
      }

      if (scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight) {
        scrollEl.scrollTop = 0
        accumulated = 0
      }

      animationId = requestAnimationFrame(animate)
    }

    const start = () => {
      if (!animationId) {
        animationId = requestAnimationFrame(animate)
      }
    }

    const stop = () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
        animationId = null
      }
    }

    start()

    scrollEl.addEventListener("mouseenter", stop)
    scrollEl.addEventListener("mouseleave", start)

    el._autoScrollDestroy = () => {
      stop()
      scrollEl.removeEventListener("mouseenter", stop)
      scrollEl.removeEventListener("mouseleave", start)
    }
  },
  unmounted(el) {
    const bodyWrapper = el.querySelector(".el-table__body-wrapper")
      ; (bodyWrapper || el)._autoScrollDestroy?.()
  }
}
