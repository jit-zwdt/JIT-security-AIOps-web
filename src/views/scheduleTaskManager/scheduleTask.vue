<template>
  <div>
    <ToolBar>
      <div class="queryleft">
        <el-col :span="10">
          <el-input type="text" v-model="jobClassName" size="small" placeholder="任务类名" clearable></el-input>
        </el-col>
        <el-col :span="5">
          <el-select
              v-model="status"
              class="datetop"
              filterable
              placeholder="任务状态"
              clearable
          >
            <el-option
                v-for="item in statusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-button type="primary" size="small" @click="currentPage = 1 ;showInfo() == false" icon="el-icon-search">查询</el-button>
        <el-button type="primary" size="small" @click="showClear() == false">重置</el-button>
      </div>
      <div class="queryright">
        <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="scheduleTaskAdd()"
        >新增
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
      <el-table-column label="任务类名" prop="jobClassName" min-width="120"></el-table-column>
      <el-table-column label="任务方法名" prop="jobMethodName" min-width="80"></el-table-column>
      <el-table-column label="cron表达式" prop="cronExpression" min-width="55"></el-table-column>
      <el-table-column label="表达式名称" :formatter="formatterCronExpression" prop="cronExpression" min-width="55"></el-table-column>
      <el-table-column label="传递参数（json串格式）" prop="jsonParam" min-width="100"></el-table-column>
      <el-table-column label="分组" prop="jobGroup" min-width="30"></el-table-column>
      <el-table-column label="状态" prop="status" min-width="35" :formatter="statusFormat"></el-table-column>
      <el-table-column label="描述" prop="description" min-width="70"></el-table-column>
      <el-table-column align="center" label="操作" min-width="160">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status === 0"
                     size="mini"
                     type="warning"
                     slot="reference"
                     icon="el-icon-switch-button"
                     @click="changeStatus(scope.row.id)"
          >停止
          </el-button>
          <el-button v-if="scope.row.status === 1"
                     size="mini"
                     type="success"
                     slot="reference"
                     icon="el-icon-switch-button"
                     @click="changeStatus(scope.row.id)"
          >启动
          </el-button>
          <el-button
              size="mini"
              type="primary"
              slot="reference"
              icon="el-icon-edit-outline"
              @click="modifyScheduleTask(scope.row.id)"
          >编辑
          </el-button>
          <el-popconfirm title="确定删除吗？" @onConfirm="deleteScheduleTask(scope.row.id)">
            <el-button size="mini" type="danger" slot="reference" icon="el-icon-delete">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :currentTotal="currentTotal" @pageChange="pageChange" :currentPage="currentPage"></Pagination>
    <ScheduleTaskAdd
        :title="title"
        :showEditDialog="showEditDialog"
        @close="showEditDialog = false"
        :requestData="requestData"
        @success="reloadData"
        @error="reloadData"
    ></ScheduleTaskAdd>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
import ScheduleTaskAdd from '@/views/scheduleTaskManager/scheduleTaskAdd.vue'

export default {
  data () {
    return {
      jobClassName: '',
      status: '',
      title: '',
      showEditDialog: false,
      statusList: [{
        value: 0,
        label: '已启动'
      }, {
        value: 1,
        label: '已停止'
      }],
      requestData: {
        id: ''
      },
      // 所有的 Cron 表达式数据
      cronExpressions: [],
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
      this.axios.post(this.$api.sysManager.getScheduleTasks, {
        param: {
          jobClassName: this.jobClassName,
          status: this.status
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
      // 请求所有的 Cron 表达式
      this.axios.post(this.$api.sysManager.getAllCronExpressions).then(resp => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            // 赋值
            this.cronExpressions = json.data
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
      this.jobClassName = ''
      this.status = ''
    },
    scheduleTaskAdd () {
      this.title = '添加任务'
      this.showEditDialog = true
    },
    changeStatus (id) {
      this.axios.put(this.$api.sysManager.changeStatus + id).then((resp) => {
        if (resp.status === 200) {
          const json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '操作失败',
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '操作失败',
            type: 'error'
          })
        }
        this.showInfo()
      })
    },
    modifyScheduleTask (id) {
      this.requestData.id = id
      this.title = '修改任务'
      this.showEditDialog = true
    },
    deleteScheduleTask (id) {
      this.axios.delete(this.$api.sysManager.delScheduleTask + id).then((resp) => {
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
    },
    statusFormat (row, column) {
      const data = row[column.property]
      if (data === 0) {
        return '已启动'
      } else if (data === 1) {
        return '已停止'
      } else {
        return data
      }
    },
    // 格式化日期时间表达式
    formatterCronExpression (data) {
      // 赋值初始值
      let parseStr = ''
      // 循环判断进行赋值
      this.cronExpressions.forEach(function (value) {
        if (value.cronExpression === data.cronExpression) {
          parseStr = value.cronExpressionDesc
          return false
        }
      })
      // 返回解析字符串
      return parseStr
    }
  },
  components: { Pagination, ScheduleTaskAdd }
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
