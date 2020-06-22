<template>
  <div>
    <ToolBar>
      <div class="queryleft">
        <el-col :span="3">
          <el-input
            type="text"
            v-model="hostObjectName"
            size="small"
            placeholder="业务名称/备注"
            clearable
          ></el-input>
        </el-col>
        <el-checkbox v-model="radioHostIp">精选IP</el-checkbox>
        <el-col :span="3">
          <el-input type="text" v-model="hostIp" size="small" placeholder="IP" clearable></el-input>
        </el-col>
        <el-col :span="2">
          <el-select v-model="hostType" class="datetop" filterable placeholder="选择类型" clearable>
            <el-option
              v-for="item in hostTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
        <el-select v-model="hostGroup" class="datetop" filterable placeholder="选择分组" clearable>
          <el-option
            v-for="item in hostGroupOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        </el-col>
        <el-col :span="2">
        <el-select v-model="hostSubType" class="datetop" filterable placeholder="选择子类型" clearable>
          <el-option
            v-for="item in hostSubTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        </el-col>
        <el-col :span="2">
        <el-select v-model="enableMonitor" class="datetop" filterable placeholder="是否监控" clearable>
          <el-option
            v-for="item in enableMonitorOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        </el-col>
        <el-col :span="2">
        <el-select v-model="monitorType" class="datetop" filterable placeholder="监控状态" clearable>
          <el-option
            v-for="item in monitorTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        </el-col>
        <el-col :span="2">
        <el-select v-model="maintainType" class="datetop" filterable placeholder="维护状态" clearable>
          <el-option
            v-for="item in maintainTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        </el-col>
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
        >添加</el-button>
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
      >
      <el-table-column label="id" prop="id" :resizable="false" v-if="show"></el-table-column>
      <el-table-column label="业务名称" prop="hostObjectName" min-width="14%">
        <template slot-scope="scope">
          <el-link type="primary" @click="showAssetsInfo(scope.row)">{{scope.row.hostObjectName}}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="IP" prop="hostIp" min-width="12%" :resizable="false"></el-table-column>
      <el-table-column label="启用监控" prop="enableMonitor" min-width="6%" :resizable="false"></el-table-column>
      <el-table-column label="监控状态" prop="monitorType" min-width="14%" :resizable="false"></el-table-column>
      <el-table-column label="类型" prop="hostType" min-width="6%" :resizable="false"></el-table-column>
      <el-table-column label="子类型" prop="hostSubType" min-width="6%" :resizable="false"></el-table-column>
      <el-table-column label="备注" prop="hostRemark" min-width="12%" :resizable="false"></el-table-column>
      <el-table-column label="分组" prop="hostGroup" min-width="6%" :resizable="false"></el-table-column>
      <el-table-column label="标签" prop="hostLabel" min-width="6%" :resizable="false"></el-table-column>
      <el-table-column label="维护状态" prop="maintainType" min-width="6%" :resizable="false"></el-table-column>
      <el-table-column align="center" label="操作" min-width="12%">
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
    <Pagination :currentTotal="currentTotal" @pageChange="pageChange" :currentPage="currentPage"></Pagination>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
export default {
  data () {
    return {
      show: false,
      hostObjectName: '',
      radioHostIp: '',
      hostIp: '',
      hostType: '',
      hostGroup: '',
      hostSubType: '',
      enableMonitor: '',
      monitorType: '',
      maintainType: '',
      tableData: [{
        id: '',
        objectName: '',
        agentIp: '',
        snmpIp: '',
        enableMonitor: '',
        monitorType: '',
        typeId: '',
        hostSubType: '',
        hostRemark: '',
        hostGroup: '',
        hostLabel: '',
        maintainType: ''
      }],
      currentPage: 1,
      pageSize: 15,
      currentTotal: 0,
      hostTypeOptions: [
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
      hostGroupOptions: [
        {
          value: '',
          label: ''
        }
      ],
      hostSubTypeOptions: [
        {
          value: '',
          label: ''
        }
      ],
      enableMonitorOptions: [
        {
          value: '',
          label: ''
        }
      ],
      monitorTypeOptions: [
        {
          value: '',
          label: ''
        }
      ],
      maintainTypeOptions: [
        {
          value: '',
          label: ''
        }
      ],
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
      this.showInfo()
    },
    confirmdelete (index, row) {
      this.axios.delete('/host/deleteHost/' + row.id).then((resp) => {
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
      this.axios.post('/host/findByCondition', {
        param: {
          objectName: this.hostObjectName
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
    showClear () {
      this.assetNameTop = ''
      this.assetRegisterDateStartTop = ''
      this.assetRegisterDateEndTop = ''
      this.titleType = ''
    },
    showAssetsAdd () {
      this.$router.push({ name: 'userCenterAuthlist', query: { id: this.usernane } })
    }
  },
  actions: {
  },
  components: { Pagination }
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
