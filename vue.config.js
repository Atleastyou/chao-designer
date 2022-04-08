const path = require('path')
const pxtorem = require('postcss-pxtorem')
const postcss = pxtorem({
  rootValue: 37.5,
  unitPrecision: 5,
  propList: ['*'],
  selectorBlackList: [],
  replace: true,
  mediaQuery: false,
  minPixelValue: 0,
  exclude: function (file) {
    const exclude = ['src\\components', 'src\\editor', 'packages\\components', 'node_modules']
    return exclude.find(src => file.indexOf(src) !== -1)
  }
})

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'assets',
  runtimeCompiler: false,
  productionSourceMap: false,
  parallel: true,
  configureWebpack: config => {
    let _config = {}
    _config.resolve = {
      alias: {
        utils: resolve('utils'),
        api: resolve('api/index.js')
      }
    }
    return _config
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    proxy: {
      '/api/*': {
        target: 'http://t.dt.shop.chaodp.com',
        changeOrigin: true,
        secure: false
      }
    }
  },
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    config.module
    .rule('js')
    .include
    .add('/packages/')
    .end()
    .use('babel')
    .loader('babel-loader')
    .tap(options => {
      // 修改它的选项...
      return options
    })
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [postcss],
      }
    }
  }
}
