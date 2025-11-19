module.exports = {
  presets: [["@vue/cli-plugin-babel/preset", { loose: true }]],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],

    // 明确指定 loose:true
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-transform-class-properties", { loose: true }],
    ["@babel/plugin-transform-private-methods", { loose: true }],
    ["@babel/plugin-transform-private-property-in-object", { loose: true }],
  ]
};
