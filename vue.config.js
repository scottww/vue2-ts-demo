module.exports = {
  // assertsDir: "./",
  // outputDir: 'dist'
  publicPath: process.env.NODE_ENV === "production" ? "/vue2-ts-demo" : "/",
  configureWebpack: config => {
    config.mode = 'development';
    if (process.env.NODE_ENV === 'production') {
      config.devtool = 'source-map'; // 在生产环境下生成 source map 文件
    } else {
      config.devtool = 'cheap-module-eval-source-map'; // 在开发环境下生成 source map 文件
    }
  }
};
