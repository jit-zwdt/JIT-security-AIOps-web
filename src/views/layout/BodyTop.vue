<template>
  <div class="body-top">
    <div class="body-top-btn" @click="hiddenSidebar">
      <i class="el-icon-menu"></i>
    </div>
    <div class="right">
      <span class="body-top-btn-disaster" @click="showAlertInfo(5)">
        <el-tooltip
          class="item"
          effect="dark"
          content="灾难"
          placement="bottom-start"
        >
          <el-badge is-dot class="badge">
            <i class="el-icon-message-solid"></i>
          </el-badge>
        </el-tooltip>
      </span>
      <span class="body-top-btn-high" @click="showAlertInfo(4)">
        <el-tooltip
          class="item"
          effect="dark"
          content="严重"
          placement="bottom-start"
        >
          <el-badge is-dot class="badge">
            <i class="el-icon-message-solid"></i>
          </el-badge>
        </el-tooltip>
      </span>
      <span class="body-top-btn-average" @click="showAlertInfo(3)">
        <el-tooltip
          class="item"
          effect="dark"
          content="一般严重"
          placement="bottom-start"
        >
          <el-badge is-dot class="badge">
            <i class="el-icon-message-solid"></i>
          </el-badge>
        </el-tooltip>
      </span>
      <span class="body-top-btn-warning" @click="showAlertInfo(2)">
        <el-tooltip
          class="item"
          effect="dark"
          content="警告"
          placement="bottom-start"
        >
          <el-badge is-dot class="badge">
            <i class="el-icon-message-solid"></i>
          </el-badge>
        </el-tooltip>
      </span>
      <span class="body-top-btn-information" @click="showAlertInfo(1)">
        <el-tooltip
          class="item"
          effect="dark"
          content="信息"
          placement="bottom-start"
        >
          <el-badge is-dot class="badge">
            <i class="el-icon-message-solid"></i>
          </el-badge>
        </el-tooltip>
      </span>
      <span class="body-top-btn-notClassified" @click="showAlertInfo(0)">
        <el-tooltip
          class="item"
          effect="dark"
          content="未分类"
          placement="bottom-start"
        >
          <el-badge is-dot class="badge">
            <i class="el-icon-message-solid"></i>
          </el-badge>
        </el-tooltip>
      </span>
      <span class="body-top-btn" @click="screenFullToggle">
        <i class="fa fa-arrows-alt"></i>
      </span>
      <!-- <el-dropdown>
        <span class="body-top-btn">
          <i class="el-icon-setting"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <div style="padding: 10px 20px;text-align: center;">
            导航类型：
            <el-button-group>
              <el-button
                :type="system.navType === item.value ? 'primary' : ''"
                size="mini"
                v-for="item in GlobalCfg.systemNavType"
                :key="item.value"
                @click="$store.commit('NAV_TYPE_TOGGLE', item.value)"
              >{{ item.label }}</el-button>
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
      user: {},
      showUserMassage: false,
      imageurl: ''
    }
  },
  // 添加组件
  components: {
    UserMassage
  },
  created () {
    this.axios.get(this.$api.sysManager.getUserInfo).then(resp => {
      var json = resp.data
      if (json.code === 1) {
        this.user = json.data
        this.preShow(json.data)
      }
    })
  },
  methods: {
    hiddenSidebar () {
      this.$store.commit('HIDE_SIDEBAR_TOGGLE')
    },
    screenFullToggle () {
      this.$store.commit('HIDE_SIDEBAR_TOGGLE')
      ScreenFull.toggle()
        .then(() => { })
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
    }
  },
  computed: mapState(['system'])
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
}
</style>
