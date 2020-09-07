<template>
  <!-- 显示用户信息的 Dialong -->
  <el-dialog
          title="用户中心"
          :width="dialogWidth"
          :visible.sync="showUserMassage"
          @opened="preShow"
          :before-close="handleclosebind"
          :show-close="true"
          :close-on-click-modal="false">
      <div>
              <el-row :gutter="30">
                  <el-col :span="8" :push="4">
                      <span>头像：</span>
                  </el-col>
                  <el-col :span="16">
                      <img v-if="user.picUrl" :src="url" class="avatar" style=" height:100px;width:100px">
                  </el-col>
              </el-row>
              <el-row :gutter="30">
                  <el-col :span="8" :push="4">
                      <span>姓名：</span>
                  </el-col>
                  <el-col :span="16">
                      <span>{{ user.name }}</span>
                  </el-col>
              </el-row>
              <el-row :gutter="30">
                  <el-col :span="8" :push="4">
                      <span>部门：</span>
                  </el-col>
                  <el-col :span="16">
                      <span v-for="(department , index) in departments" v-bind:key="index">
                            <template v-if="user.departmentId === department.id">
                              {{ department.departName }}
                            </template>
                          </span>
                  </el-col>
              </el-row>
              <el-row :gutter="30">
                  <el-col :span="8" :push="4">
                      <span>性别：</span>
                  </el-col>
                  <el-col :span="16">
                      <span v-if="user.sex === 0">男</span>
                      <span v-if="user.sex === 1">女</span>
                  </el-col>
              </el-row>
              <el-row :gutter="30">
                  <el-col :span="8" :push="4">
                      <span>生日：</span>
                  </el-col>
                  <el-col :span="16">
                      <span>{{ user.birth }}</span>
                  </el-col>
              </el-row>
              <el-row :gutter="30">
                  <el-col :span="8" :push="4">
                      <span>手机号码：</span>
                  </el-col>
                  <el-col :span="16">
                      <span>{{ user.mobile }}</span>
                  </el-col>
              </el-row>
              <el-row :gutter="30">
                  <el-col :span="8" :push="4">
                      <span>邮箱：</span>
                  </el-col>
                  <el-col :span="16">
                      <span>{{ user.email }}</span>
                  </el-col>
              </el-row>
      </div>
    <!--<div slot="footer" class="dialog-footer">-->
      <!--<el-button type="primary" @click="$emit('success')">确 定</el-button>-->
    <!--</div>-->
  </el-dialog>
</template>

<script>
import { formatTodate } from '@/utils/format.js'
export default {
  name: 'UserMassage',
  props: {
    user: {},
    showUserMassage: Boolean,
    dialogWidth: {
      type: String,
      default: '400px'
    },
    labelWidth: {
      type: String,
      default: '120px'
    }
  },
  data () {
    return {
      // 图片的 URL
      userForm: {},
      url: '',
      departments: []
    }
  },
  methods: {
    preShow () {
      this.userForm = this.user
      const birth = formatTodate(new Date(this.userForm.birth), 'YYYY-MM-DD')
      this.user.birth = birth
      if (this.userForm.picUrl !== null && this.userForm.picUrl !== '') {
        this.axios.post(this.$api.sysManager.getPicBase64, this.userForm.picUrl).then((resp) => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              var prefix = this.userForm.picUrl.substring(this.userForm.picUrl.lastIndexOf('.'), this.userForm.picUrl.length)
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
      } else {
        this.url = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
      }
      // 获取所有的部门信息
      this.axios.get(this.$api.sysManager.getAllDepartment).then(resp => {
        var json = resp.data
        if (json.code === 1) {
          this.departments = json.data
        }
      })
    },
    // 关闭按钮的回调函数
    /* close () {
      this.user = {}
      this.departments = []
      this.$emit('close')
    }, */
    // xx 的回调函数
    handleclosebind () {
      this.url = ''
      this.userForm = {}
      this.departments = []
      this.$parent.noReloadData()
    },
    handleDialogClose () {

    }
  }
}
</script>

<style scoped>
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .el-dialog__body {
    margin-left: -70px;
  }
</style>
