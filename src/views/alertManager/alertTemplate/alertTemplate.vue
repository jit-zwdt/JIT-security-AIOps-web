<template>
  <el-dialog
    @opened="openDialog"
    :width="dialogWidth"
    :title="title"
    :visible.sync="showEditDialog"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <div>
      <ToolBar>
        <el-form
          :model="tempform"
          ref="tempform"
          class="edit-forms fromadd"
          label-position="right"
          :label-width="labelWidth"
          :disabled="!editform.buttonflag"
          :rules="rules"
        >
          <el-row :gutter="40">
            <el-col :span="100">
              <el-form-item label="监控模版：" prop="templates">
                <el-select
                  v-model="tempform.templates"
                  placeholder="请选择"
                  multiple
                  clearable
                  filterable
                  class="selectSize"
                  @visible-change="setSelectedVal"
                  @change="checkItem"
                >
                  <el-option
                    v-for="template in templateData"
                    :key="template.templateid"
                    :label="template.name"
                    :value="template.templateid"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </ToolBar>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closefrom()">取消</el-button>
      <el-button type="primary" @click="submitOrUpdate('tempform')" v-if="editform.buttonflag">确认</el-button>
    </div>
  </el-dialog>
</template>
<script>
import api from '@/api/api'
export default {
  props: {
    editform: {
      id: '',
      templates: ''
    },
    showEditDialog: Boolean,
    dialogWidth: {
      type: String,
      default: '800px'
    },
    title: {
      type: String,
      default: '监控模版'
    },
    labelWidth: {
      type: String,
      default: '120px'
    }
  },
  data () {
    return {
      loading: true,
      showfooter: true,
      tempform: {
        templates: ''
      },
      rules: {
        templates: [
          { required: true, message: '请选择监控模版' }
        ]
      },
      templateData: [],
      tempTemplates: ''
    }
  },
  methods: {
    openDialog () {
      this.getTemplates()
      this.setExitSelect()
    },
    closefrom () {
      this.clearform()
      this.$emit('close')
    },
    clearform () {
      this.$refs.tempform.resetFields()
    },
    submitOrUpdate (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit()
        } else {
          return false
        }
      })
    },
    submit () {
      const param = new URLSearchParams()
      param.append('id', this.editform.id)
      param.append('templates', this.tempform.templates)
      this.axios.post(api.alertManager.alertTemplate.alertTemplate.updateTemplates, param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.clearform()
            this.$emit('success')
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
    },
    getTemplates () {
      this.axios.post(api.alertManager.alertTemplate.alertTemplate.getZabbixTemplates).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.templateData = json.data
          }
        } else {
          this.$message({
            message: '获取模版信息失败',
            type: 'error'
          })
          this.clearform()
          this.$emit('error')
        }
      })
    },
    setExitSelect () {
      if (this.editform.templates !== null && this.editform.templates !== '') {
        this.tempform.templates = this.editform.templates.split(',')
      }
    },
    checkItem (value) {
      const param = new URLSearchParams()
      param.append('templates', value)
      this.axios.post(api.alertManager.alertTemplate.alertTemplate.checkItems, param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            if (json.data === 'success') {
              this.tempTemplates = value
            } else {
              this.tempform.templates = this.tempTemplates
              this.$message({
                message: json.data,
                type: 'error'
              })
            }
          }
        } else {
          this.$message({
            message: '获取模版信息失败',
            type: 'error'
          })
        }
      })
    },
    setSelectedVal (value) {
      this.tempTemplates = this.tempform.templates
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.selectSize {
  width: 600px !important;
}
</style>
