<template>
  <div>
    <ToolBar>
      <div class="queryleft">
        <el-col :span="12">
          <el-input type="text" v-model="temp_name" size="small" placeholder="模版名称" clearable></el-input>
        </el-col>
        <el-select v-model="temp_type" class="datetop" filterable placeholder="请选择模版类型" clearable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary" size="small" @click="showInfo() == false" icon="el-icon-search">查询</el-button>
        <el-button type="primary" size="small" @click="showClear() == false">重置</el-button>
      </div>
      <div class="queryright"></div>
    </ToolBar>
    <el-table
      :data="tableData"
      border
      v-loading="loading"
      style="width: 100%"
      :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor"
      @sort-change="changeTableSort"
    >
      <el-table-column label="id" prop="id" :resizable="false" v-if="show"></el-table-column>
      <el-table-column label="ico" prop="ico" :resizable="false" v-if="show"></el-table-column>
      <el-table-column label="名称" prop="name" min-width="25%" :resizable="false" :sortable="true"></el-table-column>
      <el-table-column
        label="类型"
        prop="type"
        min-width="15%"
        :resizable="false"
        :formatter="formatType"
      ></el-table-column>
      <el-table-column label="帮助描述文档" prop="helpDoc" min-width="10%" :resizable="false">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="？帮助" placement="right">
            <el-link type="primary" @click="showTemp(scope.$index, scope.row)">查看</el-link>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="使用模版" prop="templates" min-width="25%" :resizable="false"></el-table-column>
      <el-table-column
        label="创建时间"
        prop="gmtCreate"
        min-width="15%"
        :resizable="false"
        :formatter="formatDate"
      ></el-table-column>
      <el-table-column align="center" label="操作" min-width="10%">
        <template slot-scope="scope">
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
    <Pagination :currentTotal="currentTotal" @pageChange="pageChange" :currentPage="currentPage"></Pagination>
    <monitorTemplateAdd
      :title="titleType"
      :editform="editform"
      :showEditDialog="showEditDialog"
      @close="showEditDialog = false"
      @success="reloadData"
      @error="reloadData"
    ></monitorTemplateAdd>
    <HelpTemplates :helpform="helpform" :showhelpDialog="showhelpDialog"></HelpTemplates>
  </div>
</template>
<script>
import { formatTodate } from '@/utils/format.js'
import monitorTemplateAdd from '@/views/monitorManager/monitorTemplates/monitorTemplateAdd.vue'
import Pagination from '@/components/Pagination.vue'
import HelpTemplates from '@/views/monitorManager/helpTemplates/helpTemplates.vue'
export default {
  data () {
    return {
      show: false,
      showEditDialog: false,
      titleType: '',
      tableData: [
        {
          id: '',
          name: '',
          type: '',
          helpDoc: '',
          userTemplate: ''
        }
      ],
      temp_name: '',
      temp_type: '',
      options: [
        {
          value: '1',
          label: '操作系统'
        },
        {
          value: '2',
          label: '数据库'
        },
        {
          value: '3',
          label: '中间件'
        },
        {
          value: '4',
          label: '网络设备'
        },
        {
          value: '5',
          label: '硬件'
        },
        {
          value: '6',
          label: '虚拟化'
        },
        {
          value: '7',
          label: '云平台'
        }
      ],
      editform: {
        id: '',
        buttonflag: false
      },
      currentPage: 1,
      pageSize: 15,
      currentTotal: 0,
      showhelpDialog: false,
      helpform: {
        url: '',
        name: ''
      },
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
    tableRowStyle ({ row, column, rowIndex, columnIndex }) { },
    // 修改table header的背景色
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #0086f1;color: #FFFFFF;font-weight: 500;font-size:15px'
      }
    },
    reloadData () {
      this.showEditDialog = false
      this.showhelpDialog = false
      this.showInfo()
    },
    noReloadData () {
      this.showhelpDialog = false
    },
    showInfo () {
      this.loading = true
      this.tableData = this.tableDataclear
      const _this = this
      this.setTimeoutster = window.setTimeout(() => { _this.showInfoTimeout() }, 300)
    },
    showInfoTimeout () {
      this.axios
        .post('/monitorTemplates/getMonitorTemplates', {
          param: {
            name: this.temp_name,
            type: this.temp_type
          },
          page: this.currentPage,
          size: this.pageSize,
          orders: [
            {
              property: 'orderNum',
              direction: 'ASC'
            }
          ]
        })
        .then(resp => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              this.tableData = json.data.dataList
              this.currentTotal = json.data.totalRow
              this.loading = false
            }
          }
        })
    },
    confirmupdate (index, row) {
      this.showEditDialog = true
      this.editform.id = row.id
      this.editform.templates = row.templates
      this.editform.buttonflag = true
      this.titleType = row.name
    },
    pageChange (item) {
      this.currentPage = item.page_currentPage
      this.pageSize = item.page_pageSize
      this.showInfo()
    },
    showClear () {
      this.temp_name = ''
      this.temp_type = ''
      this.titleType = ''
    },
    formatDate (row, column) {
      let data = ''
      data = row[column.property]
      if (data == null) {
        return ''
      }
      return formatTodate(data, 'YYYY-MM-DD HH:mm:ss')
    },
    formatType (row, column) {
      let data = ''
      data = row[column.property]
      if (data === '1') {
        return '操作系统'
      } else if (data === '2') {
        return '数据库'
      } else if (data === '3') {
        return '中间件'
      } else if (data === '4') {
        return '网络设备'
      } else if (data === '5') {
        return '硬件'
      } else if (data === '6') {
        return '虚拟化'
      } else if (data === '7') {
        return '云平台'
      }
      return ''
    },
    changeTableSort (column) {
      var fieldName = column.prop
      var sortingType = column.order
      if (sortingType === 'descendin') {
        this.tableData = this.tableData.sort(
          (a, b) => b[fieldName] - a[fieldName]
        )
      } else {
        this.tableData = this.tableData.sort(
          (a, b) => a[fieldName] - b[fieldName]
        )
      }
    },
    showTemp (index, row) {
      this.helpform.url = row.helpDoc
      this.helpform.name = row.name
      this.helpform.imgurl = row.ico
      this.showhelpDialog = true
    }
  },
  actions: {},
  components: { monitorTemplateAdd, Pagination, HelpTemplates }
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
