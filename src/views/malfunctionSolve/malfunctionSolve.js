import MalfunctionSolveClaim from '@/views/malfunctionSolve/malfunctionSolveClaim/malfunctionSolveClaim.vue'
import MalfunctionDisposeRegister from '@/views/malfunctionSolve/malfunctionDisposeRegister/malfunctionDisposeRegister.vue'
import MalfunctionStatisticalStatement from '@/views/malfunctionSolve/malfunctionStatisticalStatement/malfunctionStatisticalStatement.vue'

export default [
  {
    path: 'malfunctionSolveClaim',
    name: 'malfunctionSolveClaim',
    component: MalfunctionSolveClaim,
    meta: {
      title: '故障认领'
    }
  },
  {
    path: 'malfunctionDisposeRegister',
    name: 'malfunctionDisposeRegister',
    component: MalfunctionDisposeRegister,
    meta: {
      title: '故障处理登记'
    }
  },
  {
    path: 'malfunctionStatisticalStatement',
    name: 'malfunctionStatisticalStatement',
    component: MalfunctionStatisticalStatement,
    meta: {
      title: '故障解决统计报表'
    }
  }
]