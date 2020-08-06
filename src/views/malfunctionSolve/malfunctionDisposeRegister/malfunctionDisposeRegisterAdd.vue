<template>
    <div>
        <template>
            <div class="card dark-main-background">
                <div
                        class="title-bar card-header dark-main-background dark-white-color"
                        style="margin-top:-10px !important;height:40px"
                >
                    <div class="queryleft">
                        <p class="title-bar-description" style>
                            <span>故障信息</span>
                        </p>
                    </div>
                    <div class="queryright" style="margin-top:-5px !important;height:40px">
                        <el-button @click="backfrom()" size="mini">返回</el-button>
                    </div>
                </div>
                <div class="tempList card-body">
                    <div>
                        <table class="dark-main-background" style="width:100%;margin-top:-5px">
                            <tr style="height:40px">
                                <th class="darkmainborderth" width='10%'>故障名称</th>
                                <td class="darkmainbordertd" width='60%'>{{this.$route.query.problemName}}</td>
                                <th class="darkmainborderth" width='10%'>故障持续时间</th>
                                <td class="darkmainbordertd" width='20%'>{{this.$route.query.ns}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </template>
        <template>
            <div class="card dark-main-background" v-if="showTable === true">
                <div
                        class="title-bar card-header dark-main-background dark-white-color"
                        style="margin-top:-10px !important;height:40px"
                >
                    <div class="queryleft">
                        <p class="title-bar-description" style>
                            <span>登记信息</span>
                        </p>
                    </div>
                </div>
                <el-table
                        :data="tableData"
                        border
                        v-loading="loading"
                        style="width: 100%"
                        :row-style="tableRowStyle"
                        :header-cell-style="tableHeaderColor"
                >
                    <el-table-column label="故障类型" prop="problemType" min-width="10%" :resizable="false" :formatter="problemTypeFormat"></el-table-column>
                    <el-table-column label="故障原因" prop="problemReason" min-width="25%" :resizable="false"></el-table-column>
                    <el-table-column label="解决方式" prop="problemSolution" min-width="25%" :resizable="false"></el-table-column>
                    <el-table-column label="处理过程" prop="problemProcess" min-width="25%" :resizable="false"></el-table-column>
                    <el-table-column label="登记时间" prop="gmtCreate" min-width="15%" :resizable="false" :formatter="gmtCreateFormat">
                    </el-table-column>
                </el-table>
            </div>
        </template>
        <template>
            <el-tabs type="border-card" style="margin-top:5px">
                <el-tab-pane label="添加">
                    <div class="queryCenter">
                        <el-form
                                :model="registerForm"
                                ref="registerForm"
                                class="edit-forms fromadd"
                                label-position="right"
                                label-width="150px"
                                :rules="RegisterRules"
                        >
                            <el-form-item label="故障类型" prop="problemType">
                                <el-select
                                        v-model="registerForm.problemType"
                                        placeholder="请选择"
                                        class="formqueryleft"
                                        :disabled=this.readOnly
                                >
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="故障原因" prop="problemReason">
                                <el-input type="textarea" v-model="registerForm.problemReason" clearable :disabled=this.readOnly></el-input>
                            </el-form-item>
                            <el-form-item label="解决方式" prop="resolveWay">
                                <el-input type="textarea" v-model="registerForm.resolveWay" clearable :disabled=this.readOnly></el-input>
                            </el-form-item>
                            <el-form-item label="处理过程" prop="process">
                                <el-input type="textarea" v-model="registerForm.process" clearable :disabled=this.readOnly></el-input>
                            </el-form-item>
                            <el-form-item label="已解决" prop="isResole">
                                <el-checkbox v-model="registerForm.isResolve" class="formqueryleft" :disabled=this.readOnly></el-checkbox>
                            </el-form-item>
                            <el-button type="primary" @click="dialogRegister('registerForm')" :style="{ display: buttonDisplay }">登记</el-button>
                        </el-form>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </template>
        <template>
            <div class="card dark-main-background" v-if="show">
                <div
                        class="title-bar card-header dark-main-background dark-white-color"
                        style="margin-top:-10px !important;height:40px"
                >
                    <div class="queryleft">
                        <p class="title-bar-description" style>
                            <span>故障处理时长：</span>
                            <span>{{this.handleTime}}</span>
                        </p>
                    </div>
                </div>
            </div>
        </template>
    </div>
</template>
<script>
import { resetObject } from '@/utils/common'

export default {
  data () {
    return {
      handleTime: '',
      dialogVisible: false,
      readOnly: false,
      buttonDisplay: '',
      tableData: [{
        problemType: '',
        problemReason: '',
        problemSolution: '',
        problemProcess: '',
        gmtCreate: ''
      }],
      registerForm: {
        problemName: '',
        problemType: '',
        ns: '',
        registerTime: '',
        problemReason: '',
        resolveWay: '',
        process: '',
        isResolve: false,
        claimId: ''
      },
      showTable: false,
      show: false,
      isShow: false,
      options: [{
        value: 0,
        label: '类型一'
      }, {
        value: 1,
        label: '类型二'
      }, {
        value: 2,
        label: '类型三'
      }, {
        value: 3,
        label: '类型四'
      }],
      RegisterRules: {
        problemType: [
          { required: true, message: '请选择故障类型' }
        ],
        problemReason: [
          { required: true, message: '请填写故障原因' }
        ],
        resolveWay: [
          { required: true, message: '请填写解决方式' }
        ],
        process: [
          { required: true, message: '请填写处理过程' }
        ]
      },
      change: {}
    }
  },
  created () {
    this.loading = true
    this.tableData = this.tableDataclear
    this.showInfo(this.$route.query.claimId)
  },
  mounted () {
  },
  methods: {
    dialogRegister (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.dialogVisible = true
          this.$confirm('确认信息登记无误，登记后无法更改!', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.submit()
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消登记'
            })
          })
        } else {
          return false
        }
      })
    },
    problemTypeFormat (val) {
      if (val.problemType === '0') {
        return '类型一'
      } else if (val.problemType === '1') {
        return '类型二'
      } else if (val.problemType === '2') {
        return '类型三'
      } else if (val.problemType === '3') {
        return '类型四'
      }
    },
    gmtCreateFormat (val) {
      if (val.gmtCreate !== null && val.gmtCreate !== '') {
        var index = val.gmtCreate.indexOf('.')
        return val.gmtCreate.substr(0, index).replace('T', ' ')
      }
    },
    tableRowStyle ({ row, column, rowIndex, columnIndex }) {
    },
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #0086f1;color: #FFFFFF;font-weight: 500;font-size:15px'
      }
    },
    reloadData () {
    },
    backfrom () {
      this.$router.go(-1) // 返回上一层
    },
    clearform () {
      resetObject(this.registerForm)
      this.$refs.registerForm.resetFields()
    },
    makeParam () {
      var problemTypeResult = 0
      if (this.registerForm.isResolve === true) {
        problemTypeResult = 1
      }
      const region = {
        problemId: this.$route.query.problemId,
        problemType: this.registerForm.problemType,
        problemReason: this.registerForm.problemReason,
        problemSolution: this.registerForm.resolveWay,
        problemProcess: this.registerForm.process,
        isResolve: problemTypeResult,
        gmtCreate: (new Date()).getTime(),
        isDeleted: 0,
        handleTime: '',
        claimId: this.$route.query.claimId
      }
      return region
    },
    submit () {
      const region = this.makeParam()
      this.axios.post('/register/addRegister', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            const param = {
              id: this.$route.query.claimId,
              isRegister: 1,
              isResolve: json.data.isResolve,
              handleTime: this.handleTime
            }
            this.axios.post('/problem/updateClaimAfterRegister', param).then((resp) => {
              if (resp.status === 200) {
                var json = resp.data
                if (json.code === 1) {
                  this.$message({
                    message: '添加成功',
                    type: 'success'
                  })
                  this.$emit('success')
                  this.$router.push({ name: 'malfunctionDisposeRegister' })
                }
              } else {
                this.$message({
                  message: '添加失败',
                  type: 'error'
                })
                this.$emit('error')
                this.$router.push({ name: 'malfunctionDisposeRegister' })
              }
            })
          } else {
            this.$message({
              message: '添加失败',
              type: 'error'
            })
            this.clearform()
            this.$emit('error')
            this.$router.push({ name: 'malfunctionDisposeRegister' })
          }
        } else {
          this.$message({
            message: '添加失败',
            type: 'error'
          })
          this.clearform()
          this.$emit('error')
          this.$router.push({ name: 'malfunctionDisposeRegister' })
        }
      })
    },
    showInfo (claimId) {
      if (claimId != null && claimId !== '') {
        this.axios.post('/register/findRegisterByClaimId/' + claimId, {
          id: claimId
        }).then((resp) => {
          if (resp.status === 200) {
            var json = resp.data
            console.log(json)
            if (json.code === 1) {
              this.tableData = json.data
              this.loading = false
              this.showTable = true
              console.log(this.showTable)
            }
            if (resp.data.data[0] != null) {
              this.registerForm.problemReason = resp.data.data[0].problemReason
              this.registerForm.process = resp.data.data[0].problemProcess
              this.registerForm.resolveWay = resp.data.data[0].problemSolution
              if (resp.data.data[0].isResolve === 1) {
                this.show = true
                this.registerForm.isResolve = true
                this.buttonDisplay = 'none'
                this.readOnly = true
                var temp = new Date(resp.data.data[0].gmtCreate.replace('.000+08:00', '')) - new Date(this.$route.query.claimTime)
                var days = Math.floor(temp / (60 * 60 * 24 * 1000))
                var hours = Math.floor((temp % (60 * 60 * 24 * 1000)) / (60 * 60 * 1000))
                var minutes = Math.floor((temp % (60 * 60 * 24 * 1000)) % (60 * 60 * 1000) / (60 * 1000))
                if (days > 0) {
                  this.handleTime = days + '天 '
                }
                if (hours > 0) {
                  this.handleTime += hours + '小时 '
                }
                if (minutes > 0) {
                  this.handleTime += minutes + '分钟'
                }
                if (days < 1 && hours < 1 && minutes < 1) {
                  this.handleTime = 0 + '分钟'
                }
              } else {
                this.registerForm.isResolve = false
              }
              this.registerForm.problemType = Number(resp.data.data[0].problemType)
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
  },
  actions: {},
  components: {}
}
</script>
<style lang="scss" scoped>
    .tableHeaderColor {
        font-size: 20;
    }
    .queryleft {
        float: left;
    }

    .queryright {
        float: right;
    }

    .title-bar-description {
        margin-bottom: 0px;
        margin-top: -5px;
    }

    /deep/ .el-input__prefix {
        margin-top: -3px;
    }

    .dark-main-background {
        margin-top: 10px;
    }

    .card-header {
        background-color: #fff;
    }

    /deep/ .el-tabs__nav {
        width: 100%;
    }

    .fromadd {
        width: 60%;
    }

    .fromadd .el-form-item {
        text-align: center;
    }

    .queryCenter {
        text-align: center;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .formqueryleft {
        float: left;
    }
</style>
