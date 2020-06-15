<template>
  <div class = "login-container">
    <el-form ref="form" :model="loginForm" label-width="80px" class="login-page">
      <h3 class="title">登录</h3>
      <el-form-item label="用户名">
        <el-input v-model="loginForm.username" placeholder="请输入用户名" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="submitClick">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import api from '@/api/api'
import { clearToken } from '@/utils/common'
export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    submitClick: function () {
      clearToken()
      this.$store.dispatch('login', this.loginForm).then((resp) => {
        if (resp.status === 200) {
          if (resp.data.code === 1) {
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            this.$router.replace({ path: api.regionManager.list })
          } else {
            alert('用户名或密码错误')
            this.clearinfo()
          }
        } else {
          alert('登录失败')
          this.clearinfo()
        }
      }).catch(error => {
        alert('服务器异常')
        console.log(error)
        this.clearinfo()
      })
    },
    clearinfo: function () {
      this.loginForm.username = ''
      this.loginForm.password = ''
    }
  }
}
</script>
<style>

.login_page1 {
  display: flex;
  justify-content: center;
}

.login-container {
    width: 100%;
    height: 100%;
    background: #4373a5;
    display: flex;
    align-items: center;
    background: url('~@/assets/img/6148878611245495.jpeg') center center no-repeat;
}
.login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin:0px auto;
    width: 350px;
    padding: 20px 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
.title {
  display: block;
  text-align: center;
  color:#D5D6E2;
}

</style>
