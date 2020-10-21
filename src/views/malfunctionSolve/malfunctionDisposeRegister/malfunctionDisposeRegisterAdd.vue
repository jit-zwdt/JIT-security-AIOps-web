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
      <div class="card dark-main-background" v-if="showTable">
        <div
            class="title-bar card-header dark-main-background dark-white-color"
            style="margin-top:-10px !important;height:40px"
        >
          <div class="queryleft">
            <p class="title-bar-description" style>
              <span>处理过程</span>
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
          <el-table-column label="序号" prop="num" min-width="10%" :resizable="false"></el-table-column>
          <el-table-column label="故障类型" prop="problemType" min-width="10%" :resizable="false"
                           :formatter="problemTypeFormat"></el-table-column>
          <el-table-column label="故障原因" prop="problemReason" min-width="25%" :resizable="false"></el-table-column>
          <el-table-column label="解决方式" prop="problemSolution" min-width="25%" :resizable="false"></el-table-column>
          <el-table-column label="处理过程" prop="problemProcess" min-width="25%" :resizable="false"></el-table-column>
          <el-table-column label="登记时间" prop="gmtCreate" min-width="15%" :resizable="false"
                           :formatter="gmtCreateFormat">
          </el-table-column>
        </el-table>
      </div>
    </template>
    <template>
      <div v-if="showList">
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
                      filterable
                      v-model="registerForm.problemType"
                      placeholder="请选择"
                      class="formqueryleft"
                  >
                    <el-option
                        v-for="item in options"
                        :key="item.itemValue"
                        :label="item.itemText"
                        :value="item.itemValue"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="故障原因" prop="problemReason">
                  <el-input type="textarea" v-model="registerForm.problemReason" clearable></el-input>
                </el-form-item>
                <el-form-item label="解决方式" prop="resolveWay">
                  <el-input type="textarea" v-model="registerForm.resolveWay" clearable></el-input>
                </el-form-item>
                <el-form-item label="处理过程" prop="process">
                  <el-input type="textarea" v-model="registerForm.process" clearable></el-input>
                </el-form-item>
                <el-form-item label="已解决" prop="isResole">
                  <el-checkbox v-model="registerForm.isResolve" class="formqueryleft"></el-checkbox>
                </el-form-item>
                <el-button type="primary" @click="dialogRegister('registerForm')">登记</el-button>
              </el-form>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
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
      showList: false,
      tableData: [{
        num: '',
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
      options: [],
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
    this.axios.post(this.$api.sysManager.getDictionaryByCode + 'gzlx').then(resp => {
      var json = resp.data
      if (json.code === 1) {
        this.options = json.data
      }
    })
  },
  mounted () {
  },
  methods: {
    dialogRegister (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
      for (var i = 0; i < this.options.length; i++) {
        if (val.problemType === this.options[i].itemValue) {
          return this.options[i].itemText
        }
      }
    },
    gmtCreateFormat (val) {
      if (val.gmtCreate !== null && val.gmtCreate !== '') {
        return val.gmtCreate.replace('T', ' ')
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
      // this.$router.go(-1)
      this.$router.push('/malfunctionDisposeRegister')
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
        claimId: this.$route.query.claimId
      }
      return region
    },
    submit () {
      const region = this.makeParam()
      this.axios.post(this.$api.malfunctionSolve.addRegister, region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            if (json.data.isResolve === 1) {
              var temp = new Date(json.data.gmtCreate.replace('.000+08:00', '')) - new Date(this.$route.query.claimTime)
              var days = Math.floor(temp / (60 * 60 * 24 * 1000))
              var hours = Math.floor((temp % (60 * 60 * 24 * 1000)) / (60 * 60 * 1000))
              var minutes = Math.floor((temp % (60 * 60 * 24 * 1000)) % (60 * 60 * 1000) / (60 * 1000))
              var seconds = Math.floor(((temp % (60 * 60 * 24 * 1000)) % (60 * 60 * 1000) % (60 * 1000)) / 1000)
              if (days > 0) {
                this.handleTime += days + '天 '
              }
              if (hours > 0) {
                this.handleTime += hours + '小时 '
              }
              if (minutes > 0) {
                this.handleTime += minutes + '分钟'
              }
              if (seconds > 0) {
                this.handleTime += seconds + '秒'
              }
              if (days < 1 && hours < 1 && minutes < 1) {
                this.handleTime = seconds + '秒'
              }
            }
            const param = {
              id: this.$route.query.claimId,
              isRegister: 1,
              isResolve: json.data.isResolve,
              problemHandleTime: this.handleTime
            }
            this.axios.post(this.$api.malfunctionSolve.updateClaimAfterRegister, param).then((resp) => {
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
        this.axios.post(this.$api.malfunctionSolve.findRegisterByClaimId + claimId, {
          id: claimId
        }).then((resp) => {
          if (resp.status === 200) {
            this.showList = true
            var json = resp.data
            if (json.code === 1) {
              this.tableData = json.data
              this.loading = false
              if (this.tableData.length !== 0) {
                this.showTable = true
                for (var i = 0; i < this.tableData.length; i++) {
                  this.tableData[i].num = i + 1
                }
              }
            }
            if (resp.data.data[resp.data.data.length - 1] != null) {
              if (resp.data.data[resp.data.data.length - 1].isResolve === 1) {
                this.show = true
                this.showList = false
                this.handleTime = resp.data.data[resp.data.data.length - 1].problemHandleTime
              } else {
                this.showList = true
              }
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
  [v-cloak] {
    display: none;
  }

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
