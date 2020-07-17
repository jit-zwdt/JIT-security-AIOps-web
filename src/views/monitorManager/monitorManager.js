import MonitorTemplateList from '@/views/monitorManager/monitorTemplates/monitorTemplateList.vue'
import MonitorList from '@/views/monitorManager/monitorview/monitorList.vue'
import MonitorAdd from '@/views/monitorManager/monitorview/monitorAdd.vue'
import MonitorAddList from '@/views/monitorManager/monitorview/monitorAddList.vue'
import ItemList from '@/views/monitorManager/monitorview/item/itemList.vue'
import MonitorNetworkIndex from '@/views/monitorManager/monitorNetwork/monitorIndex.vue'
import MonitorDBIndex from '@/views/monitorManager/monitorDB/monitorIndex.vue'
import MonitorSystemIndex from '@/views/monitorManager/monitorSystem/monitorIndex.vue'
import MonitorMiddlewareIndex from '@/views/monitorManager/monitorMiddleware/monitorIndex.vue'
import MonitorPossessionInfo from '@/views/monitorManager/monitorPossessionInfo/monitorPossessionInfo.vue'

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
    path: 'monitorPossessionInfo',
    name: 'monitorPossessionInfo',
    component: MonitorPossessionInfo,
    meta: {
      title: '主机监控项所拥有信息'
    }
  }
]
