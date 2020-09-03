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
          <el-form
                  :model="user"
                  ref="user"
                  class="edit-forms fromadd"
                  label-position="right"
                  :label-width="labelWidth"
          >
              <el-row>
                  <el-col>
                      <el-form-item label="头像：">
                          <img v-if="user.picUrl" :src="url" class="avatar">
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row :gutter="30">
                  <el-col>
                      <el-form-item label="姓名：">
                          <span>{{ user.name }}</span>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row :gutter="30">
                  <el-col>
                      <el-form-item label="部门：">
                          <span v-for="(department , index) in departments" v-bind:key="index">
                            <template v-if="user.departmentId === department.id">
                              {{ department.departName }}
                            </template>
                          </span>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row :gutter="30">
                  <el-col>
                      <el-form-item label="性别：">
                          <span v-if="user.sex === 0">男</span>
                          <span v-if="user.sex === 1">女</span>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row :gutter="30">
                  <el-col>
                      <el-form-item label="生日：">
                          <span>{{ user.birth }}</span>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row :gutter="30">
                  <el-col>
                      <el-form-item label="手机号码：">
                          <span>{{ user.mobile }}</span>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row :gutter="30">
                  <el-col>
                      <el-form-item label="邮箱：">
                          <span>{{ user.email }}</span>
                      </el-form-item>
                  </el-col>
              </el-row>
          </el-form>
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
      url: '',
      departments: []
    }
  },
  methods: {
    preShow () {
      const birth = formatTodate(new Date(this.user.birth), 'YYYY-MM-DD')
      this.user.birth = birth
      if (this.user.picUrl !== null && this.user.picUrl !== '') {
        this.axios.post(this.$api.sysManager.getPicBase64, this.user.picUrl).then((resp) => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              var prefix = this.user.picUrl.substring(this.user.picUrl.lastIndexOf('.'), this.user.picUrl.length)
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
          console.log(json.data)
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
      this.user = {}
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
