import AlertDefine from '@/views/alertManager/alertDefine/alertDefine.vue'
import AlertType from '@/views/alertManager/alertType/alertType.vue'
import AlertTemplate from '@/views/alertManager/alertTemplate/alertTemplate.vue'
import QueryAlert from '@/views/alertManager/queryAlert/queryAlert.vue'

export default [
  {
    path: 'alertDefine',
    name: 'alertDefine',
    component: AlertDefine,
    meta: {
      title: '告警定义'
    }
  },
  {
    path: 'alertType',
    name: 'alertType',
    component: AlertType,
    meta: {
      title: '告警通知方式'
    }
  },
  {
    path: 'alertTemplate',
    name: 'alertTemplate',
    component: AlertTemplate,
    meta: {
      title: '告警通知模版'
    }
  },
  {
    path: 'queryAlert',
    name: 'queryAlert',
    component: QueryAlert,
    meta: {
      title: '告警通知模版'
    }
  }
]
