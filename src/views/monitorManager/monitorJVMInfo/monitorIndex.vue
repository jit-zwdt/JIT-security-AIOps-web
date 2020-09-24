<template>
  <div>
    <el-row :gutter="15">
      <!-- <el-col :span="4">
        <div class="grid-left">
          <div>
            <el-input placeholder="分组名搜索" v-model="groupName" class="input-with-select" size="mini">
              <el-button slot="append" icon="el-icon-search" size="mini" @click="getGroups()"></el-button>
            </el-input>
          </div>
          <i class="el-icon-s-fold"></i>
          <span class="titlez">{{this.$route.meta.title}}分组</span>
          <ul>
            <li
              v-for="item in hostGroupOptions"
              @click="gotoList(item.groupid)"
              :key="item.groupid"
            >{{item.name}}</li>
          </ul>
        </div>
      </el-col> -->
      <el-col :span="24">
        <div class="grid-content">
          <el-row :gutter="15">
            <el-col :span="24">
              <div class="grid-content-top">
                <span class="pull-left">{{this.$route.meta.title}}</span>
                <el-button type="primary" size="small" @click="gotoList()" icon="el-icon-s-grid">列表</el-button>
                <el-button type="success" size="small" @click="gotoAdd()" icon="el-icon-edit">添加</el-button>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :span="12">
              <el-card class="grid-content-panel">
                <div slot="header" class="grid-content-panel-head">
                  <span>JVM 异常数 Top5</span>
                  <el-button
                    style="float: right; padding: 0px; margin-left: 5px;"
                    type="text"
                    @click="refreshCard('1')"
                  >
                    <i
                      class="el-icon-refresh"
                      style="font-size: 18px;color: #979899;font-weight: 400;"
                    ></i>
                  </el-button>
                  <span style="float: right;font-size: 14px;color: #cccccc;font-weight: normal;">
                    <i
                      class="fa fa-clock-o"
                      style="margin-right: 5px; margin-left: 5px; cursor: pointer;"
                    ></i>
                    {{currentTime}}
                  </span>
                </div>
                <el-table
                  :data="exceptionTop5"
                  :show-header="false"
                  v-loading="exceptionloading"
                  style="width: 100%"
                >
                  <el-table-column width="530">
                    <template slot-scope="scope">
                      <el-link
                        type="primary"
                        @click="showhostIdInfo(scope.row)"
                      >{{scope.row.hostName}}</el-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="clock" width="220" v-if="show"></el-table-column>
                  <el-table-column prop="value">
                    <template slot-scope="scope">{{ scope.row.value }}</template>
                  </el-table-column>
                  <el-table-column prop="hostId" v-if="show"></el-table-column>
                </el-table>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="grid-content-panel">
                <div slot="header" class="grid-content-panel-head">
                  <span>JVM 当前线程数 Top5</span>
                  <el-button
                    style="float: right; padding: 0px; margin-left: 5px;"
                    type="text"
                    @click="refreshCard('2')"
                  >
                    <i
                      class="el-icon-refresh"
                      style="font-size: 18px;color: #979899;font-weight: 400;"
                    ></i>
                  </el-button>
                  <span style="float: right;font-size: 14px;color: #cccccc;font-weight: normal;">
                    <i
                      class="fa fa-clock-o"
                      style="margin-right: 5px; margin-left: 5px; cursor: pointer;"
                    ></i>
                    {{currentTime}}
                  </span>
                </div>
                <el-table
                  :data="threadTop5"
                  :show-header="false"
                  v-loading="threadloading"
                  style="width: 100%"
                >
                  <el-table-column width="530">
                    <template slot-scope="scope">
                      <el-link
                        type="primary"
                        @click="showhostIdInfo(scope.row)"
                      >{{scope.row.hostName}}</el-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="clock" width="220" v-if="show"></el-table-column>
                  <el-table-column prop="value">
                    <template slot-scope="scope">{{ scope.row.value }}</template>
                  </el-table-column>
                  <el-table-column prop="hostId" v-if="show"></el-table-column>
                </el-table>
              </el-card>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :span="12">
              <el-card class="grid-content-panel">
                <div slot="header" class="grid-content-panel-head">
                  <span>Apache 缓存使用 Top5</span>
                  <el-button
                    style="float: right; padding: 0px; margin-left: 5px;"
                    type="text"
                    @click="refreshCard('3')"
                  >
                    <i
                      class="el-icon-refresh"
                      style="font-size: 18px;color: #979899;font-weight: 400;"
                    ></i>
                  </el-button>
                  <span style="float: right;font-size: 14px;color: #cccccc;font-weight: normal;">
                    <i
                      class="fa fa-clock-o"
                      style="margin-right: 5px; margin-left: 5px; cursor: pointer;"
                    ></i>
                    {{currentTime}}
                  </span>
                </div>
                <el-table
                  :data="memoryTop5"
                  :show-header="false"
                  v-loading="memoryloading"
                  style="width: 100%"
                >
                  <el-table-column width="530">
                    <template slot-scope="scope">
                      <el-link
                        type="primary"
                        @click="showhostIdInfo(scope.row)"
                      >{{scope.row.hostName}}</el-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="clock" width="220" v-if="show"></el-table-column>
                  <el-table-column prop="value">
                    <template
                      slot-scope="scope"
                    >{{ Math.round(scope.row.value/1024/1024*100)/100 }} MB</template>
                  </el-table-column>
                  <el-table-column prop="hostId" v-if="show"></el-table-column>
                </el-table>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="grid-content-panel">
                <div slot="header" class="grid-content-panel-head">
                  <span>JVM 每秒请求数 Top5</span>
                  <el-button
                    style="float: right; padding: 0px; margin-left: 5px;"
                    type="text"
                    @click="refreshCard('4')"
                  >
                    <i
                      class="el-icon-refresh"
                      style="font-size: 18px;color: #979899;font-weight: 400;"
                    ></i>
                  </el-button>
                  <span style="float: right;font-size: 14px;color: #cccccc;font-weight: normal;">
                    <i
                      class="fa fa-clock-o"
                      style="margin-right: 5px; margin-left: 5px; cursor: pointer;"
                    ></i>
                    {{currentTime}}
                  </span>
                </div>
                <el-table
                  :data="requestNumTop5"
                  :show-header="false"
                  v-loading="requestNumloading"
                  style="width: 100%"
                >
                  <el-table-column width="530">
                    <template slot-scope="scope">
                      <el-link
                        type="primary"
                        @click="showhostIdInfo(scope.row)"
                      >{{scope.row.hostName}}</el-link>
                    </template>
                  </el-table-column>
                  <el-table-column prop="clock" width="220" v-if="show"></el-table-column>
                  <el-table-column prop="value">
                    <template slot-scope="scope">{{ scope.row.value }}</template>
                  </el-table-column>
                  <el-table-column prop="hostId" v-if="show"></el-table-column>
                </el-table>
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
      memoryloading: true,
      exceptionloading: true,
      requestNumloading: true,
      threadloading: true,
      timer: '',
      show: false,
      groupName: '',
      hostGroupOptions: [],
      memoryTop5: [],
      exceptionTop5: [],
      requestNumTop5: [],
      threadTop5: [],
      currentTime: '', // 获取当前时间
      metaTypeId: '28'
    }
  },
  created () {
    this.groupName = ''
    this.getGroups()
    this.getmemoryTop5ByItem()
    this.getExceptionTop5ByItem()
    this.getthreadTop5ByItem()
    this.getrequestNumTop5ByItem()
    this.currentTimefunction()
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
    currentTimefunction () {
      this.timer = setInterval(this.getDate, 500)
    },
    getDate () {
      this.currentTime = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
    },
    getGroups () {
      this.axios.post(this.$api.monitorManager.getZabbixHostGroupByHostType, qs.stringify({
        typeId: this.metaTypeId,
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
      this.$router.push({ name: 'monitorAddList', query: { typeId: this.metaTypeId } })
    },
    showhostIdInfo (row) {
      this.$router.push({ name: 'monitorPossessionJvmInfo', query: { hostId: row.hostId, hostName: row.hostName } })
    },
    getmemoryTop5ByItem () {
      this.memoryloading = true
      const param = {
        typeId: this.metaTypeId,
        itemKey: '3',
        valueType: '3',
        method: 'top5ByItem'
      }
      this.axios.post(this.$api.monitorManager.getTop5Msg, param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            console.log(json.data)
            this.memoryTop5 = json.data
            this.memoryloading = false
          } else {
            this.memoryloading = false
          }
        } else {
          this.$message({
            message: '获取分组信息失败',
            type: 'error'
          })
        }
      })
    },
    getExceptionTop5ByItem () {
      this.exceptionloading = true
      const param = {
        typeId: this.metaTypeId
      }
      this.axios.post(this.$api.monitorManager.getTop5ByTrigger, param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            console.log(json.data)
            this.exceptionTop5 = json.data
            this.exceptionloading = false
          } else {
            this.exceptionloading = false
          }
        } else {
          this.$message({
            message: '获取分组信息失败',
            type: 'error'
          })
        }
      })
    },
    getthreadTop5ByItem () {
      this.threadloading = true
      const param = {
        typeId: this.metaTypeId,
        itemKey: '2',
        valueType: '3',
        method: 'top5ByItem'
      }
      this.axios.post(this.$api.monitorManager.getTop5Msg, param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            console.log(json.data)
            this.threadTop5 = json.data
            this.threadloading = false
          } else {
            this.threadloading = false
          }
        } else {
          this.$message({
            message: '获取分组信息失败',
            type: 'error'
          })
        }
      })
    },
    getrequestNumTop5ByItem () {
      this.requestNumloading = true
      const param = {
        typeId: this.metaTypeId,
        itemKey: '4',
        valueType: '0',
        method: 'top5ByItem'
      }
      this.axios.post(this.$api.monitorManager.getTop5Msg, param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            console.log(json.data)
            this.requestNumTop5 = json.data
            this.requestNumloading = false
          } else {
            this.requestNumloading = false
            this.requestNumTop5 = []
          }
        } else {
          this.$message({
            message: '获取分组信息失败',
            type: 'error'
          })
        }
      })
    },
    gotoList (groupId) {
      this.$router.push({
        name: 'monitorList',
        query: {
          typeId: this.metaTypeId,
          groupId: groupId
        }
      })
    },
    refreshCard (str) {
      if (str === '1') {
        this.getExceptionTop5ByItem()
      } else if (str === '2') {
        this.getthreadTop5ByItem()
      } else if (str === '3') {
        this.getmemoryTop5ByItem()
      } else if (str === '4') {
        this.getrequestNumTop5ByItem()
      }
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
