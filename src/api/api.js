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
  malfunctionSolve: {
    // malfunctionDisposeRegister
    findClaimByUser: '/problem/findClaimByUser',
    addRegister: '/register/addRegister',
    updateClaimAfterRegister: '/problem/updateClaimAfterRegister',
    findRegisterByClaimId: '/register/findRegisterByClaimId/',
    // malfunctionSolveClaim
    findByProblemId: '/problem/findByProblemId',
    findBySeverityLevel: '/problem/findBySeverityLevel',
    findUserByRole: '/user/findUserByRole',
    findAllRole: '/role/findAllRole',
    addClaim: '/problem/addClaim',
    // malfunctionStatisticalStatement
    problemSolveReport: '/problem/problemSolveReport'
  },
  monitorManager: {
    // this.$api.monitorManager.
    // helpTemplates
    // monitorDB
    getZabbixHostGroupByHostType: '/host/getZabbixHostGroupByHostType',
    getTop5Msg: '/top5/getTop5Msg',
    getTop5ByTrigger: '/host/getTop5ByTrigger',
    // monitorDBMysqlInfo
    updateHostEnableMonitor: '/host/updateHostEnableMonitor/',
    getItemInfoListItem: '/item/getItemInfoList',
    findHostIdinfo: '/host/findHostIdinfo/',
    findHostAvailable: '/host/findHostAvailable',
    findHostDetailItems: '/trend/findHostDetailItems/',
    getItemInfoListTrend: '/trend/getItemInfoList',
    checkHostDetailItem: '/trend/checkHostDetailItem',
    addHostDetailItem: '/trend/addHostDetailItem',
    deleteHostDetailItem: '/trend/deleteHostDetailItem/',
    deleteHostDetailGraph: '/trend/deleteHostDetailGraph/',
    addHostDetailGraph: '/trend/addHostDetailGraph',
    checkHostDetailGraph: '/trend/checkHostDetailGraph',
    getResultList: '/gItem/getResultList',
    findHostDetailGraphs: '/trend/findHostDetailGraphs/',
    getGProInfoList: '/gPrototype/getGProInfoList',
    createGpro: '/gPrototype/createGpro',
    // monitorDBOracleInfo 上面的 monitorDBMysqlInfo 都有
    // monitorMiddleware 上面的 monitorDBMysqlInfo 都有
    // monitorPossessionInfo 上面的 monitorDBMysqlInfo 都有
    // monitorSystem 上面的 monitorDBMysqlInfo 都有
    // monitorTemplates
    checkItems: '/monitorTemplates/checkItems',
    getMonitorTemplates: '/monitorTemplates/getMonitorTemplates',
    getMonitorTypes: '/monitorType/getMonitorTypes',
    // monitorview
    updateItemStatus: '/item/updateItemStatus/',
    findByCondition: '/trigger/findByCondition',
    findById: '/host/findById/',
    getZabbixHostGroup: '/hostGroup/getZabbixHostGroup',
    getJsonTypes: '/monitorType/getJsonTypes',
    findByConditionInfo: '/assets/findByConditionInfo',
    addHost: '/host/addHost',
    updateHost: '/host/updateHost/',
    getTemplates: '/monitorTemplates/getTemplates',
    deleteHost: '/host/deleteHost/',
    hostinfo: '/host/hostinfo',
    getMonitorSubTypes: '/monitorType/getMonitorSubTypes'
  },
  sysManager: {
    // departmentManager/department
    getDepartment: '/sys/department/getDepartment/',
    getDepartmentInfos: '/sys/department/getDepartmentInfos',
    delDepartment: '/sys/department/delDepartment/',
    // departmentManager/departmentAdd
    addDepartment: '/sys/department/addDepartment',
    // departmentManager/vallidator.js
    checkDepartCode: '/sys/department/checkDepartCode/',
    // dictionaryManager/dictionary
    getDictionary: '/sys/dictionary/getDictionary',
    deleteDictionary: '/sys/dictionary/deleteDictionary/',
    deleteDictionaryItem: '/sys/dictionary/deleteDictionaryItem/',
    findDictionaryItemByDicId: '/sys/dictionary/findDictionaryItemByDicId',
    // dictionaryManager/dictionaryAdd
    addDictionary: '/sys/dictionary/addDictionary',
    findDictionaryById: '/sys/dictionary/findDictionaryById/',
    checkDictCode: '/sys/dictionary/checkDictCode/',
    checkDictName: '/sys/dictionary/checkDictName/',
    // dictionaryManager/dictionaryItemAdd
    checkItemText: '/sys/dictionary/checkItemText',
    addDictionaryItem: '/sys/dictionary/addDictionaryItem',
    findDictionaryItemById: '/sys/dictionary/findDictionaryItemById/',
    // menuManager/menu
    getMenus: '/sys/menu/getMenus',
    // roleManager/roleAdd
    getRole: '/sys/role/getRole/',
    addRole: '/sys/role/addRole',
    // roleManager/role
    getRoles: '/sys/role/getRoles',
    delRole: '/sys/role/delRole/',
    // roleManager/validators.js
    checkRoleName: '/sys/role/checkRoleName/',
    checkRoleSign: '/sys/role/checkRoleSign/',
    // userManager/user
    getUsers: '/sys/user/getUsers',
    getAllDepartment: '/sys/department/getAllDepartment',
    deleteUser: '/sys/user/deleteUser/',
    addUser: '/sys/user/addUser',
    // userManager/userAdd
    checkUserName: '/sys/user/checkUserName/',
    findUserById: '/sys/user/findUserById/'
  },
  main: {
    // Index.vue
    getMonitorTypeUsedInfo: '/homePage/getMonitorTypeUsedInfo',
    getTimeTop5ItemInfo: '/homePage/getTimeTop5ItemInfo/',
    getUserInfo: '/user/getUserInfo',
    getAlertdata: '/problem/getAlertdata'
  },
  refreshToken: '/refreshToken'
}
export default api
