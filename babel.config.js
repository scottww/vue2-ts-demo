module.exports = {
  presets: [
    ["@vue/cli-plugin-babel/preset"]
  ],
  plugins: [
    // ["@babel/proposal-decorators", { legacy: true }],
    // ["@babel/proposal-class-properties", { loose: true }],
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }]
  ]
};
