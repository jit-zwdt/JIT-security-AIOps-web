<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="登录日志" name="0"></el-tab-pane>
    <el-tab-pane label="操作日志" name="1"></el-tab-pane>
    <el-tab-pane label="错误日志" name="2"></el-tab-pane>
    <ToolBar>
      <div class="queryleft">
        <el-input
          type="text"
          style="width: 250px"
          @keyup.enter.native="showInfo"
          v-model="nameTop"
          size="small"
          placeholder="日志内容"
          clearable
        ></el-input>
        <!--<el-date-picker style="width: 400px" v-model="gmtCreate" type="datetimerange" size="small" value-format="yyyy-MM-ddTHH:mm:ss.SSSZ" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>-->
        <el-date-picker
          size="small"
          v-model="timefrom"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          clearable
          placeholder="选择开始日期时间"
        >
        </el-date-picker>
        <el-date-picker
          size="small"
          v-model="timetill"
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          clearable
          placeholder="选择结束日期时间"
        >
        </el-date-picker>
        <el-select
          v-model="operation_Type"
          v-if="logType == 1"
          class="datetop"
          style="height: 32px"
          filterable
          placeholder="选择操作类型"
          @change="current_operationtype"
          clearable
        >
          <el-option
            v-for="item in operationTypes"
            :key="item.id"
            :label="item.type"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          size="small"
          @click="
            currentPage = 1
            selectTime()
          "
          icon="el-icon-search"
          >查询</el-button
        >
        <el-button type="primary" size="small" @click="showClear() == false"
          >重置</el-button
        >
      </div>
    </ToolBar>
    <el-table
      :data="tableData"
      v-loading="loading"
      border
      style="width: 100%"
      :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item>
              <span slot="label">
                <span class="span-box">
                  <i class="fa fa-circle" style="color: #ffbb00"></i>
                  <span class="form-item-bold">请求方法</span>
                </span>
              </span>
              <p class="form-item-p-normal">{{ props.row.method }}</p>
            </el-form-item>
            <el-form-item>
              <span slot="label">
                <span class="span-box">
                  <i class="fa fa-circle" style="color: #bbff00"></i>
                  <span class="form-item-bold">请求参数</span>
                </span>
              </span>
              <p class="form-item-p-normal">{{ props.row.requestParam }}</p>
            </el-form-item>
            <el-form-item>
              <span slot="label">
                <span class="span-box">
                  <i class="fa fa-circle" style="color: #00ffff"></i>
                  <span class="form-item-bold">请求方式</span>
                </span>
              </span>
              <p class="form-item-p-normal">{{ props.row.requestType }}</p>
            </el-form-item>
            <el-form-item v-if="logType == 2">
              <span slot="label">
                <span class="span-box">
                  <i class="fa fa-circle" style="color: #ff0000"></i>
                  <span class="form-item-bold">错误日志</span>
                </span>
              </span>
              <p class="form-item-p-normal">{{ props.row.errorLog }}</p>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="序号"
        align="center"
        min-width="3%"
        :width="columnwidth + 'rem'"
        :resizable="false"
      >
        <template slot-scope="scope">
          {{ (currentPage - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="logContent"
        label="日志内容"
        min-width="28%"
        :resizable="false"
      ></el-table-column>
      <el-table-column
        prop="userUsername"
        label="操作人ID"
        min-width="10%"
        align="center"
        :resizable="false"
      ></el-table-column>
      <el-table-column
        prop="userName"
        label="操作人名称"
        min-width="10%"
        align="center"
        :resizable="false"
      ></el-table-column>
      <el-table-column
        prop="ip"
        label="IP"
        min-width="10%"
        :resizable="false"
      ></el-table-column>
      <el-table-column
        prop="costTime"
        label="耗时(毫秒)"
        min-width="10%"
        :resizable="false"
        align="center"
        filter-placement="bottom-end"
      >
        <template slot-scope="scope">
          <el-tag
            style="width: 80px"
            :type="
              scope.row.costTime < 1000
                ? 'success'
                : scope.row.costTime > 3000
                ? 'danger'
                : 'warning'
            "
            disable-transitions
            >{{ scope.row.costTime }}</el-tag
          >
        </template>
        ></el-table-column
      >
      <el-table-column
        prop="logType"
        label="日志类型"
        min-width="10%"
        align="center"
        :formatter="logTypeFormat"
        :resizable="false"
      ></el-table-column>
      <el-table-column
        prop="operationType"
        label="操作类型"
        min-width="10%"
        align="center"
        :formatter="operationTypeFormat"
        v-if="logType == 1"
        :resizable="false"
      ></el-table-column>
      <el-table-column
        label="创建时间"
        prop="gmtCreate"
        min-width="12%"
        :resizable="false"
        :formatter="formatDate"
      ></el-table-column>
    </el-table>
    <Pagination
      :currentTotal="currentTotal"
      @pageChange="pageChange"
      :currentPage="currentPage"
    ></Pagination>
  </el-tabs>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
import { formatTodate } from '@/utils/format.js'
import qs from 'qs'
export default {
  data () {
    return {
      loading: true,
      activeName: 0,
      nameTop: '',
      timefrom: '',
      timetill: '',
      logType: 0,
      operation_Type: '',
      tableData: [{
        id: '',
        logContent: '',
        userUsername: '',
        userName: '',
        ip: '',
        costTime: '',
        logType: '',
        operationType: ''
      }],
      // 0:未定义;1:添加;2:查询;3:修改;4:删除
      operationTypes: [
        { id: 0, type: '未定义' },
        { id: 1, type: '添加' },
        { id: 2, type: '查询' },
        { id: 3, type: '修改' },
        { id: 4, type: '删除' },
        { id: 5, type: '导入' },
        { id: 6, type: '导出' },
        { id: 7, type: '上传' },
        { id: 8, type: '下载' }
      ],
      currentPage: 1,
      pageSize: 15,
      currentTotal: 0,
      columnwidth: ''
    }
  },
  created () {
    this.showInfo()
  },
  methods: {
    makecolumnNoWidth () {
      var value = String(this.currentTotal)
      var length = value.length
      var num = 5
      this.columnwidth = String(length + num) + '0'
    },
    handleClick (tab, event) {
      this.currentPage = 1
      this.logType = this.activeName
      this.showInfo()
      this.showClear()
    },
    logTypeFormat (row, column) {
      const data = row.logType
      if (data === 0) {
        return '登录日志'
      } else if (data === 1) {
        return '操作日志'
      } else if (data === 2) {
        return '错误日志'
      } else {
        return data
      }
    },
    operationTypeFormat (row, column) {
      const data = row.operationType
      if (data === 0) {
        return '未定义'
      } else if (data === 1) {
        return '添加'
      } else if (data === 2) {
        return '查询'
      } else if (data === 3) {
        return '修改'
      } else if (data === 4) {
        return '删除'
      } else if (data === 5) {
        return '导入'
      } else if (data === 6) {
        return '导出'
      } else if (data === 7) {
        return '上传'
      } else if (data === 8) {
        return '下载'
      } else {
        return data
      }
    },
    selectTime () {
      if ((this.timefrom === '' || this.timefrom === null) && (this.timetill === '' || this.timetill === null)) { // 都是无
        this.timefrom = ''
        this.timetill = ''
        this.showInfo()
      } else {
        this.showInfo()
      }
    },
    // 查询方法
    showInfo () {
      this.loading = true
      this.setTimeoutster = window.setTimeout(() => {
        this.axios.post(this.$api.sysManager.getSysLogs, qs.stringify({
          logContent: this.nameTop,
          startTime: this.timefrom,
          endTime: this.timetill,
          operationType: this.operation_Type,
          logType: this.logType,
          currentPage: this.currentPage,
          currentSize: this.pageSize
        })).then((resp) => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              this.tableData = json.data.content
              if (this.tableData.length === 0 && this.currentPage !== 1) {
                this.currentPage = this.currentPage - 1
                this.showInfo()
              }
              this.currentTotal = json.data.totalElements
              this.loading = false
              this.makecolumnNoWidth()
            }
          } else {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
          }
        })
      }, 300)
    },
    // 重置方法
    showClear () {
      this.nameTop = ''
      this.timefrom = ''
      this.timetill = ''
      this.operation_Type = ''
    },
    // 日期格式化
    formatDate (row, column) {
      let data = ''
      data = row[column.property]
      if (data == null) {
        return ''
      }
      return formatTodate(data, 'YYYY-MM-DD HH:mm:ss')
    },
    // 改变当前页数
    pageChange (item) {
      this.currentPage = item.page_currentPage
      this.pageSize = item.page_pageSize
      this.showInfo()
    },
    // 操作类型选择
    current_operationtype (selVal) {
      this.current_operationtype = selVal
    },
    // 修改table tr行的背景色
    tableRowStyle ({ row, column, rowIndex, columnIndex }) {
    },
    // 修改table header的背景色
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #0086f1;color: #FFFFFF;font-weight: 500;font-size:15px'
      }
    }
  },
  components: { Pagination }
}
</script>
<style lang="scss" scoped>
.queryleft {
  float: left;
  width: 100%;
  margin-left: 0%;
}
.queryright {
  float: right;
}
.tableHeaderColor {
  font-size: 20px;
}
.datetop /deep/ input {
  height: 32px !important;
  margin-top: 1px !important;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
/deep/.is-top {
  font-size: 15px;
  background-color: #fff;
}
/deep/.el-tabs__active-bar {
  background-color: #0086f1 !important;
}
/deep/.el-tabs__nav {
  margin-left: 20px;
}
/deep/.toolbar > div:last-child {
  justify-content: flex-start;
}
/deep/.toolbar {
  border: 0px solid #e6ebf5 !important;
}
/deep/.el-tabs__nav-wrap {
  height: 45px;
}
/deep/.el-tabs__content {
  margin-top: -20px;
}
.form-item-p-normal {
  font-weight: normal;
}
.form-item-bold {
  font-weight: bold;
  margin-left: 10px;
}
.el-divider--horizontal {
  height: 0px;
}
</style>
