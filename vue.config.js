const createThemeColorReplacerPlugin = require('./config/plugin.config')

const vueConfig = {
  publicPath: './',
  configureWebpack: {
    plugins: [createThemeColorReplacerPlugin()],
    performance: {
      hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
      // 入口起点的最大体积 bytes
      maxEntrypointSize: 5000000,
      // 生成文件的最大体积 bytes
      maxAssetSize: 3000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      },
    },
  },
  chainWebpack: (config) => {
    // config.resolve.alias.set('@$', resolve('src'))
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]',
      })
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'border-radius-base': '2px',
        },
        // DO NOT REMOVE THIS LINE
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    port: 8000,
  },
  productionSourceMap: false,
  lintOnSave: true,
}

if (process.env.VUE_APP_PREVIEW === 'true') {
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig
