<template>
  <div class="headerbackground">
    <header class="header_index">一体化智能运维管理平台</header>
    <div class="container-cus">
      <div class="row_index">
        <div class="col-lg-3">
          <div class="box1">
            <div class="title_index">问题类别占比</div>
            <div class="box1_con" id="myChart1"></div>
          </div>
          <div class="box2 m-20">
            <div class="title_index">常见问题排名</div>
            <div class="box2_con" id="myChart2"></div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="box3">
            <div class="title_index">运维指数</div>
            <div class="box3_con">
              <div class="box3_con_left" id="liquidFillrun">
                <small class="small_index">优</small>
              </div>
              <div class="div_cut_off_rule">
                <table
                  border="1px"
                  cellpadding="0"
                  cellspacing="0"
                  class="table_cut_off_rule"
                ></table>
              </div>
              <div class="box3_con_right">
                <div class="box3_con_right_top">
                  <div class="con_right_top">
                    <small>总设备：82台</small>
                  </div>
                  <div class="con_right_top">
                    <small>总CPU：100hz</small>
                  </div>
                  <div class="con_right_top">
                    <small>总内存：150T</small>
                  </div>
                </div>
                <div class="box3_con_right_bot">
                  <div class="row_index row_table">
                    <div class="data_bg">
                      <p>14台</p>
                      <small>操作系统</small>
                    </div>
                    <div class="data_bg">
                      <p>5台</p>
                      <small>数据库</small>
                    </div>
                    <div class="data_bg">
                      <p>5台</p>
                      <small>中间件</small>
                    </div>
                    <div class="data_bg">
                      <p>2台</p>
                      <small>网络设备</small>
                    </div>
                    <div class="data_bg">
                      <p>6台</p>
                      <small>硬件设备</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="box4 m-20">
            <div class="title_index">问题列表</div>
            <div class="box4_con" id="box4">
              <el-table
                :data="tableData"
                :default-sort="{ prop: 'date', order: 'descending' }"
              >
                <el-table-column prop="date" label="日期" sortable width="180">
                </el-table-column>
                <el-table-column prop="name" label="名称" sortable width="auto">
                </el-table-column>
                <el-table-column
                  prop="type"
                  label="级别"
                  width="100"
                  :formatter="formattertype"
                >
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="col-lg-3">
          <div class="box5">
            <div class="title_index">设备异常服务器TOP10</div>
            <div class="box5_con_top" id="myChart3"></div>
            <div class="box5_con">
              <div class="title_index m-20">设备参数运行TOP5</div>
              <div class="queryCon">
                <div class="box5_con_bot queryleft" id="myChart4"></div>
                <div class="box5_con_bot queryleft" id="myChart5"></div>
              </div>
              <div class="queryCon">
                <div class="box5_con_bot queryleft" id="myChart6"></div>
                <div class="box5_con_bot queryleft" id="myChart7"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import 'echarts-liquidfill'
// import { timesMethod } from '@/utils/formatDate.js'
export default {
  data () {
    return {
      show: false,
      conheight: {
        height: '',
        width: ''
      },
      tableData: [{
        date: '2020-10-21 15:41:16',
        name: 'jvm1 is not reachable',
        type: 3
      }, {
        date: '2020-10-21 12:11:45',
        name: 'Tomcat0723 is not reachable',
        type: 4
      }, {
        date: '2020-10-21 09:06:55',
        name: '[主机]Linux1020的主动监控模式无法及时采集到数据',
        type: 5
      }, {
        date: '2020-10-20 13:56:02',
        name: 'Zabbix unreachable poller processes more than 75% busy',
        type: 3
      }]
    }
  },
  created () {
    window.addEventListener('resize', this.getResize)
    this.getResize()
  },
  mounted () {
    this.showInfo()
  },
  methods: {
    getResize () {
      this.conheight.height = document.body.clientHeight - 151 + 'px'
      this.conheight.width = document.body.clientWidth - 8 + 'px'
    },
    showInfo () {
      //   this.axios.post(this.$api.main.getMonitorTypeUsedInfo).then((resp) => {
      //     if (resp.status === 200) {
      //       var json = resp.data
      //       if (json.code === 1) {
      //         json.data.forEach(element => {
      //         })
      //       }
      //     } else {
      //       this.$message({
      //         message: '查询失败',
      //         type: 'error'
      //       })
      //     }
      //   })
      // }
      this.makeData1()
      this.makeData2()
      this.makeData3()
      this.makeData4()
      this.makeData5()
      this.makeData6()
      // this.getOperationRunInfo()
      this.paly()
    },
    makeData1 () {
      const pieCharts = document.getElementById('myChart1')
      const myChart = this.$echarts.init(pieCharts)
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          x: '100rem',
          y: '50rem',
          orient: 'vertical',
          left: 'left',
          data: ['信息', '警告', '一般严重', '严重', '灾难'],
          textStyle: {
            fontSize: 10,
            color: []
          }
        },
        color: ['rgb(129, 192, 192)', 'rgb(255, 211, 6)', 'rgb(234, 117, 0)', 'rgb(255, 32, 32)', 'rgb(128, 0, 0)'],
        series: [
          {
            name: '情况',
            type: 'pie',
            radius: '65%',
            center: ['60%', '40%'],
            data: [
              { value: 5, name: '信息' },
              { value: 2, name: '警告' },
              { value: 1, name: '一般严重' },
              { value: 0, name: '严重' },
              { value: 0, name: '灾难' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                normal: {
                  color: function (params) {
                    var colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622']
                    return colorList[params.dataIndex]
                  }
                }
              }
            },
            label: {
              normal: {
                position: 'inner',
                show: false
              }
            }
          }
        ]
      })
    },
    makeData2 () {
      const pieCharts = document.getElementById('myChart2')
      const myChart = this.$echarts.init(pieCharts)
      const data = {
        xData: ['jvm1 is not reachable', 'tomcat0915 is not reachable', 'Tomcat0723 is not reachable', '[主机]Linux1020的主动监控模式无法及时采集到数据', '[主机]测试20201016的主动监控模式无法及时采集到数据'],
        yData: [23, 22, 18, 12, 9],
        color: ['#6699FF', '#006699', '#4cabce', '#138CEB', '#77DDFF']
      }
      const namedata = [{
        name: '',
        data: data.yData,
        type: 'bar',
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#555'
          },
          normal: {
            show: false
          }
        },
        barWidth: '50%',
        itemStyle: {
          normal: {
            color: (params) => {
              const colors = data.color
              return colors[params.dataIndex]
            }
          }
        },
        xAxisIndex: 0,
        yAxisIndex: 0
      }, {
        data: [{
          name: data.xData[0],
          value: 1
        }],
        name: data.xData[0],
        label: {
          show: false,
          position: 'inside',
          formatter: '{b}',
          offset: [0, 10],
          textStyle: {
            color: '#FFFFFF'
          }
        },
        type: 'bar',
        barGap: 0,
        barWidth: '20%',
        itemStyle: {
          normal: {
            color: data.color[0]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        data: [{
          name: data.xData[1],
          value: 1
        }],
        name: data.xData[1],
        label: {
          show: false,
          position: 'inside',
          formatter: '{b}',
          offset: [0, 10],
          textStyle: {
            color: '#FFFFFF'
          }
        },
        type: 'bar',
        barGap: 0,
        barWidth: '20%',
        itemStyle: {
          normal: {
            color: data.color[1]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        data: [{
          name: data.xData[2],
          value: 1
        }],
        name: data.xData[2],
        label: {
          show: false,
          position: 'inside',
          formatter: '{b}',
          offset: [0, 10],
          textStyle: {
            color: '#FFFFFF'
          }
        },
        type: 'bar',
        barGap: 0,
        barWidth: '20%',
        itemStyle: {
          normal: {
            color: data.color[2]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        data: [{
          name: data.xData[3],
          value: 1
        }],
        name: data.xData[3],
        label: {
          show: false,
          position: 'inside',
          formatter: '{b}',
          offset: [0, 10],
          textStyle: {
            color: '#FFFFFF'
          }
        },
        type: 'bar',
        barGap: 0,
        barWidth: '20%',
        itemStyle: {
          normal: {
            color: data.color[3]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        data: [{
          name: data.xData[4],
          value: 1
        }],
        name: data.xData[4],
        label: {
          show: false,
          position: 'inside',
          formatter: '{b}',
          offset: [0, 10],
          textStyle: {
            color: '#FFFFFF'
          }
        },
        type: 'bar',
        barGap: 0,
        barWidth: '20%',
        itemStyle: {
          normal: {
            color: data.color[4]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }]
      myChart.setOption({
        legend: {
          top: '2%',
          data: data.xData,
          textStyle: {
            fontSize: 12,
            color: []
          }
        },
        grid: [
          {
            top: 150,
            bottom: 20
          },
          {
            height: 0,
            bottom: 0
          }
        ],
        xAxis: [{
          type: 'category',
          data: data.yData,
          gridIndex: 0,
          axisLabel: {
            color: '#3eb2e8'
          },
          axisLine: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          zlevel: 1,
          show: true
        }, {
          type: 'category',
          gridIndex: 1,
          axisLine: {
            show: false
          },
          zlevel: 1
        }],
        yAxis: [{
          type: 'value',
          gridIndex: 0,
          axisLabel: {
            color: '#3eb2e8',
            formatter: '{value} 个'
          },
          axisLine: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#4784e8'
            }
          }
        }, {
          type: 'value',
          gridIndex: 1,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        }],
        series: namedata
      })
    },
    makeData3 () {
    },
    makeData4 () {
    },
    makeData5 () {
      const pieCharts = document.getElementById('myChart3')
      const myChart = this.$echarts.init(pieCharts)
      const data = {
        xData: ['Linux1020', 'tomcat0915', 'Tomcat0723', 'Linux1021', '测试20201016', 'jvm1', 'tomcat0919', 'Tomcat0726', 'Linux1024', '测试20201020'],
        yData: [23, 22, 21, 20, 19, 17, 15, 12, 10, 9],
        color: ['#6699FF', '#006699', '#4cabce', '#138CEB', '#77DDFF', '#40E0D0', '#87CECB', '#B0E0E6', '#AFEEEE', '#E0FFFF']
      }
      const namedata = [{
        name: '',
        data: data.yData,
        type: 'bar',
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#555'
          },
          normal: {
            show: false
          }
        },
        barWidth: '50%',
        itemStyle: {
          normal: {
            color: (params) => {
              const colors = data.color
              return colors[params.dataIndex]
            }
          }
        },
        xAxisIndex: 0,
        yAxisIndex: 0
      }, {
        name: data.xData[0],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[0]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[1],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[1]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[2],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[2]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[3],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[3]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[4],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[4]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[5],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[5]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[6],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[6]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[7],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[7]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[8],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[8]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[9],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[9]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }]
      myChart.setOption({
        legend: {
          top: '2%',
          data: data.xData,
          textStyle: {
            fontSize: 12,
            color: []
          }
        },
        grid: [
          {
            top: 100,
            bottom: 20
          },
          {
            height: 0,
            bottom: 0
          }
        ],
        xAxis: [{
          type: 'category',
          data: data.yData,
          gridIndex: 0,
          axisLabel: {
            color: '#3eb2e8'
          },
          axisLine: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          zlevel: 1,
          show: true
        }, {
          type: 'category',
          gridIndex: 1,
          axisLine: {
            show: false
          },
          zlevel: 1
        }],
        yAxis: [{
          type: 'value',
          gridIndex: 0,
          axisLabel: {
            color: '#3eb2e8',
            formatter: '{value} 次'
          },
          axisLine: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#4784e8'
            }
          }
        }, {
          type: 'value',
          gridIndex: 1,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        }],
        series: namedata
      })
    },
    makeData6 () {
      this.makeData6_1()
      this.makeData6_2()
      this.makeData6_3()
      this.makeData6_4()
    },
    makeData6_1 () {
      const pieCharts = document.getElementById('myChart4')
      const myChart = this.$echarts.init(pieCharts)
      const data = {
        xData: ['Linux1020', 'tomcat0915', 'Tomcat0723', 'Linux1021', '测试20201016'],
        yData: [23, 22, 21, 20, 19],
        color: ['#6699FF', '#006699', '#4cabce', '#138CEB', '#77DDFF']
      }
      const namedata = [{
        name: '',
        data: data.yData,
        type: 'bar',
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#555'
          },
          normal: {
            show: false
          }
        },
        barWidth: '50%',
        itemStyle: {
          normal: {
            color: (params) => {
              const colors = data.color
              return colors[params.dataIndex]
            }
          }
        },
        xAxisIndex: 0,
        yAxisIndex: 0
      }, {
        name: data.xData[0],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[0]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[1],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[1]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[2],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[2]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[3],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[3]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[4],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[4]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }]
      myChart.setOption({
        title: {
          text: 'CPU',
          x: 'center',
          textStyle: {
            color: '#17a2b8',
            fontSize: '16',
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: 'rgba(0, 255, 233,0)'
            }
          },
          formatter: function (params, ticket, callback) {
            var res = '<span style="font-size:22px;color:' + data.color[0] + '">' + ' ● ' + '</span>' + ' 1：' + data.xData[0] + '<br>'
            res = res + '<span style="font-size:22px;color:' + data.color[1] + '">' + ' ● ' + '</span>' + ' 2：' + data.xData[1] + '<br>'
            res = res + '<span style="font-size:22px;color:' + data.color[2] + '">' + ' ● ' + '</span>' + ' 3：' + data.xData[2] + '<br>'
            res = res + '<span style="font-size:22px;color:' + data.color[3] + '">' + ' ● ' + '</span>' + ' 4：' + data.xData[3] + '<br>'
            res = res + '<span style="font-size:22px;color:' + data.color[4] + '">' + ' ● ' + '</span>' + ' 5：' + data.xData[4] + '<br>'
            return res
          }
        },
        grid: [
          {
            top: 30,
            bottom: 20,
            left: 40
          },
          {
            height: 0,
            bottom: 0
          }
        ],
        xAxis: [{
          type: 'category',
          data: data.yData,
          gridIndex: 0,
          axisLabel: {
            color: '#3eb2e8'
          },
          axisLine: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          zlevel: 1,
          show: true
        }, {
          type: 'category',
          gridIndex: 1,
          axisLine: {
            show: false
          },
          zlevel: 1
        }],
        yAxis: [{
          type: 'value',
          gridIndex: 0,
          axisLabel: {
            color: '#3eb2e8',
            formatter: '{value} 次'
          },
          axisLine: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#4784e8'
            }
          }
        }, {
          type: 'value',
          gridIndex: 1,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        }],
        series: namedata
      })
    },
    makeData6_2 () {
      const pieCharts = document.getElementById('myChart5')
      const myChart = this.$echarts.init(pieCharts)
      const data = {
        xData: ['Linux1020', 'tomcat0915', 'Tomcat0723', 'Linux1021', '测试20201016'],
        yData: [23, 22, 21, 20, 19],
        color: ['#6699FF', '#006699', '#4cabce', '#138CEB', '#77DDFF']
      }
      const namedata = [{
        name: '',
        data: data.yData,
        type: 'bar',
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#555'
          },
          normal: {
            show: false
          }
        },
        barWidth: '50%',
        itemStyle: {
          normal: {
            color: (params) => {
              const colors = data.color
              return colors[params.dataIndex]
            }
          }
        },
        xAxisIndex: 0,
        yAxisIndex: 0
      }, {
        name: data.xData[0],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[0]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[1],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[1]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[2],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[2]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[3],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[3]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[4],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[4]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }]
      myChart.setOption({
        title: {
          text: '内存',
          x: 'center',
          textStyle: {
            color: '#17a2b8',
            fontSize: '16',
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: 'rgba(0, 255, 233,0)'
            }
          },
          formatter: function (params, ticket, callback) {
            var res = '<span style="font-size:22px;color:' + data.color[0] + '">' + ' ● ' + '</span>' + ' 1：' + data.xData[0] + '<br>'
            res = res + '<span style="font-size:22px;color:' + data.color[1] + '">' + ' ● ' + '</span>' + ' 2：' + data.xData[1] + '<br>'
            res = res + '<span style="font-size:22px;color:' + data.color[2] + '">' + ' ● ' + '</span>' + ' 3：' + data.xData[2] + '<br>'
            res = res + '<span style="font-size:22px;color:' + data.color[3] + '">' + ' ● ' + '</span>' + ' 4：' + data.xData[3] + '<br>'
            res = res + '<span style="font-size:22px;color:' + data.color[4] + '">' + ' ● ' + '</span>' + ' 5：' + data.xData[4] + '<br>'
            return res
          }
        },
        grid: [
          {
            top: 30,
            bottom: 20,
            left: 40
          },
          {
            height: 0,
            bottom: 0
          }
        ],
        xAxis: [{
          type: 'category',
          data: data.yData,
          gridIndex: 0,
          axisLabel: {
            color: '#3eb2e8'
          },
          axisLine: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          zlevel: 1,
          show: true
        }, {
          type: 'category',
          gridIndex: 1,
          axisLine: {
            show: false
          },
          zlevel: 1
        }],
        yAxis: [{
          type: 'value',
          gridIndex: 0,
          axisLabel: {
            color: '#3eb2e8',
            formatter: '{value} 次'
          },
          axisLine: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#4784e8'
            }
          }
        }, {
          type: 'value',
          gridIndex: 1,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        }],
        series: namedata
      })
    },
    makeData6_3 () {
      const pieCharts = document.getElementById('myChart6')
      const myChart = this.$echarts.init(pieCharts)
      const data = {
        xData: ['Linux1020', 'tomcat0915', 'Tomcat0723', 'Linux1021', '测试20201016'],
        yData: [23, 22, 21, 20, 19],
        color: ['#6699FF', '#006699', '#4cabce', '#138CEB', '#77DDFF']
      }
      const namedata = [{
        name: '',
        data: data.yData,
        type: 'bar',
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#555'
          },
          normal: {
            show: false
          }
        },
        barWidth: '50%',
        itemStyle: {
          normal: {
            color: (params) => {
              const colors = data.color
              return colors[params.dataIndex]
            }
          }
        },
        xAxisIndex: 0,
        yAxisIndex: 0
      }, {
        name: data.xData[0],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[0]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[1],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[1]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[2],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[2]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[3],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[3]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[4],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[4]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }]
      myChart.setOption({
        title: {
          text: '磁盘',
          x: 'center',
          textStyle: {
            color: '#17a2b8',
            fontSize: '16',
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: 'rgba(0, 255, 233,0)'
            }
          },
          formatter: function (params, ticket, callback) {
            var res = '<span style="font-size:22px;color:' + data.color[0] + '">' + ' ● ' + '</span>' + ' 1：' + data.xData[0] + '<br>'
            res = res + '<span style="font-size:22px;color:' + data.color[1] + '">' + ' ● ' + '</span>' + ' 2：' + data.xData[1] + '<br>'
            res = res + '<span style="font-size:22px;color:' + data.color[2] + '">' + ' ● ' + '</span>' + ' 3：' + data.xData[2] + '<br>'
            res = res + '<span style="font-size:22px;color:' + data.color[3] + '">' + ' ● ' + '</span>' + ' 4：' + data.xData[3] + '<br>'
            res = res + '<span style="font-size:22px;color:' + data.color[4] + '">' + ' ● ' + '</span>' + ' 5：' + data.xData[4] + '<br>'
            return res
          }
        },
        grid: [
          {
            top: 30,
            bottom: 20,
            left: 40
          },
          {
            height: 0,
            bottom: 0
          }
        ],
        xAxis: [{
          type: 'category',
          data: data.yData,
          gridIndex: 0,
          axisLabel: {
            color: '#3eb2e8'
          },
          axisLine: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          zlevel: 1,
          show: true
        }, {
          type: 'category',
          gridIndex: 1,
          axisLine: {
            show: false
          },
          zlevel: 1
        }],
        yAxis: [{
          type: 'value',
          gridIndex: 0,
          axisLabel: {
            color: '#3eb2e8',
            formatter: '{value} 次'
          },
          axisLine: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#4784e8'
            }
          }
        }, {
          type: 'value',
          gridIndex: 1,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        }],
        series: namedata
      })
    },
    makeData6_4 () {
      const pieCharts = document.getElementById('myChart7')
      const myChart = this.$echarts.init(pieCharts)
      const data = {
        xData: ['Linux1020', 'tomcat0915', 'Tomcat0723', 'Linux1021', '测试20201016'],
        yData: [23, 22, 21, 20, 19],
        color: ['#6699FF', '#006699', '#4cabce', '#138CEB', '#77DDFF']
      }
      const namedata = [{
        name: '',
        data: data.yData,
        type: 'bar',
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#555'
          },
          normal: {
            show: false
          }
        },
        barWidth: '50%',
        itemStyle: {
          normal: {
            color: (params) => {
              const colors = data.color
              return colors[params.dataIndex]
            }
          }
        },
        xAxisIndex: 0,
        yAxisIndex: 0
      }, {
        name: data.xData[0],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[0]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[1],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[1]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[2],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[2]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[3],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[3]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }, {
        name: data.xData[4],
        type: 'bar',
        itemStyle: {
          normal: {
            color: data.color[4]
          }
        },
        xAxisIndex: 1,
        yAxisIndex: 1
      }]
      myChart.setOption({
        title: {
          text: '网络接口速率',
          x: 'center',
          textStyle: {
            color: '#17a2b8',
            fontSize: '16',
            fontWeight: 'bold'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: 'rgba(0, 255, 233,0)'
            }
          },
          formatter: function (params, ticket, callback) {
            var res = '<span style="font-size:22px;color:' + data.color[0] + '">' + ' ● ' + '</span>' + ' 1：' + data.xData[0] + '<br>'
            res = res + '<span style="font-size:22px;color:' + data.color[1] + '">' + ' ● ' + '</span>' + ' 2：' + data.xData[1] + '<br>'
            res = res + '<span style="font-size:22px;color:' + data.color[2] + '">' + ' ● ' + '</span>' + ' 3：' + data.xData[2] + '<br>'
            res = res + '<span style="font-size:22px;color:' + data.color[3] + '">' + ' ● ' + '</span>' + ' 4：' + data.xData[3] + '<br>'
            res = res + '<span style="font-size:22px;color:' + data.color[4] + '">' + ' ● ' + '</span>' + ' 5：' + data.xData[4] + '<br>'
            return res
          }
        },
        grid: [
          {
            top: 30,
            bottom: 20,
            left: 40
          },
          {
            height: 0,
            bottom: 0
          }
        ],
        xAxis: [{
          type: 'category',
          data: data.yData,
          gridIndex: 0,
          axisLabel: {
            color: '#3eb2e8'
          },
          axisLine: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          zlevel: 1,
          show: true
        }, {
          type: 'category',
          gridIndex: 1,
          axisLine: {
            show: false
          },
          zlevel: 1
        }],
        yAxis: [{
          type: 'value',
          gridIndex: 0,
          axisLabel: {
            color: '#3eb2e8',
            formatter: '{value} 次'
          },
          axisLine: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          axisTick: {
            lineStyle: {
              color: '#3eb2e8'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#4784e8'
            }
          }
        }, {
          type: 'value',
          gridIndex: 1,
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        }],
        series: namedata
      })
    },
    getOperationRunInfo () {
      const param = {
        servername: '运行情况',
        name: '优',
        elementid: 'liquidFillrun',
        footcolor: '#000000',
        graphcolor: ['#C4E1FF', '#66B3FF', '#0080FF'],
        borderColor: '#0080FF'
      }
      this.liquidFill(param)
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
            color: '#00FF00', // 图表的背景颜色
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
          center: ['40%', '50%'], // 图表相对于盒子的位置 第一个是水平的位置 第二个是垂直的值 默认是[50%,50%]是在水平和垂直方向居中 可以设置百分比 也可以设置具体值
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
    formattertype (row) {
      var name = ''
      switch (row.type) {
        case 1:
          name = '信息'
          break
        case 2:
          name = '警告'
          break
        case 3:
          name = '一般严重'
          break
        case 4:
          name = '严重'
          break
        case 5:
          name = '灾难'
          break
      }
      return name
    },
    change () {
      this.tableData.push(this.tableData[0])
      this.tableData.shift()
    },
    paly () {
      setInterval(this.change, 2000)
    }
  },
  actions: {
  },
  components: {}
}
</script>
<style lang="scss" scoped>
// .queryleft {
//   float: left;
//   width: 50%;
//   height: 11rem;
// }
// .queryright {
//   float: right;
// }
.queryCenter {
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
}
.headerbackground {
  // padding: 0px;
  background: url('~@/assets/img/bg_body.jpg') no-repeat;
  background-size: 100% 100%;
  width: 100%;
}
/deep/ .el-table .el-table__body {
  width: 100% !important;
}
@import '~@/assets/css/index.css';
</style>
