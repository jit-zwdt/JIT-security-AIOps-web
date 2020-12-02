<template>
  <el-dialog
    @opened="openDialog"
    :width="dialogWidth"
    :title="title"
    :visible.sync="addItemDialog"
    :show-close="false"
    :close-on-click-modal="false"
    append-to-body
    :close-on-press-escape="false"
  >
    <div>
      <el-select
        v-model="tophostid"
        placeholder="请选择主机"
        @change="chooseHost"
      >
        <el-option
          v-for="item in nameOptions"
          :key="item.id"
          :label="item.objectName"
          :value="item.hostId"
        ></el-option>
      </el-select>
    </div>
    <el-table
      :data="
        forShowData.slice(
          (currentInsidePage - 1) * pageSize,
          currentInsidePage * pageSize
        )
      "
      v-loading="loading"
      border
      style="width: 100%"
      :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor"
      ref="selectionTable"
      tooltip-effect="dark"
      :row-key="getRowKey"
      @select="handleSelectionChangeOne"
      @select-all="handleSelectionSelectAll"
    >
      <el-table-column
        type="selection"
        min-width="5%"
        :reserve-selection="true"
      ></el-table-column>
      <el-table-column
        label="triggerid"
        prop="triggerid"
        :resizable="false"
        v-if="show"
      ></el-table-column>
      <el-table-column
        label="触发器名称"
        prop="description"
        min-width="70%"
      ></el-table-column>
      <el-table-column
        align="center"
        label="启用监控"
        min-width="10%"
        :resizable="false"
      >
        <template slot-scope="scope">
          <div v-html="statusformat(scope.row)"></div>
        </template>
      </el-table-column>
      <el-table-column label="严重性" min-width="10%">
        <template slot-scope="scope">
          {{ valuetypeformatter(scope.row) }}
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="margin-top: 15px">
      <el-pagination
        align="left"
        @size-change="handleSizeInsideChange"
        @current-change="handleCurrentInsideChange"
        :current-page="currentInsidePage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="forShowData.length"
      ></el-pagination>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closefrom()">取消选择</el-button>
      <el-button type="primary" @click="rightChose">确定选择</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    addItemDialog: Boolean,
    dialogWidth: {
      type: String,
      default: '60rem'
    },
    title: {
      type: String,
      default: '监控项'
    },
    labelWidth: {
      type: String,
      default: '180px'
    }
  },
  data () {
    return {
      tophostid: '',
      loading: false,
      forShowData: [],
      // 下拉框的信息
      nameOptions: [],
      show: false,
      currentPage: 1, // 当前页码
      currentInsidePage: 1, // 监控项页码
      currentGraphPage: 1, // 图形列表页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
      selectionData: [],
      // 主机名称
      hostname: ''
    }
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
    // 打开页面调用的方法
    openDialog () {
      this.pageSize = 10
      this.showInfo()
    },
    closefrom () {
      this.clearform()
      this.$emit('close')
    },
    clearform () {
      this.forShowData = []
      this.tophostid = ''
      this.selectionData = []
      this.$refs.selectionTable.clearSelection()
    },
    // 查询下拉框的信息
    showInfo () {
      const param = new URLSearchParams()
      param.append('id', '')
      this.axios.post(this.$api.inspectionManager.inspectionGetHostInfo, param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.nameOptions = json.data
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
          this.$emit('error')
        }
      })
    },
    // 点击切换主机按钮调用的方法
    chooseHost (value) {
      // 切换主机的时候把切换的主机名称记录
      // 声明一个变量
      let obj = {}
      // model就是上面的数据源
      obj = this.nameOptions.find((item) => {
        // 筛选出匹配数据
        return item.hostId === value
      })
      // 赋值
      this.hostname = obj.objectName
      this.forShowData = []
      this.loading = true
      const region = {
        hostId: value
      }
      this.axios.post(this.$api.monitorManager.findByCondition, region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            // this.forShowData = json.data
            // 进行筛选添加
            json.data.forEach(item => {
              if (item.status !== 1) {
                this.forShowData.push(item)
              }
            })
            this.currentPage = 1
            this.currentInsidePage = 1
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
    rightChose () {
      if (this.selectionData.length !== 0) {
        this.$emit('success', this.selectionData)
        this.clearform()
      } else {
        this.$message({
          message: '请选择信息！',
          type: 'error'
        })
      }
    },
    getRowKey (row) {
      return row.triggerid
    },
    handleSelectionChangeOne (val, row) {
      // 解决在切换回列表的时候添加的数据全部清空的 bug 估计是重新赋值了 没找到原因只能变成 undefined 的值全部覆盖
      if (val != null) {
        val.forEach(e => {
          if (e.hostid === undefined) {
            // 放入主机 id
            e.hostid = this.tophostid
          }
          if (e.hostname === undefined) {
            // 放入主机名称
            e.hostname = this.hostname
          }
        })
      }
      row.hostid = this.tophostid
      // 将主机名称放入
      row.hostname = this.hostname
      this.selectionData = val
    },
    handleSelectionSelectAll (val) {
      if (val != null) {
        val.forEach(e => {
          if (e.hostid === undefined) {
            // 放入主机 id
            e.hostid = this.tophostid
          }
          if (e.hostname === undefined) {
            // 放入主机名称
            e.hostname = this.hostname
          }
        })
      }
      this.selectionData = val
    },
    valuetypeformatter (row) {
      var name = ''
      switch (row.priority) {
        case 1:
          name = '信息'
          break
        case 2:
          name = '警告'
          break
        case 3:
          name = '一般严重'
          break
        case 4:
          name = '严重'
          break
        case 5:
          name = '灾难'
          break
        default:
          name = '未分类'
          break
      }
      return name
    },
    statusformat (row) {
      var name = ''
      switch (row.status) {
        case 0:
          name = '启用'
          break
        default:
          name = '<span style="color:red">停用</span>'
          break
      }
      return name
    },
    handleSizeInsideChange (val) {
      this.currentInsidePage = 1
      this.pageSize = val
    },
    handleCurrentInsideChange (val) {
      this.currentInsidePage = val
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
.fromadd {
  width: 100%;
}
.queryleft {
  float: left;
}
.queryright {
  float: right;
}
/deep/ .el-table__header {
  width: 100% !important;
}
/deep/ .el-table {
  min-height: 1rem !important;
}
.changeColor {
  color: green;
}
.redchangeColor {
  color: red;
}
</style>
