const home = {
  name: '首页',
  path: '/index',
  permissionsKey: '',
  icon: 'fa fa-tachometer'
}
const regionManager = {
  name: '各地区信息',
  permissionsKey: '',
  icon: 'fa fa-book',
  children: {
    regionManager: {
      name: '各地区服务器管理',
      path: '/regionManager/list',
      permissionsKey: ''
    },
    regionInfo: {
      name: '地区信息维护',
      path: '/regionManager/info',
      permissionsKey: ''
    }
  }
}
const updateManager = {
  name: '版本升级管理',
  permissionsKey: '',
  icon: 'fa fa-bomb',
  children: {
    versionPub: {
      name: '版本发布',
      path: '/versionPub',
      permissionsKey: ''
    },
    versionHistory: {
      name: '版本回溯',
      path: '/versionHistory',
      permissionsKey: ''
    },
    versionError: {
      name: '版本异常',
      path: '/versionError',
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
    monitorTemplates: {
      name: '监控模板',
      permissionsKey: '',
      icon: 'fa el-icon-tickets',
      path: '/monitorManager/monitorTemplateList'
    }
  }
}
export default {
  home,
  regionManager,
  updateManager,
  assetsManager,
  monitorManager
}
