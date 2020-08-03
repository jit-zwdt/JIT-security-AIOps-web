<template>
  <div>
    <template>
      <div class="card dark-main-background">
        <div
            class="title-bar card-header dark-main-background dark-white-color"
            style="margin-top:-10px !important;height:40px"
        >
          <div class="queryleft">
            <p class="title-bar-description" style>
              <span>添加</span>
            </p>
          </div>
          <div class="queryright" style="margin-top:-5px !important;height:40px">
            <el-button @click="backfrom()" size="mini">返回</el-button>
          </div>
        </div>
      </div>
    </template>
    <template>
      <el-tabs type="border-card" style="margin-top:5px">
        <el-tab-pane label="告警类型">
          <div class="queryCenter">
            <el-form
                :model="mediaTypeForm"
                ref="mediaTypeForm"
                class="edit-forms fromadd"
                label-position="right"
                label-width="150px"
                :rules="mediaTypeFormRules"
            >
              <el-form-item label="MediaTypeID" prop="mediatypeid" v-if="show">
                <el-input v-model="mediaTypeForm.triggerid" clearable></el-input>
              </el-form-item>
              <el-form-item label="名称" prop="name">
                <el-input v-model="mediaTypeForm.name" clearable></el-input>
              </el-form-item>
              <el-form-item label="类型" prop="type">
                <el-select
                    v-model="mediaTypeForm.type"
                    placeholder="请选择"
                    @change="changeType"
                    class="formqueryleft"
                    v-bind:disabled="disabledType"
                >
                  <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <!-- email -->
              <el-form-item label="SMTP服务器" prop="smtpServer" v-if="showSMTP">
                <el-input v-model="mediaTypeForm.smtpServer" clearable></el-input>
              </el-form-item>
              <el-form-item label="SMTP服务器端口" prop="smtpPort" v-if="showSMTP">
                <el-input v-model="mediaTypeForm.smtpPort" clearable></el-input>
              </el-form-item>
              <el-form-item label="SMTP HELO" prop="smtpHelo" v-if="showSMTP">
                <el-input v-model="mediaTypeForm.smtpHelo" clearable></el-input>
              </el-form-item>
              <el-form-item label="SMTP邮件地址" prop="smtpEmail" v-if="showSMTP">
                <el-input v-model="mediaTypeForm.smtpEmail" clearable></el-input>
              </el-form-item>
              <el-form-item label="安全链接" prop="smtpSecurity" v-if="showSMTP">
                <el-radio-group
                    v-model="mediaTypeForm.smtpSecurity"
                    size="small"
                    class="formqueryleft"
                    @change="changeSmtpSecurity"
                >
                  <el-radio-button label=0>无</el-radio-button>
                  <el-radio-button label=1>STARTTLS(纯文本通信协议扩展)</el-radio-button>
                  <el-radio-button label=2>SSL/TLS</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                  label="SSL验证对端"
                  prop="smtpVerifyPeer"
                  v-if="mediaTypeForm.smtpSecurity != 0 && showSMTP"
              >
                <el-checkbox v-model="mediaTypeForm.smtpVerifyPeer" class="formqueryleft"></el-checkbox>
              </el-form-item>
              <el-form-item
                  label="SSL验证主机"
                  prop="smtpVerifyHost"
                  v-if="mediaTypeForm.smtpSecurity != 0 && showSMTP"
              >
                <el-checkbox v-model="mediaTypeForm.smtpVerifyHost" class="formqueryleft"></el-checkbox>
              </el-form-item>

              <el-form-item label="认证" prop="smtpAuthentication" v-if="showSMTP">
                <el-radio-group
                    v-model="mediaTypeForm.smtpAuthentication"
                    size="small"
                    class="formqueryleft"
                >
                  <el-radio-button label=0>无</el-radio-button>
                  <el-radio-button label=1>用户名和密码</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                  label="用户名称"
                  prop="username"
                  v-if="mediaTypeForm.smtpAuthentication === '1'"
              >
                <el-input v-model="mediaTypeForm.username" clearable></el-input>
              </el-form-item>
              <el-form-item
                  label="密码"
                  prop="passwd"
                  v-if="mediaTypeForm.smtpAuthentication === '1'"
              >
                <el-input v-model="mediaTypeForm.passwd" clearable></el-input>
              </el-form-item>

              <el-form-item label="Message format" prop="contentType" v-if="showSMTP">
                <el-radio-group
                    v-model="mediaTypeForm.contentType"
                    size="small"
                    class="formqueryleft"
                    @change="changeContentType"
                >
                  <el-radio-button label=1>HTML</el-radio-button>
                  <el-radio-button label=0>文本</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <!-- sms -->
              <el-form-item label="GSM 调制解调器" prop="gsmModem" v-if="showSMS">
                <el-input v-model="mediaTypeForm.gsmModem" clearable></el-input>
              </el-form-item>
              <!-- script -->
              <el-form-item label="脚本名称" prop="execPath" v-if="showScript">
                <el-input v-model="mediaTypeForm.execPath" clearable></el-input>
              </el-form-item>
              <el-form-item label="脚本参数" prop="execParams" v-if="showScript">
                <el-table
                    :data="mediaTypeForm.execParamsTable"
                    style="width: 100%"
                    min-height="40"
                    border
                    class="tablebox"
                >
                  <el-table-column prop="param" label="参数" style="width: auto;">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.param" clearable></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="50px">
                    <template slot-scope="scope">
                      <el-button @click="deleteRow(scope.$index)" type="text" size="small">移除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="queryleft" style="margin-left:10px">
                  <el-button @click="addRow()" type="text" size="small">添加</el-button>
                </div>
              </el-form-item>
              <!-- Webhook -->
              <el-form-item label="参数" prop="mediaTypeParams" v-if="showWebhook">
                <el-table
                    :data="mediaTypeForm.mediaTypeParamsTable"
                    style="width: 100%"
                    min-height="40"
                    border
                    class="tablebox"
                >
                  <el-table-column prop="name" label="名称" style="width: auto;">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.name" clearable></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="value" label="值" style="width: auto;">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.value" clearable></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="50px">
                    <template slot-scope="scope">
                      <el-button
                          @click="deleteMediaTypeParamRow(scope.$index)"
                          type="text"
                          size="small"
                      >移除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="queryleft" style="margin-left:10px">
                  <el-button @click="addMediaTypeParamRow()" type="text" size="small">添加</el-button>
                </div>
              </el-form-item>
              <el-form-item label="脚本" prop="script" v-if="showWebhook">
                <el-input
                    type="textarea"
                    v-model="mediaTypeForm.script"
                    clearable
                    :rows="5"
                    placeholder="return value"
                ></el-input>
              </el-form-item>
              <el-form-item label="超时" prop="timeout" v-if="showWebhook">
                <el-input v-model="mediaTypeForm.timeout" clearable></el-input>
              </el-form-item>
              <el-form-item label="Process tags" prop="processTags" v-if="showWebhook">
                <el-checkbox v-model="mediaTypeForm.processTags" class="formqueryleft"></el-checkbox>
              </el-form-item>
              <el-form-item
                  label="Include event menu entry"
                  prop="showEventMenu"
                  v-if="showWebhook"
              >
                <el-checkbox v-model="mediaTypeForm.showEventMenu" class="formqueryleft"></el-checkbox>
              </el-form-item>
              <el-form-item label="Menu entry name" prop="eventMenuName" v-if="showWebhook">
                <el-input
                    v-model="mediaTypeForm.eventMenuName"
                    clearable
                    :disabled="!mediaTypeForm.showEventMenu"
                ></el-input>
              </el-form-item>
              <el-form-item label="Menu entry URL" prop="eventMenuUrl" v-if="showWebhook">
                <el-input
                    v-model="mediaTypeForm.eventMenuUrl"
                    clearable
                    :disabled="!mediaTypeForm.showEventMenu"
                ></el-input>
              </el-form-item>

              <el-form-item label="描述" prop="description">
                <el-input type="textarea" v-model="mediaTypeForm.description" clearable></el-input>
              </el-form-item>
              <el-form-item label="已启用" prop="status">
                <el-checkbox v-model="mediaTypeForm.status" class="formqueryleft"></el-checkbox>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="选项">
          <div class="queryCenter">
            <el-form
                :model="optionForm"
                ref="optionForm"
                class="edit-forms fromadd"
                label-position="right"
                label-width="150px"
                :rules="optionFormRules"
            >
              <el-form-item label="并发会话" prop="maxsessions">
                <el-row>
                  <el-col :span="5">
                    <el-radio-group
                        v-model="optionForm.maxsessions"
                        size="small"
                        class="formqueryleft"
                        @change="changeMaxsessions"
                    >
                      <el-radio-button label="1">壹</el-radio-button>
                      <el-radio-button label="0">无限</el-radio-button>
                      <el-radio-button label="2">习惯</el-radio-button>
                    </el-radio-group>
                  </el-col>
                  <el-col :span="2">
                    <el-input
                        v-model="maxsessionsVal"
                        clearable
                        size="small"
                        v-if="optionForm.maxsessions === '2'"
                    ></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="尝试次数" prop="maxattempts">
                <el-input v-model="optionForm.maxattempts" clearable></el-input>
              </el-form-item>
              <el-form-item label="尝试间隔" prop="attemptInterval">
                <el-input v-model="optionForm.attemptInterval" clearable></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
    <template>
      <div class="card dark-main-background">
        <div
            class="title-bar card-header dark-main-background dark-white-color"
            style="margin-top:-10px !important;height:55px"
        >
          <div class="queryCenter" style="margin-top:-5px !important;height:40px">
            <el-button @click="update('mediaTypeForm','optionForm')" type="primary" size="medium"
                       v-if="this.mediatypeid !== '-1' ">更新
            </el-button>
            <el-button @click="submit('mediaTypeForm','optionForm')" type="primary" size="medium"
                       v-if="this.mediatypeid === '-1' ">添加
            </el-button>
            <el-button @click="backfrom()" size="medium">取消</el-button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { resetObject } from '@/utils/common'

export default {
  data () {
    return {
      mediatypeid: '',
      disabledType: false,
      show: false,
      showexpression: false,
      showSMTP: true,
      showSMS: false,
      showScript: false,
      showWebhook: false,
      isShow: false,
      mediaTypeForm: {
        name: '',
        type: 0,
        smtpServer: 'mail.example.com',
        smtpPort: '25',
        smtpHelo: 'example.com',
        smtpEmail: 'zabbix@example.com',
        smtpSecurity: 0,
        smtpAuthentication: 0,
        contentType: 1,
        gsmModem: '/dev/ttyS0',
        description: '',
        status: true,
        timeout: '30s',
        execParamsTable: [
          {
            param: ''
          }
        ],
        mediaTypeParamsTable: [
          {
            name: 'URL',
            value: ''
          },
          {
            name: 'To',
            value: '{ALERT.SENDTO}'
          },
          {
            name: 'Subject',
            value: '{ALERT.SUBJECT}'
          },
          {
            name: 'Message',
            value: '{ALERT.MESSAGE}'
          }
        ]
      },
      optionForm: {
        maxsessions: '1',
        maxattempts: '3',
        attemptInterval: '10s'
      },
      options: [{
        value: 0,
        label: '电子邮件'
      }, {
        value: 1,
        label: '脚本'
      }, {
        value: 2,
        label: '短信'
      }, {
        value: 4,
        label: 'Webhook'
      }
        // ,{  value: 3, label: 'Jabber' }
      ],
      mediaTypeFormRules: {
        name: [
          { required: true, message: '请输入名称' }
        ],
        smtpServer: [
          { required: true, message: '请输入SMTP服务器地址' }
        ],
        smtpHelo: [
          { required: true, message: '请输入SMTP HELO' }
        ],
        smtpEmail: [
          { required: true, message: '请输入SMTP邮箱地址' }
        ],
        gsmModem: [
          { required: true, message: '请输入GSM 调制解调器地址' }
        ],
        execPath: [
          { required: true, message: '请输入脚本名称' }
        ],
        script: [
          { required: true, message: '请编写脚本' }
        ] /* eventMenuName: [
          { required: true, message: '请输入Menu entry name' }
        ],
        eventMenuUrl: [
          { required: true, message: '请输入Menu entry URL' }
        ] */
      },
      optionFormRules: {
        maxattempts: [
          { required: true, message: '请输入尝试次数' }
        ],
        attemptInterval: [
          { required: true, message: '请输入尝试间隔' }
        ]
      },
      changeSmtpSecurity: {},
      changeContentType: {},
      changeMaxsessions: {},
      change: {},
      checkFrom: false
    }
  },
  created () {
    this.mediatypeid = this.$route.query.mediatypeid
  },
  mounted () {
    this.showInfo(this.mediatypeid)
  },
  methods: {
    reloadData () {
    },
    backfrom () {
      this.$router.go(-1) // 返回上一层
    },
    changeType (val) {
      this.showSMTP = false
      this.showSMS = false
      this.showScript = false
      this.showWebhook = false
      if (val === 0) { // email
        this.showSMTP = true
      } else if (val === 1) { // script
        this.showScript = true
      } else if (val === 2) { // SMS
        this.showSMS = true
      } else if (val === 3) { // Jabber

      } else if (val === 4) { // Webhook
        this.showWebhook = true
      }
    },
    deleteRow (index) {
      var th = this
      th.mediaTypeForm.execParamsTable.splice(index, 1)
    },
    addRow () {
      this.mediaTypeForm.execParamsTable.push({ parma: '' })
    },
    deleteMediaTypeParamRow (index) {
      var th = this
      th.mediaTypeForm.mediaTypeParamsTable.splice(index, 1)
    },
    addMediaTypeParamRow () {
      this.mediaTypeForm.mediaTypeParamsTable.push({ name: '', value: '' })
    },
    makeParam () {
      var type = this.mediaTypeForm.type
      const region = {
        name: this.mediaTypeForm.name,
        type: this.mediaTypeForm.type,
        description: this.mediaTypeForm.description,
        status: this.mediaTypeForm.status,
        maxattempts: this.optionForm.maxattempts,
        maxsessions: this.optionForm.maxsessions,
        attemptInterval: this.optionForm.attemptInterval
      }
      if (type === 0) { // email
        region.smtpServer = this.mediaTypeForm.smtpServer
        region.smtpPort = this.mediaTypeForm.smtpPort
        region.smtpHelo = this.mediaTypeForm.smtpHelo
        region.smtpEmail = this.mediaTypeForm.smtpEmail
        region.smtpSecurity = this.mediaTypeForm.smtpSecurity
        region.smtpVerifyPeer = this.mediaTypeForm.smtpVerifyPeer
        region.smtpVerifyHost = this.mediaTypeForm.smtpVerifyHost
        region.smtpAuthentication = this.mediaTypeForm.smtpAuthentication
        region.username = this.mediaTypeForm.username
        region.passwd = this.mediaTypeForm.passwd
        region.contentType = this.mediaTypeForm.contentType
      } else if (type === 1) { // script
        region.execPath = this.mediaTypeForm.execPath
        if (this.mediaTypeForm.execParamsTable.length > 0) {
          var tempParams = ''
          for (var i = 0; i < this.mediaTypeForm.execParamsTable.length; i++) {
            if (typeof (this.mediaTypeForm.execParamsTable[i].param) !== 'undefined' && this.mediaTypeForm.execParamsTable[i].param !== '') {
              tempParams = tempParams + this.mediaTypeForm.execParamsTable[i].param
            }
          }
          alert(tempParams)
          region.execParams = tempParams
        } else {
          region.execParams = ''
        }
      } else if (type === 2) { // SMS
      } else if (type === 3) { // Jabber

      } else if (type === 4) { // Webhook
      }
      return region
    },
    submit (formName, formName2) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs[formName2].validate((valid) => {
            if (valid) {
              const region = this.makeParam()
              this.axios.post('/mediaType/addMediaType', region).then((resp) => {
                if (resp.status === 200) {
                  var json = resp.data
                  if (json.code === 1) {
                    this.$message({
                      message: '添加成功',
                      type: 'success'
                    })
                    this.clearform()
                    this.$emit('success')
                    this.$router.push({ name: 'alertType' })
                  }
                } else {
                  this.$message({
                    message: '添加失败',
                    type: 'error'
                  })
                  this.clearform()
                  this.$emit('error')
                  this.$router.push({ name: 'alertType' })
                }
              })
            } else {
              return false
            }
          })
        } else {
          return false
        }
      })
    },
    update (formName, formName2) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs[formName2].validate((valid) => {
            if (valid) {
              const region = this.makeParam()
              this.axios.put('/mediaType/updateMediaType/' + this.mediatypeid, region).then((resp) => {
                if (resp.status === 200) {
                  var json = resp.data
                  if (json.code === 1) {
                    this.$message({
                      message: '修改成功',
                      type: 'success'
                    })
                    this.clearform()
                    this.$emit('success')
                    this.$router.push({ name: 'alertType' })
                  } else {
                    this.$message({
                      message: '修改失败',
                      type: 'error'
                    })
                    this.clearform()
                    this.$emit('error')
                    this.$router.push({ name: 'alertType' })
                  }
                }
              })
            } else {
              return false
            }
          })
        } else {
          return false
        }
      })
    },
    clearform () {
      resetObject(this.mediaTypeForm)
      resetObject(this.optionForm)
      this.$refs.mediaTypeForm.resetFields()
      this.$refs.optionForm.resetFields()
    },
    showInfo (mediatypeid) {
      if (mediatypeid != null && mediatypeid !== '') {
        this.axios.post('/mediaType/findByMediaTypeId/' + mediatypeid).then((resp) => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              var jsonData = json.data
              this.disabledType = true
              this.mediaTypeForm.name = jsonData.name
              this.mediaTypeForm.type = jsonData.type
              this.mediaTypeForm.smtpServer = jsonData.smtp_server
              this.mediaTypeForm.smtpPort = jsonData.smtp_port
              this.mediaTypeForm.smtpHelo = jsonData.smtp_helo
              this.mediaTypeForm.smtpEmail = jsonData.smtp_email
              this.mediaTypeForm.smtpSecurity = jsonData.smtp_security
              this.mediaTypeForm.smtpVerifyPeer = jsonData.smtp_verify_peer !== 0
              this.mediaTypeForm.smtpVerifyHost = jsonData.smtp_verify_host !== 0
              this.mediaTypeForm.smtpAuthentication = jsonData.smtp_authentication
              this.mediaTypeForm.username = jsonData.username
              this.mediaTypeForm.passwd = jsonData.passwd
              this.mediaTypeForm.contentType = jsonData.content_type
              this.mediaTypeForm.description = jsonData.description
              this.mediaTypeForm.status = jsonData.status !== 1
              this.optionForm.maxattempts = jsonData.maxattempts
              this.optionForm.maxsessions = jsonData.maxsessions
              this.optionForm.attemptInterval = jsonData.attempt_interval
            }
          } else {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
            this.$emit('error')
          }
        })
      }
    }
  },
  actions: {},
  components: {}
}
</script>
<style lang="scss" scoped>
  .queryleft {
    float: left;
  }

  .queryright {
    float: right;
  }

  .title-bar-description {
    margin-bottom: 0px;
    margin-top: -5px;
  }

  /deep/ .el-input__prefix {
    margin-top: -3px;
  }

  .dark-main-background {
    margin-top: 10px;
  }

  .card-header {
    background-color: #fff;
  }

  /deep/ .el-tabs__nav {
    width: 100%;
  }

  .fromadd {
    width: 60%;
  }

  .fromadd .el-form-item {
    text-align: center;
  }

  .queryCenter {
    text-align: center;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .formqueryleft {
    float: left;
  }
</style>
