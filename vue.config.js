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

  // CSS 配置（px → rem）不区分环境
  // css: {
  //   loaderOptions: {
  //     postcss: {
  //       postcssOptions: {
  //         plugins: [
  //           require('postcss-pxtorem')({
  //             rootValue: 16, // 设计稿宽度 / 16 (比如设计稿宽度是 375)
  //             propList: ['*'], // 需要转换的属性，* 表示全部
  //             unitPrecision: 5, // 转换后小数位数
  //             selectorBlackList: ['.ignore', '.no-rem'], // 忽略转换的类
  //             replace: true,
  //             mediaQuery: false, // 是否允许媒体查询里转换 px
  //             minPixelValue: 2 // 小于等于 2px 不转换
  //           })
  //         ]
  //       }
  //     }
  //   }
  // },

  // CSS 配置（px → rem）区分环境
  // css: {
  //   loaderOptions: {
  //     postcss: {
  //       postcssOptions: {
  //         plugins: [
  //           ...(process.env.NODE_ENV === "production"
  //             ? [
  //                 require("postcss-pxtorem")({
  //                   rootValue: 16, // 1rem = 16px，设计稿宽度 / 16 (比如设计稿宽度是 375) 可根据设计稿调整
  //                   propList: ["*"], // 需要转换的属性，* 表示全部
  //                   unitPrecision: 5, // 转换后小数位数
  //                   // replace: true,
  //                   // mediaQuery: false, // 是否允许媒体查询里转换 px
  //                   minPixelValue: 2, // 小于等于 2px 不转换
  //                   selectorBlackList: [".ignore", ".no-rem"], // 忽略类名
  //                 }),
  //               ]
  //             : []),
  //         ],
  //       },
  //     },
  //   },
  // },

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

    // 处理 sql.js 的现代 JS
    config.module.rules.push({
      test: /sql-wasm\.js$/,
      include: path.resolve(__dirname, "node_modules/sql.js/dist"),
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      }
    });

    // 如果要加载 wasm 文件
    config.module.rules.push({
      test: /\.wasm$/,
      type: "webassembly/experimental"
    });
  },

  // 开发服务器配置
  devServer: {
    open: true, // 启动后自动打开浏览器
    host: "localhost", // 开发服务器主机
    port: 8089, // 开发服务器端口
    https: false, // 是否启用 HTTPS
    // proxy: {
    //   // 配置代理
    //   "/api": {
    //     target: "http://your-api-server.com", // 代理目标地址
    //     changeOrigin: true, // 是否跨域
    //     pathRewrite: {
    //       "^/api": "" // 重写路径
    //     }
    //   }
    // },
    // 解决某些系统或环境中新建文件不被 webpack-dev-server 热更新的问题
    watchOptions: {
      poll: 1000, // 每秒检查一次文件是否有变化
      ignored: /node_modules/ // 忽略 node_modules，提高性能
    }
  },

  transpileDependencies: ["pdfjs-dist"], // ✅ 让 babel 转译 pdfjs-dist
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

    // 使用 ol 7.5.2 版本, 支持可选链操作符
    // config.module
    //   .rule("js")
    //   .test(/\.m?js$/)
    //   .include.add(path.resolve("node_modules/ol"))
    //   .end()
    //   .use("babel-loader")
    //   .loader("babel-loader")
    //   .tap((options) => {
    //     options.presets = [
    //       ["@babel/preset-env", { targets: { browsers: "last 2 versions" } }]
    //     ];
    //     options.plugins = [
    //       "@babel/plugin-proposal-optional-chaining",
    //       ["@babel/plugin-proposal-class-properties", { loose: true }]
    //     ];
    //     return options;
      // });
  }
};
