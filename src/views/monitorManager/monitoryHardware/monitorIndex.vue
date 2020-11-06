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
                  <span>严重告警 Top5</span>
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
                    <template slot-scope="scope">{{ scope.row.value }} qps</template>
                  </el-table-column>
                  <el-table-column prop="hostId" v-if="show"></el-table-column>
                </el-table>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="grid-content-panel">
                <div slot="header" class="grid-content-panel-head">
                  <span>CPU 占用率 Top5</span>
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
                  :data="cpuRateTop5"
                  :show-header="false"
                  v-loading="cpuRateloading"
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
                    <template slot-scope="scope">{{ scope.row.value }} %</template>
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
                  <span>内存占有率 Top5</span>
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
                    <template slot-scope="scope">{{ scope.row.value }} %</template>
                  </el-table-column>
                  <el-table-column prop="hostId" v-if="show"></el-table-column>
                </el-table>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="grid-content-panel">
                <div slot="header" class="grid-content-panel-head">
                  <span>IO 读写率 Top5</span>
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
                  :data="ioRateTop5"
                  :show-header="false"
                  v-loading="ioRateloading"
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
                    <template slot-scope="scope">{{ scope.row.value }} %</template>
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
      ioRateloading: true,
      cpuRateloading: true,
      timer: '',
      show: false,
      groupName: '',
      // 分组信息
      hostGroupOptions: [],
      memoryTop5: [],
      exceptionTop5: [],
      ioRateTop5: [],
      cpuRateTop5: [],
      currentTime: '', // 获取当前时间
      metaTypeId: '5'
    }
  },
  // 创建的时候
  created () {
    this.groupName = ''
    this.getGroups()
    this.getmemoryTop5ByItem()
    this.getExceptionTop5ByItem()
    this.getcpuRateTop5ByItem()
    this.getioRateTop5ByItem()
    this.currentTimefunction()
  },
  // 销毁之前
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
    // 截取当前的时间
    currentTimefunction () {
      this.timer = setInterval(this.getDate, 500)
    },
    // 获取当前的时间
    getDate () {
      this.currentTime = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
    },
    // 获取左面的分组信息
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
    // 跳转到对应的添加硬件系统的模板页面
    gotoAdd () {
      this.$router.push({ name: 'monitorAddList', query: { typeId: this.metaTypeId } })
    },
    // 跳转到对应添加信息的模板中
    showhostIdInfo (row) {
      this.$router.push({ name: 'monitorHardInfo', query: { hostId: row.hostId, hostName: row.hostName } })
    },
    // 刷新 严重告警 Top5 调用的方法
    getmemoryTop5ByItem () {
      this.memoryloading = true
      const param = {
        typeId: this.metaTypeId,
        itemKey: '3',
        valueType: '0',
        method: 'top5ByItem'
      }
      this.axios.post(this.$api.monitorManager.getTop5Msg, param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
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
    // 刷新CPU 占用率 Top5 调用的方法
    getExceptionTop5ByItem () {
      this.exceptionloading = true
      const param = {
        typeId: this.metaTypeId
      }
      this.axios.post(this.$api.monitorManager.getTop5ByTrigger, param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
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
    // 刷新内存占有率 Top5 调用的方法
    getcpuRateTop5ByItem () {
      this.cpuRateloading = true
      const param = {
        typeId: this.metaTypeId,
        itemKey: '2',
        valueType: '0',
        method: 'top5ByItem'
      }
      this.axios.post(this.$api.monitorManager.getTop5Msg, param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.cpuRateTop5 = json.data
            this.cpuRateloading = false
          } else {
            this.cpuRateloading = false
          }
        } else {
          this.$message({
            message: '获取分组信息失败',
            type: 'error'
          })
        }
      })
    },
    // 刷新 IO 读写率 Top5 调用的方法
    getioRateTop5ByItem () {
      this.ioRateloading = true
      this.ioRateloading = false
    },
    // 跳转到查询所有相关硬件的列表页面 传输的参数为 5 查询的是硬件的信息
    gotoList (groupId) {
      this.$router.push({
        name: 'monitorList',
        query: {
          typeId: this.metaTypeId,
          groupId: groupId
        }
      })
    },
    // 四个框框的刷新方法
    refreshCard (str) {
      if (str === '1') {
        this.getExceptionTop5ByItem()
      } else if (str === '2') {
        this.getcpuRateTop5ByItem()
      } else if (str === '3') {
        this.getmemoryTop5ByItem()
      } else if (str === '4') {
        this.getioRateTop5ByItem()
      }
    }
  },
  // 创建完毕时间调用的方法
  mounted () {
  },
  // 销毁时调用的方法
  destroyed () {
  },
  // 组件的添加
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
