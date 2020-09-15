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
        <el-button type="primary" size="small" @click="showInfo() == false" icon="el-icon-search">查询</el-button>
        <el-button type="primary" size="small" @click="showClear() == false">重置</el-button>
      </div>
      <div class="queryright">
        <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="quartzJobAdd()"
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
      <el-table-column label="任务类名" prop="jobClassName" min-width="100"></el-table-column>
      <el-table-column label="cron表达式" prop="cronExpression"></el-table-column>
      <el-table-column label="传递参数（json串格式）" prop="jsonParam" min-width="150"></el-table-column>
      <el-table-column label="分组" prop="jobGroup" min-width="30"></el-table-column>
      <el-table-column label="状态" prop="status" min-width="30" :formatter="statusFormat"></el-table-column>
      <el-table-column label="描述" prop="description" min-width="100"></el-table-column>
      <el-table-column align="center" label="操作" min-width="100">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              slot="reference"
              icon="el-icon-edit-outline"
              @click="modifyQuartzJob(scope.row.id)"
          >编辑
          </el-button>
          <el-popconfirm title="确定删除吗？" @onConfirm="deleteQuartzJob(scope.row.id)">
            <el-button size="mini" type="danger" slot="reference" icon="el-icon-delete">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :currentTotal="currentTotal" @pageChange="pageChange" :currentPage="currentPage"></Pagination>
    <QuartzJobAdd
        :title="title"
        :showEditDialog="showEditDialog"
        @close="showEditDialog = false"
        :requestData="requestData"
        @success="reloadData"
        @error="reloadData"
    ></QuartzJobAdd>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
import QuartzJobAdd from '@/views/sysManager/quartzJobManager/quartzJobAdd.vue'

export default {
  data () {
    return {
      jobClassName: '',
      status: '',
      title: '',
      showEditDialog: false,
      statusList: [{
        value: 0,
        label: '正常'
      }, {
        value: 1,
        label: '停止'
      }],
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
      this.axios.post(this.$api.sysManager.getQuartzJobs, {
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
    quartzJobAdd () {
      this.title = '添加任务'
      this.showEditDialog = true
    },
    modifyQuartzJob (id) {
      this.requestData.id = id
      this.title = '修改任务'
      this.showEditDialog = true
    },
    deleteQuartzJob (id) {
      this.axios.delete(this.$api.sysManager.delQuartzJob + id).then((resp) => {
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
        return '正常'
      } else if (data === 1) {
        return '停止'
      } else {
        return data
      }
    }
  },
  components: { Pagination, QuartzJobAdd }
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
