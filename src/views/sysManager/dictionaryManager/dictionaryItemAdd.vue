<template>
    <el-dialog
            @opened="openDialog"
            :width="dialogWidth"
            :title="title"
            :visible.sync="showEditDialog"
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            append-to-body
    >
        <div>
            <ToolBar>
                <el-form
                        :model="dictionaryItemForm"
                        ref="dictionaryItemForm"
                        class="edit-forms fromadd"
                        label-position="right"
                        :label-width="labelWidth"
                        :rules="rules"
                >
                    <el-row>
                        <el-form-item label="名称：" prop="itemText">
                            <el-input  v-model="dictionaryItemForm.itemText" clearable style="width:100%"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="数据值：" prop="itemValue">
                                <el-input  v-model="dictionaryItemForm.itemValue" clearable style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="描述：" prop="description">
                                <el-input type="textarea" v-model="dictionaryItemForm.description" clearable style="width:100%"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="排序：" prop="sortOrder">
                                <el-input-number v-model="dictionaryItemForm.sortOrder" controls-position="right" :min="1"></el-input-number>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <el-form-item label="是否启用：" prop="status">
                                <el-switch
                                        v-model="dictionaryItemForm.status"
                                        :active-value="1"
                                        :inactive-value="0"
                                        active-color="#13ce66">
                                </el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </ToolBar>
        </div>
        <div slot="footer" class="dialog-footer" >
            <el-button type="primary" @click="submitOrUpdate('dictionaryItemForm')" >确认</el-button>
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
    dictId: {},
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
      num: 1,
      dictionaryItemForm: {
        itemText: '',
        itemValue: '',
        description: '',
        sortOrder: '',
        status: 1,
        dictId: ''
      },
      rules: {
        itemText: [
          { required: true, message: '名称不能为空' }
        ],
        itemValue: [
          { required: true, message: '数据值不能为空' }
        ]
      }
    }
  },
  methods: {
    openDialog () {
      console.log(this.id)
      console.log(this.dictId)
      if (this.id !== -1) {
        this.axios
          .post('/dictionary/findDictionaryItemById/' + this.id)
          .then(resp => {
            if (resp.status === 200) {
              var json = resp.data
              if (json.code === 1) {
                this.dictionaryItemForm = json.data
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
      resetObject(this.dictionaryItemForm)
      this.$refs.dictionaryItemForm.resetFields()
    },
    submitOrUpdate (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dictionaryItemForm.dictId = this.dictId
          this.submit()
        } else {
          return false
        }
      })
    },
    submit () {
      this.axios.post('/dictionary/addDictionaryItem', this.dictionaryItemForm).then((resp) => {
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
