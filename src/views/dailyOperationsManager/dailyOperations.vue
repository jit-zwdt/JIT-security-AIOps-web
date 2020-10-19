<template>
  <div>
    <ToolBar>
      <div class="queryleft">
      </div>
      <div class="queryright">
        <el-button type="primary" size="small" v-print="'#print'">打印</el-button>
        <el-button type="primary" size="small" @click="showClear() == false">导出</el-button>
      </div>
    </ToolBar>
    <div style="background-color: white;" id="print">
      <div style="text-align: center;">
        <h2 style="padding-top: 5px">运维日报</h2>
      </div>
      <div style="border: 1px solid #000000;width: 100%;height: 500px">
        <table>
          <tr>
            <td>2222222</td>
          </tr>
        </table>
        <el-form ref="form" :model="form">
          <el-row style="height: 25px">
            <el-col :span="2" style="border: 1px solid #000000;">运维人</el-col>
            <el-col :span="10" style="border: 1px solid #000000;">刘建</el-col>
            <el-col :span="2" style="border: 1px solid #000000;">日期</el-col>
            <el-col :span="10" style="border: 1px solid #000000;">2020.10.16</el-col>
          </el-row>
          <el-row>
            <el-col style="text-align: center;border: 1px solid #000000;"><h4>运维工作情况</h4></el-col>
          </el-row>
          <el-row>
            <el-col :colspan="2" :span="2" style="border: 1px solid #000000;">运维工作情况</el-col>
            <el-col :span="5">新增问题数（较昨日）</el-col>
            <el-col :span="5">详细内容（较昨日）</el-col>
            <el-col :span="5">总数</el-col>
            <el-col :span="5">备注</el-col>
          </el-row>
          <el-row>
            <el-col :span="5">5</el-col>
            <el-col :span="5">5</el-col>cronExpression
            <el-col :span="5">详细内容（较昨日）<br>详细内容（较昨日）</el-col>
            <el-col :span="5">100</el-col>
            <el-col :span="5">无</el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import qs from 'qs'

export default {
  methods: {
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
          resolveTimeEnd: this.resolveTimeEnd
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
