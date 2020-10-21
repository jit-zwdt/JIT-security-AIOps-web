<template>
  <div class="headerbackground" :style="conheight">
    <header>大数据统计展示大屏</header>
    <div class="container m-20">
      <div class="row">
        <div class="col-lg-3">
          <div class="box1">
            <div class="title">问题类别占比</div>
            <div class="box1_con" id="myChart1"></div>
          </div>
          <div class="box2 m-20">
            <div class="title">常见问题排名</div>
            <div class="box2_con" id="myChart2"></div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="box3">
            <div class="title">运维指数</div>
            <div class="box3_con">
              <div class="box3_con_left" id="box3_left"></div>
              <div class="box3_con_right">
                <div class="box3_con_right_top">
                  <div class="row row_table">
                    <div class="col-lg-4 data_bg">
                      <p>12569台</p>
                      <small>设备总数</small>
                    </div>
                    <div class="col-lg-4 data_bg">
                      <p>12375台</p>
                      <small>运行设备</small>
                    </div>
                    <div class="col-lg-4 data_bg">
                      <p>178台</p>
                      <small>月修设备</small>
                    </div>
                    <div class="col-lg-44 data_bg_4">
                      <p>178台</p>
                      <small>月修设备</small>
                    </div>
                    <div class="col-lg-44 data_bg_4">
                      <p>178台</p>
                      <small>月修设备</small>
                    </div>
                  </div>
                </div>
                <div class="box3_con_right_bot" id="box3_right"></div>
              </div>
            </div>
          </div>
          <div class="box4 m-20">
            <div class="title">问题列表</div>
            <div class="box4_con" id="box4"></div>
          </div>
        </div>
        <div class="col-lg-3 box5">
          <div class="title">设备异常服务器TOP10</div>
          <div class="box5_con_top" id="myChart3"></div>
          <div class="box5_con">
            <div class="title m-20">设备参数运行TOP5</div>
            <div>
              <div class="box5_con_bot queryleft" id="myChart4"></div>
              <div class="box5_con_bot queryleft" id="myChart5"></div>
            </div>
            <div>
              <div class="box5_con_bot queryleft" id="myChart6"></div>
              <div class="box5_con_bot queryleft" id="myChart7"></div>
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
      }
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
  width: 50%;
  height: 11rem;
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
.headerbackground {
  // padding: 0px;
  background: url('~@/assets/img/bg_body.jpg') no-repeat;
  height: 51rem;
  width: 100%;
}
/deep/ .body-main .content .content-view {
  overflow-x: auto !important;
}
@import '~@/assets/css/index.css';
@media (max-width: 2000px) {
  .container,
  .container-lg,
  .container-md,
  .container-sm {
    max-width: 1912px;
  }
  .headerbackground {
    min-height: 929px;
  }
}
@media (max-width: 1700px) {
  .container,
  .container-lg,
  .container-md,
  .container-sm {
    max-width: 1600px;
  }
}
@media (max-width: 1600px) {
  .container,
  .container-lg,
  .container-md,
  .container-sm {
    max-width: 1500px;
  }
}
@media (max-width: 1500px) {
  .container,
  .container-lg,
  .container-md,
  .container-sm {
    max-width: 1400px;
  }
}
@media (max-width: 1400px) {
  .container,
  .container-lg,
  .container-md,
  .container-sm {
    max-width: 1300px;
  }
}
@media (max-width: 1300px) {
  .container,
  .container-lg,
  .container-md,
  .container-sm {
    max-width: 1200px;
  }
}
</style>
