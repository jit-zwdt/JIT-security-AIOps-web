<template>
  <div>
    <div>
      <div class="templateStyle-one">
        <template>
          <div class="card">
            <div class="header">
              <div class="queryleft">
                <h1 class="title-bar-title m-b-sm">
                  <span class="d-ib">10</span>
                </h1>
                <div>
                  <p class="title-bar-description">
                    <span>操作系统</span>
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
                <i class="fa fa-bell color-danger"></i>
                7
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-warning"></i>
                0
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-info"></i>
                1
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-primary"></i>
                2
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
                <h1 class="title-bar-title m-b-sm">
                  <span class="d-ib">3</span>
                </h1>
                <div>
                  <p class="title-bar-description">
                    <span>网络设备</span>
                  </p>
                </div>
              </div>
              <div class="card-icon-round-network queryright">
                <div class="card-icon-circular-network">
                  <i class="fa fa-rss-square i-fa"></i>
                </div>
              </div>
            </div>
            <div class="tempList card-body">
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-danger"></i>
                2
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-warning"></i>
                0
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-info"></i>
                1
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-primary"></i>
                0
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
                <h1 class="title-bar-title m-b-sm">
                  <span class="d-ib">12</span>
                </h1>
                <div>
                  <p class="title-bar-description">
                    <span>硬件</span>
                  </p>
                </div>
              </div>
              <div class="card-icon-round-hard queryright">
                <div class="card-icon-circular-hard">
                  <i class="fa fa-server i-fa"></i>
                </div>
              </div>
            </div>
            <div class="tempList card-body">
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-danger"></i>
                3
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-warning"></i>
                2
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-info"></i>
                7
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-primary"></i>
                0
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
                <h1 class="title-bar-title m-b-sm">
                  <span class="d-ib">4</span>
                </h1>
                <div>
                  <p class="title-bar-description">
                    <span>数据库</span>
                  </p>
                </div>
              </div>
              <div class="card-icon-round-database queryright">
                <div class="card-icon-circular-database">
                  <i class="fa fa-stack-exchange i-fa"></i>
                </div>
              </div>
            </div>
            <div class="tempList card-body">
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-danger"></i>
                0
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-warning"></i>
                0
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-info"></i>
                1
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-primary"></i>
                3
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
                <h1 class="title-bar-title m-b-sm">
                  <span class="d-ib">6</span>
                </h1>
                <div>
                  <p class="title-bar-description">
                    <span>WEB</span>
                  </p>
                </div>
              </div>
              <div class="card-icon-round-web queryright">
                <div class="card-icon-circular-web">
                  <i class="fa fa-internet-explorer i-fa"></i>
                </div>
              </div>
            </div>
            <div class="tempList card-body">
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-danger"></i>
                0
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-warning"></i>
                0
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-info"></i>
                0
              </span>
              <span class="card-tag card-tag-span">
                <i class="fa fa-bell color-primary"></i>
                6
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
              <div class="queryleft" style="width:300px">
                <div id="liquidFillMonitorState" class="echartliquidFill"></div>
                <div class="liquidFilldata">
                  <i class="fa fa-certificate" style="color:#F87B27"></i> 用户总数 :
                  <span class="list-count" style="color:#F87B27">1</span>
                </div>
                <div class="liquidFilldata">
                  <i class="fa fa-certificate" style="color:#08DFAF"></i> 线上用户 :
                  <span class="list-count" style="color:#08DFAF">1</span>
                </div>
              </div>
              <div class="queryleft" style="width:200px;margin-top:20px;margin-left:30px">
                <div class="liquidFilldata" style="text-align:left">
                  <i class="fa el-icon-s-operation" style="color:#08DFAF"></i> 监控列表
                </div>
                <div class="liquidFilldata" style="text-align:left">
                  <i class="fa el-icon-s-operation" style="color:#08DFAF"></i> 未恢复告警
                </div>
                <div class="liquidFilldata" style="text-align:left">
                  <i class="fa el-icon-s-operation" style="color:#08DFAF"></i> 新增对象
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
              <div style="width:100%;height:180px">
                <div class="queryleft" style="width:300px">
                  <div id="liquidFillAddAlert" class="echartliquidFill"></div>
                </div>
                <div class="queryleft" style="width:200px;">
                  <div id="liquidFillCloseAlert" class="echartliquidFill"></div>
                </div>
              </div>
              <div style="width:100%;height:110px">
                <div style="margin-left:20px;height:20px">
                  <div style="width:12%;float:left">
                    <div style="font-size:12px;padding: 2px;">发出通知</div>
                    <div style="font-size:12px;padding: 2px;">IM通知</div>
                    <div style="font-size:12px;padding: 2px;">邮箱通知</div>
                    <div style="font-size:12px;padding: 2px;">短信通知</div>
                  </div>
                  <div style="width:80%;float:left">
                    <el-progress :percentage="2" :format="progressformat" color="#28FF28" style="padding: 2.5px;"></el-progress>
                    <el-progress :percentage="4" :format="progressformat" color="#28FF28" style="padding: 2.5px;"></el-progress>
                    <el-progress :percentage="1" :format="progressformat" color="#28FF28" style="padding: 2.5px;"></el-progress>
                    <el-progress :percentage="7" :format="progressformat" color="#28FF28" style="padding: 2.5px;"></el-progress>
                  </div>
                </div>
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
export default {
  data () {
    return {
      show: false,
      itemsloading: '',
      currentTime: '', // 获取当前时间
      cpuRateTop5: [],
      setTimeoutItems: ''
    }
  },
  created () {
    this.currentTimefunction()
  },
  mounted () {
    this.getcpuRateTop5ByItem()
    this.getmemoryTop5ByItem()
    this.getioRateTop5ByItem()
    this.getNeiWorkTop5ByItem()
    this.getMonitorStateRunInfo()
    this.getAddAlertRunInfo()
    this.getCloseAlertRunInfo()
  },
  methods: {
    currentTimefunction () {
      this.timer = setInterval(this.getDate, 500)
    },
    getDate () {
      this.currentTime = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
    },
    getcpuRateTop5ByItem () {
      const param = {
        typeId: '1',
        itemKey: '2',
        valueType: '0',
        method: 'top5ByItem'
      }
      this.axios.post('/top5/getTop5Msg', param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.cpuRateTop5 = json.data
            this.getItemsData('chartsOne')
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
      this.memoryloading = true
      const param = {
        typeId: '1',
        itemKey: '3',
        valueType: '0',
        method: 'top5ByItem'
      }
      this.axios.post('/top5/getTop5Msg', param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            console.log(json.data)
            this.memoryTop5 = json.data
            this.getItemsData('chartsTwo')
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
      this.getItemsData('chartsThree')
    },
    getNeiWorkTop5ByItem () {
      this.getItemsData('chartsFour')
    },
    getItemsData (id) {
      var pieCharts = document.getElementById(id)
      var pieEcharts = document.getElementById('pieEcharts')
      console.log(pieEcharts.clientWidth)
      pieCharts.style.width = pieEcharts.clientWidth / 3 - 20 + 'px'
      const myChart = echarts.init(pieCharts)
      if (id === 'chartsOne') {
        const returndataclock = []
        const returndataavg = []
        this.cpuRateTop5.forEach(element => {
          returndataclock.push(element.hostName)
          returndataavg.push(element.value)
        })
        // 绘制图表
        // myChart.setOption({
        //   xAxis: {
        //     type: 'category',
        //     data: returndataclock,
        //     // 设置字体倾斜
        //     axisLabel: {
        //       interval: 0,
        //       rotate: 45, // 倾斜度-90至90默认为0
        //       margin: 2,
        //       textStyle: {
        //         fontWeight: 'bolder',
        //         color: '#000000',
        //         fontSize: '7'
        //       }
        //     }
        //   },
        //   yAxis: {
        //     type: 'value'
        //   },
        //   tooltip: {
        //     trigger: 'axis'
        //   },
        //   series: [{
        //     data: returndataavg,
        //     type: 'line'
        //   }]
        // })
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
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
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '邮件营销',
              type: 'bar',
              stack: '广告',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'bar',
              stack: '广告',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'bar',
              stack: '广告',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '搜索引擎',
              type: 'bar',
              data: [862, 1018, 964, 1026, 1679, 1600, 1570],
              markLine: {
                lineStyle: {
                  type: 'dashed'
                },
                data: [
                  [{ type: 'min' }, { type: 'max' }]
                ]
              }
            },
            {
              name: '百度',
              type: 'bar',
              barWidth: 5,
              stack: '搜索引擎',
              data: [620, 732, 701, 734, 1090, 1130, 1120]
            },
            {
              name: '谷歌',
              type: 'bar',
              stack: '搜索引擎',
              data: [120, 132, 101, 134, 290, 230, 220]
            },
            {
              name: '必应',
              type: 'bar',
              stack: '搜索引擎',
              data: [60, 72, 71, 74, 190, 130, 110]
            },
            {
              name: '其他',
              type: 'bar',
              stack: '搜索引擎',
              data: [62, 82, 91, 84, 109, 110, 120]
            }
          ]
        })
      } else if (id === 'chartsTwo') {
        const returndataclock = []
        const returndataavg = []
        this.memoryTop5.forEach(element => {
          returndataclock.push(element.hostName)
          returndataavg.push(element.value)
        })
        myChart.setOption({
          title: {
            text: ''
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
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
              boundaryGap: false,
              data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '直接访问',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'top'
                }
              },
              areaStyle: {},
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        })
      } else if (id === 'chartsThree') {
        myChart.setOption({
          title: {
            text: '南丁格尔玫瑰图',
            subtext: '纯属虚构',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            left: 'center',
            top: 'bottom',
            data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
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
              radius: [20, 110],
              center: ['25%', '50%'],
              roseType: 'radius',
              label: {
                show: false
              },
              emphasis: {
                label: {
                  show: true
                }
              },
              data: [
                { value: 10, name: 'rose1' },
                { value: 5, name: 'rose2' },
                { value: 15, name: 'rose3' },
                { value: 25, name: 'rose4' },
                { value: 20, name: 'rose5' },
                { value: 35, name: 'rose6' },
                { value: 30, name: 'rose7' },
                { value: 40, name: 'rose8' }
              ]
            },
            {
              name: '面积模式',
              type: 'pie',
              radius: [30, 110],
              center: ['75%', '50%'],
              roseType: 'area',
              data: [
                { value: 10, name: 'rose1' },
                { value: 5, name: 'rose2' },
                { value: 15, name: 'rose3' },
                { value: 25, name: 'rose4' },
                { value: 20, name: 'rose5' },
                { value: 35, name: 'rose6' },
                { value: 30, name: 'rose7' },
                { value: 40, name: 'rose8' }
              ]
            }
          ]
        })
      } else if (id === 'chartsFour') {
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 10,
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
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
              data: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 234, name: '联盟广告' },
                { value: 135, name: '视频广告' },
                { value: 1548, name: '搜索引擎' }
              ]
            }
          ]
        })
      }
      if (this.itemsloading !== '') {
        this.itemsloading.close()
      }
      this.setTimeoutItems = ''
    },
    refreshItems (id) {
      if (this.setTimeoutItems === '') {
        const _this = this
        this.openloading(id)
        this.setTimeoutItems = window.setTimeout(() => { _this.getItemsData(id) }, 300)
      }
    },
    openloading (id) {
      this.itemsloading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)',
        target: document.querySelector('#' + id) // 指定区域
      })
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
        name: '0',
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
  width: 200px;
  height: 40px;
}
.color-danger {
  color: #fd0000;
}
.color-warning {
  color: #fc7303;
}
.color-info {
  color: #fbdd34;
}
.color-primary {
  color: #1f7bff;
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
  width: 60px;
  height: 60px;
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
  height: 290px;
}
.echartliquidFill {
  width: 100%;
  height: 190px;
  text-align: center;
}
.liquidFilldata {
  text-align: center;
  width: 100%;
  height: 50px;
}
</style>
