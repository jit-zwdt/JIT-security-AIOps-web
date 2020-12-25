<template>
  <div>
    <ToolBar>
      <div class="queryleft">
        <el-date-picker
                size="small"
                v-model="timefrom"
                value-format="yyyy-MM-ddTHH:mm:ss.SSSZ"
                type="datetime"
                placeholder="选择开始日期时间">
        </el-date-picker>
        <el-date-picker
                size="small"
                v-model="timetill"
                value-format="yyyy-MM-ddTHH:mm:ss.SSSZ"
                type="datetime"
                placeholder="选择结束日期时间">
        </el-date-picker>
        <el-button type="primary" size="small" @click="currentPage = 1 ;selectTime()" icon="el-icon-search">查询</el-button>
        <el-button type="primary" size="small" @click="showClear() == false">重置</el-button>
      </div>
      <div class="queryright"></div>
    </ToolBar>
    <el-table
        :data="tableData"
        border
        v-loading="loading"
        style="width: 100%"
        :row-style="tableRowStyle"
        :header-cell-style="tableHeaderColor"
    >
      <el-table-column
          label="运维人"
          prop="operationUser"
          :resizable="false"
      ></el-table-column>
      <el-table-column
          label="创建时间"
          prop="gmtCreate"
          :resizable="false"
          :formatter="formatDate"
      ></el-table-column>
      <el-table-column align="center" label="操作" min-width="20%">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              slot="reference"
              icon="el-icon-view"
              @click="showDailyOperationReport(scope.$index, scope.row)"
          >查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :currentTotal="currentTotal" @pageChange="pageChange" :currentPage="currentPage"></Pagination>
  </div>
</template>
<script>
import { formatTodate } from '@/utils/format.js'
import Pagination from '@/components/Pagination.vue'

export default {
  data () {
    return {
      show: false,
      showEditDialog: false,
      queryDate: '',
      tableData: [
        {
          id: ''
        }
      ],
      currentPage: 1,
      pageSize: 15,
      currentTotal: 0,
      loading: true,
      timefrom: '',
      timetill: ''
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
    selectTime () {
      if (this.timefrom !== '' && this.timetill !== '') {
        if (this.timefrom <= this.timetill) {
          this.showInfo()
        } else {
          this.$message({
            message: '开始时间不能大于结束时间!',
            type: 'error'
          })
        }
      } else if (this.timefrom === '' && this.timetill === '') {
        this.timefrom = ''
        this.timetill = ''
        this.showInfo()
      } else {
        this.$message({
          message: '请选择完整时间范围!',
          type: 'error'
        })
      }
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
        .post(this.$api.dailyOperationReportManager.getDailyOperationReports, {
          param: {
            startGmtCreate: new Date(this.timefrom).getTime(),
            endGmtCreate: new Date(this.timetill).getTime()
          },
          page: this.currentPage,
          size: this.pageSize
        })
        .then(resp => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              this.tableData = json.data.dataList
              this.currentTotal = json.data.totalRow
              this.loading = false
            }
          }
        })
    },
    pageChange (item) {
      this.currentPage = item.page_currentPage
      this.pageSize = item.page_pageSize
      this.showInfo()
    },
    showClear () {
      this.timefrom = ''
      this.timetill = ''
    },
    formatDate (row, column) {
      let data = ''
      data = row[column.property]
      if (data == null) {
        return ''
      }
      return formatTodate(data, 'YYYY-MM-DD HH:mm:ss')
    },
    showDailyOperationReport (index, row) {
      this.$router.push({ name: 'showDailyOperationReport', query: { id: row.id } })
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
