<template>
  <div>
    <ToolBar>
      <div class="queryleft">
        <el-col :span="10">
          <el-input type="text" v-model="cronExpressionDesc" size="small" placeholder="表达式名称" clearable></el-input>
        </el-col>
        <el-button type="primary" size="small" @click="showInfo() == false" icon="el-icon-search">查询</el-button>
        <el-button type="primary" size="small" @click="showClear() == false">重置</el-button>
      </div>
      <div class="queryright">
        <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="cronExpressionAdd()"
        >新增
        </el-button>
        <el-button
            type="primary"
            size="small"
            icon="el-icon-finished"
            @click="testCronExpression()"
        >测试
        </el-button>
      </div>
    </ToolBar>
    <el-table
        :data="tableData"
        border
        v-loading="loading"
        style="width: 100%"
        :row-style="tableRowStyle"
        :header-cell-style="tableHeaderColor"
    >
      <el-table-column label="id" prop="id" v-if="false"></el-table-column>
      <el-table-column label="表达式名称" prop="cronExpressionDesc" min-width="120"></el-table-column>
      <el-table-column label="cron表达式" prop="cronExpression" min-width="120"></el-table-column>
      <el-table-column align="center" label="操作" min-width="40">
        <template slot-scope="scope">
          <!--<el-button
              size="mini"
              type="primary"
              slot="reference"
              icon="el-icon-edit-outline"
              @click="modifyScheduleTask(scope.row.id)"
          >编辑
          </el-button>-->
          <el-popconfirm title="确定删除吗？" @onConfirm="deleteScheduleTask(scope.row.id)">
            <el-button size="mini" type="danger" slot="reference" icon="el-icon-delete">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :currentTotal="currentTotal" @pageChange="pageChange" :currentPage="currentPage"></Pagination>
    <CronExpressionAdd
        :title="title"
        :showEditDialog="showEditDialog"
        @close="showEditDialog = false"
        :requestData="requestData"
        @success="reloadData"
        @error="reloadData"
    ></CronExpressionAdd>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
import CronExpressionAdd from '@/views/sysManager/cronExpressionManager/cronExpressionAdd.vue'

export default {
  data () {
    return {
      cronExpressionDesc: '',
      title: '',
      showEditDialog: false,
      requestData: {
        id: ''
      },
      currentPage: 1,
      pageSize: 15,
      currentTotal: 0,
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
        return 'background-color: #0086f1;color: #FFFFFF;font-weight: 500;font-size:15px'
      }
    },
    reloadData () {
      this.showInfo()
    },
    noReloadData () {
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
      this.axios.post(this.$api.sysManager.getCronExpressions, {
        param: {
          cronExpressionDesc: this.cronExpressionDesc
        },
        page: this.currentPage,
        size: this.pageSize
      }).then(resp => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.tableData = json.data.dataList
            this.currentTotal = json.data.totalRow
            this.loading = false
          }
        }
        this.loading = false
      })
    },
    pageChange (item) {
      this.currentPage = item.page_currentPage
      this.pageSize = item.page_pageSize
      this.showInfo()
    },
    showClear () {
      this.cronExpressionDesc = ''
    },
    cronExpressionAdd () {
      this.title = '添加时间表达式'
      this.showEditDialog = true
    },
    modifyScheduleTask (id) {
      this.requestData.id = id
      this.title = '修改任务'
      this.showEditDialog = true
    },
    deleteScheduleTask (id) {
      this.axios.delete(this.$api.sysManager.delCronExpression + id).then((resp) => {
        if (resp.status === 200) {
          const json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '删除失败',
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        }
        this.showInfo()
      })
    }
  },
  components: { Pagination, CronExpressionAdd }
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
