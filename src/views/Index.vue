<template>
  <div>
    <div>
      <div class="templateStyle-one" @click="headerOneherf('1')">
        <template>
          <div class="card">
            <div class="header">
              <div class="queryleft">
                <h1 class="title-bar-title m-b-sm" style="min-height:48px">
                  <span class="d-ib">{{this.headerOne.hostCount}}</span>
                </h1>
                <div>
                  <p class="title-bar-description" style="min-height:24px">
                    <span>{{this.headerOne.type}}</span>
                  </p>
                </div>
              </div>
              <div class="card-icon-round-system queryright">
                <div class="card-icon-circular-system">
                  <i class="el-icon-star-off i-fa"></i>
                </div>
              </div>
            </div>
            <div class="tempList card-body">
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-disaster"></i>
                {{this.headerOnedisasterCount}}
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-high"></i>
                {{this.headerOnehighCount}}
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-average"></i>
                {{this.headerOneaverageCount}}
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-warning"></i>
                {{this.headerOnewarningCount}}
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-info"></i>
                {{this.headerOneinformationCount}}
              </span>
            </div>
          </div>
        </template>
      </div>
      <div class="templateStyle" @click="headerOneherf('2')">
        <template>
          <div class="card">
            <div class="header">
              <div class="queryleft">
                <h1 class="title-bar-title m-b-sm" style="min-height:48px">
                  <span class="d-ib">{{this.headerTwo.hostCount}}</span>
                </h1>
                <div>
                  <p class="title-bar-description" style="min-height:24px">
                    <span>{{this.headerTwo.type}}</span>
                  </p>
                </div>
              </div>
              <div class="card-icon-round-network queryright">
                <div class="card-icon-circular-network">
                  <i class="fa fa-stack-exchange i-fa"></i>
                </div>
              </div>
            </div>
            <div class="tempList card-body">
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-disaster"></i>
                {{this.headerTwodisasterCount}}
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-high"></i>
                {{this.headerTwohighCount}}
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-average"></i>
                {{this.headerTwoaverageCount}}
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-warning"></i>
                {{this.headerTwowarningCount}}
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-info"></i>
                {{this.headerTwoinformationCount}}
              </span>
            </div>
          </div>
        </template>
      </div>
      <div class="templateStyle" @click="headerOneherf('3')">
        <template>
          <div class="card">
            <div class="header">
              <div class="queryleft">
                <h1 class="title-bar-title m-b-sm" style="min-height:48px">
                  <span class="d-ib">{{this.headerThree.hostCount}}</span>
                </h1>
                <div>
                  <p class="title-bar-description" style="min-height:24px">
                    <span>{{this.headerThree.type}}</span>
                  </p>
                </div>
              </div>
              <div class="card-icon-round-hard queryright">
                <div class="card-icon-circular-hard">
                  <i class="fa fa-internet-explorer i-fa"></i>
                </div>
              </div>
            </div>
            <div class="tempList card-body">
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-disaster"></i>
                {{this.headerThreedisasterCount}}
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-high"></i>
                {{this.headerThreehighCount}}
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-average"></i>
                {{this.headerThreeaverageCount}}
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-warning"></i>
                {{this.headerThreewarningCount}}
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-info"></i>
                {{this.headerThreeinformationCount}}
              </span>
            </div>
          </div>
        </template>
      </div>
      <div class="templateStyle">
        <template>
          <div class="card">
            <div class="header">
              <div class="queryleft">
                <h1 class="title-bar-title m-b-sm" style="min-height:48px">
                  <span class="d-ib">{{this.headerFour.hostCount}}</span>
                </h1>
                <div>
                  <p class="title-bar-description" style="min-height:24px">
                    <span>{{this.headerFour.type}}</span>
                  </p>
                </div>
              </div>
              <div class="card-icon-round-database queryright">
                <div class="card-icon-circular-database">
                  <i class="fa fa-rss-square i-fa"></i>
                </div>
              </div>
            </div>
            <div class="tempList card-body">
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-disaster"></i>
                {{this.headerFourdisasterCount}}
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-high"></i>
                {{this.headerFourhighCount}}
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-average"></i>
                {{this.headerFouraverageCount}}
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-warning"></i>
                {{this.headerFourwarningCount}}
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-info"></i>
                {{this.headerFourinformationCount}}
              </span>
            </div>
          </div>
        </template>
      </div>
      <div class="templateStyle">
        <template>
          <div class="card">
            <div class="header">
              <div class="queryleft">
                <h1 class="title-bar-title m-b-sm" style="min-height:48px">
                  <span class="d-ib">{{this.headerFive.hostCount}}</span>
                </h1>
                <div>
                  <p class="title-bar-description" style="min-height:24px">
                    <span>{{this.headerFive.type}}</span>
                  </p>
                </div>
              </div>
              <div class="card-icon-round-web queryright">
                <div class="card-icon-circular-web">
                  <i class="fa fa-server i-fa"></i>
                </div>
              </div>
            </div>
            <div class="tempList card-body">
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-disaster"></i>
                {{this.headerFivedisasterCount}}
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-high"></i>
                {{this.headerFivehighCount}}
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-average"></i>
                {{this.headerFiveaverageCount}}
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-warning"></i>
                {{this.headerFivewarningCount}}
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-info"></i>
                {{this.headerFiveinformationCount}}
              </span>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div id="pieEcharts">
      <div class="subtemplateStyle-one">
        <template>
          <div class="card">
            <div class="header header-sub">
              <div class="queryleft">
                <p class="title-bar-description">
                  <span>CPU TOP5(操作系统)</span>
                </p>
              </div>
              <div class="queryright btn-div">
                <el-button class="btn-refresh" type="text" @click="refreshItems('chartsOne')">
                  <i class="el-icon-refresh i-refresh"></i>
                </el-button>
                <span class="span-date">
                  <i class="fa fa-clock-o i-date"></i>
                  {{currentTime}}
                </span>
              </div>
            </div>
            <div class="tempList card-body">
              <div id="chartsOne" class="echart"></div>
            </div>
          </div>
        </template>
      </div>
      <div class="subtemplateStyle">
        <template>
          <div class="card">
            <div class="header header-sub">
              <div class="queryleft">
                <p class="title-bar-description">
                  <span>内存 TOP5(操作系统)</span>
                </p>
              </div>
              <div class="queryright btn-div">
                <el-button class="btn-refresh" type="text" @click="refreshItems('chartsTwo')">
                  <i class="el-icon-refresh i-refresh"></i>
                </el-button>
                <span class="span-date">
                  <i class="fa fa-clock-o i-date"></i>
                  {{currentTime}}
                </span>
              </div>
            </div>
            <div class="tempList card-body">
              <div id="chartsTwo" class="echart"></div>
            </div>
          </div>
        </template>
      </div>
      <div class="subtemplateStyle">
        <template>
          <div class="card">
            <div class="header header-sub">
              <div class="queryleft">
                <p class="title-bar-description">
                  <span>监控状态运行</span>
                </p>
              </div>
            </div>
            <div class="tempList card-body queryleft">
              <div class="queryleft width-300">
                <div id="liquidFillMonitorState" class="echartliquidFill"></div>
                <div class="liquidFilldata">
                  <i class="fa fa-certificate" style="color:#F87B27"></i> 用户总数 :
                  <span class="list-count" style="color:#F87B27">{{ userdataNum}}</span>
                </div>
                <div class="liquidFilldata">
                  <i class="fa fa-certificate" style="color:#08DFAF"></i> 异常登录 :
                  <span class="list-count" style="color:#08DFAF">{{ userExceptiondataNum}}</span>
                </div>
              </div>
              <div class="queryleft width-200-margin">
                <div
                  class="liquidFilldata"
                  style="text-align:left"
                  @click="liquidFilldataherf('1')"
                >
                  <i class="fa el-icon-s-operation" style="color:#08DFAF"></i> 监控列表
                </div>
                <div
                  class="liquidFilldata"
                  style="text-align:left"
                  @click="liquidFilldataherf('2')"
                >
                  <i class="fa el-icon-s-operation" style="color:#08DFAF"></i> 新增对象
                </div>
                <div
                  class="liquidFilldata"
                  style="text-align:left"
                  @click="liquidFilldataherf('5')"
                >
                  <i class="fa el-icon-s-operation" style="color:#08DFAF"></i> 资产管理
                </div>
                <div
                  class="liquidFilldata"
                  style="text-align:left"
                  @click="liquidFilldataherf('6')"
                >
                  <i class="fa el-icon-s-operation" style="color:#08DFAF"></i> 故障处理
                </div>
                <div
                  class="liquidFilldata"
                  style="text-align:left"
                  @click="liquidFilldataherf('7')"
                >
                  <i class="fa el-icon-s-operation" style="color:#08DFAF"></i> 统计报表
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <div id="pieEcharts2">
      <div class="subtemplateStyle-one">
        <template>
          <div class="card">
            <div class="header header-sub">
              <div class="queryleft">
                <p class="title-bar-description">
                  <span>磁盘 TOP5(操作系统)</span>
                </p>
              </div>
              <div class="queryright btn-div">
                <el-button class="btn-refresh" type="text" @click="refreshItems('chartsThree')">
                  <i class="el-icon-refresh i-refresh"></i>
                </el-button>
                <span class="span-date">
                  <i class="fa fa-clock-o i-date"></i>
                  {{currentTime}}
                </span>
              </div>
            </div>
            <div class="tempList card-body">
              <div id="chartsThree" class="echart"></div>
            </div>
          </div>
        </template>
      </div>
      <div class="subtemplateStyle">
        <template>
          <div class="card">
            <div class="header header-sub">
              <div class="queryleft">
                <p class="title-bar-description">
                  <span>网络接口速率 TOP5(网络设备)</span>
                </p>
              </div>
              <div class="queryright btn-div">
                <el-button class="btn-refresh" type="text" @click="refreshItems('chartsFour')">
                  <i class="el-icon-refresh i-refresh"></i>
                </el-button>
                <span class="span-date">
                  <i class="fa fa-clock-o i-date"></i>
                  {{currentTime}}
                </span>
              </div>
            </div>
            <div class="tempList card-body">
              <div id="chartsFour" class="echart"></div>
            </div>
          </div>
        </template>
      </div>
      <div class="subtemplateStyle">
        <template>
          <div class="card">
            <div class="header header-sub">
              <div class="queryleft">
                <p class="title-bar-description">
                  <span>今日概况</span>
                </p>
              </div>
            </div>
            <div class="tempList card-body queryleft">
              <div class="height-180">
                <div class="queryleft width-300">
                  <div id="liquidFillAddAlert" class="echartliquidFill"></div>
                </div>
                <div class="queryleft width-200">
                  <div id="liquidFillCloseAlert" class="echartliquidFill"></div>
                </div>
              </div>
              <div class="height-110">
                <div class="height-20-margin">
                  <div class="queryleft queryalert" @click="liquidFilldataherf('4')">
                    <i class="fa el-icon-s-operation" style="color:#08DFAF"></i> 故障认领
                  </div>
                  <div class="queryleft querygetalert" @click="liquidFilldataherf('3')">
                    <i class="fa el-icon-s-operation" style="color:#08DFAF"></i> 告警列表
                  </div>
                </div>
                <!-- <div class="height-20-margin">
                  <div class="width-padding">
                    <div class="font-size-padding">发出通知</div>
                    <div class="font-size-padding">邮箱通知</div>
                    <div class="font-size-padding">微信通知</div>
                  </div>
                  <div style="width:80%;float:left">
                    <el-progress
                      :percentage="5"
                      :format="progressformat"
                      color="#28FF28"
                      class="padding-2"
                    ></el-progress>
                    <el-progress
                      :percentage="4"
                      :format="progressformat"
                      color="#28FF28"
                      class="padding-2"
                    ></el-progress>
                    <el-progress
                      :percentage="1"
                      :format="progressformat"
                      color="#28FF28"
                      class="padding-2"
                    ></el-progress>
                  </div>
                </div>-->
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
// import echartsLiquidfill from 'echarts-liquidfill'
import 'echarts-liquidfill'
import echarts from 'echarts'
import { timesMethod } from '@/utils/formatDate.js'
export default {
  data () {
    return {
      show: false,
      itemsloadingOne: '',
      itemsloadingTwo: '',
      itemsloadingThree: '',
      itemsloadingFour: '',
      setTimeoutItemsOne: '',
      setTimeoutItemsTwo: '',
      setTimeoutItemsThree: '',
      setTimeoutItemsFour: '',
      currentTime: '', // 获取当前时间
      headerOne: [],
      headerOneaverageCount: '',
      headerOnehighCount: '',
      headerOneinformationCount: '',
      headerOnewarningCount: '',
      headerOnedisasterCount: '',
      headerTwo: [],
      headerTwoaverageCount: '',
      headerTwohighCount: '',
      headerTwoinformationCount: '',
      headerTwowarningCount: '',
      headerTwodisasterCount: '',
      headerThree: [],
      headerThreeaverageCount: '',
      headerThreehighCount: '',
      headerThreeinformationCount: '',
      headerThreewarningCount: '',
      headerThreedisasterCount: '',
      headerFour: [],
      headerFouraverageCount: '',
      headerFourhighCount: '',
      headerFourinformationCount: '',
      headerFourwarningCount: '',
      headerFourdisasterCount: '',
      headerFive: [],
      headerFiveaverageCount: '',
      headerFivehighCount: '',
      headerFiveinformationCount: '',
      headerFivewarningCount: '',
      headerFivedisasterCount: '',
      addAlertdata: '',
      userdataNum: '',
      userExceptiondataNum: ''
    }
  },
  created () {
    this.currentTimefunction()
    this.getAddAlertInfo()
    this.getUserInfo()
  },
  mounted () {
    this.refreshItems('chartsOne')
    this.refreshItems('chartsTwo')
    this.refreshItems('chartsThree')
    this.refreshItems('chartsFour')
    this.getMonitorStateRunInfo()
    this.getCloseAlertRunInfo()
    this.showInfo()
  },
  methods: {
    currentTimefunction () {
      this.timer = setInterval(this.getDate, 500)
    },
    getDate () {
      this.currentTime = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
    },
    showInfo () {
      this.axios.post(this.$api.main.getMonitorTypeUsedInfo).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            json.data.forEach(element => {
              if (element.typeId === '1') {
                this.headerOne = element
                this.headerOneinformationCount = this.headerOne.problemsSeverityCount.informationCount
                this.headerOnewarningCount = this.headerOne.problemsSeverityCount.warningCount
                this.headerOneaverageCount = this.headerOne.problemsSeverityCount.averageCount
                this.headerOnehighCount = this.headerOne.problemsSeverityCount.highCount
                this.headerOnedisasterCount = this.headerOne.problemsSeverityCount.disasterCount
              } else if (element.typeId === '2') {
                this.headerTwo = element
                this.headerTwoinformationCount = this.headerTwo.problemsSeverityCount.informationCount
                this.headerTwowarningCount = this.headerTwo.problemsSeverityCount.warningCount
                this.headerTwoaverageCount = this.headerTwo.problemsSeverityCount.averageCount
                this.headerTwohighCount = this.headerTwo.problemsSeverityCount.highCount
                this.headerTwodisasterCount = this.headerTwo.problemsSeverityCount.disasterCount
              } else if (element.typeId === '3') {
                this.headerThree = element
                this.headerThreeinformationCount = this.headerThree.problemsSeverityCount.informationCount
                this.headerThreewarningCount = this.headerThree.problemsSeverityCount.warningCount
                this.headerThreeaverageCount = this.headerThree.problemsSeverityCount.averageCount
                this.headerThreehighCount = this.headerThree.problemsSeverityCount.highCount
                this.headerThreedisasterCount = this.headerThree.problemsSeverityCount.disasterCount
              } else if (element.typeId === '4') {
                this.headerFour = element
                this.headerFourinformationCount = this.headerFour.problemsSeverityCount.informationCount
                this.headerFourwarningCount = this.headerFour.problemsSeverityCount.warningCount
                this.headerFouraverageCount = this.headerFour.problemsSeverityCount.averageCount
                this.headerFourhighCount = this.headerFour.problemsSeverityCount.highCount
                this.headerFourdisasterCount = this.headerFour.problemsSeverityCount.disasterCount
              } else if (element.typeId === '5') {
                this.headerFive = element
                this.headerFiveinformationCount = this.headerFive.problemsSeverityCount.informationCount
                this.headerFivewarningCount = this.headerFive.problemsSeverityCount.warningCount
                this.headerFiveaverageCount = this.headerFive.problemsSeverityCount.averageCount
                this.headerFivehighCount = this.headerFive.problemsSeverityCount.highCount
                this.headerFivedisasterCount = this.headerFive.problemsSeverityCount.disasterCount
              }
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
    headerOneherf (str) {
      if (str === '1') {
        this.$router.push({ name: 'monitorSystemIndex' })
      } else if (str === '2') {
        this.$router.push({ name: 'monitorDBIndex' })
      } else if (str === '3') {
        this.$router.push({ name: 'monitorMiddlewareIndex' })
      } else if (str === '4') {
        // this.$router.push({ name: 'monitorAddList' })
      } else if (str === '5') {
        // this.$router.push({ name: 'monitorAddList' })
      }
    },
    liquidFilldataherf (str) {
      if (str === '1') {
        this.$router.push({ name: 'monitorList' })
      } else if (str === '2') {
        this.$router.push({ name: 'monitorAddList' })
      } else if (str === '3') {
        this.$router.push({ name: 'alertInquire' })
      } else if (str === '4') {
        this.$router.push({ name: 'malfunctionSolveClaim' })
      } else if (str === '5') {
        this.$router.push({ name: 'assetsList' })
      } else if (str === '6') {
        this.$router.push({ name: 'malfunctionDisposeRegister' })
      } else if (str === '7') {
        this.$router.push({ name: 'malfunctionStatisticalStatement' })
      }
    },
    getcpuRateTop5ByItem () {
      var param = 'cup'
      this.axios.post(this.$api.main.getTimeTop5ItemInfo + param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.getItemsData('chartsOne', json.data)
          } else {
          }
        } else {
          this.$message({
            message: '获取分组信息失败',
            type: 'error'
          })
        }
      })
    },
    getmemoryTop5ByItem () {
      var param = 'memory'
      this.axios.post(this.$api.main.getTimeTop5ItemInfo + param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.getItemsData('chartsTwo', json.data)
          } else {
          }
        } else {
          this.$message({
            message: '获取分组信息失败',
            type: 'error'
          })
        }
      })
    },
    getioRateTop5ByItem () {
      var param = 'cup'
      this.axios.post(this.$api.main.getTimeTop5ItemInfothis.$api.main.getTimeTop5ItemInfo + param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.getItemsData('chartsThree', json.data)
          } else {
          }
        } else {
          this.$message({
            message: '获取分组信息失败',
            type: 'error'
          })
        }
      })
    },
    getNeiWorkTop5ByItem () {
      var param = 'memory'
      this.axios.post(this.$api.main.getTimeTop5ItemInfo + param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.getItemsData('chartsFour', json.data)
          } else {
          }
        } else {
          this.$message({
            message: '获取分组信息失败',
            type: 'error'
          })
        }
      })
    },
    getItemsData (id, data) {
      var pieCharts = document.getElementById(id)
      var pieEcharts = document.getElementById('pieEcharts')
      if (pieEcharts.clientWidth > 1200) {
        pieCharts.style.width = (pieEcharts.clientWidth / 3 - 20) / 16 + 'rem'
      } else {
        pieCharts.style.width = (pieEcharts.clientWidth / 3 - 20) / 16 + 'rem'
      }
      const myChart = echarts.init(pieCharts)
      if (id === 'chartsOne') {
        const returndataclock = data.xAxis
        const returndataclocktime = []
        returndataclock.forEach(element => {
          if (element === '00') {
            returndataclocktime.push('0时')
          } else {
            returndataclocktime.push(element + '时')
          }
        })
        const returndataavg = data.series
        returndataavg.forEach(element => {
          element.type = 'line'
          element.stack = '总量'
          element.areaStyle = {}
        })
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: data.legend
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: returndataclocktime
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: returndataavg
        })
      } else if (id === 'chartsTwo') {
        const returndataclock = data.xAxis
        const returndataclocktime = []
        returndataclock.forEach(element => {
          if (element === '00') {
            returndataclocktime.push('0时')
          } else {
            returndataclocktime.push(element + '时')
          }
        })
        const returndataavg = data.series
        returndataavg.forEach(element => {
          element.type = 'bar'
          element.stack = '总量'
          element.areaStyle = {}
          // element.label = { show: true, position: 'insideRight' }
        })
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: data.legend
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: returndataclocktime
          },
          yAxis: {
            type: 'value'
          },
          series: returndataavg
        })
      } else if (id === 'chartsThree') {
        const returndataavg = data.series
        returndataavg.forEach(element => {
          var avg = '0'
          element.data.forEach(ele => {
            if (parseFloat(ele) > parseFloat(avg)) {
              avg = ele
            }
          })
          element.value = avg
        })
        myChart.setOption({
          title: {
            text: '磁盘', // 南丁格尔玫瑰图
            subtext: 'TOP5', // 纯属虚构
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            top: 'bottom',
            data: data.legend
          },
          toolbox: {
            show: true,
            feature: {
              mark: { show: true },
              dataView: { show: true, readOnly: false },
              magicType: {
                show: true,
                type: ['pie', 'funnel']
              },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          series: [
            {
              name: '半径模式',
              type: 'pie',
              radius: [20, 100],
              center: ['50%', '50%'],
              roseType: 'radius',
              label: {
                show: false
              },
              emphasis: {
                label: {
                  show: true
                }
              },
              data: returndataavg
            }
          ]
        })
      } else if (id === 'chartsFour') {
        const returndataavg = data.series
        returndataavg.forEach(element => {
          var avg = 0
          element.data.forEach(ele => {
            if (parseFloat(ele) > parseFloat(avg)) {
              avg = ele
            }
          })
          element.value = avg
        })
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 10,
            data: data.legend
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: returndataavg
            }
          ]
        })
      }
      if (id === 'chartsOne') {
        if (this.itemsloadingOne !== '') {
          this.itemsloadingOne.close()
        }
        this.setTimeoutItemsOne = ''
      } else if (id === 'chartsTwo') {
        if (this.itemsloadingTwo !== '') {
          this.itemsloadingTwo.close()
        }
        this.setTimeoutItemsTwo = ''
      } else if (id === 'chartsThree') {
        if (this.itemsloadingThree !== '') {
          this.itemsloadingThree.close()
        }
        this.setTimeoutItemsThree = ''
      } else if (id === 'chartsFour') {
        if (this.itemsloadingFour !== '') {
          this.itemsloadingFour.close()
        }
        this.setTimeoutItemsFour = ''
      }
    },
    sortNumber (a, b) {
      return a - b
    },
    refreshItems (id) {
      const _this = this
      this.openloading(id)
      if (id === 'chartsOne') {
        this.setTimeoutItemsOne = window.setTimeout(() => { _this.getcpuRateTop5ByItem() }, 300)
      } else if (id === 'chartsTwo') {
        this.setTimeoutItemsTwo = window.setTimeout(() => { _this.getmemoryTop5ByItem() }, 300)
      } else if (id === 'chartsThree') {
        this.setTimeoutItemsThree = window.setTimeout(() => { _this.getioRateTop5ByItem() }, 300)
      } else if (id === 'chartsFour') {
        this.setTimeoutItemsFour = window.setTimeout(() => { _this.getNeiWorkTop5ByItem() }, 300)
      }
    },
    openloading (id) {
      if (id === 'chartsOne') {
        this.itemsloadingOne = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.3)',
          target: document.querySelector('#' + id) // 指定区域
        })
      } else if (id === 'chartsTwo') {
        this.itemsloadingTwo = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.3)',
          target: document.querySelector('#' + id) // 指定区域
        })
      } else if (id === 'chartsThree') {
        this.itemsloadingThree = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.3)',
          target: document.querySelector('#' + id) // 指定区域
        })
      } else if (id === 'chartsFour') {
        this.itemsloadingFour = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.3)',
          target: document.querySelector('#' + id) // 指定区域
        })
      }
    },
    getMonitorStateRunInfo () {
      const param = {
        servername: '正常',
        name: '',
        elementid: 'liquidFillMonitorState',
        footcolor: '#28FF28',
        graphcolor: ['#F0FFF0', '#BBFFBB', '#28FF28'],
        borderColor: '#28FF28'
      }
      this.liquidFill(param)
    },
    getAddAlertRunInfo () {
      const param = {
        servername: '新增告警',
        name: this.addAlertdata,
        elementid: 'liquidFillAddAlert',
        footcolor: '#000000',
        graphcolor: ['#E6CAFF', '#BE77FF', '#921AFF'],
        borderColor: '#921AFF'
      }
      this.liquidFill(param)
    },
    getCloseAlertRunInfo () {
      const param = {
        servername: '关闭告警',
        name: '0',
        elementid: 'liquidFillCloseAlert',
        footcolor: '#000000',
        graphcolor: ['#C4E1FF', '#66B3FF', '#0080FF'],
        borderColor: '#0080FF'
      }
      this.liquidFill(param)
    },
    progressformat (percentage) {
      return percentage
    },
    liquidFill (param) { // 方法
      var liquid = this.$echarts.init(document.getElementById(param.elementid))
      liquid.setOption({
        series: [{
          name: param.servername,
          type: 'liquidFill', // 类型
          data: [{
            name: param.name,
            value: 0.1
          }, 0.5, 0.4], // 数据是个数组 数组的每一项的值是0-1
          outline: {
            // show: true, // 是否显示轮廓 布尔值
            borderDistance: 0, // 外部轮廓与图表的距离 数字
            itemStyle: {
              // borderColor:'rgba(255,0,0,0.09)', // 边框的颜色
              borderWidth: 0 // 边框的宽度
              // shadowBlur: 5 , // 外部轮廓的阴影范围 一旦设置了内外都有阴影
              // shadowColor: '#000'  // 外部轮廓的阴影颜色
            }
          },
          label: {
            normal: { // 如果不加normal,则没有效果
              formatter: function (params) {
                // return param.seriesName + '\n' +
                //   param.name + '\n' +
                //   +param.value + '人'
                return params.seriesName + '\n' + '\n' + params.name + '\n' + '\n' + '\n'
              },
              textStyle: {
                color: param.footcolor, // 波浪上文本颜色
                insideColor: param.footcolor, // 波浪内部字体颜色
                fontSize: 14
              }
            }
          },
          backgroundStyle: {
            color: '#FFFFFF', // 图表的背景颜色
            borderWidth: '2', // 图表的边框宽度
            borderColor: param.borderColor, // 图表的边框颜色
            itemStyle: {
              shadowBlur: 100, // 设置无用
              shadowColor: '#f60', // 设置无用
              opacity: 1 // 设置无用
            }
          },
          itemStyle: {
            opacity: 0.5, // 波浪的透明度
            shadowBlur: 10, // 波浪的阴影范围
            shadowColor: param.borderColor// 阴影颜色
          },
          emphasis: {
            itemStyle: {
              opacity: 0.2 // 鼠标经过波浪颜色的透明度
            }
          },
          color: param.graphcolor, // 水波的颜色 对应的是data里面值
          shape: 'circle', // 水填充图的形状 circle默认圆形  rect圆角矩形  triangle三角形  diamond菱形  pin水滴状 arrow箭头状  还可以是svg的path
          center: ['50%', '50%'], // 图表相对于盒子的位置 第一个是水平的位置 第二个是垂直的值 默认是[50%,50%]是在水平和垂直方向居中 可以设置百分比 也可以设置具体值
          radius: '70%', // 图表的大小 值是圆的直径 可以是百分比 也可以是具体值 100%则占满整个盒子 默认是40%; 百分比下是根据宽高最小的一个为参照依据
          amplitude: 8, // 振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
          waveLength: '50%', // 波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
          phase: 0, // 波的相位弧度 默认情况下是自动
          period: (value, index) => { // 控制波的移动速度 可以是函数 也可以是数字 两个参数  value 是data数据里面的值 index 是data值的索引
            return index * 2000
          },
          direction: 'right', // 波移动的速度 两个参数  left 从右往左 right 从左往右
          waveAnimation: true, // 控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
          animationEasing: 'linear', //  初始动画
          animationEasingUpdate: 'quarticInOut', //   数据更新的动画效果
          animationDuration: 3000, //   初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
          animationDurationUpdate: 300 //   数据更新动画的时长

        }]
        // backgroundColor: '#ddd' // 容器背景颜色
      })
    },
    getAddAlertInfo () {
      var starttime = timesMethod.fun_date(0)
      var timefrom = timesMethod.getDatestamp(starttime)
      var endtime = timesMethod.fun_date(1)
      var timetill = timesMethod.getDatestamp(endtime)
      const region = {
        timeFrom: timefrom,
        timeTill: timetill
      }
      this.axios.post(this.$api.main.getAlertdata, region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.addAlertdata = json.data.length
            this.getAddAlertRunInfo()
          } else {
            this.addAlertdata = '0'
            this.getAddAlertRunInfo()
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    getUserInfo () {
      this.axios.post(this.$api.main.getUserInfo).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.userdataNum = json.data.length
            var userExceptionNum = 0
            json.data.forEach(element => {
              if (element.attempt_ip !== '') {
                userExceptionNum += 1
              }
            })
            this.userExceptiondataNum = userExceptionNum
          } else {
            this.userExceptiondataNum = '0'
          }
        } else {
          this.$message({
            message: '查询失败',
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
.queryCenter {
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
}
.templateStyle {
  width: 19%;
  float: left;
  margin-left: 1%;
  margin-top: 0.5%;
}
.templateStyle-one {
  width: 19%;
  float: left;
  margin-left: 0.5%;
  margin-top: 0.5%;
}
.header {
  padding: 0.15rem 1.25rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
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
  width: 20rem;
  height: 40px;
}
.color-disaster {
  color: #fd0000;
}
.color-high {
  color: #fc7303;
}
.color-average {
  color: #fbdd34;
}
.color-warning {
  color: #1f7bff;
}
.color-info {
  color: #d2e9ff;
}
.card-tag-span {
  margin-left: 10px;
  margin-top: -10px;
}
/deep/.card-body {
  padding: 0.1rem;
}
.card-icon-round-system {
  background: rgba(253, 61, 61, 0.2);
}
.card-icon-circular-system {
  background: #fd3d3d;
}
.card-icon-round-network {
  background: rgba(189, 111, 254, 0.2);
}
.card-icon-circular-network {
  background: #bd6ffe;
}
.card-icon-round-hard {
  background: rgba(18, 207, 214, 0.2);
}
.card-icon-circular-hard {
  background: #12cfd6;
}
.card-icon-round-database {
  background: rgba(250, 98, 245, 0.2);
}
.card-icon-circular-database {
  background: #fa62f5;
}
.card-icon-round-web {
  background: rgba(116, 135, 250, 0.2);
}
.card-icon-circular-web {
  background: #7487fa;
}
[class^='card-icon-round-'] {
  position: absolute;
  width: 3.8rem;
  height: 3.8rem;
  right: 10px;
  top: 30%;
  margin-top: -30px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  overflow: hidden;
}
[class^='card-icon-circular-'] {
  position: relative;
  width: 45px;
  height: 45px;
  left: 7.5px;
  top: 7.5px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  overflow: hidden;
  text-align: center;
}
.i-fa {
  display: flex;
  justify-content: center;
  margin-top: 30%;
  color: #ddd;
}
.subtemplateStyle {
  width: 32.33%;
  float: left;
  margin-left: 1%;
  margin-top: 0.5%;
}
.subtemplateStyle-one {
  width: 32.33%;
  float: left;
  margin-left: 0.5%;
  margin-top: 0.5%;
}
.title-bar-description {
  margin-bottom: 0px;
  margin-top: 5px;
}
.header-sub {
  height: 40px;
  width: 100%;
}
.btn-refresh {
  float: right;
  padding: 0px;
  margin-left: 5px;
}
.btn-div {
  margin-top: 5px !important;
  height: 40px;
}
.i-refresh {
  font-size: 18px;
  color: #979899;
  font-weight: 400;
}
.span-date {
  float: right;
  font-size: 14px;
  color: #cccccc;
  font-weight: normal;
}
.i-date {
  margin-right: 5px;
  margin-left: 5px;
  cursor: pointer;
}
.echart {
  width: 100%;
  height: 18rem;
}
.echartliquidFill {
  width: 18rem;
  height: 188px;
  text-align: center;
}
.liquidFilldata {
  text-align: center;
  width: 18rem;
  height: 50px;
}
.width-300 {
  width: 18rem;
}
.width-200-margin {
  width: 12rem;
  margin-top: 20px;
  margin-left: 30px;
}
.width-200 {
  width: 12rem;
}
.height-180 {
  width: 100%;
  height: 180px;
}
.height-110 {
  width: 100%;
  height: 108px;
}
.height-20-margin {
  margin-left: 20px;
  height: 20px;
}
.font-size-padding {
  font-size: 12px;
  padding: 2px;
}
.padding-2 {
  padding: 2.5px;
}
.width-padding {
  width: 12%;
  float: left;
}
.queryalert {
  width: 8rem;
  margin-left: 5rem;
  margin-top: 2rem;
}
.querygetalert {
  width: 8rem;
  margin-left: 10rem;
  margin-top: 2rem;
}
@media screen and (max-width: 1500px) {
  .echartliquidFill {
    width: 10rem;
    height: 188px;
    text-align: center;
  }
  .liquidFilldata {
    text-align: center;
    width: 8rem;
    height: 50px;
    margin-left: 1rem;
  }
  .width-300 {
    width: 10rem;
  }
  .width-200-margin {
    width: 8rem;
    margin-top: 20px;
    margin-left: 30px;
  }
  .width-200 {
    width: 8rem;
  }
  .width-padding {
    width: 60px;
    float: left;
  }
  .echart {
    width: 100%;
    height: 18rem;
  }
  .span-date {
    display: none;
  }
  .card-tag-span {
    margin-left: 2px;
    margin-top: -10px;
  }
  .queryalert {
    width: 6rem;
    margin-left: 1rem;
    margin-top: 2rem;
  }
  .querygetalert {
    width: 6rem;
    margin-left: 4rem;
    margin-top: 2rem;
  }
}
</style>
