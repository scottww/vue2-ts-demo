/**
 * 防抖装饰器
 * @param {Function} cb 回调函数
 * @param {number} delay 需要延迟的毫秒数
 * @param {Object} options 选项对象
 * @returns
 */
function debounceFn(cb, delay, options = {}) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(cb.bind(this, ...args), delay);
  };
}

export const debounce = function (delay, options = {}) {
  return function (target, name, descriptor) {
    console.log("使用了防抖, 时间", delay);
    descriptor.value = debounceFn(descriptor.value, delay, options);
  };
};

/**
 * 节流装饰器
 * @param {Function} cb 回调函数
 * @param {number} delay //节流的毫秒
 * @param {Object} options 节流选项对象
 * @returns
 */
function throttleFn(cb, delay, options) {
  let timer = null;
  return function (...args) {
    if (timer) return;
    timer = setTimeout(() => {
      timer = null;
    }, delay);
    cb.call(this, ...args);
  };
}

export const throttle = function (delay, options = {}) {
  return function (target, name, descriptor) {
    console.log("使用了节流, 时间", delay);
    descriptor.value = throttleFn(descriptor.value, delay, options);
  };
};
