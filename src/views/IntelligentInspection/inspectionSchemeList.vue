<template>
  <div>
    <ToolBar>
      <div class="queryleft">
        <el-col :span="13">
          <el-input type="text" v-model="hostObjectName" size="small" placeholder="业务名称" clearable></el-input>
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
      <el-table-column label="templatesId" prop="templatesId" :resizable="false" v-if="show"></el-table-column>
      <el-table-column label="zabbix中主机的Hostid" prop="hostid" v-if="show"></el-table-column>
      <el-table-column label="主机名称" prop="objectName" min-width="20%"></el-table-column>
      <el-table-column label="业务名称" prop="businessName" min-width="20%" v-if="datashow"></el-table-column>
      <el-table-column label="IP" prop="hostIp" min-width="20%" :resizable="false"></el-table-column>
      <el-table-column label="类型" prop="type" min-width="10%" :resizable="false"></el-table-column>
      <el-table-column
        label="子类型"
        prop="subtype"
        min-width="10%"
        :resizable="false"
        v-if="datashow"
      ></el-table-column>
      <!--<el-table-column label="标签" prop="hostLabel" min-width="6%" :resizable="false"></el-table-column>-->
      <el-table-column align="center" label="操作" min-width="20%">
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
          <el-button
            size="mini"
            type="primary"
            slot="reference"
            icon="el-icon-s-grid"
            @click="confirmItemList(scope.$index, scope.row)"
          >监控项</el-button>
        </template>
      </el-table-column>
    </el-table>
    <InspectionSchemeAdd
      :title="'巡检计划'+titleType"
      :dataform="dataform"
      :showEditDialog="showEditDialog"
      @close="showEditDialog = false"
      @success="reloadData"
      @error="reloadData"
    ></InspectionSchemeAdd>
    <Pagination :currentTotal="currentTotal" @pageChange="pageChange" :currentPage="currentPage"></Pagination>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
import InspectionSchemeAdd from '@/views/IntelligentInspection/inspectionSchemeAdd.vue'
export default {
  data () {
    return {
      show: false,
      datashow: false,
      hostObjectName: '',
      tableData: [{
        id: '',
        objectName: '',
        agentIp: '',
        snmpIp: '',
        enableMonitor: '',
        monitorType: '',
        type: '',
        subtype: '',
        remark: '',
        groupId: '',
        hostLabel: '',
        businessName: '',
        hostid: '',
        templatesId: '',
        typeId: '',
        subtypeId: ''
      }],
      currentPage: 1,
      pageSize: 15,
      currentTotal: 0,
      loading: true,
      tableDataclear: [],
      timer: '',
      showEditDialog: false,
      showEditform: {
        hostid: ''
      },
      titleType: '',
      dataform: {
        id: '',
        flag: ''
      }
    }
  },
  created () {
    this.initParams()
    this.showInfo()
    var clientWidth = document.body.clientWidth
    if (clientWidth > 1500) {
      this.datashow = true
    }
  },
  methods: {
    initParams () {
      var typeId = this.$route.query.typeId
      var groupId = this.$route.query.groupId
      if (typeId != null && typeof (typeId) !== 'undefined' && typeId !== '') {
        this.hostType = typeId
        this.currentHostType = typeId
      }
      if (groupId != null && typeof (groupId) !== 'undefined' && groupId !== '') {
        this.hostGroup = groupId
        this.currentHostGroup = groupId
      }
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
    reloadData () {
      this.showInfo()
    },
    confirmdelete (index, row) {
      this.axios.delete(this.$api.monitorManager.deleteHost + row.id).then((resp) => {
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
      this.axios.post(this.$api.monitorManager.hostinfo, {
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
      this.hostObjectName = ''
    },
    showAssetsAdd () {
      this.showEditDialog = true
      this.titleType = '添加'
      this.dataform.flag = '1'
    },
    confirmItemList (index, row) {
      this.showEditDialog = true
      this.showEditform.hostid = row.hostid
      this.titleType = row.objectName
    },
    noReloadData () {
      this.showEditDialog = false
    },
    confirmupdate (index, row) {
    }
  },
  mounted () {
    if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(() => {
        this.showInfo()
      }, 1000 * 60 * 2)
    }
  },
  destroyed () {
    clearInterval(this.timer)
  },
  components: { Pagination, InspectionSchemeAdd }
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
/deep/.el-tag--dark {
  border-radius: 1px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
/deep/ .switchStyle .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
}
/deep/ .switchStyle .el-switch__label--left {
  width: 45px;
  z-index: 1;
  left: 21px;
}
/deep/ .switchStyle .el-switch__label--right {
  width: 45px;
  z-index: 1;
  right: 21px;
}
/deep/ .switchStyle .el-switch__label.is-active {
  display: block;
}
/deep/ .switchStyle.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 70px !important;
}
</style>
