<template>
    <div>
        <ToolBar>
            <div class="queryleft">
                <el-select v-model="claimType" class="datetop" filterable placeholder="认领类型" clearable>
                    <el-option
                            v-for="status in claimTypeList"
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
        <el-table
                :data="(tableData || []).slice((currentPage-1)*pageSize,currentPage*pageSize)"
                border
                v-loading="loading"
                style="width: 100%"
                :row-style="tableRowStyle"
                :header-cell-style="tableHeaderColor"
        >
            <el-table-column label="问题名称" prop="zabbixProblemDTO.name" min-width="60%" :resizable="false"></el-table-column>
            <el-table-column
                    label="持续时间"
                    prop="zabbixProblemDTO.ns"
                    min-width="10%"
                    :resizable="false"
            ></el-table-column>
            <el-table-column label="严重性" prop="zabbixProblemDTO.severity" min-width="15%" :resizable="false" :formatter="severityLevelFormat">
                <!--<template slot-scope="scope">-->
                <!--<p style="margin-bottom: 0px !important" v-if="scope.row.severity=='3'">一般严重</p>-->
                <!--<p style="margin-bottom: 0px !important" v-if="scope.row.severity=='4'">严重</p>-->
                <!--<p style="margin-bottom: 0px !important" v-if="scope.row.severity=='5'">灾难</p>-->
                <!--</template>-->
            </el-table-column>
            <el-table-column align="center" label="操作" min-width="15%">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            slot="reference"
                            v-if="scope.row.isClaim ==1"
                            @click="malfucntionShowInfo(scope.$index, scope.row)"
                    >已认领</el-button>
                    <el-button
                            size="mini"
                            type="primary"
                            slot="reference"
                            v-else
                            @click="malfucntionSolveClaim(scope.$index, scope.row)"
                    >认领</el-button>
                </template>
            </el-table-column>
        </el-table>
        <malfunctionSolveClaimAdd
                :title="'信息'+titleType"
                :assetform="assetform"
                :showEditDialog="showEditDialog"
                @close="showEditDialog = false"
                @success="reloadData"
                @error="reloadData"
        ></malfunctionSolveClaimAdd>
        <malfunctionShowInfo
                :title="'信息'+titleType"
                :assetform="assetform"
                :showEditDialog="showInfoDialog"
                @close="showInfoDialog = false"
                @success="reloadData"
                @error="reloadData"
        ></malfunctionShowInfo>
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
import malfunctionSolveClaimAdd from '@/views/malfunctionSolve/malfunctionSolveClaim/malfunctionSolveClaimAdd.vue'
import malfunctionShowInfo from '@/views/malfunctionSolve/malfunctionSolveClaim/malfunctionShowInfo.vue'
export default {
  data: function () {
    return {
      totalCount: 0,
      titleType: '',
      claimType: '',
      showEditDialog: false,
      showInfoDialog: false,
      claimTypeList: [{
        value: 0,
        label: '未认领'
      }, {
        value: 1,
        label: '已认领'
      }],
      tableData: [{
        name: '',
        ns: '',
        severity: '',
        isClaim: ''
      }],
      assetform: {
        eventid: '',
        name: '',
        ns: '',
        severity: '',
        objectid: '',
        clock: '',
        hostId: '',
        hostName: ''
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
      this.claimType = ''
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
      var severities = [5, 4, 3]
      const params = {
        severities: severities,
        claimType: this.claimType
      }
      this.axios
        .post('/problem/findBySeverityLevel', params)
        .then(resp => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              var now = new Date()
              this.tableData = json.data
              console.log(this.tableData)
              if (this.tableData) {
                this.totalCount = this.tableData.length
              }
              for (var i = 0; i < this.totalCount; i++) {
                var keepTime = now - new Date(this.tableData[i].zabbixProblemDTO.clock.replace('T', ' '))
                var days = Math.floor(keepTime / (60 * 60 * 24 * 1000))
                var hours = Math.floor((keepTime % (60 * 60 * 24 * 1000)) / (60 * 60 * 1000))
                var minutes = Math.floor((keepTime % (60 * 60 * 24 * 1000)) % (60 * 60 * 1000) / (60 * 1000))
                this.tableData[i].zabbixProblemDTO.ns = ''
                if (days > 0) {
                  this.tableData[i].zabbixProblemDTO.ns = days + '天 '
                }
                if (hours > 0) {
                  this.tableData[i].zabbixProblemDTO.ns += hours + '小时 '
                }
                if (minutes > 0) {
                  this.tableData[i].zabbixProblemDTO.ns += minutes + '分钟'
                }
                if (days < 1 && hours < 1 && minutes < 1) {
                  this.tableData[i].ns = 0 + '分钟'
                }
              }
              this.currentPage = 1
              this.loading = false
            }
          }
        })
    },
    severityLevelFormat (val) {
      if (val.zabbixProblemDTO.severity === 3) {
        return '一般严重'
      } else if (val.zabbixProblemDTO.severity === 4) {
        return '严重'
      } else if (val.zabbixProblemDTO.severity === 5) {
        return '灾难'
      }
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    malfucntionSolveClaim: function (index, row) {
      this.showEditDialog = true
      this.assetform.eventid = row.zabbixProblemDTO.eventid
      this.assetform.name = row.zabbixProblemDTO.name
      this.assetform.ns = row.zabbixProblemDTO.ns
      this.assetform.severity = row.zabbixProblemDTO.severity
      this.assetform.objectid = row.zabbixProblemDTO.objectid
      this.assetform.clock = row.zabbixProblemDTO.clock
      this.assetform.hostId = row.zabbixProblemDTO.hostid
      this.assetform.hostName = row.zabbixProblemDTO.host
      this.titleType = '添加'
    },
    malfucntionShowInfo: function (index, row) {
      this.showInfoDialog = true
      this.assetform.eventid = row.zabbixProblemDTO.eventid
      this.assetform.name = row.zabbixProblemDTO.name
      this.assetform.ns = row.zabbixProblemDTO.ns
      this.assetform.severity = row.zabbixProblemDTO.severity
      this.assetform.objectid = row.zabbixProblemDTO.objectid
      this.assetform.clock = row.zabbixProblemDTO.clock
      this.assetform.hostId = row.hostId
      this.assetform.hostName = row.hostName
      this.titleType = '详情'
    }
  },
  actions: {},
  components: { malfunctionSolveClaimAdd, malfunctionShowInfo }
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
