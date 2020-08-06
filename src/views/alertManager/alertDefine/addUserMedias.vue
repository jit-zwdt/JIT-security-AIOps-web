<template>
  <el-dialog
    @opened="openDialog"
    :width="dialogWidth"
    :title="title"
    :visible.sync="addUserMediasDialog"
    :before-close="handleclosebind"
    :show-close="true"
    :close-on-click-modal="false"
  >
    <div>
      <ToolBar>
        <el-form
          :model="serverForm"
          ref="serverForm"
          class="edit-forms fromadd"
          label-position="right"
          :label-width="labelWidth"
        >
          <el-row>
            <el-col>
              <el-form-item label="报警媒介">
                <el-table
                  :data="tableData"
                  style="width: 100%;border:1px solid #EBEEF5"
                  min-height="40"
                >
                  <el-table-column prop="userid" label="ID" min-width="10%" v-if="show"></el-table-column>
                  <el-table-column prop="mediaid" label="媒体ID" min-width="10%" v-if="show"></el-table-column>
                  <el-table-column prop="mediatypeid" label="媒体类型ID" min-width="10%" v-if="show"></el-table-column>
                  <el-table-column prop="name" label="类型" min-width="10%"></el-table-column>
                  <el-table-column prop="sendto" label="收件人" min-width="15%"></el-table-column>
                  <el-table-column prop="period" label="当启用时" min-width="20%"></el-table-column>
                  <el-table-column prop="severity" label="如果存在严重性则使用" min-width="38%">
                    <template slot-scope="scope">
                      <div v-html="makeMonitorTypeItems(scope.row)"></div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="active" label="Status" min-width="12%">
                    <template slot-scope="scope">
                      <el-link
                        type="primary"
                        @click="showPossessionInfo(scope.row)"
                        v-html="formatterCss(scope.row)"
                      ></el-link>
                    </template>
                  </el-table-column>
                  <el-table-column label="动作" min-width="10%">
                    <template slot-scope="scope">
                      <el-button @click="deleteRow(scope.$index)" type="text" size="small">移除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="queryleft" style="margin-left:10px">
                  <el-button @click="addRow()" type="text" size="small">添加</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </ToolBar>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closefrom()">取消</el-button>
      <el-button type="primary" @click="submitOrUpdate('serverListForm')">更新</el-button>
    </div>
  </el-dialog>
</template>
<script>
import qs from 'qs'
export default {
  props: {
    userid: {},
    addUserMediasDialog: Boolean,
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
      default: '5rem'
    }
  },
  data () {
    return {
      show: false,
      tableData: [],
      serverForm: {},
      handleclosebind () {
        this.$parent.$parent.noReloadData()
      },
      spanChangeColor: '',
      spanredChangeColor: ''
    }
  },
  methods: {
    openDialog () {
      this.showInfo()
    },
    closefrom () {
      // this.showfooter = true
      this.clearform()
      this.$emit('close')
    },
    clearform () {
      // resetObject(this.serverListForm)
      // this.$refs.serverListForm.resetFields()
    },
    submit () {
    },
    showInfo () {
      var userid = this.userid
      this.axios.post('/user/getUserAndMediaInfo', qs.stringify({
        userid: userid
      })).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.tableData = json.data
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
        this.loading = false
      })
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
    makeMonitorTypeItems (row) {
      var html = ''
      var severity = parseInt(row.severity)
      var severityString = Number(severity.toString(2))
      var severityNum = this.fillZero(severityString)
      console.log(severityNum)
      var one = severityNum.substring(0, 1)
      console.log(one)
      var two = severityNum.substring(1, 2)
      console.log(two)
      var three = severityNum.substring(2, 3)
      console.log(three)
      var four = severityNum.substring(3, 4)
      console.log(four)
      var five = severityNum.substring(4, 5)
      console.log(five)
      var six = severityNum.substring(5, 6)
      console.log(six)
      if (six === '1') {
        html = html + '<el-button type="primary" style="background-color:#97AAB3;border: 1px solid rgba(31, 44, 51, 0.2)" title="未分类">未</el-button>'
      } else {
        html = html + '<el-button type="primary" style="color: #acbbc2;background-color: #ebebeb;border: 1px solid rgba(31, 44, 51, 0.2)" title="未分类">未</el-button>'
      }
      if (five === '1') {
        html = html + '<el-button type="primary" style="background-color:#7499FF;border: 1px solid rgba(31, 44, 51, 0.2)" title="信息">信</el-button>'
      } else {
        html = html + '<el-button type="primary" style="color: #acbbc2;background-color: #ebebeb;border: 1px solid rgba(31, 44, 51, 0.2)" title="信息">信</el-button>'
      }
      if (four === '1') {
        html = html + '<el-button type="primary" style="background-color:#FFC859;border: 1px solid rgba(31, 44, 51, 0.2)" title="警告">警</el-button>'
      } else {
        html = html + '<el-button type="primary" style="color: #acbbc2;background-color: #ebebeb;border: 1px solid rgba(31, 44, 51, 0.2)" title="警告">警</el-button>'
      }
      if (three === '1') {
        html = html + '<el-button type="primary" style="background-color:#FFA059;border: 1px solid rgba(31, 44, 51, 0.2)" title="一般严重">一</el-button>'
      } else {
        html = html + '<el-button type="primary" style="color: #acbbc2;background-color: #ebebeb;border: 1px solid rgba(31, 44, 51, 0.2)" title="一般严重">一</el-button>'
      }
      if (two === '1') {
        html = html + '<el-button type="primary" style="background-color:#E97659;border: 1px solid rgba(31, 44, 51, 0.2)" title="严重">严</el-button>'
      } else {
        html = html + '<el-button type="primary" style="color: #acbbc2;background-color: #ebebeb;border: 1px solid rgba(31, 44, 51, 0.2)" title="严重">严</el-button>'
      }
      if (one === '1') {
        html = html + '<el-button type="primary" style="background-color:#E45959;border: 1px solid rgba(31, 44, 51, 0.2)" title="灾难">灾</el-button>'
      } else {
        html = html + '<el-button type="primary" style="color: #acbbc2;background-color: #ebebeb;border: 1px solid rgba(31, 44, 51, 0.2)" title="灾难">灾</el-button>'
      }
      return html
    },
    fillZero (p) {
      return new Array(6 - (p + '').length + 1).join('0') + p
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
