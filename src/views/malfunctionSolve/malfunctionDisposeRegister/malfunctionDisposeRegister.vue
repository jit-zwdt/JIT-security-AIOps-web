<template>
  <div>
    <el-table
            :data="(tableData || []).slice((currentPage-1)*pageSize,currentPage*pageSize)"
            border
            v-loading="loading"
            style="width: 100%"
            :row-style="tableRowStyle"
            :header-cell-style="tableHeaderColor"
    >
      <el-table-column label="故障名称" prop="problemName" min-width="60%" :resizable="false"></el-table-column>
      <el-table-column
              label="持续时间"
              prop="ns"
              min-width="10%"
              :resizable="false"
      ></el-table-column>
      <el-table-column label="认领时间" prop="claimTime" min-width="15%" :resizable="false" :formatter="claimTimeFormat">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="15%">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isRegister === 1 && scope.row.isResolve === 1" size="mini" type="primary" slot="reference" @click="malfunctionDisposeRegister(scope.$index, scope.row)">已解决</el-button>
          <el-button v-else-if="scope.row.isRegister === 1 && scope.row.isResolve !== 1" size="mini" type="primary" slot="reference" @click="malfunctionDisposeRegister(scope.$index, scope.row)">已登记</el-button>
          <el-button  v-else-if="scope.row.isRegister !==1" size="mini" type="primary" slot="reference" @click="malfunctionDisposeRegister(scope.$index, scope.row)">登记</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top:15px;">
      <el-pagination
              align="center"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[15, 30, 50, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data: function () {
    return {
      totalCount: 0,
      titleType: '',
      showEditDialog: false,
      tableData: [{
        problemName: '',
        ns: '',
        claimTime: ''
      }],
      registerform: {
        problemName: '',
        ns: '',
        claimTime: ''
      },
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 15 // 每页的数据条数
    }
  },
  created () {
    this.showInfo()
  },
  methods: {
    // setButtonVal (val) {
    //   if (val.isRegister === 1 && val.isResolve === 1) {
    //     return '已解决'
    //   } else if (val.isRegister === 1 && val.isResolve !== 1) {
    //     return '已登记'
    //   } else if (val.isRegister !== 1) {
    //     return '登记'
    //   }
    // },
    // 修改table tr行的背景色
    tableRowStyle ({ row, column, rowIndex, columnIndex }) {
    },
    // 修改table header的背景色
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #0086f1;color: #FFFFFF;font-weight: 500;font-size:15px'
      }
    },
    reloadData () {
      this.showInfo()
    },
    showInfo () {
      this.loading = true
      this.tableData = this.tableDataclear
      const _this = this
      this.setTimeoutster = window.setTimeout(() => {
        _this.showInfoTimeout()
      }, 300)
    },
    showInfoTimeout () {
      this.axios
        .post('/problem/findClaimByUser')
        .then(resp => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              // var now = new Date()
              this.tableData = json.data
              if (this.tableData) {
                this.totalCount = this.tableData.length
              }
              this.currentPage = 1
              this.loading = false
            }
          }
        })
    },
    claimTimeFormat (val) {
      return val.claimTime.replace('T', ' ')
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    malfunctionDisposeRegister: function (index, row) {
      this.$router.push({ name: 'malfunctionDisposeRegisterAdd', query: { problemId: row.problemId, problemName: row.problemName, ns: row.ns, claimTime: row.claimTime } })
    }
  },
  actions: {}
}
</script>
<style lang="scss" scoped>
  .queryleft {
    float: left;
  }

  .queryright {
    float: right;
  }

  .tableHeaderColor {
    font-size: 20;
  }

  .datetop /deep/ input {
    height: 32px !important;
    margin-top: 1px !important;
  }

  /deep/ .el-input__prefix {
    margin-top: -3px;
  }

  /deep/ .el-button {
    margin-left: 10px;
  }
</style>
