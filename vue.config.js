const target = process.env.VUE_APP_SERVICE_URL
module.exports = {
  devServer: {
    https: false,
    disableHostCheck: true,
    proxy: {
      '^/': {
        target: target,
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map'
  }
}
