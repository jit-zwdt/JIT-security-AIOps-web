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
                                        class="switchStyle"
                                        v-model="dictionaryItemForm.status"
                                        :active-value="1"
                                        active-text="是"
                                        :inactive-value="0"
                                        inactive-text="否"
                                        >
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
import qs from 'qs'
export default {
  props: {
    titleType: {},
    id: String,
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
    var isItemTextExisted = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('名称不可以为空'))
      }
      if (rule.originalItemText !== value) {
        setTimeout(() => {
          this.axios.post(this.$api.sysManager.checkItemText, qs.stringify({
            itemText: value,
            dictId: rule.dictId
          })).then((resp) => {
            if (resp.status === 200) {
              const json = resp.data
              if (json.code === 1) {
                if (json.data === true) {
                  callback(new Error('名称已存在！'))
                } else {
                  callback()
                }
              } else {
                callback(new Error('名称校验失败！'))
              }
            } else {
              callback(new Error('名称校验失败！'))
            }
          })
        }, 0)
      } else {
        callback()
      }
    }
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
          { required: true, validator: isItemTextExisted, originalItemText: '', dictId: '' }
        ],
        itemValue: [
          { required: true, message: '数据值不能为空' }
        ]
      }
    }
  },
  methods: {
    openDialog () {
      if (this.id !== -1) {
        this.axios
          .post(this.$api.sysManager.getDictionaryItem + this.id)
          .then(resp => {
            if (resp.status === 200) {
              var json = resp.data
              if (json.code === 1) {
                this.dictionaryItemForm = json.data
                this.rules.itemText[0].originalItemText = this.dictionaryItemForm.itemText
                this.rules.itemText[0].dictId = this.dictionaryItemForm.dictId
              }
            }
          })
      } else {
        this.rules.itemText[0].dictId = this.dictId
      }
    },
    closefrom () {
      this.clearform()
      this.$emit('close')
    },
    clearform () {
      this.rules.itemText[0].originalItemText = ''
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
      this.axios.post(this.id !== -1 ? this.$api.sysManager.updateDictionaryItem : this.$api.sysManager.addDictionaryItem, this.dictionaryItemForm).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: this.title + '成功',
              type: 'success'
            })
            this.clearform()
            this.closefrom()
            this.$emit('success')
          }
        } else {
          this.$message({
            message: this.title + '添加失败',
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
<style lang="scss" scoped>
    .fromadd {
        width: 100%;
    }
    /deep/ .switchStyle .el-switch__label {
      position: absolute;
      display: none;
      color: #fff;
    }
    /deep/ .switchStyle .el-switch__label--left {
      width: 25px;
      z-index: 1;
      left: 25px;
    }
    /deep/ .switchStyle .el-switch__label--right {
      width: 25px;
      z-index: 1;
      right: 15px;
    }
    /deep/ .switchStyle .el-switch__label.is-active {
      display: block;
    }
    /deep/ .switchStyle.el-switch .el-switch__core,
    .el-switch .el-switch__label {
      width: 50px !important;
    }
</style>
