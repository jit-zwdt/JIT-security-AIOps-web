export function saveInfo () {
  // getArrayIndex(1, 2)
  alert(3333)
}

$(document).ready(function(){

  var canvas = document.getElementById('target');
  if (canvas == null) {
	  return;
  }

  createDevices("#positions", positions, positions_name, positions_size_64, positions_img_64);
  createDevices("#servers", servers, servers_name, servers_size_64, servers_img_64);
  createDevices("#nets", nets, nets_name, nets_size_64, nets_img_64);
  createDevices("#terminals", terminals, terminals_name, terminals_size_64, terminals_img_64);

  var stage  = new JTopo.Stage(canvas);
  stage.eagleEye.visible = true;
  var scene = new JTopo.Scene(stage);
  showJTopoToobar(stage, canvas);
  scene.background = 'images/bg.png';
  var currentNode = null;
  var currentLine = null;

  $('input[name=modeRadio]').get(0).checked=true;
  $("input[name='modeRadio']:checked").parent('label').addClass('active');

  // var currentType = '1';
  var beginNode = null;
  var tempNodeA = new JTopo.Node('tempA');
  tempNodeA.setSize(1, 1);
  var tempNodeZ = new JTopo.Node('tempZ');
  tempNodeZ.setSize(1, 1);
  var link = newLink(tempNodeA, tempNodeZ, 'defaultline');  

  scene.mousemove(function(e){      
    tempNodeZ.setLocation(e.x, e.y);
  }); 

  $(".components").delegate(".component", "mousedown", function(md){   
    md.preventDefault();
    var mouseX = md.pageX;
    var mouseY = md.pageY;    
    var $this = $(this);        
    var $temp = $("<div id='temp'></div>").append($this.clone());
    $("body").append($temp);
    $temp.css({"position" : "absolute",
               "top"      : mouseY - ($temp.height()/2) + "px",
               "left"     : mouseX - ($temp.width()/2) + "px",
               "opacity"  : "0.9"}).show();
    var half_box_height = ($temp.height()/2);
    var half_box_width = ($temp.width()/2);
    var $target = $("#target");

    $(document).delegate("body", "mousemove", function(mm){
      var mm_mouseX = mm.pageX;
      var mm_mouseY = mm.pageY;
      $temp.css({"top": mm_mouseY - half_box_height + "px" ,"left" : mm_mouseX - half_box_width  + "px"});
    });

    $("body").delegate("#temp", "mouseup", function(mu){
      mu.preventDefault();
      var mu_mouseX = mu.pageX;
      var mu_mouseY = mu.pageY;
      var tar_pos = $target.offset();//已做修改，因为取position位置有问题
      if (mu_mouseX + half_box_width > tar_pos.left &&
        mu_mouseX - half_box_width < tar_pos.left + $target.width()&&
        mu_mouseY + half_box_height > tar_pos.top &&
        mu_mouseY - half_box_height < tar_pos.top + $target.height()
        ){   
          var child = $temp.children()[0];

          var tmpnode = {
            name: child.title,
            type: child.id,
            id: $System.Math.IntUtil.genGUIDV4(),
            left: parseInt($temp.css('left')) - tar_pos.left,
            top: parseInt($temp.css("top")) - tar_pos.top
          };
          addNode(tmpnode);         
        }          
      $temp.remove();
      $(document).undelegate("body", "mousemove");
      $("body").undelegate("#temp","mouseup");       
    });       
  });  

  function getArrayIndex(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) {
          return i;
      }
    }
    return -1;
  }

  function createDevices(panel, deviceList, nameList, sizeList, imageList){
    if (null != deviceList){
      $.each(deviceList, function(i, name){     
        var parentdiv = $('<div></div>');
        parentdiv.addClass('component');
        parentdiv.attr('id', name);
        parentdiv.attr('title', nameList[i]);
        parentdiv.attr('trigger', 'manual');
        var sna = $('<a></a>');
        var w = sizeList[i][0];
        var h = sizeList[i][1];
        if ((w > h) && (w - h) > 30){
          sna.css({
            "display": "inline-block",
            "width":"64px",
            "height": "64px",
            "margin-right": "auto",
            "margin-left": "auto",
            "padding": "4px 0",
            "text-align": "center",
            "vertical-align": "middle",
            "cursor": "pointer"
          });
        } else {
          sna.css({
            "display": "inline-block",
            "width":"64px",
            "height": "64px",
            "margin-right": "auto",
            "margin-left": "auto",
            "padding": "4px 0",
            "text-align": "center",
            "vertical-align": "middle",
            "cursor": "pointer",
            "background-size": "80% 80%",
            "-moz-background-size": "100% 100%"
          });
        }
        var spans = $('<span></span>');
        var imgs = $("<img src='images/" + imageList[i] + "'>");
        spans.append(imgs);
        sna.append(spans);
        parentdiv.append(sna);
        $(panel).append(parentdiv);
      });   
    }
  }

  function addNode(node){
    var n = new JTopo.Node(node.name);
    var index = getArrayIndex(devices, node.type);
    n.id = node.id;
    n.nodetype = node.type;
    n.nodeip = node.ip;
    n.setLocation(node.left, node.top);
    n.setImage("images/" + devices_img_64[index]);
    n.fontColor = '155,123,2';
    n.font = 'bold 12px 微软雅黑';
    n.setSize(devices_size_64[index][0], devices_size_64[index][1]);
    scene.add(n);
    n.addEventListener('mouseup', function(e){      
      currentNode = this;
      handler(e);
    });
    n.mousedown(function(e){    
      if(e.target == null || e.target === beginNode || e.target === link){
          scene.remove(link);      
      }    
    });
  }

  function newLink(nodeA, nodeZ, linestyle){   
    var l = null;
    if(linestyle == 'defaultline'){ 
      l = new JTopo.Link(nodeA, nodeZ);  
      l.lineWidth   = 2;
      l.strokeColor = '0,250,0';
      l.arrowsRadius = 12; 
      l.shadow = false;
      l.bundleGap = 20;   
      l.linktype = 'defaultline';
    } else if (linestyle == "simpleline") {
      l = new JTopo.Link(nodeA, nodeZ);    
      l.lineWidth = 2; 
      //l.dashedPattern = 5;
      l.arrowsRadius = 12; 
      l.bundleOffset = 60; 
      l.bundleGap = 20; 
      l.textOffsetY = 3; 
      l.strokeColor = '0,250,0';
      l.linktype = 'simpleline';
    } else if (linestyle == "polyline") {
      l = new JTopo.FoldLink(nodeA, nodeZ);
      l.direction = 'horizontal';
      l.arrowsRadius = 12; 
      l.lineWidth = 2; 
      l.bundleOffset = 60; // 折线拐角处的长度
      l.bundleGap = 20; // 线条之间的间隔
      l.textOffsetY = 3; // 文本偏移量（向下3个像素）
      l.strokeColor = '0,250,0';
      l.linktype = 'polyline';
      //l.dashedPattern = 5;
    } else if (linestyle == "dbpolyline") {
      l = new JTopo.FlexionalLink(nodeA, nodeZ);
      l.direction = 'horizontal';
      l.arrowsRadius = 12;
      l.lineWidth = 2; // 线宽
      l.offsetGap = 35;
      l.bundleGap = 15; // 线条之间的间隔
      l.textOffsetY = 10; // 文本偏移量（向下15个像素）
      l.strokeColor = '0,250,0';
      l.linktype = 'dbpolyline';
      //l.dashedPattern = 3; 
    } else if (linestyle == "curve") {
      l = new JTopo.CurveLink(nodeA, nodeZ);
      l.lineWidth = 2; // 线宽
      l.arrowsRadius = 12; 
      l.strokeColor = '0,250,0';
      l.linktype = 'curve';
    }    
    
    return l;
  }

  function addLink(l){
    scene.add(l);
    l.addEventListener('mouseup', function (e) {
      currentLine = this;
      handlerLine(e);
    });
  }

  function handlerLine(e) {
    if (e.button == 2) {// 右键        
      //当前位置弹出菜单（div）
      $("#linemenu").css({
          top: e.pageY,
          left: e.pageX
      }).show();
    } 
  }
  function handler(e){
    if(e.button == 2){// 右键        
      //当前位置弹出菜单（div）
      $("#contextmenu").css({
          top: e.pageY,
          left: e.pageX
      }).show();
        scene.remove(link);    
    } else {
      if(e.target != null && e.target instanceof JTopo.Node && $("input[name='modeRadio']:checked").val() == "normal"){
        if(beginNode == null){
          beginNode = e.target;
          addLink(link);
          tempNodeA.setLocation(e.x, e.y);
          tempNodeZ.setLocation(e.x, e.y);
        } else if(beginNode !== e.target){
          var endNode = e.target;
          var l = newLink(beginNode, endNode, $("input[name='linestyle']:checked").val());
          addLink(l);
          beginNode = null;
          scene.remove(link);
        } else {
          beginNode = null;
        }
      } if (e.target != null && e.target instanceof JTopo.Node){
        $("#node_id").val(e.target.id);
        $("#node_name").val(e.target.text);
        $("#node_type").val(e.target.nodetype);
        $("#node_x").val(e.target.x);
        $("#node_y").val(e.target.y);
        $("#node_w").val(e.target.width);
        $("#node_h").val(e.target.height);
        $("#node_ip").val(e.target.nodeip);
      } else {
          scene.remove(link);      
      } 
    }
  }

  function propReset() {
    $("#node_id").val("");
    $("#node_name").val("");
    $("#node_type").val("");
    $("#node_x").val("");
    $("#node_y").val("");
    $("#node_w").val("");
    $("#node_h").val("");
    $("#node_ip").val("");
  }

  stage.click(function(event){
    if (scene.selectedElements.length == 0){
      propReset();
    }
    if(event.button == 0){
        $("#contextmenu").hide();   
        $("#linemenu").hide();      
    }
  });

  $("#subconfirm").click(function(e){
    if ($("#node_name").val() != ""){
      currentNode.text = $("#node_name").val();
      currentNode.nodeip = $("#node_ip").val();
    } else {
      alert("请先选择设备！")
    }
  });

  $("#contextmenu a").click(function(e){
    var text = $(this).text();    
    if(text == '删除该节点'){
      scene.remove(currentNode);
      currentNode = null;
    }else if(text == '更改颜色'){
      currentNode.fillColor = JTopo.util.randomColor();
    }else if(text == '顺时针旋转'){
      currentNode.rotate += 0.5;
    }else if(text == '逆时针旋转'){
      currentNode.rotate -= 0.5;
    }else if(text == '放大'){
      currentNode.scaleX += 0.2;
      currentNode.scaleY += 0.2;
    }else if(text == '缩小'){
      currentNode.scaleX -= 0.2;
      currentNode.scaleY -= 0.2;
    }else{
      currentNode.save();
    }
    $("#contextmenu").hide();    
  });

  $("#linemenu a").click(function(){
    var text = $(this).text();    
    if(text == '删除该连线'){
      scene.remove(currentLine);
      currentLine = null;
    }
    $("#linemenu").hide();
  });

  function showJTopoToobar(stage, canvas){
    $("input[name='modeRadio']").change(function(){
        stage.mode = $("input[name='modeRadio']:checked").val();
        if ($("input[name='modeRadio']:checked").val() == "normal"){
          $("input[name='linestyle']").parent('label').removeClass('active');
          $('input[name=linestyle]').get(0).checked=true;
          $("input[name='linestyle']:checked").parent('label').addClass('active');
        }
        if ($("input[name='modeRadio']:checked").val() == "drag"){
          $("input[name='linestyle']").attr("checked",false);
          $("input[name='linestyle']").parent('label').removeClass('active');
        }
        if ($("input[name='modeRadio']:checked").val() == "select"){
          $("input[name='linestyle']").attr("checked",false);
          $("input[name='linestyle']").parent('label').removeClass('active');
        }
    });
    $("input[name='linestyle']").change(function(){
      $("input[name='modeRadio']").parent('label').removeClass('active');
      $('input[name=modeRadio]').get(2).checked=true;
      $("input[name='modeRadio']:checked").parent('label').addClass('active');
    });
    $("input[name='zoomBtn']").click(function(){
      if ($("input[name='zoomBtn']:checked").val() == "zoomOut"){
        stage.zoomOut();
      }
      if ($("input[name='zoomBtn']:checked").val() == "zoomIn"){
        stage.zoomIn();
      }
    });
    $('#exportButton').click(function() {
        stage.saveImageInfo();
    });
    $('#printButton').click(function() {
        alert(JSON.stringify(expertElement(stage)));
    });
    $('#buildButton').click(function() {
      eval("var jsonObj = " + '{"nodeList":[{"id":"GUID_034A8443_E978_9A84_79A4_7973414B748B","name":"网络","type":"Network","x":476.5,"y":278,"ip":"192.168.1.1"},{"id":"GUID_F872F24A_D356_D384_39F3_CD378061E9C9","name":"网络电话交换机","type":"IP_PBX","x":114.5,"y":235,"ip":"127.0.0.1"},{"id":"GUID_820F7778_8CFC_A344_BB7F_07C41383FD6A","name":"机房","type":"House","x":404.5,"y":54,"ip":"192.168.1.2"},{"id":"GUID_EAD63D25_098E_D544_6555_AF3307390F1C","name":"磁盘阵列(2D)","type":"Disk_array_2D","x":158.5,"y":102,"ip":"192.168.1.3"},{"id":"GUID_4792FD7B_2A67_9BC4_752E_BAE545C6F876","name":"加密路由符号","type":"Crypto-router_symbol","x":328.5,"y":159,"ip":"192.168.1.4"},{"id":"GUID_B15D884B_A898_4514_4D66_EF93F58B1DD6","name":"加密路由","type":"Crypto-router","x":622.5,"y":157,"ip":"192.168.1.5"}],"linkList":[{"type":"defaultline","start":"GUID_820F7778_8CFC_A344_BB7F_07C41383FD6A","end":"GUID_EAD63D25_098E_D544_6555_AF3307390F1C"},{"type":"simpleline","start":"GUID_820F7778_8CFC_A344_BB7F_07C41383FD6A","end":"GUID_F872F24A_D356_D384_39F3_CD378061E9C9"},{"type":"polyline","start":"GUID_820F7778_8CFC_A344_BB7F_07C41383FD6A","end":"GUID_4792FD7B_2A67_9BC4_752E_BAE545C6F876"},{"type":"dbpolyline","start":"GUID_820F7778_8CFC_A344_BB7F_07C41383FD6A","end":"GUID_034A8443_E978_9A84_79A4_7973414B748B"},{"type":"curve","start":"GUID_820F7778_8CFC_A344_BB7F_07C41383FD6A","end":"GUID_B15D884B_A898_4514_4D66_EF93F58B1DD6"}]}');
      if (null != jsonObj){
        scene.clear();
        if (null != jsonObj.nodeList){
          $.each(jsonObj.nodeList, function(i, e){
            var tmpnode = {
              name: e.name,
              type: e.type,
              id: e.id,
              left: e.x,
              top: e.y,
              ip: e.ip
            };
            addNode(tmpnode);
          });
        }
        if (null != jsonObj.linkList){
          $.each(jsonObj.linkList, function(i, e){
            var startNode = forEachStagesElement(stage, e.start);
            var endNode = forEachStagesElement(stage, e.end);
            var l = newLink(startNode, endNode, e.type);
            addLink(l);
          });
        }
      }
    });
    $('#zoomOut').click(function(){
      stage.zoomOut();
      $("#zoomOut").parent('label').removeClass('active');
    });
    $('#zoomIn').click(function(){
      stage.zoomIn();
      $("#zoomOut").parent('label').removeClass('active');
    });
  }

  $("#redalert").click(function(){
    var alert_id = 'GUID_820F7778_8CFC_A344_BB7F_07C41383FD6A';
    var alert_info = "机房问题问题";
    var alert_element = forEachStagesElement(stage, alert_id);
    alert_element.alarm = alert_info;
    alert_element.alarmColor = '255,0,0';
    alert_element.alarmAlpha = 0.9;
    setInterval(function(){
      if(alert_element.alarm == alert_info){
        alert_element.alarm = null;
      }else{
        alert_element.alarm = alert_info
      }
    }, 600);
    var _inlinks = alert_element.inLinks;
    if (null != _inlinks){
      $.each(_inlinks, function(i, _link){
        _link.strokeColor = '255,0,0'
      });
    }
    var _outlinks = alert_element.outLinks;
    if (null != _outlinks){
      $.each(_outlinks, function(i, _link){
        _link.strokeColor = '255,0,0'
      });
    }
  });

  function forEachStagesElement(stage, id) {
    for (var i = 0; i < stage.childs.length; i++) {
      var scene = stage.childs[i];
      for (var j = 0; j < scene.childs.length ; j++){
        var e = scene.childs[j];
        if (e.id == id){
          return e;
        }
      }
    }
    return null;
  }

  function expertElement(stage) {
    var nodeList = [];
    var linkList = [];
    for (var i = 0; i < stage.childs.length; i++) {
      var scene = stage.childs[i];
      for (var j = 0; j < scene.childs.length ; j++){
        var e = scene.childs[j];
        if (e.elementType == "node"){
          var _e = {
            id : e.id,
            name : e.text,
            type : e.nodetype,
            x : e.x,
            y : e.y,
            ip : e.nodeip
          };
          nodeList.push(_e);
        }
        if (e.elementType == "link"){
          var _e = {
            name : e.text,
            type : e.linktype,
            start : e.nodeA.id,
            end : e.nodeZ.id
          };
          linkList.push(_e);
        }
      }
    }
    return {nodeList : nodeList, linkList : linkList};
  }

});

