<template>
  <div>
    <template>
      <div class="card dark-main-background">
        <div
          class="title-bar card-header dark-main-background dark-white-color"
          style="margin-top: -10px !important; height: 40px"
        >
          <div class="queryleft">
            <p class="title-bar-description" style>
              <span
                >{{ this.$route.query.hostName }}\{{
                  this.serverForm.jmxIp
                }}</span
              >
            </p>
          </div>
          <div
            class="queryright"
            style="margin-top: -5px !important; height: 40px"
          >
            <el-button @click="backfrom()" size="mini">返回</el-button>
          </div>
        </div>
        <div class="tempList card-body">
          <div>
            <table
              class="dark-main-background"
              style="width: 100%; margin-top: -5px"
            >
              <tr style="height: 40px">
                <th class="darkmainborderth">名称</th>
                <td class="darkmainbordertd">
                  {{ this.$route.query.hostName }}
                </td>
                <th class="darkmainborderth">监控状态</th>
                <td class="darkmainbordertd">
                  <span
                    class="label label-danger"
                    data-toggle="tooltip"
                    ata-placement="bottom"
                    v-bind:class="{
                      changeColor: spanChangeColor,
                      redchangeColor: spanredChangeColor,
                    }"
                    :title="makeMonitorTypeTitle()"
                    >{{ this.monitorTypeValue }}</span
                  >
                </td>
                <th class="darkmainborderth">ip地址</th>
                <td class="darkmainbordertd">{{ this.serverForm.jmxIp }}</td>
              </tr>
              <tr style="height: 40px">
                <th class="darkmainborderth">版本</th>
                <td class="darkmainbordertd" colspan="5">
                  {{ this.tomcatVersion }}
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </template>
    <div>
      <MonitorPossession :hostId="this.$route.query.hostId"></MonitorPossession>
    </div>
  </div>
</template>
<script>
import MonitorPossession from '@/views/monitorManager/monitorPossessionInfo/monitorPossession.vue'
export default {
  data () {
    return {
      itemsloading: '',
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
    this.getTomcatVersion()
    this.getMonitorTypeItems()
    this.findHostIdinfo()
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
    makeMonitorTypeTitle () {
      return this.monitorTypeTitle
    },
    getTomcatVersion () {
      const region = {
        hostids: [this.$route.query.hostId],
        status: '',
        key_: 'jmx["Catalina:type=Server",serverInfo]'
      }
      this.axios.post(this.$api.monitorManager.getItemInfoListItem, region).then((resp) => {
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
    // 返回
    backfrom () {
      const referrer = JSON.parse(sessionStorage.getItem('referrer'))
      const referrerBack = this.$routerHistory.dataBack(referrer)
      this.$router.push(referrerBack)
    },
    makeMonitorTypeItems () {
      this.monitorTypeItems.forEach(element => {
        var monitorTypeValue = ''
        if (element.jmx_available === 0) {
          monitorTypeValue = '未检测'
          this.spanChangeColor = false
          this.spanredChangeColor = false
        } else if (element.jmx_available === 1) {
          monitorTypeValue = '正常'
          this.spanChangeColor = true
          this.spanredChangeColor = false
        } else if (element.jmx_available === 2) {
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
  mounted () { },
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
</style>
