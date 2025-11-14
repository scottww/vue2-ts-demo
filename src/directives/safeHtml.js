import Vue from 'vue';
import DOMPurify from 'dompurify';

/**
 * 全局安全指令
 * 使用方式：
 * <div v-safe-html="htmlContent"></div>
 * 写法替代：
 * <div v-html="html"></div>	=> <div v-safe-html="html"></div>
 * el.innerHTML = html => el.innerHTML = DOMPurify.sanitize(html)
 */
Vue.directive('safe-html', {
  bind(el, binding) {
    el.innerHTML = DOMPurify.sanitize(binding.value || '');
  },
  update(el, binding) {
    el.innerHTML = DOMPurify.sanitize(binding.value || '');
  }
});