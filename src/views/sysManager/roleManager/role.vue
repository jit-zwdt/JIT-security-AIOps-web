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
              @click="roleAndMenu(scope.row.id)"
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
        :wrapperClosable="false"
        :destroy-on-close="true">
      <div class="el-tree-data">
        <span>当前角色【角色名称】</span>
        <el-input style="width: 95%"
            placeholder="输入关键字进行过滤"
            v-model="filterText">
        </el-input>
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
      direction: 'rtl',
      menuData: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      menuCheckedData: [
        5
      ],
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      bindingMenu () {

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
    roleAndMenu (id) {
      console.log(id)
      this.drawer = true
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    openDrawer () {
      console.log(1222)
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
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

  .el-tree-data {
    margin-left: 20px;
    height: 90%;
    overflow-y: auto
  }
</style>
