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
              <div :class="errorStyle">
                <small class="small_index">{{ this.operation }}</small>
                <!-- <div
                  id="liquidFillrun"
                  style="width: 18rem; height: 18rem; margin-left:30%"
                ></div> -->
                <div class="svg-contain" id="svg_sky" style="display: none">
                  <svg
                    version="1.1"
                    class="clear-sky-svg"
                    x="300px"
                    y="300px"
                    viewBox="0 0 72.3 52.6"
                    style="enable-background: new 0 0 72.3 52.6"
                    xml:space="preserve"
                  >
                    <g>
                      <path
                        class="sun"
                        d="M50.8,25.7c0,7.9-6.4,14.4-14.4,14.4s-14.4-6.4-14.4-14.4s6.4-14.4,14.4-14.4S50.8,17.8,50.8,25.7z"
                      />
                      <path class="line big-path line-1" d="M54.5,25.8h6" />
                      <path class="line big-path line-2" d="M12.4,25.8h6" />
                      <path class="line big-path line-3" d="M36.5,44.3v6" />
                      <path class="line big-path line-4" d="M36.5,8.2v-6" />
                      <path
                        class="line big-path line-5"
                        d="M23,38.8l-4.8,4.8"
                      />
                      <path
                        class="line big-path line-6"
                        d="M54.9,8.9L50,13.8"
                      />
                      <path class="line big-path line-7" d="M50,38.8l4.4,4.4" />
                      <path
                        class="line big-path line-8"
                        d="M18.8,9.6l4.2,4.2"
                      />
                    </g>
                  </svg>
                </div>
                <div class="svg-contain" id="svg_clouds" style="display: none">
                  <svg
                    class="overcast-clouds"
                    version="1.1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 82.6 52.3"
                    style="enable-background: new 0 0 82.6 52.3"
                    xml:space="preserve"
                  >
                    <g id="Layer_1">
                      <path
                        class="cloud-still"
                        d="M21.8,24.2c0.1,0,0.3-1.1,0.4-1.2c0.5-1.2,1.1-2.4,1.8-3.4c3.9-5.7,12.6-7.1,18.2-3.1c0,0,3.7-6,11-5.9c0,0,5.6-0.6,10.3,4.9c0,0,2.8,3.3,2.9,7.4c0,0,3.2-0.5,5.4,1c0,0,6.2,2.6,5.9,10.8H56.3c0,0-2-3.5-7.3-3.6c0.2,0-0.5-2.2-0.6-2.4c-1.4-4.4-5.5-6.9-9.9-7.4c-3.4-0.4-6.6,0.8-9,3.2c-0.1,0.1-1.2,1.3-1.2,1.3S25.3,23.6,21.8,24.2z"
                      />
                      <path
                        class="cloud-still"
                        d="M57.6,40.7c0-4.8-3.9-8.6-8.6-8.6c-0.2,0-0.4,0-0.6,0.1c-0.1-0.8-0.2-1.7-0.4-2.4c-0.3-1-0.8-2-1.4-2.9c-2-2.9-5.3-4.8-9-4.8c-2.3,0-4.4,0.7-6.1,1.9c-0.6,0.4-1.1,0.8-1.6,1.3c-0.2,0.2-0.5,0.5-0.7,0.8c-0.2,0.3-0.4,0.5-0.6,0.8c-1.8-1.2-3.9-1.9-6.2-1.9c-5.5,0-10,4-10.8,9.3c-3.5,1-6.1,3.9-6.6,7.6h26.3h12.7h12.9h0.7C57.6,41.8,57.6,41.4,57.6,40.7z"
                      />
                    </g>
                    <g id="Layer_2"></g>
                  </svg>
                </div>
                <div
                  class="svg-contain"
                  id="svg_hurricane"
                  style="display: none"
                >
                  <svg
                    class="hurricane-svg"
                    version="1.1"
                    id="Layer_1"
                    x="0px"
                    y="0px"
                    viewBox="-437 254.4 85 52.6"
                    style="enable-background: new -437 254.4 85 52.6"
                    xml:space="preserve"
                  >
                    <path
                      class="cloud"
                      d="M-361.9,280.5c1.4,0,2.6,0.7,3.4,1.7h1.1c0.4-8.2-5.9-10.8-5.9-10.8c-2.2-1.5-5.4-1-5.4-1c-0.1-4.1-2.9-7.4-2.9-7.4c-4.7-5.5-10.3-4.9-10.3-4.9c-7.4-0.2-11,5.9-11,5.9c-5.6-4-14.3-2.6-18.2,3.1c-0.7,1.1-1.3,2.2-1.8,3.4c0,0.1-0.3,1.2-0.4,1.2c3.5-0.6,6.6,1.6,6.6,1.6s1.1-1.1,1.2-1.3c2.4-2.4,5.6-3.6,9-3.2c4.4,0.5,8.5,3,9.9,7.4c0.1,0.2,0.8,2.4,0.6,2.4c5.3,0.1,7.3,3.6,7.3,3.6h13.4C-364.5,281.2-363.3,280.5-361.9,280.5z"
                    />
                    <path
                      class="cloud"
                      d="M-386,279.6c-0.2,0-0.4,0-0.6,0.1c-0.1-0.8-0.2-1.7-0.4-2.4c-0.3-1-0.8-2-1.4-2.9c-2-2.9-5.3-4.8-9-4.8c-2.3,0-4.4,0.7-6.1,1.9c-0.6,0.4-1.1,0.8-1.6,1.3c-0.2,0.2-0.5,0.5-0.7,0.8c-0.2,0.3-0.4,0.5-0.6,0.8c-1.8-1.2-3.9-1.9-6.2-1.9c-5.5,0-10,4-10.8,9.3c-3.5,1-6.1,3.9-6.6,7.6h26.3h12.7h2.3l4.7-6.2c0.6-0.8,1.7-0.9,2.5-0.3s0.9,1.7,0.3,2.5l-3.1,4h0.5h5.6h0.7c0.1,0,0.2-0.4,0.2-1.1C-377.4,283.5-381.3,279.6-386,279.6z"
                    />
                    <polyline
                      class="lightening"
                      points="-382.8,284.2 -387.9,290.9 -380.6,291.2 -387.9,302 "
                    />
                    <path class="line" d="M-426.9,294.4l-5.1,7.3" />
                    <path class="line" d="M-420.8,294.4l-5.1,7.3" />
                    <path class="line" d="M-415.4,294.4l-5.1,7.3" />
                    <path class="line" d="M-409.9,294.4l-5.1,7.3" />
                    <path class="line" d="M-404.5,294.4l-5.1,7.3" />
                    <path class="line" d="M-399.1,294.4l-5.1,7.3" />
                    <path class="line" d="M-393.7,294.4l-5.1,7.3" />
                    <path class="line" d="M-388.2,294.4l-5.1,7.3" />
                    <g>
                      <path class="little-path path-1" d="M-374.8,287.2h10.6" />
                      <path class="little-path path-2" d="M-373.8,289.3h10.9" />
                      <path
                        class="big-path"
                        d="M-376,288.3c0,0,14,0,14,0c1.7,0,3.1-1.4,3.3-3.1c0-0.5,0-1-0.3-1.4c-0.9-2.3-4.1-2.7-5.6-0.7c-0.4,0.6-0.7,1.3-0.7,1.9"
                      />
                      <path
                        class="little-path path-3"
                        d="M-364.1,285c0-1.2,1-2.2,2.2-2.2s2.2,1,2.2,2.2c0,1.2-1,2.2-2.2,2.2"
                      />
                    </g>
                  </svg>
                </div>
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
                    <small>总设备：{{ this.hostSumNum }}台</small>
                  </div>
                  <div class="con_right_top">
                    <small>总磁盘：{{ this.hostSumHardDisk }}G</small>
                  </div>
                  <div class="con_right_top">
                    <small>总内存：{{ this.hostSumMemory }}G</small>
                  </div>
                </div>
                <div class="box3_con_right_bot">
                  <div class="row_index row_table">
                    <div class="data_bg">
                      <p>{{ this.hostOneCount }}台</p>
                      <small>{{ this.hostOneType }}</small>
                    </div>
                    <div class="data_bg">
                      <p>{{ this.hostTwoCount }}台</p>
                      <small>{{ this.hostTwoType }}</small>
                    </div>
                    <div class="data_bg">
                      <p>{{ this.hostThreeCount }}台</p>
                      <small>{{ this.hostThreeType }}</small>
                    </div>
                    <div class="data_bg">
                      <p>{{ this.hostFourCount }}台</p>
                      <small>{{ this.hostFourType }}</small>
                    </div>
                    <div class="data_bg">
                      <p>{{ this.hostFiveCount }}台</p>
                      <small>{{ this.hostFiveType }}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="box4 m-20">
            <div class="title_index">问题列表</div>
            <div class="box4_con" id="box4">
              <div
                style="
                  height: 2.3rem;
                  color: white;
                  font-weight: 500;
                  background-color: rgba(148, 144, 144, 0.3);
                "
              >
                <h1
                  style="
                    float: left;
                    color: rgb(162, 180, 230);
                    width: 20%;
                    text-align: center;
                    font-size: 1.2rem;
                    margin-top: 0.3rem;
                  "
                >
                  日期
                </h1>
                <h1
                  style="
                    float: left;
                    color: rgb(162, 180, 230);
                    width: 60%;
                    text-align: center;
                    font-size: 1.2rem;
                    margin-top: 0.3rem;
                  "
                >
                  名称
                </h1>
                <h1
                  style="
                    float: left;
                    color: rgb(162, 180, 230);
                    width: 20%;
                    text-align: center;
                    font-size: 1.2rem;
                    margin-top: 0.3rem;
                  "
                >
                  级别
                </h1>
              </div>
              <div class="page-example">
                <vue-seamless-scroll
                  :data="tableData"
                  class="seamless-warp"
                  :class-option="defaultOption"
                >
                  <ul class="ul-scoll">
                    <li v-for="(item, index) in tableData" :key="index">
                      <span class="scroll_span_30">{{
                        formatterdata(item.zabbixProblemDTO.clock)
                      }}</span>
                      <span class="scroll_span_60">{{
                        item.zabbixProblemDTO.name
                      }}</span>
                      <span class="scroll_span_10">{{
                        formattertype(item.zabbixProblemDTO.severity)
                      }}</span>
                    </li>
                  </ul>
                  <!-- <el-table
                  :data="tableData"
                  :show-header="hideRow"
                  class="ul-scoll"
                >
                  <el-table-column
                    prop="zabbixProblemDTO.clock"
                    label="日期"
                    width="180"
                  >
                    <template slot-scope="scope">
                      <el-link
                        type="primary"
                        v-html="formatterdata(scope.row.zabbixProblemDTO.clock)"
                      ></el-link>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="zabbixProblemDTO.name"
                    label="名称"
                    width="auto"
                  >
                    <template slot-scope="scope">
                      <el-link
                        type="primary"
                        v-html="formatterName(scope.row.zabbixProblemDTO.name)"
                      ></el-link>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="zabbixProblemDTO.severity"
                    label="级别"
                    width="100"
                  >
                    <template slot-scope="scope">
                      <el-link
                        type="primary"
                        v-html="
                          formattertype(scope.row.zabbixProblemDTO.severity)
                        "
                      ></el-link>
                    </template>
                  </el-table-column>
                </el-table> -->
                </vue-seamless-scroll>
              </div>
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
// import 'echarts-liquidfill'
import { formatTodate } from '@/utils/format.js'
export default {
  data () {
    return {
      show: false,
      hideRow: false,
      errorCount: 0,
      errorStyle: '',
      hostSumNum: '0',
      hostSumMemory: '0',
      hostSumHardDisk: '0',
      operation: '设备运行良好',
      conheight: {
        height: '',
        width: ''
      },
      tableData: [{
        hostId: '',
        ip: '',
        hostName: '',
        clock: '',
        name: '',
        zabbixProblemDTO: {
          name: '',
          severity: '',
          clock: ''
        }
      }],
      hostOneTypeId: '',
      hostOneType: '操作系统',
      hostOneCount: '0',
      hostTwoTypeId: '',
      hostTwoType: '数据库',
      hostTwoCount: '0',
      hostThreeTypeId: '',
      hostThreeType: '中间件',
      hostThreeCount: '0',
      hostFourTypeId: '',
      hostFourType: '网络设备',
      hostFourCount: '0',
      hostFiveTypeId: '',
      hostFiveType: 'JVM',
      hostFiveCount: '0',
      timer: ''
    }
  },
  created () {
  },
  mounted () {
    this.showInfo()
    // window.addEventListener('resize', this.getResize)
    // this.getResize()
    if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(() => {
        this.showInfo()
      }, 1000 * 60 * 5)
    }
  },
  beforeDestroy () {
    // window.removeEventListener('resize', this.getResize)
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
  methods: {
    getResize () {
      // this.conheight.height = window.innerHeight - 151 + 'px'
      var timer = null
      return function () {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(function () {
          const pieCharts = document.getElementById('myChart2')
          const myChart = this.$echarts.init(pieCharts)
          myChart.resize()
        }, 500)
      }
    },
    showInfo () {
      this.makeData1()
      this.makeData2()
      this.makeData3()
      this.makeData4()
      this.makeData5()
      this.makeData6()
      // this.getOperationRunInfo()
    },
    situation () {
      var errorCount = this.errorCount
      if (errorCount !== null && (errorCount >= 5 && errorCount <= 15)) {
        this.errorStyle = 'box3_con_left'
        this.operation = '设备运行出现故障'
        var svgclouds2 = document.getElementById('svg_clouds')
        svgclouds2.style = 'display: block'
        var svghurricane2 = document.getElementById('svg_hurricane')
        svghurricane2.style = 'display: none'
        var svgsky2 = document.getElementById('svg_sky')
        svgsky2.style = 'display: none'
        // this.getOperationRunInfoTwo()
      } else if (errorCount !== null && (errorCount > 15)) {
        this.errorStyle = 'box3_con_left'
        this.operation = '设备运行故障较多'
        var svgclouds3 = document.getElementById('svg_clouds')
        svgclouds3.style = 'display: none'
        var svghurricane3 = document.getElementById('svg_hurricane')
        svghurricane3.style = 'display: block'
        var svgsky3 = document.getElementById('svg_sky')
        svgsky3.style = 'display: none'
        // this.getOperationRunInfoThree()
      } else {
        this.errorStyle = 'box3_con_left'
        this.operation = '设备运行良好'
        var svgclouds1 = document.getElementById('svg_clouds')
        svgclouds1.style = 'display: none'
        var svghurricane1 = document.getElementById('svg_hurricane')
        svghurricane1.style = 'display: none'
        var svgsky1 = document.getElementById('svg_sky')
        svgsky1.style = 'display: block'
        // this.getOperationRunInfoOne()
      }
    },
    makeData1 () {
      const xdata = []
      this.axios.post(this.$api.main.getInformationStatistics).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.errorCount = json.data.average + json.data.high + json.data.disaster
            xdata.push(
              { value: json.data.information, name: '信息' },
              { value: json.data.warning, name: '警告' },
              { value: json.data.average, name: '一般严重' },
              { value: json.data.high, name: '严重' },
              { value: json.data.disaster, name: '灾难' }
            )
            this.situation()
            this.makeData1_info(xdata)
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    makeData1_info (xdata) {
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
        // color: ['rgb(129, 192, 192)', 'rgb(255, 211, 6)', 'rgb(234, 117, 0)', 'rgb(255, 32, 32)', 'rgb(128, 0, 0)'],
        color: ['#6699FF', '#006699', '#4cabce', '#138CEB', '#77DDFF'],
        series: [
          {
            name: '分类',
            type: 'pie',
            radius: '65%',
            center: ['60%', '40%'],
            data: xdata,
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
      this.axios.post(this.$api.main.getFAQTop5).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.makeData2_info(json.data)
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    makeData2_info (myChartData) {
      const xData = []
      const yData = []
      const xNameData = []
      myChartData.forEach(element => {
        var newname = element.name
        if (newname !== null && newname.length > 50) {
          newname = newname.substring(0, 50) + '...'
        }
        xData.push(newname)
        xNameData.push(element.name)
        yData.push(element.count)
      })
      const pieCharts = document.getElementById('myChart2')
      const myChart = this.$echarts.init(pieCharts)
      const data = {
        xData: xData,
        yData: yData,
        color: ['#6699FF', '#006699', '#4cabce', '#138CEB', '#77DDFF'],
        xNameData: xNameData
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
        tooltip: {
          trigger: 'axis',
          extraCssText: 'width:6rem',
          axisPointer: {
            lineStyle: {
              color: 'rgba(0, 255, 233,0)'
            }
          },
          formatter: function (params, ticket, callback) {
            var res = ''
            if (data.xNameData[0] !== null && data.xNameData[0] !== '' && data.xNameData[0] !== undefined) {
              res = res + '<span style="font-size:22px;color:' + data.color[0] + '">' + ' ● ' + '</span>' + ' 1：' + data.xNameData[0] + '<br>'
            }
            if (data.xNameData[1] !== null && data.xNameData[1] !== '' && data.xNameData[1] !== undefined) {
              res = res + '<span style="font-size:22px;color:' + data.color[1] + '">' + ' ● ' + '</span>' + ' 2：' + data.xNameData[1] + '<br>'
            }
            if (data.xNameData[2] !== null && data.xNameData[2] !== '' && data.xNameData[2] !== undefined) {
              res = res + '<span style="font-size:22px;color:' + data.color[2] + '">' + ' ● ' + '</span>' + ' 3：' + data.xNameData[2] + '<br>'
            }
            if (data.xNameData[3] !== null && data.xNameData[3] !== '' && data.xNameData[3] !== undefined) {
              res = res + '<span style="font-size:22px;color:' + data.color[3] + '">' + ' ● ' + '</span>' + ' 4：' + data.xNameData[3] + '<br>'
            }
            if (data.xNameData[4] !== null && data.xNameData[4] !== '' && data.xNameData[4] !== undefined) {
              res = res + '<span style="font-size:22px;color:' + data.color[4] + '">' + ' ● ' + '</span>' + ' 5：' + data.xNameData[4] + '<br>'
            }
            return res
          }
        },
        legend: {
          top: '5%',
          data: data.xData,
          textStyle: {
            fontSize: 12,
            color: []
          }
        },
        grid: [
          {
            top: 200,
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
      this.makeData3_info()
      this.makeData3_sumInfo()
    },
    makeData3_sumInfo () {
      this.axios.get(this.$api.main.getAssetData).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.hostSumNum = this.checkNullzero(json.data.hostSumNum)
            this.hostSumMemory = this.checkNullzero(json.data.hostSumMemory)
            this.hostSumHardDisk = this.checkNullzero(json.data.hostSumHardDisk)
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    checkNullzero (value) {
      var data = 0
      if (value !== null && value !== '' && value !== undefined) {
        data = value
      }
      return data
    },
    checkNullBoolean (value) {
      if (value !== null && value !== '' && value !== undefined) {
        return true
      }
      return false
    },
    makeData3_info () {
      this.axios.post(this.$api.main.getMonitorTypeUsedInfo).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            json.data.forEach(element => {
              switch (element.typeId) {
                case '1':
                  this.hostOneTypeId = element.typeId
                  this.hostOneType = element.type
                  this.hostOneCount = this.checkNullzero(element.hostCount)
                  break
                case '2':
                  this.hostTwoTypeId = element.typeId
                  this.hostTwoType = element.type
                  this.hostTwoCount = this.checkNullzero(element.hostCount)
                  break
                case '3':
                  this.hostThreeTypeId = element.typeId
                  this.hostThreeType = element.type
                  this.hostThreeCount = this.checkNullzero(element.hostCount)
                  break
                case '4':
                  this.hostFourTypeId = element.typeId
                  this.hostFourType = element.type
                  this.hostFourCount = this.checkNullzero(element.hostCount)
                  break
                case '28':
                  this.hostFiveTypeId = element.typeId
                  this.hostFiveType = element.type
                  this.hostFiveCount = this.checkNullzero(element.hostCount)
                  break
                default:
                  break
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
    makeData4 () {
      const region = {}
      this.axios.post(this.$api.alertManager.alertInquire.findProblemHost, region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            if (json.data !== null) {
              this.tableData = json.data
              this.tableData.forEach(element => {
                var hostName = ''
                if (element.zabbixProblemDTO.name !== null && element.zabbixProblemDTO.name.length > 95) {
                  hostName = element.zabbixProblemDTO.name.substring(0, 95)
                  element.zabbixProblemDTO.name = hostName + '...'
                }
              })
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
    makeData5 () {
      this.axios.post(this.$api.main.getHostErrorTop10).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.makeData5_info(json.data)
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    makeData5_info (myChartData) {
      const xData = []
      const yData = []
      const xNameData = []
      myChartData.forEach(element => {
        var newname = element.name
        if (newname !== null && newname.length > 50) {
          newname = newname.substring(0, 50) + '...'
        }
        xData.push(newname)
        xNameData.push(element.name)
        yData.push(element.count)
      })
      const pieCharts = document.getElementById('myChart3')
      const myChart = this.$echarts.init(pieCharts)
      const data = {
        xData: xData,
        yData: yData,
        color: ['#6699FF', '#006699', '#4cabce', '#138CEB', '#77DDFF', '#40E0D0', '#87CECB', '#B0E0E6', '#AFEEEE', '#E0FFFF'],
        xNameData: xNameData
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
          top: '5%',
          data: data.xData,
          textStyle: {
            fontSize: 12,
            color: []
          }
        },
        grid: [
          {
            top: 150,
            bottom: 20,
            left: '12%'
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
      this.makeData6_info('2', 'myChart4', 'CPU使用率', '%')
      this.makeData6_info('3', 'myChart5', '内存使用率', '%')
      this.makeData6_info('5', 'myChart6', '系统盘使用率', '%')
      this.makeData6_info('4', 'myChart7', '网络接口速率', 'MB/s')
    },
    makeData6_info (itemKey, myChartName, name, type) {
      const param = {
        typeId: '1',
        itemKey: itemKey,
        valueType: '0',
        method: 'top5ByItem'
      }
      this.axios.post(this.$api.monitorManager.getTop5Msg, param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.makeData6_Chart(myChartName, json.data, name, type)
          } else {
          }
        } else {
          this.$message({
            message: '获取信息失败',
            type: 'error'
          })
        }
      })
    },
    makeData6_Chart (myChartName, myChartData, name, type) {
      const xData = []
      const yData = []
      myChartData.forEach(element => {
        xData.push(element.hostName)
        var realVal = '0.00'
        if (element.value !== null) {
          if (type === 'MB/s') {
            const realValnew = element.value / (1000 * 1000)
            realVal = realValnew
            yData.push(parseFloat(realVal).toFixed(1))
          } else {
            realVal = element.value
            yData.push(parseFloat(realVal).toFixed(1))
          }
        } else {
          yData.push('0.00')
        }
      })
      if (yData.length === 0) {
        const pieCharts = document.getElementById(myChartName)
        pieCharts.innerHTML = '<div style="text-align: center;justify-content: center;display: flex;position: relative;height:100%"><span style="text-align: center;justify-content: center;display: flex;position: relative;top:50%;color:#7df">监控项暂无数据</span></div>'
        return
      }
      const pieCharts = document.getElementById(myChartName)
      const myChart = this.$echarts.init(pieCharts)
      const data = {
        xData: xData,
        yData: yData,
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
          top: 10,
          text: name,
          subtext: '单位：' + type,
          x: 'center',
          textStyle: {
            color: '#4cabce',
            fontSize: '16',
            fontWeight: 'bold'
          },
          subtextStyle: {
            color: '#006699',
            fontSize: '12',
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
            var res = ''
            if (data.xData[0] !== null && data.xData[0] !== '' && data.xData[0] !== undefined) {
              res = res + '<span style="font-size:22px;color:' + data.color[0] + '">' + ' ● ' + '</span>' + ' 1：' + data.xData[0] + '<br>'
            }
            if (data.xData[1] !== null && data.xData[1] !== '' && data.xData[1] !== undefined) {
              res = res + '<span style="font-size:22px;color:' + data.color[1] + '">' + ' ● ' + '</span>' + ' 2：' + data.xData[1] + '<br>'
            }
            if (data.xData[2] !== null && data.xData[2] !== '' && data.xData[2] !== undefined) {
              res = res + '<span style="font-size:22px;color:' + data.color[2] + '">' + ' ● ' + '</span>' + ' 3：' + data.xData[2] + '<br>'
            }
            if (data.xData[3] !== null && data.xData[3] !== '' && data.xData[3] !== undefined) {
              res = res + '<span style="font-size:22px;color:' + data.color[3] + '">' + ' ● ' + '</span>' + ' 4：' + data.xData[3] + '<br>'
            }
            if (data.xData[4] !== null && data.xData[4] !== '' && data.xData[4] !== undefined) {
              res = res + '<span style="font-size:22px;color:' + data.color[4] + '">' + ' ● ' + '</span>' + ' 5：' + data.xData[4] + '<br>'
            }
            return res
          }
        },
        grid: [
          {
            top: '30%',
            bottom: 20,
            left: 35,
            right: 1
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
            formatter: '{value} '
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
    getOperationRunInfoOne () {
      const param = {
        servername: '运行情况',
        name: '优',
        elementid: 'liquidFillrun',
        footcolor: '#006600',
        graphcolor: ['#CCFF99', '#CCFFCC', '#00FF00'],
        borderColor: '#FFC931',
        shape: 'path://M400,64c-5.3,0-10.6,0.4-15.8,1.1C354.3,24.4,307.2,0,256,0s-98.3,24.4-128.2,65.1c-5.2-0.8-10.5-1.1-15.8-1.1C50.2,64,0,114.2,0,176s50.2,112,112,112c13.7,0,27.1-2.5,39.7-7.3c12.3,10.7,26.2,19,40.9,25.4l24.9-24.9c-23.5-7.6-44.2-21.3-59.6-39.9c-13,9.2-28.8,14.7-45.9,14.7c-44.2,0-80-35.8-80-80s35.8-80,80-80c10.8,0,21.1,2.2,30.4,6.1C163.7,60.7,206.3,32,256,32s92.3,28.7,113.5,70.1c9.4-3.9,19.7-6.1,30.5-6.1c44.2,0,80,35.8,80,80s-35.8,80-80,80c-17.1,0-32.9-5.5-45.9-14.7c-10.4,12.5-23.3,22.7-37.6,30.6L303,312.2c20.9-6.6,40.5-16.9,57.3-31.6c12.6,4.8,26,7.3,39.7,7.3c61.8,0,112-50.2,112-112S461.8,64,400,64z'
      }
      this.liquidFill(param)
    },
    getOperationRunInfoTwo () {
      const param = {
        servername: '运行情况',
        name: '良',
        elementid: 'liquidFillrun',
        footcolor: '#00BBFF',
        graphcolor: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
        borderColor: '#99FFFF',
        shape: 'path://M731.428571 358.4c-5.12 0-9.508571 0-14.628571 0.731429C684.617143 272.822857 601.965714 212.114286 504.685714 212.114286c-125.074286 0-226.742857 101.668571-226.742857 226.742857 0 8.777143 0.731429 17.554286 1.462857 26.331428-12.434286-2.925714-24.868571-4.388571-38.034285-4.388571C144.091429 460.8 65.828571 539.062857 65.828571 636.342857s78.262857 175.542857 175.542858 175.542857h490.057142c125.074286 0 226.742857-101.668571 226.742858-226.742857s-101.668571-226.742857-226.742858-226.742857z'
      }
      this.liquidFill(param)
    },
    getOperationRunInfoThree () {
      const param = {
        servername: '运行情况',
        name: '差',
        elementid: 'liquidFillrun',
        footcolor: '#330066',
        graphcolor: ['#0000FF', '#0000CC', '#000066'],
        borderColor: '#66CCFF',
        shape: 'path://M731.428571 296.228571c-5.12 0-9.508571 0-14.628571 0.731429-32.182857-85.577143-114.834286-147.017143-212.114286-147.017143-125.074286 0-226.742857 101.668571-226.742857 226.742857 0 8.777143 0.731429 17.554286 1.462857 26.331429-12.434286-2.925714-24.868571-4.388571-38.034285-4.388572-97.28 0-175.542857 78.262857-175.542858 175.542858s78.262857 175.542857 175.542858 175.542857h490.057142c125.074286 0 226.742857-101.668571 226.742858-226.742857s-101.668571-226.742857-226.742858-226.742858zM482.742857 837.485714c0 20.48 13.165714 36.571429 29.257143 36.571429s29.257143-16.091429 29.257143-36.571429-29.257143-51.2-29.257143-51.2-29.257143 30.72-29.257143 51.2zM380.342857 837.485714c0 20.48 13.165714 36.571429 29.257143 36.571429s29.257143-16.091429 29.257143-36.571429-29.257143-51.2-29.257143-51.2-29.257143 30.72-29.257143 51.2zM277.942857 837.485714c0 20.48 13.165714 36.571429 29.257143 36.571429s29.257143-16.091429 29.257143-36.571429-29.257143-51.2-29.257143-51.2-29.257143 30.72-29.257143 51.2zM585.142857 837.485714c0 20.48 13.165714 36.571429 29.257143 36.571429s29.257143-16.091429 29.257143-36.571429-29.257143-51.2-29.257143-51.2-29.257143 30.72-29.257143 51.2zM687.542857 837.485714c0 20.48 13.165714 36.571429 29.257143 36.571429s29.257143-16.091429 29.257143-36.571429-29.257143-51.2-29.257143-51.2-29.257143 30.72-29.257143 51.2z'
      }
      this.liquidFill(param)
    },
    liquidFill (param) {
      console.log(param)
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
            show: true, // 是否显示轮廓 布尔值
            borderDistance: 0, // 外部轮廓与图表的距离 数字
            itemStyle: {
              borderColor: 'rgba(255,0,0,0.09)', // 边框的颜色
              borderWidth: 0, // 边框的宽度
              shadowBlur: 5, // 外部轮廓的阴影范围 一旦设置了内外都有阴影
              shadowColor: '#000' // 外部轮廓的阴影颜色
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
            // color: '#00FF00', // 图表的背景颜色
            color: param.borderColor,
            borderWidth: '2', // 图表的边框宽度
            borderColor: param.borderColor, // 图表的边框颜色
            itemStyle: {
              shadowBlur: 100, // 设置无用
              shadowColor: '#ffffff', // 设置无用
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
          // shape: 'circle', // 水填充图的形状 circle默认圆形  rect圆角矩形  triangle三角形  diamond菱形  pin水滴状 arrow箭头状  还可以是svg的path
          shape: param.shape,
          center: ['40%', '50%'], // 图表相对于盒子的位置 第一个是水平的位置 第二个是垂直的值 默认是[50%,50%]是在水平和垂直方向居中 可以设置百分比 也可以设置具体值
          radius: '70%', // 图表的大小 值是圆的直径 可以是百分比 也可以是具体值 100%则占满整个盒子 默认是40%; 百分比下是根据宽高最小的一个为参照依据
          amplitude: 10, // 振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
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
    formattertype (severity) {
      var name = ''
      switch (severity) {
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
    formatterdata (value) {
      return formatTodate(value, 'YYYY-MM-DD HH:mm:ss')
    },
    formatterName (value) {
      return value
    }
  },
  computed: {
    defaultOption () {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 6, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
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
  height: 63.5rem;
}
/deep/ .el-table .el-table__body {
  width: 100% !important;
}
.seamless-warp {
  height: 100%;
  overflow: hidden;
}
.scroll_span_10 {
  color: #77ddff;
  display: flex;
  justify-content: space-between;
  float: left;
  width: 10%;
  font-size: 0.8rem;
}
.scroll_span_30 {
  // color: rgb(162, 180, 230);
  color: #77ddff;
  display: flex;
  justify-content: space-between;
  float: left;
  width: 17%;
  font-size: 0.8rem;
}
.scroll_span_60 {
  color: #77ddff;
  display: flex;
  justify-content: space-between;
  float: left;
  width: 73%;
  font-size: 0.8rem;
}
.page-example {
  height: 100%;
  overflow: hidden;
  .ul-scoll {
    li {
      border-bottom: 1px solid rgba(148, 144, 144, 0.3);
      margin: 6px;
      padding: 5px;
    }
  }
}
@import '~@/assets/css/index.css';
</style>
