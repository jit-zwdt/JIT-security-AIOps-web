<template>
  <div>
    <ToolBar>
      <div class="queryleft">
        <el-col :span="12">
          <el-input type="text" v-model="nameTop" size="small" placeholder="资产名称" clearable></el-input>
        </el-col>
        <el-date-picker
          v-model="registerDateStartTop"
          type="date"
          placeholder="开始登记时间"
          value-format="yyyy-MM-dd"
          class="datetop"
        ></el-date-picker>
        <el-date-picker
          v-model="registerDateEndTop"
          type="date"
          placeholder="结束登记时间"
          value-format="yyyy-MM-dd"
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
      <el-table-column label="资产名称" prop="name" min-width="20%">
        <template slot-scope="scope">
          <el-link type="primary" @click="showAssetsInfo(scope.row)">{{scope.row.name}}</el-link>
        </template>
      </el-table-column>
      <el-table-column
        label="资产类别"
        prop="type"
        min-width="10%"
        :resizable="false"
        :formatter="typeformatType"
      ></el-table-column>
      <el-table-column label="资产编号" prop="number" min-width="15%" :resizable="false"></el-table-column>
      <el-table-column label="资产状态" prop="state" min-width="10%" :resizable="false" :formatter="stateformatType"></el-table-column>
      <el-table-column label="IP地址" prop="ip" min-width="10%" :resizable="false"></el-table-column>
      <el-table-column label="资产所属单位" prop="belongsDept" :resizable="false" v-if="show"></el-table-column>
      <el-table-column label="资产所属人" prop="belongsPerson" :resizable="false" v-if="show"></el-table-column>
      <el-table-column
        label="资产登记时间"
        prop="registerDate"
        min-width="15%"
        :resizable="false"
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column label="登记人" prop="registrant" min-width="10%" :resizable="false"></el-table-column>
      <el-table-column
        label="资产修改时间"
        prop="assetUpdateDate"
        :resizable="false"
        v-if="show"
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column label="资产位置" prop="location" :resizable="false" v-if="show"></el-table-column>
      <el-table-column
        label="资产注销时间"
        prop="logoutDate"
        :resizable="false"
        :formatter="formatDate"
        v-if="show"
      ></el-table-column>
      <el-table-column align="center" label="操作" min-width="18">
        <template slot-scope="scope">
          <el-popconfirm title="确定删除吗？" @onConfirm="confirmdelete(scope.$index, scope.row)">
            <el-button size="mini" type="danger" slot="reference" icon="el-icon-delete">删除</el-button>
          </el-popconfirm>
          <el-button
            size="mini"
            type="primary"
            slot="reference"
            icon="el-icon-edit-outline"
            @click="confirmupdate(scope.$index, scope.row)"
          >编辑</el-button>
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
import api from '@/api/api'
export default {
  data () {
    return {
      show: false,
      showEditDialog: false,
      titleType: '',
      tableData: [{
        id: '',
        name: '',
        type: '',
        number: '',
        state: '',
        gbType: '',
        ip: '',
        backupIp: '',
        amount: '',
        belongsDept: '',
        belongsPerson: '',
        registerDate: '',
        registrant: '',
        updateDate: '',
        location: '',
        logoutDate: '',
        dateRecorded: '',
        worth: '',
        acquisitionMode: '',
        userDepartment: '',
        user: '',
        objectClassification: '',
        sn: '',
        brand: '',
        productModel: ''
      }],
      nameTop: '',
      registerDateStartTop: '',
      registerDateEndTop: '',
      serverResource: {
        name: '1',
        registerDate: ''
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
      this.axios.delete(api.assetsManager.assetsList.assetsList.deleteAssets + row.id).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.showInfo()
          } else if (json.code === 3006) {
            this.$message({
              message: json.msg,
              type: 'error'
            })
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
      const registerDateStartTop = this.registerDateStartTop == null ? "" : this.registerDateStartTop
      const registerDateEndTop = this.registerDateEndTop == null ? "" : this.registerDateEndTop
      if (compareDate(registerDateStartTop, registerDateEndTop)) {
        Message({
          message: '开始日期大于结束日期！',
          type: 'warning'
        })
        return
      }
      this.axios.post(api.assetsManager.assetsList.assetsList.findByCondition, {
        param: {
          name: this.nameTop,
          registerStartDate: registerDateStartTop,
          registerEndDate: registerDateEndTop
        },
        page: this.currentPage,
        size: this.pageSize
      }).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
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
    typeformatType (row, column) {
      let data = ''
      data = row[column.property]
      if (data === '0') {
        return '硬件'
      } else if (data === '1') {
        return '软件'
      }
      return ''
    },
    stateformatType (row, column) {
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
      this.nameTop = ''
      this.registerDateStartTop = ''
      this.registerDateEndTop = ''
      this.titleType = ''
    },
    formatDate (row, column) {
      // 获取单元格数据
      let data = ''
      data = row[column.property]
      if (data == null) {
        return ''
      }
      return formatTodate(data, 'YYYY-MM-DD')
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
  font-size: 20px;
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
/deep/.el-table {
  max-height: 740px;
  overflow: hidden;
  overflow-y: hidden;
}
/deep/.el-table__body-wrapper {
  max-height: 685px;
  overflow: hidden;
  overflow-y: auto;
}
</style>
