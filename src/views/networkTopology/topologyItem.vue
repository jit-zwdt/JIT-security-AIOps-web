<template>
  <div>
    <!--弹窗结束-->
    <div class="container index_container">
      <div class="row">
        <div class="col-sm-9">
          <div class="row">
            <div class="col-sm-8 new_wid_c result animated fadeInRight">
              <div>
                <label style="width: 100px; margin-top: 5px; margin-left: 20px"
                  >拓扑图名称：</label
                >
                <span id="infoName" name="infoName"></span>
              </div>
              <div id="test" class="btn-toolbar ibox whitebg" role="toolbar">
                <div>
                  <canvas width="760" height="560" id="target"></canvas>
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
  </div>
</template>
<script>
import jTopo from 'jtopo-in-node'
import $ from 'jquery'
import { data } from '@/assets/topology/devices.js'
export default {
  data () {
    return {
      infoData: ''
    }
  },
  created () {
    this.getTopologyOneInfo()
    window.showHostInfo = this.showHostInfo
  },
  methods: {
    async getTopologyOneInfo () {
      var data = ''
      const param = {
        id: '2c908ff6768e901801768ebcb6cb0006'
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
    }
  },
  mounted () {
    // initInfo()
    var beginNode = null
    var currentNode = null
    var currentLine = null
    $(function () {
      var canvas = document.getElementById('target')
      if (canvas !== null) {
        var stage = new jTopo.Stage(canvas)
        stage.eagleEye.visible = false
        var scene = new jTopo.Scene(stage)
        showJTopoToobar(stage, canvas)
        scene.background = require('../../assets/topology/images/bg.png')
        var tempNodeA = new jTopo.Node('tempA')
        tempNodeA.setSize(1, 1)
        var tempNodeZ = new jTopo.Node('tempZ')
        tempNodeZ.setSize(1, 1)
        var link = newLink(tempNodeA, tempNodeZ, 'defaultline')
        scene.mousemove(function (e) {
          tempNodeZ.setLocation(e.x, e.y)
        })
      }
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
                var agenttypeInfo = window.showHostInfo(e.ip)
                agenttypeInfo.then(re => {
                  if (re !== null && re !== '') {
                    var alertid = e.id
                    var alertinfo = e.name + '：出现问题:' + re
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
                  }
                })
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
  }
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
