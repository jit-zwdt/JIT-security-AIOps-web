<template>
  <el-dialog
  @opened="openDialog"
  :width="dialogWidth"
  :title="条件"
  :visible.sync="addalertExpressionDialog"
  :show-close="false"
  :close-on-click-modal="false"
  >
    <div>
      <ToolBar>
      </ToolBar>
    </div>
    <div slot="footer" class="dialog-footer" >
      <el-button @click="closefrom()">取消</el-button>
      <el-button type="primary" @click="submitOrUpdate('serverListForm')" v-if="assetform.buttonflag" >确认</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { resetObject } from '@/utils/common'
import { formatTodate } from '@/utils/format.js'
export default {
  props: {
    assetform: {
      id: '',
      flag: ''
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
      showfooter: true,
      serverListForm: {
        assetName: '',
        assetType: '',
        assetNumber: '',
        assetState: '',
        assetAmount: '',
        assetBelongsDept: '',
        assetBelongsPerson: '',
        assetRegisterDate: '',
        assetRegistrant: '',
        assetUpdateDate: '',
        assetLocation: '',
        assetLogoutDate: '',
        id: ''
      },
      stateOptions: [{
        value: '0',
        label: '未用'
      }, {
        value: '1',
        label: '在用'
      }, {
        value: '2',
        label: '禁用'
      }],
      typeOptions: [{
        value: '1',
        label: '网络设备'
      }, {
        value: '2',
        label: '通讯设备'
      }, {
        value: '3',
        label: '服务器'
      }, {
        value: '4',
        label: '云平台'
      }],
      id: '',
      rules: {
        assetName: [
          { required: true, message: '请输入资产名称' }
        ],
        assetNumber: [
          { required: true, message: '请输入资产编号' }
        ],
        assetType: [
          { required: true, message: '请选择资产类型' }
        ],
        assetState: [
          { required: true, message: '请选择资产状态' }
        ],
        assetAmount: [
          { required: true, message: '请输入资产数量' }
        ],
        assetRegistrant: [
          { required: true, message: '请输入登记人' }
        ],
        assetRegisterDate: [
          { required: true, message: '请选择资产登记时间' }
        ]
      }
    }
  },
  methods: {
    openDialog () {
      if (this.assetform.flag === '1') {
        this.showfooter = false
      } else {
        this.showfooter = true
      }
      if (this.assetform.flag === '1' || this.assetform.flag === '2') {
        this.showInfo(this.assetform.id)
      }
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
    },
    submitOrUpdate (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.assetform.flag === '3') {
            this.submit()
          } else if (this.assetform.flag === '2') {
            this.update()
          }
        } else {
          return false
        }
      })
    },
    submit () {
      const region = this.makeParam()
      this.axios.post('/assets/addAssets', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.clearform()
            this.$emit('success')
            // this.$router.push({ path: '/assetsManager/assetsList' })
          }
        } else {
          this.$message({
            message: '添加失败',
            type: 'error'
          })
          this.clearform()
          this.$emit('error')
        }
      })
    },
    update () {
      const region = this.makeParam()
      this.axios.put('/assets/updateAssets/' + this.assetform.id, region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.clearform()
            this.$emit('success')
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
    },
    showInfo (assetid) {
      if (assetid != null && assetid !== '') {
        this.axios.post('/assets/findById/' + assetid, {
          id: this.id
        }).then((resp) => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              // console.log(json.data.dataList[0])
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
      var assetRegisterDate = this.serverListForm.assetRegisterDate
      assetRegisterDate = formatTodate(assetRegisterDate, 'YYYY-MM-DD HH:mm:ss')
      var assetUpdateDate = this.serverListForm.assetUpdateDate
      assetUpdateDate = formatTodate(assetUpdateDate, 'YYYY-MM-DD HH:mm:ss')
      var assetLogoutDate = this.serverListForm.assetLogoutDate
      assetLogoutDate = formatTodate(assetLogoutDate, 'YYYY-MM-DD HH:mm:ss')
      const region = {
        assetName: this.serverListForm.assetName,
        assetType: this.serverListForm.assetType,
        assetNumber: this.serverListForm.assetNumber,
        assetState: this.serverListForm.assetState,
        assetAmount: this.serverListForm.assetAmount,
        assetBelongsDept: this.serverListForm.assetBelongsDept,
        assetBelongsPerson: this.serverListForm.assetBelongsPerson,
        assetRegisterDate: assetRegisterDate,
        assetRegistrant: this.serverListForm.assetRegistrant,
        assetUpdateDate: assetUpdateDate,
        assetLocation: this.serverListForm.assetLocation,
        assetLogoutDate: assetLogoutDate
      }
      return region
    }
  }
}
</script>
