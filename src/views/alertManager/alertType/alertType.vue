<template>
  <div>
    <ToolBar>
      <div class="queryleft">
        <el-col :span="12">
          <el-input type="text" v-model="name" size="small" placeholder="名称" clearable></el-input>
        </el-col>
        <el-select v-model="statusSelect" class="datetop" filterable placeholder="状态" clearable>
          <el-option
              v-for="status in statusList"
              :key="status.value"
              :label="status.label"
              :value="status.value"
          ></el-option>
        </el-select>
        <el-button type="primary" size="small" @click="showInfo() == false" icon="el-icon-search">查询</el-button>
        <el-button type="primary" size="small" @click="showClear() == false">重置</el-button>
      </div>
      <div class="queryright">
        <el-button
            type="primary"
            size="small"
            icon="el-icon-plus"
            @click="showMediaTypeAdd()== true"
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
      <el-table-column label="名称" prop="name" min-width="60%" :resizable="false"></el-table-column>
      <el-table-column
          label="类型"
          prop="type"
          min-width="10%"
          :resizable="false"
          :formatter="formatType"
      ></el-table-column>
      <el-table-column label="状态" min-width="10%" :resizable="false">
        <template slot-scope="scope">
          <el-switch
              class="switchStyle"
              v-model="scope.row.status"
              :active-value="0"
              active-text="启用"
              :inactive-value="1"
              inactive-text="禁用"
              @change="change_status(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="用于动作中" prop="actionUsed" min-width="15%" :resizable="false"></el-table-column>
      <el-table-column align="center" label="操作" min-width="15%">
        <template slot-scope="scope">
          <el-popconfirm title="确定删除吗？" @onConfirm="confirmdelete(scope.$index, scope.row)">
            <el-button size="mini" type="danger" slot="reference" icon="el-icon-delete">删除</el-button>
          </el-popconfirm>
          <el-button
              size="mini"
              type="primary"
              slot="reference"
              icon="el-icon-edit-outline"
              @click="mediaTypeUpdate(scope.$index, scope.row)"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import api from '@/api/api'
export default {
  data () {
    return {
      showEditDialog: false,
      name: '',
      statusSelect: '',
      statusList: [{
        value: false,
        label: '启用'
      }, {
        value: true,
        label: '禁用'
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
      var flag = false
      if (this.statusSelect === '') {
        flag = true
      }
      const params = {
        name: this.name,
        status: this.statusSelect,
        flag: flag
      }
      this.axios
        .post(api.alertManager.alertType.alertType.getMediaTypes, params)
        .then(resp => {
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
      this.name = ''
      this.statusSelect = ''
    },
    formatType (row, column) {
      var t = row.type
      if (t === 0) {
        return '邮件'
      } else if (t === 1) {
        return '脚本'
      } else if (t === 2) {
        return '短信'
      } else if (t === 3) {
        return 'Jabber'
      } else if (t === 4) {
        return 'Webhook'
      }
    },
    change_status (rowData) {
      const param = new URLSearchParams()
      param.append('mediatypeid', rowData.mediatypeid)
      param.append('status', rowData.status)
      this.axios.put(api.alertManager.alertType.alertType.updateStatus, param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '修改失败',
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
        }
        this.showInfo()
      })
    },
    showMediaTypeAdd () {
      this.$router.push({ name: 'alertTypeAdd', query: { mediatypeid: '-1' } })
    },
    confirmdelete (index, row) {
      this.axios.delete(api.alertManager.alertType.alertType.deleteMediaType + row.mediatypeid).then((resp) => {
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
          this.showInfo()
        }
      })
    },
    mediaTypeUpdate (index, row) {
      this.$router.push({ name: 'alertTypeAdd', query: { mediatypeid: row.mediatypeid } })
    }
  },
  actions: {}
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

  /deep/ .switchStyle .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
}
/deep/ .switchStyle .el-switch__label--left {
  width: 28px;
  z-index: 1;
  left: 21px;
}
/deep/ .switchStyle .el-switch__label--right {
  width: 28px;
  z-index: 1;
  right: 21px;
}
/deep/ .switchStyle .el-switch__label.is-active {
  display: block;
}
/deep/ .switchStyle.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 55px !important;
}
</style>
