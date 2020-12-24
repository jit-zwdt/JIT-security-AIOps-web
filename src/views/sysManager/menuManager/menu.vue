<template>
  <div>
    <ToolBar>
      <div class="queryleft">
        <!--<el-col :span="12">
          <el-input type="text" v-model="name" size="small" placeholder="菜单名称" clearable></el-input>
        </el-col>
        <el-button type="primary" size="small" @click="showInfo() == false" icon="el-icon-search">查询</el-button>
        <el-button type="primary" size="small" @click="showClear() == false">重置</el-button>-->
      </div>
      <div class="queryright">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="menuAdd('1')">新增菜单</el-button>
      </div>
    </ToolBar>
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
      row-key="id"
      :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      v-if="1=='1'"
    >
      <el-table-column label="菜单名称" min-width="15%" :formatter="titleFormat"></el-table-column>
      <el-table-column prop="path" label="路径" min-width="20%"></el-table-column>
      <el-table-column prop="name" label="组件名称" min-width="20%"></el-table-column>
      <el-table-column prop="component" label="组件" min-width="30%"></el-table-column>
      <!-- <el-table-column prop="redirect" label="重定向" min-width="15%"></el-table-column> -->
      <el-table-column align="center" label="图标" min-width="4%">
        <template slot-scope="scope">
          <div v-html="iconFormat(scope.row)"></div>
        </template>
      </el-table-column>
      <el-table-column label="显示状态" prop="isShow" min-width="8%" align="center" :formatter="isShowFormat"></el-table-column>
      <el-table-column label="是否路由菜单" prop="isRoute" min-width="10%" align="center" :formatter="isRouteFormat"></el-table-column>
      <el-table-column align="center" label="操作" min-width="15%">
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
              更多
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="showMenuMassage = true ; menuId = scope.row.id">详情</el-dropdown-item>
              <el-dropdown-item v-if="scope.row.isShow === '0'" @click.native="updateIsShow(scope.row.id, '1')">隐藏</el-dropdown-item>
              <el-dropdown-item v-if="scope.row.isShow === '1'" @click.native="updateIsShow(scope.row.id, '0')">显示</el-dropdown-item>
              <el-dropdown-item @click.native="deleteMenuConfirm(scope.row.id)">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer
      :title="title"
      :visible.sync="drawer"
      size="40%"
      :direction="direction"
      :before-close="handleClose"
    >
      <div class="card dark-main-background">
        <ToolBar>
          <el-form
            :model="itemForm"
            ref="itemForm"
            class="edit-forms fromadd"
            label-position="right"
            :label-width="labelWidth"
            :rules="rules"
          >
            <el-row>
              <el-col>
                <el-form-item label="菜单类型：" prop="status">
                  <el-radio-group v-model="itemForm.status" @change="radiochange">
                    <el-radio v-model="itemForm.status" label="1">一级菜单</el-radio>
                    <el-radio v-model="itemForm.status" label="2">子菜单</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="一级菜单：" prop="pid" v-if="statusflag">
                  <el-select v-model="itemForm.pid" filterable placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="菜单名称：" prop="title">
                  <el-input v-model="itemForm.title" clearable placeholder="请输入菜单名称"></el-input>
                </el-form-item>
                <el-form-item label="菜单路径：" prop="path">
                  <el-input v-model="itemForm.path" clearable placeholder="请输入菜单路径"></el-input>
                </el-form-item>
                <el-form-item label="组件名称：" prop="name">
                  <el-input v-model="itemForm.name" clearable placeholder="请输入组件名称"></el-input>
                </el-form-item>
                <el-form-item label="组件路径：" prop="component">
                  <el-input
                    v-model="itemForm.component"
                    clearable
                    placeholder="请输入组件路径"
                    v-bind:disabled="isDisable"
                  ></el-input>
                </el-form-item>
                <el-form-item label="默认跳转地址：" prop="redirect">
                  <el-input v-model="itemForm.redirect" clearable placeholder="请输入路由参数redirect"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标：" prop="icon">
                  <el-input v-model="itemForm.icon" clearable placeholder="请点击右侧按钮选择图标">
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                      style="margin-left:-20px"
                      @click="iconChange"
                    ></el-button>
                  </el-input>
                </el-form-item>
                <el-form-item label="是否显示：" prop="isShow">
                  <el-switch
                    class="switchStyle"
                    v-model="itemForm.isShow"
                    active-value="0"
                    active-text="是"
                    inactive-value="1"
                    inactive-text="否"
                  ></el-switch>
                </el-form-item>
                <el-form-item label="是否路由菜单：" prop="isRoute">
                  <el-switch
                    class="switchStyle"
                    v-model="itemForm.isRoute"
                    active-value="1"
                    active-text="是"
                    inactive-value="0"
                    inactive-text="否"
                  ></el-switch>
                </el-form-item>
                <el-form-item label="排序：" prop="orderNum">
                  <el-input-number v-model="itemForm.orderNum" controls-position="right" :min="1"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </ToolBar>
        <ToolBar>
          <div class="queryright" style="width:100%">
            <el-button type="primary" @click="submitOrUpdate('itemForm')">提交</el-button>
          </div>
        </ToolBar>
      </div>
    </el-drawer>
    <menuMessage :menuId="menuId" :showMenuMassage="showMenuMassage" @close="showMenuMassage = false" @success="showMenuMassage = false"/>
    <IconInfo
      :showDialog="showDialog"
      @close="showDialog = false"
      @success="reloadData"
      @error="reloadData"
    ></IconInfo>
    <el-drawer
      :title="title"
      :visible.sync="editorDrawer"
      size="40%"
      :direction="direction"
      :before-close="handleClose1"
      id="outDiv"
    >
      <div class="card dark-main-background">
        <ToolBar>
          <el-form
            :model="itemEditor"
            ref="itemEditor"
            class="edit-forms fromadd"
            label-position="right"
            :label-width="labelWidth"
            :rules="rules"
          >
            <el-row>
              <el-col>
                <el-form-item label="菜单类型：" prop="status">
                  <span v-if="itemEditor.parentId === '0'">一级菜单</span>
                  <span v-else>子菜单</span>
                </el-form-item>
                <el-form-item label="一级菜单：" v-show="itemEditor.parentId !== '0'">
                  <el-select v-model="itemEditor.parentId" filterable placeholder="请选择">
                    <el-option
                      v-for="(item , index) in options1"
                      :key="index"
                      :label="item.title"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="菜单名称：" prop="title">
                  <el-input v-model="itemEditor.title" clearable placeholder="请输入菜单名称"></el-input>
                </el-form-item>
                <el-form-item label="菜单路径：" prop="path">
                  <el-input v-model="itemEditor.path" clearable placeholder="请输入菜单路径"></el-input>
                </el-form-item>
                <el-form-item label="组件名称：" prop="name">
                  <el-input v-model="itemEditor.name" clearable placeholder="请输入组件名称"></el-input>
                </el-form-item>
                <el-form-item label="组件路径：" prop="component" v-if="itemEditor.parentId === '0'">
                  <el-input
                    v-model="itemEditor.component"
                    clearable
                    placeholder="请输入组件路径"
                    v-bind:disabled="true"
                  ></el-input>
                </el-form-item>
                <el-form-item label="组件路径：" prop="component" v-if="itemEditor.parentId !== '0'">
                  <el-input
                    v-model="itemEditor.component"
                    clearable
                    placeholder="请输入组件路径"
                  ></el-input>
                </el-form-item>
                <el-form-item label="默认跳转地址：" prop="redirect">
                  <el-input v-model="itemEditor.redirect" clearable placeholder="请输入路由参数redirect"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标：" prop="icon">
                  <el-input v-model="itemEditor.icon" clearable placeholder="请点击右侧按钮选择图标">
                    <el-button
                      slot="append"
                      icon="el-icon-search"
                      style="margin-left:-20px"
                      @click="iconChange"
                    ></el-button>
                  </el-input>
                </el-form-item>
                <el-form-item label="是否显示：" prop="isShow">
                  <el-switch
                    class="switchStyle"
                    v-model="itemEditor.isShow"
                    :active-value="0"
                    active-text="是"
                    :inactive-value="1"
                    inactive-text="否"
                  ></el-switch>
                </el-form-item>
                <el-form-item label="是否路由菜单：" prop="isRoute">
                  <el-switch
                    class="switchStyle"
                    v-model="itemEditor.isRoute"
                    :active-value="1"
                    active-text="是"
                    :inactive-value="0"
                    inactive-text="否"
                  ></el-switch>
                </el-form-item>
                <el-form-item label="排序：" prop="orderNum">
                  <el-input-number v-model="itemEditor.orderNum" controls-position="right" :min="1"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </ToolBar>
        <ToolBar>
          <div class="queryright" style="width:100%">
            <el-button type="primary" @click="updateMenu('itemEditor')">更新</el-button>
          </div>
        </ToolBar>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import { resetObject } from '@/utils/common'
import menuMessage from '@/views/sysManager/menuManager/menuMessage'
// import menuMessage from './menuMessage'
import IconInfo from '@/views/sysManager/menuManager/iconInfo.vue'
export default {
  components: {
    menuMessage,
    IconInfo
  },
  data () {
    var validationPath = (rule, value, callback) => {
      this.axios.get(this.$api.sysManager.getValidationPath, { params: { path: value, oldPath: this.oldPath } }).then(resp => {
        var json = resp.data
        if (json.code === 1) {
          if (json.data === false) {
            return callback(new Error('这个菜单路径已经存在了'))
          } else {
            return callback()
          }
        }
      })
    }
    var validationName = (rule, value, callback) => {
      this.axios.get(this.$api.sysManager.getValidationName, { params: { name: value, oldName: this.oldName } }).then(resp => {
        var json = resp.data
        if (json.code === 1) {
          if (json.data === false) {
            return callback(new Error('这个组件名称已经存在了'))
          } else {
            return callback()
          }
        }
      })
    }
    var validationComponent = (rule, value, callback) => {
      this.axios.get(this.$api.sysManager.getValidationComponent, { params: { component: value, oldComponent: this.oldComponent } }).then(resp => {
        var json = resp.data
        if (json.code === 1) {
          if (json.data === false) {
            return callback(new Error('这个组件路径已经存在了'))
          } else {
            return callback()
          }
        }
      })
    }
    return {
      title: '',
      name: '',
      drawer: false,
      editorDrawer: false,
      direction: 'rtl',
      tableData: [],
      loading: true,
      labelWidth: '120px',
      statusflag: false,
      addOrUpdateFlag: '',
      isDisable: true,
      showDialog: false,
      itemForm: {
        id: '',
        status: '1',
        pid: '',
        name: '',
        path: '',
        title: '',
        component: '',
        redirect: '',
        icon: '',
        isShow: '0',
        isRoute: '1',
        orderNum: ''
      },
      // 编辑
      itemEditor: {
        id: '',
        status: '1',
        pid: '',
        name: '',
        path: '',
        title: '',
        component: '',
        redirect: '',
        icon: '',
        isShow: '0',
        isRoute: '1',
        orderNum: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入菜单名称' }
        ],
        path: [
          { required: true, message: '请输入菜单路径' },
          { validator: validationPath, trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入组件名称' },
          { validator: validationName, trigger: 'blur' }
        ],
        component: [
          { required: true, message: '请输入组件路径' },
          { validator: validationComponent, trigger: 'blur' }
        ],
        pid: [
          { required: true, message: '请选择一级菜单' }
        ]
      },
      options: [],
      options1: [],
      showMenuMassage: false,
      menuId: '',
      oldPath: '',
      oldName: '',
      oldComponent: ''
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
    reloadData (value) {
      this.itemForm.icon = value
      this.showDialog = false
      this.itemEditor.icon = value
    },
    noReloadData () {
      this.showDialog = false
    },
    showInfo () {
      this.loading = true
      const _this = this
      this.setTimeoutster = window.setTimeout(() => {
        _this.showInfoTimeout()
      }, 300)
      this.oldPath = ''
      this.oldName = ''
      this.oldComponent = ''
    },
    showInfoTimeout () {
      this.loading = false
      this.axios.get(this.$api.sysManager.getMenusList).then(resp => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.tableData = json.data
            this.loading = false
          }
        }
      })
    },
    showClear () {
      // this.name = ''
    },
    isShowFormat (row, column) {
      const data = row[column.property]
      if (data === '0') {
        return '显示'
      } else if (data === '1') {
        return '隐藏'
      } else {
        return data
      }
    },
    isRouteFormat (row, column) {
      const data = row[column.property]
      if (data === '0') {
        return '否'
      } else if (data === '1') {
        return '是'
      } else {
        return data
      }
    },
    titleFormat (row, column) {
      return row.title
    },
    iconFormat (row, column) {
      return '<i class=' + row.icon + '></i>'
    },
    menuAdd (id) {
      this.addOrUpdateFlag = id
      this.title = '新增'
      this.drawer = true
      this.getSysMenuFirstinfo()
      this.itemForm.component = 'Layout'
      this.isDisable = true
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.currentPageDictItem = 1
          this.drawer = false
          this.clearform()
          this.itemForm.component = 'Layout'
          this.isDisable = true
          this.itemForm.icon = ''
          this.itemEditor.icon = ''
          done()
        })
        .catch(_ => { })
    },
    clearform () {
      this.addOrUpdateFlag = ''
      this.statusflag = false
      resetObject(this.itemForm)
      this.$refs.itemForm.resetFields()
    },
    handleClose1 (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.currentPageDictItem = 1
          this.editorDrawer = false
          this.clearform1()
          this.itemEditor.component = 'Layout'
          this.itemForm.icon = ''
          this.itemEditor.icon = ''
          done()
        })
        .catch(_ => { })
    },
    clearform1 () {
      this.statusflag1 = false
      resetObject(this.itemEditor)
      this.$refs.itemEditor.resetFields()
    },
    radiochange (value) {
      switch (value) {
        case '1':
          this.statusflag = false
          this.itemForm.component = 'Layout'
          this.isDisable = true
          break
        case '2':
          this.statusflag = true
          this.itemForm.component = ''
          this.isDisable = false
          break
        default:
          this.statusflag = false
          this.itemForm.component = 'Layout'
          this.isDisable = true
          break
      }
    },
    getSysMenuFirstinfo () {
      this.axios.post(this.$api.sysManager.getSysMenuFirst).then(resp => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            const optionsinfo = []
            json.data.forEach(element => {
              const info = {
                value: element.id,
                label: element.title
              }
              optionsinfo.push(info)
            })
            this.options = optionsinfo
          }
        }
      })
    },
    submitOrUpdate (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.addOrUpdateFlag === '1') {
            this.submit()
          } else if (this.addOrUpdateFlag === '2') {
            this.update()
          }
        } else {
          return false
        }
      })
    },
    submit () {
      this.axios.post(this.$api.sysManager.addMenus, this.itemForm).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.clearform()
            this.drawer = false
            this.showInfo()
          }
        } else {
          this.$message({
            message: '添加失败',
            type: 'error'
          })
          this.clearform()
          this.drawer = false
          this.showInfo()
        }
      })
    },
    update () {
      this.axios.post(this.$api.sysManager.updateMenus, this.itemForm).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.clearform()
            this.drawer = false
            this.showInfo()
          }
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
          this.clearform()
          this.drawer = false
          this.showInfo()
        }
      })
    },
    updateIsShow (id, isShow) {
      this.axios.put(this.$api.sysManager.updateIsShow + id + '/' + isShow).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '失败',
              type: 'error'
            })
          }
        }
        this.showInfo()
      })
    },
    iconChange () {
      this.showDialog = true
    },
    // 编辑回显
    confirmupdate (index, row) {
      this.title = '修改'
      this.editorDrawer = true
      this.id = row.id
      this.axios.post(this.$api.sysManager.findBySysMenu + this.id).then(resp => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.itemEditor = json.data
            this.oldPath = json.data.path
            this.oldName = json.data.name
            this.oldComponent = json.data.component
          }
        } else {
          this.$message({
            message: '获取回显信息失败',
            type: 'error'
          })
        }
      })
      this.axios.get(this.$api.sysManager.getMenuTitle).then(resp => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.options1 = json.data
          }
        } else {
          this.$message({
            message: '获取信息失败',
            type: 'error'
          })
        }
      })
    },
    // 编辑
    updateMenu (itemEditor) {
      this.$refs[itemEditor].validate((valid) => {
        if (valid) {
          this.axios.post(this.$api.sysManager.updateMenus, this.itemEditor).then((resp) => {
            if (resp.status === 200) {
              var json = resp.data
              if (json.code === 1) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.itemForm.icon = ''
                this.itemEditor.icon = ''
                this.clearform1()
                this.editorDrawer = false
                this.showInfo()
              }
            } else {
              this.$message({
                message: '修改失败',
                type: 'error'
              })
              this.clearform1()
              this.editorDrawer = false
              this.showInfo()
            }
          })
        }
      })
    },
    // 点击删除按钮 提示是否删除
    deleteMenuConfirm (id) {
      this.$confirm('该操作将删除菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post(this.$api.sysManager.judgeOfChild + id).then(resp => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              if (json.data === true) {
                this.$message.error('该菜单下含有子菜单，请先删除子菜单！')
              } else {
                this.deleteMenu(id)
              }
            }
          } else {
            this.$message({
              message: '获取信息失败',
              type: 'error'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 调用后台逻辑删除的方法
    deleteMenu (id) {
      this.axios.post(this.$api.sysManager.deleteMenus + id).then(resp => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.showInfo()
          }
        } else {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        }
      })
    }
  }
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

.fromadd {
  width: 90%;
}
/deep/ .switchStyle .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
}
/deep/ .switchStyle .el-switch__label--left {
  z-index: 1;
  left: 25px;
}
/deep/ .switchStyle .el-switch__label--right {
  z-index: 1;
  right: -10px;
}
/deep/ .switchStyle .el-switch__label.is-active {
  display: block;
}
/deep/ .switchStyle.el-switch .el-switch__core,
/deep/ .el-switch .el-switch__label {
  width: 50px !important;
}
#outDiv {
    color: #626468;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
  }
</style>
