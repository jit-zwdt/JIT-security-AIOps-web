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
      <el-table-column align="center" label="状态" prop="isShow" min-width="5%" :formatter="isShowFormat"></el-table-column>
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
              <el-dropdown-item>详情</el-dropdown-item>
              <el-dropdown-item>隐藏</el-dropdown-item>
              <el-dropdown-item>显示</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
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
    <IconInfo
      :showDialog="showDialog"
      @close="showDialog = false"
      @success="reloadData"
      @error="reloadData"
    ></IconInfo>
  </div>
</template>
<script>
import { resetObject } from '@/utils/common'
import IconInfo from '@/views/sysManager/menuManager/iconInfo.vue'
export default {
  data () {
    return {
      title: '',
      name: '',
      drawer: false,
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
      rules: {
        name: [
          { required: true, message: '请输入菜单名称' }
        ],
        path: [
          { required: true, message: '请输入菜单路径' }
        ],
        title: [
          { required: true, message: '请输入组件名称' }
        ],
        component: [
          { required: true, message: '请输入组件路径' }
        ],
        pid: [
          { required: true, message: '请选择一级菜单' }
        ]
      },
      options: []
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
    iconChange () {
      this.showDialog = true
    }
  },
  components: { IconInfo }
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
</style>
