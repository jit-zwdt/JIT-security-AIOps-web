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
        <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="menuAdd('0')"
        >新增主菜单
        </el-button>
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
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
          prop="title"
          label="菜单名称"
          min-width="250">
      </el-table-column>
      <el-table-column
          prop="path"
          label="路径"
          min-width="180">
      </el-table-column>
      <el-table-column
          prop="name"
          label="组件名称"
          min-width="250">
      </el-table-column>
      <el-table-column
          prop="component"
          label="组件"
          min-width="150">
      </el-table-column>
      <el-table-column
          prop="redirect"
          label="重定向"
          min-width="150">
      </el-table-column>
      <el-table-column
          prop="icon"
          label="图标">
      </el-table-column>
      <el-table-column label="状态" prop="isShow" :formatter="isShowFormat"></el-table-column>
      <el-table-column align="center" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="primary"
              slot="reference"
              icon="el-icon-edit-outline"
              @click="confirmupdate(scope.$index, scope.row)"
          >编辑
          </el-button>
          <el-dropdown>
            <el-button type="primary" size="mini">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
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
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: '',
      tableData: [{
        id: '',
        title: '',
        name: '',
        icon: '',
        url: '',
        component: ''
      }],
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
    },
    noReloadData () {
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
      this.axios.get(this.$api.sysManager.getMenus).then(resp => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            console.log(json)
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
    menuAdd (id) {
      alert(id)
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
</style>
