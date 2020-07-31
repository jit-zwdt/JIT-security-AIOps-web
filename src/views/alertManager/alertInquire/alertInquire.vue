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
        <el-col :span="20">
          <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['00:00:00', '23:59:59']">
          </el-date-picker>
        </el-col>
        <el-input v-model="name" placeholder="请输入关键字"></el-input>
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
      <el-table-column label="主机id" prop="hostId" :resizable="false" width="75"></el-table-column>
      <el-table-column label="主机名称" prop="hostName" :resizable="false" width="100"></el-table-column>
      <el-table-column label="告警标题" prop="zabbixProblemDTO.name" :resizable="false"></el-table-column>
      <el-table-column label="级别" min-width="30%">
        <template slot-scope="scope">
          <div>
            <el-radio-group
                    v-model="scope.row.severity"
                    size="small"
                    @mouseover.native="default_priority(scope.row)"
            >
               <el-radio-button label="0">未分类</el-radio-button>
              <el-radio-button label="1">信息</el-radio-button>
              <el-radio-button label="2">警告</el-radio-button>
              <el-radio-button label="3">一般严重</el-radio-button>
              <el-radio-button label="4">严重</el-radio-button>
              <el-radio-button label="5">灾难</el-radio-button>
            </el-radio-group>
          </div>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
export default {
  name: 'alertInquire',
  data () {
    return {
      severity: 0,
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
      dateRange: [],
      name: '',
      loading: true,
      tableData: [{
        hostId: '',
        hostName: '',
        clock: '',
        name: ''
      }],
      tableDataclear: [],
      currentPage: 1, // 当前页码
      pageSize: 15,
      show: false
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
      const region = {
        severity: this.severity
        // startDate: this.dateRange[0],
        // endDate: this.dateRange[1],
        // name: this.name
      }
      this.axios.post('/problem/findProblemHost', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            // console.log(json.data)
            this.tableData = json.data
            console.log(this.tableData)
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
      this.severity = 0
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
