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
          :model="tempform"
          ref="tempform"
          class="edit-forms fromadd"
          label-position="right"
          :label-width="labelWidth"
          :disabled="!editform.buttonflag"
          :rules="rules"
        >
          <el-row :gutter="40">
            <el-col :span="100">
              <el-form-item label="监控模版：" prop="templates">
                <el-select v-model="templates" placeholder="请选择">
                  <el-option
                    v-for="item in templates"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="boundTemplate" label="已绑定模版" width="350"></el-table-column>
          </el-table>
        </template>
      </ToolBar>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closefrom()">取消</el-button>
      <el-button type="primary" @click="submitOrUpdate('tempform')" v-if="editform.buttonflag">确认</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    editform: {
      id: ''
    },
    showEditDialog: Boolean,
    dialogWidth: {
      type: String,
      default: '800px'
    },
    title: {
      type: String,
      default: '监控模版'
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
      tempform: {
        id: ''
      },
      id: '',
      rules: {
        templates: [
          { required: true, message: '请选择监控模版' }
        ]
      },
      tableData: [{
        boundTemplate: '上海市普陀区金沙江路 1518 弄'
      }, {
        boundTemplate: '上海市普陀区金沙江路 1517 弄'
      }, {
        boundTemplate: '上海市普陀区金沙江路 1519 弄'
      }, {
        boundTemplate: '上海市普陀区金沙江路 1516 弄'
      }],
      templates: null
    }
  },
  methods: {
    openDialog () {
      this.getTemplates()
    },
    closefrom () {
      // this.showfooter = true
      this.clearform()
      this.$emit('close')
    },
    clearform () {
      this.$refs.tempform.resetFields()
    },
    submitOrUpdate (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit()
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
    makeParam () {
      const region = {
        assetName: this.tempform.assetName
      }
      return region
    },
    getTemplates () {
      this.axios.post('/monitorTemplates/getTemplates').then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            console.log(json.data)
            this.templates = json.data
          }
        } else {
          this.$message({
            message: '获取模版信息失败',
            type: 'error'
          })
          this.clearform()
          this.$emit('error')
        }
      })
    }
  }
}
</script>
