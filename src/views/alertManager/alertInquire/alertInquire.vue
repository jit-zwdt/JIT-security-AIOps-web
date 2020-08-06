<template>
  <div>
    <ToolBar>
      <div class="queryleft">
        <el-col :span="8">
          <el-select
                  v-model="severity"
                  class="datetop"
                  filterable
                  placeholder="告警级别"
                  clearable
          >
            <el-option
                    v-for="item in severityOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-date-picker
                v-model="timeFrom"
                type="date"
                placeholder="开始日期"
                class="datetop"
        ></el-date-picker>
        <el-date-picker
                v-model="timeTill"
                type="date"
                placeholder="结束日期"
                class="datetop"
        ></el-date-picker>
        <el-col :span="12">
          <el-input type="text" v-model="name" size="small" placeholder="告警标题" clearable></el-input>
        </el-col>
        <el-button type="primary" size="small" @click="showInfo() == false" icon="el-icon-search">查询</el-button>
        <el-button
                type="primary"
                size="small"
                @click="showClear() == false"
                icon="el-icon-refresh-left"
        >重置</el-button>
      </div>
      <div class="queryright">
      </div>
    </ToolBar>
    <el-table
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            v-loading="loading"
            border
            style="width: 100%"
            :row-style="tableRowStyle"
            :header-cell-style="tableHeaderColor"
    >
      <el-table-column label="主机名称" prop="hostName" :resizable="false" width="150"></el-table-column>
      <el-table-column label="主机ip" prop="ip" :resizable="false" width="150"></el-table-column>
      <el-table-column label="告警标题" prop="zabbixProblemDTO.name" :resizable="false"></el-table-column>
      <el-table-column label="级别"
                       prop="zabbixProblemDTO.severity"
                       min-width="10%"
                       :resizable="false"
                       :formatter="severityLevelFormat"
      >
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
              :total="tableData.length"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { formatTodate, compareDate } from '@/utils/format.js'
// import { timesMethod } from '../../../utils/formatDate'

export default {
  name: 'alertInquire',
  data () {
    return {
      severity: '',
      severityOptions: [
        {
          value: 0,
          label: '未定义'
        },
        {
          value: 1,
          label: '信息'
        },
        {
          value: 2,
          label: '警告'
        },
        {
          value: 3,
          label: '一般严重'
        },
        {
          value: 4,
          label: '严重'
        },
        {
          value: 5,
          label: '灾难'
        }
      ],
      timeFrom: '',
      timeTill: '',
      name: '',
      loading: true,
      tableData: [{
        hostId: '',
        ip: '',
        hostName: '',
        clock: '',
        name: ''
      }],
      tableDataclear: [],
      currentPage: 1, // 当前页码
      pageSize: 15,
      total: 20,
      show: false,
      setTimeoutster: ''
    }
  },
  created () {
    this.showInfo()
  },
  methods: {
    showInfo (str) {
      this.loading = true
      this.tableData = this.tableDataclear
      const _this = this
      this.setTimeoutster = window.setTimeout(() => { _this.showInfoTimeout() }, 300)
    },
    showInfoTimeout (str) {
      this.setTimeoutster = ''

      let startTimestr = ''
      startTimestr = formatTodate(this.timeFrom, 'YYYY/MM/DD 00:00:00')
      startTimestr = String(Math.round(new Date(startTimestr).getTime() / 1000))

      let endTimestr = ''
      endTimestr = formatTodate(this.timeTill, 'YYYY-MM-DD 23:59:59')
      endTimestr = String(Math.round(new Date(endTimestr).getTime() / 1000))

      if (compareDate(startTimestr, endTimestr)) {
        Message({
          message: '开始日期大于结束日期！',
          type: 'warning'
        })
        return
      }
      const region = {
        severity: this.severity,
        timeFrom: startTimestr,
        timeTill: endTimestr,
        name: this.name
      }
      this.axios.post('/problem/findProblemHost', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            // console.log(json.data)
            this.tableData = json.data
            this.currentPage = 1
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
        this.loading = false
      })
    },
    showClear (str) {
      this.severity = ''
    },
    tableRowStyle ({ row, column, rowIndex, columnIndex }) {
    },
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #0086f1;color: #FFFFFF;font-weight: 500;font-size:15px'
      }
    },
    default_priority (rowData) {
      this.priority = rowData.priority
    },
    severityLevelFormat (row, column) {
      var data = row.zabbixProblemDTO.severity
      var level = ''
      this.severityOptions.forEach(item => {
        if (item.value === data) {
          level = item.label
        }
      })
      return level
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    }
  }

}
</script>

<style lang="scss" scoped>
  .datetop /deep/ input {
    height: 32px !important;
    margin-top: 1px !important;
  }
</style>
