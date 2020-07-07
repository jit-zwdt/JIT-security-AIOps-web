<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="4">
        <div class="grid-left">
          <div>
            <el-input placeholder="分组名搜索" v-model="groupName" class="input-with-select" size="mini">
              <el-button slot="append" icon="el-icon-search" size="mini" @click="getGroups()"></el-button>
            </el-input>
          </div>
          <i class="el-icon-s-fold"></i>
          <span class="titlez"> {{this.$route.meta.title}}分组</span>
          <ul>
            <li v-for="item in hostGroupOptions" @click="gotoList(item.groupid)" :key="item.groupid">{{item.name}}</li>
          </ul>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content">
          <el-row :gutter="15">
            <el-col :span="24">
              <div class="grid-content-top">
                <span class="pull-left">{{this.$route.meta.title}}</span>
                <el-button
                        type="primary"
                        size="small"
                        @click="gotoList()"
                        icon="el-icon-s-grid"
                >列表</el-button>
                <el-button
                    type="success"
                    size="small"
                    @click="gotoAdd()"
                    icon="el-icon-edit"
                >添加</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :span="12">
              <el-card class="grid-content-panel">
                <div slot="header" class="grid-content-panel-head">
                  <span>异常账号</span>
                  <el-button style="float: right; padding: 0px; margin-left: 5px;" type="text" @click="refreshCard()"><i class="el-icon-refresh" style="font-size: 18px;color: #cccccc;font-weight: 400;"></i></el-button>
                  <span style="float: right;font-size: 14px;color: #cccccc;font-weight: normal;">2020-07-6 14:13:41</span>
                </div>
                <div v-for="o in 4" :key="o" class="grid-content-panel-content">
                  {{'列表内容 ' + o }}
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="grid-content-panel">
                <div slot="header" class="grid-content-panel-head">
                  <span>ORACLE 表空间 Top5</span>
                  <el-button style="float: right; padding: 0px; margin-left: 5px;" type="text" @click="refreshCard()"><i class="el-icon-refresh" style="font-size: 18px;color: #cccccc;font-weight: 400;"></i></el-button>
                  <span style="float: right;font-size: 14px;color: #cccccc;font-weight: normal;">2020-07-6 14:13:41</span>
                </div>
                <div v-for="o in 4" :key="o" class="grid-content-panel-content">
                  {{'列表内容 ' + o }}
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :span="12">
              <el-card class="grid-content-panel">
                <div slot="header" class="grid-content-panel-head">
                  <span>MYSQL 每秒查询数 Top5</span>
                  <el-button style="float: right; padding: 0px; margin-left: 5px;" type="text" @click="refreshCard()"><i class="el-icon-refresh" style="font-size: 18px;color: #cccccc;font-weight: 400;"></i></el-button>
                  <span style="float: right;font-size: 14px;color: #cccccc;font-weight: normal;">2020-07-6 14:13:41</span>
                </div>
                <div v-for="o in 4" :key="o" class="grid-content-panel-content">
                  {{'列表内容 ' + o }}
                </div>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="grid-content-panel">
                <div slot="header" class="grid-content-panel-head">
                  <span>SQL SERVER 用户连接数 Top5</span>
                  <el-button style="float: right; padding: 0px; margin-left: 5px;" type="text" @click="refreshCard()"><i class="el-icon-refresh" style="font-size: 18px;color: #cccccc;font-weight: 400;"></i></el-button>
                  <span style="float: right;font-size: 14px;color: #cccccc;font-weight: normal;">2020-07-6 14:13:41</span>
                </div>
                <div v-for="o in 4" :key="o" class="grid-content-panel-content">
                  {{'列表内容 ' + o }}
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import qs from 'qs'
export default {
  data () {
    return {
      groupName: '',
      hostGroupOptions: []
    }
  },
  created () {
    this.groupName = ''
    this.getGroups()
  },
  methods: {
    getGroups () {
      this.axios.post('/host/getZabbixHostGroupByHostType', qs.stringify({
        typeId: this.$route.meta.typeId,
        groupName: this.groupName
      })).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.hostGroupOptions = json.data
          }
        } else {
          this.$message({
            message: '获取分组信息失败',
            type: 'error'
          })
        }
      })
    },
    gotoAdd () {
      this.$router.push({ name: 'monitorAddList', query: { typeId: this.$route.meta.typeId } })
    },
    gotoList (groupId) {
      this.$router.push({
        name: 'monitorList',
        query: {
          typeId: this.$route.meta.typeId,
          groupId: groupId
        }
      })
    },
    refreshCard () {
      console.log('refreshCard')
    }
  },
  mounted () {
  },
  destroyed () {
  },
  components: {}
}
</script>
<style lang="scss" scoped>
  .el-row {
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
  }
  .grid-left {
    min-height: 800px;
    background: #ffffff;
    padding: 5px 8px;
    font-size: 20px;
    color: #606266;
  }
  .grid-left ul {
    list-style-type: none;
    padding-left: 10px;
    font-size: 16px;
    cursor: pointer;
  }
  .grid-left ul li {
    cursor: pointer;
  }
  .grid-left .titlez {
    font-size: 16px;
    font-weight: 400;
  }
  .grid-content {
    min-height: 800px;
    font-size: 20px;
  }
  .grid-content .grid-content-top {
    height: 50px;
    line-height: 40px;
    padding-left: 18px;
    padding-right: 8px;
    font-size: 20px;
    background: #ffffff;
    text-align: right;
    color: #606266;
  }
  .grid-content .pull-left {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    font-weight: 400;
    float: left !important;
  }
  .grid-content-panel {
    height: 360px;
    padding: 5px 8px;
    font-size: 20px;
    background: #ffffff;
    color: #606266;
  }
  .grid-content-panel-head {
    font-size: 16px;
    font-weight: 400;
  }
  .grid-content-panel-content {
    font-size: 16px;
    background: #ffffff;
  }
</style>
