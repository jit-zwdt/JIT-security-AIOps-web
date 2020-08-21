<template>
  <div>
    <ToolBar>
      <div class="queryleft">
        <el-col :span="12">
          <el-input type="text" v-model="username" size="small" placeholder="账号" clearable></el-input>
        </el-col>
        <el-col :span="12">
          <el-input type="text" v-model="name" size="small" placeholder="姓名" clearable></el-input>
        </el-col>
        <el-select v-model="status" class="datetop" filterable placeholder="用户状态" clearable>
          <el-option v-for="item in statuses" :key="item.id" :label="item.type" :value="item.id"></el-option>
        </el-select>
        <el-button type="primary" size="small" @click="showInfo() == false" icon="el-icon-search">查询</el-button>
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
      <el-table-column label="id" prop="id" v-if="false"></el-table-column>
      <el-table-column label="账号" prop="username"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="所属部门" prop="department"></el-table-column>
      <el-table-column label="性别" prop="sex"></el-table-column>
      <el-table-column label="生日" prop="birth"></el-table-column>
      <el-table-column label="手机号" prop="mobile"></el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="状态" prop="status"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              slot="reference"
              icon="el-icon-edit-outline"
              circle
              @click="confirmupdate(scope.$index, scope.row)"
          ></el-button>
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
      showEditDialog: false,
      username: '',
      name: '',
      status: '',
      statuses: [
        { id: '0', type: '禁用' },
        { id: '1', type: '正常' }
      ],
      tableData: [
        {
          id: '',
          username: '',
          name: '',
          department: '',
          sex: '',
          birth: '',
          mobile: '',
          email: '',
          status: ''
        }
      ],
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
      this.axios.post('/sys/user/getUsers', {
        param: {
          username: this.username,
          name: this.name,
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
      this.username = ''
      this.name = ''
      this.status = ''
    },
    formatDate (row, column) {
      let data = ''
      data = row[column.property]
      if (data == null) {
        return ''
      }
      return formatTodate(data, 'YYYY-MM-DD HH:mm:ss')
    }
  },
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
