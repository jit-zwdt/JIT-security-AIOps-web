<template>
  <div>
    <ToolBar>
      <div class="queryleft">
        <el-date-picker
            v-model="resolveTimeStart"
            type="date"
            placeholder="解决开始时间"
            class="datetop"
            value-format="yyyy-MM-dd"
            :clearable="false"
            @change="changeDate"
        ></el-date-picker>
        <el-date-picker
            v-model="resolveTimeEnd"
            type="date"
            placeholder="解决结束时间"
            value-format="yyyy-MM-dd"
            class="datetop"
            :clearable="false"
            @change="changeDate"
        ></el-date-picker>
        <el-button type="primary" size="small" @click="showInfo() == false" icon="el-icon-search">查询</el-button>
        <el-button type="primary" size="small" @click="showClear() == false">重置</el-button>
      </div>
      <div class="queryright">
        <el-button type="primary" size="small" v-print="'#print'">打印</el-button>
        <el-button type="primary" size="small" @click="exportReport() == false">导出</el-button>
      </div>
    </ToolBar>
    <div style="background-color: white;" id="print">
      <div style="text-align: center;">
        <h2 style="padding-top: 5px">故障解决统计报表</h2>
      </div>
      <div style="text-align: right">
        <span>日期：{{this.nowDate}}</span>
      </div>
      <div style="border: 2px solid #000000;width: 100%">
        <el-table
            :data="tableData"
            border
            v-loading="loading"
            style="width: 100%"
            :header-cell-style="tableHeaderColor"
            :cell-style="tableCellStyle"
        >
          <el-table-column label="序号" prop="index" min-width="3%" :resizable="false"></el-table-column>
          <el-table-column label="故障解决日期" prop="claim.resolveTime" min-width="9%" :resizable="false"></el-table-column>
          <el-table-column label="故障名称" prop="claim.problemName" min-width="20%" :resizable="false"></el-table-column>
          <el-table-column
              label="故障类型"
              prop="register.problemType"
              min-width="5%"
              :resizable="false"
          ></el-table-column>
          <el-table-column label="处理角色" prop="role" min-width="5%" :resizable="false"></el-table-column>
          <el-table-column label="处理人" prop="user" min-width="5%" :resizable="false"></el-table-column>
          <el-table-column label="故障原因" prop="register.problemReason" min-width="13%"
                           :resizable="false"></el-table-column>
          <el-table-column label="处理过程" prop="register.problemProcess" min-width="10%"
                           :resizable="false"></el-table-column>
          <el-table-column label="处理方式" prop="register.problemSolution" min-width="10%"
                           :resizable="false"></el-table-column>
          <el-table-column label="故障持续时间" prop="claim.ns" min-width="7%" :resizable="false"></el-table-column>
          <el-table-column label="故障处理时长" prop="claim.problemHandleTime" min-width="8%"
                           :resizable="false"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  methods: {
    // 修改table header的背景色
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      const strClass = 'color: #000000;font-weight: 1000;font-size:15px;'
      if (columnIndex === 0) {
        return strClass
      } else {
        return 'border-left: 1px solid #000000;' + strClass
      }
    },
    // 修改table tr行的背景色
    tableCellStyle ({ row, column, rowIndex, columnIndex }) {
      const strClass = 'border-top: 1px solid #000000;color: #000000;'
      if (columnIndex === 0) {
        return strClass
      } else {
        return 'border-left: 1px solid #000000;' + strClass
      }
    },
    reloadData () {
      this.showInfo()
    },
    showInfo () {
      if (this.resolveTimeStart === '' || this.resolveTimeStart === null) {
        this.$message({
          message: '开始时间不能为空',
          type: 'error'
        })
        return false
      }
      if (this.resolveTimeEnd === '' || this.resolveTimeEnd === null) {
        this.$message({
          message: '结束时间不能为空',
          type: 'error'
        })
        return false
      }

      this.loading = true
      this.tableData = this.tableDataclear
      const _this = this
      this.setTimeoutster = window.setTimeout(() => {
        _this.showInfoTimeout()
      }, 300)
    },
    showInfoTimeout () {
      this.axios
        .post(this.$api.malfunctionSolve.problemSolveReport, qs.stringify({
          problemType: '',
          problemName: '',
          resolveTimeStart: this.resolveTimeStart,
          resolveTimeEnd: this.resolveTimeEnd,
          dictCode: 'gzlx'
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
      this.resolveTimeStart = ''
      this.resolveTimeEnd = ''
      this.getDate()
      this.getCurrentMonthFirst()
    },
    // 导出 excel 文档的方法
    exportReport () {
      this.axios.post(this.$api.malfunctionSolve.downLoadFailureToSolve, this.tableData, { responseType: 'blob' }).then((resp) => {
        const url = window.URL.createObjectURL(resp.data) // 为文件流创建构建下载链接
        const link = document.createElement('a') // 创建a标签
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', '故障解决统计报表.xlsx') // 设置a标签的下载动作和下载文件名
        document.body.appendChild(link)
        link.click() // 执行下载
        document.body.removeChild(link) // 释放标签
      })
    },
    getDate: function () {
      const _this = this
      let date = ''
      const yy = new Date().getFullYear()
      let mm = new Date().getMonth() + 1
      mm = mm < 10 ? '0' + mm : mm
      let dd = new Date().getDate()
      dd = dd < 10 ? '0' + dd : dd
      date = yy + '-' + mm + '-' + dd
      _this.nowDate = date
      _this.resolveTimeEnd = date
    },
    getCurrentMonthFirst: function () {
      const _this = this
      var date = new Date()
      date.setDate(1)
      const yy = date.getFullYear()
      let mm = date.getMonth() + 1
      mm = mm < 10 ? '0' + mm : mm
      let dd = date.getDate()
      dd = dd < 10 ? '0' + dd : dd
      date = yy + '-' + mm + '-' + dd
      _this.resolveTimeStart = date
    },
    changeDate: function (val) {
      if (this.resolveTimeStart > this.resolveTimeEnd) {
        this.resolveTimeStart = this.resolveTimeEnd
      }
    }
  },
  data () {
    return {
      showEditDialog: false,
      resolveTimeStart: '',
      resolveTimeEnd: '',
      nowDate: '',
      loading: true
    }
  },
  created () {
    this.getDate()
    this.getCurrentMonthFirst()
    this.showInfo()
  },
  actions: {
  }
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
