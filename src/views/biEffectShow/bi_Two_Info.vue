<template>
  <div class="headerbackground">
    <div class="head_div"><span class="head_span">BI展示图01</span></div>
    <div class="head_div2"><span class="head_span2" @click="showBiInfo()">BI展示图02</span></div>
    <h1 class="head_bg"><img src="../../assets/images/head_name.png" /></h1>
    <div class="main_box">
      <!--第一列-->
      <div class="col_box30per">
        <div class="bor_t_box">
          <div class="bor_t_l">
            <img src="../../assets/images/bor_t_l.png" />
          </div>
          <div class="bor_t_r">
            <img src="../../assets/images/bor_t_r.png" />
          </div>
        </div>
        <div class="bor_c_box height420">
          <div class="bor_c_l"></div>
          <div class="bor_c_r height1">
            <h2 class="bg_title">操作系统</h2>
            <div class="e_box1-1">
              <div
                id="ibox_content_echarts1"
                style="height: 80%; width: 50%; float: left; margin-top: -30px"
              ></div>
              <div
                id="ibox_content_echarts1_1"
                style="height: 80%; width: 50%; float: left; margin-top: -30px"
              ></div>
              <div
                id="ibox_content_echarts2"
                style="height: 80%; width: 100%; float: left"
              ></div>
            </div>
          </div>
        </div>
        <div class="bor_b_box">
          <div class="bor_b_l">
            <img src="../../assets/images/bor_b_l.png" />
          </div>
          <div class="bor_b_r">
            <img src="../../assets/images/bor_b_r.png" />
          </div>
        </div>

        <div class="bor_t_box mar_t20">
          <div class="bor_t_l">
            <img src="../../assets/images/bor_t_l.png" />
          </div>
          <div class="bor_t_r">
            <img src="../../assets/images/bor_t_r.png" />
          </div>
        </div>
        <div class="bor_c_box height420">
          <div class="bor_c_l"></div>
          <div class="bor_c_r">
            <h2 class="bg_title">数据库</h2>
            <div class="e_box1-2">
              <div
                id="ibox_data_echarts1"
                style="height: 100%; width: 50%; float: left; margin-top: 10px"
              ></div>
              <div
                id="ibox_data_echarts2"
                style="height: 100%; width: 50%; float: left; margin-top: 10px"
              ></div>
              <div
                id="ibox_data_echarts3"
                style="
                  height: 100%;
                  width: 50%;
                  clear: both;
                  float: left;
                  margin-top: 30px;
                "
              ></div>
              <div
                id="ibox_data_echarts4"
                style="height: 100%; width: 50%; float: left; margin-top: 30px"
              ></div>
            </div>
          </div>
        </div>
        <div class="bor_b_box">
          <div class="bor_b_l">
            <img src="../../assets/images/bor_b_l.png" />
          </div>
          <div class="bor_b_r">
            <img src="../../assets/images/bor_b_r.png" />
          </div>
        </div>
      </div>
      <!--第二列-->
      <div class="col_box40per">
        <div class="bor_t_box">
          <div class="bor_t_l">
            <img src="../../assets/images/bor_t_l.png" />
          </div>
          <div class="bor_t_r">
            <img src="../../assets/images/bor_t_r.png" />
          </div>
        </div>
        <div class="bor_c_box">
          <div class="bor_c_l"></div>
          <div class="bor_c_r height3">
            <h2 class="bg_title">运维指数</h2>
            <div class="content_box">
              <div class="ywzs_left_box">
                <div :class="errorStyle">
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
                        <path
                          class="line big-path line-7"
                          d="M50,38.8l4.4,4.4"
                        />
                        <path
                          class="line big-path line-8"
                          d="M18.8,9.6l4.2,4.2"
                        />
                      </g>
                    </svg>
                  </div>
                  <div
                    class="svg-contain"
                    id="svg_clouds"
                    style="display: none"
                  >
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
                        <path
                          class="little-path path-1"
                          d="M-374.8,287.2h10.6"
                        />
                        <path
                          class="little-path path-2"
                          d="M-373.8,289.3h10.9"
                        />
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
                  <small :class="small_index">{{ this.operation }}</small>
                </div>
              </div>
              <ul class="ywzs_num">
                <li>
                  <h3 class="number">{{ this.hostOneCount }}</h3>
                  <p>{{ this.hostOneType }}(台)</p>
                </li>
                <li>
                  <h3 class="number">{{ this.hostTwoCount }}</h3>
                  <p>{{ this.hostTwoType }}(台)</p>
                </li>
                <li>
                  <h3 class="number">{{ this.hostThreeCount }}</h3>
                  <p>{{ this.hostThreeType }}(台)</p>
                </li>
                <li>
                  <h3 class="number">{{ this.hostFourCount }}</h3>
                  <p>{{ this.hostFourType }}(台)</p>
                </li>
                <li>
                  <h3 class="number">{{ this.hostFiveCount }}</h3>
                  <p>{{ this.hostFiveType }}(台)</p>
                </li>
                <li>
                  <div class="">
                    <span>总设备：</span
                    ><span class="yellow">{{ this.hostSumNum }}台</span>
                  </div>
                  <br />
                  <div class="">
                    <span>总磁盘：</span
                    ><span class="yellow">{{ this.hostSumHardDisk }}G</span>
                  </div>
                  <br />
                  <div class="">
                    <span>总内存：</span
                    ><span class="yellow">{{ this.hostSumMemory }}G</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="bor_b_box">
          <div class="bor_b_l">
            <img src="../../assets/images/bor_b_l.png" />
          </div>
          <div class="bor_b_r">
            <img src="../../assets/images/bor_b_r.png" />
          </div>
        </div>

        <div class="bor_t_box mar_t20">
          <div class="bor_t_l">
            <img src="../../assets/images/bor_t_l.png" />
          </div>
          <div class="bor_t_r">
            <img src="../../assets/images/bor_t_r.png" />
          </div>
        </div>
        <div class="bor_c_box height370">
          <div class="bor_c_l"></div>
          <div class="bor_c_r">
            <h2 class="bg_title">网络拓扑</h2>
            <div class="content_box">
              <canvas width="600" height="300" id="target"></canvas>
              <input
                type="hidden"
                id="infoData"
                name="infoData"
                v-model="infoData"
              />
              <input type="hidden" id="infoId" name="infoId" />
            </div>
          </div>
        </div>
        <div class="bor_b_box">
          <div class="bor_b_l">
            <img src="../../assets/images/bor_b_l.png" />
          </div>
          <div class="bor_b_r">
            <img src="../../assets/images/bor_b_r.png" />
          </div>
        </div>

        <div class="bor_t_box mar_t20">
          <div class="bor_t_l">
            <img src="../../assets/images/bor_t_l.png" />
          </div>
          <div class="bor_t_r">
            <img src="../../assets/images/bor_t_r.png" />
          </div>
        </div>
        <div class="bor_c_box">
          <div class="bor_c_l"></div>
          <div class="bor_c_r">
            <h2 class="bg_title">问题列表</h2>
            <ul class="scroll_tit">
              <li>
                <span class="wid_20per blue_font">日期</span
                ><span class="wid_70per blue_font">名称</span
                ><span class="wid_10per blue_font">级别</span>
              </li>
            </ul>
            <div class="myscroll">
              <vue-seamless-scroll
                :data="tableData"
                class="seamless-warp"
                :class-option="defaultOption"
              >
                <ul class="ul-scoll">
                  <li
                    v-for="(item, index) in tableData"
                    :key="index"
                    :class="rowClassName(index)"
                    style="color: #fff"
                  >
                    <span class="scroll_span_30">{{
                      formatterdata(item.zabbixProblemDTO.clock)
                    }}</span>
                    <span class="scroll_span_60">{{
                      item.zabbixProblemDTO.name
                    }}</span>
                    <span class="scroll_span_10">
                      <div
                        v-html="formattertype(item.zabbixProblemDTO.severity)"
                      ></div
                    ></span>
                  </li>
                </ul>
              </vue-seamless-scroll>
            </div>
          </div>
        </div>
        <div class="bor_b_box">
          <div class="bor_b_l">
            <img src="../../assets/images/bor_b_l.png" />
          </div>
          <div class="bor_b_r">
            <img src="../../assets/images/bor_b_r.png" />
          </div>
        </div>
      </div>
      <!--第三列-->
      <div class="col_box30per col_box100per new_pad new_t20">
        <div class="flo_screen">
          <div class="bor_t_box">
            <div class="bor_t_l">
              <img src="../../assets/images/bor_t_l.png" />
            </div>
            <div class="bor_t_r">
              <img src="../../assets/images/bor_t_r.png" />
            </div>
          </div>
          <div class="bor_c_box height420">
            <div class="bor_c_l"></div>
            <div class="bor_c_r height1">
              <h2 class="bg_title">中间件</h2>
              <div class="e_box1-3">
                <div
                  id="ibox_centre_echarts1"
                  style="
                    width: 50%;
                    height: 80%;
                    float: left;
                    box-sizing: border-box;
                  "
                ></div>
                <div
                  id="ibox_centre_echarts2"
                  style="
                    width: 50%;
                    height: 80%;
                    float: left;
                    box-sizing: border-box;
                  "
                ></div>
                <div
                  id="ibox_content_echarts3"
                  style="width: 100%; height: 120%; float: left"
                ></div>
              </div>
            </div>
          </div>
          <div class="bor_b_box">
            <div class="bor_b_l">
              <img src="../../assets/images/bor_b_l.png" />
            </div>
            <div class="bor_b_r">
              <img src="../../assets/images/bor_b_r.png" />
            </div>
          </div>
        </div>
        <div class="flo_screen">
          <div class="bor_t_box mar_t20 mar_t0">
            <div class="bor_t_l">
              <img src="../../assets/images/bor_t_l.png" />
            </div>
            <div class="bor_t_r">
              <img src="../../assets/images/bor_t_r.png" />
            </div>
          </div>
          <div class="bor_c_box height420">
            <div class="bor_c_l"></div>
            <div class="bor_c_r new_height">
              <h2 class="bg_title">JVM</h2>
              <div class="e_box1-4">
                <div
                  id="ibox_jvm_echarts1"
                  style="height: 50%; width: 50%; float: left; margin-top: 10px"
                ></div>
                <div
                  id="ibox_jvm_echarts2"
                  style="height: 50%; width: 50%; float: left; margin-top: 10px"
                ></div>
                <div
                  id="ibox_jvm_echarts3"
                  style="
                    height: 50%;
                    width: 50%;
                    clear: both;
                    float: left;
                    margin-top: 30px;
                  "
                ></div>
                <div
                  id="ibox_jvm_echarts4"
                  style="height: 50%; width: 50%; float: left; margin-top: 30px"
                ></div>
              </div>
            </div>
          </div>
          <div class="bor_b_box">
            <div class="bor_b_l">
              <img src="../../assets/images/bor_b_l.png" />
            </div>
            <div class="bor_b_r">
              <img src="../../assets/images/bor_b_r.png" />
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
import jTopo from 'jtopo-in-node'
import $ from 'jquery'
import { data } from '@/assets/topology/devices.js'
import qs from 'qs'
import { timesMethod } from '@/utils/formatDate.js'
export default {
  data () {
    return {
      show: false,
      hideRow: false,
      errorCount: 0,
      errorStyle: '',
      small_index: '',
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
      timer: '',
      infoData: '',
      timermakeData1: '',
      timermakeData1_1: '',
      timermakeData1_2: '',
      timermakeData2_1: '',
      timermakeData2_2: '',
      timermakeData2_1_1: '',
      timermakeData2_1_2: '',
      timermakeData5_2: '',
      timermakeData6_1: '',
      timermakeData6_2: '',
      timermakeData6_3: '',
      timermakeData6_4: '',
      intervalFlag: ''
    }
  },
  created () {
    this.getTopologyOneInfo()
    window.showHostInfo = this.showHostInfo
  },
  mounted () {
    this.showInfo()
    // window.addEventListener('resize', this.getResize)
    // this.getResize()
    if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(() => {
        location.reload()
      }, 1000 * 60 * 5)
    }
    var beginNode = null
    var currentNode = null
    $(function () {
      var canvas = document.getElementById('target')
      if (canvas !== null) {
        var stage = new jTopo.Stage(canvas)
        stage.eagleEye.visible = false
        var scene = new jTopo.Scene(stage)
        showJTopoToobar(stage, canvas)
        // scene.background = require('../../assets/topology/images/small_blue_bg_2.jpg')
        var tempNodeA = new jTopo.Node('tempA')
        tempNodeA.setSize(1, 1)
        var tempNodeZ = new jTopo.Node('tempZ')
        tempNodeZ.setSize(1, 1)
        var link = newLink(tempNodeA, tempNodeZ, 'defaultline')
        scene.mousemove(function (e) {
          tempNodeZ.setLocation(e.x, e.y)
        })
      }
      $('#zoomOut').click(function () {
        stage.zoomOut()
        $('#zoomOut').parent('label').removeClass('active')
      })
      $('#zoomIn').click(function () {
        stage.zoomIn()
        $('#zoomOut').parent('label').removeClass('active')
      })
      function showJTopoToobar (stage, canvas) {
        function evil (fn) {
          var Fn = Function
          return new Fn('return ' + fn)()
        }
        function gettopologydata (jsonData) {
          var infoData = evil(jsonData)
          var jsonObj = evil(infoData.jsonParam)
          if (jsonObj != null) {
            scene.clear()
            if (jsonObj.nodeList != null) {
              $.each(jsonObj.nodeList, function (i, e) {
                var tmpnode = {
                  name: e.name,
                  type: e.type,
                  id: e.id,
                  left: e.x,
                  top: e.y,
                  ip: e.ip
                }
                addNode(tmpnode)
                if (e.ip !== null && e.ip !== '' && e.ip !== undefined && e.ip !== 'ndefined') {
                  var agenttypeInfo = window.showHostInfo(e.ip)
                  agenttypeInfo.then(re => {
                    if (re !== null && re !== '') {
                      var alertid = e.id
                      // var alertinfo = e.name + '：' + re
                      if (re !== null && re.length > 100) {
                        re = re.substring(0, 100) + '...'
                      }
                      var alertinfo = re
                      var alertelement = forEachStagesElement(stage, alertid)
                      alertelement.alarm = alertinfo
                      alertelement.alarmColor = '255,215,0'
                      alertelement.alarmAlpha = 0.9
                      setInterval(function () {
                        if (alertelement.alarm === alertinfo) {
                          alertelement.alarm = null
                        } else {
                          alertelement.alarm = alertinfo
                        }
                      }, 2000)
                      var inlinks = alertelement.inLinks
                      if (inlinks !== null) {
                        $.each(inlinks, function (i, link) {
                          link.strokeColor = '255,0,0'
                        })
                      }
                      var outlinks = alertelement.outLinks
                      if (outlinks !== null) {
                        $.each(outlinks, function (i, link) {
                          link.strokeColor = '255,0,0'
                        })
                      }
                    }
                  })
                }
              })
            }
            if (jsonObj.linkList != null) {
              $.each(jsonObj.linkList, function (i, e) {
                var startNode = forEachStagesElement(stage, e.start)
                var endNode = forEachStagesElement(stage, e.end)
                var l = newLink(startNode, endNode, e.type)
                addLink(l)
              })
            }
            $('#infoName').html(infoData.infoName)
            $('#infoId').val(infoData.id)
          }
          stage.centerAndZoom()
        }
        var timer = setInterval(() => {
          var infoData = $('#infoData').val()
          if (infoData !== null && infoData !== '') {
            gettopologydata(infoData)
            clearInterval(timer)
          }
        }, 1000)
      }
      function addNode (node) {
        var n = new jTopo.Node(node.name)
        var index = getArrayIndex(data.devices, node.type)
        n.id = node.id
        n.nodetype = node.type
        n.nodeip = node.ip
        n.setLocation(node.left, node.top)
        var imgeurl = data.devicesimg[index]
        n.setImage(imgeurl)
        n.fontColor = '26,145,238'
        n.font = 'bold 12px 微软雅黑'
        n.setSize(data.devicessize[index][0], data.devicessize[index][1])
        scene.add(n)
        n.addEventListener('mouseup', function (e) {
          currentNode = this
          handler(e)
        })
        n.mousedown(function (e) {
          if (e.target === null || e.target === beginNode || e.target === link) {
            scene.remove(link)
          }
        })
      }
      function getArrayIndex (arr, obj) {
        var i = arr.length
        while (i--) {
          if (arr[i] === obj) {
            return i
          }
        }
        return -1
      }
      function newLink (nodeA, nodeZ, linestyle) {
        var l = null
        if (linestyle === 'defaultline') {
          l = new jTopo.Link(nodeA, nodeZ)
          l.lineWidth = 2
          l.strokeColor = '26,145,238'
          l.arrowsRadius = 12
          l.shadow = false
          l.bundleGap = 20
          l.linktype = 'defaultline'
        } else if (linestyle === 'simpleline') {
          l = new jTopo.Link(nodeA, nodeZ)
          l.lineWidth = 2
          // l.dashedPattern = 5
          l.arrowsRadius = 12
          l.bundleOffset = 60
          l.bundleGap = 20
          l.textOffsetY = 3
          l.strokeColor = '26,145,238'
          l.linktype = 'simpleline'
        } else if (linestyle === 'polyline') {
          l = new jTopo.FoldLink(nodeA, nodeZ)
          l.direction = 'horizontal'
          l.arrowsRadius = 12
          l.lineWidth = 2
          l.bundleOffset = 60 // 折线拐角处的长度
          l.bundleGap = 20 // 线条之间的间隔
          l.textOffsetY = 3 // 文本偏移量（向下3个像素）
          l.strokeColor = '26,145,238'
          l.linktype = 'polyline'
          // l.dashedPattern = 5
        } else if (linestyle === 'dbpolyline') {
          l = new jTopo.FlexionalLink(nodeA, nodeZ)
          l.direction = 'horizontal'
          l.arrowsRadius = 12
          l.lineWidth = 2 // 线宽
          l.offsetGap = 35
          l.bundleGap = 15 // 线条之间的间隔
          l.textOffsetY = 10 // 文本偏移量（向下15个像素）
          l.strokeColor = '26,145,238'
          l.linktype = 'dbpolyline'
          // l.dashedPattern = 3
        } else if (linestyle === 'curve') {
          l = new jTopo.CurveLink(nodeA, nodeZ)
          l.lineWidth = 2 // 线宽
          l.arrowsRadius = 12
          l.strokeColor = '26,145,238'
          l.linktype = 'curve'
        }
        return l
      }
      function addLink (l) {
        scene.add(l)
        l.addEventListener('mouseup', function (e) {
          handlerLine(e)
        })
      }
      function handlerLine (e) {
        if (e.button === 2) { // 右键
          // 当前位置弹出菜单（div）
          $('#linemenu').css({
            top: e.pageY,
            left: e.pageX
          }).show()
        }
      }
      function forEachStagesElement (stage, id) {
        for (var i = 0; i < stage.childs.length; i++) {
          var scene = stage.childs[i]
          for (var j = 0; j < scene.childs.length; j++) {
            var e = scene.childs[j]
            if (e.id === id) {
              return e
            }
          }
        }
        return null
      }
      function handler (e) {
        if (e.button === 2) { // 右键
          // 当前位置弹出菜单（div）
          $('#contextmenu').css({
            top: e.pageY,
            left: e.pageX
          }).show()
          scene.remove(link)
          if (e.target.nodeip !== null && e.target.nodeip !== '' && e.target.nodeip !== undefined && e.target.nodeip !== 'ndefined') {
            $('#assetsIp').text(e.target.nodeip)
            var assets = window.showAssetsChange(e.target.nodeip)
            assets.then(res => {
              $('#assetsName').text(res)
            })
          } else {
            $('#assetsIp').text('')
            $('#assetsName').text('')
          }
        } else {
          if (e.target !== null && e.target instanceof jTopo.Node && $('input[name="modeRadio"]:checked').val() === 'normal') {
            if (beginNode === null) {
              beginNode = e.target
              addLink(link)
              tempNodeA.setLocation(e.x, e.y)
              tempNodeZ.setLocation(e.x, e.y)
            } else if (beginNode !== e.target) {
              var endNode = e.target
              var l = newLink(beginNode, endNode, $('input[name="linestyle"]:checked').val())
              addLink(l)
              beginNode = null
              scene.remove(link)
            } else {
              beginNode = null
            }
          } if (e.target !== null && e.target instanceof jTopo.Node) {
            $('#node_id').val(e.target.id)
            $('#node_name').val(e.target.text)
            $('#node_type').val(e.target.nodetype)
            $('#node_x').val(e.target.x)
            $('#node_y').val(e.target.y)
            $('#node_w').val(e.target.width)
            $('#node_h').val(e.target.height)
            $('#node_ip').val(e.target.nodeip)
          } else {
            scene.remove(link)
          }
        }
      }
      stage.click(function (event) {
        if (scene.selectedElements.length === 0) {
          propReset()
        }
        if (event.button === 0) {
          $('#contextmenu').hide()
          $('#linemenu').hide()
        }
      })
      // function clearInfoData () {
      //   var infoData = $('#infoData').val()
      //   if (infoData !== null && infoData !== '') {
      //     return true
      //   } else {
      //     return false
      //   }
      // }
      $('#subconfirm').click(function (e) {
        if ($('#node_name').val() !== '') {
          currentNode.text = $('#node_name').val()
          currentNode.nodeip = $('#node_ip').val()
        } else {
          alert('请先选择设备！')
        }
      })

      $('#contextmenuClose').click(function (e) {
        $('#contextmenu').hide()
      })

      $('#redalert').click(function () {
        if ($('#node_name').val() === '') {
          alert('请先选择设备！')
          return
        }
        var alertid = $('#node_id').val()
        var alertinfo = $('#node_name').val() + '：出现问题！'
        var alertelement = forEachStagesElement(stage, alertid)
        alertelement.alarm = alertinfo
        alertelement.alarmColor = '255,0,0'
        alertelement.alarmAlpha = 0.9
        setInterval(function () {
          if (alertelement.alarm === alertinfo) {
            alertelement.alarm = null
          } else {
            alertelement.alarm = alertinfo
          }
        }, 600)
        var inlinks = alertelement.inLinks
        if (inlinks !== null) {
          $.each(inlinks, function (i, link) {
            link.strokeColor = '255,0,0'
          })
        }
        var outlinks = alertelement.outLinks
        if (outlinks !== null) {
          $.each(outlinks, function (i, link) {
            link.strokeColor = '255,0,0'
          })
        }
      })
      function propReset () {
        $('#node_id').val('')
        $('#node_name').val('')
        $('#node_type').val('')
        $('#node_x').val('')
        $('#node_y').val('')
        $('#node_w').val('')
        $('#node_h').val('')
        $('#node_ip').val('')
      }
    })
  },
  beforeDestroy () {
    // window.removeEventListener('resize', this.getResize)
    if (this.timer) {
      clearInterval(this.timer)
    }
    if (this.timermakeData1) {
      clearInterval(this.timermakeData1)
    }
    if (this.timermakeData1_1) {
      clearInterval(this.timermakeData1_1)
    }
    if (this.timermakeData1_2) {
      clearInterval(this.timermakeData1_2)
    }
    if (this.timermakeData2_1) {
      clearInterval(this.timermakeData2_1)
    }
    if (this.timermakeData2_2) {
      clearInterval(this.timermakeData2_2)
    }
    if (this.timermakeData2_1_1) {
      clearInterval(this.timermakeData2_1_1)
    }
    if (this.timermakeData2_1_2) {
      clearInterval(this.timermakeData2_1_2)
    }
    if (this.timermakeData5_2) {
      clearInterval(this.timermakeData5_2)
    }
    if (this.timermakeData6_1) {
      clearInterval(this.timermakeData6_1)
    }
    if (this.timermakeData6_2) {
      clearInterval(this.timermakeData6_2)
    }
    if (this.timermakeData6_3) {
      clearInterval(this.timermakeData6_3)
    }
    if (this.timermakeData6_4) {
      clearInterval(this.timermakeData6_4)
    }
  },
  methods: {
    showInfo () {
      this.makeData1()
      this.makeData2()
      this.makeData3()
      this.makeData4()
      this.makeData5()
      this.makeData6()
    },
    situation () {
      var errorCount = this.errorCount
      if (errorCount !== null && (errorCount >= 5 && errorCount <= 15)) {
        this.errorStyle = 'box3_con_left'
        this.small_index = 'small_index_2'
        this.operation = '运行出现故障'
        var svgclouds2 = document.getElementById('svg_clouds')
        svgclouds2.style = 'display: block'
        var svghurricane2 = document.getElementById('svg_hurricane')
        svghurricane2.style = 'display: none'
        var svgsky2 = document.getElementById('svg_sky')
        svgsky2.style = 'display: none'
      } else if (errorCount !== null && (errorCount > 15)) {
        this.errorStyle = 'box3_con_left'
        this.small_index = 'small_index_3'
        this.operation = '运行故障较多'
        var svgclouds3 = document.getElementById('svg_clouds')
        svgclouds3.style = 'display: none'
        var svghurricane3 = document.getElementById('svg_hurricane')
        svghurricane3.style = 'display: block'
        var svgsky3 = document.getElementById('svg_sky')
        svgsky3.style = 'display: none'
      } else {
        this.errorStyle = 'box3_con_left'
        this.small_index = 'small_index_1'
        this.operation = '运行良好'
        var svgclouds1 = document.getElementById('svg_clouds')
        svgclouds1.style = 'display: none'
        var svghurricane1 = document.getElementById('svg_hurricane')
        svghurricane1.style = 'display: none'
        var svgsky1 = document.getElementById('svg_sky')
        svgsky1.style = 'display: block'
      }
    },
    check_data_info (str) {
      if (str == null || str === undefined || str === 'undefined' || str === '') {
        return true
      }
      return false
    },
    makeData1 () {
      const xdata = []
      this.axios.post(this.$api.main.getInformationStatistics).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.errorCount = json.data.average + json.data.high + json.data.disaster
            xdata.push(
              { name: '信息', value: json.data.information },
              { name: '警告', value: json.data.warning },
              { name: '一般严重', value: json.data.average },
              { name: '严重', value: json.data.high },
              { name: '灾难', value: json.data.disaster }
            )
            this.situation()
            this.makeData1_info(xdata, '1', '全部')
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
      this.makeData1_1()
      this.makeData1_2()
    },
    makeData1_info (xdata, num, str) {
      const pieCharts = document.getElementById('ibox_content_echarts' + num)
      if (this.check_data_info(xdata)) {
        pieCharts.className = 'no_data'
        return
      }
      const myChart = this.$echarts.init(pieCharts)
      var colorList = [{
        type: 'linear',
        x: 0,
        y: 0,
        x2: 1,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(0,228,255,0.2)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(0,228,255,0.8)' // 100% 处的颜色
        }
        ],
        globalCoord: false // 缺省为 false
      },
      {
        type: 'linear',
        x: 1,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [{
          offset: 0,
          color: 'rgba(0,127,229,0.2)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(0,127,229,0.8)' // 100% 处的颜色
        }
        ],
        globalCoord: false // 缺省为 false
      },
      {
        type: 'linear',
        x: 1,
        y: 0,
        x2: 0,
        y2: 0,
        colorStops: [{
          offset: 0,
          color: 'rgba(3,70,248,0.2)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(3,70,248,0.8)' // 100% 处的颜色
        }
        ],
        globalCoord: false // 缺省为 false
      },
      {
        type: 'linear',
        x: 0,
        y: 1,
        x2: 0,
        y2: 0,
        colorStops: [{
          offset: 0,
          color: 'rgba(245,172,43,0.2)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(245,172,43,0.8)' // 100% 处的颜色
        }
        ],
        globalCoord: false // 缺省为 false
      },
      {
        type: 'linear',
        x: 1,
        y: 1,
        x2: 1,
        y2: 0,
        colorStops: [{
          offset: 0,
          color: 'rgba(252,75,75,0.2)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(252,75,75,0.8)' // 100% 处的颜色
        }
        ],
        globalCoord: false // 缺省为 false
      }
      ]
      var colorLine = ['#00e4ff', '#0179f7', '#0346f8', '#f5ac2b', '#FE6969']

      function getRich () {
        var result = {}
        colorLine.forEach((v, i) => {
          result[`hr${i}`] = {
            backgroundColor: colorLine[i],
            borderRadius: 3,
            width: 3,
            height: 3,
            padding: [3, 3, 0, -12]
          }
          result[`a${i}`] = {
            padding: [8, -60, -20, -20],
            color: colorLine[i],
            fontSize: 12
          }
        })
        return result
      }
      var data = xdata
      xdata.forEach((v, i) => {
        v.labelLine = {
          lineStyle: {
            width: 1,
            color: colorLine[i]
          }
        }
      })
      var option = {
        title: [{
          text: str,
          x: 'center',
          y: 'center',
          top: '48%',
          left: '30%',
          textStyle: {
            color: '#AAAFC8',
            fontWeight: 'normal',
            fontSize: 8
          }
        }, {
          text: '问题类别占比',
          x: 'center',
          y: 'center',
          top: '53%',
          left: '24%',
          textStyle: {
            color: '#AAAFC8',
            fontWeight: 'normal',
            fontSize: 8
          }
        }],
        legend: {
          data: ['信息', '警告', '一般严重', '严重', '灾难'],
          orient: 'vertical',
          right: '5%',
          top: '25%',
          itemWidth: 20,
          itemHeight: 10,
          itemGap: 15,
          textStyle: {
            color: '#fff',
            fontSize: 12
          }
        },
        series: [{
          type: 'pie',
          radius: ['25%', '50%'],
          center: ['35%', '58%'],
          clockwise: true,
          avoidLabelOverlap: true,
          hoverAnimation: true,
          label: {
            show: false,
            position: 'outside',
            formatter: function (params) {
              const name = params.name
              const percent = params.percent + '%'
              const index = params.dataIndex
              return [`{a${index}|${name}：${percent}}`, `{hr${index}|}`].join('\n')
            },
            rich: getRich(),
            emphasis: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              color: function (params) {
                return colorList[params.dataIndex]
              }
            }
          },
          labelLine: {
            normal: {
              show: false,
              length: 1,
              length2: 1,
              smooth: true,
              lineStyle: {
                width: 1
              }
            },
            emphasis: {
              show: true
            }
          },
          data,
          roseType: 'radius'
        }]
      }
      myChart.setOption(option, true)
      var app = {
        currentIndex: -1
      }
      if (str === '1') {
        this.timermakeData1 = setInterval(() => {
          var dataLen = option.series[0].data.length
          // 取消之前高亮的图形
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          app.currentIndex = (app.currentIndex + 1) % dataLen
          // 高亮当前图形
          myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          // 显示 tooltip
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          if (this.timermakeData1) {
            this.timermakeData1 = ''
          }
        }, 2000)
      } else {
        this.timermakeData1_1 = setInterval(() => {
          var dataLen = option.series[0].data.length
          // 取消之前高亮的图形
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          app.currentIndex = (app.currentIndex + 1) % dataLen
          // 高亮当前图形
          myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          // 显示 tooltip
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          if (this.timermakeData1_1) {
            this.timermakeData1_1 = ''
          }
        }, 2000)
      }
    },
    makeData1_1 () {
      var xdata = []
      var starttime = timesMethod.fun_date(0)
      var timefrom = timesMethod.getDatestamp(starttime)
      var endtime = timesMethod.fun_date(1)
      var timetill = timesMethod.getDatestamp(endtime)
      this.axios.post(this.$api.main.getInformationStatisticsWeek, qs.stringify({
        timeFrom: timefrom,
        timeTill: timetill
      })).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            xdata.push(
              { name: '信息', value: json.data.information },
              { name: '警告', value: json.data.warning },
              { name: '一般严重', value: json.data.average },
              { name: '严重', value: json.data.high },
              { name: '灾难', value: json.data.disaster }
            )
            this.makeData1_info(xdata, '1_1', '当日')
          }
        } else {
          this.$message({
            message: '获取分组信息失败',
            type: 'error'
          })
        }
      })
    },
    makeData1_2 () {
      var starttime = timesMethod.fun_date(-6)
      var timefrom = timesMethod.getDatestamp(starttime)
      var endtime = timesMethod.fun_date(1)
      var timetill = timesMethod.getDatestamp(endtime)
      this.axios.post(this.$api.main.getInformationStatisticsWeek, qs.stringify({
        timeFrom: timefrom,
        timeTill: timetill
      })).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.makeData1_2_info(json.data)
          }
        } else {
          this.$message({
            message: '获取分组信息失败',
            type: 'error'
          })
        }
      })
    },
    makeData1_2_info (makeData) {
      var dom2 = document.getElementById('ibox_content_echarts2')
      if (this.check_data_info(makeData)) {
        dom2.className = 'no_data2'
        return
      }
      var dateTime = []
      for (var i = 0; i < 7; i++) {
        var tempDate = new Date() // 获取今天的日期
        tempDate.setDate(tempDate.getDate() - i) // 今天的前N天的日期，N自定义
        var endDate = (tempDate.getMonth() + 1) + '月' + tempDate.getDate() + '日'
        dateTime.push(endDate)
      }
      dateTime = dateTime.reverse()
      var myChart = this.$echarts.init(dom2)
      var option = {
        grid: {
          left: '5%',
          top: '20%',
          width: '90%',
          height: '55%',
          x: 60,
          y: 20
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(135,206,255,0.3)',
          textStyle: {
            color: 'rgba(255,250,205)'
          },
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                top: '40%',
                colorStops: [{
                  offset: 0,
                  color: 'rgba(255, 0, 0,0)'
                }, {
                  offset: 0.5,
                  color: 'rgba(255, 0, 0,1)'
                }, {
                  offset: 1,
                  color: 'rgba(0, 255, 0,0)'
                }],
                global: false
              }
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: dateTime,
          axisLabel: {
            textStyle: {
              color: '#667ba7',
              fontSize: 10
            }
          },
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#667ba7',
              width: '1'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          splitLine: {
            show: true
          },
          type: 'value',
          splitNumber: 3,
          axisLabel: {
            textStyle: {
              color: '#667ba7',
              fontSize: 10
            }
          },
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#667ba7',
              width: '0'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [{
          data: makeData.information,
          type: 'line',
          symbol: 'circle',
          symbolSize: '0',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#00e4ff'
            }
          },
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(0,228,255, 0.3)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(0,228,255, 0)' // 100% 处的颜色
                }],
                global: false
              }
            }
          }
        }, {
          data: makeData.warning,
          type: 'line',
          symbol: 'circle',
          symbolSize: '0',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#0179f7'
            }
          },
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(1,121,247, 0.3)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(1,121,247, 0)' // 100% 处的颜色
                }],
                global: false
              }
            }
          }
        }, {
          data: makeData.average,
          type: 'line',
          symbol: 'circle',
          symbolSize: '0',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#0346f8'
            }
          },
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(3,70,248, 0.3)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(3,70,248, 0)' // 100% 处的颜色
                }],
                global: false
              }
            }
          }
        }, {
          data: makeData.high,
          type: 'line',
          symbol: 'circle',
          symbolSize: '0',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#f5ac2b'
            }
          },
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(245,172,43, 0.3)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(245,172,43, 0)' // 100% 处的颜色
                }],
                global: false
              }
            }
          }
        }, {
          data: makeData.disaster,
          type: 'line',
          symbol: 'circle',
          symbolSize: '0',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#FE6969'
            }
          },
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(254,105,105, 0.3)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(254,105,105, 0)' // 100% 处的颜色
                }],
                global: false
              }
            }
          }
        }]
      }
      myChart.setOption(option, true)
      var app = {
        currentIndex: -1
      }
      this.timermakeData1_2 = setInterval(() => {
        var dataLen = option.series[0].data.length
        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        })
        app.currentIndex = (app.currentIndex + 1) % dataLen
        // 高亮当前图形
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        })
        // 显示 tooltip
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        })
        if (this.timermakeData1_2) {
          this.timermakeData1_2 = ''
        }
      }, 2000)
    },
    makeData2 () {
      var param1 = 'bytes_received'
      this.makeData2_1_Data(param1, '1', '接收字节数', 1)
      var param2 = 'questions'
      this.makeData2_1_Data(param2, '2', '每秒问题数', 2)
      var param3 = 'rates'
      var bordercolor3 = ['rgba(201,231,255,0.8)', 'rgba(255,233,194,0.8)']
      var color3 = ['#007fe5', '#ffb32a']
      this.makeData2_Data(param3, '3', '每秒查询数', color3, bordercolor3, 1)
      var param4 = 'connecteds'
      var bordercolor4 = ['rgba(201,231,255,0.8)', 'rgba(201,255,239,0.8)']
      var color4 = ['#007fe5', '#44e6c2']
      this.makeData2_Data(param4, '4', '用户连接数', color4, bordercolor4, 2)
    },
    async makeData2_Data (param, num, str, color, bordercolor, flag) {
      await this.axios.post(this.$api.main.getTimeTopItemInfo, qs.stringify({
        item: param,
        num: 2
      })).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.makeData2_info(json.data, num, str, color, bordercolor, flag)
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
    async makeData2_1_Data (param, num, str, flag) {
      await this.axios.post(this.$api.main.getTimeTopItemInfo, qs.stringify({
        item: param,
        num: 4
      })).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.makeData2_1_info(json.data, num, str, flag)
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
    makeData2_info (myChartData, num, str, color, bordercolor, flag) {
      var dom3 = document.getElementById('ibox_data_echarts' + num)
      if (this.check_data_info(myChartData) || myChartData.legend.length < 2) {
        dom3.className = 'no_data3'
        return
      }
      var returndataclocktime = []
      if (myChartData.xAxis !== null) {
        myChartData.xAxis.forEach(element => {
          if (element === '00') {
            returndataclocktime.push('0时')
          } else {
            returndataclocktime.push(element + '时')
          }
        })
      }
      var myChart = this.$echarts.init(dom3)
      var fontColor = '#667ba7'
      var option = {
        // backgroundColor: '#ffffff',
        title: {
          text: str,
          textStyle: {
            fontSize: 14,
            fontWeight: 400,
            color: '#fff'
          },
          left: '35%',
          top: '0%'
        },
        grid: {
          left: '0%',
          right: '10%',
          top: '25%',
          bottom: '10%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(135,206,255,0.3)',
          textStyle: {
            color: 'rgba(255,250,205)'
          },
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                top: '40%',
                colorStops: [{
                  offset: 0,
                  color: 'rgba(255, 0, 0,0)'
                }, {
                  offset: 0.5,
                  color: 'rgba(255, 0, 0,1)'
                }, {
                  offset: 1,
                  color: 'rgba(0, 255, 0,0)'
                }],
                global: false
              }
            }
          }
        },
        // legend: {
        //   show: true,
        //   right: '5%',
        //   y: '10',
        //   icon: 'circle',
        //   itemWidth: 10,
        //   itemHeight: 10,
        //   itemGap: 10,
        //   textStyle: {
        //     fontSize: 10,
        //     color: '#667ba7'
        //   },
        //   data: myChartData.legend
        // },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLabel: {
            color: fontColor,
            fontSize: 10
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#667ba7'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          data: returndataclocktime
        }],
        yAxis: [{
          type: 'value',
          splitNumber: 4,
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: '#667ba7',
              fontSize: 10
            }
          },
          axisLine: {
            lineStyle: {
              color: '#667ba7'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        }
        ],
        series: [{
          name: myChartData.legend[0],
          type: 'line',
          stack: myChartData.legend[0],
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: {
            color: color[0],
            borderColor: bordercolor[0],
            borderWidth: 1,
            shadowColor: 'rgba(0, 0, 0,)',
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2
          },
          markPoint: {
            itemStyle: {
              normal: {
                color: 'red'
              }
            }
          },
          data: myChartData.series[0].data
        },
        {
          name: myChartData.legend[1],
          type: 'line',
          stack: myChartData.legend[1],
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: {
            color: color[1],
            borderColor: bordercolor[1],
            borderWidth: 1,
            shadowColor: 'rgba(0, 0, 0,)',
            shadowBlur: 0,
            shadowOffsetY: 2,
            shadowOffsetX: 2
          },
          data: myChartData.series[1].data
        }
        ]
      }
      myChart.setOption(option, true)
      var app = {
        currentIndex: -1
      }
      if (flag === 1) {
        this.timermakeData2_1 = setInterval(() => {
          var dataLen = option.series[0].data.length
          // 取消之前高亮的图形
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          app.currentIndex = (app.currentIndex + 1) % dataLen
          // 高亮当前图形
          myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          // 显示 tooltip
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          if (this.timermakeData2_1) {
            this.timermakeData2_1 = ''
          }
        }, 2000)
      } else if (flag === 2) {
        this.timermakeData2_2 = setInterval(() => {
          var dataLen = option.series[0].data.length
          // 取消之前高亮的图形
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          app.currentIndex = (app.currentIndex + 1) % dataLen
          // 高亮当前图形
          myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          // 显示 tooltip
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          if (this.timermakeData2_2) {
            this.timermakeData2_2 = ''
          }
        }, 2000)
      }
    },
    makeData2_1_info (myChartData, num, str, flag) {
      var domdata = document.getElementById('ibox_data_echarts' + num)
      if (this.check_data_info(myChartData) || myChartData.series.length < 4) {
        domdata.className = 'no_data3'
        return
      }
      var numOne = myChartData.series[0].data[myChartData.series[0].data.length - 1]
      var numTwo = myChartData.series[1].data[myChartData.series[1].data.length - 1]
      var numThree = myChartData.series[2].data[myChartData.series[2].data.length - 1]
      var numFour = myChartData.series[3].data[myChartData.series[3].data.length - 1]
      var numNameOne = myChartData.series[0].name
      var numNameTwo = myChartData.series[1].name
      var numNameThree = myChartData.series[2].name
      var numNameFour = myChartData.series[3].name
      var namedata = [numNameOne, numNameTwo, numNameThree, numNameFour]
      var echarts = this.$echarts
      var myChart = echarts.init(domdata)
      var option = {
        title: {
          text: str,
          textStyle: {
            fontSize: 14,
            fontWeight: 400,
            color: '#ffffff'
          },
          left: '35%',
          top: '0%'
        },
        grid: {
          left: '10%',
          right: '10%',
          bottom: '20%',
          top: '25%'
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(135,206,255,0.3)',
          textStyle: {
            color: 'rgba(255,250,205)'
          },
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                top: '40%',
                colorStops: [{
                  offset: 0,
                  color: 'rgba(255, 0, 0,0)'
                }, {
                  offset: 0.5,
                  color: 'rgba(255, 0, 0,1)'
                }, {
                  offset: 1,
                  color: 'rgba(0, 255, 0,0)'
                }],
                global: false
              }
            }
          }
        },
        xAxis: [{
          type: 'value',
          boundaryGap: false,
          axisLabel: {
            color: '#667ba7',
            fontSize: 10
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#667ba7'
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          }
        }],
        yAxis: [{
          type: 'category',
          axisLabel: {
            textStyle: {
              color: '#667ba7',
              fontSize: '10'
            },
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#667ba7'
            }
          },
          data: namedata
        }],
        series: [{
          name: '值',
          type: 'bar',
          zlevel: 1,
          xAxisIndex: 0,
          barWidth: 6,
          data: [
            {
              value: numOne,
              itemStyle: {
                normal: {
                  barBorderRadius: [0, 5, 5, 0],
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#015eea'
                  }, {
                    offset: 1,
                    color: '#00c0fa'
                  }], false)
                }
              }
            },
            {
              value: numTwo,
              itemStyle: {
                normal: {
                  barBorderRadius: [0, 5, 5, 0],
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#0cbf8b'
                  }, {
                    offset: 1,
                    color: '#3fd8d1'
                  }], false)
                }
              }
            },
            {
              value: numThree,
              itemStyle: {
                normal: {
                  barBorderRadius: [0, 5, 5, 0],
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#ff8501'
                  }, {
                    offset: 1,
                    color: '#ffbf3a'
                  }], false)
                }
              }
            },
            {
              value: numFour,
              itemStyle: {
                normal: {
                  barBorderRadius: [0, 5, 5, 0],
                  color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                    offset: 0,
                    color: '#d8447c'
                  }, {
                    offset: 1,
                    color: '#ff9e9e'
                  }], false)
                }
              }
            }
          ]
        }
        ]
      }
      myChart.setOption(option, true)
      var app = {
        currentIndex: -1
      }
      if (flag === 1) {
        this.timermakeData2_1_1 = setInterval(() => {
          var dataLen = option.series[0].data.length
          // 取消之前高亮的图形
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          app.currentIndex = (app.currentIndex + 1) % dataLen
          // 高亮当前图形
          myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          // 显示 tooltip
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          if (this.timermakeData2_1) {
            this.timermakeData2_1 = ''
          }
        }, 2000)
      } else if (flag === 2) {
        this.timermakeData2_1_2 = setInterval(() => {
          var dataLen = option.series[0].data.length
          // 取消之前高亮的图形
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          app.currentIndex = (app.currentIndex + 1) % dataLen
          // 高亮当前图形
          myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          // 显示 tooltip
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          if (this.timermakeData2_2) {
            this.timermakeData2_2 = ''
          }
        }, 2000)
      }
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
      this.axios.post(this.$api.alertManager.alertInquire.getProblemHosts, region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            if (json.data !== null) {
              this.tableData = json.data
              this.tableData.forEach(element => {
                var proname = element.zabbixProblemDTO.name
                if (proname !== null) {
                  var hostName = ''
                  var cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g
                  var mat = proname.match(cnReg)
                  var length = 0
                  if (mat) {
                    length = proname.length + mat.length
                  } else {
                    length = proname.length
                  }
                  if (length > 70) {
                    hostName = element.zabbixProblemDTO.name.substring(0, 70 - (mat.length * 2))
                    element.zabbixProblemDTO.name = hostName + '...'
                  }
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
      var param = 'utilization'
      this.makeData5_Data(param, '内存使用率')
    },
    async makeData5_Data (param, str) {
      await this.axios.post(this.$api.main.getTimeTopItemInfo, qs.stringify({
        item: param,
        num: 4
      })).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.makeData5_info(json.data, '1')
            this.makeData5_info(json.data, '2')
            this.makeData5_2_info(json.data, str)
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
    makeData5_info (myChartData, str) {
      var dom = document.getElementById('ibox_centre_echarts' + str)
      if (this.check_data_info(myChartData) || myChartData.series.length < 4) {
        dom.className = 'no_data3'
        return
      }
      var numOne = 0
      var numTwo = 0
      var numThree = 0
      var numFour = 0
      if (str === '1') {
        numOne = myChartData.series[0].data[1]
        numTwo = myChartData.series[1].data[1]
        numThree = myChartData.series[2].data[1]
        numFour = myChartData.series[3].data[1]
      } else {
        numOne = myChartData.series[0].data[myChartData.series[0].data.length - 1]
        numTwo = myChartData.series[1].data[myChartData.series[1].data.length - 1]
        numThree = myChartData.series[2].data[myChartData.series[2].data.length - 1]
        numFour = myChartData.series[3].data[myChartData.series[3].data.length - 1]
      }
      var numNameOne = myChartData.series[0].name
      var numNameTwo = myChartData.series[1].name
      var numNameThree = myChartData.series[2].name
      var numNameFour = myChartData.series[3].name
      var namedata = [numNameOne, numNameTwo, numNameThree, numNameFour]
      var echarts = this.$echarts
      var breakLine = echarts.init(dom)
      var placeHolderStyle = {
        normal: {
          color: 'rgba(0,0,0,0)',
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        },
        emphasis: {
          color: 'rgba(0,0,0,0)'
        }
      }
      var option = {
        // backgroundColor: '#0b214a',
        color: ['#163ce3', '#3fd8d1', '#ffbf3a', '#fe9d9d'],
        tooltip: {
          show: true,
          formatter: '{b} : {c}'
        },
        legend: {
          data: namedata,
          orient: 'vertical',
          right: '1%',
          top: '25%',
          itemWidth: 15,
          itemHeight: 10,
          itemGap: 15,
          textStyle: {
            color: '#ffffff',
            fontSize: 10
          },
          formatter: function (parms) {
            if (parms !== null && parms.length > 4) {
              parms = parms.substring(0, 4) + '...'
            }
            return parms
          }
        },
        series: [
          {
            name: namedata[0],
            type: 'pie',
            clockWise: true,
            hoverAnimation: false,
            radius: ['50%', '55%'],
            center: ['35%', '50%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [
                  {
                    offset: 0,
                    color: '#00c0fa'
                  },
                  {
                    offset: 1,
                    color: '#015eea'
                  }
                ], false)
              }
            },
            data: [{
              value: numOne,
              name: '信息'
            }, {
              value: 100,
              name: '总数',
              tooltip: {
                show: false
              },
              itemStyle: placeHolderStyle
            }
            ]
          }, {
            name: namedata[1],
            type: 'pie',
            clockWise: true,
            radius: ['40%', '45%'],
            center: ['35%', '50%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [
                  {
                    offset: 0,
                    color: '#3fd8d1'
                  },
                  {
                    offset: 1,
                    color: '#0cbf8b'
                  }
                ], false)
              }
            },
            hoverAnimation: false,
            data: [{
              value: numTwo,
              name: '警告'
            }, {
              value: 100,
              name: '总数',
              tooltip: {
                show: false
              },
              itemStyle: placeHolderStyle
            }]
          }, {
            name: namedata[2],
            type: 'pie',
            clockWise: true,
            hoverAnimation: false,
            radius: ['30%', '35%'],
            center: ['35%', '50%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [
                  {
                    offset: 0,
                    color: '#ffbf3a'
                  },
                  {
                    offset: 1,
                    color: '#ff8501'
                  }
                ], false)
              }
            },
            data: [{
              value: numThree,
              name: '严重'
            }, {
              value: 100,
              name: '总数',
              tooltip: {
                show: false
              },
              itemStyle: placeHolderStyle
            }]
          },
          {
            name: namedata[3],
            type: 'pie',
            clockWise: true,
            radius: ['20%', '25%'],
            center: ['35%', '50%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [
                  {
                    offset: 0,
                    color: '#ff9e9e'
                  },
                  {
                    offset: 1,
                    color: '#d8447c'
                  }
                ], false)
              }
            },
            hoverAnimation: false,
            data: [{
              value: numFour,
              name: '一般'
            }, {
              value: 100,
              name: '总数',
              tooltip: {
                show: false
              },
              itemStyle: placeHolderStyle
            }
            ]
          }
        ]
      }
      breakLine.setOption(option, true)
    },
    makeData5_2_info (myChartData, str) {
      var dom = document.getElementById('ibox_content_echarts3')
      if (this.check_data_info(myChartData) || myChartData.series.length < 4) {
        dom.className = 'no_data2'
        return
      }
      var returndataclocktime = []
      if (myChartData.xAxis !== null) {
        myChartData.xAxis.forEach(element => {
          if (element === '00') {
            returndataclocktime.push('0时')
          } else {
            returndataclocktime.push(element + '时')
          }
        })
      }
      var myChart = this.$echarts.init(dom)
      var option = {
        grid: {
          left: '2%',
          right: '5%',
          top: '25%',
          bottom: '10%',
          containLabel: true
        },
        title: {
          text: str,
          textStyle: {
            fontSize: 14,
            fontWeight: 400,
            color: '#fff'
          },
          left: '42.5%',
          top: '5%'
        },
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(135,206,255,0.3)',
          textStyle: {
            color: 'rgba(255,250,205)'
          },
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                top: '40%',
                colorStops: [{
                  offset: 0,
                  color: 'rgba(255, 0, 0,0)'
                }, {
                  offset: 0.5,
                  color: 'rgba(255, 0, 0,1)'
                }, {
                  offset: 1,
                  color: 'rgba(0, 255, 0,0)'
                }],
                global: false
              }
            }
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: returndataclocktime,
          axisLabel: {
            textStyle: {
              color: '#667ba7',
              fontSize: 10
            }
          },
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#667ba7',
              width: '1'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: {
          splitLine: {
            show: true
          },
          type: 'value',
          splitNumber: 5,
          axisLabel: {
            textStyle: {
              color: '#667ba7',
              fontSize: 10
            }
          },
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#667ba7',
              width: '0'
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [{
          name: myChartData.legend[0],
          data: myChartData.series[0].data,
          type: 'line',
          symbol: 'circle',
          symbolSize: '0',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#163ce3'
            }
          },
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(22,60,227, 0.3)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(22,60,227, 0)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }
        }, {
          name: myChartData.legend[1],
          data: myChartData.series[1].data,
          type: 'line',
          symbol: 'circle',
          symbolSize: '0',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#00b06c'
            }
          },
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(0,176,108, 0.3)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(0,176,108, 0)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }
        }, {
          name: myChartData.legend[2],
          data: myChartData.series[2].data,
          type: 'line',
          symbol: 'circle',
          symbolSize: '0',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#ff8400'
            }
          },
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(255,132,0, 0.3)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(255,132,0, 0)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }
        }, {
          name: myChartData.legend[3],
          data: myChartData.series[3].data,
          type: 'line',
          symbol: 'circle',
          symbolSize: '0',
          smooth: true,
          itemStyle: {
            normal: {
              color: '#cb1d5f'
            }
          },
          areaStyle: {
            normal: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(203,29,95, 0.3)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(203,29,95, 0)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }
        }]
      }
      myChart.setOption(option, true)
      var app = {
        currentIndex: -1
      }
      this.timermakeData5_2 = setInterval(() => {
        var dataLen = option.series[0].data.length
        // 取消之前高亮的图形
        myChart.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        })
        app.currentIndex = (app.currentIndex + 1) % dataLen
        // 高亮当前图形
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        })
        // 显示 tooltip
        myChart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: app.currentIndex
        })
        if (this.timermakeData5_2) {
          this.timermakeData5_2 = ''
        }
      }, 2000)
    },
    makeData6 () {
      var param1 = 'heapMemoryUsage'
      this.makeData6_Data(param1, '使用的堆内存', 1, '1')
      var param2 = 'memoryPool'
      this.makeData6_Data(param2, '使用代码缓存', 1, '2')
      var param3 = 'loadedClass'
      this.makeData6_Data(param3, '加载的类总数', 2, '3')
      var param4 = 'unloadedClass'
      this.makeData6_Data(param4, '卸载的类计数', 2, '4')
    },
    async makeData6_Data (param, str, flag, dataFlag) {
      await this.axios.post(this.$api.main.getTimeTopItemInfo, qs.stringify({
        item: param,
        num: 4
      })).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            if (flag === 1) {
              this.makeData6_1_info(json.data, str, dataFlag)
            } else {
              this.makeData6_info(json.data, str, dataFlag)
            }
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
    makeData6_1_info (myChartData, str, flag) {
      var dom = document.getElementById('ibox_jvm_echarts' + flag)
      if (this.check_data_info(myChartData) || myChartData.series.length < 4) {
        dom.className = 'no_data3'
        return
      }
      var numOne = myChartData.series[0].data[myChartData.series[0].data.length - 1]
      var numTwo = myChartData.series[1].data[myChartData.series[1].data.length - 1]
      var numThree = myChartData.series[2].data[myChartData.series[2].data.length - 1]
      var numFour = myChartData.series[3].data[myChartData.series[3].data.length - 1]
      numOne = numOne / 1024 / 1024
      numTwo = numTwo / 1024 / 1024
      numThree = numThree / 1024 / 1024
      numFour = numFour / 1024 / 1024
      var numdata = [numOne, numTwo, numThree, numFour]
      var numNameOne = myChartData.series[0].name
      var numNameTwo = myChartData.series[1].name
      var numNameThree = myChartData.series[2].name
      var numNameFour = myChartData.series[3].name
      var namedata = [numNameOne, numNameTwo, numNameThree, numNameFour]
      var max = numdata.reduce(function (a, b) {
        return b > a ? b : a
      })
      max = max * 2
      var echarts = this.$echarts
      var myChart = echarts.init(dom)
      var option = {
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(135,206,255,0.3)',
          textStyle: {
            color: 'rgba(255,250,205)'
          },
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                top: '40%',
                colorStops: [{
                  offset: 0,
                  color: 'rgba(255, 0, 0,0)'
                }, {
                  offset: 0.5,
                  color: 'rgba(255, 0, 0,1)'
                }, {
                  offset: 1,
                  color: 'rgba(0, 255, 0,0)'
                }],
                global: false
              }
            }
          },
          formatter: function (parms) {
            parms = parms[1].name + ':' + parseFloat(parms[1].value).toFixed(1)
            return parms
          }
        },
        title: {
          text: str,
          textStyle: {
            fontSize: 15,
            fontWeight: 400,
            color: '#ffffff'
          },
          left: '35%',
          top: '0%'
        },
        grid: {
          left: '2%',
          right: '4%',
          bottom: '5%',
          top: '20%',
          containLabel: true
        },
        xAxis: [{
          data: namedata,
          axisLine: {
            lineStyle: {
              color: '#667ba7'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: '#667ba7',
            fontSize: 10,
            interval: 0,
            show: false
          }
        }
        ],
        yAxis: [{
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#667ba7'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#667ba7',
              fontSize: 10
            }
          }
        }],
        series: [
          {
            name: '',
            type: 'pictorialBar',
            symbol: 'rect',
            itemStyle: {
              color: 'rgb(20,29,119,0.7)'
            },
            symbolRepeat: true,
            symbolSize: [24, 2],
            // symbolBoundingData: 100,
            symbolMargin: 1,
            symbolPosition: 'start',
            z: 10,
            textStyle: {
              show: false
            },
            data: [max, max, max, max]
          }, {
            name: '数值',
            type: 'pictorialBar',
            symbol: 'rect',
            barWidth: 23,
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = [['#373af5', '#01dbff'], ['#00e4ff', '#a6f6ff'], ['#01b16d', '#43e6d8'], ['#ff8501', '#ffbf3a']]
                  var index = params.dataIndex
                  if (params.dataIndex >= colorList.length) {
                    index = params.dataIndex - colorList.length
                  }
                  return new echarts.graphic.LinearGradient(0, 0, 0, 1,
                    [
                      { offset: 0, color: colorList[index][1] },
                      { offset: 0.5, color: colorList[index][1] },
                      { offset: 1, color: colorList[index][0] }
                    ])
                },
                barBorderRadius: 5
              }
            },
            z: -20,
            data: numdata,
            label: {
              normal: {
                show: false,
                position: 'top',
                verticalAlign: 'top'
              }
            }
          }]
      }
      myChart.setOption(option, true)
      var app = {
        currentIndex: -1
      }
      if (flag === '1') {
        this.timermakeData6_1 = setInterval(() => {
          var dataLen = option.series[0].data.length
          // 取消之前高亮的图形
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          app.currentIndex = (app.currentIndex + 1) % dataLen
          // 高亮当前图形
          myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          // 显示 tooltip
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          if (this.timermakeData6_1) {
            this.timermakeData6_1 = ''
          }
        }, 2000)
      } else {
        this.timermakeData6_2 = setInterval(() => {
          var dataLen = option.series[0].data.length
          // 取消之前高亮的图形
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          app.currentIndex = (app.currentIndex + 1) % dataLen
          // 高亮当前图形
          myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          // 显示 tooltip
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          if (this.timermakeData6_1) {
            this.timermakeData6_1 = ''
          }
        }, 2000)
      }
    },
    makeData6_info (myChartData, str, flag) {
      var dom = document.getElementById('ibox_jvm_echarts' + flag)
      if (this.check_data_info(myChartData) || myChartData.series.length < 4) {
        dom.className = 'no_data3'
        return
      }
      var returndataclocktime = []
      if (myChartData.xAxis !== null) {
        myChartData.xAxis.forEach(element => {
          if (element === '00') {
            returndataclocktime.push('0时')
          } else {
            returndataclocktime.push(element + '时')
          }
        })
      }
      var echarts = this.$echarts
      var myChart = echarts.init(dom)
      var xData = returndataclocktime
      var lines = [
        myChartData.series[0].data,
        myChartData.series[1].data,
        myChartData.series[2].data
      ]
      var option = {
        // backgroundColor: '#ffffff',
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(135,206,255,0.3)',
          textStyle: {
            color: 'rgba(255,250,205)'
          },
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                top: '40%',
                colorStops: [{
                  offset: 0,
                  color: 'rgba(255, 0, 0,0)'
                }, {
                  offset: 0.5,
                  color: 'rgba(255, 0, 0,1)'
                }, {
                  offset: 1,
                  color: 'rgba(0, 255, 0,0)'
                }],
                global: false
              }
            }
          }
        },
        title: {
          text: str,
          textStyle: {
            fontSize: 14,
            fontWeight: 400,
            color: '#fff'
          },
          left: '35%',
          top: '0%'
        },
        grid: {
          left: '15%',
          top: '20%',
          right: '5%',
          bottom: '15%'
        },
        // legend: {
        //   show: true,
        //   icon: 'circle',
        //   orient: 'horizontal',
        //   top: '5%',
        //   right: '3%',
        //   itemWidth: 5.5,
        //   itemHeight: 6,
        //   itemGap: 5,
        //   textStyle: {
        //     color: '#C9C8CD'
        //   }
        // },
        xAxis: [{
          type: 'category',
          data: xData,
          axisLabel: {
            show: true,
            fontSize: 9,
            textStyle: {
              color: '#C9C8CD' // X轴文字颜色
            },
            formatter: function (value) {
              var str = ''
              str += value.substring(0, 4) + '\n'
              str += value.substring(5, 10)
              return str
            }
          },
          axisLine: {
            show: true // 不显示x轴
          },
          axisTick: {
            show: false // 不显示刻度
          },
          // boundaryGap: false,
          splitLine: {
            show: false,
            width: 0.08,
            lineStyle: {
              type: 'solid',
              color: '#03202E'
            }
          },
          axisPointer: { // 轴指示器
            type: 'shadow',
            z: 1,
            shadowStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(0,127,229,0)' // 0% 处的颜色
                }, {
                  offset: 1,
                  color: 'rgba(0,127,229,0.2)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              },
              shadowColor: 'rgba(0, 0, 0, 0.2)',
              shadowBlur: 5
            }
          }
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: 9,
              color: '#C9C8CD'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true
          },
          nameTextStyle: {
            color: '#FFFFFF'
          },
          splitArea: {
            show: false
          }
        }],
        series: [
          {
            name: myChartData.legend[0],
            type: 'bar',
            barWidth: '15%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#00deff'
                }, {
                  offset: 1,
                  color: '#3739f5'
                }]),
                barBorderRadius: 11
              }
            },
            data: lines[0]
          },
          {
            name: myChartData.legend[1],
            type: 'bar',
            barWidth: '15%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#45e7da'
                }, {
                  offset: 1,
                  color: '#00b06c'
                }]),
                barBorderRadius: 11
              }
            },
            data: lines[1]
          }, {
            name: myChartData.legend[2],
            type: 'bar',
            barWidth: '15%',
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: '#ffc13c'
                }, {
                  offset: 1,
                  color: '#ff8400'
                }]),
                barBorderRadius: 12
              }
            },
            data: lines[2]
          }
        ]
      }
      myChart.setOption(option, true)
      var app = {
        currentIndex: -1
      }
      if (flag === '3') {
        this.timermakeData6_3 = setInterval(() => {
          var dataLen = option.series[0].data.length
          // 取消之前高亮的图形
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          app.currentIndex = (app.currentIndex + 1) % dataLen
          // 高亮当前图形
          myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          // 显示 tooltip
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          if (this.timermakeData6_1) {
            this.timermakeData6_1 = ''
          }
        }, 2000)
      } else {
        this.timermakeData6_4 = setInterval(() => {
          var dataLen = option.series[0].data.length
          // 取消之前高亮的图形
          myChart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          app.currentIndex = (app.currentIndex + 1) % dataLen
          // 高亮当前图形
          myChart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          // 显示 tooltip
          myChart.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: app.currentIndex
          })
          if (this.timermakeData6_1) {
            this.timermakeData6_1 = ''
          }
        }, 2000)
      }
    },
    formattertype (severity) {
      var name = ''
      switch (severity) {
        case 1:
          name = '<span class="blue3_font">●&nbsp;信息</span>'
          break
        case 2:
          name = '<span class="blue2_font">●&nbsp;警告</span>'
          break
        case 3:
          name = '<span class="blue1_font">●&nbsp;一般严重</span>'
          break
        case 4:
          name = '<span class="orange_font">●&nbsp;严重</span>'
          break
        case 5:
          name = '<span class="pink_font">●&nbsp;灾难</span>'
          break
      }
      return name
    },
    formatterdata (value) {
      return formatTodate(value, 'YYYY-MM-DD HH:mm:ss')
    },
    formatterName (value) {
      return value
    },
    async showHostInfo (hostIp) {
      if (hostIp === null || hostIp === '') {
        return ''
      }
      var agenttypeInfo = ''
      const param = {
        ip: hostIp
      }
      await this.axios.post(this.$api.networkTopology.getTopologyItemInfo, param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            agenttypeInfo = json.data
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
      return agenttypeInfo
    },
    async getTopologyOneInfo () {
      var indexid = this.$api.networkTopology.indexId
      if (indexid !== null) {
        indexid = indexid.replace('/api', '')
      }
      var data = ''
      const param = {
        id: indexid
      }
      await this.axios.post(this.$api.networkTopology.getTopologyOneInfo, param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            data = json.data
            this.infoData = JSON.stringify(json.data)
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
      return data
    },
    rowClassName (index) {
      if (index % 2 !== 1) {
        return 'zebra_bg2'
      }
      return ''
    },
    showBiInfo () {
      this.$router.push({ name: 'bi_One_Info' })
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
@import '~@/assets/css/main_darkmode.css';
#target {
  min-height: 260px;
  min-width: 700px;
  border: 0px solid #ccc !important;
  padding: 0px !important;
  margin-left: 2%;
}
.headerbackground {
  background: url('~@/assets/images/bg_grid_darkmode.jpg') no-repeat;
  background-size: 100% 100%;
  margin-left: -230px;
  height: 67.5rem;
  z-index: 20;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
}

.mar_t20 {
  margin-top: 20px;
}
.ywzs_num li {
  background: rgba(0, 86, 251, 0.2);
  background: #060f53\0;
  color: #fff;
  min-height: 85px;
}
.ywzs_num li p {
  margin-top: 20px;
}
.ywzs_num div {
  height: 10px;
}
@media (max-width: 1880px) {
  .headerbackground {
    height: 97.5rem;
  }
}
@media (max-width: 1750px) {
  .headerbackground {
    height: 97.5rem;
  }
}
@media (max-width: 1650px) {
  .headerbackground {
    height: 97.5rem;
  }
}
@media (max-width: 1540px) {
  .headerbackground {
    height: 97.5rem;
  }
}
@media (max-width: 1400px) {
  .headerbackground {
    height: 97.5rem;
  }
}
@media (max-width: 1320px) {
  .headerbackground {
    height: 97.5rem;
  }
}
@media (max-width: 1210px) {
  .headerbackground {
    height: 97.5rem;
  }
}
@media (max-width: 1100px) {
  .headerbackground {
    height: 97.5rem;
  }
}
.head_span {
  color: darkgrey;
  font-size: 12px;
  margin-left: 10px;
}
.head_span2 {
  color: #fff;
  font-size: 12px;
  margin-left: 10px;
}
.head_div {
  margin-top: 30px;
  margin-left: 20px;
  z-index:auto;
  position:absolute;
  background: url(~@/assets/img/btn_blue.png) center no-repeat;
  background-size: 100% 100%;
  width: 80px;
  height: 25px;
}
.head_div2 {
  margin-top: 30px;
  margin-left: 120px;
  z-index:auto;
  position:absolute;
  background: url(~@/assets/img/btn_blue.png) center no-repeat;
  background-size: 100% 100%;
  width: 80px;
  height: 25px;
}
.no_data {
  background: url(~@/assets/img/no_data.png) center no-repeat;
  background-size: 45% 45%;
  opacity:0.8;
}
.no_data2 {
  background: url(~@/assets/img/no_data.png) center no-repeat;
  background-size: 25% 45%;
  opacity:0.8;
}
.no_data3 {
  background: url(~@/assets/img/no_data.png) center no-repeat;
  background-size: 45% 60%;
  opacity:0.8;
}
</style>
