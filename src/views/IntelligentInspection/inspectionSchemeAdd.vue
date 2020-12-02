<template>
  <el-dialog
    @opened="openDialog"
    :width="dialogWidth"
    :title="title"
    :visible.sync="showEditDialog"
    :before-close="handleclosebind"
    :show-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div>
      <ToolBar>
        <el-form
          :model="serverForm"
          ref="serverForm"
          class="edit-forms fromadd"
          label-position="right"
          :label-width="labelWidth"
          :rules="rules"
        >
          <el-row>
            <el-form-item v-if="dataform.flag !== '2'" label="巡检计划名称:" prop="schemeName">
              <el-input
                v-model="serverForm.schemeName"
                placeholder="请输入巡检计划名称"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="定时巡检时间:" prop="timerTask">
              <el-select
                v-model="serverForm.timerTask"
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in timerTaskoptionsType"
                  :key="item.cronExpression"
                  :label="item.cronExpressionDesc"
                  :value="item.cronExpression"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col>
              <el-table
                :data="tableData"
                style="width: 100%; border: 1px solid #ebeef5"
                min-height="40"
              >
                <el-table-column
                  prop="hostid"
                  label="hostid"
                  v-if="show"
                ></el-table-column>
                <el-table-column
                  prop="triggerid"
                  label="triggerid"
                  v-if="show"
                ></el-table-column>
                <el-table-column
                  prop="hostname"
                  label="主机名称"
                  min-width="30%"
                >
                </el-table-column>
                <el-table-column
                  prop="description"
                  label="告警项名称"
                  :show-overflow-tooltip="true"
                  min-width="60%"
                ></el-table-column>
                <el-table-column label="操作" min-width="10%">
                  <template slot-scope="scope">
                    <el-button
                      @click="deleteRow(scope.$index)"
                      type="text"
                      size="small"
                      >移除</el-button
                    >
                  </template>
                </el-table-column>
              </el-table>
              <div class="queryleft" style="margin-left: 10px">
                <el-button @click="addItem()" type="text" size="small"
                  >添加</el-button
                >
              </div>
              <InspectionSchemeItemAdd
                :addItemDialog="addItemDialog"
                @close="addItemDialog = false"
                @success="reloadData"
                @error="reloadData"
              ></InspectionSchemeItemAdd>
            </el-col>
          </el-row>
        </el-form>
      </ToolBar>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closefrom()">取消</el-button>
      <el-button type="primary" @click="submitOrUpdate('serverForm')"
        >保存</el-button
      >
    </div>
  </el-dialog>
</template>
<script>
import { resetObject } from '@/utils/common'
import InspectionSchemeItemAdd from '@/views/IntelligentInspection/inspectionSchemeItemAdd.vue'
export default {
  props: {
    dataform: {
      id: '',
      flag: '',
      scheduleId: ''
    },
    showEditDialog: Boolean,
    dialogWidth: {
      type: String,
      default: '800px'
    },
    title: {
      type: String
    },
    labelWidth: {
      type: String,
      default: '120px'
    }
  },
  data () {
    return {
      addItemDialog: false,
      show: false,
      serverForm: {
        id: '',
        timerTask: '',
        schemeName: ''
      },
      rules: {
        schemeName: [
          { required: true, message: '请输入巡检计划名称' }
        ],
        timerTask: [
          { required: true, message: '请选择定时巡检时间' }
        ]
      },
      tableData: [],
      handleclosebind () {
        this.$parent.$parent.noReloadData()
      },
      hostinfotbale: [],
      // 巡检时间的 Type 数组 里面封存的是动态的数据
      timerTaskoptionsType: [],
      // 编辑的名称数据
      schemeName: {},
      id: ''
    }
  },
  components: { InspectionSchemeItemAdd },
  created () {
    this.showInfo()
  },
  methods: {
    openDialog () {
      // this.showInfo()
      // 打开的时候进行查询定时巡检时间的数据进行添加到下拉框中
      this.setTimerTaskoptionsType()
      // 如果传入的 dataform.flag === '2' 的时候那就是修改 修改需要调用回显数据的方法
      if (this.dataform.flag === '2') {
        // 回显数据
        const id = this.dataform.scheduleId
        if (id !== undefined && id !== '') {
          this.axios.get(this.$api.sysManager.getScheduleTask + id).then((resp) => {
            if (resp.status === 200) {
              const json = resp.data
              if (json.code === 1) {
                this.serverForm.timerTask = json.data.cronExpression
                this.id = json.data.id
                const jsonParam = JSON.parse(json.data.jsonParam)
                this.tableData = jsonParam.info
                this.schemeName = jsonParam.schemeName
              } else {
                this.$message({
                  message: '获取任务信息失败！',
                  type: 'error'
                })
              }
            } else {
              this.$message({
                message: '获取任务信息失败！',
                type: 'error'
              })
            }
          })
        }
      }
    },
    addItem () {
      this.addItemDialog = true
    },
    // 刷新巡检时间的数据
    setTimerTaskoptionsType () {
      // 调用后端代码查询动态的巡检时间数据添加到代码中
      this.timerTaskoptionsType = []
      this.axios.post(this.$api.inspectionManager.getCronExpressionObject).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.timerTaskoptionsType = json.data
          }
        }
      })
    },
    closefrom () {
      // this.showfooter = true
      this.clearform()
      this.$emit('close')
    },
    clearform () {
      resetObject(this.serverForm)
      this.$refs.serverForm.resetFields()
      // 清空添加的数据
      this.tableData = []
    },
    submitOrUpdate (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.tableData.length === 0) {
            this.$message({
              message: '请添加巡检对象信息',
              type: 'error'
            })
            return false
          }
          if (this.dataform.flag === '1') {
            this.submit()
          } else if (this.dataform.flag === '2') {
            this.update()
          }
        } else {
          return false
        }
      })
    },
    submit () {
      const paramInfo = {
        schemeName: this.serverForm.schemeName,
        timerTask: this.serverForm.timerTask,
        info: this.tableData
      }
      const param = new URLSearchParams()
      param.append('param', JSON.stringify(paramInfo))
      this.axios.post(this.$api.inspectionManager.addTimerTaskInfo, param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.$emit('success')
          }
        } else {
          this.$message({
            message: '保存失败',
            type: 'error'
          })
          this.$emit('error')
        }
      })
      // 数据清空
      this.clearform()
    },
    update () {
      // 修改的代码跟添加的代码差不多只需要传入的参数多了一个 id
      // 调用添加进行这条数据的添加
      const paramInfo = {
        schemeName: this.schemeName,
        timerTask: this.serverForm.timerTask,
        info: this.tableData
      }
      const param = new URLSearchParams()
      param.append('param', JSON.stringify(paramInfo))
      param.append('id', this.id)
      this.axios.post(this.$api.inspectionManager.addTimerTaskInfo, param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '保存成功',
              type: 'success'
            })
            this.$emit('success')
          }
        } else {
          this.$message({
            message: '保存失败',
            type: 'error'
          })
          this.$emit('error')
        }
      })
      // 数据清空
      this.clearform()
    },
    showInfo () {
      const param = new URLSearchParams()
      param.append('id', '')
      this.axios.post(this.$api.inspectionManager.inspectionGetHostInfo, param).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.hostinfotbale = json.data
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
          this.$emit('error')
        }
      })
    },
    reloadData (value) {
      console.log(value)
      value.forEach(element => {
        this.tableData.push({
          hostid: element.hostid,
          hostname: element.hostname,
          triggerid: element.triggerid,
          description: element.description
        })
      })
      this.addItemDialog = false
      this.tableData = this.unique(this.tableData)
      this.sortList(this.tableData)
    },
    unique (arr) {
      const res = new Map()
      const newarr = arr.filter((arr) => !res.has(arr.triggerid) && res.set(arr.triggerid, 1))
      return newarr
    },
    sortList (lists) {
      return lists.sort((a, b) => {
        // return a['hostid'].localeCompare(b['hostid'])
        return a.triggerid - b.triggerid
      })
    },
    showHostname (id) {
      var name = ''
      this.hostinfotbale.forEach(element => {
        if (element.hostId === id) {
          name = element.objectName
        }
      })
      return name
    },
    deleteRow (index) {
      this.tableData.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.fromadd {
  width: 100%;
}
</style>
