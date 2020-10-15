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
                <th class="darkmainborderth">所属主机</th>
                <td class="darkmainbordertd">{{this.$route.query.hostName}}</td>
                <th class="darkmainborderth">进程数</th>
                <td class="darkmainbordertd">{{this.procNum}}</td>
                <th class="darkmainborderth">连接用户数</th>
                <td class="darkmainbordertd">{{this.userConnect}}</td>
              </tr>
              <tr style="height:40px">
                <th class="darkmainborderth">活动状态</th>
                <td class="darkmainbordertd">{{this.sessionActive}}</td>
                <th class="darkmainborderth">启动监控</th>
                <td class="darkmainbordertd">
                  <el-switch
                    class="switchStyle"
                    v-model="serverForm.enableMonitor"
                    active-value="1"
                    active-text="启用"
                    inactive-value="0"
                    inactive-text="停用"
                    @change="change_enableMonitor()"
                  />
                </td>
                <th class="darkmainborderth">活动会话数</th>
                <td class="darkmainbordertd">{{this.sessionsNum}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </template>
    <div>
      <MonitorPossession :hostId="this.$route.query.hostId" :show1="true"></MonitorPossession>
    </div>
  </div>
</template>
<script>
import MonitorPossession from '@/views/monitorManager/monitorPossessionInfo/monitorPossession.vue'
import qs from 'qs'
export default {
  data () {
    return {
      itemsloading: '',
      show1: true,
      show: false,
      serverForm: {
        id: '',
        objectName: '',
        businessName: '',
        agentIp: '',
        agentDnsName: '',
        agentPort: '',
        proxyMonitor: '',
        enableMonitor: '',
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
      procNum: '',
      userConnect: '',
      sessionActive: '',
      sessionsNum: '',
      monitorTypeValue: '',
      monitorTypeTitle: '',
      spanChangeColor: '',
      spanredChangeColor: ''
    }
  },
  created () {
    this.getProcessNum()
    this.getMonitorTypeItems()
    this.findHostIdinfo()
    this.getUserConnet()
    this.getSessionActive()
    this.getSessionsNum()
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
      this.findHostIdinfo()
    },
    findHostIdinfo () {
      this.axios.post(this.$api.monitorManager.findHostIdinfo + this.$route.query.hostId).then((resp) => {
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
    change_enableMonitor () {
      console.log(this.$route.query.hostId)
      console.log(this.serverForm.enableMonitor)
      this.axios.put(this.$api.monitorManager.updateHostEnableMonitor + this.serverForm.id, qs.stringify({
        enableMonitor: this.serverForm.enableMonitor
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
    makeMonitorTypeTitle () {
      return this.monitorTypeTitle
    },
    getProcessNum () {
      const region = {
        hostids: [this.$route.query.hostId],
        status: '',
        key_: 'procnum'
      }
      this.axios.post(this.$api.monitorManager.getItemInfoListItem, region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            if (json.data[0].lastvalue === '') {
              this.procNum = '获取失败'
            } else {
              this.procNum = json.data[0].lastvalue
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
    getSessionsNum () {
      const region = {
        hostids: [this.$route.query.hostId],
        status: '',
        key_: 'session'
      }
      this.axios.post(this.$api.monitorManager.getItemInfoListItem, region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            if (json.data[0].lastvalue === '') {
              this.sessionsNum = '获取失败'
            } else {
              this.sessionsNum = json.data[0].lastvalue
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
    getUserConnet () {
      const region = {
        hostids: [this.$route.query.hostId],
        status: '',
        key_: 'userconn'
      }
      this.axios.post(this.$api.monitorManager.getItemInfoListItem, region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            if (json.data[0].lastvalue === '') {
              this.userConnect = '获取失败'
            } else {
              this.userConnect = json.data[0].lastvalue
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
    getSessionActive () {
      const region = {
        hostids: [this.$route.query.hostId],
        status: '',
        key_: 'session_active'
      }
      this.axios.post(this.$api.monitorManager.getItemInfoListItem, region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            if (json.data[0].lastvalue === '') {
              this.sessionActive = '获取失败'
            } else {
              if (json.data[0].lastvalue === '0') {
                this.sessionActive = '未检测'
              } else if (json.data[0].lastvalue === '1') {
                this.sessionActive = '正常'
              } else if (json.data[0].lastvalue === '2') {
                this.sessionActive = '异常'
              }
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
    backfrom () {
      // 返回上一层
      var identification = this.$route.query.identification
      if (identification != null && identification === '1') {
        this.$router.push({
          name: 'monitorList'
        })
      } else {
        this.$router.push({
          name: 'monitorDBIndex'
        })
      }
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
        this.monitorTypeTitle = element.jmx_error
        this.monitorTypeValue = monitorTypeValue
      })
    },
    getMonitorTypeItems () {
      const hostIds = []
      hostIds.push(this.$route.query.hostId)
      this.axios.post(this.$api.monitorManager.findHostAvailable, hostIds).then((resp) => {
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
  components: {
    MonitorPossession
  }
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
  width: 33.33%;
}
a:hover {
  background-color: #c5c5c5;
}
.echart {
  width: 100%;
  height: 300px;
}
.card-width {
  width: 32.5%;
  margin-left: 10px;
}
.card-width-top {
  width: 32.5%;
  margin-left: 10px;
  margin-top: 0px;
}
@media screen and (max-width: 1500px) {
  .card-width {
    width: 32%;
    margin-left: 10px;
  }
  .card-width-top {
    width: 32%;
    margin-left: 10px;
    margin-top: 0px;
  }
}
 /deep/ .switchStyle .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
}
/deep/ .switchStyle .el-switch__label--left {
  width: 28px;
  z-index: 1;
  left: 21px;
}
/deep/ .switchStyle .el-switch__label--right {
  width: 28px;
  z-index: 1;
  right: 21px;
}
/deep/ .switchStyle .el-switch__label.is-active {
  display: block;
}
/deep/ .switchStyle.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 50px !important;
}
</style>
