const api = {
  login: '/login',
  index: '/index',
  regionManager: {
    list: '/regionManager/list'
  },
  assetsManager: {
    assetsList: {
      assetsAdd: {
        addAssets: '/assets/addAssets',
        updateAssets: '/assets/updateAssets/',
        findById: '/assets/findById/'
      },
      assetsList: {
        deleteAssets: '/assets/deleteAssets/',
        findByCondition: '/assets/findByCondition'
      }
    }
  },
  alertManager: {

  },
  refreshToken: '/refreshToken'
}
export default api
