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
            <el-col>
              <el-form-item label="头像：" prop="picUrl">
                <el-upload
                  class="avatar-uploader"
                  :action="$api.sysManager.uploadPic"
                  :headers="getHeaders"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <div v-if="userForm.picUrl">
                    <img :src="image" class="avatar" />
                  </div>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="用户账号：" prop="username">
                <el-input
                  v-model="userForm.username"
                  clearable
                  style="width:98%"
                  :readonly="isReadOnly"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col v-if="isShow">
              <el-form-item label="密码：" prop="password">
                <el-input
                  v-model="userForm.password"
                  clearable
                  style="width:98%"
                  :readonly="isReadOnly"
                  show-password
                  auto-complete="new-password"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="工号：" prop="workNo">
                <el-input
                  v-model="userForm.workNo"
                  clearable
                  style="width:98%"
                  :readonly="isReadOnly"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户名称：" prop="name">
                <el-input
                  v-model="userForm.name"
                  clearable
                  style="width:95%"
                  :readonly="isReadOnly"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="部门分配：" prop="department">
                <el-input v-model="department" clearable :style="width" readonly id="department"></el-input>
                <el-button
                  style="margin-left: 0px"
                  type="primary"
                  icon="el-icon-search"
                  @click="showDepartment()== true"
                  :style="{ display: visibleCancel }"
                >选择</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="生日：" prop="birth">
                <el-date-picker
                  v-model="userForm.birth"
                  type="date"
                  placeholder="选择日期"
                  :readonly="isReadOnly"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别：" prop="sex">
                <el-radio v-model="userForm.sex" :label="0" :disabled="disabled">男</el-radio>
                <el-radio v-model="userForm.sex" :label="1" :disabled="disabled">女</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="邮箱：" prop="email">
                <el-input
                  v-model="userForm.email"
                  clearable
                  style="width:95%"
                  :readonly="isReadOnly"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号：" prop="mobile">
                <el-input
                  v-model="userForm.mobile"
                  clearable
                  style="width:95%"
                  :readonly="isReadOnly"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="Zabbix用户名：" prop="zabbixUsername">
                <el-input
                  v-model="userForm.zabbixUsername"
                  clearable
                  style="width:95%"
                  :readonly="isReadOnly"
                  auto-complete="new-accounts"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Zabbix密码：" prop="zabbixPassword">
                <el-input
                  v-model="userForm.zabbixPassword"
                  clearable
                  style="width:95%"
                  show-password
                  :readonly="isReadOnly"
                  auto-complete="new-password"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="zabbix登录：" prop="isZabbixActive">
                <el-switch
                  class="switchStyle1"
                  v-model="userForm.isZabbixActive"
                  :active-value="1"
                  active-text="是"
                  :inactive-value="0"
                  inactive-text="否"
                  :disabled="disabled"
                ></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态：" prop="status">
                <el-switch
                  class="switchStyle"
                  v-model="userForm.status"
                  :active-value="1"
                  active-text="正常"
                  :inactive-value="0"
                  inactive-text="禁用"
                  :disabled="disabled"
                ></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="所在省份：" prop="province">
                <el-input
                  v-model="userForm.province"
                  clearable
                  style="width:95%"
                  :readonly="isReadOnly"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所在城市：" prop="city">
                <el-input
                  v-model="userForm.city"
                  clearable
                  style="width:95%"
                  :readonly="isReadOnly"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="现居住地：" prop="liveAddress">
                <el-input
                  v-model="userForm.liveAddress"
                  clearable
                  style="width:95%"
                  :readonly="isReadOnly"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="爱好：" prop="hobby">
                <el-input
                  v-model="userForm.hobby"
                  clearable
                  style="width:95%"
                  :readonly="isReadOnly"
                ></el-input>
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
    <div slot="footer" class="dialog-footer">
      <el-button
        type="primary"
        @click="submitOrUpdate('userForm')"
        :style="{ display: visibleCancel }"
      >确认</el-button>
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
    var isUserNameExisted = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('用户账号不可以为空'))
      }
      if (rule.uname !== value) {
        setTimeout(() => {
          this.axios.get(this.$api.sysManager.checkUserName + value).then((resp) => {
            if (resp.status === 200) {
              const json = resp.data
              if (json.code === 1) {
                if (json.data === true) {
                  callback(new Error('用户账号已存在！'))
                } else {
                  callback()
                }
              } else {
                callback(new Error('用户账号校验失败！'))
              }
            } else {
              callback(new Error('用户账号校验失败！'))
            }
          })
        }, 0)
      } else {
        callback()
      }
    }
    return {
      isShow: false,
      width: 'width:84%',
      disabled: false,
      visibleCancel: 'none',
      department: '',
      showDepartmentDialog: false,
      getHeaders: {
        Accept: 'application/json',
        Authorization: sessionStorage.getItem('token')
      },
      image: '',
      userForm: {
        picUrl: '',
        password: '',
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
          { required: true, validator: isUserNameExisted, uname: '' }
        ],
        name: [
          { required: true, message: '用户名称不可以为空' }
        ],
        password: [
          { required: true, message: '密码不可以为空' }
        ],
        workNo: [
          { required: true, message: '工号不可以为空' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        mobile: [
          {
            pattern: /^1[0-9]{10}$/,
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
        this.width = 'width:98%'
      } else {
        this.visibleCancel = ''
      }
      if (this.id !== -1) {
        this.axios
          .post(this.$api.sysManager.findUserById + this.id)
          .then(resp => {
            if (resp.status === 200) {
              var json = resp.data
              if (json.code === 1) {
                this.userForm = json.data
                if (this.userForm.picUrl !== null && this.userForm.picUrl !== '') {
                  this.axios.post(this.$api.sysManager.getPicBase64 + this.userForm.picUrl).then((resp) => {
                    if (resp.status === 200) {
                      var json = resp.data
                      if (json.code === 1) {
                        var prefix = this.userForm.picUrl.substring(this.userForm.picUrl.lastIndexOf('.') + 1, this.userForm.picUrl.length)
                        if (prefix === 'jpg') {
                          this.image = 'data:image/jpg;base64,' + json.data
                        } else if (prefix === 'png') {
                          this.image = 'data:image/png;base64,' + json.data
                        } else {
                          this.image = 'data:image/jpeg;base64,' + json.data
                        }
                      }
                    }
                  })
                }
                this.rules.username[0].uname = json.data.username
                const id = this.userForm.departmentId
                if (id !== undefined && id !== '' && id !== null) {
                  this.axios.get(this.$api.sysManager.getDepartment + id).then((resp) => {
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
      } else {
        this.isShow = true
      }
    },
    closefrom () {
      this.clearform()
      this.$emit('close')
    },
    clearform () {
      // this.id = {}
      this.image = ''
      this.width = 'width:84%'
      this.department = ''
      this.disabled = false
      this.visibleCancel = 'none'
      this.isShow = false
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
      this.axios.post(this.$api.sysManager.addUser, this.userForm).then((resp) => {
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
      this.userForm.picUrl = res.data
      console.log('123:' + this.userForm.picUrl)
      this.axios.post(this.$api.sysManager.getPicBase64 + this.userForm.picUrl).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            var prefix = this.userForm.picUrl.substring(this.userForm.picUrl.lastIndexOf('.'), this.userForm.picUrl.length)
            if (prefix === 'jpg') {
              this.image = 'data:image/jpg;base64,' + json.data
            } else if (prefix === 'png') {
              this.image = 'data:image/png;base64,' + json.data
            } else {
              this.image = 'data:image/jpeg;base64,' + json.data
            }
          }
        }
      })
    },
    beforeAvatarUpload (file) {
      const isJPEG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isJPG = file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (isJPG === false && isJPEG === false && isPNG === false) {
        this.$message.error('上传头像图片只能是 JPG、PNG、JPEG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return !(isJPG === false && isJPEG === false && isPNG === false) && isLt2M
    }
  },
  components: { chooseDepartment }
}
</script>

<style lang="scss" scoped>
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
  border-color: #409eff;
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
/deep/ .switchStyle .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
}
/deep/ .switchStyle .el-switch__label--left {
  width: 28px;
  z-index: 1;
  left: 21px;
}
/deep/ .switchStyle .el-switch__label--right {
  width: 28px;
  z-index: 1;
  right: 0px;
}
/deep/ .switchStyle .el-switch__label.is-active {
  display: block;
}
/deep/ .switchStyle.el-switch .el-switch__core,
.el-switch .el-switch__label {
  width: 55px !important;
}
/deep/ .switchStyle1 .el-switch__label {
  position: absolute;
  display: none;
  color: #fff;
}
/deep/ .switchStyle1 .el-switch__label--left {
  width: 28px;
  z-index: 1;
  left: 20px;
}
/deep/ .switchStyle1 .el-switch__label--right {
  width: 28px;
  z-index: 1;
  right: -15px;
}
/deep/ .switchStyle1 .el-switch__label.is-active {
  display: block;
}
/deep/ .switchStyle1 .el-switch .el-switch__core,
/deep/ .el-switch .el-switch__label {
  width: 50px !important;
}
</style>
