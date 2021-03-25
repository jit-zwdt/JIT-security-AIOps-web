let target = process.env.VUE_APP_SERVICE_URL
const webpack = require('webpack')
console.log(target)
module.exports = {
  devServer: {
    https: false,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: target,
        changeOrigin: true,
        pathRewrite: { '^/api': '/api' }
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
      })
    ]
  }
}
