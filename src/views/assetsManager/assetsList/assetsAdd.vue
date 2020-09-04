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
          :disabled="!assetform.buttonflag"
          :rules="rules"
        >
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="资产名称：" prop="name">
              <el-input v-model="serverListForm.name" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产编号：" prop="number">
              <el-input v-model="serverListForm.number" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="资产类型：" prop="type">
              <el-select v-model="serverListForm.type" placeholder="请选择" style="width: 100%">
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
            <el-form-item label="资产状态：" prop="state">
              <el-select v-model="serverListForm.state" placeholder="请选择" style="width: 100%">
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
            <el-form-item label="数量：" prop="amount">
              <el-input v-model="serverListForm.amount" oninput="value=value.replace(/[^\d]/g,'')" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产位置：" prop="location">
              <el-input v-model="serverListForm.location" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="资产国标大类：" prop="gbType">
              <el-input v-model="serverListForm.gbType"  clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="价值：" prop="worth">
              <el-input v-model="serverListForm.worth" oninput="value=value.replace(/[^\d]/g,'')" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="ip：" prop="ip">
              <el-input v-model="serverListForm.ip"  clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="备用ip：" prop="backupIp">
              <el-input v-model="serverListForm.backupIp" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="取得方式：" prop="acquisitionMode">
              <el-input v-model="serverListForm.acquisitionMode"  clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="使用部门：" prop="userDepartment">
              <el-input v-model="serverListForm.userDepartment" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="使用人：" prop="user">
              <el-input v-model="serverListForm.user"  clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用途分类：" prop="objectClassification">
              <el-input v-model="serverListForm.objectClassification" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="品牌：" prop="brand">
              <el-input v-model="serverListForm.brand"  clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="型号：" prop="productModel">
              <el-input v-model="serverListForm.productModel" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="资产所属人：" prop="belongsPerson">
              <el-input v-model="serverListForm.belongsPerson" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产所属单位：" prop="belongsDept">
              <el-input v-model="serverListForm.belongsDept" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="登记人：" prop="registrant">
              <el-input v-model="serverListForm.registrant" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产登记时间：" prop="registerDate" >
              <el-date-picker
                v-model="serverListForm.registerDate"
                type="date"
                placeholder="资产登记时间"
                class="datetop"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="资产修改时间：" prop="updateDate">
              <el-date-picker
                v-model="serverListForm.updateDate"
                type="date"
                placeholder="资产修改时间"
                class="datetop"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产注销时间：" prop="logoutDate">
              <el-date-picker
                v-model="serverListForm.logoutDate"
                type="date"
                placeholder="资产注销时间"
                class="datetop"
                style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="财务入账日期：" prop="dateRecorded">
              <el-date-picker
                      v-model="serverListForm.dateRecorded"
                      type="date"
                      placeholder="财务入账日期"
                      class="datetop"
                      style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        </el-form>
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
import api from '@/api/api'
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
        id: '',
        name: '',
        type: '',
        number: '',
        state: '',
        gbType: '',
        ip: '',
        backupIp: '',
        amount: '',
        belongsDept: '',
        belongsPerson: '',
        registerDate: '',
        registrant: '',
        updateDate: '',
        location: '',
        logoutDate: '',
        dateRecorded: '',
        worth: '',
        acquisitionMode: '',
        userDepartment: '',
        user: '',
        objectClassification: '',
        sn: '',
        brand: '',
        productModel: ''
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
        name: [
          { required: true, message: '请输入资产名称' }
        ],
        number: [
          { required: true, message: '请输入资产编号' }
        ],
        type: [
          { required: true, message: '请选择资产类型' }
        ],
        state: [
          { required: true, message: '请选择资产状态' }
        ],
        amount: [
          { required: true, message: '请输入资产数量' }
        ],
        registrant: [
          { required: true, message: '请输入登记人' }
        ],
        registerDate: [
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
      this.axios.post(api.assetsManager.assetsList.assetsAdd.addAssets, region).then((resp) => {
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
      this.axios.put(api.assetsManager.assetsList.assetsAdd.updateAssets + this.assetform.id, region).then((resp) => {
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
        this.axios.post(api.assetsManager.assetsList.assetsAdd.findById + assetid, {
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
      var registerDate = this.serverListForm.registerDate
      registerDate = formatTodate(registerDate, 'YYYY-MM-DD HH:mm:ss')
      var updateDate = this.serverListForm.updateDate
      updateDate = formatTodate(updateDate, 'YYYY-MM-DD HH:mm:ss')
      var logoutDate = this.serverListForm.logoutDate
      logoutDate = formatTodate(logoutDate, 'YYYY-MM-DD HH:mm:ss')
      var dateRecorded = this.serverListForm.dateRecorded
      dateRecorded = formatTodate(dateRecorded, 'YYYY-MM-DD HH:mm:ss')
      const region = {
        name: this.serverListForm.name,
        type: this.serverListForm.type,
        number: this.serverListForm.number,
        state: this.serverListForm.state,
        gbType: this.serverListForm.gbType,
        ip: this.serverListForm.ip,
        backupIp: this.serverListForm.backupIp,
        amount: this.serverListForm.amount,
        belongsDept: this.serverListForm.belongsDept,
        belongsPerson: this.serverListForm.belongsPerson,
        registerDate: registerDate,
        registrant: this.serverListForm.registrant,
        updateDate: updateDate,
        location: this.serverListForm.location,
        logoutDate: logoutDate,
        dateRecorded: dateRecorded,
        worth: this.serverListForm.worth,
        acquisitionMode: this.serverListForm.acquisitionMode,
        userDepartment: this.serverListForm.userDepartment,
        user: this.serverListForm.user,
        objectClassification: this.serverListForm.objectClassification,
        sn: this.serverListForm.sn,
        brand: this.serverListForm.brand,
        productModel: this.serverListForm.productModel
      }
      return region
    }
  }
}
</script>
