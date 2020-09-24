<template>
  <el-dialog
    @opened="openDialog"
    :width="dialogWidth"
    :title="title"
    :visible.sync="showEditDialog"
    :show-close="true"
    :close-on-click-modal="false"
  >
    <div>
      <ToolBar>
        <el-form
          :model="serverListForm"
          ref="serverListForm"
          class="edit-forms fromadd"
          label-position="right"
          :label-width="labelWidth"
          :rules="rules"
        >
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="名称：" prop="name">
                <el-select v-model="serverListForm.name" placeholder="请选择">
                  <el-option
                    v-for="item in nameOptions"
                    :key="item.id"
                    :label="item.type"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </ToolBar>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closefrom()">取消</el-button>
      <el-button type="primary" @click="submitOrUpdate('serverListForm')">确认</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { resetObject } from '@/utils/common'
import api from '@/api/api'
export default {
  props: {
    dataform: {
      id: '',
      flag: ''
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
      serverListForm: {
        id: ''
      },
      id: '',
      nameOptions: [
        {
          id: '',
          type: ''
        }
      ],
      rules: {
        name: [
          { required: true, message: '请输入名称' }
        ]
      },
      handleclosebind () {
        this.$parent.$parent.noReloadData()
      }
    }
  },
  methods: {
    openDialog () {
      // this.showInfo(this.dataform.id)
    },
    closefrom () {
      // this.showfooter = true
      this.clearform()
      this.$emit('close')
    },
    clearform () {
      resetObject(this.serverListForm)
      this.$refs.serverListForm.resetFields()
    },
    submitOrUpdate (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
      const region = this.makeParam()
      this.axios.post(api.assetsManager.assetsList.assetsAdd.addAssets, region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.clearform()
            this.$emit('success')
            // this.$router.push({ path: '/assetsManager/assetsList' })
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
    update () {
      const region = ''
      this.axios.put(api.assetsManager.assetsList.assetsAdd.updateAssets + this.assetform.id, region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this.clearform()
            this.$emit('success')
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
    },
    showInfo (id) {
      if (id != null && id !== '') {
        this.axios.post('/getHostInfo', '', {
          id: this.id
        }).then((resp) => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              this.nameOptions = json.data
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
  }
}
</script>
