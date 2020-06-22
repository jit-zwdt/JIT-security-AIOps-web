import MonitorTemplateList from '@/views/monitorManager/monitorTemplates/monitorTemplateList.vue'
import MonitorList from '@/views/monitorManager/monitorview/monitorList.vue'

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
  }
]
