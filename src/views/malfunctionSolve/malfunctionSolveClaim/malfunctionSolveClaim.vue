<template>
    <div>
        <!--<ToolBar>-->
            <!--<div class="queryleft">-->
                <!--<el-col :span="8">-->
                    <!--<el-input type="text" v-model="name" size="small" placeholder="名称" clearable></el-input>-->
                <!--</el-col>-->
                <!--<el-select  v-model="statusSelect" class="datetop" filterable placeholder="状态" clearable>-->
                    <!--<el-option-->
                            <!--v-for="status in statusList"-->
                            <!--:key="status.value"-->
                            <!--:label="status.label"-->
                            <!--:value="status.value"-->
                    <!--&gt;</el-option>-->
                <!--</el-select>-->
                <!--<el-button type="primary" size="small" @click="showInfo() == false" icon="el-icon-search">查询</el-button>-->
                <!--<el-button type="primary" size="small" @click="showClear() == false">重置</el-button>-->
            <!--</div>-->
        <!--</ToolBar>-->
        <el-table
                :data="(tableData || []).slice((currentPage-1)*pageSize,currentPage*pageSize)"
                border
                v-loading="loading"
                style="width: 100%"
                :row-style="tableRowStyle"
                :header-cell-style="tableHeaderColor"
        >
            <el-table-column label="问题名称" prop="name" min-width="60%" :resizable="false"></el-table-column>
            <el-table-column
                    label="持续时间"
                    prop="ns"
                    min-width="10%"
                    :resizable="false"
            ></el-table-column>
            <el-table-column label="严重性" prop="severity" min-width="15%" :resizable="false">
                <template scope="scope">
                    <p v-if="scope.row.severity=='3'">一般严重</p>
                    <p v-if="scope.row.severity=='4'">严重</p>
                    <p v-if="scope.row.severity=='5'">灾难</p>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" min-width="15%">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            slot="reference"
                            :disabled="scope.row.isClaim ==1"
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
export default {
  data: function () {
    return {
      totalCount: 0,
      titleType: '',
      showEditDialog: false,
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
        clock: ''
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
        severities: severities
      }
      this.axios
        .post('/problem/findBySeverityLevel', params)
        .then(resp => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              this.tableData = json.data
              if (this.tableData) {
                this.totalCount = this.tableData.length
              }
              console.log(this.tableData)
              for (var i = 0; i < this.totalCount; i++) {
                var ns = this.tableData[i].ns
                var days = Math.floor(ns / (60000000000 * 60 * 24))
                var hours = Math.floor((ns % (60000000000 * 60 * 24)) / (60000000000 * 60))
                var minutes = Math.floor((ns % (60000000000 * 60)) / 60000000000)
                if (days > 0) {
                  this.tableData[i].ns = days + '天 ' + hours + '小时 ' + minutes + '分钟'
                } else if (hours > 0) {
                  this.tableData[i].ns = hours + '小时 ' + minutes + '分钟'
                } else if (minutes > 0) {
                  this.tableData[i].ns = minutes + '分钟'
                } else {
                  this.tableData[i].ns = 0 + '分钟'
                }
              }
              this.currentPage = 1
              this.loading = false
            }
          }
        })
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
      this.assetform.eventid = row.eventid
      this.assetform.name = row.name
      this.assetform.ns = row.ns
      this.assetform.severity = row.severity
      this.assetform.objectid = row.objectid
      this.assetform.clock = row.clock
      this.titleType = '添加'
    }
  },
  actions: {},
  components: { malfunctionSolveClaimAdd }
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
