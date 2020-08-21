<template>
    <el-dialog
            @opened="openDialog"
            :width="dialogWidth"
            :title="title"
            :visible.sync="showEditDialog"
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
    >
        <div>
            <ToolBar>
                <el-form
                        :model="dictionaryForm"
                        ref="dictionaryForm"
                        class="edit-forms fromadd"
                        label-position="right"
                        :label-width="labelWidth"
                        :rules="rules"
                >
                    <el-row>
                        <el-form-item label="字典名称：" prop="dictName">
                            <el-input  v-model="dictionaryForm.dictName" clearable style="width:100%"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="字典编号：" prop="dictCode">
                                <el-input  v-model="dictionaryForm.dictCode" clearable style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="描述：" prop="description">
                                <el-input type="textarea" v-model="dictionaryForm.description" clearable style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </ToolBar>
        </div>
        <div slot="footer" class="dialog-footer" >
            <el-button type="primary" @click="submitOrUpdate('dictionaryForm')" >确认</el-button>
            <el-button @click="closefrom()">取消</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { resetObject } from '@/utils/common'
export default {
  props: {
    titleType: {},
    id: {},
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
      dictionaryForm: {
        dictName: '',
        dictCode: '',
        description: ''
      },
      rules: {
        dictName: [
          { required: true, message: '字典名称不能为空' }
        ],
        dictCode: [
          { required: true, message: '字典编号不能为空' }
        ]
      }
    }
  },
  methods: {
    openDialog () {
      if (this.id !== -1) {
        this.axios
          .post('/dictionary/findDictionaryById/' + this.id)
          .then(resp => {
            if (resp.status === 200) {
              var json = resp.data
              if (json.code === 1) {
                this.dictionaryForm = json.data
              }
            }
          })
      }
    },
    closefrom () {
      this.clearform()
      this.$emit('close')
    },
    clearform () {
      resetObject(this.dictionaryForm)
      this.$refs.dictionaryForm.resetFields()
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
      this.axios.post('/dictionary/addDictionary', this.dictionaryForm).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.clearform()
            this.closefrom()
            this.$emit('success')
          }
        } else {
          this.$message({
            message: '添加失败',
            type: 'error'
          })
          this.clearform()
          this.closefrom()
          this.$emit('error')
        }
      })
    }
  }
}
</script>
<style>
    .fromadd {
        width: 100%;
    }
</style>
