import Department from '@/views/sysManager/departmentManager/department.vue'
import User from '@/views/sysManager/userManager/user.vue'
export default [
  {
    path: 'department',
    name: 'department',
    component: Department,
    meta: {
      title: '部门管理'
    }
  },
  {
    path: 'user',
    name: 'user',
    component: User,
    meta: {
      title: '人员管理'
    }
  }
]
