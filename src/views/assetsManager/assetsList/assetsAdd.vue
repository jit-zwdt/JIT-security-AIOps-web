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
              <el-form-item label="资产类别：" prop="type">
                <el-select v-model="serverListForm.type" placeholder="请选择" @change="changeType()" style="width: 100%">
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
          <el-row :gutter="40" v-show="serverListForm.type === '0'">
            <el-col :span="12">
              <el-form-item label="内存大小(G)：" prop="memory">
                <el-input v-model.number="serverListForm.memory" placeholder="请输入内存大小 单位 G 没有请填 0" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="硬盘大小(G)：" prop="hardDisk">
                <el-input v-model.number="serverListForm.hardDisk" placeholder="请输入硬盘大小 单位 G 没有请填 0" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40" v-show="serverListForm.type === '0'">
             <el-col :span="12">
              <el-form-item label="CPU(GHZ)：" prop="cpu">
                <el-input v-model="serverListForm.cpu" placeholder="请输入 CPU 大小 单位 GHZ 没有请填 0" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="CPU核数：" prop="cpuCoreNumber">
                <el-input v-model.number="serverListForm.cpuCoreNumber" placeholder="请输入 CPU 核心数 没有请填 0" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40" v-if="serverListForm.type === '1'">
            <el-col :span="24">
              <el-form-item label="所属硬件：" prop="parentId">
                <el-select v-model="serverListForm.parentId" @change="addIp" placeholder="请选择" filterable style="width: 100%">
                  <el-option
                      v-for="item in hardwareOptions"
                      :key="item[0]"
                      :label="item[1]+'('+item[2]+')'"
                      :value="item[0]">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="ip：" prop="ip">
                <el-input :disabled="serverListForm.type !== '1' ? false : 'disabled'" v-model="serverListForm.ip" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备用ip：" prop="backupIp">
                <el-input :disabled="serverListForm.type !== '1' ? false : 'disabled'" v-model="serverListForm.backupIp" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="资产分类：" prop="classify">
                <el-select v-model="serverListForm.classify" placeholder="请选择" style="width: 100%">
                  <el-option
                      v-for="item in zcfl"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value"
                      :disabled="item.status">
                  </el-option>
                </el-select>
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
              <el-form-item label="序列号：" prop="sn">
                <el-input v-model="serverListForm.sn" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="价格：" prop="worth">
                <el-input v-model="serverListForm.worth" oninput="value=value.replace(/[^\d]/g,'')"
                          clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="取得方式：" prop="acquisitionMode">
                <el-input v-model="serverListForm.acquisitionMode" clearable></el-input>
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
                <el-input v-model="serverListForm.user" clearable></el-input>
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
                <el-input v-model="serverListForm.brand" clearable></el-input>
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
              <el-form-item label="资产登记时间：" prop="registerDate">
                <el-date-picker
                    v-model="serverListForm.registerDate"
                    type="date"
                    placeholder="资产登记时间"
                    class="datetop"
                    value-format="yyyy-MM-dd"
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
                    value-format="yyyy-MM-dd"
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
                    value-format="yyyy-MM-dd"
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
                    value-format="yyyy-MM-dd"
                    class="datetop"
                    style="width: 100%">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </ToolBar>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closefrom()">取消</el-button>
      <el-button type="primary" @click="submitOrUpdate('serverListForm')" v-if="assetform.buttonflag">确认</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { resetObject } from '@/utils/common'
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
    var validateIp = (rule, value, callback) => {
      // 如果是硬件发送 axios 如果是软件不发送
      if (this.serverListForm.type === '0') {
        // 发送 axios 请求到后端判断是否有一致的值
        if (this.oldIp !== value) {
          this.axios.get(api.assetsManager.assetsList.assetsAdd.validateIp, { params: { ip: value } }).then((resp) => {
            // 成功响应
            if (resp.status === 200) {
              var json = resp.data
              // 响应码为 1 的时候进入
              if (json.code === 1) {
                // 如果返回值为 true
                if (json.data) {
                  callback(new Error('IP 不能重复'))
                } else {
                  callback()
                }
              }
            }
          })
        } else {
          callback()
        }
        // callback()
      } else {
        callback()
      }
    }
    var validateFloat = (rule, value, callback) => {
      var reg = /^\d+(\.\d+)?$/
      if (!reg.test(value)) {
        callback(new Error('请输入正小数 单位 GHZ 没有请填0'))
      } else {
        callback()
      }
    }
    var validateNumber = (rule, value, callback) => {
      if (value < 0) {
        callback(new Error('输入的值不能为负数'))
      } else {
        callback()
      }
    }
    return {
      showfooter: true,
      serverListForm: {
        id: '',
        name: '',
        type: '',
        classify: '',
        number: '',
        state: '',
        ip: '',
        backupIp: '',
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
        productModel: '',
        parentId: '',
        cpu: 0,
        cpuCoreNumber: 0,
        memory: 0,
        hardDisk: 0
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
      hardwareOptions: [],
      typeOptions: [{
        value: '0',
        label: '硬件'
      }, {
        value: '1',
        label: '软件'
      }],
      id: '',
      zcfl: [],
      oldIp: '',
      rules: {
        name: [
          { required: true, message: '请输入资产名称' }
        ],
        number: [
          { required: true, message: '请输入资产编号' }
        ],
        ip: [{ type: 'number', validator: validateIp, trigger: 'blur' }],
        type: [
          { required: true, message: '请选择资产类别' }
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
        ],
        cpu: [
          { type: 'string', validator: validateFloat, trigger: 'blur' }
        ],
        cpuCoreNumber: [
          { type: 'number', message: 'CPU核数 必须为数字值 没有请填 0' },
          { type: 'number', validator: validateNumber, trigger: 'blur' }
        ],
        memory: [
          { type: 'number', message: '内存大小必须为数字值 单位 G 没有请填 0' },
          { type: 'number', validator: validateNumber, trigger: 'blur' }
        ],
        hardDisk: [
          { type: 'number', message: '硬盘大小必须为数字值 单位 G 没有请填 0' },
          { type: 'number', validator: validateNumber, trigger: 'blur' }
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
              this.serverListForm = json.data
              this.oldIp = json.data.ip
              this.serverListForm.cpu = parseFloat(json.data.cpu === null ? 0 : json.data.cpu)
              this.serverListForm.cpuCoreNumber = parseInt(json.data.cpuCoreNumber === null ? 0 : json.data.cpuCoreNumber)
              this.serverListForm.memory = parseInt(json.data.memory === null ? 0 : json.data.memory)
              this.serverListForm.hardDisk = parseInt(json.data.hardDisk === null ? 0 : json.data.hardDisk)
              if (this.serverListForm.type === '1') {
                this.addIp()
              }
            }
          } else {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
            this.$emit('error')
          } // TODO: 没有做编辑的回显操作进行修改在修改的方面上进行了回显的操作 但是没有做校验的处理
        })
      }
    },
    makeParam () {
      const region = {
        name: this.serverListForm.name,
        type: this.serverListForm.type,
        number: this.serverListForm.number,
        state: this.serverListForm.state,
        ip: this.serverListForm.ip,
        backupIp: this.serverListForm.backupIp,
        belongsDept: this.serverListForm.belongsDept,
        belongsPerson: this.serverListForm.belongsPerson,
        registerDate: this.serverListForm.registerDate,
        registrant: this.serverListForm.registrant,
        updateDate: this.serverListForm.updateDate,
        location: this.serverListForm.location,
        logoutDate: this.serverListForm.logoutDate,
        dateRecorded: this.serverListForm.dateRecorded,
        worth: this.serverListForm.worth,
        acquisitionMode: this.serverListForm.acquisitionMode,
        userDepartment: this.serverListForm.userDepartment,
        user: this.serverListForm.user,
        objectClassification: this.serverListForm.objectClassification,
        sn: this.serverListForm.sn,
        brand: this.serverListForm.brand,
        productModel: this.serverListForm.productModel,
        classify: this.serverListForm.classify,
        parentId: this.serverListForm.parentId,
        cpu: parseFloat(this.serverListForm.cpu),
        cpuCoreNumber: this.serverListForm.cpuCoreNumber,
        memory: this.serverListForm.memory,
        hardDisk: this.serverListForm.hardDisk
      }
      return region
    },
    getDictByCode (code) {
      this.axios.get(this.$api.sysManager.getDictByCode + code).then((resp) => {
        if (resp.status === 200) {
          const json = resp.data
          if (json.code === 1) {
            this.zcfl = json.data
          }
        } else {
          this.$message({
            message: '获取字典信息失败',
            type: 'error'
          })
        }
      })
    },
    changeType () {
      // 如果选择的是软件则进行操作
      if (this.serverListForm.type === '1') {
        // 添加所所属硬件
        this.getHardwareInfo()
        this.serverListForm.ip = ''
      }
      // 清空选择硬件的选择框
      // this.serverListForm.parentId = ''
      // 清空 IP 文字
      // this.serverListForm.ip = ''
    },
    // 添加硬件的 Ip
    addIp () {
      // 遍历回显的 List
      const partentid = this.serverListForm.parentId
      // 声明 IP 值
      let ip = ''
      this.hardwareOptions.some(function (value) {
        // 判断 List 和选中的值是否相等 相等则进入
        if (value[0] === partentid) {
          // Ip 赋值
          ip = value[3]
          // 切断循环
          return true
        }
      })
      // Ip 修改
      this.serverListForm.ip = ip
      // 备用 Ip
      // this.serverListForm.backupIp = ''
    },
    getHardwareInfo () {
      this.axios.get(this.$api.assetsManager.assetsList.getHardwareInfo).then((resp) => {
        if (resp.status === 200) {
          const json = resp.data
          if (json.code === 1) {
            this.hardwareOptions = json.data
          }
        } else {
          this.$message({
            message: '获取硬件信息失败',
            type: 'error'
          })
        }
      })
    }
  },
  mounted () {
    this.getDictByCode('zcfl')
    this.getHardwareInfo()
  }
}
</script>
