<template>
  <el-dialog
      @opened="openDialog"
      :width="dialogWidth"
      :title="title"
      :visible.sync="showEditDialog"
      :before-close="closefrom"
      :show-close="false"
      :close-on-click-modal="false"
  >
    <div>
      <ToolBar>
        <el-form
            :model="form"
            ref="form"
            class="edit-forms fromadd"
            label-position="right"
            :label-width="labelWidth"
            :disabled="false"
            :rules="rules"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="任务类名：" prop="jobClassName">
                <el-input v-model="form.jobClassName" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="任务方法名：" prop="jobMethodName">
                <el-input v-model="form.jobMethodName" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="cron表达式：" prop="cronExpression">
                <el-input v-model="form.cronExpression" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="传递参数（json串格式）：" prop="jsonParam">
                <el-input v-model="form.jsonParam" type="textarea" :autosize="{ minRows: 3}" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="分组：" prop="jobGroup">
                <el-input v-model="form.jobGroup" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态：" prop="status">
                <el-switch
                    class="switchStyle"
                    v-model="form.status"
                    :active-value=0
                    active-text="正常"
                    :inactive-value=1
                    inactive-text="停止"
                ></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注：" prop="description">
                <el-input v-model="form.description" type="textarea" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </ToolBar>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closefrom()">取消</el-button>
      <el-button type="primary" @click="submitOrUpdate()" :disabled="isDisable">保存</el-button>
    </div>
  </el-dialog>
</template>
<script>

export default {
  props: {
    showEditDialog: Boolean,
    requestData: {
      id: String
    },
    dialogWidth: {
      type: String,
      default: '600px'
    },
    title: {
      type: String,
      default: '添加任务'
    },
    labelWidth: {
      type: String,
      default: '125px'
    }
  },
  data () {
    return {
      loading: true,
      showfooter: true,
      isDisable: false,
      form: {
        id: '',
        jobClassName: '',
        jobMethodName: '',
        cronExpression: '',
        jsonParam: '',
        jobGroup: '',
        status: '',
        description: ''
      },
      rules: {
        jobClassName: [
          { required: true, message: '请填写任务类名' }
        ],
        jobMethodName: [
          { required: true, message: '请填写任务方法名' }
        ],
        cronExpression: [
          { required: true, message: '请填写cron表达式' }
        ]
      }
    }
  },
  methods: {
    openDialog () {
      const id = this.requestData.id
      if (id !== undefined && id !== '') {
        this.axios.get(this.$api.sysManager.getScheduleTask + id).then((resp) => {
          if (resp.status === 200) {
            const json = resp.data
            if (json.code === 1) {
              this.form = json.data
            } else {
              this.$message({
                message: '获取任务信息失败！',
                type: 'error'
              })
            }
          } else {
            this.$message({
              message: '获取任务信息失败！',
              type: 'error'
            })
          }
        })
      }
    },
    closefrom () {
      this.clearform()
      this.$emit('close')
      this.isDisable = false
    },
    clearform () {
      this.$refs.form.resetFields()
      this.form.id = ''
      this.requestData.id = ''
    },
    submitOrUpdate () {
      this.isDisable = true
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.axios.post(this.$api.sysManager.addScheduleTask, this.form).then((resp) => {
            if (resp.status === 200) {
              var json = resp.data
              if (json.code === 1) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.$emit('success')
                this.closefrom()
              } else {
                this.$message({
                  message: json.msg,
                  type: 'error'
                })
                this.isDisable = false
                return false
              }
            } else {
              this.$message({
                message: '修改失败',
                type: 'error'
              })
              this.clearform()
              this.$emit('error')
            }
          })
        } else {
          this.isDisable = false
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  /deep/ .switchStyle .el-switch__label {
    position: absolute;
    display: none;
    color: #fff;
  }

  /deep/ .switchStyle .el-switch__label--left {
    z-index: 1;
    left: 25px;
  }

  /deep/ .switchStyle .el-switch__label--right {
    z-index: 1;
    right: -10px;
  }

  /deep/ .switchStyle .el-switch__label.is-active {
    display: block;
  }

  /deep/ .switchStyle.el-switch .el-switch__core,
  /deep/ .el-switch .el-switch__label {
    width: 60px !important;
  }
</style>
