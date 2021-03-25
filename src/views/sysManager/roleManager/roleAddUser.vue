<template>
  <el-dialog
      @opened="openDialog"
      :width="dialogWidth"
      :title="title"
      :visible.sync="showAddUserDialog"
      :before-close="closefrom"
      :show-close="false"
      :close-on-click-modal="false"
  >
    <div>
      <div style="text-align: center;">
        <el-transfer
            style="text-align: left; display: inline-block"
            v-model="value"
            filterable
            :titles="['人员列表', '已绑定人员']"
            :button-texts="['解绑', '绑定']"
            :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
            @change="handleChange"
            :data="data">
        </el-transfer>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closefrom()">取消</el-button>
      <el-button type="primary" @click="submitOrUpdate()">保存</el-button>
    </div>
  </el-dialog>
</template>
<script>

export default {
  props: {
    showAddUserDialog: Boolean,
    requestData: {
      id: String
    },
    dialogWidth: {
      type: String,
      default: '1000px'
    },
    title: {
      type: String,
      default: '绑定人员'
    }
  },
  data () {
    return {
      data: [],
      value: []
    }
  },
  methods: {
    handleChange (value, direction, movedKeys) {
    },
    openDialog () {
      this.axios.get(this.$api.sysManager.getRoleUsers).then((resp) => {
        if (resp.status === 200) {
          const json = resp.data
          if (json.code === 1) {
            const id = this.requestData.id
            if (id !== undefined && id !== '') {
              this.axios.get(this.$api.sysManager.getRoleUsersByRoleId + id).then((resp) => {
                if (resp.status === 200) {
                  const json2 = resp.data
                  if (json2.code === 1) {
                    this.data = json.data
                    if (json2.data != null) {
                      this.value = json2.data
                    }
                  } else {
                    this.$message({
                      message: '获取角色下人员信息失败！',
                      type: 'error'
                    })
                  }
                } else {
                  this.$message({
                    message: '获取角色下人员信息失败！',
                    type: 'error'
                  })
                }
              })
            }
          } else {
            this.$message({
              message: '获取人员信息失败！',
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '获取人员信息失败！',
            type: 'error'
          })
        }
      })
    },
    closefrom () {
      this.$emit('close')
      this.clear()
    },
    clear () {
      this.data = []
      this.value = []
      this.requestData.id = ''
    },
    submitOrUpdate () {
      const params = {
        roleId: this.requestData.id,
        value: this.value
      }
      this.axios.post(this.$api.sysManager.updateBindingUsers, params).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.$emit('success')
            this.closefrom()
          }
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
          this.clearform()
          this.$emit('error')
        }
      })
    }
  }
}
</script>
