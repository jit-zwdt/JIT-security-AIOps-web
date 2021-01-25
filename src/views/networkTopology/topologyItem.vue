<template>
  <div>
    <ul
      id="contextmenu"
      class="notice_box notice_color_default notice_box_margin"
      style="display: none"
    >
      <li style="padding: 10px">资产名称：<span id="assetsName"></span></li>
      <li style="padding: 10px">资产IP：<span id="assetsIp"></span></li>
      <li style="text-align: right"><a id="contextmenuClose">关闭</a></li>
    </ul>
    <!--弹窗结束-->
    <div class="container index_container">
      <div class="row">
        <div class="col-sm-9">
          <div class="row">
            <div class="col-sm-8 new_wid_c result animated fadeInRight">
              <div style="float: left">
                <button
                  id="buildButton"
                  name="buildButton"
                  class="btn btn-secondary"
                >
                  <i class="fa fa-folder-open"></i>
                </button>
                <label
                  style="width: 100px; margin-top: -100px; margin-left: 5px"
                  >拓扑图名称：</label
                >
                <span id="infoName" name="infoName"></span>
              </div>
              <div
                class="btn-group jtopo_toolbar"
                data-toggle="buttons"
                style="height: 40px; margin-left: 200px; float: right"
              >
                <button id="zoomOut" name="zoomOut" class="btn btn-secondary">
                  <i class="fa fa-arrows-alt"></i>
                </button>
                <button id="zoomIn" name="zoomIn" class="btn btn-secondary">
                  <i class="fa fa-crosshairs"></i>
                </button>
              </div>
              <div id="test" class="btn-toolbar ibox whitebg" role="toolbar">
                <div>
                  <canvas width="1600" height="670" id="target"></canvas>
                </div>
              </div>
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
      showEditDialog: false,
      infoData: ''
    }
  },
  created () {
    // this.getTopologyOneInfo()
    window.showHostInfo = this.showHostInfo
    window.showAssetsChange = this.showAssetsChange
    window.showErrorMessageInfo = this.showErrorMessageInfo
    window.openTopologyItemList = this.openTopologyItemList
  },
  methods: {
    async getTopologyOneInfo (id) {
      var data = ''
      const param = {
        // id: '4028cb8177230464017723b53117000d'
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
    async showAssetsChange (str) {
      var ip = ''
      await this.axios.post(this.$api.monitorManager.getConditionInfo).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            json.data.forEach(res => {
              if (res !== null && res[3] === str) {
                ip = res[1] + '(' + res[2] + ')'
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
      return ip
    },
    showErrorMessageInfo (str) {
      this.$message({
        message: str,
        type: 'error'
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
    }
  },
  mounted () {
    // initInfo()
    var beginNode = null
    var currentNode = null
    $(function () {
      var canvas = document.getElementById('target')
      if (canvas !== null) {
        var stage = new jTopo.Stage(canvas)
        stage.eagleEye.visible = false
        var scene = new jTopo.Scene(stage)
        showJTopoToobar(stage, canvas)
        scene.background = require('../../assets/topology/images/white_bg.jpg')
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
        $('#buildButton').click(function () {
          // var jsonData = window.getTopologyOneInfo('2c908ff6768e901801768ebcb6cb0006')
          // gettopologydata(jsonData)
          if (clearInfoData()) {
            window.showErrorMessageInfo('请刷新页面后再次选择！')
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
      function clearInfoData () {
        var infoData = $('#infoData').val()
        if (infoData !== null && infoData !== '') {
          return true
        } else {
          return false
        }
      }
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
.col-sm-8 {
  width: 100% !important;
  max-width: 100% !important;
  flex: 0 0 0;
}
.col-sm-9 {
  width: 100% !important;
  max-width: 100% !important;
  flex: 0 0 0;
}
.notice_box_margin {
  margin-left: -180px !important;
  width: 28rem !important;
}
</style>
