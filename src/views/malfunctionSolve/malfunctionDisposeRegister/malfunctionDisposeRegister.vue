<template>
  <div>
    <ToolBar>
      <div class="queryleft">
        <el-col :span="12">
          <el-input type="text" v-model="problemName" size="small" placeholder="故障名称" clearable></el-input>
        </el-col>
        <el-select v-model="resolveType" class="datetop" filterable placeholder="是否解决" clearable>
          <el-option
                  v-for="status in resolveTypeList"
                  :key="status.value"
                  :label="status.label"
                  :value="status.value"
          ></el-option>
        </el-select>
        <el-button type="primary" size="small" @click="currentPage = 1 ;showInfo() == false" icon="el-icon-search">查询</el-button>
        <el-button type="primary" size="small" @click="showClear() == false">重置</el-button>
      </div>
      <div class="queryright">
      </div>
    </ToolBar>
    <el-table
            :data="tableData"
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
          <el-button v-else-if="scope.row.isRegister === 1 && scope.row.isResolve !== 1" size="mini" type="primary" slot="reference" @click="malfunctionDisposeRegister(scope.$index, scope.row)">再次登记</el-button>
          <el-button  v-else-if="scope.row.isRegister !==1" size="mini" type="primary" slot="reference" @click="malfunctionDisposeRegister(scope.$index, scope.row)">登记</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :currentTotal="currentTotal" @pageChange="pageChange" :currentPage="currentPage"></Pagination>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
export default {
  data: function () {
    return {
      titleType: '',
      showEditDialog: false,
      problemName: '',
      loading: false,
      resolveType: '',
      resolveTypeList: [{
        value: 0,
        label: '未解决'
      }, {
        value: 1,
        label: '已解决'
      }],
      tableData: [{
        problemName: '',
        ns: '',
        claimTime: '',
        claimId: ''
      }],
      registerform: {
        problemName: '',
        ns: '',
        claimTime: ''
      },
      currentPage: 1,
      pageSize: 15,
      currentTotal: 0,
      tableDataclear: []
    }
  },
  created () {
    this.showInfo()
  },
  methods: {
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
    showClear () {
      this.resolveType = ''
      this.problemName = ''
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
        .post(this.$api.malfunctionSolve.getClaimByUsers, {
          param: {
            problemName: this.problemName,
            resolveType: this.resolveType
          },
          page: this.currentPage,
          size: this.pageSize
        }).then(resp => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              this.tableData = json.data.dataList
              if (this.tableData.length === 0 && this.currentPage !== 1) {
                this.currentPage = this.currentPage - 1
                this.showInfo()
              }
              this.currentTotal = json.data.totalRow
            }
          }
          this.loading = false
        })
    },
    claimTimeFormat (val) {
      return val.claimTime.replace('T', ' ')
    },
    pageChange (item) {
      this.currentPage = item.page_currentPage
      this.pageSize = item.page_pageSize
      this.showInfo()
    },
    malfunctionDisposeRegister: function (index, row) {
      this.$router.push({ name: 'malfunctionDisposeRegisterAdd', query: { problemId: row.problemId, problemName: row.problemName, ns: row.ns, claimTime: row.claimTime, claimId: row.id } })
    }
  },
  actions: {},
  components: { Pagination }
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
