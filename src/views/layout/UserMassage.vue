<template>
  <!-- 显示用户信息的 Dialong -->
  <el-dialog title="用户中心" width="20%" :visible.sync="showUserMassage" @opened="preShow" :before-close="handleclosebind" :show-close="true" :close-on-click-modal="false">
    <el-row :gutter="30">
        <el-col :push="8" :span="12">
          <div>
            <span style="line-height:100px">头像:</span>
          </div>
        </el-col>
        <el-col :span="12">
          <el-image style="width: 100px; height: 100px" :src="url"></el-image>
        </el-col>
    </el-row>
    <el-row :gutter="30">
        <el-col :push="8" :span="12">
          <div>
            <span>姓名:</span>
          </div>
        </el-col>
        <el-col :span="12">
          <span>{{ user.name }}</span>
        </el-col>
    </el-row>
    <el-row :gutter="30">
        <el-col :push="8" :span="12">
          <div>
            <span>部门:</span>
          </div>
        </el-col>
        <el-col :span="12">
          <span v-for="(department , index) in departments" v-bind:key="index">
            <template v-if="user.departmentId === department.id">
              {{ department.departName }}
            </template>
          </span>
          <!-- <span>{{ user.departmentId }}</span> -->
        </el-col>
    </el-row>
        <el-row :gutter="30">
        <el-col :push="8" :span="12">
          <div>
            <span>性别:</span>
          </div>
        </el-col>
        <el-col :span="12">
          <span v-if="user.sex === 0">男</span>
          <span v-if="user.sex === 1">女</span>
        </el-col>
    </el-row>
        <el-row :gutter="30">
        <el-col :push="8" :span="12">
          <div>
            <span>生日:</span>
          </div>
        </el-col>
        <el-col :span="12">
          <span>{{ user.birth }}</span>
        </el-col>
    </el-row>
        <el-row :gutter="30">
        <el-col :push="8" :span="12">
          <div>
            <span>手机号码:</span>
          </div>
        </el-col>
        <el-col :span="12">
          <span>{{ user.mobile }}</span>
        </el-col>
    </el-row>
        <el-row :gutter="30">
        <el-col :push="8" :span="12">
          <div>
            <span>邮箱:</span>
          </div>
        </el-col>
        <el-col :span="12">
          <span>{{ user.email }}</span>
        </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <!-- <el-button @click="close()">取 消</el-button> -->
      <el-button type="primary" @click="$emit('success')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { formatTodate } from '@/utils/format.js'
export default {
  name: 'UserMassage',
  props: {
    showUserMassage: Boolean
  },
  data () {
    return {
      user: {
        // 姓名
        name: '',
        // 部门ID
        departmentId: '',
        // 性别代号
        sex: 0,
        // 生日日期
        birth: '',
        // 手机号
        mobile: '',
        // 邮箱
        email: ''
      },
      // 图片的 URL
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      departments: []
    }
  },
  methods: {
    preShow () {
      // 获取当前用户信息进行回显
      this.axios.get(this.$api.sysManager.getUserInfo).then(resp => {
        var json = resp.data
        if (json.code === 1) {
          console.log(json.data)
          this.user = json.data
          const birth = formatTodate(new Date(json.data.birth), 'YYYY-MM-DD hh:mm:ss')
          this.user.birth = birth
        }
      })
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
      this.user = {}
      this.departments = []
      this.$parent.noReloadData()
    }
  }
}
</script>

<style>
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
