<template>
    <el-dialog
            @opened="openDialog"
            :width="dialogWidth"
            :title="title"
            :visible.sync="showEditDialog"
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
    >
        <div>
            <ToolBar>
                <el-form
                        :model="userForm"
                        ref="userForm"
                        class="edit-forms fromadd"
                        label-position="right"
                        :label-width="labelWidth"
                        :rules="rules"
                >
                    <el-row>
                        <el-form-item label="用户账号：" prop="username">
                            <el-input  v-model="userForm.username" clearable style="width:95%" :readonly="isReadOnly"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="用户名称：" prop="name">
                                <el-input  v-model="userForm.name" clearable style="width:95%" :readonly="isReadOnly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="工号：" prop="workNo">
                                <el-input  v-model="userForm.workNo" clearable style="width:95%" :readonly="isReadOnly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="部门分配：" prop="department">
                                <el-input  v-model="department" clearable style="width:79%" :readonly="isReadOnly"></el-input>
                                <el-button
                                        type="primary"
                                        icon="el-icon-search"
                                        @click="showDepartment()== true"
                                        :style="{ display: visibleCancel }"
                                >选择
                                </el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="头像：" prop="pic">
                                <el-upload
                                        class="avatar-uploader"
                                        action=""
                                        :show-file-list="false"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="生日：" prop="birth">
                                <el-date-picker
                                        v-model="userForm.birth"
                                        type="date"
                                        placeholder="选择日期" :readonly="isReadOnly">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="性别：" prop="sex">
                                <el-radio v-model="userForm.sex" :label="0" :disabled="disabled">男</el-radio>
                                <el-radio v-model="userForm.sex" :label="1" :disabled="disabled">女</el-radio>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="邮箱：" prop="email">
                                <el-input  v-model="userForm.email" clearable style="width:95%" :readonly="isReadOnly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="手机号：" prop="mobile">
                                <el-input  v-model="userForm.mobile" clearable style="width:95%" :readonly="isReadOnly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="Zabbix用户名：" prop="zabbixUsername">
                                <el-input  v-model="userForm.zabbixUsername" clearable style="width:95%" :readonly="isReadOnly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="Zabbix密码：" prop="zabbixPassword">
                                <el-input  v-model="userForm.zabbixPassword" clearable style="width:95%" show-password :readonly="isReadOnly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="zabbix登录：" prop="isZabbixActive">
                                <el-switch
                                        v-model="userForm.isZabbixActive"
                                        :active-value="1"
                                        :inactive-value="0"
                                        active-color="#13ce66"
                                        :disabled="disabled">
                                </el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="所在省份：" prop="province">
                                <el-input  v-model="userForm.province" clearable style="width:95%" :readonly="isReadOnly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="所在城市：" prop="city">
                                <el-input  v-model="userForm.city" clearable style="width:95%" :readonly="isReadOnly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="现居住地：" prop="liveAddress">
                                <el-input  v-model="userForm.liveAddress" clearable style="width:95%" :readonly="isReadOnly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="爱好：" prop="hobby">
                                <el-input  v-model="userForm.hobby" clearable style="width:95%" :readonly="isReadOnly"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="状态：" prop="status">
                                <el-switch
                                        v-model="userForm.status"
                                        :active-value="1"
                                        :inactive-value="0"
                                        active-color="#13ce66"
                                        :disabled="disabled">
                                </el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </ToolBar>
        </div>
        <chooseDepartment
                :title="titleType"
                :id="userForm.departmentId"
                :showEditDialog="showDepartmentDialog"
                @close="showDepartmentDialog = false"
                @success="reloadData"
        ></chooseDepartment>
        <div slot="footer" class="dialog-footer" >
            <el-button type="primary" @click="submitOrUpdate('userForm')" :style="{ display: visibleCancel }">确认</el-button>
            <el-button @click="closefrom()">取消</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { resetObject } from '@/utils/common'
import chooseDepartment from '@/views/sysManager/userManager/userChooseDepartment.vue'
export default {
  props: {
    titleType: {},
    id: {},
    isReadOnly: {},
    departmentId: {},
    showEditDialog: Boolean,
    dialogWidth: {
      type: String,
      default: '800px'
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
      disabled: false,
      visibleCancel: 'none',
      department: '',
      showDepartmentDialog: false,
      imageUrl: '',
      userForm: {
        username: '',
        name: '',
        workNo: '',
        departmentId: '',
        birth: '',
        sex: 0,
        email: '',
        mobile: '',
        zabbixUsername: '',
        zabbixPassword: '',
        isZabbixActive: 1,
        province: '',
        city: '',
        liveAddress: '',
        hobby: '',
        status: 1
      },
      rules: {
        username: [
          { required: true, message: '请输入账号名称' }
        ],
        name: [
          { required: true, message: '请输入用户名称' }
        ],
        workNo: [
          { required: true, message: '请输入工号' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        mobile: [
          {
            pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
            message: '手机号格式不对',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    reloadData (e) {
      this.userForm.departmentId = e.id
      this.department = e.label
    },
    showDepartment () {
      this.showDepartmentDialog = true
    },
    openDialog () {
      if (this.isReadOnly === true) {
        this.visibleCancel = 'none'
        this.disabled = true
      } else {
        this.visibleCancel = ''
      }
      if (this.id !== -1) {
        this.axios
          .post('/sys/user/findUserById/' + this.id)
          .then(resp => {
            if (resp.status === 200) {
              var json = resp.data
              if (json.code === 1) {
                this.userForm = json.data
                const id = this.userForm.departmentId
                if (id !== undefined && id !== '' && id !== null) {
                  this.axios.get('/sys/department/getDepartment/' + id).then((resp) => {
                    if (resp.status === 200) {
                      const json = resp.data
                      if (json.code === 1) {
                        this.department = json.data.departName
                      } else {
                        this.$message({
                          message: '获取部门信息失败！',
                          type: 'error'
                        })
                      }
                    } else {
                      this.$message({
                        message: '获取部门信息失败！',
                        type: 'error'
                      })
                    }
                  })
                }
              }
            }
          })
      }
    },
    closefrom () {
      this.clearform()
      this.$emit('close')
    },
    clearform () {
      // this.id = {}
      this.department = ''
      // this.isReadOnly = false
      // this.disabled = false
      // this.visibleCancel = 'none'
      resetObject(this.userForm)
      this.$refs.userForm.resetFields()
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
      this.axios.post('/sys/user/addUser', this.userForm).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.closefrom()
            this.$emit('success')
          }
        } else {
          this.$message({
            message: '添加失败',
            type: 'error'
          })
          this.closefrom()
          this.$emit('error')
        }
      })
    },
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  },
  components: { chooseDepartment }
}
</script>
<style>
    .fromadd {
        width: 100%;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
