<template>
  <div class="login-container">
    <el-form ref="form" :model="loginForm" class="login-page" :rules="rules">
      <h3 class="title">登录</h3>
      <el-row>
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名" clearable></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" show-password clearable></el-input>
        </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="14">
          <el-form-item prop="verificationCode">
            <el-input placeholder="请输入验证码" v-model="loginForm.verificationCode">
              <i
                  v-if="identifyCode.toLowerCase() === loginForm.verificationCode.toLowerCase() && identifyCode !== ''"
                  class="el-icon-success" style="color: #7df371;"
                  slot="suffix">
              </i>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <div @click="refreshCode">
            <SIdentify :identifyCode="identifyCode"></SIdentify>
          </div>
        </el-col>
      </el-row>
      <el-button style="width: 100%" type="primary" @click="submitClick">登录</el-button>
    </el-form>
  </div>
</template>
<script>
import api from '@/api/api'
import { clearToken } from '@/utils/common'
import SIdentify from '@/components/identify'

export default {
  components: {
    SIdentify
  },
  mounted () {
    this.makeCode()
    this.enterKeyup()
  },
  destroyed () {
    this.enterKeyupDestroyed()
  },
  data () {
    return {
      identifyCode: '',
      identifyCodeKey: '',
      loginForm: {
        username: '',
        password: '',
        verificationCode: '',
        verificationCodeKey: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名' }
        ],
        password: [
          { required: true, message: '请输入密码' }
        ],
        verificationCode: [
          { required: true, message: '请输入验证' }
        ]
      }
    }
  },
  beforeCreate () {
    clearToken()
  },
  methods: {
    submitClick: function () {
      clearToken()
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.loginForm.verificationCodeKey = this.identifyCodeKey
          this.$store.dispatch('login', this.loginForm).then((resp) => {
            if (resp.status === 200) {
              if (resp.data.code === 1) {
                this.$message({
                  message: '登录成功',
                  type: 'success'
                })
                this.$router.push({ path: api.index })
              } else if (resp.data.code === 1003 || resp.data.code === 1004) {
                this.$message({
                  message: resp.data.msg,
                  type: 'error'
                })
                this.makeCode()
              } else {
                this.$message({
                  message: resp.data.msg,
                  type: 'error'
                })
                this.clearinfo()
              }
            } else {
              this.$message({
                message: '登录失败',
                type: 'error'
              })
              this.clearinfo()
            }
          }).catch(error => {
            this.$message({
              message: '服务器异常',
              type: 'error'
            })
            console.log(error)
            this.clearinfo()
          })
        }
      })
    },
    clearinfo: function () {
      this.loginForm.username = ''
      this.loginForm.password = ''
      this.loginForm.verificationCode = ''
      this.loginForm.verificationCodeKey = ''
    },
    refreshCode () {
      this.identifyCode = ''
      this.identifyCodeKey = ''
      this.makeCode()
    },
    makeCode () {
      this.axios.get(this.$api.getCheckCode).then((resp) => {
        if (resp.status === 200) {
          const json = resp.data
          if (json.code === 1) {
            this.identifyCode = json.data.code
            this.identifyCodeKey = json.data.key
          } else {
            this.$message({
              message: '获取验证码失败！',
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '获取验证码服务异常！',
            type: 'error'
          })
        }
      })
    },
    enterKey (event) {
      const code = event.keyCode
        ? event.keyCode
        : event.which
          ? event.which
          : event.charCode
      if (code === 13) {
        this.submitClick()
      }
    },
    enterKeyupDestroyed () {
      document.removeEventListener('keyup', this.enterKey)
    },
    enterKeyup () {
      document.addEventListener('keyup', this.enterKey)
    }
  }
}
</script>
<style>

  .login-container {
    width: 100%;
    height: 100%;
    background: #4373a5;
    display: flex;
    align-items: center;
    background: url('~@/assets/img/login.gif') center center no-repeat;
    background-size: 100% 100%;
  }

  .login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 0px auto;
    width: 350px;
    padding: 20px 20px 35px 20px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .title {
    display: block;
    text-align: center;
    color: #D5D6E2;
  }

</style>
