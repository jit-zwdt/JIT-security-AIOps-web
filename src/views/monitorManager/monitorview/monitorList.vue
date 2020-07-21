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
          <el-select
            v-model="hostType"
            class="datetop"
            filterable
            placeholder="选择类型"
            @change="current_hostType"
            clearable
          >
            <el-option
              v-for="item in hostTypeOptions"
              :key="item.id"
              :label="item.type"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select
            v-model="hostGroup"
            class="datetop"
            filterable
            placeholder="选择分组"
            @change="current_hostGroup"
            clearable
          >
            <el-option
              v-for="item in hostGroupOptions"
              :key="item.groupid"
              :label="item.name"
              :value="item.groupid"
            ></el-option>
          </el-select>
        </el-col>
        <el-col :span="2">
          <el-select
            v-model="hostSubType"
            class="datetop"
            filterable
            placeholder="选择子类型"
            @change="current_hostSubType"
            clearable
          >
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
      <el-table-column label="templatesId" prop="templatesId" :resizable="false" v-if="show"></el-table-column>
      <el-table-column label="zabbix中主机的Hostid" prop="hostid" v-if="show"></el-table-column>
      <el-table-column label="主机名称" prop="objectName" min-width="12%">
        <template slot-scope="scope">
          <el-link type="primary" @click="showPossessionInfo(scope.row)">{{scope.row.objectName}}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="业务名称" prop="businessName" min-width="12%"></el-table-column>
      <el-table-column label="IP" prop="hostIp" min-width="12%" :resizable="false"></el-table-column>
      <el-table-column align="center" label="启用监控" min-width="6%" :resizable="false">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.enableMonitor"
            active-value="1"
            inactive-value="0"
            active-color="#13ce66"
            @change="change_enableMonitor(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="监控状态" prop="monitorType" min-width="15%" :resizable="false">
        <template slot-scope="scope">
          <el-tag
            v-for="item in makeMonitorTypeItems(scope.row)"
            :key="item.label"
            :type="item.type"
            effect="dark"
            :title="item.title"
            :hit="true"
          >{{ item.label }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="类型" prop="type" min-width="6%" :resizable="false"></el-table-column>
      <el-table-column label="子类型" prop="subtype" min-width="6%" :resizable="false"></el-table-column>
      <el-table-column label="备注" prop="remark" min-width="12%" :resizable="false"></el-table-column>
      <el-table-column label="分组" prop="groupId" min-width="6%" :resizable="false">
        <template slot-scope="scope">
          <el-popover trigger="click" placement="top">
            <p
              style="width:200px;white-space: pre-line"
            >{{groupIdformatType(scope.$index, scope.row)}}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">查看分组</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <!--<el-table-column label="标签" prop="hostLabel" min-width="6%" :resizable="false"></el-table-column>-->
      <el-table-column align="center" label="操作" min-width="14%">
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
          <el-button
            size="mini"
            type="primary"
            slot="reference"
            icon="el-icon-s-grid"
            circle
            @click="confirmItemList(scope.$index, scope.row)"
          ></el-button>
          <el-button
            size="mini"
            type="primary"
            slot="reference"
            icon="el-icon-share"
            circle
            @click="confirmTriggerList(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <ItemList
      :title="'【对象名称】'+titleType"
      :showEditform="showEditform"
      :showEditDialog="showEditDialog"
      @close="showEditDialog = false"
      @success="reloadData"
      @error="reloadData"
    ></ItemList>
    <TriggerList
      :title="'【对象名称】'+titleType"
      :showEditform="showEditform"
      :showEditDialog="showTriggerDialog"
      @close="showTriggerDialog = false"
      @success="reloadData"
      @error="reloadData"
    ></TriggerList>
    <Pagination :currentTotal="currentTotal" @pageChange="pageChange" :currentPage="currentPage"></Pagination>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination.vue'
import ItemList from '@/views/monitorManager/monitorview/item/itemList.vue'
import TriggerList from '@/views/monitorManager/monitorview/trigger/triggerList.vue'
import qs from 'qs'
export default {
  data () {
    return {
      show: false,
      hostObjectName: '',
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
      currentHostGroup: '',
      monitorTypeItems: [],
      timer: '',
      showEditDialog: false,
      showTriggerDialog: false,
      showEditform: {
        hostid: ''
      },
      titleType: ''
    }
  },
  created () {
    this.initParams()
    this.getTypes()
    this.getSubTypes()
    this.getGroups()
    this.showInfo()
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
            this.getMonitorTypeItems()
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    groupIdformatType (index, row) {
      var data = row.groupId
      var dataname = ''
      if (data !== undefined && data !== null) {
        const datalen = data.split(',').length
        const splitdata = data.split(',')
        for (var i = 0; i < datalen; i++) {
          var datachildren = splitdata[i]
          this.hostGroupOptions.forEach(element => {
            if (datachildren === element.groupid) {
              if (datalen > 1) {
                if (i === 0) {
                  dataname = element.name
                } else {
                  dataname = dataname + '\n' + element.name
                }
              } else {
                dataname = element.name
                return ''
              }
            }
          })
        }
      }
      return dataname
    },
    showClear () {
      this.hostObjectName = ''
      this.hostIp = ''
      this.hostType = ''
      this.hostGroup = ''
      this.hostSubType = ''
      this.enableMonitor = ''
      this.currentHostType = ''
      this.currentHostSubType = ''
      this.currentEnableMonitor = ''
      this.currentHostGroup = ''
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
    makeMonitorTypeItems (row) {
      var makehostIds = [
        { type: 'info', label: 'AGENT', title: '' },
        { type: 'info', label: 'SNMP', title: '' },
        { type: 'info', label: 'JMX', title: '' },
        { type: 'info', label: 'IPMI', title: '' }]
      this.monitorTypeItems.forEach(element => {
        if (element.hostid === row.hostid) {
          var agenttype = ''
          if (element.available === 0) {
            agenttype = 'info'
          } else if (element.available === 1) {
            agenttype = 'success'
          } else if (element.available === 2) {
            agenttype = 'danger'
          }
          var snmptype = ''
          if (element.snmp_available === 0) {
            snmptype = 'info'
          } else if (element.snmp_available === 1) {
            snmptype = 'success'
          } else if (element.snmp_available === 2) {
            snmptype = 'danger'
          }
          var jmxtype = ''
          if (element.jmx_available === 0) {
            jmxtype = 'info'
          } else if (element.jmx_available === 1) {
            jmxtype = 'success'
          } else if (element.jmx_available === 2) {
            jmxtype = 'danger'
          }
          var ipmitype = ''
          if (element.ipmi_available === 0) {
            ipmitype = 'info'
          } else if (element.ipmi_available === 1) {
            ipmitype = 'success'
          } else if (element.ipmi_available === 2) {
            ipmitype = 'danger'
          }
          makehostIds[0].type = agenttype
          makehostIds[0].title = element.error
          makehostIds[1].type = snmptype
          makehostIds[1].title = element.snmp_error
          makehostIds[2].type = jmxtype
          makehostIds[2].title = element.jmx_error
          makehostIds[3].type = ipmitype
          makehostIds[3].title = element.ipmi_error
          return makehostIds
        }
      })
      return makehostIds
    },
    getMonitorTypeItems () {
      const hostIds = []
      this.tableData.forEach(element => {
        hostIds.push(element.hostid)
      })
      this.axios.post('/host/findHostAvailable', hostIds).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            console.log(json.data)
            this.monitorTypeItems = json.data
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
    },
    confirmItemList (index, row) {
      this.showEditDialog = true
      this.showEditform.hostid = row.hostid
      this.titleType = row.objectName
    },
    confirmTriggerList (index, row) {
      this.showTriggerDialog = true
      this.showEditform.hostid = row.hostid
      this.titleType = row.objectName
    },
    noReloadData () {
      this.showEditDialog = false
      this.showTriggerDialog = false
    },
    confirmupdate (index, row) {
      this.$router.push({ name: 'monitorAdd', query: { id: row.id, templateId: row.templatesId, templateTypeId: row.typeId, templateSubTypeId: row.subtypeId, groupIds: row.groupId } })
    },
    showPossessionInfo (row) {
      this.$router.push({ name: 'monitorPossessionOSInfo', query: { hostId: row.hostid, hostName: row.objectName } })
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
  components: { Pagination, ItemList, TriggerList }
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
</style>
