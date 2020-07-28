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
              :rules="editFormRules"
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
                  <el-radio-button label="0">无</el-radio-button>
                  <el-radio-button label="1">STARTTLS(纯文本通信协议扩展)</el-radio-button>
                  <el-radio-button label="2">SSL/TLS</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item
                label="SSL验证对端"
                prop="smtpVerifyPeer"
                v-if="mediaTypeForm.smtpSecurity != '0' && showSMTP"
              >
                <el-checkbox v-model="mediaTypeForm.smtpVerifyPeer" class="formqueryleft"></el-checkbox>
              </el-form-item>
              <el-form-item
                label="SSL验证主机"
                prop="smtpVerifyHost"
                v-if="mediaTypeForm.smtpSecurity != '0' && showSMTP"
              >
                <el-checkbox v-model="mediaTypeForm.smtpVerifyHost" class="formqueryleft"></el-checkbox>
              </el-form-item>

              <el-form-item label="认证" prop="smtpAuthentication" v-if="showSMTP">
                <el-radio-group
                  v-model="mediaTypeForm.smtpAuthentication"
                  size="small"
                  class="formqueryleft"
                >
                  <el-radio-button label="0">无</el-radio-button>
                  <el-radio-button label="1">用户名和密码</el-radio-button>
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
                  <el-radio-button label="0">文本</el-radio-button>
                  <el-radio-button label="1">HTML</el-radio-button>
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
                      >移除</el-button>
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
            <el-button @click="addfrom()" type="primary" size="medium">添加</el-button>
            <el-button @click="backfrom()" size="medium">取消</el-button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false,
      showexpression: false,
      showSMTP: true,
      isShow: false,
      mediaTypeForm: {
        type: '0',
        smtpServer: 'mail.example.com',
        smtpPort: '25',
        smtpHelo: 'example.com',
        smtpEmail: 'zabbix@example.com',
        smtpSecurity: '0',
        smtpAuthentication: '0',
        contentType: '0',
        gsmModem: '/dev/ttyS0',
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
        value: '0',
        label: '电子邮件'
      }, {
        value: '1',
        label: '脚本'
      }, {
        value: '2',
        label: '短信'
      }, {
        value: '4',
        label: 'Webhook'
      }
        // ,{  value: '3', label: 'Jabber' }
      ]
    }
  },
  created () {
    // this.showInfo()
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
      if (val === '0') { // email
        this.showSMTP = true
      } else if (val === '1') { // script
        this.showScript = true
      } else if (val === '2') { // SMS
        this.showSMS = true
      } else if (val === '3') { // Jabber

      } else if (val === '4') { // Webhook
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
  float: right;
}
.title-bar-description {
  margin-bottom: 0px;
  margin-top: -5px;
}
/deep/.el-input__prefix {
  margin-top: -3px;
}
.dark-main-background {
  margin-top: 10px;
}
.card-header {
  background-color: #fff;
}
/deep/.el-tabs__nav {
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
