<template>
    <el-dialog
            @opened="openDialog"
            :width="dialogWidth"
            :title="title"
            :visible.sync="addMediumDialog"
            :show-close="false"
            :close-on-click-modal="false"
            append-to-body
            :close-on-press-escape="false"
    >
        <div>
            <el-form
                    :model="serverListForm"
                    ref="serverListForm"
                    class="edit-forms fromadd"
                    label-position="right"
                    :label-width="labelWidth"
                    :rules="rules"
            >
                <el-row>
                    <el-form-item label="类型:" prop="mediatypeid">
                        <el-select v-model="serverListForm.mediatypeid" placeholder="请选择" style="width:30%" @change="getValue">
                            <el-option
                                    v-for="item in optionsType"
                                    :key="item.mediatypeid"
                                    :label="item.name"
                                    :value="item.mediatypeid" >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item  label="收件人:" prop="sendto" :rules="rules.moreNotifyOjbectEmail">
                        <el-input v-model="serverListForm.sendto" clearable placeholder="收件人"  style="width:80%"></el-input>
                    </el-form-item>
                    <div v-if="showAdd">
                        <div  v-for="(item, index) in serverListForm.moreNotifyObject" :key="item.key">
                            <el-form-item  :prop="'moreNotifyObject.' + index +'.email'" :rules="rules.moreNotifyOjbectEmail">
                                <el-input v-model="item.email"  clearable placeholder="收件人"  style="width:80%"></el-input>
                                <el-button @click="deleteRules(item, index)" type="text" size="medium " style="margin-left: 10px">移除</el-button>
                            </el-form-item>
                        </div>
                        <el-form-item>
                            <el-button type="text"  @click="addUser"><i class="iconfont icon-tianjialianxiren"></i>添加收件人</el-button>
                        </el-form-item>
                    </div>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="当启用时:" prop="period">
                            <el-input v-model="serverListForm.period" clearable style="width:80%"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="如果存在严重性则使用:" prop="severity">
                            <el-checkbox-group v-model="checkList">
                                <el-checkbox label="未分类" style="display:block;width:5px"></el-checkbox>
                                <el-checkbox label="信息" style="display:block;width:5px"></el-checkbox>
                                <el-checkbox label="警告" style="display:block;width:5px"></el-checkbox>
                                <el-checkbox label="一般严重" style="display:block;width:5px"></el-checkbox>
                                <el-checkbox label="严重" style="display:block;width:5px"></el-checkbox>
                                <el-checkbox label="灾难" style="display:block;width:5px"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-form-item label="已启用:" prop="active">
                            <el-checkbox  v-model="serverListForm.active" style="width:5px"></el-checkbox>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="closefrom()">取消</el-button>
            <el-button type="primary" @click="submitOrUpdate('serverListForm')">更新</el-button>
        </div>
    </el-dialog>
</template>
<script>
// import qs from 'qs'
// import { resetObject } from '@/utils/common'
export default {
  props: {
    userid: {},
    row: {},
    addMediumDialog: Boolean,
    dialogWidth: {
      type: String,
      default: '60rem'
    },
    title: {
      type: String,
      default: '报警媒介'
    },
    labelWidth: {
      type: String,
      default: '180px'
    }
  },
  data () {
    return {
      showAdd: true,
      tempList: ['灾难', '严重', '一般严重', '警告', '信息', '未分类'],
      optionsType: [],
      checkList: [],
      rules: {
        period: [
          { required: true, message: '请输入启用条件' }
        ],
        moreNotifyOjbectEmail: [
          { required: true, message: '请输入收件人邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的收件人邮箱地址', trigger: 'blur' }
        ]
      },
      serverListForm: {
        mediatypeid: '',
        operation: '',
        mediaid: '',
        type: '',
        period: '',
        severity: '',
        active: '',
        sendto: '',
        sendtoList: [],
        moreNotifyObject: [{
          email: ''
        }]
      },
      show: false,
      tableData: [],
      serverForm: {},
      spanChangeColor: '',
      spanredChangeColor: '',
      tempData: ''
    }
  },
  methods: {
    getValue (e) {
      if (e === '44') {
        this.showAdd = false
      } else if (e === '1') {
        this.showAdd = true
      }
      var obj = this.optionsType.find(function (item) {
        return item.mediatypeid === e
      })
      this.serverListForm.type = obj.name
    },
    addUser () {
      this.serverListForm.moreNotifyObject.push({
        email: ''
      })
    },
    deleteRules (item, index) {
      this.index = this.serverListForm.moreNotifyObject.indexOf(item)
      if (index !== -1) {
        this.serverListForm.moreNotifyObject.splice(index, 1)
      }
    },
    openDialog () {
      this.showInfo()
    },
    closefrom () {
      this.clearform()
      this.$emit('close')
    },
    clearform () {
      // resetObject(this.serverListForm)
      this.checkList = []
      this.$refs.serverListForm.resetFields()
      this.showAdd = true
    },
    submit () {
    },
    showInfo () {
      this.serverListForm.moreNotifyObject = []
      const params = {
        name: '',
        status: '',
        flag: false
      }
      this.axios.post('/mediaType/getMediaTypes', params).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.optionsType = json.data
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
        this.loading = false
      })
      if (this.row !== 1) {
        this.serverListForm.operation = '修改'
        this.serverListForm.mediaid = this.row.mediaid
        this.serverListForm.mediatypeid = this.row.mediatypeid
        this.serverListForm.type = this.row.name
        this.serverListForm.period = this.row.period
        this.serverListForm.severity = this.row.severity
        if (this.row.active === '0') {
          this.serverListForm.active = true
        }
        if (typeof this.row.sendto === 'object') {
          this.serverListForm.sendto = this.row.sendto[0]
          for (var i = 1; i < this.row.sendto.length; i++) {
            this.serverListForm.moreNotifyObject.push({ email: this.row.sendto[i] })
          }
        } else {
          this.serverListForm.sendto = this.row.sendto
        }
        var severity = this.row.severity
        var s = parseInt(severity).toString(2)
        var aa = new Array(6 - (s + '').length + 1).join('0') + s
        if (aa[0] === '1') {
          this.checkList.push('灾难')
        }
        if (aa[1] === '1') {
          this.checkList.push('严重')
        }
        if (aa[2] === '1') {
          this.checkList.push('一般严重')
        }
        if (aa[3] === '1') {
          this.checkList.push('警告')
        }
        if (aa[4] === '1') {
          this.checkList.push('信息')
        }
        if (aa[5] === '1') {
          this.checkList.push('未分类')
        }
      } else {
        this.serverListForm.mediatypeid = '1'
        this.serverListForm.type = 'Email'
        this.serverListForm.operation = '添加'
        this.serverListForm.active = true
        this.checkList = ['未分类', '信息', '警告', '一般严重', '严重', '灾难']
        this.serverListForm.period = '1-7,00:00-24:00'
      }
    },
    reloadData () {
      // this.showInfo()
    },
    chooseItems () {
      // this.chooseItemsDialog = true
    },
    formatterActive (str) {
    },
    formatterCss (str) {
      switch (str.active) {
        case '1':
          str = '<span style="color:red" >已停用</span>'
          break
        case '0':
          str = '<span style="color:green" >已启用</span>'
          break
        default:
          str = '2'
      }
      return str
    },
    submitOrUpdate (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          var list = []
          var senList = []
          senList.push(this.serverListForm.sendto)
          if (this.serverListForm.moreNotifyObject.length > 0) {
            for (var i = 0; i < this.serverListForm.moreNotifyObject.length; i++) {
              senList.push(this.serverListForm.moreNotifyObject[i].email)
            }
            this.serverListForm.sendtoList = senList
          }
          if (this.checkList.length < 1) {
            this.checkList = ['0', '0', '0', '0', '0', '0']
          } else {
            for (var j = 0; j < this.tempList.length; j++) {
              if (this.checkList.indexOf(this.tempList[j]) === -1) {
                list.push('0')
              } else {
                list.push('1')
              }
            }
          }
          if (this.serverListForm.active === true) {
            this.serverListForm.active = '0'
          } else {
            this.serverListForm.active = '1'
          }
          this.serverListForm.severity = parseInt(list.toString().replace(/,/g, ''), 2)
          this.$emit('success', this.serverListForm)
          this.clearform()
        } else {
          return false
        }
      })
    }
  },
  components: {}
}
</script>
<style lang="scss" scoped>
    .fromadd {
        width: 100%;
    }
    .queryleft {
        float: left;
    }
    .queryright {
        float: right;
    }
    /deep/ .el-table__header {
        width: 100% !important;
    }
    /deep/ .el-table {
        min-height: 1rem !important;
    }
    .changeColor {
        color: green;
    }
    .redchangeColor {
        color: red;
    }
</style>
