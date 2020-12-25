module.exports = {
  // 生产环境的 source map
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        // 配置别名
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        services: "@/services",
        views: "@/views",
      },
    },
  },
  css: {
    sourceMap: true,
    loaderOptions: {
      // 使用scss全局变量
      scss: {
        prependData: `@import "~assets/scss/variables.scss";`,
      },
    },
  },
};
