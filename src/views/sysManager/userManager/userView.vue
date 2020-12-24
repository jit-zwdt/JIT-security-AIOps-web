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
                >
                    <el-row>
                        <el-col>
                            <el-form-item label="头像：" prop="picUrl">
                                <img v-if="userForm.picUrl" :src="url" class="avatar">
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="用户账号：" prop="username">{{userForm.username}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="用户名称：" prop="name">{{userForm.name}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="工号：" prop="workNo">{{userForm.workNo}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="部门：" prop="department">{{department}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="生日：" prop="birth">
                                <span v-if="userForm.birth !== null&&userForm.sex !== ''">{{userForm.birth.substring(0,userForm.birth.indexOf('T'))}}</span>
                                <span v-else></span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="性别：" prop="sex">
                                <span v-if="userForm.sex===1">女</span>
                                <span v-else>男</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="邮箱：" prop="email">{{userForm.email}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="手机号：" prop="mobile">{{userForm.mobile}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!--<el-row>
                        <el-col :span="12">
                            <el-form-item label="Zabbix用户名：" prop="zabbixUsername">{{userForm.zabbixUsername}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="Zabbix密码：" prop="zabbixPassword">{{userForm.zabbixPassword}}
                            </el-form-item>
                        </el-col>
                    </el-row>-->
                    <el-row>
                        <!--<el-col :span="12">
                            <el-form-item label="zabbix登录：" prop="isZabbixActive">
                                <span v-if="userForm.isZabbixActive===1">正常</span>
                                <span v-else>禁用</span>
                            </el-form-item>
                        </el-col>-->
                        <el-col :span="12">
                            <el-form-item label="状态：" prop="status">
                                <span v-if="userForm.status===1">正常</span>
                                <span v-else>禁用</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="所在省份：" prop="province">{{userForm.province}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="所在城市：" prop="city">{{userForm.city}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="现居住地：" prop="liveAddress">{{userForm.liveAddress}}
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="爱好：" prop="hobby">{{userForm.hobby}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </ToolBar>
        </div>
        <div slot="footer" class="dialog-footer" >
            <el-button @click="closefrom()">取消</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { resetObject } from '@/utils/common'
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
      width: 'width:84%',
      department: '',
      imageUrl: '',
      userForm: {
        password: '',
        username: '',
        name: '',
        workNo: '',
        departmentId: '',
        birth: '',
        sex: 0,
        email: '',
        mobile: '',
        /* zabbixUsername: '',
        zabbixPassword: '',
        isZabbixActive: 1, */
        province: '',
        city: '',
        liveAddress: '',
        hobby: '',
        status: 1,
        picUrl: ''
      },
      url: ''
    }
  },
  methods: {
    reloadData (e) {
      this.userForm.departmentId = e.id
      this.department = e.label
    },
    async openDialog () {
      await this.axios.post(this.$api.sysManager.getUserById + this.id).then(resp => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.userForm = json.data
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
      if (this.userForm.picUrl !== null && this.userForm.picUrl !== '') {
        this.axios.post(this.$api.sysManager.getPicBase64 + this.userForm.picUrl).then((resp) => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              var prefix = this.userForm.picUrl.substring(this.userForm.picUrl.lastIndexOf('.') + 1, this.userForm.picUrl.length)
              if (prefix === 'jpg') {
                this.url = 'data:image/jpg;base64,' + json.data
              } else if (prefix === 'png') {
                this.url = 'data:image/png;base64,' + json.data
              } else {
                this.url = 'data:image/jpeg;base64,' + json.data
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
      this.width = 'width:84%'
      this.department = ''
      resetObject(this.userForm)
      this.$refs.userForm.resetFields()
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
  }
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
