<template>
  <el-drawer :title="title" :visible.sync="showMenuMassage" size="40%" :direction="direction" @open="preOpen" :before-close="handleClose">
    <div id="outDiv">
      <el-row :gutter="30">
        <el-col :span="5" class="textAlign">
          <span>菜单类型:</span>
        </el-col>
        <el-col :push="1" :span="6">
          <span v-if="menu.parentId === '0'">一级菜单</span>
          <span v-else>子菜单</span>
        </el-col>
        <el-col v-if="menu.parentId !== '0'" :span="5" class="textAlign">
          <span>父级菜单:</span>
        </el-col>
        <el-col v-if="menu.parentId !== '0'" :push="1" :span="6">
          <span>{{ partentMenu.title }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="5" class="textAlign">
          <span>菜单名称:</span>
        </el-col>
        <el-col :push="1" :span="6">
          <span>{{ menu.title }}</span>
        </el-col>
        <el-col :span="5" class="textAlign">
          <span>组件名称:</span>
        </el-col>
        <el-col :push="1" :span="6">
          <span>{{ menu.name }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="5" class="textAlign">
          <span>菜单路径:</span>
        </el-col>
        <el-col :push="1" :span="6">
          <span>{{ menu.path }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="5" class="textAlign">
          <span>组件路径:</span>
        </el-col>
        <el-col :push="1" :span="18">
          <span>{{ menu.component }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="5" class="textAlign">
          <span>是否显示:</span>
        </el-col>
        <el-col :push="1" :span="6">
          <span v-if="menu.isShow == 0">显示</span>
          <span v-if="menu.isShow == 1">隐藏</span>
        </el-col>
        <el-col :span="5" class="textAlign">
          <span>是否路由菜单:</span>
        </el-col>
        <el-col :push="1" :span="6">
          <span v-if="menu.isRoute === 0">是</span>
          <span v-if="menu.isRoute === 1">否</span>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="5" class="textAlign">
          <span>菜单图标:</span>
        </el-col>
        <el-col :push="1" :span="6">
          <span v-if="menu.icon === ''">无</span>
          <span v-else><i :class="menu.icon"></i></span>
        </el-col>
        <el-col :span="5" class="textAlign">
          <span>默认跳转地址:</span>
        </el-col>
        <el-col :push="1" :span="6">
          <span v-if="menu.redirect === ''">无</span>
          <span v-else>{{ menu.redirect }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="5" class="textAlign">
          <span>排序数:</span>
        </el-col>
        <el-col :push="1" :span="6">
          <span>{{ menu.orderNum }}</span>
        </el-col>
      </el-row>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'menuMessage',
  props: {
    showMenuMassage: Boolean,
    menuId: String
  },
  data () {
    return {
      // 菜单的详细信息数据
      menu: {},
      // 父级菜单的信息数据
      partentMenu: {},
      // 抽屉的标题
      title: '详细信息',
      // 抽屉从哪里打开
      direction: 'rtl'
    }
  },
  methods: {
    // 打开抽屉的时候执行的方法
    async preOpen () {
      await this.axios.post(this.$api.sysManager.findBySysMenu + this.menuId).then(resp => {
        var json = resp.data
        if (json.code === 1) {
          this.menu = json.data
        }
      })

      if (this.menu.parentId !== '0') {
        // 根据 父级菜单 查询父级菜单的数据
        this.axios.post(this.$api.sysManager.findBySysMenu + this.menu.parentId).then(resp => {
          var json = resp.data
          if (json.code === 1) {
            this.partentMenu = json.data
          }
        })
      }
    },
    // 关闭抽屉的时候执行的方法
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.menu = {}
          this.$emit('close')
        })
        .catch(_ => { })
    }
  }
}
</script>

<style lang="scss" scoped>
  // 中间的 Div 的样式 做到统一
  #outDiv {
    border-top: 1px solid #e6ebf5;
    padding-top: 20px;
    padding-bottom: 20px;
    color: #626468;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    font-size: 1e;
    font-weight: 400;
    line-height: 7.0;
  }
  // 把文字向右对齐
  .textAlign {
    text-align: right;
  }
</style>
