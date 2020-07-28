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
                v-if="mediaTypeForm.smtpSecurity != '0'"
              >
                <el-checkbox v-model="mediaTypeForm.smtpVerifyPeer" class="formqueryleft"></el-checkbox>
              </el-form-item>
              <el-form-item
                label="SSL验证主机"
                prop="smtpVerifyHost"
                v-if="mediaTypeForm.smtpSecurity != '0'"
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
                <template>
                  <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column prop="execParam" label="参数" width="200"></el-table-column>
                    <el-table-column fixed="right" label="操作" width="120">
                      <template slot-scope="scope">
                        <el-button
                          @click.native.prevent="deleteRow(scope.$index, tableData)"
                          type="text"
                          size="small"
                        >移除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
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
        <el-tab-pane label="选项">4444</el-tab-pane>
      </el-tabs>
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
        status: true
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
        value: '3',
        label: 'Jabber'
      }, {
        value: '4',
        label: 'Webhook'
      }]
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
      if (val === '0') { // email
        this.showSMTP = true
      } else if (val === '1') { // script
        this.showScript = true
      } else if (val === '2') { // SMS
        this.showSMS = true
      } else if (val === '3') { // Jabber

      } else if (val === '4') { // Webhook

      }
    },
    changeRecoveryMode (value) {
      if (value === '1') {
        this.showexpression = true
      } else {
        this.showexpression = false
      }
    },
    changeCorrelationMode (value) {
      if (value === '1') {
        this.showtag = true
      } else {
        this.showtag = false
      }
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
