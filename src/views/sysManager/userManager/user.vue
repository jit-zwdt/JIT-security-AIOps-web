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
      <div class="queryright">
        <el-button
                type="primary"
                size="small"
                icon="el-icon-plus"
                @click="showUserAdd()== true"
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
      <el-table-column label="账号" prop="username"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="所属部门" prop="department"></el-table-column>
      <el-table-column label="性别" prop="sex" :formatter="sexFormat"></el-table-column>
      <el-table-column label="生日" prop="birth" :formatter="dateFormat" min-width="120"></el-table-column>
      <el-table-column label="手机号" prop="mobile"></el-table-column>
      <el-table-column label="邮箱" prop="email" min-width="150"></el-table-column>
      <el-table-column label="状态" prop="status" :formatter="statusFormat"></el-table-column>
      <el-table-column align="center" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              slot="reference"
              icon="el-icon-edit-outline"
              @click="confirmupdate(scope.$index, scope.row)"
          >编辑</el-button>
          <el-dropdown>
            <el-button type="primary" size="mini">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="viewUser(scope.$index, scope.row)">详情</el-dropdown-item>
              <el-dropdown-item @click.native="updateUserPass(scope.$index, scope.row)">密码</el-dropdown-item>
              <el-dropdown-item @click.native="freezeUserConfirm(scope.$index, scope.row)" v-if="scope.row.status==1">冻结</el-dropdown-item>
              <el-dropdown-item @click.native="freezeUserConfirm(scope.$index, scope.row)" v-if="scope.row.status==0">取消冻结</el-dropdown-item>
              <el-dropdown-item @click.native="deleteUserConfirm(scope.$index, scope.row)">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :currentTotal="currentTotal" @pageChange="pageChange" :currentPage="currentPage"></Pagination>
    <el-dialog
          title="提示"
          :visible.sync="dialogDelete"
          width="30%"
          :id="id"
    >
      <span>确定删除该用户？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteUser">确 定</el-button>
        <el-button type="primary" @click="dialogDelete = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :userForm="userForm"
    >
      <span v-if="userForm.status==1">确定冻结该用户？</span>
      <span v-if="userForm.status==0">确定取消冻结该用户？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="freezeUser">确 定</el-button>
        <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
    </span>
    </el-dialog>
    <userAdd
            :title="titleType"
            :id="id"
            :isReadOnly="isReadOnly"
            :showEditDialog="showEditDialog"
            @close="showEditDialog = false"
            @success="reloadData"
            @error="reloadData"
    ></userAdd>
    <userPassUpdate
            :title="titleType"
            :id="id"
            :showEditDialog="showEditPassDialog"
            @close="showEditPassDialog = false"
            @success="reloadData"
            @error="reloadData"
    ></userPassUpdate>
  </div>
</template>
<script>
import { formatTodate } from '@/utils/format.js'
import Pagination from '@/components/Pagination.vue'
import userAdd from '@/views/sysManager/userManager/userAdd.vue'
import userPassUpdate from '@/views/sysManager/userManager/userPassUpdate.vue'
export default {
  data () {
    return {
      dialogDelete: false,
      dialogVisible: false,
      showEditDialog: false,
      showEditPassDialog: false,
      showChooseDepartmentDialog: false,
      username: '',
      name: '',
      id: '',
      isReadOnly: false,
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
      userForm: {},
      currentPage: 1,
      pageSize: 15,
      currentTotal: 0,
      loading: true,
      titleType: ''
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
            var data = json.data.dataList
            this.currentTotal = json.data.totalRow
            this.loading = false
            this.axios.get('/sys/department/getAllDepartment').then((resp) => {
              if (resp.status === 200) {
                var json = resp.data
                if (json.code === 1) {
                  for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < json.data.length; j++) {
                      if (data[i].departmentId === json.data[j].id) {
                        data[i].department = json.data[j].departName
                      }
                    }
                  }
                  this.tableData = data
                } else {
                  this.$message({
                    message: '获取部门列表信息失败！',
                    type: 'error'
                  })
                }
              } else {
                this.$message({
                  message: '获取部门列表信息失败！',
                  type: 'error'
                })
              }
            })
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
    dateFormat (row, column) {
      let data = ''
      data = row[column.property]
      if (data == null) {
        return ''
      }
      return formatTodate(data, 'YYYY-MM-DD HH:mm:ss')
    },
    sexFormat (row, column) {
      const data = row[column.property]
      if (data === 0) {
        return '男'
      } else if (data === 1) {
        return '女'
      } else {
        return data
      }
    },
    statusFormat (row, column) {
      const data = row[column.property]
      if (data === 0) {
        return '禁用'
      } else if (data === 1) {
        return '正常'
      } else {
        return data
      }
    },
    showUserAdd () {
      this.titleType = '添加'
      this.id = -1
      this.isReadOnly = false
      this.showEditDialog = true
    },
    viewUser (index, row) {
      this.titleType = '详情'
      this.id = row.id
      this.isReadOnly = true
      this.showEditDialog = true
    },
    deleteUserConfirm (index, row) {
      this.titleType = '冻结'
      this.dialogDelete = true
      this.id = row.id
    },
    deleteUser () {
      this.axios.delete('/sys/user/deleteUser/' + this.id).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.dialogDelete = false
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.showInfo()
          }
        } else {
          this.dialogDelete = false
          this.$message({
            message: '删除失败',
            type: 'error'
          })
          this.showInfo()
        }
      })
    },
    confirmupdate (index, row) {
      this.titleType = '修改'
      this.id = row.id
      this.isReadOnly = false
      this.showEditDialog = true
    },
    updateUserPass (index, row) {
      this.titleType = '重新设定密码'
      this.id = row.id
      this.showEditPassDialog = true
    },
    freezeUserConfirm (index, row) {
      this.titleType = '冻结'
      this.userForm = row
      if (row.status === 1) {
        this.userForm.status = 0
      } else {
        this.userForm.status = 1
      }
      this.dialogVisible = true
    },
    freezeUser () {
      this.axios.post('/sys/user/addUser', this.userForm).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.userForm = {}
            this.dialogVisible = false
            this.$emit('success')
          }
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
          this.userForm = {}
          this.dialogVisible = false
          this.$emit('error')
        }
      })
    }
  },
  components: { Pagination, userAdd, userPassUpdate }
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
