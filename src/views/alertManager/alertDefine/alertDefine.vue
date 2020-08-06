<template>
  <div>
    <ToolBar>
      <div class="queryleft">
        <el-col :span="12">
          <el-input type="text" v-model="nameTop" size="small" placeholder="别名" clearable></el-input>
        </el-col>
        <el-button type="primary" size="small" @click="showInfo() == false" icon="el-icon-search">查询</el-button>
        <el-button
          type="primary"
          size="small"
          @click="showClear() == false"
          icon="el-icon-refresh-left"
        >重置</el-button>
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
      <el-table-column label="userid" prop="userid" :resizable="false" v-if="show"></el-table-column>
      <el-table-column label="别名" prop="alias" min-width="25%"></el-table-column>
      <el-table-column label="用户名" prop="name" min-width="25%"></el-table-column>
      <el-table-column label="姓氏" prop="surname" min-width="25%"></el-table-column>
      <el-table-column label="用户类型" prop="type" min-width="15%" :formatter="usertypeinfo"></el-table-column>
      <el-table-column align="center" label="操作" min-width="10%">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            slot="reference"
            icon="el-icon-s-grid"
            circle
            @click="showUserInfo(scope.$index, scope.row)"
          ></el-button>
        </template>
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
    <AddUserMedias
      :addUserMediasDialog="addUserMediasDialog"
      :userid="userid"
      @close="addUserMediasDialog = false"
      @success="reloadData"
      @error="reloadData"
    ></AddUserMedias>
  </div>
</template>
<script>
import qs from 'qs'
import AddUserMedias from '@/views/alertManager/alertDefine/addUserMedias.vue'
export default {
  data () {
    return {
      addUserMediasDialog: false,
      show: false,
      tableData: [],
      nameTop: '',
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 15, // 每页的数据条数
      loading: true,
      tableDataclear: [],
      setTimeoutster: '',
      userid: ''
    }
  },
  created () {
    this.showInfo()
    // var sum = 48
    // console.log(sum.toString(2))
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
    showInfo (str) {
      this.loading = true
      this.tableData = this.tableDataclear
      const _this = this
      this.setTimeoutster = window.setTimeout(() => { _this.showInfoTimeout() }, 300)
    },
    showInfoTimeout (str) {
      var alias = this.nameTop
      this.axios.post('/user/getUserInfo', qs.stringify({
        alias: alias
      })).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
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
    showClear () {
      this.nameTop = ''
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    usertypeinfo (str) {
      switch (str.type) {
        case 3:
          str = '超级管理员'
          break
        case 2:
          str = '管理员'
          break
        default:
          str = '用户'
      }
      return str
    },
    reloadData () {
      this.showInfo()
    },
    noReloadData () {
      this.addUserMediasDialog = false
      // this.showInfo()
    },
    showUserInfo (index, row) {
      this.userid = row.userid
      this.addUserMediasDialog = true
    }
  },
  actions: {
  },
  components: { AddUserMedias }
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
/deep/.el-input__prefix {
  margin-top: -3px;
}
/deep/.el-button {
  margin-left: 10px;
}
.toolbar > div:last-child {
  justify-content: flex-start;
}
/deep/.el-table {
  z-index: 1;
  min-height: 550px;
  overflow: hidden;
  overflow-y: auto;
}
</style>
