<template>
  <div>
    <ToolBar>
      <div class="queryleft">
        <el-col :span="12">
          <el-input type="text" v-model="problemHandleTime" size="small" placeholder="故障解决时长" clearable></el-input>
        </el-col>
        <el-select v-model="problemType" class="datetop" filterable placeholder="故障类型" clearable>
          <el-option
                  v-for="status in statusList"
                  :key="status.value"
                  :label="status.label"
                  :value="status.value"
          ></el-option>
        </el-select>
        <el-button type="primary" size="small" @click="showInfo() == false" icon="el-icon-search">查询</el-button>
        <el-button type="primary" size="small" @click="showClear() == false">重置</el-button>
      </div>
      <div class="queryright">
      </div>
    </ToolBar>
    <div style="text-align: center">
      <h1>故障解决统计报表</h1>
    </div>
    <el-table
            :data="tableData"
            border
            v-loading="loading"
            style="width: 100%"
            :row-style="tableRowStyle"
            :header-cell-style="tableHeaderColor"
    >
      <el-table-column label="序号" prop="index" min-width="2%" :resizable="false"></el-table-column>
      <el-table-column label="名称" prop="claim.problemName" min-width="20%" :resizable="false"></el-table-column>
      <el-table-column
              label="故障类型"
              prop="register.problemType"
              min-width="5%"
              :resizable="false"
              :formatter="problemTypeFormat"
      ></el-table-column>
      <el-table-column label="处理角色" prop="role" min-width="5%" :resizable="false"></el-table-column>
      <el-table-column label="处理人" prop="user" min-width="5%" :resizable="false"></el-table-column>
      <el-table-column label="故障原因" prop="register.problemReason" min-width="13%" :resizable="false"></el-table-column>
      <el-table-column label="处理过程" prop="register.problemProcess" min-width="10%" :resizable="false"></el-table-column>
      <el-table-column label="处理方式" prop="register.problemSolution" min-width="10%" :resizable="false"></el-table-column>
      <el-table-column label="故障持续时间" prop="claim.ns" min-width="7%" :resizable="false"></el-table-column>
      <el-table-column label="故障处理时长" prop="claim.problemHandleTime" min-width="8%" :resizable="false"></el-table-column>
    </el-table>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      showEditDialog: false,
      problemType: '',
      problemHandleTime: '',
      statusList: [{
        value: 0,
        label: '类型一'
      }, {
        value: 1,
        label: '类型二'
      }, {
        value: 2,
        label: '类型三'
      }, {
        value: 3,
        label: '类型四'
      }],
      loading: true
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
        return 'background-color: #d6dee4;color: #FFFFFF;font-weight: 500;font-size:15px'
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
        .post('/problem/problemSolveReport', qs.stringify({
          problemType: this.problemType,
          problemHandleTime: this.problemHandleTime
        }))
        .then(resp => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              this.tableData = json.data
              this.loading = false
            }
          }
        })
    },
    showClear () {
      this.problemType = ''
      this.problemHandleTime = ''
    },
    problemTypeFormat (val) {
      if (val.register.problemType === '0') {
        return '类型一'
      } else if (val.register.problemType === '1') {
        return '类型二'
      } else if (val.register.problemType === '2') {
        return '类型三'
      } else if (val.register.problemType === '3') {
        return '类型四'
      }
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
