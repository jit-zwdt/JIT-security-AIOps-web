const api = {
  login: '/login',
  index: '/index',
  regionManager: {
    list: '/regionManager/list'
  },
  assetsManager: {
    assetsList: '/assetsManager/assetsList'
  },
  malfunctionSolve: {
    // malfunctionDisposeRegister
    findClaimByUser: '/problem/findClaimByUser',
    addRegister: '/register/addRegister',
    updateClaimAfterRegister: '/problem/updateClaimAfterRegister',
    findRegisterByClaimId: '/register/findRegisterByClaimId/',
    // malfunctionSolveClaim
    findByProblemId: '/problem/findByProblemId',
    findById: '/assets/findById/',
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
    bindTemplates: '/monitorTemplates/bindTemplates',
    getZabbixTemplates: '/monitorTemplates/getZabbixTemplates',
    checkItems: '/monitorTemplates/checkItems',
    getMonitorTemplates: '/monitorTemplates/getMonitorTemplates',
    getMonitorTypes: '/monitorType/getMonitorTypes',
    // monitorview
    updateItemStatus: '/item/updateItemStatus/',
    findByCondition: '/trigger/findByCondition',
    updateTriggerStatus: '/trigger/updateTriggerStatus/',
    updateTriggerPriority: '/trigger/updateTriggerPriority/',
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
  refreshToken: '/refreshToken'
}
export default api
