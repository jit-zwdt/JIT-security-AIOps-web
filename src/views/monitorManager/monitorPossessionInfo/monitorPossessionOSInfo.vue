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
                <th class="darkmainborderth">操作系统</th>
                <td class="darkmainbordertd" colspan="5">{{this.operateSystem}}</td>
                <th class="darkmainborderth">运行时间</th>
                <td class="darkmainbordertd" colspan="5">{{this.runTime}}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </template>
    <el-tabs type="border-card" style="margin-top:5px" v-model="activeName" id="pieEcharts">
      <el-tab-pane label="概况" name="first" :key="'first'">
        <template>
          <div
                  class="card dark-main-background queryleft"
                  style="width:32.5%;margin-left:10px"
                  v-for="(items, index) in itemstableData"
                  v-bind:key="index"
          >
            <div
                    class="title-bar card-header dark-main-background dark-white-color"
                    style="height:40px;width:100%"
            >
              <div class="queryleft">
                <p class="title-bar-description" style>
                  <span>{{formatitemName(items.itemName)}}</span>
                </p>
              </div>
              <div class="queryright" style="margin-top:-5px !important;height:40px">
                <el-button
                        style="float: right; padding: 0px; margin-left: 5px;"
                        type="text"
                        @click="removeItems(items)"
                >
                  <i class="fa fa-remove" style="font-size: 18px;color: #979899;font-weight: 400;"></i>
                </el-button>
                <el-button
                        style="float: right; padding: 0px; margin-left: 5px;"
                        type="text"
                        @click="refreshItems(items,index)"
                >
                  <i
                          class="el-icon-refresh"
                          style="font-size: 18px;color: #979899;font-weight: 400;"
                  ></i>
                </el-button>
              </div>
            </div>
            <div class="tempList card-body">
              <div :id="getID(index)" class="echart" :onchange="getItemsData(items.itemId,index)"></div>
            </div>
          </div>
          <div
                  class="dark-main-background queryleft"
                  style="width:32.5%;margin-left:10px;margin-top:0px"
          >
            <a
                    href="javascript:void(0);"
                    @click="addItems()"
                    class="card card-body dark-main-background"
                    style="height:392px;display: flex; justify-content: center; align-items: center; cursor: pointer;text-decoration:none;"
            >
              <div class="fa fa-plus" style="font-size: 75px;">
                <p class="text-center" style="color: #0296FE;font-size: 16px;">添加</p>
              </div>
            </a>
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane label="指标列表" name="second" :key="'second'">
        <div>
          <ToolBar>
            <div class="queryleft" style="width:100%">
              <el-col :span="6">
                <el-input type="text" v-model="nameTop" size="small" placeholder="名称" clearable></el-input>
              </el-col>
              <el-button
                      type="primary"
                      size="small"
                      @click="showInfo() == false"
                      icon="el-icon-search"
              >查询</el-button>
              <el-button
                      type="primary"
                      size="small"
                      @click="showClear() == false"
                      icon="el-icon-refresh-left"
              >重置</el-button>
            </div>
          </ToolBar>
          <el-table
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            v-loading="loading"
            border
            style="width: 100%"
            :row-style="tableRowStyle"
            :header-cell-style="tableHeaderColor"
          >
            <el-table-column label="itemid" prop="itemid" :resizable="false" v-if="show"></el-table-column>
            <el-table-column label="监控项名称" prop="name" min-width="70%"></el-table-column>
            <el-table-column label="应用集" prop="value_type" min-width="15%"></el-table-column>
            <el-table-column label="间隔" prop="delay" min-width="15%"></el-table-column>
            <el-table-column align="center" label="操作" min-width="15%" :resizable="false">
              <template slot-scope="scope">
                <el-popconfirm
                        title="是否添加指标到概况？"
                        @onConfirm="confirmSaveTrend(scope.$index, scope.row)"
                >
                  <el-button
                          size="mini"
                          type="primary"
                          slot="reference"
                          icon="fa fa-external-link"
                          circle
                          :style="{ display: checkbtn(scope.$index, scope.row) }"
                  ></el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { timesMethod } from '@/utils/formatDate.js'
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
      runTime: '',
      operateSystem: '',
      monitorTypeValue: '',
      monitorTypeTitle: '',
      spanChangeColor: '',
      spanredChangeColor: '',
      tableData: [{
        itemid: '',
        name: '',
        delay: '',
        status: ''
      }],
      nameTop: '',
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
      loading: true,
      tableDataclear: [],
      setTimeoutster: '',
      setTimeoutItems: '',
      handleclosebind () {
        this.nameTop = ''
        this.$parent.$parent.noReloadData()
      },
      itemstableData: [],
      activeName: 'first',
      echartOption: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
    }
  },
  created () {
    this.showInfo()
    this.getOperateSystem()
    this.getRunTime()
    this.getMonitorTypeItems()
    this.findHostIdinfo()
    this.getShowData()
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
      this.pageSize = 10
      this.showInfo()
      this.findHostIdinfo()
    },
    showInfo (str) {
      this.loading = true
      this.tableData = this.tableDataclear
      const _this = this
      this.setTimeoutster = window.setTimeout(() => { _this.showInfoTimeout() }, 300)
    },
    showInfoTimeout (str) {
      const region = {
        hostids: [this.$route.query.hostId],
        name: this.nameTop
      }
      this.axios.post('/item/getItemInfoList', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.tableData = json.data
            this.currentPage = 1
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
        this.loading = false
      })
    },
    findHostIdinfo () {
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
    getOperateSystem () {
      var systemName = this.$route.query.hostName
      const region = {
        hostids: [this.$route.query.hostId],
        status: '',
        key_: systemName.startsWith('Window') ? 'system.uname' : 'linux.name.version'
      }
      this.axios.post('/item/getItemInfoList', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            if (json.data[0].lastvalue === '') {
              this.operateSystem = '获取失败'
            } else {
              this.operateSystem = json.data[0].lastvalue
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
    getRunTime () {
      const region = {
        hostids: [this.$route.query.hostId],
        status: '',
        key_: 'system.uptime'
      }
      this.axios.post('/item/getItemInfoList', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            if (json.data[0].lastvalue === '') {
              this.runTime = '运行时间获取失败'
            } else {
              this.runTime = timesMethod.formattedTime(json.data[0].lastvalue)
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
      this.nameTop = ''
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
    },
    drawLine () {
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    getShowData () {
      this.axios.post('/trend/findHostDetailItems/' + this.$route.query.hostId).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.itemstableData = json.data
            // json.data.forEach(element => {
            //   this.getItemsData(element.itemid)
            // })
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    getID (index) {
      return 'charts-demo-' + index
    },
    getItemsData (itemid, index) {
      var starttime = timesMethod.fun_date(-3)
      var timefrom = timesMethod.getDatestamp(starttime)
      var endtime = timesMethod.fun_date(3)
      var timetill = timesMethod.getDatestamp(endtime)
      const region = {
        itemids: [itemid],
        timefrom: timefrom,
        timetill: timetill
      }
      const returndataclock = []
      const returndataavg = []
      this.axios.post('/trend/getItemInfoList', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            json.data.forEach(element => {
              var clock = timesMethod.getTimestamp(element.clock)
              returndataclock.push(clock)
              returndataavg.push(element.value_avg)
            })
            // 基于准备好的dom，初始化echarts实例
            const pieCharts = document.getElementById('charts-demo-' + index)
            var pieEcharts = document.getElementById('pieEcharts')
            pieCharts.style.width = pieEcharts.clientWidth / 3 - 70 + 'px'
            const myChart = this.$echarts.init(pieCharts)
            // 绘制图表
            myChart.setOption({
              xAxis: {
                type: 'category',
                data: returndataclock,
                // 设置字体倾斜
                axisLabel: {
                  interval: 0,
                  rotate: 45, // 倾斜度-90至90默认为0
                  margin: 2,
                  textStyle: {
                    fontWeight: 'bolder',
                    color: '#000000',
                    fontSize: '7'
                  }
                }
              },
              yAxis: {
                type: 'value'
              },
              tooltip: {
                trigger: 'axis'
              },
              series: [{
                data: returndataavg,
                type: 'line'
              }]
            })
          } else {
            // 基于准备好的dom，初始化echarts实例
            const pieCharts = document.getElementById('charts-demo-' + index)
            var pieEcharts2 = document.getElementById('pieEcharts')
            pieCharts.style.width = pieEcharts2.clientWidth / 3 - 70 + 'px'
            const myChart = this.$echarts.init(pieCharts)
            // 绘制图表
            myChart.setOption({
              xAxis: {
                type: 'category',
                data: '',
                // 设置字体倾斜
                axisLabel: {
                  interval: 0,
                  rotate: 45, // 倾斜度-90至90默认为0
                  margin: 2,
                  textStyle: {
                    fontWeight: 'bolder',
                    color: '#000000',
                    fontSize: '7'
                  }
                }
              },
              yAxis: {
                type: 'value'
              },
              tooltip: {
                trigger: 'axis'
              },
              series: [{
                data: '',
                type: 'line'
              }]
            })
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
        // if (this.itemsloading !== '') {
        //   this.itemsloading.close()
        // }
        this.setTimeoutItems = ''
      })
    },
    checkbtn (index, row) {
      if (row.value_type === 1 || row.value_type === 2 || row.value_type === 4) {
        return 'none'
      } else {
        return ''
      }
    },
    confirmSaveTrend (index, row) {
      const region = {
        hostId: row.hostid,
        itemId: row.itemid
      }
      this.axios.post('/trend/checkHostDetailItem', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (!json.data) {
            this.saveTrend(row)
          } else {
            this.$message({
              message: '添加失败【已经存在！】',
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
    saveTrend (row) {
      const region = {
        hostId: row.hostid,
        itemId: row.itemid,
        itemName: row.name
      }
      this.axios.post('/trend/addHostDetailItem', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.getShowData()
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    addItems () {
      this.activeName = 'second'
    },
    removeItems (str) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.delete('/trend/deleteHostDetailItem/' + str.id).then((resp) => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              this.getShowData()
              this.activeName = 'first'
            }
          } else {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
          }
        })
      })
    },
    refreshItems (items, index) {
      if (this.setTimeoutItems === '') {
        const _this = this
        this.openloading(index)
        this.setTimeoutItems = window.setTimeout(() => { _this.getItemsData(items.itemId, index) }, 300)
      }
    },
    openloading (index) {
      this.itemsloading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)',
        target: document.querySelector('#charts-demo-' + index) // 指定区域
      })
    },
    formatitemName (name) {
      if (name !== null && name !== '' && name.length > 50) {
        name = name.substring(0, 50) + '...'
      }
      return name
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
.echart {
  width: 100%;
  height: 300px;
}
</style>
