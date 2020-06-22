<template>
  <div>
    <ToolBar>
      <div class="queryleft">
        <el-col :span="12">
          <el-input type="text" v-model="assetNameTop" size="small" placeholder="资产名称" clearable></el-input>
        </el-col>
        <el-date-picker
          v-model="assetRegisterDateStartTop"
          type="date"
          placeholder="开始登记时间"
          class="datetop"
        ></el-date-picker>
        <el-date-picker
          v-model="assetRegisterDateEndTop"
          type="date"
          placeholder="结束登记时间"
          class="datetop"
        ></el-date-picker>
        <el-button type="primary" size="small" @click="showInfo() == false" icon="el-icon-search">查询</el-button>
        <el-button
          type="primary"
          size="small"
          @click="showClear() == false"
          icon="el-icon-refresh-left"
        >重置</el-button>
      </div>
      <div class="queryright">
        <el-button
          type="primary"
          size="small"
          @click="showAssetsAdd() == true"
          icon="el-icon-edit"
        >新增</el-button>
      </div>
    </ToolBar>
    <el-table
      :data="tableData"
      v-loading="loading"
      border
      style="width: 100%"
      :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor"
    >
      <el-table-column label="id" prop="id" :resizable="false" v-if="show"></el-table-column>
      <el-table-column label="资产名称" prop="assetName" min-width="20%">
        <template slot-scope="scope">
          <el-link type="primary" @click="showAssetsInfo(scope.row)">{{scope.row.assetName}}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        label="资产类型"
        prop="assetType"
        min-width="10%"
        :resizable="false"
        :formatter="assetTypeformatType"
      ></el-table-column>
      <el-table-column label="资产编号" prop="assetNumber" min-width="15%" :resizable="false"></el-table-column>
      <el-table-column label="资产状态" prop="assetState" min-width="10%" :resizable="false" :formatter="assetStateformatType"></el-table-column>
      <el-table-column label="数量" prop="assetAmount" min-width="10%" :resizable="false"></el-table-column>
      <el-table-column label="资产所属单位" prop="assetBelongsDept" :resizable="false" v-if="show"></el-table-column>
      <el-table-column label="资产所属人" prop="assetBelongsPerson" :resizable="false" v-if="show"></el-table-column>
      <el-table-column
        label="资产登记时间"
        prop="assetRegisterDate"
        min-width="15%"
        :resizable="false"
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column label="登记人" prop="assetRegistrant" min-width="10%" :resizable="false"></el-table-column>
      <el-table-column
        label="资产修改时间"
        prop="assetUpdateDate"
        :resizable="false"
        v-if="show"
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column label="资产位置" prop="assetLocation" :resizable="false" v-if="show"></el-table-column>
      <el-table-column
        label="资产注销时间"
        prop="assetLogoutDate"
        :resizable="false"
        :formatter="formatDate"
        v-if="show"
      ></el-table-column>
      <el-table-column align="center" label="操作" min-width="10%">
        <template slot-scope="scope">
          <el-popconfirm title="确定删除吗？" @onConfirm="confirmdelete(scope.$index, scope.row)">
            <el-button size="mini" type="danger" slot="reference" icon="el-icon-delete" circle></el-button>
          </el-popconfirm>
          <el-button
            size="mini"
            type="primary"
            slot="reference"
            icon="el-icon-edit-outline"
            circle
            @click="confirmupdate(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <AssetsAdd
      :title="'信息'+titleType"
      :assetform="assetform"
      :showEditDialog="showEditDialog"
      @close="showEditDialog = false"
      @success="reloadData"
      @error="reloadData"
    ></AssetsAdd>
    <Pagination :currentTotal="currentTotal" @pageChange="pageChange" :currentPage="currentPage"></Pagination>
  </div>
</template>
<script>
import { Message } from 'element-ui'
import { formatTodate, compareDate } from '@/utils/format.js'
import AssetsAdd from '@/views/assetsManager/assetsList/assetsAdd.vue'
import Pagination from '@/components/Pagination.vue'
export default {
  data () {
    return {
      show: false,
      showEditDialog: false,
      titleType: '',
      tableData: [{
        id: '',
        assetName: '',
        assetType: '',
        assetNumber: '',
        assetState: '',
        assetAmount: '',
        assetBelongsDept: '',
        assetBelongsPerson: '',
        assetRegisterDate: '',
        assetRegistrant: '',
        assetUpdateDate: '',
        assetLocation: '',
        assetLogoutDate: ''
      }],
      assetNameTop: '',
      assetRegisterDateStartTop: '',
      assetRegisterDateEndTop: '',
      serverResource: {
        assetName: '1',
        assetRegisterDate: ''
      },
      assetform: {
        id: '',
        flag: '',
        buttonflag: false
      },
      currentPage: 1,
      pageSize: 15,
      currentTotal: 0,
      loading: true,
      tableDataclear: [],
      setTimeoutster: ''
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
      this.showEditDialog = false
      this.showInfo()
    },
    confirmdelete (index, row) {
      this.axios.delete('/assets/deleteAssets/' + row.id).then((resp) => {
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
    confirmupdate (index, row) {
      this.showEditDialog = true
      this.assetform.id = row.id
      this.assetform.flag = '2' // 1:查看 2：修改 3：新增
      this.assetform.buttonflag = true
      this.titleType = '修改'
    },
    pageChange (item) {
      this.currentPage = item.page_currentPage
      this.pageSize = item.page_pageSize
      this.showInfo()
    },
    showInfo (str) {
      this.loading = true
      this.tableData = this.tableDataclear
      const _this = this
      this.setTimeoutster = window.setTimeout(() => { _this.showInfoTimeout() }, 300)
    },
    showInfoTimeout (str) {
      this.setTimeoutster = ''
      let assetRegisterDateStartTopstr = ''
      assetRegisterDateStartTopstr = formatTodate(this.assetRegisterDateStartTop, 'YYYY-MM-DD HH:mm:ss')
      let assetRegisterDateEndTopstr = ''
      assetRegisterDateEndTopstr = formatTodate(this.assetRegisterDateEndTop, 'YYYY-MM-DD 23:59:59')
      if (compareDate(assetRegisterDateStartTopstr, assetRegisterDateEndTopstr)) {
        Message({
          message: '开始日期大于结束日期！',
          type: 'warning'
        })
        return
      }
      this.axios.post('/assets/findByCondition', {
        param: {
          assetName: this.assetNameTop,
          assetRegisterStartDate: assetRegisterDateStartTopstr,
          assetRegisterEndDate: assetRegisterDateEndTopstr
        },
        page: this.currentPage,
        size: this.pageSize
      }).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            // console.log(json.data.dataList[0])
            this.tableData = json.data.dataList
            this.currentTotal = json.data.totalRow
            this.loading = false
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    assetTypeformatType (row, column) {
      let data = ''
      data = row[column.property]
      if (data === '1') {
        return '网络设备'
      } else if (data === '2') {
        return '通讯设备'
      } else if (data === '3') {
        return '服务器'
      } else if (data === '4') {
        return '云平台'
      }
      return ''
    },
    assetStateformatType (row, column) {
      let data = ''
      data = row[column.property]
      if (data === '0') {
        return '未用'
      } else if (data === '1') {
        return '在用'
      } else if (data === '2') {
        return '禁用'
      }
      return ''
    },
    showClear () {
      this.assetNameTop = ''
      this.assetRegisterDateStartTop = ''
      this.assetRegisterDateEndTop = ''
      this.titleType = ''
    },
    formatDate (row, column) {
      // 获取单元格数据
      let data = ''
      data = row[column.property]
      if (data == null) {
        return ''
      }
      return formatTodate(data, 'YYYY-MM-DD HH:mm:ss')
    },
    showAssetsInfo (row) {
      this.showEditDialog = true
      this.assetform.id = row.id
      this.assetform.flag = '1' // 1:查看 2：修改 3：新增
      this.assetform.buttonflag = false
      this.titleType = '查看'
    },
    showAssetsAdd () {
      this.showEditDialog = true
      this.assetform.id = ''
      this.assetform.flag = '3'
      this.assetform.buttonflag = true
      this.titleType = '新增'
    }
  },
  actions: {
  },
  components: { AssetsAdd, Pagination }
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
</style>
