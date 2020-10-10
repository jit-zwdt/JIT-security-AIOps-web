<template>
  <div class="width-style">
    <el-row>
      <el-col>
        <div v-if="imageurl">
          <el-avatar shape="square" :size="100" :fit="none" :src="imageurl"></el-avatar>
        </div>
        <div v-else class="emptyimg"></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <span>部门：{{ this.department }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  created () {
    this.showinfo()
  },
  data () {
    return {
      imageurl: '',
      department: ''
    }
  },
  methods: {
    showinfo () {
      this.axios.get(this.$api.sysManager.getUserInfo).then(resp => {
        var json = resp.data
        if (json.code === 1) {
          this.preShow(json.data)
        }
      })
    },
    preShow (user) {
      if (user.picUrl !== null && user.picUrl !== '') {
        this.axios.post(this.$api.sysManager.getPicBase64 + user.picUrl).then((resp) => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              var prefix = user.picUrl.substring(user.picUrl.lastIndexOf('.') + 1, user.picUrl.length)
              if (prefix === 'jpg') {
                this.imageurl = 'data:image/jpg;base64,' + json.data
              } else if (prefix === 'png') {
                this.imageurl = 'data:image/png;base64,' + json.data
              } else {
                this.imageurl = 'data:image/jpeg;base64,' + json.data
              }
            }
          }
        })
      }
      // 获取所有的部门信息
      this.axios.get(this.$api.sysManager.getAllDepartment).then(resp => {
        var json = resp.data
        if (json.code === 1) {
          json.data.forEach(element => {
            if (element.id === user.departmentId) {
              this.department = element.departName
            }
          })
        }
      })
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
.emptyimg {
  background: url('~@/assets/img/dpng.png') center center no-repeat;
  height: 100px;
  width: 100px;
}
.width-style {
  width: 100%;
  text-align: center;
}
</style>
