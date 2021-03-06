const home = {
  name: '首页',
  path: '/index',
  permissionsKey: '',
  icon: 'fa fa-tachometer'
}
const sysManager = {
  name: '系统管理',
  permissionsKey: '',
  icon: 'fa el-icon-s-tools',
  children: {
    departmentManager: {
      name: '部门管理',
      icon: 'fa el-icon-menu',
      path: '/sysManager/department',
      permissionsKey: ''
    },
    userManager: {
      name: '人员管理',
      icon: 'fa el-icon-user-solid',
      path: '/sysManager/user',
      permissionsKey: ''
    },
    roleManager: {
      name: '角色维护',
      icon: 'fa el-icon-s-check',
      path: '/sysManager/role',
      permissionsKey: ''
    },
    menuManager: {
      name: '菜单管理',
      icon: 'fa el-icon-tickets',
      path: '/sysManager/menu',
      permissionsKey: ''
    },
    dictionaryManager: {
      name: '字典管理',
      icon: 'fa el-icon-notebook-2',
      path: '/sysManager/dictionary',
      permissionsKey: ''
    },
    logManager: {
      name: '日志管理',
      icon: 'fa el-icon-notebook-2',
      path: '/sysManager/log',
      permissionsKey: ''
    }
  }
}
const assetsManager = {
  name: '资产管理',
  permissionsKey: '',
  icon: 'fa fa-cubes',
  children: {
    hostManager: {
      name: '资产信息',
      permissionsKey: '',
      icon: 'fa fa-cube',
      path: '/assetsManager/assetsList'
    }
  }
}
const monitorManager = {
  name: '监控',
  permissionsKey: '',
  icon: 'fa el-icon-monitor',
  children: {
    monitorList: {
      name: '监控列表',
      permissionsKey: '',
      icon: 'fa el-icon-s-operation',
      path: '/monitorManager/monitorList'
    },
    // monitorNetwork: {
    //   name: '监控网络设备',
    //   permissionsKey: '',
    //   icon: 'fa el-icon-s-operation',
    //   path: '/monitorManager/monitorNetworkIndex'
    // },
    monitorSystem: {
      name: '监控操作系统',
      permissionsKey: '',
      icon: 'fa el-icon-s-operation',
      path: '/monitorManager/monitorSystemIndex'
    },
    monitorMiddleware: {
      name: '监控中间件',
      permissionsKey: '',
      icon: 'fa el-icon-s-operation',
      path: '/monitorManager/monitorMiddlewareIndex'
    },
    monitorDB: {
      name: '监控数据库',
      permissionsKey: '',
      icon: 'fa el-icon-s-operation',
      path: '/monitorManager/monitorDBIndex'
    },
    monitorTemplates: {
      name: '监控模板',
      permissionsKey: '',
      icon: 'fa el-icon-tickets',
      path: '/monitorManager/monitorTemplateList'
    }
  }
}

const alertManager = {
  name: '告警管理',
  permissionsKey: '',
  icon: 'fa el-icon-monitor',
  children: {
    alertDefine: {
      name: '告警定义',
      permissionsKey: '',
      icon: 'fa el-icon-s-operation',
      path: '/alertManager/alertDefine'
    },
    alertType: {
      name: '告警通知方式',
      permissionsKey: '',
      icon: 'fa el-icon-s-operation',
      path: '/alertManager/alertType'
    },
    alertTemplate: {
      name: '告警通知模板',
      permissionsKey: '',
      icon: 'fa el-icon-s-operation',
      path: ''
    },
    alertInquire: {
      name: '统一告警查询',
      permissionsKey: '',
      icon: 'fa el-icon-s-operation',
      path: '/alertManager/alertInquire'
    }
  }
}

const malfunctionSolve = {
  name: '故障解决',
  permissionsKey: '',
  icon: 'fa el-icon-monitor',
  children: {
    alertDefine: {
      name: '故障认领',
      permissionsKey: '',
      icon: 'fa el-icon-s-operation',
      path: '/malfunctionSolve/malfunctionSolveClaim'
    },
    alertType: {
      name: '故障处理登记',
      permissionsKey: '',
      icon: 'fa el-icon-s-operation',
      path: '/malfunctionSolve/malfunctionDisposeRegister'
    },
    alertTemplate: {
      name: '故障解决统计报表',
      permissionsKey: '',
      icon: 'fa el-icon-s-operation',
      path: '/malfunctionSolve/malfunctionStatisticalStatement'
    }
  }
}

export default {
  home,
  sysManager,
  assetsManager,
  monitorManager,
  alertManager,
  malfunctionSolve
}
