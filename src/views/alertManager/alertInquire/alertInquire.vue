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
              :value="item.value"
            >
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
          <el-input
            type="text"
            v-model="name"
            size="small"
            placeholder="告警标题"
            clearable
          ></el-input>
        </el-col>
        <el-button
          type="primary"
          size="small"
          @click="showInfo() == false"
          icon="el-icon-search"
          >查询
        </el-button>
        <el-button
          type="primary"
          size="small"
          @click="showClear() == false"
          icon="el-icon-refresh-left"
          >重置
        </el-button>
      </div>
      <div style="float: right">
        <el-button
          type="primary"
          size="small"
          style="
            background-color: #8e8e8e;
            border: none;
            color: #ffffff;
            weight: 10;
            font-size: 15px;
          "
          @click="buttonClick(0)"
          >未分类
        </el-button>
        <el-button
          type="primary"
          size="small"
          style="
            background-color: #81c0c0;
            border: none;
            color: #ffffff;
            weight: 10;
            font-size: 15px;
          "
          @click="buttonClick(1)"
          >信息
        </el-button>
        <el-button
          type="primary"
          size="small"
          style="
            background-color: #ffd306;
            border: none;
            color: #ffffff;
            weight: 10;
            font-size: 15px;
          "
          @click="buttonClick(2)"
          >警告
        </el-button>
        <el-button
          type="primary"
          size="small"
          style="
            background-color: #ea7500;
            border: none;
            color: #ffffff;
            weight: 10;
            font-size: 15px;
          "
          @click="buttonClick(3)"
          >一般严重
        </el-button>
        <el-button
          type="primary"
          size="small"
          style="
            background-color: #ff2020;
            border: none;
            color: #ffffff;
            weight: 10;
            font-size: 15px;
          "
          @click="buttonClick(4)"
          >严重
        </el-button>
        <el-button
          type="primary"
          size="small"
          style="
            background-color: #800000;
            border: none;
            color: #ffffff;
            weight: 10;
            font-size: 15px;
          "
          @click="buttonClick(5)"
          >灾难
        </el-button>
      </div>
      <div class="queryright"></div>
    </ToolBar>
    <el-table
      :data="tableData"
      v-loading="loading"
      border
      style="width: 100%"
      :row-style="tableRowStyle"
      :cell-style="yellowBg"
      :header-cell-style="tableHeaderColor"
    >
      <el-table-column
        label="告警时间"
        prop="zabbixProblemDTO.clock"
        :resizable="false"
        :formatter="formatterdata"
        width="250"
      ></el-table-column>
      <el-table-column
        label="主机名称"
        prop="hostName"
        :resizable="false"
        width="200"
      ></el-table-column>
      <el-table-column
        label="主机IP"
        prop="ip"
        :resizable="false"
        width="200"
      ></el-table-column>
      <el-table-column
        label="告警标题"
        prop="zabbixProblemDTO.name"
        :resizable="false"
      ></el-table-column>
      <el-table-column
        label="持续时间"
        prop="continuousTime"
        :resizable="false"
        :formatter="formattercontinuous"
        width="250"
      ></el-table-column>
      <el-table-column
        label="级别"
        prop="zabbixProblemDTO.severity"
        min-width="10%"
        :resizable="false"
        :formatter="severityLevelFormat"
        :v-show="false"
      >
      </el-table-column>
    </el-table>
    <div>
      <ul
        class="infinite-list"
        v-infinite-scroll="load"
        style="overflow: auto"
      ></ul>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
import { formatTodate, compareDate } from '@/utils/format.js'
import api from '@/api/api'
// import { timesMethod } from '../../../utils/formatDate'

export default {
  name: 'alertInquire',
  data () {
    return {
      count: 0,
      severity: '',
      severityOptions: [
        {
          value: 0,
          label: '未分类'
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
      pageSize: 15,
      show: false,
      setTimeoutster: '',
      currentTime: new Date(),
      continuousTime: ''
    }
  },
  created () {
    const severityVal = this.$route.query.severity
    if (typeof (severityVal) !== 'undefined' && severityVal !== '' && severityVal !== null) {
      this.severity = severityVal
      // this.$router.push({ name: 'alertInquire', query: { 'severity': severityVal } })
    }
    this.showInfo()
  },
  watch: {
    $route: function (to, from) {
      const severity = this.$route.query.severity
      this.severity = severity
      this.showInfo()
    }
  },
  mounted () {
    const _this = this // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.currentTime = new Date() // 修改数据date
    }, 30000)
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
    yellowBg ({ row, column, rowIndex, columnIndex }) {
      if (row.zabbixProblemDTO.severity === 0) {
        return 'background-color: #8E8E8E;color: #FFFFFF'
      } else if (row.zabbixProblemDTO.severity === 1) {
        return 'background-color: #81C0C0;color: #FFFFFF'
      } else if (row.zabbixProblemDTO.severity === 2) {
        return 'background-color: #FFD306;color: #FFFFFF'
      } else if (row.zabbixProblemDTO.severity === 3) {
        return 'background-color: #EA7500;color: #FFFFFF'
      } else if (row.zabbixProblemDTO.severity === 4) {
        return 'background-color: #ff2020;color: #FFFFFF'
      } else if (row.zabbixProblemDTO.severity === 5) {
        return 'background-color: #800000;color: #FFFFFF'
      }
    },
    load () {
      this.count += 2
    },
    showInfo (str) {
      this.loading = true
      this.tableData = this.tableDataclear
      const _this = this
      this.setTimeoutster = window.setTimeout(() => {
        _this.showInfoTimeout()
      }, 300)
    },
    showInfoTimeout (str) {
      this.setTimeoutster = ''

      let startTimestr = ''
      startTimestr = formatTodate(this.timeFrom, 'YYYY-MM-DD 00:00:00')

      let endTimestr = ''
      endTimestr = formatTodate(this.timeTill, 'YYYY-MM-DD 23:59:59')
      if (compareDate(startTimestr, endTimestr)) {
        // 清空数据
        this.tableData = []
        // 关闭加载
        this.loading = false
        Message({
          message: '开始日期大于结束日期！',
          type: 'warning'
        })
        return
      }
      endTimestr = String(Math.round(new Date(endTimestr).getTime() / 1000))
      startTimestr = String(Math.round(new Date(startTimestr).getTime() / 1000))
      const region = {
        severity: this.severity,
        timeFrom: startTimestr,
        timeTill: endTimestr,
        name: this.name
      }
      this.axios.post(api.alertManager.alertInquire.getProblemHosts, region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.tableData = json.data
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
      this.timeFrom = ''
      this.timeTill = ''
      this.name = ''
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
    formatterdata (str) {
      return formatTodate(str.zabbixProblemDTO.clock, 'YYYY-MM-DD HH:mm:ss')
    },
    formattercontinuous (str) {
      return this.getTimedata(str)
    },
    getTimedata (str) {
      var date1 = formatTodate(str.zabbixProblemDTO.clock, 'YYYY-MM-DD HH:mm:ss') // 开始时间
      var date2 = new Date() // 当前时间
      var date3 = date2.getTime() - new Date(date1).getTime() // 时间差的毫秒数
      // 计算出相差天数
      var days = Math.floor(date3 / (24 * 3600 * 1000))
      // 计算出小时数
      var leave1 = date3 % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000))
      // 计算相差分钟数
      var leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000))
      return days + '天 ' + hours + '小时 ' + minutes + '分'
    },
    buttonClick (severity) {
      this.severity = severity
      this.showInfo()
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
