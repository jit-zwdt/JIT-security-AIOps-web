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
            @click="showInfo() == false"
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
        <el-table-column label="itemid" prop="itemid" :resizable="false" v-if="show"></el-table-column>
        <el-table-column label="监控项名称" prop="name" min-width="70%"></el-table-column>
        <el-table-column label="采集间隔" prop="delay" min-width="15%"></el-table-column>
        <el-table-column align="center" label="启用监控" min-width="15%" :resizable="false">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="0"
              :inactive-value="1"
              active-color="#13ce66"
              @change="change_enableMonitor(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="margin-top:15px;">
        <el-pagination
          align="center"
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
      default: '800px'
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
      show: false,
      titleType: '',
      tableData: [{
        itemid: '',
        name: '',
        delay: '',
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
      }
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
        hostids: [this.showEditform.hostid],
        status: this.enableItemTop,
        name: this.nameTop
      }
      this.axios.post('/item/getItemInfoList', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            console.log(json.data)
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
    change_enableMonitor (rowData) {
      this.axios.put('/item/updateItemStatus/' + rowData.itemid, qs.stringify({
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
          }
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
        }
      })
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
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
/deep/.el-table {
  z-index: 1;
  max-height: 550px;
  overflow: hidden;
  overflow-y: auto;
}
</style>
