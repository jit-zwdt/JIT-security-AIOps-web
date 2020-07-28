<template>
  <el-dialog
    @opened="openDialog"
    :width="dialogWidth"
    :title="title"
    :visible.sync="chooseItemsDialog"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <div>
      <ToolBar>
      </ToolBar>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closefrom()">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    chooseItemsDialog: Boolean,
    dialogWidth: {
      type: String,
      default: '800px'
    },
    title: {
      type: String,
      default: '条件'
    },
    labelWidth: {
      type: String,
      default: '120px'
    }
  },
  data () {
    return {
      functionvalue: '0',
      resultvalue: '=',
      serverForm: {
        name: '',
        function: ''
      },
      functionvalueStatus: [{
        value: '0',
        label: 'last() - 最后（最近）的 T 值'
      }, {
        value: '1',
        label: 'max() - 周期 T 内的最大值'
      }],
      resultStatus: [{
        value: '=',
        label: '='
      }, {
        value: '<>',
        label: '<>'
      }],
      rules: {
        name: [{
          required: true,
          message: '请输入监控项',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    openDialog () {
    },
    closefrom () {
      // this.showfooter = true
      this.clearform()
      this.$emit('close')
    },
    clearform () {
      // resetObject(this.serverListForm)
      // this.$refs.serverListForm.resetFields()
    },
    submit () {
    },
    showInfo () {
    }
  }
}
</script>
<style lang="scss" scoped>
.fromadd {
  width: 100%;
}
.queryleft {
  float: left;
}
.queryright {
  float: right;
}
.selectfunction {
  width: 100%;
}
</style>
