<template>
  <div class="body-top">
    <div class="body-top-btn" @click="hiddenSidebar">
      <i class="el-icon-menu"></i>
    </div>
    <div class="right">
      <span @click="showBiInfo()" class="open_bi" title="BI效果图"></span>
      <ul class="prompt_icon">
        <a href="javascript:void(0)" @click="showAlertInfo(5)" title="灾难">
          <li class="prompt_purple">
            <a href="javascript:void(0)">{{ this.typeNum.disaster }}</a>
          </li>
        </a>
        <a href="javascript:void(0)" title="严重">
          <li class="prompt_red" @click="showAlertInfo(4)">
            <a href="javascript:void(0)">{{ this.typeNum.high }}</a>
          </li>
        </a>
        <a href="javascript:void(0)" title="一般严重">
          <li class="prompt_orange" @click="showAlertInfo(3)">
            <a href="javascript:void(0)">{{ this.typeNum.average }}</a>
          </li>
        </a>
        <a href="javascript:void(0)" title="警告">
          <li class="prompt_yellow" @click="showAlertInfo(2)">
            <a href="javascript:void(0)">{{ this.typeNum.warning }}</a>
          </li>
        </a>
        <a href="javascript:void(0)" title="信息">
          <li class="prompt_green" @click="showAlertInfo(1)">
            <a href="javascript:void(0)">{{ this.typeNum.information }}</a>
          </li>
        </a>
        <a href="javascript:void(0)" title="未分类">
          <li class="prompt_gray" @click="showAlertInfo(0)">
            <a href="javascript:void(0)">{{ this.typeNum.notClassified }}</a>
          </li>
        </a>
      </ul>
      <span @click="screenFullToggle(1)" :class="fullToggleStyle1">
        <i class="fa fa-arrows-alt"></i>
      </span>
      <span @click="screenFullToggle(0)" :class="fullToggleStyle0">
        <i class="fa fa-arrows-alt"></i>
      </span>
      <!-- <el-dropdown>
        <span class="body-top-btn">
          <i class="el-icon-setting"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <div style="padding: 10px 20px; text-align: center">
            导航类型：
            <el-button-group>
              <el-button
                :type="system.navType === item.value ? 'primary' : ''"
                size="mini"
                v-for="item in GlobalCfg.systemNavType"
                :key="item.value"
                @click="$store.commit('NAV_TYPE_TOGGLE', item.value)"
                >{{ item.label }}</el-button
              >
            </el-button-group>
          </div>
        </el-dropdown-menu>
      </el-dropdown> -->
      <!-- <span class="body-top-btn">
        <el-badge is-dot class="badge">
          <i class="el-icon-share"></i>
        </el-badge>
      </span> -->
      <span class="body-top-btn imageStyle">
        <el-avatar
          v-if="imageurl"
          shape="square"
          :size="20"
          :src="imageurl"
        ></el-avatar>
      </span>
      <el-dropdown>
        <span class="body-top-btn">
          {{ user.name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="showUserMassage = true">
            <i style="padding-right: 8px" class="fa fa-user"></i>个人中心
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout">
            <i style="padding-right: 8px" class="fa fa-sign-out"></i>退出系统
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <UserMassage
        :showUserMassage="showUserMassage"
        :user="user"
        @close="showUserMassage = false"
        @success="showUserMassage = false"
      ></UserMassage>
    </div>
  </div>
</template>

<script>
import ScreenFull from 'screenfull'
import { mapState } from 'vuex'
import UserMassage from './UserMassage'

export default {
  name: 'BodyTop',
  data () {
    return {
      timer: {},
      user: {},
      showUserMassage: false,
      imageurl: '',
      fullToggleStyle1: '',
      fullToggleStyle0: '',
      typeNum: {
        // 未定义
        notClassified: 0,
        // 信息
        information: 0,
        // 警告
        warning: 0,
        // 一般严重
        average: 0,
        // 严重
        high: 0,
        // 灾难
        disaster: 0
      }
    }
  },
  // 添加组件
  components: {
    UserMassage
  },
  created () {
    this.loopTypeNum()
    this.axios.get(this.$api.sysManager.getUserInfo).then(resp => {
      var json = resp.data
      if (json.code === 1) {
        this.user = json.data
        this.preShow(json.data)
      }
    })
    this.fullToggleStyle1 = 'body-top-btn'
    this.fullToggleStyle0 = 'body-top-btn fullToggledisplay'
  },
  methods: {
    hiddenSidebar () {
      this.$store.commit('HIDE_SIDEBAR_TOGGLE')
    },
    screenFullToggle (type) {
      if (type === 1) {
        this.fullToggleStyle1 = 'body-top-btn fullToggledisplay'
        this.fullToggleStyle0 = 'body-top-btn '
      } else {
        this.fullToggleStyle1 = 'body-top-btn '
        this.fullToggleStyle0 = 'body-top-btn fullToggledisplay'
      }
      ScreenFull.toggle()
        .then(() => {
          this.$store.commit('WINDOW_TYPE_TOGGLE', type)
        })
        .catch(() => {
          this.$message({
            message: '你的浏览器不支持全屏！',
            type: 'warning'
          })
        })
    },
    logout () {
      this.axios.post(this.$api.logout).then((resp) => {
        this.user = {}
        this.$store.commit('LOGOUT')
        this.$router.replace({
          path: '/',
          query: { redirect: this.$router.currentRoute.fullPath }
        })
      }).catch(() => {
        this.user = {}
        this.$store.commit('LOGOUT')
        this.$router.replace({
          path: '/',
          query: { redirect: this.$router.currentRoute.fullPath }
        })
      })
    },
    // 将弹框回复初始状态
    noReloadData () {
      this.showUserMassage = false
    },
    showAlertInfo (severity) {
      this.$router.push({ name: 'alertInquire', query: { severity: severity } })
    },
    preShow (user) {
      if (user.picUrl !== null && user.picUrl !== '') {
        this.axios.post(this.$api.sysManager.getPicBase64 + user.picUrl).then((resp) => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              var prefix = user.picUrl.substring(user.picUrl.lastIndexOf('.') + 1, user.picUrl.length)
              if (prefix === 'jpg') {
                this.imageurl = 'data:image/jpg;base64,' + json.data
              } else if (prefix === 'png') {
                this.imageurl = 'data:image/png;base64,' + json.data
              } else {
                this.imageurl = 'data:image/jpeg;base64,' + json.data
              }
            }
          }
        })
      }
    },
    loopTypeNum () {
      this.getTypeNum()
      this.timer = setInterval(this.getTypeNum, 300000)
    },
    getTypeNum () {
      this.axios.post(this.$api.main.getInformationStatistics).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.typeNum.information = json.data.information < 10 ? json.data.information : '9+'
            this.typeNum.warning = json.data.warning < 10 ? json.data.warning : '9+'
            this.typeNum.average = json.data.average < 10 ? json.data.average : '9+'
            this.typeNum.high = json.data.high < 10 ? json.data.high : '9+'
            this.typeNum.disaster = json.data.disaster < 10 ? json.data.disaster : '9+'
            this.typeNum.notClassified = json.data.not_classified < 10 ? json.data.not_classified : '9+'
          } else {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
          }
        }
      })
    },
    showBiInfo () {
      // this.$store.commit('MINI_SIDEBAR_TOGGLE')
      // this.screenFullToggle(0)
      const routeData = this.$router.resolve({
        name: 'bi_Two_Info'
      })
      window.open(routeData.href, '_blank')
    }
  },
  computed: mapState(['system']),
  beforeDestroy () {
    clearInterval(this.timer)
  }
}
</script>
<style lang="scss">
@import '~@/assets/css/variables.scss';

.body-top {
  width: 100%;
  display: flex;
  height: 50px;
  background-color: mix(#000, $--color-primary, 5%);
  z-index: 10;

  .body-top-btn {
    overflow: hidden;
    height: $--top-height;
    display: inline-block;
    text-align: center;
    line-height: $--top-height;
    cursor: pointer;
    padding: 0 14px;
    color: #fff;

    .badge {
      .el-badge__content {
        margin-top: 10px;
      }
    }

    &:hover {
      background-color: mix(#000, $--color-primary, 10%);
    }
  }

  .body-top-btn-disaster {
    overflow: hidden;
    height: $--top-height;
    display: inline-block;
    text-align: center;
    line-height: $--top-height;
    cursor: pointer;
    padding: 0 14px;
    color: #800000;

    .badge {
      .el-badge__content {
        margin-top: 10px;
      }
    }

    &:hover {
      background-color: mix(#000, $--color-primary, 10%);
    }
  }

  .body-top-btn-high {
    overflow: hidden;
    height: $--top-height;
    display: inline-block;
    text-align: center;
    line-height: $--top-height;
    cursor: pointer;
    padding: 0 14px;
    color: #ff2020;

    .badge {
      .el-badge__content {
        margin-top: 10px;
      }
    }

    &:hover {
      background-color: mix(#000, $--color-primary, 10%);
    }
  }

  .body-top-btn-average {
    overflow: hidden;
    height: $--top-height;
    display: inline-block;
    text-align: center;
    line-height: $--top-height;
    cursor: pointer;
    padding: 0 14px;
    color: #ea7500;

    .badge {
      .el-badge__content {
        margin-top: 10px;
      }
    }

    &:hover {
      background-color: mix(#000, $--color-primary, 10%);
    }
  }

  .body-top-btn-warning {
    overflow: hidden;
    height: $--top-height;
    display: inline-block;
    text-align: center;
    line-height: $--top-height;
    cursor: pointer;
    padding: 0 14px;
    color: #ffd306;

    .badge {
      .el-badge__content {
        margin-top: 10px;
      }
    }

    &:hover {
      background-color: mix(#000, $--color-primary, 10%);
    }
  }

  .body-top-btn-information {
    overflow: hidden;
    height: $--top-height;
    display: inline-block;
    text-align: center;
    line-height: $--top-height;
    cursor: pointer;
    padding: 0 14px;
    color: #81c0c0;

    .badge {
      .el-badge__content {
        margin-top: 10px;
      }
    }

    &:hover {
      background-color: mix(#000, $--color-primary, 10%);
    }
  }

  .body-top-btn-notClassified {
    overflow: hidden;
    height: $--top-height;
    display: inline-block;
    text-align: center;
    line-height: $--top-height;
    cursor: pointer;
    padding: 0 14px;
    color: #8e8e8e;

    .badge {
      .el-badge__content {
        margin-top: 10px;
      }
    }

    &:hover {
      background-color: mix(#000, $--color-primary, 10%);
    }
  }

  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

  .imageStyle {
    padding: 5px 0px 5px 20px;
  }

  .fullToggledisplay {
    display: none;
  }
}
</style>

<style lang="css" scoped>
.prompt_icon {
  float: left;
  width: 13%;
  text-align: center;
}

.prompt_icon li {
  display: inline-block;
  width: 15%;
  height: 22px;
  margin-top: 14px;
  position: relative;
}

.prompt_icon li a {
  display: inline-block;
  position: absolute;
  width: 22px;
  height: 15px;
  right: -6px;
  top: -3px;
  font-size: 12px;
  text-align: left;
  color: #fff;
}

.prompt_purple {
  background: url(~@/assets/img/icon_prompt_purple.png) center no-repeat;
}

.prompt_red {
  background: url(~@/assets/img/icon_prompt_red.png) center no-repeat;
}

.prompt_orange {
  background: url(~@/assets/img/icon_prompt_orange.png) center no-repeat;
}

.prompt_yellow {
  background: url(~@/assets/img/icon_prompt_yellow.png) center no-repeat;
}

.prompt_green {
  background: url(~@/assets/img/icon_prompt_green.png) center no-repeat;
}

.prompt_gray {
  background: url(~@/assets/img/icon_prompt_gray.png) center no-repeat;
}

.open_bi {
  width: 30px;
  background: url(~@/assets/img/icon_open_bi.png) center no-repeat;
  cursor:pointer;
}
</style>
