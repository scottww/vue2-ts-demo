const path = require("path");

// 解析路径的辅助函数
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 部署应用时的基本 URL
  publicPath: process.env.NODE_ENV === "production" ? "/vue2-ts-demo/" : "/",

  // 构建输出目录
  outputDir: "dist",

  // 静态资源目录（相对于 outputDir）
  assetsDir: "static",

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  lintOnSave: process.env.NODE_ENV !== "production",

  // 配置 Webpack
  configureWebpack: (config) => {
    // 设置模式
    config.mode =
      process.env.NODE_ENV === "production" ? "production" : "development";

    // 配置 source map
    if (process.env.NODE_ENV === "production") {
      config.devtool = "source-map"; // 生产环境下生成 source map
    } else {
      config.devtool = "cheap-module-eval-source-map"; // 开发环境下生成 source map
    }

    // 配置路径别名
    config.resolve = {
      ...config.resolve, // 保留默认的 resolve 配置
      alias: {
        ...config.resolve.alias, // 保留默认的别名配置
        "@": resolve("src") // 确保 @ 指向 src 目录
      }
    };

    // 添加 Babel loader 处理 ol 特定文件
    /** 解决报错
      ./node_modules/ol/renderer/webgl/PointsLayer.js 165:61
      Module parse failed: Unexpected token (165:61)
      You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders>
      this.hitDetectionEnabled_ = options.hitDetectionEnabled ?? true;
      const customAttributes = options.attributes
     * */
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    config.module.rules.push({
      test: /PointsLayer\.js$/,
      // include: path.resolve(__dirname, "node_modules/ol/renderer/webgl"),
      include: path.resolve(__dirname, "node_modules/ol"), // 修改为 ol 目录
      use: "babel-loader"
    });
  },

  // 开发服务器配置
  devServer: {
    open: true, // 启动后自动打开浏览器
    host: "localhost", // 开发服务器主机
    port: 8080, // 开发服务器端口
    https: false, // 是否启用 HTTPS
    proxy: {
      // 配置代理
      "/api": {
        target: "http://your-api-server.com", // 代理目标地址
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          "^/api": "" // 重写路径
        }
      }
    }
  },

  // 其他插件配置
  chainWebpack: (config) => {
    // 可以在这里添加更多的 Webpack 配置
    // 例如，添加一个 SVG 加载器
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();

    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  }

  // configureWebpack: {
  //   module: {
  //     rules: [
  //       {
  //         test: /PointsLayer.js$/,
  //         include: path.resolve(__dirname, "node_modules/ol/renderer/webgl"),
  //         use: "babel-loader"
  //       }
  //     ]
  //   }
  // }
};
