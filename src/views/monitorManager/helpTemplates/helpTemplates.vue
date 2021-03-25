<template>
  <el-dialog
    @opened="openDialog"
    :width="dialogWidth"
    :visible.sync="showhelpDialog"
    :before-close="handleclosebind"
    :show-close="true"
    :close-on-click-modal="true"
  >
    <div class="temptop">
      <el-image
      style="max-width: 180px; max-height: 120px;margin-top:7px"
      :src="helpform.imgurl"
      ></el-image>
    </div>
    <div>
      <span class="tempname">{{helpform.name}}</span>
    </div>
    <div class="tempData">
      <iframe
        name="mainFrame"
        id="mainFrame"
        :src="onUrl"
        width="840"
        height="580"
        frameborder="0"
        min-height="350px"
        scrolling="yes"
        style="position:related;top: 2.8px;left: 0px;"
      ></iframe>
      <!-- <p v-html="html"></p> -->
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    helpform: {
      url: '',
      name: '',
      imgurl: ''
    },
    showhelpDialog: Boolean,
    dialogWidth: {
      type: String,
      default: '900px'
    },
    title: {
      type: String,
      default: '信息添加'
    },
    labelWidth: {
      type: String,
      default: '120px'
    }
  },
  data () {
    return {
      onUrl: '',
      handleclosebind () {
        var iframe = document.getElementById('mainFrame')
        try {
          iframe.contentWindow.document.write('')
          iframe.contentWindow.document.clear()
        } catch (e) { }
        this.$parent.$parent.noReloadData()
      }
    }
  },
  methods: {
    openDialog () {
      this.load(this.helpform.url)
    },
    load (url) {
      this.onUrl = url
    }
  }
}
</script>
<style scoped>
.temptop {
  width: 205px;
  height: 130px;
  float: left;
  border: 1px solid #ebeef5;
  text-align: center;
  margin-top: -40px;
}
.tempname {
  font-size: 24px;
  margin-left: 20px;
}
.tempData {
  margin-top: 70px;
}
</style>
