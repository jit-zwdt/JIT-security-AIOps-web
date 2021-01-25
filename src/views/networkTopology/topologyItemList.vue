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
          <el-col :span="12">
            <el-input
              type="text"
              v-model="nameTop"
              size="small"
              placeholder="名称"
              clearable
            ></el-input>
          </el-col>
          <el-button
            type="primary"
            size="small"
            @click="showInfo() == false"
            icon="el-icon-search"
            >查询</el-button
          >
          <el-button
            type="primary"
            size="small"
            @click="showClear() == false"
            icon="el-icon-refresh-left"
            >重置</el-button
          >
        </div>
      </ToolBar>
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        v-loading="loading"
        border
        style="width: 100%"
        :row-style="tableRowStyle"
        :header-cell-style="tableHeaderColor"
      >
        <el-table-column
          label="id"
          prop="id"
          :resizable="false"
          v-if="show"
        ></el-table-column>
        <el-table-column label="名称" prop="infoName" min-width="70%">
          <template slot-scope="scope">
            <el-link type="primary" @click="showTopologyInfo(scope.row.id)">{{
              scope.row.infoName
            }}</el-link>
          </template></el-table-column
        >
        <el-table-column
          label="创建时间"
          prop="gmtCreate"
          :formatter="formatDate"
          min-width="30%"
        ></el-table-column>
        <el-table-column align="center" label="操作" min-width="18">
          <template slot-scope="scope">
            <el-popconfirm
              title="确定删除吗？"
              @onConfirm="confirmdelete(scope.$index, scope.row)"
            >
              <el-button
                size="mini"
                type="danger"
                slot="reference"
                icon="el-icon-delete"
                >删除</el-button
              >
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="block" style="margin-top: 15px">
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
import { formatTodate } from '@/utils/format.js'
export default {
  props: {
    showEditform: {
      id: ''
    },
    showEditDialog: Boolean,
    dialogWidth: {
      type: String,
      default: '800px'
    },
    title: {
      type: String,
      default: '拓扑图列表'
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
        id: '',
        infoName: '',
        gmtCreate: ''
      }],
      nameTop: '',
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
      loading: true,
      tableDataclear: [],
      setTimeoutster: '',
      handleclosebind () {
        this.nameTop = ''
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
        infoName: this.nameTop
      }
      this.axios.post(this.$api.networkTopology.getTopologyAllInfo, region).then((resp) => {
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
    confirmdelete (index, row) {
      this.axios.delete(this.$api.networkTopology.deleteTopology + row.id).then((resp) => {
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
    showTopologyInfo (id) {
      this.$emit('success', id)
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
    // 格式化日期
    formatDate (row, column) {
      let data = ''
      data = row[column.property]
      if (data == null) {
        return ''
      }
      return formatTodate(data, 'YYYY-MM-DD HH:mm:ss')
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
  max-height: 600px;
  overflow: hidden;
  overflow-y: auto;
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
