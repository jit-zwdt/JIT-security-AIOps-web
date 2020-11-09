let target = process.env.VUE_APP_SERVICE_URL
console.log(target)
module.exports = {
  devServer: {
    https: false,
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: target,
        changeOrigin: true,
        pathRewrite: {'^/api': '/api'}
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}
