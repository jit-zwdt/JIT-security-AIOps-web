<template>
  <!--
    :title="objectName+'&#12288;&#12288;&#12288;&#12288;'+templateTypeName"
    :title="objectName === 'undefined' ? '' : objectName + templateTypeName === 'undefined' ? '' : templateTypeName"
   -->
  <el-drawer
    :title="(objectName === undefined ? '' : objectName) + (templateTypeName === undefined ? '' : templateTypeName)"
    :visible.sync="drawer_"
    :direction="direction"
    :before-close="handleClose"
    size='40%'
    @open="openDrawer"
    :wrapperClosable="false"
    :destroy-on-close="true">
    <!--
      @open="openDrawer"
      @closed="closedDrawer"
     -->
    <div>
      <ToolBar>
        <div class="queryCenter" ref="queryCenter">
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
            <el-form-item label="可见的名称" prop="businessName">
              <el-input
                v-model="serverListForm.businessName"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="AGENT选用类型"
              prop="agentType"
              class="el-form-item-radio"
              v-if="agentShow"
            >
              <el-radio v-model="serverListForm.agentType" label="1"
                >使用IP</el-radio
              >
              <el-radio v-model="serverListForm.agentType" label="2"
                >使用DNS</el-radio
              >
            </el-form-item>
            <el-form-item label="对应资产" prop="assetsId">
              <el-select
                v-model="serverListForm.assetsId"
                placeholder="请选择"
                @change="changeAssetsId"
                filterable
                style="width: 100%"
              >
                <el-option
                  v-for="item in assetOptions"
                  :key="item[0]"
                  :label="item[1] + '(' + item[2] + ')'"
                  :value="item[0]"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="IP" prop="agentIp" v-if="agentShow">
              <el-input
                v-model="serverListForm.agentIp"
                clearable
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="DNS名称" prop="agentDnsName" v-if="agentShow">
              <el-input
                v-model="serverListForm.agentDnsName"
                clearable
                placeholder="域名"
              ></el-input>
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
                <el-input
                  v-model="serverListForm.mssqlMacroPassword"
                  clearable
                  show-password
                >
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
                <el-input v-model="serverListForm.oracleMacroPort" clearable>
                  <template slot="prepend">端口</template>
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
                <el-input
                  v-model="serverListForm.oracleMacroPassword"
                  clearable
                  show-password
                >
                  <template slot="prepend">密码</template>
                </el-input>
              </div>
              <div>
                <el-input v-model="serverListForm.oracleMacroAsm" clearable>
                  <template slot="prepend">ASM卷名</template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item
              label="JMX选用类型"
              prop="jmxType"
              class="el-form-item-radio"
              v-if="jmxShow"
            >
              <el-radio v-model="serverListForm.jmxType" label="1"
                >使用IP</el-radio
              >
              <el-radio v-model="serverListForm.jmxType" label="2"
                >使用DNS</el-radio
              >
            </el-form-item>
            <el-form-item label="JMXIP" prop="jmxIp" v-if="jmxShow">
              <el-input
                v-model="serverListForm.jmxIp"
                clearable
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="DNS名称" prop="jmxDnsName" v-if="jmxShow">
              <el-input
                v-model="serverListForm.jmxDnsName"
                clearable
                placeholder="域名"
              ></el-input>
            </el-form-item>
            <el-form-item label="JMX 端口" prop="jmxPort" v-if="jmxShow">
              <el-input v-model="serverListForm.jmxPort" clearable></el-input>
            </el-form-item>
            <el-form-item label="主机宏" prop="jmxMacro" v-if="jmxShow">
              <el-input v-model="serverListForm.jmxMacro" clearable>
                <template slot="prepend">JMX路径</template>
              </el-input>
            </el-form-item>
            <el-form-item
              label="SNMP选用类型"
              prop="snmpType"
              class="el-form-item-radio"
              v-if="snmpShow"
            >
              <el-radio v-model="serverListForm.snmpType" label="1"
                >使用IP</el-radio
              >
              <el-radio v-model="serverListForm.snmpType" label="2"
                >使用DNS</el-radio
              >
            </el-form-item>
            <el-form-item label="SNMP IP" prop="snmpIp" v-if="snmpShow">
              <el-input
                v-model="serverListForm.snmpIp"
                clearable
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="DNS名称" prop="snmpDnsName" v-if="snmpShow">
              <el-input
                v-model="serverListForm.snmpDnsName"
                clearable
                placeholder="域名"
              ></el-input>
            </el-form-item>
            <el-form-item label="SNMP 端口" prop="snmpPort" v-if="snmpShow">
              <el-input v-model="serverListForm.snmpPort" clearable></el-input>
            </el-form-item>
            <el-form-item label="主机宏" prop="snmpMacro" v-if="snmpShow">
              <el-input v-model="serverListForm.snmpMacro" clearable>
                <template slot="prepend">SNMP团体名</template>
              </el-input>
            </el-form-item>
            <el-form-item
              label="IPMI选用类型"
              prop="ipmiType"
              class="el-form-item-radio"
              v-if="ipmiShow"
            >
              <el-radio v-model="serverListForm.ipmiType" label="1"
                >使用IP</el-radio
              >
              <el-radio v-model="serverListForm.ipmiType" label="2"
                >使用DNS</el-radio
              >
            </el-form-item>
            <el-form-item label="IPMI IP" prop="ipmiIp" v-if="ipmiShow">
              <el-input
                v-model="serverListForm.ipmiIp"
                clearable
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="DNS名称" prop="ipmiDnsName" v-if="ipmiShow">
              <el-input
                v-model="serverListForm.ipmiDnsName"
                clearable
                placeholder="域名"
              ></el-input>
            </el-form-item>
            <el-form-item label="IPMI 端口" prop="ipmiPort" v-if="ipmiShow">
              <el-input v-model="serverListForm.ipmiPort" clearable></el-input>
            </el-form-item>
            <el-form-item label="主机宏" prop="ipmiMacro" v-if="ipmiShow">
              <el-input v-model="serverListForm.ipmiMacro" clearable>
                <template slot="prepend">IPMI</template>
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
                <el-input
                  v-model="serverListForm.vmMacroPassword"
                  clearable
                  show-password
                >
                  <template slot="prepend">密码</template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="通过Proxy监控" prop="proxyMonitor">
              <el-select
                v-model="serverListForm.proxyMonitor"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in proxyMonitorOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label prop="enableMonitor" class="el-form-item-radio">
              <el-checkbox
                v-model="serverListForm.enableMonitor"
                :formatter="formatEnableMonitor(serverListForm.enableMonitor)"
                >启动监控</el-checkbox
              >
            </el-form-item>
            <el-form-item label="模板表ID" prop="templatesId" v-if="show">
              <el-input v-model="serverListForm.templatesId" clearable></el-input>
            </el-form-item>
            <el-form-item label="(主)类型" prop="typeId" v-if="show">
              <el-input v-model="serverListForm.typeId" clearable></el-input>
            </el-form-item>
            <el-form-item label="(子)类型" prop="subtypeIds" v-if="show">
              <el-input v-model="serverListForm.subtypeIds" clearable></el-input>
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
                  :key="template.groupid"
                  :label="template.name"
                  :value="template.groupid"
                ></el-option>
              </el-select>
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
          <el-button @click="handleClose()">返回</el-button>
          <el-button type="primary" @click="submitOrUpdate('serverListForm')" id="button-submit"
            >确认</el-button
          >
        </div>
      </ToolBar>
    </div>
  </el-drawer>
</template>
<script>
export default {
  props: {
    id: String,
    drawer: Boolean,
    templateId: String,
    templateTypeId: String,
    templateSubTypeId: String,
    templateTypeName: String,
    groupIds: String,
    objectName: String
  },
  computed: {
    drawer_: {
      get () {
        return this.drawer
      },
      set (v) {
        this.$emit('changeDrawer', v)
      }
    }
  },
  data () {
    // 主机名称不重复
    var validationObjectName = (rule, value, callback) => {
      this.axios.get(this.$api.monitorManager.checkObjectName, { params: { objectName: value, odlObjectName: this.odlObjectName } }).then(resp => {
        var json = resp.data
        if (json.code === 1) {
          if (json.data === false) {
            return callback(new Error('这个主机名称已经存在了'))
          } else {
            return callback()
          }
        }
      })
    }
    // 可见的名称不可重复'',businessName: '',
    var validationBusinessName = (rule, value, callback) => {
      this.axios.get(this.$api.monitorManager.checkBusinessName, { params: { businessName: value, odlBusinessName: this.odlBusinessName } }).then(resp => {
        var json = resp.data
        if (json.code === 1) {
          if (json.data === false) {
            return callback(new Error('这个可见的名称已经存在了'))
          } else {
            return callback()
          }
        }
      })
    }
    return {
      direction: 'rtl',
      show: false,
      sqlserverShow: false,
      oracleShow: false,
      jmxShow: false,
      snmpShow: false,
      agentShow: true,
      vmShow: false,
      ipmiShow: false,
      serverListForm: {
        objectName: '',
        businessName: '',
        agentType: '',
        agentIp: '',
        agentDnsName: '',
        agentPort: '',
        proxyMonitor: '',
        enableMonitor: true,
        subtypeId: '',
        subtypeIds: '',
        templatesId: '',
        typeId: '',
        groupId: [],
        remark: '',
        label: '',
        mssqlMacroInstance: '',
        mssqlMacroOdbc: '',
        mssqlMacroPassword: '',
        mssqlMacroUsername: '',
        oracleMacroIp: '',
        oracleMacroPort: '',
        oracleMacroAsm: '',
        oracleMacroDbname: '',
        oracleMacroPassword: '',
        oracleMacroUsername: '',
        jmxType: '',
        jmxIp: '',
        jmxDnsName: '',
        jmxPort: '',
        jmxMacro: '',
        snmpType: '',
        snmpIp: '',
        snmpDnsName: '',
        snmpPort: '',
        snmpMacro: '',
        ipmiType: '',
        ipmiIp: '',
        ipmiDnsName: '',
        ipmiPort: '',
        ipmiMacro: '',
        vmMacroCpuFrequency: '',
        vmMacroPassword: '',
        vmMacroSdkLink: '',
        vmMacroUsername: '',
        assetsId: '',
        hostId: ''
      },
      tableDataclear: [],
      setTimeoutster: '',
      odlObjectName: '',
      odlBusinessName: '',
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
          groupid: '',
          name: ''
        }
      ],
      assetOptions: [],
      assetProps: {
        value: 'id',
        label: 'name',
        children: 'items'
      },
      editFormRules: {
        objectName: [
          {
            required: true, // 默认是否显示校验
            message: '请输入对象名称',
            trigger: 'blur'
          },
          { pattern: /^(\w){1,100}$/, message: '只能输入字母、数字、下划线' },
          { validator: validationObjectName, trigger: 'blur' }
        ],
        businessName: [
          {
            required: true,
            message: '请输入可见的名称',
            trigger: 'blur'
          },
          { validator: validationBusinessName, trigger: 'blur' }
        ],
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
        agentIp: [
          {
            required: true,
            message: '请输入IP',
            trigger: 'blur'
          },
          { pattern: /((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/, message: '请输入正确IP' }
        ],
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
        assetsId: [{
          required: true,
          message: '请选择对应硬件资产',
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
        }],
        ipmiIp: [{
          required: true,
          message: '请输入IP',
          trigger: 'blur'
        }],
        ipmiDnsName: [{
          required: true,
          message: '请输入DNS',
          trigger: 'blur'
        }],
        ipmiPort: [{
          required: true,
          message: '请输入端口',
          trigger: 'blur'
        }]
      }
    }
  },
  created () {
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
      this.groupIdDataInfo()
      var id = this.id
      if (id !== null && id !== '') {
        this.showform(id)
      }
      // 设置滚动元素在最上
      this.$refs.queryCenter.scrollTop = 0
    },
    showform (id) {
      this.axios.post(this.$api.monitorManager.getHost + id).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.serverListForm = json.data
            var groupIds = this.groupIds
            groupIds = groupIds.split(',')
            this.serverListForm.groupId = groupIds
            this.odlObjectName = json.data.objectName
            this.odlBusinessName = json.data.businessName
          } else {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
            this.$router.push({ name: 'monitorList' })
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
          this.$router.push({ name: 'monitorList' })
        }
      })
    },
    groupIdDataInfo () {
      this.axios.post(this.$api.monitorManager.getZabbixHostGroup).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.groupIdData = json.data
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    getSubtypeIdOptions () {
      const param = new URLSearchParams()
      param.append('ids', this.serverListForm.subtypeIds)
      this.axios.post(this.$api.monitorManager.getJsonTypes, param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
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
      this.axios.post(this.$api.monitorManager.getConditionInfo).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
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
    formatEnableMonitor (str) {
      if (str === '1') {
        this.serverListForm.enableMonitor = true
      } else if (str === '0') {
        this.serverListForm.enableMonitor = false
      }
      return ''
    },
    validateIPAddress (value) {
      if (value && !(/((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/).test(value)) {
        // callback(new Error('IP地址不规范'))
      }
    },
    submitOrUpdate (formName) {
      this.checkform()
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var id = this.id
          if (id !== null && id !== '') {
            this.update(id)
          } else {
            this.submit()
          }
        } else {
          return false
        }
      })
    },
    submit () {
      const region = this.makeParam()
      this.axios.post(this.$api.monitorManager.addHost, region).then((resp) => {
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
    update (id) {
      const region = this.makeParam()
      this.axios.put(this.$api.monitorManager.updateHost + id, region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.clearform()
            this.$emit('changeDrawer', false)
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
      })
    },
    checkform () {
      var templateId = this.templateId
      var templateSubTypeId = this.templateSubTypeId
      if (templateId === '12' || templateId === '13' || templateId === '14' || templateId === '16' || templateId === '17') {
        if (this.serverListForm.snmpType === '1') {
          this.editFormRules.snmpIp[0].required = true
          this.editFormRules.snmpDnsName[0].required = false
        } else {
          this.editFormRules.snmpIp[0].required = false
          this.editFormRules.snmpDnsName[0].required = true
        }
        if (templateId === '16' || templateId === '17') {
          if (this.serverListForm.ipmiType === '1') {
            this.editFormRules.ipmiIp[0].required = true
            this.editFormRules.ipmiDnsName[0].required = false
          } else {
            this.editFormRules.ipmiIp[0].required = false
            this.editFormRules.ipmiDnsName[0].required = true
          }
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
      var assetsId = this.serverListForm.assetsId
      if (assetsId != null && (assetsId).toString().split(',').length > 1) {
        assetsId = (assetsId).toString().split(',')[1]
      }
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
        oracleMacroPort: this.serverListForm.oracleMacroPort,
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
        ipmiType: this.serverListForm.ipmiType,
        ipmiIp: this.serverListForm.ipmiIp,
        ipmiDnsName: this.serverListForm.ipmiDnsName,
        ipmiPort: this.serverListForm.ipmiPort,
        ipmiMacro: this.serverListForm.ipmiMacro,
        vmMacroCpuFrequency: this.serverListForm.vmMacroCpuFrequency,
        vmMacroPassword: this.serverListForm.vmMacroPassword,
        vmMacroSdkLink: this.serverListForm.vmMacroSdkLink,
        vmMacroUsername: this.serverListForm.vmMacroUsername,
        assetsId: assetsId,
        hostId: this.serverListForm.hostId
      }
      return region
    },
    clearform () {
      this.show = false
      this.sqlserverShow = false
      this.oracleShow = false
      this.jmxShow = false
      this.snmpShow = false
      this.agentShow = true
      this.vmShow = false
      this.ipmiShow = false
      this.$refs.serverListForm.resetFields()
      this.oldObjectName = ''
      this.oldBusinessName = ''
    },
    backfrom () {
      const referrer = JSON.parse(sessionStorage.getItem('referrer'))
      const referrerBack = this.$routerHistory.dataBack(referrer)
      this.$router.push(referrerBack)
    },
    changeAssetsId () {
      const assetOptions = this.assetOptions
      for (let i = 0; i < assetOptions.length; i++) {
        if (assetOptions[i][0] === this.serverListForm.assetsId) {
          this.serverListForm.agentIp = this.serverListForm.jmxIp = this.serverListForm.snmpIp = this.serverListForm.ipmiIp = assetOptions[i][3]
          break
        }
      }
    },
    handleClose () {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.clearform()
          this.$emit('changeDrawer', false)
        })
        .catch(_ => {
        })
    },
    openDrawer () {
      // this.$el.scrollTop = 0
      this.serverListForm.templatesId = this.templateId
      var templateId = this.templateId
      this.serverListForm.typeId = this.templateTypeId
      this.serverListForm.subtypeIds = this.templateSubTypeId
      var templateSubTypeId = this.templateSubTypeId
      if (templateSubTypeId === '10') {
        this.sqlserverShow = true
        this.serverListForm.mssqlMacroInstance = 'MSSQLSERVER'
      } else if (templateSubTypeId === '12') {
        this.oracleShow = true
        this.serverListForm.oracleMacroDbname = 'orcl'
      } else if (templateSubTypeId === '13') {
        this.serverListForm.jmxMacro = 'path'
        this.jmxShow = true
        this.serverListForm.jmxType = '1'
        this.serverListForm.jmxPort = '12345'
        this.editFormRules.jmxDnsName[0].required = false
      } else if (templateSubTypeId === '28') {
        this.serverListForm.jmxMacro = 'path'
        this.jmxShow = true
        this.serverListForm.jmxType = '1'
        this.serverListForm.jmxPort = '12345'
        this.editFormRules.jmxDnsName[0].required = false
      } else if (templateSubTypeId === '14') {
        this.serverListForm.jmxMacro = 'context'
        this.jmxShow = true
      } else if (templateSubTypeId === '25') {
        this.vmShow = true
        this.serverListForm.vmMacroCpuFrequency = '2666000000'
        this.serverListForm.vmMacroSdkLink = 'https://'
      }
      if (templateId === '12' || templateId === '13' || templateId === '14' || templateId === '16' || templateId === '17') {
        this.agentShow = false
        this.snmpShow = true
        this.serverListForm.snmpType = '1'
        this.serverListForm.snmpPort = '161'
        this.editFormRules.snmpDnsName[0].required = false
        if (templateId === '16' || templateId === '17') {
          this.ipmiShow = true
          this.serverListForm.ipmiType = '1'
          this.serverListForm.ipmiPort = '623'
          this.editFormRules.ipmiDnsName[0].required = false
        }
      } else {
        this.editFormRules.agentDnsName[0].required = false
        this.serverListForm.agentType = '1'
        this.serverListForm.agentPort = '10050'
      }
      this.showInfo()
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
  justify-content: center !important;
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
  min-width: 100%;
}
/*1.显示滚动条：当内容超出容器的时候，可以拖动：*/
.queryCenter {
  overflow-y: auto;
  max-height: calc(100vh - 162px);
  /* overflow-x: auto; */
}
/*2.隐藏滚动条，太丑了*/
.queryCenter{
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.queryCenter ::-webkit-scrollbar{
  display: none;
}
/deep/.el-drawer__header {
  margin-bottom: 20px;
}
#button-submit {
  margin-left: 170px;
}
</style>
