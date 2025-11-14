import DOMPurify from "dompurify";

const allowedProtocols = ["http:", "https:", "mailto:", "tel:"];

export default {
  bind(el, binding) {
    apply(el, binding.value);
  },
  update(el, binding) {
    apply(el, binding.value);
  }
};

function apply(el, unsafeUrl) {
  if (!unsafeUrl) {
    el.removeAttribute("href");
    el.removeAttribute("src");
    return;
  }

  try {
    const url = new URL(unsafeUrl, window.location.origin);

    if (!allowedProtocols.includes(url.protocol)) {
      console.warn("Blocked unsafe URL:", unsafeUrl);
      return;
    }

    // 给所有可用属性赋值（自动识别是哪种）
    if ("href" in el) el.href = unsafeUrl;
    if ("src" in el) el.src = unsafeUrl;

  } catch (e) {
    console.warn("Invalid URL blocked:", unsafeUrl);
  }
}
