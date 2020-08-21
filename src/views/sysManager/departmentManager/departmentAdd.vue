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
      <H6 v-if="reqestData.parentId !== '0' && reqestData.parentId !== undefined">上级部门：{{reqestData.parentName}}</H6>
      <ToolBar>
        <el-form
            :model="form"
            ref="form"
            class="edit-forms fromadd"
            label-position="right"
            :label-width="labelWidth"
            :disabled="false"
            :rules="rules"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="机构/部门名称：" prop="departName">
                <el-input v-model="form.departName" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="部门编码：" prop="departCode">
                <el-input v-model="form.departCode" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话：" prop="mobile">
                <el-input v-model="form.mobile" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="传真：" prop="fax">
                <el-input v-model="form.fax" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地址：" prop="address">
                <el-input v-model="form.address" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="机构类别：" prop="departCategory">
                <el-radio-group v-model="form.departCategory">
                  <el-radio label="1">组织机构</el-radio>
                  <el-radio label="2">岗位</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态：" prop="status">
                <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="英文名：" prop="departNameEn">
                <el-input v-model="form.departNameEn" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="缩写：" prop="departNameAbbr">
                <el-input v-model="form.departNameAbbr" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="备注：" prop="remark">
                <el-input v-model="form.remark" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排序：" prop="departOrder">
                <el-input v-model="form.departOrder" oninput="value=value.replace(/[^\d]/g,'')" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="描述：" prop="remark">
                <el-input v-model="form.description" type="textarea" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </ToolBar>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closefrom()">取消</el-button>
      <el-button type="primary" @click="submitOrUpdate()" :disabled="isDisable">保存</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { isExisted } from './validator.js'
export default {
  props: {
    showEditDialog: Boolean,
    reqestData: {
      parentName: String,
      parentId: String,
      id: String
    },
    dialogWidth: {
      type: String,
      default: '800px'
    },
    title: {
      type: String,
      default: '添加部门'
    },
    labelWidth: {
      type: String,
      default: '125px'
    }
  },
  data () {
    return {
      loading: true,
      showfooter: true,
      isDisable: false,
      form: {
        id: '',
        parentId: '',
        departName: '',
        departCode: '',
        mobile: '',
        fax: '',
        address: '',
        departCategory: '1',
        status: 1,
        departNameEn: '',
        departNameAbbr: '',
        remark: '',
        departOrder: '',
        description: ''
      },
      rules: {
        departName: [
          { required: true, message: '请填写部门名称' }
        ],
        departCode: [
          { required: true, message: '请填写部门编码' }, {
            validator: isExisted,
            trigger: 'blur',
            extend: ''// 自定义字段
          }
        ]
      }
    }
  },
  methods: {
    openDialog () {
      this.form.parentId = this.reqestData.parentId
      const id = this.reqestData.id
      if (id !== undefined && id !== '') {
        this.axios.get('/sys/department/getDepartment/' + id).then((resp) => {
          if (resp.status === 200) {
            const json = resp.data
            if (json.code === 1) {
              this.form = json.data
              this.rules.departCode[1].extend = json.data.id
            } else {
              this.$message({
                message: '获取部门信息失败！',
                type: 'error'
              })
            }
          } else {
            this.$message({
              message: '获取部门信息失败！',
              type: 'error'
            })
          }
        })
      }
    },
    closefrom () {
      this.clearform()
      this.$emit('close')
      this.isDisable = false
    },
    clearform () {
      this.rules.departCode[1].extend = ''
      for (var key in this.reqestData) {
        delete this.reqestData[key]
      }
      this.$refs.form.resetFields()
    },
    submitOrUpdate () {
      this.isDisable = true
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.axios.post('/sys/department/addDepartment', this.form).then((resp) => {
            if (resp.status === 200) {
              var json = resp.data
              if (json.code === 1) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                })
                this.$emit('success')
                this.closefrom()
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
        } else {
          this.isDisable = false
          return false
        }
      })
    }
  }
}
</script>
