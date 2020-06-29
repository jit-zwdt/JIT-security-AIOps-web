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
        <el-col :span="3">
          <el-input type="text" v-model="hostIp" size="small" placeholder="IP" clearable></el-input>
        </el-col>
        <el-col :span="2">
          <el-select v-model="hostType" class="datetop" filterable placeholder="选择类型" @change="current_hostType" clearable>
            <el-option
              v-for="item in hostTypeOptions"
              :key="item.id"
              :label="item.type"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select v-model="hostGroup" class="datetop" filterable placeholder="选择分组" @change="current_hostGroup" clearable>
            <el-option
              v-for="item in hostGroupOptions"
              :key="item.groupid"
              :label="item.name"
              :value="item.groupid"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select v-model="hostSubType" class="datetop" filterable placeholder="选择子类型" @change="current_hostSubType" clearable>
            <el-option
              v-for="item in hostSubTypeOptions"
              :key="item.id"
              :label="item.type"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select
            v-model="enableMonitor"
            class="datetop"
            filterable
            placeholder="是否监控"
            @change="current_enableMonitor"
            clearable
          >
            <el-option
              v-for="item in enableMonitorOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <!--<el-col :span="2">
          <el-select v-model="monitorType" class="datetop" filterable placeholder="监控状态" clearable>
            <el-option
              v-for="item in monitorTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>-->
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
      <el-table-column label="主机名称" prop="objectName" min-width="14%">
        <template slot-scope="scope">
          <el-link type="primary" @click="showAssetsInfo(scope.row)">{{scope.row.objectName}}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="业务名称" prop="businessName" min-width="14%">
      </el-table-column>
      <el-table-column label="IP" prop="hostIp" min-width="12%" :resizable="false"></el-table-column>
      <el-table-column align="center" label="启用监控" min-width="6%" :resizable="false">
        <template slot-scope="scope">
          <el-switch
                  v-model="scope.row.enableMonitor"
                  active-value="1"
                  inactive-value="0"
                  active-color="#13ce66"
                  @change="change_enableMonitor(scope.row)"/>
        </template>
      </el-table-column>
      <el-table-column label="监控状态" prop="monitorType" min-width="14%" :resizable="false"></el-table-column>
      <el-table-column label="类型" prop="type" min-width="6%" :resizable="false"></el-table-column>
      <el-table-column label="子类型" prop="subtype" min-width="6%" :resizable="false"></el-table-column>
      <el-table-column label="备注" prop="remark" min-width="12%" :resizable="false"></el-table-column>
      <el-table-column label="分组" prop="groupId" min-width="6%" :resizable="false"></el-table-column>
      <!--<el-table-column label="标签" prop="hostLabel" min-width="6%" :resizable="false"></el-table-column>-->
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
    <Pagination :currentTotal="currentTotal" @pageChange="pageChange" :currentPage="currentPage"></Pagination>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
import qs from 'qs'
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
      tableData: [{
        id: '',
        objectName: '',
        agentIp: '',
        snmpIp: '',
        enableMonitor: '',
        monitorType: '',
        typeId: '',
        hostSubType: '',
        remark: '',
        groupId: '',
        hostLabel: '',
        businessName: ''
      }],
      currentPage: 1,
      pageSize: 15,
      currentTotal: 0,
      hostTypeOptions: [],
      hostGroupOptions: [],
      hostSubTypeOptions: [],
      enableMonitorOptions: [
        {
          value: '0',
          label: '未监控'
        },
        {
          value: '1',
          label: '已监控'
        }
      ],
      monitorTypeOptions: [
        {
          value: '',
          label: ''
        }
      ],
      loading: true,
      tableDataclear: [],
      setTimeoutster: '',
      currentHostType: '',
      currentHostSubType: '',
      currentEnableMonitor: '',
      currentHostGroup: ''
    }
  },
  created () {
    this.getTypes()
    this.getSubTypes()
    this.getGroups()
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
          } else {
            this.$message({
              message: '删除失败',
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
        }
        this.showInfo()
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
      this.axios.post('/host/hostinfo', {
        param: {
          hostObjectName: this.hostObjectName,
          hostIp: this.hostIp,
          typeId: this.currentHostType,
          subtypeId: this.currentHostSubType,
          enableMonitor: this.currentEnableMonitor,
          groupId: this.currentHostGroup
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
      // this.$router.push({ name: 'monitorAddList', query: { id: this.hostObjectName } })
      this.$router.push({ name: 'monitorAddList' })
    },
    getTypes () {
      this.axios.post('/monitorType/getMonitorTypes').then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.hostTypeOptions = json.data
          }
        } else {
          this.$message({
            message: '获取类型信息失败',
            type: 'error'
          })
        }
      })
    },
    getSubTypes () {
      this.axios.post('/monitorType/getMonitorSubTypes').then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.hostSubTypeOptions = json.data
          }
        } else {
          this.$message({
            message: '获取子类型信息失败',
            type: 'error'
          })
        }
      })
    },
    getGroups () {
      this.axios.post('/hostGroup/getZabbixHostGroup').then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.hostGroupOptions = json.data
          }
        } else {
          this.$message({
            message: '获取分组信息失败',
            type: 'error'
          })
        }
      })
    },
    current_hostType (selVal) {
      this.currentHostType = selVal
    },
    current_hostSubType (selVal) {
      this.currentHostSubType = selVal
    },
    current_enableMonitor (selVal) {
      this.currentEnableMonitor = selVal
    },
    current_hostGroup (selVal) {
      this.currentHostGroup = selVal
    },
    change_enableMonitor (rowData) {
      this.axios.put('/host/updateHostEnableMonitor/' + rowData.id, qs.stringify({
        enableMonitor: rowData.enableMonitor
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
        this.showInfo()
      })
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
</style>
