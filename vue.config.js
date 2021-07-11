/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2021-04-26 00:46:14
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2021-07-11 12:34:10
 */
const path = require('path')
const webpack = require('webpack')
const createThemeColorReplacerPlugin = require('./config/plugin.config')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// const isProd = process.env.NODE_ENV === 'production'

// const assetsCDN = {
//   // webpack build externals
//   externals: {
//     vue: 'Vue',
//     'vue-router': 'VueRouter',
//     vuex: 'Vuex',
//     axios: 'axios',
//   },
//   css: [],
//   js: [
//     '//cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js',
//     '//cdn.jsdelivr.net/npm/vue-router@3.4.9/dist/vue-router.min.js',
//     '//cdn.jsdelivr.net/npm/vuex@3.5.1/dist/vuex.min.js',
//     '//cdn.jsdelivr.net/npm/axios@0.21.0/dist/axios.min.js',
//   ],
// }

// vue.config.js
const vueConfig = {
  publicPath: './',
  configureWebpack: {
    // webpack plugins
    plugins: [
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // new webpack.DefinePlugin({
      //   APP_VERSION: `"${require('./package.json').version}"`,
      //   GIT_HASH: JSON.stringify(getGitHash()),
      //   BUILD_DATE: buildDate,
      // }),
    ],
    // if prod, add externals
    // externals: isProd ? assetsCDN.externals : {},
  },

  chainWebpack: config => {
    config.resolve.alias.set('@$', resolve('src'))

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

    // if prod is on
    // assets require on cdn
    // if (isProd) {
    //   config.plugin('html').tap(args => {
    //     args[0].cdn = assetsCDN
    //     return args
    //   })
    // }
  },

  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme

          // 'primary-color': '#F5222D',
          // 'link-color': '#F5222D',
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
  lintOnSave: undefined,
  // babel-loader no-ignore node_modules/*
  transpileDependencies: [],
}

// preview.pro.loacg.com only do not use in your production;
if (process.env.VUE_APP_PREVIEW === 'true') {
  // add `ThemeColorReplacer` plugin to webpack plugins
  vueConfig.configureWebpack.plugins.push(createThemeColorReplacerPlugin())
}

module.exports = vueConfig
