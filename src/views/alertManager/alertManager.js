import AlertDefine from '@/views/alertManager/alertDefine/alertDefine.vue'
import AlertType from '@/views/alertManager/alertType/alertType.vue'
import AlertTemplate from '@/views/alertManager/alertTemplate/alertTemplate.vue'
import QueryAlert from '@/views/alertManager/queryAlert/queryAlert.vue'
import AlertDefineAdd from '@/views/alertManager/alertDefine/alertDefineAdd.vue'
import AlertTypeAdd from '@/views/alertManager/alertType/alertTypeAdd.vue'
import AlertInquire from '@/views/alertManager/alertInquire/alertInquire.vue'
import AddUserMedias from '@/views/alertManager/alertDefine/addUserMedias.vue'

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
    path: 'alertDefineAdd',
    name: 'alertDefineAdd',
    component: AlertDefineAdd,
    meta: {
      title: '告警定义添加'
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
    path: 'alertTypeAdd',
    name: 'alertTypeAdd',
    component: AlertTypeAdd,
    meta: {
      title: '告警通知方式添加'
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
  },
  {
    path: 'alertInquire',
    name: 'alertInquire',
    component: AlertInquire,
    meta: {
      title: '统一告警查询'
    }
  },
  {
    path: 'addUserMedias',
    name: 'addUserMedias',
    component: AddUserMedias,
    meta: {
      title: '告警媒介'
    }
  }
]
