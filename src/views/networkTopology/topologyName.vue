<template>
  <el-dialog
    @opened="openDialog"
    :width="dialogWidth"
    :title="title"
    :visible.sync="showNameDialog"
    :before-close="handleclosebind"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <div>
      <ToolBar>
        <el-form
          :model="serverListForm"
          ref="serverListForm"
          class="edit-forms fromadd"
          label-position="right"
          :label-width="labelWidth"
          :rules="rules"
        >
          <el-row :gutter="40">
            <el-col :span="24">
              <el-form-item label="拓扑图名称：" prop="name">
                <el-input v-model="serverListForm.name" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </ToolBar>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="closefrom('serverListForm')">提交</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    showNameform: {
      name: ''
    },
    showNameDialog: Boolean,
    dialogWidth: {
      type: String,
      default: '800px'
    },
    title: {
      type: String,
      default: '拓扑图名称'
    },
    labelWidth: {
      type: String,
      default: '120px'
    }
  },
  data () {
    return {
      show: false,
      serverListForm: {
        name: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入拓扑图名称' }
        ]
      },
      handleclosebind () {
        this.$parent.$parent.noReloadDataName()
      }
    }
  },
  methods: {
    openDialog () {
      this.serverListForm.name = this.showNameform.name
    },
    closefrom (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('success', this.serverListForm.name)
          this.serverListForm.name = ''
        } else {
          return false
        }
      })
    }
  },
  actions: {
  },
  components: {}
}
</script>
<style lang="scss" scoped>
.queryleft {
  float: left;
}
.queryright {
  float: right;
}
</style>
