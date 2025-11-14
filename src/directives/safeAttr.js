// src/directives/safeAttr.js

// 允许的协议白名单
const ALLOWED_PROTOCOLS = ["http:", "https:", "mailto:", "tel:"];

// 判断 URL 是否安全
function isSafeUrl(url) {
  if (!url) return false;

  // 1. 允许锚点: #xxx
  if (url.startsWith("#")) return true;

  // 2. 允许站内相对路径: /api/xxx
  if (url.startsWith("/")) return true;

  // 3. 尝试解析 URL
  try {
    const parsed = new URL(url, window.location.origin);
    return ALLOWED_PROTOCOLS.includes(parsed.protocol);
  } catch (err) {
    console.warn("[v-safe-attr] Invalid URL blocked:", url);
    return false;
  }
}

export default {
  bind(el, binding) {
    applySafeAttr(el, binding);
  },
  update(el, binding) {
    applySafeAttr(el, binding);
  }
};

// 最核心逻辑
function applySafeAttr(el, binding) {
  const unsafeValue = binding.value;
  const attr = binding.arg || detectDefaultAttr(el); // 识别属性类型

  if (!attr) {
    console.warn(`[v-safe-attr] 无法识别可用属性，元素:", el`);
    return;
  }

  if (isSafeUrl(unsafeValue)) {
    el.setAttribute(attr, unsafeValue);
  } else {
    el.setAttribute(attr, "javascript:void(0)");
    console.warn(`[v-safe-attr] 已阻止危险链接:`, unsafeValue);
  }
}

// 自动识别 href/src
function detectDefaultAttr(el) {
  if ("href" in el) return "href";
  if ("src" in el) return "src";
  return null;
}
