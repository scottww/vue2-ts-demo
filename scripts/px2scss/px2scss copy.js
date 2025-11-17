import fs from "fs"
import path from "path"

// 替换文件路径
const targetFile = path.resolve(`src/views/bigScreen/components/normalScreen/oneMap/WaterRainInformationPanel.vue`)
let css = fs.readFileSync(targetFile, "utf-8")

// 字体 → rem()
css = css.replace(
  /(font-size\s*:\s*)([0-9.]+)px/g,
  (_, p, val) => `${p}rem(${val}px)`
)

// 高度相关 → VH()
css = css.replace(
  /(height|line-height|top|bottom|margin-top|margin-bottom|padding-top|padding-bottom)\s*:\s*([0-9.]+)px/g,
  (_, prop, val) => `${prop}: VH(${val}px)`
)

// 宽度相关 → VW()
css = css.replace(
  /(width|left|right|margin-left|margin-right|padding-left|padding-right|max-width|min-width)\s*:\s*([0-9.]+)px/g,
  (_, prop, val) => `${prop}: VW(${val}px)`
)

// 兜底 → rem()
css = css.replace(/:\s*([0-9.]+)px/g, (_, val) => `: rem(${val}px)`)

fs.writeFileSync(targetFile, css)
console.log("✅ 替换完成")
