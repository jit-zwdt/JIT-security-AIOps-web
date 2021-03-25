<template>
  <el-dialog
    @opened="openDialog"
    :width="dialogWidth"
    :title="title"
    :visible.sync="showEditDialog"
    :before-close="handleclosebind"
    :show-close="true"
    :close-on-click-modal="false"
  >
    <div>
      <ToolBar>
        <div class="queryleft">
          <el-col :span="8">
            <el-input type="text" v-model="nameTop" size="small" placeholder="名称" clearable></el-input>
          </el-col>
          <el-col :span="6">
            <el-select
              v-model="enableItemTop"
              class="datetop"
              filterable
              placeholder="是否启用"
              clearable
            >
              <el-option
                v-for="item in itemStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-button
            type="primary"
            size="small"
            @click="handleCurrentChange = 1 ;showInfo() == false"
            icon="el-icon-search"
          >查询</el-button>
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
        <el-table-column label="triggerid" prop="triggerid" :resizable="false" v-if="show"></el-table-column>
        <el-table-column label="触发器名称" prop="description" min-width="67%"></el-table-column>
        <el-table-column align="center" label="启用监控" min-width="10%" :resizable="false">
          <template slot-scope="scope">
            <el-switch
              class="switchStyle"
              v-model="scope.row.status"
              :active-value="0"
              active-text="启用"
              :inactive-value="1"
              inactive-text="停用"
              @change="change_enableMonitor(scope.$index, scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="严重性" min-width="30%">
          <template slot-scope="scope">
            <div>
              <el-radio-group
                v-model="scope.row.priority"
                size="small"
                @change="change_priority(scope.row)"
                @mouseover.native="default_priority(scope.row)"
              >
                <!-- <el-radio-button label="0">未分类</el-radio-button> -->
                <el-radio-button label="1">信息</el-radio-button>
                <el-radio-button label="2">警告</el-radio-button>
                <el-radio-button label="3">一般严重</el-radio-button>
                <el-radio-button label="4">严重</el-radio-button>
                <el-radio-button label="5">灾难</el-radio-button>
              </el-radio-group>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="margin-top:15px;">
        <el-pagination
          align="left"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length"
        ></el-pagination>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import qs from 'qs'
export default {
  props: {
    showEditform: {
      hostid: ''
    },
    showEditDialog: Boolean,
    dialogWidth: {
      type: String,
      default: '1200px'
    },
    title: {
      type: String,
      default: '信息添加'
    },
    labelWidth: {
      type: String,
      default: '120px'
    }
  },
  data () {
    return {
      priority: '',
      show: false,
      titleType: '',
      tableData: [{
        flags: '',
        triggerid: '',
        description: '',
        status: ''
      }],
      nameTop: '',
      enableItemTop: '',
      itemStatus: [{
        value: '0',
        label: '启用'
      }, {
        value: '1',
        label: '停用'
      }],
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
      loading: true,
      tableDataclear: [],
      setTimeoutster: '',
      handleclosebind () {
        this.nameTop = ''
        this.enableItemTop = ''
        this.$parent.$parent.noReloadData()
      },
      priorityMap: new Map([
        [0, '未分类'],
        [1, '信息'],
        [2, '警告'],
        [3, '一般严重'],
        [4, '严重'],
        [5, '灾难']
      ])
    }
  },
  methods: {
    openDialog () {
      this.pageSize = 10
      this.showClear()
      this.showInfo()
    },
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
      const region = {
        hostId: this.showEditform.hostid,
        status: this.enableItemTop,
        description: this.nameTop
      }
      this.axios.post(this.$api.monitorManager.getByConditions, region).then((resp) => {
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
      this.enableItemTop = ''
    },
    change_enableMonitor (index, rowData) {
      this.axios.put(this.$api.alertManager.alertDefine.alertDefinev1.updateTriggerStatus + rowData.triggerid, qs.stringify({
        status: rowData.status
      })).then((resp) => {
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
            this.checkStatusUpdateInfo(rowData.triggerid, rowData.status)
          }
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
          this.checkStatusUpdateInfo(rowData.triggerid, rowData.status)
        }
      }).catch(error => {
        alert('服务器异常')
        console.log(error)
      })
    },
    checkStatusUpdateInfo (triggerid, status) {
      this.tableData.forEach(element => {
        if (element.triggerid === triggerid) {
          switch (status) {
            case 0:
              element.status = 1
              break
            case 1:
              element.status = 0
              break
          }
        }
      })
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    change_priority (rowData) {
      if (rowData.flags === '4') {
        this.$alert('此项为自动发现规则中的触发器,不能修改严重性', '提示', {
          cancelButtonText: '确定',
          type: 'warning'
        })
        rowData.priority = this.priority
      } else {
        this.$confirm('确定将严重性由【' + this.priorityMap.get(parseInt(this.priority)) + '】改为【' + this.priorityMap.get(parseInt(rowData.priority)) + '】?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.put(this.$api.alertManager.alertDefine.alertDefinev1.updateTriggerPriority + rowData.triggerid, qs.stringify({
            priority: rowData.priority
          })).then((resp) => {
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
                rowData.priority = this.priority
              }
            } else {
              this.$message({
                message: '修改失败',
                type: 'error'
              })
              rowData.priority = this.priority
            }
          }).catch(error => {
            alert('服务器异常')
            rowData.priority = this.priority
            console.log(error)
          })
        }).catch(() => {
          rowData.priority = this.priority
        })
      }
    },
    default_priority (rowData) {
      this.priority = rowData.priority
    }
  },
  actions: {
  },
  components: {}
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
  width: 50px !important;
}
</style>
