import fs from "fs";
import path from "path";


//oneMap
//pumpGateMananement
// 替换文件路径
const targetFile = path.resolve(
  "src/views/bigScreen/pages/normalScreen/Page2.vue"
);

let css = fs.readFileSync(targetFile, "utf-8");

// 计数器
let fontReplacements = 0;
let heightReplacements = 0;
let widthReplacements = 0;
let paddingMarginReplacements = 0;
let fallbackReplacements = 0;

// 通用函数：将 px 转成 rem/VW/VH
function convertPx(value, type) {
  return `${type}(${value}px)`;
}

// padding/margin → 按值个数和方向转换
function convertPaddingMargin(value) {
  const nums = value
    .trim()
    .split(/\s+/)
    .map(v => v.replace("px", "")); // 去掉原 px，后面重新加

  let top, right, bottom, left;

  if (nums.length === 1) {
    top = bottom = `VH(${nums[0]}px)`;
    left = right = `VW(${nums[0]}px)`;
  } else if (nums.length === 2) {
    top = bottom = `VH(${nums[0]}px)`;
    left = right = `VW(${nums[1]}px)`;
  } else if (nums.length === 3) {
    top = `VH(${nums[0]}px)`;
    right = left = `VW(${nums[1]}px)`;
    bottom = `VH(${nums[2]}px)`;
  } else if (nums.length === 4) {
    top = `VH(${nums[0]}px)`;
    right = `VW(${nums[1]}px)`;
    bottom = `VH(${nums[2]}px)`;
    left = `VW(${nums[3]}px)`;
  }

  return `${top} ${right} ${bottom} ${left}`;
}

// 替换 padding/margin
css = css.replace(
  /(padding|margin)\s*:\s*([\d\spx]+);/g,
  (_, prop, val) => {
    paddingMarginReplacements++;
    return `${prop}: ${convertPaddingMargin(val)};`;
  }
);

// 字体 → rem()
css = css.replace(/(font-size\s*:\s*)([0-9.]+)px/g, (_, p, val) => {
  fontReplacements++;
  return `${p}${convertPx(val, "rem")}`;
});

// 高度相关 → VH()，排除所有 border
css = css.replace(
  /(?<!border(?:-top|-right|-bottom|-left|-width)?\s*:\s*)(height|line-height|top|bottom)\s*:\s*([0-9.]+)px/g,
  (_, prop, val) => {
    heightReplacements++;
    return `${prop}: ${convertPx(val, "VH")}`;
  }
);

// 宽度相关 → VW()，排除所有 border
css = css.replace(
  /(?<!border(?:-top|-right|-bottom|-left|-width)?\s*:\s*)(width|left|right|max-width|min-width)\s*:\s*([0-9.]+)px/g,
  (_, prop, val) => {
    widthReplacements++;
    return `${prop}: ${convertPx(val, "VW")}`;
  }
);

// 兜底 → rem()，排除所有 border
css = css.replace(
  /(?<!border(?:-top|-right|-bottom|-left|-width)?\s*:\s*):\s*([0-9.]+)px/g,
  (_, val) => {
    fallbackReplacements++;
    return `: ${convertPx(val, "rem")}`;
  }
);

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
