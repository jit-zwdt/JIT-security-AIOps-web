<template>
  <div>
    <ToolBar>
      <div class="queryleft">
        <el-col :span="12">
          <el-input type="text" v-model="roleName" size="small" placeholder="角色名称" clearable></el-input>
        </el-col>
        <el-button type="primary" size="small" @click="showInfo() == false" icon="el-icon-search">查询</el-button>
        <el-button type="primary" size="small" @click="showClear() == false">重置</el-button>
      </div>
      <div class="queryright">
        <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="roleAdd()"
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
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色标识" prop="roleSign"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
      <el-table-column align="center" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              slot="reference"
              icon="el-icon-edit-outline"
              @click="modifyRole(scope.row.id)"
          >编辑
          </el-button>
          <el-button
              size="mini"
              type="primary"
              slot="reference"
              icon="el-icon-user"
              @click="roleAndUser(scope.row.id,scope.row.roleName)"
          >绑定人员
          </el-button>
          <el-button
              size="mini"
              type="primary"
              slot="reference"
              icon="el-icon-paperclip"
              @click="roleAndMenu(scope.row.id,scope.row.roleName)"
          >绑定菜单
          </el-button>
          <el-popconfirm title="确定删除吗？" @onConfirm="deleteRole(scope.row.id)">
            <el-button size="mini" type="danger" slot="reference" icon="el-icon-delete">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :currentTotal="currentTotal" @pageChange="pageChange" :currentPage="currentPage"></Pagination>
    <roleAdd
        :title="title"
        :showEditDialog="showEditDialog"
        @close="showEditDialog = false"
        :requestData="requestData"
        @success="reloadData"
        @error="reloadData"
    ></roleAdd>
    <roleAddUser
        :title="title"
        :showAddUserDialog="showAddUserDialog"
        @close="showAddUserDialog = false"
        :requestData="roleAddUserData"
        @success="reloadData"
        @error="reloadData"
    ></roleAddUser>
    <el-drawer
        title="绑定菜单"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
        size='20%'
        @open="openDrawer"
        @closed="closedDrawer"
        :wrapperClosable="false"
        :destroy-on-close="true">
      <div class="el-tree-data-title">
        <span>当前角色【{{drawerRoleName}}】</span>
        <el-input style="width: 95%"
                  placeholder="输入关键字进行过滤"
                  v-model="filterText" clearable>
        </el-input>
      </div>
      <div class="el-tree-data" :style="this.changeHeight">
        <el-tree
            class="filter-tree"
            :data="menuData"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-expand-all="true"
            :default-checked-keys="menuCheckedData"
            :filter-node-method="filterNode"
            :props="defaultProps">
        </el-tree>
      </div>
      <div>
        <el-row :gutter="10" type="flex">
          <el-col :span="4"></el-col>
          <el-col :span="8">
            <el-button @click="handleClose()">取消</el-button>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" @click="bindingMenu()">保存</el-button>
          </el-col>
          <el-col :span="4"></el-col>
        </el-row>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
import roleAdd from '@/views/sysManager/roleManager/roleAdd.vue'
import roleAddUser from '@/views/sysManager/roleManager/roleAddUser.vue'

export default {
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  data () {
    return {
      roleName: '',
      title: '',
      showEditDialog: false,
      showAddUserDialog: false,
      tableData: [
        {
          id: '',
          roleName: '',
          roleSign: ''
        }
      ],
      requestData: {
        id: ''
      },
      roleAddUserData: {
        id: ''
      },
      currentPage: 1,
      pageSize: 15,
      currentTotal: 0,
      loading: true,
      drawer: false,
      drawerId: '',
      drawerRoleName: '',
      direction: 'rtl',
      menuData: [],
      menuCheckedData: [],
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      changeHeight: {
        height: ''
      }
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
      this.axios.post(this.$api.sysManager.getRoles, {
        param: {
          roleName: this.roleName
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
      this.roleName = ''
    },
    roleAdd () {
      this.title = '添加角色'
      this.showEditDialog = true
    },
    modifyRole (id) {
      this.requestData.id = id
      this.title = '修改角色'
      this.showEditDialog = true
    },
    deleteRole (id) {
      this.axios.delete(this.$api.sysManager.delRole + id).then((resp) => {
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
    roleAndUser (id, roleName) {
      this.roleAddUserData.id = id
      this.title = '【' + roleName + '】绑定人员'
      this.showAddUserDialog = true
    },
    roleAndMenu (id, roleName) {
      this.drawerId = id
      this.drawerRoleName = roleName
      if (id !== undefined && id !== '') {
        this.axios.get(this.$api.sysManager.getRoleMenus).then((resp) => {
          if (resp.status === 200) {
            const json = resp.data
            if (json.code === 1) {
              this.axios.get(this.$api.sysManager.getRoleMenusByRoleId + id).then((resp) => {
                if (resp.status === 200) {
                  const json2 = resp.data
                  if (json2.code === 1) {
                    this.menuData = json.data
                    if (json2.data != null) {
                      this.menuCheckedData = json2.data
                    } else {
                      this.menuCheckedData = []
                    }
                    this.drawer = true
                  } else {
                    this.$message({
                      message: '获取已绑定菜单信息失败！',
                      type: 'error'
                    })
                  }
                } else {
                  this.$message({
                    message: '获取已绑定菜单信息失败！',
                    type: 'error'
                  })
                }
              })
            } else {
              this.$message({
                message: '获取菜单信息失败！',
                type: 'error'
              })
            }
          } else {
            this.$message({
              message: '获取菜单信息失败！',
              type: 'error'
            })
          }
        })
      }
    },
    handleClose () {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.drawer = false
        })
        .catch(_ => {
        })
    },
    closedDrawer () {
      this.drawerId = ''
      this.filterText = ''
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    bindingMenu () {
      const params = {
        roleId: this.drawerId,
        keys: this.$refs.tree.getCheckedKeys(false)
      }
      this.axios.post(this.$api.sysManager.bindingMenus, params).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.$emit('success')
            this.drawer = false
          }
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
          this.$emit('error')
        }
      })
    },
    openDrawer () {
      this.changeHeight.height = window.innerHeight - 210 + 'px'
    }
  },
  components: { Pagination, roleAdd, roleAddUser }
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

  .el-tree-data-title {
    margin-left: 20px;
  }

 .el-tree-data {
    margin-left: 20px;
    overflow-y: auto
  }

  @media screen and (max-height: 800px) {
    .el-tree-data {
      margin-left: 20px;
      max-height: 35%;
      overflow-y: auto
    }
  }
</style>
