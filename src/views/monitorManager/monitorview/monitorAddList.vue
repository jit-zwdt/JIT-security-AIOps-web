<template>
  <div>
    <ToolBar>
      <div class="queryleft">
        <el-col :span="8">
          <el-input type="text" v-model="hostObjectName" size="small" placeholder="搜索关键字" clearable></el-input>
        </el-col>
        <el-col :span="6">
          <el-select v-model="hostType" class="datetop" filterable placeholder="模板类型" clearable>
            <el-option
              v-for="item in hostTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-col>
        <el-button type="primary" size="small" @click="showInfo() == false" icon="el-icon-search">查询</el-button>
        <el-button
          type="primary"
          size="small"
          @click="showClear() == false"
          icon="el-icon-refresh-left"
        >重置</el-button>
      </div>
      <div class="queryright">
        <el-button @click="backfrom()">返回</el-button>
      </div>
    </ToolBar>
    <template>
      <div class="card dark-main-background" v-for="(items, index) in tableData" v-bind:key="index">
        <div
          class="title-bar card-header m-a-0 dark-main-background dark-deep-border dark-white-color"
        >
          <h1 class="title-bar-title m-b-sm">
            <span class="d-ib">{{items.type}}</span>
          </h1>
          <div v-if="items.templates.length !== 0">
            <p class="title-bar-description">
              <span>agent标识表示需要安装agent客户端, snmp标识表示需支持snmp协议</span>
            </p>
          </div>
        </div>
        <div class="tempList card-body">
          <div v-if="items.templates.length === 0">
            <div style="text-align: center; font-size: 14px;">暂无该类型模板，请创建并迁移</div>
          </div>
          <div v-else>
            <div class="card m-r" v-for="(item, index) in items.templates" v-bind:key="index">
              <div class="card-body p-a-0">
                <div v-if="item.typeId === '4'">
                  <div class="pos-r snmp">
                    <div class="img-container text-center">
                      <img
                        :src="item.ico"
                        alt
                        height="100px"
                        class="card-img"
                        style="width:100px !important"
                      />
                    </div>
                    <p class="text-center p-x-md template-name">{{item.name}}</p>
                  </div>
                </div>
                <div v-else>
                  <div class="pos-r agent">
                    <div class="img-container text-center">
                      <img
                        :src="item.ico"
                        alt
                        height="100px"
                        class="card-img"
                        style="width:100px !important"
                      />
                    </div>
                    <p class="text-center p-x-md template-name">{{item.name}}</p>
                  </div>
                </div>
              </div>
              <div class="card-footer no-border text-center">
                <a
                  @click="showTempHelp(item.helpDoc,item.name,item.ico)"
                  class="el-button w-100 el-button--primary el-button--mini hosts-btn"
                  style="height: 28px; line-height: 100%; padding: 6px 8px; font-size: 12px; border-radius: 3px; margin-left: 0px; margin-top: 2px; text-decoration: none;"
                >
                  <i class="fa fa-question"></i>
                  <span>帮助</span>
                </a>
                <a
                  @click="showAssetsAdd(item.id,item.typeId,item.subtypeIds,item.name)"
                  href="javaScript:void(0)"
                  class="el-button w-100 el-button--success el-button--mini hosts-btn"
                  style="height: 28px; line-height: 100%; padding: 6px 8px; font-size: 12px; border-radius: 3px; margin-left: 0px; margin-top: 2px; text-decoration: none;"
                >
                  <i class="fa fa-plus"></i>
                  <span>创建</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <HelpTemplates :helpform="helpform" :showhelpDialog="showhelpDialog"></HelpTemplates>
  </div>
</template>
<script>
import HelpTemplates from '@/views/monitorManager/helpTemplates/helpTemplates.vue'
export default {
  data () {
    return {
      show: false,
      hostObjectName: '',
      hostType: '',
      tableData: {
        type: '',
        templates: [{}]
      },
      showhelpDialog: false,
      helpform: {
        url: '',
        name: '',
        imgurl: ''
      },
      hostTypeOptions: [
        {
          value: '1',
          label: '操作系统'
        },
        {
          value: '2',
          label: '数据库'
        },
        {
          value: '3',
          label: '中间件'
        },
        {
          value: '4',
          label: '网络设备'
        },
        {
          value: '5',
          label: '硬件'
        },
        {
          value: '6',
          label: '虚拟化'
        },
        {
          value: '7',
          label: '云平台'
        }
      ],
      loading: true,
      tableDataclear: [],
      setTimeoutster: ''
    }
  },
  created () {
    this.initParams()
    this.showInfo()
  },
  methods: {
    initParams () {
      var typeId = this.$route.query.typeId
      if (typeId != null && typeof (typeId) !== 'undefined' && typeId !== '') {
        this.hostType = typeId
      }
    },
    reloadData () {
      this.showInfo()
    },
    showInfo (str) {
      this.loading = true
      this.tableData = this.tableDataclear
      const _this = this
      this.setTimeoutster = window.setTimeout(() => { _this.showInfoTimeout() }, 300)
    },
    showInfoTimeout (str) {
      const param = new URLSearchParams()
      param.append('keyword', this.hostObjectName)
      param.append('type', this.hostType)
      this.axios.post('/monitorTemplates/getTemplates', param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          // console.log(json)
          if (json.code === 1) {
            this.tableData = json.data
            this.loading = false
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    showClear () {
      this.assetNameTop = ''
      this.assetRegisterDateStartTop = ''
      this.assetRegisterDateEndTop = ''
      this.titleType = ''
    },
    showAssetsAdd (id, typeId, subtypeIds, name) {
      this.$router.push({ name: 'monitorAdd', query: { templateId: id, templateTypeId: typeId, templateSubTypeId: subtypeIds, templateTypeName: name, id: '', groupIds: '' } })
    },
    backfrom () {
      this.$router.go(-1) // 返回上一层
    },
    showTempHelp (url, name, ico) {
      this.helpform.url = url
      this.helpform.name = name
      this.helpform.imgurl = ico
      this.showhelpDialog = true
    },
    noReloadData () {
      this.showhelpDialog = false
    }
  },
  actions: {
  },
  components: { HelpTemplates }
}
</script>
<style lang="scss" scoped>
.queryleft {
  float: left;
}
.queryright {
  float: right;
}
.toolbar > div:last-child {
  justify-content: flex-start;
}
.datetop /deep/ input {
  height: 32px !important;
  margin-top: 1px !important;
}
/deep/.el-input__prefix {
  margin-top: -3px;
}
/deep/.el-button {
  margin-left: 10px;
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
}
.title-bar-title {
  font-size: 24px;
  margin-top: 0px;
  line-height: 24px;
}
.title-bar-description {
  margin-bottom: 0px;
  margin-top: -5px;
}
.dark-main-background {
  margin-top: 10px;
}
.card-header {
  background-color: #fff;
}
.card-footer {
  background-color: #fff;
  padding: 0px 15px 5px 25px;
}
.no-border {
  border: none;
}
.agent:before {
  content: 'Agent';
  font-family: sans-serif;
  font-size: 13px;
  background: #ef6c00;
  color: #fff;
  /*text-transform: uppercase;*/
  font-weight: bold;
  text-align: center;
  display: block;
  width: 6.5em;
  position: absolute;
  padding: 3px;
  top: 0.76em;
  left: -1.8em;
  -ms-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.snmp:before {
  content: 'snmp';
  font-family: sans-serif;
  font-size: 13px;
  background: #ef6c00;
  color: #fff;
  /*text-transform: uppercase;*/
  font-weight: bold;
  text-align: center;
  display: block;
  width: 6.5em;
  position: absolute;
  padding: 3px;
  top: 0.76em;
  left: -1.8em;
  -ms-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.card-footer .hosts-btn {
  width: 90px !important;
}
// .tempList {
//   height: 240px;
// }
.tempList .m-r {
  height: 220px;
}
.img-container img {
  width: 100% !important;
}
.m-r {
  margin-right: 10px !important;
}
.text-center a {
  margin-right: 10px !important;
}
</style>
