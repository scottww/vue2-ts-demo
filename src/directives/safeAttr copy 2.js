// src/directives/safeAttr.js
export default {
  bind(el, binding) {
    setSafeAttr(el, binding);
  },
  update(el, binding) {
    setSafeAttr(el, binding);
  }
};

function setSafeAttr(el, binding) {
  const val = binding.value || "";
  const attr = binding.arg || "href"; // 默认绑定 href，可用 v-safe-attr:src
  const safe = isSafeUrl(val);

  if (safe) {
    el.setAttribute(attr, val);
  } else {
    el.setAttribute(attr, "javascript:void(0)");
    console.warn(`[v-safe-attr] 拦截不安全链接:`, val);
  }
}

function isSafeUrl(url) {
  // 允许协议：https / mailto / tel / 站内链接 / 空
  return (
    /^https?:\/\//i.test(url) ||
    /^mailto:/i.test(url) ||
    /^tel:/i.test(url) ||
    url.startsWith("/") ||
    url.startsWith("#") ||
    url === ""
  );
}
