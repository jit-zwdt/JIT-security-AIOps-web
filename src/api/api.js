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
    alertDefine: {
      addalertExpression: {
      },
      addMedium: {
        getMediaTypes: '/mediaType/getMediaTypes'
      },
      addUserMedias: {
        getUserAndMediaInfo: '/user/getUserAndMediaInfo',
        updateUserAndMediaInfo: '/user/updateUserAndMediaInfo/'
      },
      alertDefine: {
        getUserInfo: '/user/getUserInfo'
      },
      alertDefineAdd: {
      },
      alertDefinev1: {
        findTriggerAll: '/trigger/findTriggerAll',
        updateTriggerStatus: '/trigger/updateTriggerStatus/',
        updateTriggerPriority: '/trigger/updateTriggerPriority/'
      },
      chooseItems: {
      }
    },
    alertInquire: {
      alertInquire: {
        findProblemHost: '/problem/findProblemHost'
      }
    },
    alertTemplate: {
      alertTemplate: {
        bindTemplates: '/monitorTemplates/bindTemplates',
        getZabbixTemplates: '/monitorTemplates/getZabbixTemplates',
        checkItems: '/monitorTemplates/checkItems'
      }
    },
    alertType: {
      alertType: {
        getMediaTypes: '/mediaType/getMediaTypes',
        updateStatus: '/mediaType/updateStatus',
        deleteMediaType: '/mediaType/deleteMediaType/'
      },
      alertTypeAdd: {
        addMediaType: '/mediaType/addMediaType',
        updateMediaType: '/mediaType/updateMediaType/',
        findByMediaTypeId: '/mediaType/findByMediaTypeId/'
      }
    },
    queryAlert: {
      queryAlert: {
        bindTemplates: '/monitorTemplates/bindTemplates',
        getZabbixTemplates: '/monitorTemplates/getZabbixTemplates',
        checkItems: '/monitorTemplates/checkItems'
      }
    }
  },
  refreshToken: '/refreshToken'
}
export default api
