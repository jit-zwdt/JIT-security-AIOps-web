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
                        :model="serverListForm"
                        ref="serverListForm"
                        class="edit-forms fromadd"
                        label-position="right"
                        :label-width="labelWidth"
                        :rules="rules"
                >
                    <el-row>
                        <el-form-item label="角色选择：" prop="claimRoleId">
                            <el-select v-model="serverListForm.claimRoleId" placeholder="请选择" @change="((val)=>{changeStatus(val)})" style="width:100%">
                                <el-option
                                        v-for="item in optionsRole"
                                        :key="item.id"
                                        :label="item.roleName"
                                        :value="item.id" >
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="认领人选择：" prop="claimUserId">
                                <el-select v-model="serverListForm.claimUserId" placeholder="请选择" style="width:100%">
                                    <el-option
                                            v-for="item in optionsUser"
                                            :key="item.id"
                                            :label="item.username"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="认领意见" prop="claimOpinion">
                                <el-input type="textarea" v-model="serverListForm.claimOpinion" clearable style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </ToolBar>
        </div>
        <div slot="footer" class="dialog-footer" >
            <el-button type="primary" @click="submitOrUpdate('serverListForm')" >确认</el-button>
            <el-button @click="closefrom()">取消</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { resetObject } from '@/utils/common'
import qs from 'qs'
export default {
  props: {
    assetform: {
      eventid: '',
      name: '',
      ns: '',
      severity: '',
      objectid: '',
      clock: '',
      hostId: '',
      hostName: ''
    },
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
      optionsRole: [],
      optionsUser: [],
      showfooter: true,
      serverListForm: {
        claimRoleId: '',
        claimUserId: '',
        claimOpinion: '',
        isClaim: 1,
        eventid: '',
        name: '',
        ns: '',
        severity: '',
        objectid: '',
        clock: '',
        isDeleted: 0,
        hostId: '',
        hostName: '',
        gmtCreate: ''
      },
      id: '',
      rules: {
        claimRoleId: [
          { required: true, message: '请选择角色' }
        ],
        claimUserId: [
          { required: true, message: '请选择认领人' }
        ],
        claimOpinion: [
          { required: true, message: '请填写认领意见' }
        ]
      }
    }
  },
  methods: {
    changeStatus (e) {
      this.optionsUser = []
      this.serverListForm.claimUserId = ''
      this.axios
        .post('/user/findUserByRole', qs.stringify({
          roleId: e
        }))
        .then(resp => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              this.optionsUser = json.data
              for (var val of json.data) {
                if (e === val) {
                  this.optionsUser.push({ label: val.username, value: val.id })
                }
              }
            }
          }
        })
    },
    openDialog () {
      this.axios
        .post('/role/findAllRole')
        .then(resp => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              this.optionsRole = json.data
            }
          }
        })
    },
    closefrom () {
      // this.showfooter = true
      this.clearform()
      this.$emit('close')
      this.showInfo()
    },
    clearform () {
      resetObject(this.serverListForm)
      this.$refs.serverListForm.resetFields()
      this.optionsUser = []
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
      const region = this.makeParam()
      this.axios.post('/problem/addClaim', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.clearform()
            this.closefrom()
            this.$emit('success')
            // this.$router.push({ path: '/assetsManager/assetsList' })
          }
        } else {
          this.$message({
            message: '添加失败',
            type: 'error'
          })
          this.clearform()
          this.closefrom()
          this.$emit('error')
        }
      })
    },
    showInfo (assetid) {
      if (assetid != null && assetid !== '') {
        this.axios.post('/assets/findById/' + assetid, {
          id: this.id
        }).then((resp) => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              this.serverListForm = json.data
            }
          } else {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
            this.$emit('error')
          }
        })
      }
    },
    makeParam () {
      const region = {
        claimRoleId: this.serverListForm.claimRoleId,
        claimUserId: this.serverListForm.claimUserId,
        claimOpinion: this.serverListForm.claimOpinion,
        isClaim: 1,
        problemId: this.assetform.eventid,
        problemName: this.assetform.name,
        ns: this.assetform.ns,
        severity: this.assetform.severity,
        triggerId: this.assetform.objectid,
        problemCreate: this.assetform.clock.replace('T', ' '),
        hostId: this.assetform.hostId,
        hostName: this.assetform.hostName,
        gmtCreate: (new Date()).getTime(),
        isRegister: 0,
        isResolve: 0
      }
      return region
    }
  }
}
</script>
<style>
.fromadd {
    width: 100%;
}
</style>
