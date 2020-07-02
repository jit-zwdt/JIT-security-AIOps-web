import MonitorTemplateList from '@/views/monitorManager/monitorTemplates/monitorTemplateList.vue'
import MonitorList from '@/views/monitorManager/monitorview/monitorList.vue'
import MonitorAdd from '@/views/monitorManager/monitorview/monitorAdd.vue'
import MonitorAddList from '@/views/monitorManager/monitorview/monitorAddList.vue'
import ItemList from '@/views/monitorManager/monitorview/item/itemList.vue'

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
  }
]
