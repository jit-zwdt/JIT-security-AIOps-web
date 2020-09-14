import MonitorTemplateList from '@/views/monitorManager/monitorTemplates/monitorTemplateList.vue'
import MonitorList from '@/views/monitorManager/monitorview/monitorList.vue'
import MonitorAdd from '@/views/monitorManager/monitorview/monitorAdd.vue'
import MonitorAddList from '@/views/monitorManager/monitorview/monitorAddList.vue'
import ItemList from '@/views/monitorManager/monitorview/item/itemList.vue'
import MonitorNetworkIndex from '@/views/monitorManager/monitorNetwork/monitorIndex.vue'
import MonitorDBIndex from '@/views/monitorManager/monitorDB/monitorIndex.vue'
import MonitorSystemIndex from '@/views/monitorManager/monitorSystem/monitorIndex.vue'
import MonitorMiddlewareIndex from '@/views/monitorManager/monitorMiddleware/monitorIndex.vue'
import MonitorPossessionJmxInfo from '@/views/monitorManager/monitorPossessionInfo/monitorPossessionJmxInfo.vue'
import MonitorPossessionOSInfo from '@/views/monitorManager/monitorPossessionInfo/monitorPossessionOSInfo.vue'
import MonitorMysqlInfo from '@/views/monitorManager/monitorDBMysqlInfo/monitorMysqlInfo.vue'
import MonitorOracleInfo from '@/views/monitorManager/monitorDBOracleInfo/monitorOracleInfo.vue'
import MonitorPossessionJvmInfo from '@/views/monitorManager/monitorJVMInfo/monitorPossessionJvmInfo.vue'
import MonitorJVMInfo from '@/views/monitorManager/monitorJVMInfo/monitorIndex.vue'

export default [
  {
    path: 'monitorList',
    name: 'monitorList',
    component: MonitorList,
    meta: {
      title: '监控列表'
    }
  },
  {
    path: 'monitorNetworkIndex',
    name: 'monitorNetworkIndex',
    component: MonitorNetworkIndex,
    meta: {
      title: '网络设备',
      typeId: '4'
    }
  },
  {
    path: 'monitorDBIndex',
    name: 'monitorDBIndex',
    component: MonitorDBIndex,
    meta: {
      title: '数据库',
      typeId: '2'
    }
  },
  {
    path: 'monitorMysqlInfo',
    name: 'monitorMysqlInfo',
    component: MonitorMysqlInfo,
    meta: {
      title: '数据库Mysql详细信息'
    }
  },
  {
    path: 'monitorOracleInfo',
    name: 'monitorOracleInfo',
    component: MonitorOracleInfo,
    meta: {
      title: '数据库Oracle详细信息'
    }
  },
  {
    path: 'monitorMiddlewareIndex',
    name: 'monitorMiddlewareIndex',
    component: MonitorMiddlewareIndex,
    meta: {
      title: '中间件',
      typeId: '3'
    }
  },
  {
    path: 'monitorSystemIndex',
    name: 'monitorSystemIndex',
    component: MonitorSystemIndex,
    meta: {
      title: '操作系统',
      typeId: '1'
    }
  },
  {
    path: 'monitorJVMInfo',
    name: 'monitorJVMInfo',
    component: MonitorJVMInfo,
    meta: {
      title: '监控JVM应用',
      typeId: '28'
    }
  },
  {
    path: 'monitorTemplateList',
    name: 'monitorTemplateList',
    component: MonitorTemplateList,
    meta: {
      title: '监控模板'
    }
  },
  {
    path: 'monitorAddList',
    name: 'monitorAddList',
    component: MonitorAddList,
    meta: {
      title: '监控模板添加列表'
    }
  },
  {
    path: 'monitorAdd',
    name: 'monitorAdd',
    component: MonitorAdd,
    meta: {
      title: '监控模板添加'
    }
  },
  {
    path: 'itemList',
    name: 'itemList',
    component: ItemList,
    meta: {
      title: '监控项列表'
    }
  },
  {
    path: 'monitorPossessionJmxInfo',
    name: 'monitorPossessionJmxInfo',
    component: MonitorPossessionJmxInfo,
    meta: {
      title: '主机监控项所拥有信息'
    }
  },
  {
    path: 'monitorPossessionOSInfo',
    name: 'monitorPossessionOSInfo',
    component: MonitorPossessionOSInfo,
    meta: {
      title: '主机监控项所拥有信息'
    }
  },
  {
    path: 'monitorPossessionJvmInfo',
    name: 'monitorPossessionJvmInfo',
    component: MonitorPossessionJvmInfo,
    meta: {
      title: 'JVM虚拟机所拥有信息'
    }
  }
]
