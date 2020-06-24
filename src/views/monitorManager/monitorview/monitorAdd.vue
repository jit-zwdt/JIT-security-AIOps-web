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
        >
          <el-form-item label="对象名称" prop="objectName">
            <el-input v-model="serverListForm.objectName" clearable></el-input>
          </el-form-item>
          <el-form-item label="业务名称" prop="businessName">
            <el-input v-model="serverListForm.businessName" clearable></el-input>
          </el-form-item>
          <el-form-item label="AGENT选用类型" prop="agentType" class="el-form-item-radio">
            <el-radio v-model="serverListForm.agentType" label="1">使用IP</el-radio>
            <el-radio v-model="serverListForm.agentType" label="2">使用DNS</el-radio>
          </el-form-item>
          <el-form-item label="IP" prop="agentIp">
            <el-input v-model="serverListForm.agentIp" clearable></el-input>
          </el-form-item>
          <el-form-item label="DNS名称" prop="agentDnsName">
            <el-input v-model="serverListForm.agentDnsName" clearable></el-input>
          </el-form-item>
          <el-form-item label="端口" prop="agentPort">
            <el-input v-model="serverListForm.agentPort" clearable></el-input>
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
          <el-form-item label="(主)类型" prop="typeId" v-if="show">
            <el-input v-model="serverListForm.typeId" clearable></el-input>
          </el-form-item>
          <el-form-item label="(主)类型" prop="subtypeId" v-if="show">
            <el-input v-model="serverListForm.subtypeId" clearable></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="subtypeIds">
            <el-select v-model="serverListForm.subtypeIds" placeholder="请选择">
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
          <el-form-item label="备注" prop="remark">
            <el-input v-model="serverListForm.remark" clearable></el-input>
          </el-form-item>
          <el-form-item label="标签" prop="label">
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
        groupId: [],
        remark: '',
        label: ''
      },
      tableDataclear: [],
      setTimeoutster: '',
      proxyMonitorOptions: [
        {
          value: '0',
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
      ]
    }
  },
  created () {
    this.showInfo()
  },
  methods: {
    reloadData () {
      this.showInfo()
    },
    showInfo (str) {
      this.serverListForm.typeId = this.$route.query.templateId
      this.serverListForm.subtypeId = this.$route.query.templateSubTypeId
      const _this = this
      this.setTimeoutster = window.setTimeout(() => { _this.showInfoTimeout() }, 300)
    },
    showInfoTimeout (str) {
      const param = new URLSearchParams()
      param.append('ids', this.serverListForm.subtypeId)
      this.axios.post('/monitorType/getJsonTypes', param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          console.log(json.data)
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
    submitOrUpdate (formName) {
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
            this.$emit('success')
            // this.$router.push({ path: '/assetsManager/assetsList' })
          }
        } else {
          this.$message({
            message: '添加失败',
            type: 'error'
          })
          this.clearform()
          this.$emit('error')
        }
      })
    },
    makeParam () {
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
        typeId: this.serverListForm.typeId
      }
      return region
    },
    showClear () {
      this.assetNameTop = ''
      this.assetRegisterDateStartTop = ''
      this.assetRegisterDateEndTop = ''
      this.titleType = ''
    },
    showAssetsAdd () {
      alert(1)
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
</style>
