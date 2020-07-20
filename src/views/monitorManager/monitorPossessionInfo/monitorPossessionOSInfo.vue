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
              <span>{{this.$route.query.hostName}}\{{this.serverForm.agentIp}}</span>
            </p>
          </div>
          <div class="queryright" style="margin-top:-5px !important;height:40px">
            <el-button @click="backfrom()" size="mini">返回</el-button>
          </div>
        </div>
        <div class="tempList card-body">
          <div>
            <table class="dark-main-background" style="width:100%;margin-top:-5px">
              <tr style="height:40px">
                <th class="darkmainborderth">名称</th>
                <td class="darkmainbordertd">{{this.$route.query.hostName}}</td>
                <th class="darkmainborderth">监控状态</th>
                <td class="darkmainbordertd">
                  <span
                    class="label label-danger"
                    data-toggle="tooltip"
                    ata-placement="bottom"
                    v-bind:class="{changeColor:spanChangeColor,redchangeColor:spanredChangeColor}"
                    :title="makeMonitorTypeTitle()"
                  >{{this.monitorTypeValue}}</span>
                </td>
                <th class="darkmainborderth">ip地址</th>
                <td class="darkmainbordertd">{{this.serverForm.agentIp}}</td>
              </tr>
              <tr style="height:40px">
                <th class="darkmainborderth">版本</th>
                <td class="darkmainbordertd" colspan="5">{{this.tomcatVersion}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </template>
    <el-tabs type="border-card" style="margin-top:5px">
      <el-tab-pane label="概况">
        <template>
          <div class="card dark-main-background">
            <div
              class="title-bar card-header dark-main-background dark-white-color"
              style="height:40px"
            >
              <div class="queryleft">
                <p class="title-bar-description" style>
                  <span>CPU</span>
                </p>
              </div>
              <div class="queryright" style="margin-top:-5px !important;height:40px">
                <el-button
                  style="float: right; padding: 0px; margin-left: 5px;"
                  type="text"
                  @click="refreshCard('3')"
                >
                  <i
                    class="el-icon-refresh"
                    style="font-size: 18px;color: #979899;font-weight: 400;"
                  ></i>
                </el-button>
              </div>
            </div>
            <div class="tempList card-body">
              <div>
                <!-- <table class="dark-main-background" style="width:100%;margin-top:-5px">
                  <tr style="height:40px">
                    <th class="darkmainborderth">名称</th>
                    <td class="darkmainbordertd">{{this.$route.query.hostName}}</td>
                    <th class="darkmainborderth">监控状态</th>
                    <td class="darkmainbordertd">
                      <span
                        class="label label-danger"
                        data-toggle="tooltip"
                        ata-placement="bottom"
                        v-bind:class="{changeColor:spanChangeColor,redchangeColor:spanredChangeColor}"
                        :title="makeMonitorTypeTitle()"
                      >{{this.monitorTypeValue}}</span>
                    </td>
                    <th class="darkmainborderth">ip地址</th>
                    <td class="darkmainbordertd">{{this.serverForm.jmxIp}}</td>
                  </tr>
                  <tr style="height:40px">
                    <th class="darkmainborderth">版本</th>
                    <td class="darkmainbordertd" colspan="5">{{this.tomcatVersion}}</td>
                  </tr>
                </table>-->
              </div>
            </div>
          </div>
        </template>
        <div class="dark-main-background" style="width:33.33%">
          <a
            href="javascript:void(0);"
            id
            class="card card-body dark-main-background"
            style="height:300px;display: flex; justify-content: center; align-items: center; cursor: pointer;text-decoration:none;"
          >
            <div class="fa fa-plus" style="font-size: 75px;">
              <p class="text-center" style="color: #0296FE;font-size: 16px;">添加</p>
            </div>
          </a>
        </div>
      </el-tab-pane>
      <el-tab-pane label="指标列表">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false,
      serverForm: {
        objectName: '',
        businessName: '',
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
      tomcatVersion: '',
      monitorTypeValue: '',
      monitorTypeTitle: '',
      spanChangeColor: '',
      spanredChangeColor: ''
    }
  },
  created () {
    this.showInfo()
    this.getTomcatVersion()
    this.getMonitorTypeItems()
  },
  methods: {
    reloadData () {
      this.showInfo()
    },
    showInfo (str) {
      this.loading = true
      this.tableData = this.tableDataclear
      const _this = this
      this.setTimeoutster = window.setTimeout(() => { _this.showInfoTimeout() }, 300)
    },
    showInfoTimeout (str) {
      this.axios.post('/host/findHostIdinfo/' + this.$route.query.hostId).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.serverForm = json.data
          } else {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    makeMonitorTypeTitle () {
      return this.monitorTypeTitle
    },
    getTomcatVersion () {
      const region = {
        hostids: [this.$route.query.hostId],
        status: '',
        key_: 'system.uname'
      }
      this.axios.post('/item/getItemInfoList', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            if (json.data[0].lastvalue === '') {
              this.tomcatVersion = '获取失败'
            } else {
              this.tomcatVersion = json.data[0].lastvalue
            }
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
    },
    backfrom () {
      this.$router.go(-1) // 返回上一层
    },
    makeMonitorTypeItems () {
      this.monitorTypeItems.forEach(element => {
        var monitorTypeValue = ''
        if (element.available === 0) {
          monitorTypeValue = '未检测'
          this.spanChangeColor = false
          this.spanredChangeColor = false
        } else if (element.available === 1) {
          monitorTypeValue = '正常'
          this.spanChangeColor = true
          this.spanredChangeColor = false
        } else if (element.available === 2) {
          monitorTypeValue = '异常'
          this.spanChangeColor = false
          this.spanredChangeColor = true
        }
        this.monitorTypeTitle = element.error
        this.monitorTypeValue = monitorTypeValue
      })
    },
    getMonitorTypeItems () {
      const hostIds = []
      hostIds.push(this.$route.query.hostId)
      this.axios.post('/host/findHostAvailable', hostIds).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.monitorTypeItems = json.data
            this.makeMonitorTypeItems()
          }
        } else {
          this.$message({
            message: '获取分组信息失败',
            type: 'error'
          })
        }
      })
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
.toolbar > div:last-child {
  justify-content: flex-start;
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
.tempList .card {
  float: left;
  overflow: hidden;
  border: 1px solid #ddd;
  box-shadow: none;
  background-color: #fff;
}
.tempList .img-container {
  height: 110px;
  width: 100%;
  background: #fff;
}
.tempList p {
  width: 200px;
}
.title-bar-title {
  font-size: 24px;
  margin-top: 0px;
  line-height: 24px;
}
.title-bar-description {
  margin-bottom: 0px;
  margin-top: -5px;
}
.dark-main-background {
  margin-top: 10px;
}
.card-header {
  background-color: #fff;
}
.card-footer {
  background-color: #fff;
  padding: 0px 15px 5px 25px;
}
.no-border {
  border: none;
}
.agent:before {
  content: 'Agent';
  font-family: sans-serif;
  font-size: 13px;
  background: #ef6c00;
  color: #fff;
  /*text-transform: uppercase;*/
  font-weight: bold;
  text-align: center;
  display: block;
  width: 6.5em;
  position: absolute;
  padding: 3px;
  top: 0.76em;
  left: -1.8em;
  -ms-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.snmp:before {
  content: 'snmp';
  font-family: sans-serif;
  font-size: 13px;
  background: #ef6c00;
  color: #fff;
  /*text-transform: uppercase;*/
  font-weight: bold;
  text-align: center;
  display: block;
  width: 6.5em;
  position: absolute;
  padding: 3px;
  top: 0.76em;
  left: -1.8em;
  -ms-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.card-footer .hosts-btn {
  width: 90px !important;
}
// .tempList {
//   height: 240px;
// }
.tempList .m-r {
  height: 220px;
}
.img-container img {
  width: 100% !important;
}
.m-r {
  margin-right: 10px !important;
}
.text-center a {
  margin-right: 10px !important;
}
.darkmainbordertd {
  min-width: 200px;
  border: 0px;
  text-align: left;
  padding: 5px 20px;
  vertical-align: middle;
}
.darkmainborderth {
  border: 0px;
  vertical-align: middle;
}
.changeColor {
  color: green;
}
.redchangeColor {
  color: red;
}
/deep/.el-tabs__nav {
  width: 100%;
}
/deep/.el-tabs__item {
  width: 50%;
}
a:hover {
  background-color: #c5c5c5;
}
</style>
