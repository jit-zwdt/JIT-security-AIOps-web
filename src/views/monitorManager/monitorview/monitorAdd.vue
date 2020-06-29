<template>
  <div>
    <ToolBar>
      <div class="queryleft">
        <span>新增&#12288;&#12288;&#12288;&#12288;{{this.$route.query.templateTypeName}}</span>
      </div>
    </ToolBar>
    <ToolBar>
      <div class="queryCenter">
        <el-form
          :model="serverListForm"
          ref="serverListForm"
          class="edit-forms fromadd"
          label-position="right"
          label-width="150px"
          :rules="editFormRules"
        >
          <el-form-item label="对象名称" prop="objectName">
            <el-input v-model="serverListForm.objectName" clearable></el-input>
          </el-form-item>
          <el-form-item label="业务名称" prop="businessName">
            <el-input v-model="serverListForm.businessName" clearable></el-input>
          </el-form-item>
          <el-form-item
            label="AGENT选用类型"
            prop="agentType"
            class="el-form-item-radio"
            v-if="agentShow"
          >
            <el-radio v-model="serverListForm.agentType" label="1">使用IP</el-radio>
            <el-radio v-model="serverListForm.agentType" label="2">使用DNS</el-radio>
          </el-form-item>
          <el-form-item label="IP" prop="agentIp" v-if="agentShow">
            <el-input v-model="serverListForm.agentIp" clearable></el-input>
          </el-form-item>
          <el-form-item label="DNS名称" prop="agentDnsName" v-if="agentShow">
            <el-input v-model="serverListForm.agentDnsName" clearable placeholder="域名"></el-input>
          </el-form-item>
          <el-form-item label="端口" prop="agentPort" v-if="agentShow">
            <el-input v-model="serverListForm.agentPort" clearable></el-input>
          </el-form-item>
          <el-form-item label="主机宏" prop="mssql_macro" v-if="sqlserverShow">
            <div>
              <el-input v-model="serverListForm.mssqlMacroInstance" clearable>
                <template slot="prepend">实例名</template>
              </el-input>
            </div>
            <div>
              <el-input v-model="serverListForm.mssqlMacroOdbc" clearable>
                <template slot="prepend">ODBC源名称</template>
              </el-input>
            </div>
            <div>
              <el-input v-model="serverListForm.mssqlMacroUsername" clearable>
                <template slot="prepend">用户名</template>
              </el-input>
            </div>
            <div>
              <el-input v-model="serverListForm.mssqlMacroPassword" clearable show-password>
                <template slot="prepend">密码</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="主机宏" prop="oracle_macro" v-if="oracleShow">
            <div>
              <el-input v-model="serverListForm.oracleMacroIp" clearable>
                <template slot="prepend">oracle所在主机IP</template>
              </el-input>
            </div>
            <div>
              <el-input v-model="serverListForm.oracleMacroAsm" clearable>
                <template slot="prepend">ASM卷名</template>
              </el-input>
            </div>
            <div>
              <el-input v-model="serverListForm.oracleMacroDbname" clearable>
                <template slot="prepend">数据库名</template>
              </el-input>
            </div>
            <div>
              <el-input v-model="serverListForm.oracleMacroUsername" clearable>
                <template slot="prepend">用户名</template>
              </el-input>
            </div>
            <div>
              <el-input v-model="serverListForm.oracleMacroPassword" clearable show-password>
                <template slot="prepend">密码</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="JMX选用类型" prop="jmxType" class="el-form-item-radio" v-if="jmxShow">
            <el-radio v-model="serverListForm.jmxType" label="1">使用IP</el-radio>
            <el-radio v-model="serverListForm.jmxType" label="2">使用DNS</el-radio>
          </el-form-item>
          <el-form-item label="JMXIP" prop="jmxIp" v-if="jmxShow">
            <el-input v-model="serverListForm.jmxIp" clearable></el-input>
          </el-form-item>
          <el-form-item label="DNS名称" prop="jmxDnsName" v-if="jmxShow">
            <el-input v-model="serverListForm.jmxDnsName" clearable placeholder="域名"></el-input>
          </el-form-item>
          <el-form-item label="JMX 端口" prop="jmxPort" v-if="jmxShow">
            <el-input v-model="serverListForm.jmxPort" clearable></el-input>
          </el-form-item>
          <el-form-item label="主机宏" prop="jmxMacro" v-if="jmxShow">
            <el-input v-model="serverListForm.jmxMacro" clearable>
              <template slot="prepend">JMX路径</template>
            </el-input>
          </el-form-item>
          <el-form-item label="SNMP选用类型" prop="snmpType" class="el-form-item-radio" v-if="snmpShow">
            <el-radio v-model="serverListForm.snmpType" label="1">使用IP</el-radio>
            <el-radio v-model="serverListForm.snmpType" label="2">使用DNS</el-radio>
          </el-form-item>
          <el-form-item label="SNMP IP" prop="snmpIp" v-if="snmpShow">
            <el-input v-model="serverListForm.snmpIp" clearable></el-input>
          </el-form-item>
          <el-form-item label="DNS名称" prop="snmpDnsName" v-if="snmpShow">
            <el-input v-model="serverListForm.snmpDnsName" clearable placeholder="域名"></el-input>
          </el-form-item>
          <el-form-item label="SNMP 端口" prop="snmpPort" v-if="snmpShow">
            <el-input v-model="serverListForm.snmpPort" clearable></el-input>
          </el-form-item>
          <el-form-item label="主机宏" prop="snmpMacro" v-if="snmpShow">
            <el-input v-model="serverListForm.snmpMacro" clearable>
              <template slot="prepend">SNMP团体名</template>
            </el-input>
          </el-form-item>
          <el-form-item label="主机宏" prop="vm_macro" v-if="vmShow">
            <div>
              <el-input v-model="serverListForm.vmMacroCpuFrequency" clearable>
                <template slot="prepend">CPU单核频率</template>
              </el-input>
            </div>
            <div>
              <el-input v-model="serverListForm.vmMacroSdkLink" clearable>
                <template slot="prepend">SDK链接</template>
              </el-input>
            </div>
            <div>
              <el-input v-model="serverListForm.vmMacroUsername" clearable>
                <template slot="prepend">用户名</template>
              </el-input>
            </div>
            <div>
              <el-input v-model="serverListForm.vmMacroPassword" clearable show-password>
                <template slot="prepend">密码</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item label="通过Proxy监控" prop="proxyMonitor">
            <el-select v-model="serverListForm.proxyMonitor" placeholder="请选择">
              <el-option
                v-for="item in proxyMonitorOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label prop="enableMonitor" class="el-form-item-radio">
            <el-checkbox v-model="serverListForm.enableMonitor" value="1">启动监控</el-checkbox>
          </el-form-item>
          <el-form-item label="模板表ID" prop="templatesId" v-if="show">
            <el-input v-model="serverListForm.templatesId" clearable></el-input>
          </el-form-item>
          <el-form-item label="(主)类型" prop="typeId" v-if="show">
            <el-input v-model="serverListForm.typeId" clearable></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="subtypeId">
            <el-select v-model="serverListForm.subtypeId" placeholder="请选择">
              <el-option
                v-for="item in subtypeIdOptions"
                :key="item.id"
                :label="item.type"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分组" prop="groupId">
            <el-select
              v-model="serverListForm.groupId"
              placeholder="请选择"
              multiple
              clearable
              filterable
              class="selectSize"
            >
              <el-option
                v-for="template in groupIdData"
                :key="template.value"
                :label="template.label"
                :value="template.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资产" prop="assetsId">
            <el-cascader
              :options="assetOptions"
              :show-all-levels="false"
              v-model="serverListForm.assetsId"
              :props="assetProps"
              clearable
              class="cascadercss"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="serverListForm.remark" clearable></el-input>
          </el-form-item>
          <el-form-item label="标签" prop="label" v-if="show">
            <el-input v-model="serverListForm.label" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </ToolBar>
    <ToolBar class="queryright">
      <div class="dialog-footer">
        <el-button @click="backfrom()">返回</el-button>
        <el-button type="primary" @click="submitOrUpdate('serverListForm')">确认</el-button>
      </div>
    </ToolBar>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false,
      sqlserverShow: false,
      oracleShow: false,
      jmxShow: false,
      snmpShow: false,
      agentShow: true,
      vmShow: false,
      serverListForm: {
        objectName: '',
        businessName: '',
        agentType: '1',
        agentIp: '',
        agentDnsName: '',
        agentPort: '10050',
        proxyMonitor: '',
        enableMonitor: true,
        subtypeId: '',
        templatesId: '',
        typeId: '',
        groupId: [],
        remark: '',
        label: '',
        mssqlMacroInstance: 'MSSQLSERVER',
        mssqlMacroOdbc: '',
        mssqlMacroPassword: '',
        mssqlMacroUsername: '',
        oracleMacroIp: '',
        oracleMacroAsm: '',
        oracleMacroDbname: 'orcl',
        oracleMacroPassword: '',
        oracleMacroUsername: '',
        jmxType: '1',
        jmxIp: '',
        jmxDnsName: '',
        jmxPort: '12345',
        jmxMacro: '',
        snmpType: '1',
        snmpIp: '',
        snmpDnsName: '',
        snmpPort: '161',
        snmpMacro: '',
        vmMacroCpuFrequency: '2666000000',
        vmMacroPassword: '',
        vmMacroSdkLink: 'https://',
        vmMacroUsername: '',
        assetsId: ''
      },
      tableDataclear: [],
      setTimeoutster: '',
      proxyMonitorOptions: [
        {
          value: '',
          label: '(No Proxy)'
        }
      ],
      subtypeIdOptions: [
        {
          id: '',
          type: ''
        }
      ],
      groupIdData: [
        {
          value: '15',
          label: '主机模板'
        },
        {
          value: '34',
          label: '数据库模板'
        }
      ],
      assetOptions: [],
      assetProps: {
        value: 'id',
        label: 'name',
        children: 'items'
      },
      editFormRules: {
        objectName: [{
          required: true, // 默认是否显示校验
          message: '请输入对象名称',
          trigger: 'blur'
        }],
        businessName: [{
          required: true,
          message: '请输入业务名称',
          trigger: 'blur'
        }],
        subtypeId: [{
          required: true,
          message: '请选择类型',
          trigger: 'blur'
        }],
        groupId: [{
          required: true,
          message: '请选择分组',
          trigger: 'blur'
        }],
        agentIp: [{
          required: true,
          message: '请输入IP',
          trigger: 'blur'
        }],
        agentDnsName: [{
          required: true,
          message: '请输入DNS',
          trigger: 'blur'
        }],
        agentPort: [{
          required: true,
          message: '请输入端口',
          trigger: 'blur'
        }],
        jmxIp: [{
          required: true,
          message: '请输入IP',
          trigger: 'blur'
        }],
        jmxDnsName: [{
          required: true,
          message: '请输入DNS',
          trigger: 'blur'
        }],
        jmxPort: [{
          required: true,
          message: '请输入端口',
          trigger: 'blur'
        }],
        snmpIp: [{
          required: true,
          message: '请输入IP',
          trigger: 'blur'
        }],
        snmpDnsName: [{
          required: true,
          message: '请输入DNS',
          trigger: 'blur'
        }],
        snmpPort: [{
          required: true,
          message: '请输入端口',
          trigger: 'blur'
        }]
      }
    }
  },
  created () {
    this.serverListForm.templatesId = this.$route.query.templateId
    var templateId = this.$route.query.templateId
    this.serverListForm.typeId = this.$route.query.templateSubTypeId
    var templateSubTypeId = this.$route.query.templateSubTypeId
    if (templateSubTypeId === '10') {
      this.sqlserverShow = true
    } else if (templateSubTypeId === '12') {
      this.oracleShow = true
    } else if (templateSubTypeId === '13') {
      this.serverListForm.jmxMacro = 'path'
      this.jmxShow = true
    } else if (templateSubTypeId === '14') {
      this.serverListForm.jmxMacro = 'context'
      this.jmxShow = true
    } else if (templateSubTypeId === '25') {
      this.vmShow = true
    }
    if (templateId === '12' || templateId === '13' || templateId === '14') {
      this.agentShow = false
      this.snmpShow = true
    }
    this.showInfo()
  },
  methods: {
    reloadData () {
      this.showInfo()
    },
    showInfo (str) {
      const _this = this
      this.setTimeoutster = window.setTimeout(() => { _this.showInfoTimeout() }, 300)
    },
    showInfoTimeout () {
      this.getSubtypeIdOptions()
      this.getAssetInfo()
    },
    getSubtypeIdOptions () {
      const param = new URLSearchParams()
      param.append('ids', this.serverListForm.typeId)
      this.axios.post('/monitorType/getJsonTypes', param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          // console.log(json.data)
          if (json.code === 1) {
            this.subtypeIdOptions = json.data
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    getAssetInfo () {
      this.axios.post('/assets/findByConditionInfo').then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          console.log(json.data)
          if (json.code === 1) {
            this.assetOptions = json.data
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    submitOrUpdate (formName) {
      this.checkform()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit()
        } else {
          return false
        }
      })
    },
    submit () {
      const region = this.makeParam()
      this.axios.post('/host/addHost', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.clearform()
            this.$router.push({ name: 'monitorList' })
          } else {
            this.$message({
              message: '添加失败',
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '添加失败',
            type: 'error'
          })
          this.clearform()
        }
      })
    },
    checkform () {
      var templateId = this.$route.query.templateId
      var templateSubTypeId = this.$route.query.templateSubTypeId
      if (templateId === '12' || templateId === '13' || templateId === '14') {
        if (this.serverListForm.snmpType === '1') {
          this.editFormRules.snmpIp[0].required = true
          this.editFormRules.snmpDnsName[0].required = false
        } else {
          this.editFormRules.snmpIp[0].required = false
          this.editFormRules.snmpDnsName[0].required = true
        }
      } else {
        if (this.serverListForm.agentType === '1') {
          this.editFormRules.agentIp[0].required = true
          this.editFormRules.agentDnsName[0].required = false
        } else {
          this.editFormRules.agentIp[0].required = false
          this.editFormRules.agentDnsName[0].required = true
        }
      }
      if (templateSubTypeId === '13' || templateSubTypeId === '14') {
        if (this.serverListForm.jmxType === '1') {
          this.editFormRules.jmxIp[0].required = true
          this.editFormRules.jmxDnsName[0].required = false
        } else {
          this.editFormRules.jmxIp[0].required = false
          this.editFormRules.jmxDnsName[0].required = true
        }
      }
    },
    makeParam () {
      var assetsId = (this.serverListForm.assetsId).toString()
      assetsId = assetsId.split(',')[1]
      var enableMonitor = this.serverListForm.enableMonitor
      if (enableMonitor) {
        enableMonitor = '1'
      } else {
        enableMonitor = '0'
      }
      const region = {
        objectName: this.serverListForm.objectName,
        businessName: this.serverListForm.businessName,
        agentType: this.serverListForm.agentType,
        agentIp: this.serverListForm.agentIp,
        agentDnsName: this.serverListForm.agentDnsName,
        agentPort: this.serverListForm.agentPort,
        proxyMonitor: this.serverListForm.proxyMonitor,
        enableMonitor: enableMonitor,
        subtypeId: this.serverListForm.subtypeId,
        groupId: (this.serverListForm.groupId).toString(),
        remark: this.serverListForm.remark,
        label: this.serverListForm.label,
        templatesId: this.serverListForm.templatesId,
        typeId: this.serverListForm.typeId,
        mssqlMacroInstance: this.serverListForm.mssqlMacroInstance,
        mssqlMacroOdbc: this.serverListForm.mssqlMacroOdbc,
        mssqlMacroPassword: this.serverListForm.mssqlMacroPassword,
        mssqlMacroUsername: this.serverListForm.mssqlMacroUsername,
        oracleMacroIp: this.serverListForm.oracleMacroIp,
        oracleMacroAsm: this.serverListForm.oracleMacroAsm,
        oracleMacroDbname: this.serverListForm.oracleMacroDbname,
        oracleMacroPassword: this.serverListForm.oracleMacroPassword,
        oracleMacroUsername: this.serverListForm.oracleMacroUsername,
        jmxType: this.serverListForm.jmxType,
        jmxIp: this.serverListForm.jmxIp,
        jmxDnsName: this.serverListForm.jmxDnsName,
        jmxPort: this.serverListForm.jmxPort,
        jmxMacro: this.serverListForm.jmxMacro,
        snmpType: this.serverListForm.snmpType,
        snmpIp: this.serverListForm.snmpIp,
        snmpDnsName: this.serverListForm.snmpDnsName,
        snmpPort: this.serverListForm.snmpPort,
        snmpMacro: this.serverListForm.snmpMacro,
        vmMacroCpuFrequency: this.serverListForm.vmMacroCpuFrequency,
        vmMacroPassword: this.serverListForm.vmMacroPassword,
        vmMacroSdkLink: this.serverListForm.vmMacroSdkLink,
        vmMacroUsername: this.serverListForm.vmMacroUsername,
        assetsId: assetsId
      }
      return region
    },
    clearform () {
      this.serverListForm.objectName = ''
      this.serverListForm.businessName = ''
      this.serverListForm.agentType = '1'
      this.serverListForm.agentIp = ''
      this.serverListForm.agentDnsName = ''
      this.serverListForm.agentPort = '10050'
      this.serverListForm.proxyMonitor = ''
      this.serverListForm.enableMonitor = true
      this.serverListForm.subtypeId = ''
      this.serverListForm.groupId = []
      this.serverListForm.remark = ''
      this.serverListForm.label = ''
      this.mssqlMacroInstance = 'MSSQLSERVER'
      this.mssqlMacroOdbc = ''
      this.mssqlMacroPassword = ''
      this.mssqlMacroUsername = ''
      this.oracleMacroIp = ''
      this.oracleMacroAsm = ''
      this.oracleMacroDbname = 'orcl'
      this.oracleMacroPassword = ''
      this.oracleMacroUsername = ''
      this.jmxType = '1'
      this.jmxIp = ''
      this.jmxDnsName = ''
      this.jmxPort = '12345'
      this.jmxMacro = ''
      this.snmpType = '1'
      this.snmpIp = ''
      this.snmpDnsName = ''
      this.snmpPort = '161'
      this.snmpMacro = ''
      this.vmMacroCpuFrequency = '2666000000'
      this.vmMacroPassword = ''
      this.vmMacroSdkLink = 'https://'
      this.vmMacroUsername = ''
      this.serverListForm.assetsId = ''
    },
    backfrom () {
      this.$router.go(-1) // 返回上一层
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
  justify-content: flex-end !important;
}
.queryCenter {
  text-align: center;
  width: 100%;
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
.el-select {
  width: 100%;
}
.fromadd {
  width: 60%;
}
.fromadd .el-form-item {
  text-align: center;
}
.toolbar > div:last-child {
  justify-content: space-around;
}
/deep/ .el-form-item-radio {
  text-align: left !important;
}
.spanwidth {
  width: 12%;
  background-color: #eee;
  border: 1px solid #e0e0e0;
  height: 40px;
}
.inputwidth {
  width: 88%;
  float: right;
}
/deep/.inputcolor input {
  background-color: rgb(232, 240, 254) !important;
}
.cascadercss {
  min-width: 843.594px;
}
</style>
