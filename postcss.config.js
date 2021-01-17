// module.exports = {
//   plugins: {
// 		autoprefixer: {},
//     "postcss-px-to-viewport": {
//       viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度.
//       viewportHeight: 667,// 视窗的高度，对应的是我们设计稿的高度.(也可以不配置)
//       unitPrecision: 5, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
//       viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
//       selectorBlackList: ['ignore'], // 指定不需要转换的类
//       minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位.
//       mediaQuery: false, // 允许在媒体查询中转换`px`
//       exclude: [/TabBar/] // 不被转化的组件名称，必须写正则表达式，进行匹配 (当前写法 表示组件名称包含TabBar的组件)
//     }
//   }
// }