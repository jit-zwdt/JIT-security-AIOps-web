$(document).ready(function(){

  createDevices();

  var canvas = document.getElementById('target');

var json = '{"version":"0.4.8_01","frames":24,"wheelZoom":1.2,"childs":[{"elementType":"scene","background":"http://localhost:7070/jt/imgs/bg.png","backgroundColor":"255,255,255","mode":"normal","paintAll":false,"areaSelect":true,"translate":true,"translateX":-8,"translateY":-8,"lastTranslatedX":undefined,"lastTranslatedY":undefined,"alpha":0,"visible":true,"scaleX":1,"scaleY":1,"childs":[{"elementType":"node","x":90.5,"y":118,"width":64,"height":12,"visible":true,"alpha":1,"rotate":0,"scaleX":1,"scaleY":1,"strokeColor":"22,124,255","fillColor":"22,124,255","shadow":false,"shadowColor":"rgba(0,0,0,0.5)","shadowOffsetX":3,"shadowOffsetY":6,"transformAble":true,"zIndex":3,"dragable":true,"selected":false,"showSelected":true,"isMouseOver":false,"text":"Disk_array_2D_1","font":"bold 12px 微软雅黑","fontColor":"155,123,2","textPosition":"Bottom_Center","textOffsetX":0,"textOffsetY":0,"borderRadius":null},{"elementType":"node","x":436.5,"y":304,"width":64,"height":12,"visible":true,"alpha":1,"rotate":0,"scaleX":1,"scaleY":1,"strokeColor":"22,124,255","fillColor":"22,124,255","shadow":false,"shadowColor":"rgba(0,0,0,0.5)","shadowOffsetX":3,"shadowOffsetY":6,"transformAble":true,"zIndex":3,"dragable":true,"selected":false,"showSelected":true,"isMouseOver":false,"text":"exchanger_2","font":"bold 12px 微软雅黑","fontColor":"155,123,2","textPosition":"Bottom_Center","textOffsetX":0,"textOffsetY":0,"borderRadius":null},{"elementType":"node","x":93.5,"y":308,"width":64,"height":12,"visible":true,"alpha":1,"rotate":0,"scaleX":1,"scaleY":1,"strokeColor":"22,124,255","fillColor":"22,124,255","shadow":false,"shadowColor":"rgba(0,0,0,0.5)","shadowOffsetX":3,"shadowOffsetY":6,"transformAble":true,"zIndex":3,"dragable":true,"selected":false,"showSelected":true,"isMouseOver":false,"text":"server_3","font":"bold 12px 微软雅黑","fontColor":"155,123,2","textPosition":"Bottom_Center","textOffsetX":0,"textOffsetY":0,"borderRadius":null}]}]}';
            //var stage = csfj(json, canvas);


  var stage  = new JTopo.Stage(canvas);
  //显示工具栏
  showJTopoToobar(stage, canvas);
  var scene = new JTopo.Scene(stage);
  //var scene = stage.childs[0];
  scene.background = 'images/bg.png';
  // var colors = ['0,0,255','144,238,144','255,165,0','255,0,0']; //蓝色、绿色、橙色、红色
  var currentNode = null;
  var currentLine = null;
  var currentDetail = {
    'OS': "CentOS 7",
    'RAM': "8GB",
    'cpu': "四核",
    "磁盘": "256GB"
  }

  // var currentType = '1';
  var beginNode = null;
  var tempNodeA = new JTopo.Node('tempA');
  tempNodeA.setSize(1, 1);
  var tempNodeZ = new JTopo.Node('tempZ');
  tempNodeZ.setSize(1, 1);
  var link = newLink(tempNodeA, tempNodeZ, $("#linestyle").val());  

  scene.mousemove(function(e){      
    tempNodeZ.setLocation(e.x, e.y);
  }); 

  $(".coms").delegate(".component", "mousedown", function(md){   
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
      var tar_pos = $target.position();

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

  // $(".coms .line").click(function(e){
  //   currentType = e.target.id;
  // });

  function getArrayIndex(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) {
          return i;
      }
    }
    return -1;
  }

  function createDevices(){
    if (null != devices){
      $.each(devices, function(i, name){     
        var parentdiv = $('<div></div>');
        parentdiv.addClass('component');
        parentdiv.attr('id', name);
        parentdiv.attr('title', devices_name[i]);
        parentdiv.attr('trigger', 'manual');
        var sna = $('<a></a>');
        var w = devices_size_64[i][0];
        var h = devices_size_64[i][1];
        if ((w > h) && (w - h) > 30){
          sna.css({
            "display": "inline-block",
            "width":"48px",
            "height": "48px",
            "margin-right": "auto",
            "margin-left": "auto",
            "padding": "4px 0",
            "text-align": "center",
            "vertical-align": "middle",
            "cursor": "pointer",
            "background": "url('images/" + devices_img_64[i] + "') no-repeat center center"
          });
        } else {
          sna.css({
            "display": "inline-block",
            "width":"48px",
            "height": "48px",
            "margin-right": "auto",
            "margin-left": "auto",
            "padding": "4px 0",
            "text-align": "center",
            "vertical-align": "middle",
            "cursor": "pointer",
            "background": "url('images/" + devices_img_64[i] + "') no-repeat center center",
            "background-size": "80% 80%",
            "-moz-background-size": "100% 100%"
          });
        }
        parentdiv.append(sna);
        $("#components").append(parentdiv);
      });   
    }
  }

  function csfj(jsonStr, canvas) {
    eval("var jsonObj = " + jsonStr);
    var stage = new JTopo.Stage(canvas);
    for (var k in jsonObj)"childs" != k && (stage[k] = jsonObj[k]);
    var scenes = jsonObj.childs;
    return scenes.forEach(function(a) {
      var b = new JTopo.Scene(stage);
      for (var c in a)"childs" != c && (b[c] = a[c]),
      "background" == c && (b.background = a[c]);
      var d = a.childs;$('#rToJ').val(JSON.stringify(d))
      d.forEach(function(a) {
        var c = null,
        d = a.elementType;
        "node" == d ? c = new JTopo.Node: "CircleNode" == d && (c = new JTopo.CircleNode);
        for (var e in a) c[e] = a[e];
        b.add(c)
      })
    }),
    stage
  }

  function addNode(node){
    var n = new JTopo.Node(node.name);
    var index = getArrayIndex(devices, node.type);
    n.id = node.id;
    n.nodetype = node.type;
    n.setLocation(node.left, node.top);
    n.setImage("images/" + devices_img_64[index]);
    n.fontColor = '155,123,2';
    n.font = 'bold 12px 微软雅黑';
    n.setSize(devices_size_64[index][0], devices_size_64[index][1]);

    n.alarm = 'bold 12px 微软雅黑';
    n.alarmColor = '255,0,0';
    n.alarmAlpha = 0.9;

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
          var l = newLink(beginNode, endNode, $("#linestyle").val());
          addLink(l);
          beginNode = null;            
          scene.remove(link);           
        } else {
          beginNode = null;
        }
      }else{
          scene.remove(link);      
      } 
    }
  }

  stage.click(function(event){
    if(event.button == 0){
        // 关闭弹出菜单（div）
        $("#contextmenu").hide();   
        $("#linemenu").hide();      
    }
  });
  /* 节点右键菜单处理 */ 
  $("#contextmenu a").click(function(e){
    var text = $(this).text();    
    if(text == '删除该节点'){
      scene.remove(currentNode);
      currentNode = null;
    }else if(text == '撤销上一次操作'){
      currentNode.restore();
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
    }else if(text == '节点详情'){
      var detail = currentNode.detail || currentDetail;
      var li = "";
      if(detail != '' && detail != undefined){
          $.each(detail,function(key,item){
              li += "<li>"+key+" : "+item+"</li>";
          });
      }else{
          li = "<li>暂无详细参数</li>";
      }
      $("#detail").html(li);
      $("#contextmenu").hide();
      $("#detail li").attr("style","padding:6px");
      $("#detail").css({
          top: currentNode.y,
          left: currentNode.x
      }).show();
    }else if(text == '前往机器管理平台'){
      var url = currentNode.url;
      if(url != '' && url != undefined){
          window.open(url);
      }else{
          $("#detail").html("<li>接口未给出机器管理平台地址，无法跳转</li>");
          $("#contextmenu").hide();
          $("#detail li").attr("style","padding:10px");
          $("#detail").css({
              top: currentNode.y-30,
              left: currentNode.x+40
          }).show();
      }
    }else{
      currentNode.save();
    }
    $("#contextmenu").hide();    
  });

  /* 连线右键菜单处理 */ 
  $("#linemenu a").click(function(){
    var text = $(this).text();    
    if(text == '删除该连线'){
      
      scene.remove(currentLine);
      currentLine = null;
    }
    $("#linemenu").hide();
  });

  // 页面工具栏
function showJTopoToobar(stage, canvas){
    var toobarDiv = $('<div class="jtopo_toolbar">').html(''
    // +'<input type="radio" name="modeRadio" value="normal" checked id="r1"/>'
    +'<label for=""> 鼠标选项：</label>'
    +'&nbsp;<input type="radio" name="modeRadio" value="drag" id="r3"/><label for="r3"> 拖动画布</label>'
    +'&nbsp;<input type="radio" name="modeRadio" value="select" id="r2"/><label for="r2"> 框选元素</label>'
    +'&nbsp;<input type="radio" name="modeRadio" value="normal" id="r4"/><label for="r4"> 添加节点连线</label>'
    +'&nbsp;&nbsp;<select name="linestyle" id="linestyle" class="form-control">'
    +'<option value="defaultline">连线样式（默认样式）</option><option value="simpleline">简单连线</option>'
    +'<option value="polyline">折线</option><option value="dbpolyline">二次折线</option><option value="curve">曲线</option>'    
    +'</select>&nbsp;&nbsp;'
    //+'<input type="button" id="fullScreenButton" value="全屏显示"/>'
    +'<input type="button" class="btn" id="zoomOutButton" value=" 放 大 " />&nbsp;&nbsp;'
    +'<input type="button" class="btn" id="zoomInButton" value=" 缩 小 " />&nbsp;&nbsp;'
    //+'&nbsp;&nbsp;<input type="text" id="findText" style="width: 100px;" value="" onkeydown="enterPressHandler(event)">'
    //+ '<input type="button" id="findButton" value=" 查 询 ">'
    // + '&nbsp;&nbsp;<input type="button" id="cloneButton" value="选中克隆">&nbsp;&nbsp;'
    +'&nbsp;&nbsp;<input type="button" class="btn btn-info" id="exportButton" value="导出PNG">&nbsp;&nbsp;'
    +'&nbsp;&nbsp;<input type="checkbox" id="zoomCheckbox"/><label for="zoomCheckbox">鼠标缩放</label>&nbsp;&nbsp;'
    + '&nbsp;&nbsp;<input type="button" id="printButton" value="导出JSON">'
     + '&nbsp;&nbsp;<input type="button" id="buildButton" value="导入数据">'
    );

    $('#content').prepend(toobarDiv);

    // 工具栏按钮处理
    $("input[name='modeRadio']").click(function(){
        stage.mode = $("input[name='modeRadio']:checked").val();      
    });
    $('#centerButton').click(function(){
        stage.centerAndZoom(); //缩放并居中显示
    });
    $('#zoomOutButton').click(function(){
        stage.zoomOut();
    });
    $('#zoomInButton').click(function(){
        stage.zoomIn();
    });
    $('#cloneButton').click(function(){
        stage.saveImageInfo();
    });
    $('#exportButton').click(function() {
        stage.saveImageInfo();
    });
    $('#printButton').click(function() {
        $('#rToJ').val(JSON.stringify(expertElement(stage)));
       
       //JTopo.createStageFromJson($('#rToJ').val(), canvas);
    });
    $('#buildButton').click(function() {
      eval("var jsonObj = " + '{"nodeList":[{"id":"GUID_034A8443_E978_9A84_79A4_7973414B748B","name":"网络","type":"Network","x":476.5,"y":278},{"id":"GUID_F872F24A_D356_D384_39F3_CD378061E9C9","name":"网络电话交换机","type":"IP_PBX","x":114.5,"y":235},{"id":"GUID_820F7778_8CFC_A344_BB7F_07C41383FD6A","name":"机房","type":"House","x":404.5,"y":54},{"id":"GUID_EAD63D25_098E_D544_6555_AF3307390F1C","name":"磁盘阵列(2D)","type":"Disk_array_2D","x":158.5,"y":102},{"id":"GUID_4792FD7B_2A67_9BC4_752E_BAE545C6F876","name":"加密路由符号","type":"Crypto-router_symbol","x":328.5,"y":159},{"id":"GUID_B15D884B_A898_4514_4D66_EF93F58B1DD6","name":"加密路由","type":"Crypto-router","x":622.5,"y":157}],"linkList":[{"type":"defaultline","start":"GUID_820F7778_8CFC_A344_BB7F_07C41383FD6A","end":"GUID_EAD63D25_098E_D544_6555_AF3307390F1C"},{"type":"simpleline","start":"GUID_820F7778_8CFC_A344_BB7F_07C41383FD6A","end":"GUID_F872F24A_D356_D384_39F3_CD378061E9C9"},{"type":"polyline","start":"GUID_820F7778_8CFC_A344_BB7F_07C41383FD6A","end":"GUID_4792FD7B_2A67_9BC4_752E_BAE545C6F876"},{"type":"dbpolyline","start":"GUID_820F7778_8CFC_A344_BB7F_07C41383FD6A","end":"GUID_034A8443_E978_9A84_79A4_7973414B748B"},{"type":"curve","start":"GUID_820F7778_8CFC_A344_BB7F_07C41383FD6A","end":"GUID_B15D884B_A898_4514_4D66_EF93F58B1DD6"}]}');
      if (null != jsonObj){
        if (null != jsonObj.nodeList){
          $.each(jsonObj.nodeList, function(i, e){
            var tmpnode = {
              name: e.name,
              type: e.type,
              id: e.id,
              left: e.x,
              top: e.y
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
    $('#zoomCheckbox').click(function(){
        if($('#zoomCheckbox').is(':checked')){
            stage.wheelZoom = 1.2; // 设置鼠标缩放比例
        }else{
            stage.wheelZoom = null; // 取消鼠标缩放比例
        }
    });
    
}

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
          y : e.y
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

function toJson(a) {
  var b = "backgroundColor,visible,mode,rotate,alpha,scaleX,scaleY,shadow,translateX,translateY,areaSelect,paintAll".split(","),
  c = "text,elementType,x,y,width,height,visible,alpha,rotate,scaleX,scaleY,fillColor,shadow,transformAble,zIndex,dragable,selected,showSelected,font,fontColor,textPosition,textOffsetX,textOffsetY,nodeA,nodeZ,id,nodetype".split(","),
  d = "{";
  d += "frames:" + a.frames,
  d += ", scenes:[";
  for (var e = 0; e < a.childs.length; e++) {
    var f = a.childs[e];
    d += "{",
    d += getProperties(f, b),
    d += ", elements:[";
    for (var g = 0; g < f.childs.length; g++) {
      var h = f.childs[g];
      g > 0 && (d += ","),
      d += "{",
      d += getProperties(h, c),
      d += "}"
    }
    d += "]}"
  }
  return d += "]",
  d += "}"
}
function getProperties(a, b) {
  for (var c = "",
  d = 0; d < b.length; d++) {
    d > 0 && (c += ",");
    var e = a[b[d]];
    "string" == typeof e ? e = '"' + e + '"': void 0 == e && (e = null),
    c += b[d] + ":" + e
  }
  return c
}

});

