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
              <el-form-item label="角色名称：" prop="roleName">
                <el-input v-model="form.roleName" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="角色标识：" prop="roleSign">
                <el-input v-model="form.roleSign" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注：" prop="remark">
                <el-input v-model="form.remark" type="textarea" clearable></el-input>
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
import { isRoleNameExisted, isRoleSignExisted } from './validator.js'

export default {
  props: {
    showEditDialog: Boolean,
    requestData: {
      id: String
    },
    dialogWidth: {
      type: String,
      default: '500px'
    },
    title: {
      type: String,
      default: '添加角色'
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
        roleName: '',
        roleSign: '',
        remark: ''
      },
      rules: {
        roleName: [
          { required: true, message: '请填写角色名称' }, {
            validator: isRoleNameExisted,
            trigger: 'blur',
            extend: ''// 自定义字段
          }
        ],
        roleSign: [
          { required: true, message: '请填写角色标识' }, {
            validator: isRoleSignExisted,
            trigger: 'blur',
            extend: ''// 自定义字段
          }
        ]
      }
    }
  },
  methods: {
    openDialog () {
      const id = this.requestData.id
      if (id !== undefined && id !== '') {
        this.axios.get(this.$api.sysManager.getRole + id).then((resp) => {
          if (resp.status === 200) {
            const json = resp.data
            if (json.code === 1) {
              this.form = json.data
              this.rules.roleName[1].extend = json.data.roleName
              this.rules.roleSign[1].extend = json.data.roleSign
            } else {
              this.$message({
                message: '获取角色信息失败！',
                type: 'error'
              })
            }
          } else {
            this.$message({
              message: '获取角色信息失败！',
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
      this.rules.roleName[1].extend = ''
      this.rules.roleSign[1].extend = ''
      for (var key in this.requestData) {
        delete this.requestData[key]
      }
      this.$refs.form.resetFields()
      this.form.id = ''
      this.requestData.id = ''
    },
    submitOrUpdate () {
      this.isDisable = true
      this.$refs.form.validate((valid) => {
        if (valid) {
          const id = this.requestData.id
          this.axios.post(id !== undefined && id !== '' ? this.$api.sysManager.updateRole : this.$api.sysManager.addRole, this.form).then((resp) => {
            if (resp.status === 200) {
              var json = resp.data
              if (json.code === 1) {
                this.$message({
                  message: '操作成功',
                  type: 'success'
                })
                this.$emit('success')
                this.closefrom()
              }
            } else {
              this.$message({
                message: '操作失败',
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
