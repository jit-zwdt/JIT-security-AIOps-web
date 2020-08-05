<template>
    <el-dialog
            @opened="openDialog"
            :width="dialogWidth"
            :title="title"
            :visible.sync="showEditDialog"
            :show-close="false"
            :close-on-click-modal="false"
    >
        <div>
            <ToolBar>
                <el-form
                        :model="serverListForm"
                        ref="serverListForm"
                        class="edit-forms fromadd"
                        label-position="right"
                        :label-width="labelWidth"
                >
                    <el-row>
                        <el-form-item label="角色：" prop="claimRoleId">
                            {{role}}
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="认领人：" prop="claimUserId">
                                {{user}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="认领意见：" prop="claimOpinion">
                                {{claimOpinion}}
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
      user: '',
      role: '',
      claimOpinion: ''
    }
  },
  methods: {
    openDialog () {
      this.axios.post('/problem/findByProblemId', qs.stringify({
        problemId: this.assetform.eventid
      })).then(resp => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            var monitorClaim = json.data
            this.claimOpinion = monitorClaim.claimOpinion
            this.user = monitorClaim.user
            this.role = monitorClaim.role
          }
        }
      })
    },
    closefrom () {
      // this.showfooter = true
      this.user = ''
      this.role = ''
      this.claimOpinion = ''
      this.$emit('close')
      this.showInfo()
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
    }
  }
}
</script>
<style>
.fromadd {
    width: 100%;
}
</style>
