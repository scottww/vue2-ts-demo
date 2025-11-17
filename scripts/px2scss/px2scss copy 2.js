import fs from "fs";
import path from "path";

// 替换文件路径
const targetFile = path.resolve(
  "src/views/bigScreen/components/normalScreen/oneMap/EmergencySupportPanel.vue"
);

let css = fs.readFileSync(targetFile, "utf-8");

// 计数器
let fontReplacements = 0;
let heightReplacements = 0;
let widthReplacements = 0;
let paddingMarginReplacements = 0;
let fallbackReplacements = 0;

// 通用函数：将 px 转成指定单位
function convertPx(value, type) {
  const nums = value.split(/\s+/).map(v => v.replace("px", ""));
  return nums
    .map(v => {
      switch (type) {
        case "VW":
          return `VW(${v}px)`;
        case "VH":
          return `VH(${v}px)`;
        case "REM":
          return `rem(${v}px)`;
      }
    })
    .join(" ");
}

// 字体 → rem()
css = css.replace(/(font-size\s*:\s*)([0-9.]+)px/g, (_, p, val) => {
  fontReplacements++;
  return `${p}rem(${val}px)`;
});

// 高度相关 → VH()
css = css.replace(
  /(height|line-height|top|bottom)\s*:\s*([0-9.]+)px/g,
  (_, prop, val) => {
    heightReplacements++;
    return `${prop}: VH(${val}px)`;
  }
);

// 宽度相关 → VW()
css = css.replace(
  /(width|left|right|max-width|min-width)\s*:\s*([0-9.]+)px/g,
  (_, prop, val) => {
    widthReplacements++;
    return `${prop}: VW(${val}px)`;
  }
);

// padding/margin → VW()，支持多值
css = css.replace(
  /(padding|margin)\s*:\s*([\dpx\s]+);/g,
  (_, prop, val) => {
    paddingMarginReplacements++;
    return `${prop}: ${convertPx(val.trim(), "VW")};`;
  }
);

// 兜底 → rem()
css = css.replace(/:\s*([0-9.]+)px/g, (_, val) => {
  fallbackReplacements++;
  return `: rem(${val}px)`;
});

fs.writeFileSync(targetFile, css);

console.log(`
✅ 文件处理完成
📄 文件路径: ${targetFile}
🅰️ 字体替换次数: ${fontReplacements}
📏 高度相关替换次数: ${heightReplacements}
📐 宽度相关替换次数: ${widthReplacements}
📦 padding/margin 替换次数: ${paddingMarginReplacements}
🔄 兜底替换次数: ${fallbackReplacements}
`);
