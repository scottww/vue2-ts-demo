// CSS 配置（px → rem）不区分环境
module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-pxtorem": {
      rootValue: 16, // 设计稿宽度 / 16 (比如设计稿宽度是 375)
      propList: ["*"], // 需要转换的属性，* 表示全部
      unitPrecision: 5, // 转换后小数位数
      selectorBlackList: [".ignore", ".no-rem"], // 忽略转换的类
      replace: true,
      mediaQuery: false, // 是否允许媒体查询里转换 px
      minPixelValue: 2 // 小于等于 2px 不转换
    }
  }
};
