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
          :disabled="!editform.buttonflag"
          :rules="rules"
        >
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="资产名称：" prop="assetName">
              <el-input v-model="serverListForm.assetName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产编号：" prop="assetNumber">
              <el-input v-model="serverListForm.assetNumber" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="资产类型：" prop="assetType">
              <el-select v-model="serverListForm.assetType" placeholder="请选择">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产状态：" prop="assetState">
              <el-select v-model="serverListForm.assetState" placeholder="请选择">
                <el-option
                  v-for="item in stateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="数量：" prop="assetAmount">
              <el-input v-model="serverListForm.assetAmount" oninput="value=value.replace(/[^\d]/g,'')" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产位置：" prop="assetLocation">
              <el-input v-model="serverListForm.assetLocation" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="资产所属人：" prop="assetBelongsPerson">
              <el-input v-model="serverListForm.assetBelongsPerson" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产所属单位：" prop="assetBelongsDept">
              <el-input v-model="serverListForm.assetBelongsDept" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="登记人：" prop="assetRegistrant">
              <el-input v-model="serverListForm.assetRegistrant" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产登记时间：" prop="assetRegisterDate">
              <el-date-picker
                v-model="serverListForm.assetRegisterDate"
                type="date"
                placeholder="资产登记时间"
                class="datetop">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="资产修改时间：" prop="assetUpdateDate">
              <el-date-picker
                v-model="serverListForm.assetUpdateDate"
                type="date"
                placeholder="资产登记时间"
                class="datetop">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产注销时间：" prop="assetLogoutDate">
              <el-date-picker
                v-model="serverListForm.assetLogoutDate"
                type="date"
                placeholder="资产注销时间"
                class="datetop">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        </el-form>
      </ToolBar>
    </div>
    <div slot="footer" class="dialog-footer" >
      <el-button @click="closefrom()">取消</el-button>
      <el-button type="primary" @click="submitOrUpdate('serverListForm')" v-if="editform.buttonflag" >确认</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { resetObject } from '@/utils/common'
import { formatTodate } from '@/utils/format.js'
export default {
  props: {
    editform: {
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
      loading: true,
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
      setTimeout(this.loadingclose(), 13000)
    },
    loadingclose () {
      this.loading = false
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
