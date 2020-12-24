<template>
  <div>
    <ul
      id="contextmenu"
      class="notice_box notice_color_default"
      style="display: none"
    >
      <li><a>顺时针旋转</a></li>
      <li><a>逆时针旋转</a></li>
      <li><a>放大</a></li>
      <li><a>缩小</a></li>
      <li><a>删除该节点</a></li>
    </ul>
    <ul
      id="linemenu"
      class="notice_box notice_color_default"
      style="display: none"
    >
      <li><a>删除该连线</a></li>
    </ul>
    <!--弹窗结束-->
    <div class="container index_container">
      <div class="row">
        <div class="col-sm-3">
          <div class="panel-group">
            <div class="panel">
              <div class="panel-heading round_angle_top">
                <a data-toggle="collapse" href="#positions" class="panel-title"
                  >网络位置</a
                >
              </div>
              <div class="collapse panel-body components" id="positions"></div>
            </div>
            <div class="panel">
              <div class="panel-heading border-top-0">
                <a data-toggle="collapse" href="#servers" class="panel-title"
                  >服务器</a
                >
              </div>
              <div class="collapse panel-body components" id="servers"></div>
            </div>
            <div class="panel">
              <div class="panel-heading border-top-0">
                <a data-toggle="collapse" href="#nets" class="panel-title"
                  >网络设备</a
                >
              </div>
              <div class="collapse panel-body components" id="nets"></div>
            </div>
            <div class="panel">
              <div class="panel-heading border-top-0">
                <a data-toggle="collapse" href="#terminals" class="panel-title"
                  >网络终端</a
                >
              </div>
              <div class="collapse panel-body components" id="terminals"></div>
            </div>
          </div>
        </div>
        <div class="col-sm-9">
          <div class="row">
            <div class="col-sm-8 new_wid_c result animated fadeInRight">
              <div id="test" class="btn-toolbar ibox whitebg" role="toolbar">
                <div class="btn-group jtopo_toolbar" data-toggle="buttons">
                  <label class="btn btn-secondary">
                    <input
                      type="radio"
                      name="modeRadio"
                      value="drag"
                      id="r3"
                      checked="true"
                    /><i for="r3" class="fa fa-mouse-pointer"></i>
                  </label>
                  <label class="btn btn-secondary">
                    <input
                      type="radio"
                      name="modeRadio"
                      value="select"
                      id="r2"
                    /><i for="r2" class="fa fa-crop"></i>
                  </label>
                  <label class="btn btn-secondary">
                    <input
                      type="radio"
                      name="modeRadio"
                      value="normal"
                      id="r4"
                    /><i for="r4" class="fa fa-arrows-h"></i>
                  </label>
                </div>
                <div class="btn-group jtopo_toolbar" data-toggle="buttons">
                  <label class="btn btn-secondary">
                    <input
                      type="radio"
                      name="linestyle"
                      value="simpleline"
                      id="l1"
                    /><i for="l1" class="fa fa-arrows-v"></i>
                  </label>
                  <label class="btn btn-secondary">
                    <input
                      type="radio"
                      name="linestyle"
                      value="polyline"
                      id="l2"
                    /><i for="l2" class="fa fa-level-up"></i>
                  </label>
                  <label class="btn btn-secondary">
                    <input
                      type="radio"
                      name="linestyle"
                      value="dbpolyline"
                      id="l3"
                    /><i for="l3" class="fa fa-line-chart"></i>
                  </label>
                  <label class="btn btn-secondary">
                    <input
                      type="radio"
                      name="linestyle"
                      value="curve"
                      id="l4"
                    /><i for="l4" class="fa fa-share"></i>
                  </label>
                </div>
                <div
                  class="btn-group jtopo_toolbar"
                  data-toggle="buttons"
                  style="height: 100%"
                >
                  <button id="zoomOut" name="zoomOut" class="btn btn-secondary">
                    <i class="fa fa-arrows-alt"></i>
                  </button>
                  <button id="zoomIn" name="zoomIn" class="btn btn-secondary">
                    <i class="fa fa-crosshairs"></i>
                  </button>
                </div>
                <div
                  class="btn-group jtopo_toolbar"
                  data-toggle="buttons"
                  style="height: 100%"
                >
                  <button
                    id="exportButton"
                    name="exportButton"
                    class="btn btn-secondary"
                  >
                    <i class="fa fa-file-image-o"></i>
                  </button>
                  <button
                    id="printButton"
                    name="printButton"
                    class="btn btn-secondary"
                  >
                    <i class="fa fa-floppy-o"></i>
                  </button>
                  <button
                    id="buildButton"
                    name="buildButton"
                    class="btn btn-secondary"
                  >
                    <i class="fa fa-folder-open"></i>
                  </button>
                  <input
                    type="hidden"
                    id="infoData"
                    name="infoData"
                    v-model="infoData"
                  />
                  <label style="width: 40px; margin-top: 5px; margin-left: 20px"
                    >名称</label
                  >
                  <input
                    type="text"
                    id="infoName"
                    name="infoName"
                    class="form-control"
                    style="margin-left: 5px; width: 200px"
                  />
                  <input
                    type="hidden"
                    id="infoId"
                    name="infoId"
                  />
                </div>
                <div>
                  <canvas width="760" height="560" id="target"></canvas>
                </div>
              </div>
            </div>
            <div class="col-sm-4 new_wid_r result animated fadeInRight delay1">
              <div class="ibox">
                <div class="ibox_title">
                  <h4>属性编辑</h4>
                  <a href="#" class="ibox_title_more">
                    <!-- <i class="fa fa-angle-right"></i> -->
                  </a>
                </div>
                <div class="ibox_content">
                  <div class="schedule" id="slimtest3">
                    <div class="form-group">
                      <label class="col-sm-3 new_wid_100per control-label"
                        >ID</label
                      >
                      <div class="col-sm-9 new_wid_100per">
                        <input
                          type="text"
                          id="node_id"
                          name="node_id"
                          class="form-control"
                          readonly="true"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="schedule" id="slimtest3">
                    <div class="form-group">
                      <label class="col-sm-3 new_wid_100per control-label"
                        >名称</label
                      >
                      <div class="col-sm-9 new_wid_100per">
                        <input
                          type="text"
                          id="node_name"
                          name="node_name"
                          placeholder="请填写名称"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="schedule" id="slimtest3">
                    <div class="form-group">
                      <label class="col-sm-3 new_wid_100per control-label"
                        >类型</label
                      >
                      <div class="col-sm-9 new_wid_100per">
                        <input
                          type="text"
                          id="node_type"
                          name="node_type"
                          class="form-control"
                          readonly="true"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="schedule" id="slimtest3">
                    <div class="form-group">
                      <label class="col-sm-3 new_wid_100per control-label"
                        >位置</label
                      >
                      <div class="col-sm-4 new_wid_100per">
                        x:<input
                          type="text"
                          id="node_x"
                          name="node_x"
                          class="form-control"
                          readonly="true"
                        />
                      </div>
                      <div class="col-sm-4 new_wid_100per">
                        y:<input
                          type="text"
                          id="node_y"
                          name="node_y"
                          class="form-control"
                          readonly="true"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="schedule" id="slimtest3">
                    <div class="form-group">
                      <label class="col-sm-3 new_wid_100per control-label"
                        >尺寸</label
                      >
                      <div class="col-sm-4 new_wid_100per">
                        w:<input
                          type="text"
                          id="node_w"
                          name="node_w"
                          class="form-control"
                          readonly="true"
                        />
                      </div>
                      <div class="col-sm-4 new_wid_100per">
                        h:<input
                          type="text"
                          id="node_h"
                          name="node_h"
                          class="form-control"
                          readonly="true"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="schedule" id="slimtest3">
                    <div class="form-group">
                      <label class="col-sm-3 new_wid_100per control-label"
                        >资产</label
                      >
                      <div class="col-sm-9 new_wid_100per">
                        <el-select
                          v-model="assetsId"
                          placeholder="请选择"
                          @change="changeAssetsId"
                          filterable
                          style="width: 100%"
                        >
                          <el-option
                            v-for="item in assetOptions"
                            :key="item[0]"
                            :label="item[1] + '(' + item[2] + ')'"
                            :value="item[0]"
                          >
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                  </div>
                  <div class="schedule" id="slimtest3">
                    <div class="form-group">
                      <label class="col-sm-3 new_wid_100per control-label"
                        >IP</label
                      >
                      <div class="col-sm-9 new_wid_100per">
                        <input
                          type="text"
                          id="node_ip"
                          name="node_ip"
                          class="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="schedule" id="slimtest3">
                    <div class="form-group">
                      <label class="col-sm-3 new_wid_100per control-label"
                        >信息</label
                      >
                      <div class="col-sm-9 new_wid_100per">
                        <input
                          type="text"
                          id="node_type"
                          name="node_type"
                          class="form-control"
                          readonly="true"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="schedule" id="slimtest3">
                    <div class="form-group" align="right">
                      <input
                        type="button"
                        id="subconfirm"
                        name="subconfirm"
                        class="btn btn-success"
                        value="应用修改"
                      />
                    </div>
                  </div>
                  <div class="schedule" id="slimtest3">
                    <div class="form-group" align="right">
                      <input
                        type="button"
                        id="redalert"
                        name="redalert"
                        class="btn btn-danger"
                        value="出问题展示"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="clear: both"></div>
      </div>
    </div>
    <TopologyItemList
      :showEditDialog="showEditDialog"
      @close="showEditDialog = false"
      @success="changeReloadData"
      @error="reloadData"
    ></TopologyItemList>
  </div>
</template>
<script>
import TopologyItemList from '@/views/networkTopology/topologyItemList.vue'
import jTopo from 'jtopo-in-node'
import $ from 'jquery'
import { data } from '@/assets/topology/devices.js'
export default {
  data () {
    return {
      assetsId: '',
      assetOptions: [],
      topologyOneInfo: '',
      showEditDialog: false,
      infoData: ''
    }
  },
  created () {
    this.getAssetInfo()
    window.saveTopologyInfo = this.saveTopologyInfo
    window.openTopologyItemList = this.openTopologyItemList
  },
  methods: {
    getAssetInfo () {
      this.axios.post(this.$api.monitorManager.findByConditionInfo).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.assetOptions = json.data
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    openTopologyItemList () {
      this.showEditDialog = true
    },
    noReloadData () {
      this.showEditDialog = false
    },
    reloadData () {
      this.showEditDialog = false
    },
    changeReloadData (id) {
      this.showEditDialog = false
      this.getTopologyOneInfo(id)
    },
    changeAssetsId () {
      const assetOptions = this.assetOptions
      for (let i = 0; i < assetOptions.length; i++) {
        if (assetOptions[i][0] === this.assetsId) {
          document.getElementById('node_ip').value = assetOptions[i][3]
          break
        }
      }
    },
    saveTopologyInfo (data) {
      const param = {
        id: '',
        jsonParam: data
      }
      this.axios.post(this.$api.networkTopology.addTopologyInfo, param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
          }
        } else {
          this.$message({
            message: '保存失败',
            type: 'error'
          })
        }
      })
    },
    async getTopologyOneInfo (id) {
      var data = ''
      const param = {
        id: id
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
    }
  },
  mounted () {
    // initInfo()
    var beginNode = null
    var currentNode = null
    var currentLine = null
    $(function () {
      function uuid () {
        var s = []
        var hexDigits = '0123456789abcdef'
        for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
        }
        s[14] = '4'
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
        s[8] = s[13] = s[18] = s[23] = '-'
        return s.join('')
      }
      var canvas = document.getElementById('target')
      if (canvas !== null) {
        createDevices('#positions', data.positions, data.positions_name, data.positions_size_64, data.positions_img_64)
        createDevices('#servers', data.servers, data.servers_name, data.servers_size_64, data.servers_img_64)
        createDevices('#nets', data.nets, data.nets_name, data.nets_size_64, data.nets_img_64)
        createDevices('#terminals', data.terminals, data.terminals_name, data.terminals_size_64, data.terminals_img_64)
        var stage = new jTopo.Stage(canvas)
        stage.eagleEye.visible = false
        var scene = new jTopo.Scene(stage)
        showJTopoToobar(stage, canvas)
        scene.background = require('../../assets/topology/images/bg.png')
        $('input[name="modeRadio"]').get(0).checked = true
        $('input[name="modeRadio"]:checked').parent('label').addClass('active')
        var tempNodeA = new jTopo.Node('tempA')
        tempNodeA.setSize(1, 1)
        var tempNodeZ = new jTopo.Node('tempZ')
        tempNodeZ.setSize(1, 1)
        var link = newLink(tempNodeA, tempNodeZ, 'defaultline')
        scene.mousemove(function (e) {
          tempNodeZ.setLocation(e.x, e.y)
        })
        $('.components').delegate('.component', 'mousedown', function (md) {
          md.preventDefault()
          var mouseX = md.pageX
          var mouseY = md.pageY
          var thiss = $(this)
          var temp = $('<div id="temp"></div>').append(thiss.clone())
          $('body').append(temp)
          temp.css({
            position: 'absolute',
            top: mouseY - (temp.height() / 2) + 'px',
            left: mouseX - (temp.width() / 2) + 'px',
            opacity: '0.9'
          }).show()
          var halfboxheight = (temp.height() / 2)
          var halfboxwidth = (temp.width() / 2)
          var target = $('#target')
          $(document).delegate('body', 'mousemove', function (mm) {
            var mmmouseX = mm.pageX
            var mmmouseY = mm.pageY
            temp.css({ top: mmmouseY - halfboxheight + 'px', left: mmmouseX - halfboxwidth + 'px' })
          })
          $('body').delegate('#temp', 'mouseup', function (mu) {
            mu.preventDefault()
            var mumouseX = mu.pageX
            var mumouseY = mu.pageY
            var tarpos = target.offset() // 已做修改，因为取position位置有问题
            if (mumouseX + halfboxwidth > tarpos.left &&
              mumouseX - halfboxwidth < tarpos.left + target.width() &&
              mumouseY + halfboxheight > tarpos.top &&
              mumouseY - halfboxheight < tarpos.top + target.height()
            ) {
              var child = temp.children()[0]
              var tmpnode = {
                name: child.title,
                type: child.id,
                id: uuid(),
                left: parseInt(temp.css('left')) - tarpos.left,
                top: parseInt(temp.css('top')) - tarpos.top
              }
              addNode(tmpnode)
            }
            temp.remove()
            $(document).undelegate('body', 'mousemove')
            $('body').undelegate('#temp', 'mouseup')
          })
        })
      }
      function clearInfoData () {
        var infoData = $('#infoData').val()
        if (infoData !== null && infoData !== '') {
          return true
        } else {
          return false
        }
      }
      function showJTopoToobar (stage, canvas) {
        $('input[name="modeRadio"]').bind('change focus blur', function () {
          stage.mode = $('input[name="modeRadio"]:checked').val()
          if ($('input[name="modeRadio"]:checked').val() === 'normal') {
            $('input[name="linestyle"]').parent('label').removeClass('active')
            $('input[name="linestyle"]').get(0).checked = true
            $('input[name="linestyle"]:checked').parent('label').addClass('active')
          }
          if ($('input[name="modeRadio"]:checked').val() === 'drag') {
            $('input[name="linestyle"]').attr('checked', false)
            $('input[name="linestyle"]').parent('label').removeClass('active')
          }
          if ($('input[name="modeRadio"]:checked').val() === 'select') {
            $('input[name="linestyle"]').attr('checked', false)
            $('input[name="linestyle"]').parent('label').removeClass('active')
          }
        })
        $('input[name="linestyle"]').bind('change focus blur', function () {
          $('input[name="modeRadio"]').parent('label').removeClass('active')
          $('input[name="modeRadio"]').get(2).checked = true
          $('input[name="modeRadio"]:checked').parent('label').addClass('active')
        })
        $('input[name="zoomBtn"]').click(function () {
          if ($('input[name="zoomBtn"]:checked').val() === 'zoomOut') {
            stage.zoomOut()
          }
          if ($('input[name="zoomBtn"]:checked').val() === 'zoomIn') {
            stage.zoomIn()
          }
        })
        $('#exportButton').click(function () {
          stage.saveImageInfo()
        })
        $('#printButton').click(function () {
          if ($('#infoName').val() === '') {
            alert('请输入拓扑图名称！')
          } else {
            window.saveTopologyInfo(JSON.stringify(expertElement(stage)))
          }
          // this.saveTopologyInfo(JSON.stringify(expertElement(stage)))
        })
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
            $('#infoName').val(infoData.infoName)
            $('#infoId').val(infoData.id)
          }
        }
        $('#buildButton').click(function () {
          // var jsonData = window.getTopologyOneInfo('2c908ff6768e901801768ebcb6cb0006')
          // gettopologydata(jsonData)
          if (clearInfoData()) {
            alert('请刷新页面后再次选择！')
          } else {
            window.openTopologyItemList()
            var timer = setInterval(() => {
              var infoData = $('#infoData').val()
              if (infoData !== null && infoData !== '') {
                gettopologydata(infoData)
                clearInterval(timer)
              }
            }, 1000)
          }
        })
        $('#zoomOut').click(function () {
          stage.zoomOut()
          $('#zoomOut').parent('label').removeClass('active')
        })
        $('#zoomIn').click(function () {
          stage.zoomIn()
          $('#zoomOut').parent('label').removeClass('active')
        })
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
        n.fontColor = '155,123,2'
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
          l.strokeColor = '0,250,0'
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
          l.strokeColor = '0,250,0'
          l.linktype = 'simpleline'
        } else if (linestyle === 'polyline') {
          l = new jTopo.FoldLink(nodeA, nodeZ)
          l.direction = 'horizontal'
          l.arrowsRadius = 12
          l.lineWidth = 2
          l.bundleOffset = 60 // 折线拐角处的长度
          l.bundleGap = 20 // 线条之间的间隔
          l.textOffsetY = 3 // 文本偏移量（向下3个像素）
          l.strokeColor = '0,250,0'
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
          l.strokeColor = '0,250,0'
          l.linktype = 'dbpolyline'
          // l.dashedPattern = 3
        } else if (linestyle === 'curve') {
          l = new jTopo.CurveLink(nodeA, nodeZ)
          l.lineWidth = 2 // 线宽
          l.arrowsRadius = 12
          l.strokeColor = '0,250,0'
          l.linktype = 'curve'
        }
        return l
      }
      function addLink (l) {
        scene.add(l)
        l.addEventListener('mouseup', function (e) {
          currentLine = this
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
      function expertElement (stage) {
        var nodeList = []
        var linkList = []
        for (var i = 0; i < stage.childs.length; i++) {
          var scene = stage.childs[i]
          for (var j = 0; j < scene.childs.length; j++) {
            var e = scene.childs[j]
            if (e.elementType === 'node') {
              const ee = {
                id: e.id,
                name: e.text,
                type: e.nodetype,
                x: e.x,
                y: e.y,
                ip: e.nodeip
              }
              nodeList.push(ee)
            }
            if (e.elementType === 'link') {
              const ee = {
                name: e.text,
                type: e.linktype,
                start: e.nodeA.id,
                end: e.nodeZ.id
              }
              linkList.push(ee)
            }
          }
        }
        return { nodeList: nodeList, linkList: linkList, infoName: $('#infoName').val(), infoId: $('#infoId').val() }
      }
      function createDevices (panel, deviceList, nameList, sizeList, imageList) {
        if (deviceList != null) {
          $.each(deviceList, function (i, name) {
            var parentdiv = $('<div></div>')
            parentdiv.addClass('component')
            parentdiv.attr('id', name)
            parentdiv.attr('title', nameList[i])
            parentdiv.attr('trigger', 'manual')
            var sna = $('<a></a>')
            var w = sizeList[i][0]
            var h = sizeList[i][1]
            if ((w > h) && (w - h) > 30) {
              sna.css({
                display: 'inline-block',
                width: '64px',
                height: '64px',
                'margin-right': 'auto',
                'margin-left': 'auto',
                padding: '4px 0',
                'text-align': 'center',
                'vertical-align': 'middle',
                cursor: 'pointer'
              })
            } else {
              sna.css({
                display: 'inline-block',
                width: '64px',
                height: '64px',
                'margin-right': 'auto',
                'margin-left': 'auto',
                padding: '4px 0',
                'text-align': 'center',
                'vertical-align': 'middle',
                cursor: 'pointer',
                'background-size': '80% 80%',
                '-moz-background-size': '100% 100%'
              })
            }
            var spans = $('<span></span>')
            var imgs = $("<img src='" + imageList[i] + "'>")
            spans.append(imgs)
            sna.append(spans)
            parentdiv.append(sna)
            $(panel).append(parentdiv)
          })
        }
      }
      function handler (e) {
        if (e.button === 2) { // 右键
          // 当前位置弹出菜单（div）
          $('#contextmenu').css({
            top: e.pageY,
            left: e.pageX
          }).show()
          scene.remove(link)
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

      $('#subconfirm').click(function (e) {
        if ($('#node_name').val() !== '') {
          currentNode.text = $('#node_name').val()
          currentNode.nodeip = $('#node_ip').val()
        } else {
          alert('请先选择设备！')
        }
      })

      $('#contextmenu a').click(function (e) {
        var text = $(this).text()
        if (text === '删除该节点') {
          scene.remove(currentNode)
          currentNode = null
        } else if (text === '更改颜色') {
          currentNode.fillColor = jTopo.util.randomColor()
        } else if (text === '顺时针旋转') {
          currentNode.rotate += 0.5
        } else if (text === '逆时针旋转') {
          currentNode.rotate -= 0.5
        } else if (text === '放大') {
          currentNode.scaleX += 0.2
          currentNode.scaleY += 0.2
        } else if (text === '缩小') {
          currentNode.scaleX -= 0.2
          currentNode.scaleY -= 0.2
        } else {
          currentNode.save()
        }
        $('#contextmenu').hide()
      })

      $('#linemenu a').click(function () {
        var text = $(this).text()
        if (text === '删除该连线') {
          scene.remove(currentLine)
          currentLine = null
        }
        $('#linemenu').hide()
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
  components: { TopologyItemList }
}
</script>
<style lang="scss" scoped>
@media screen and (min-width: 1500px) {
  .container,
  .container-lg,
  .container-md,
  .container-sm,
  .container-xl {
    max-width: 1700px;
  }
}
.btn-secondary {
  background-color: #4d7be4 !important;
  border-color: #4d7be4 !important;
}
.jtopo_toolbar .active {
  background-color: #2b52d4 !important;
  border-color: #2b52d4 !important;
}
</style>
