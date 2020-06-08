<template>
  <el-dialog
  @opened="openDialog"
  :width="dialogWidth"
  :title="title"
  :visible.sync="showEditDialog"
  :show-close="false"
  :close-on-click-modal="false"
  >
    <el-form
      :model="serverInfoForm"
      ref="serverInfoForm"
      class="edit-forms"
      label-position="left"
      :label-width="labelWidth"
    >
      <el-form-item label="服务器名称" prop="serverName">
        <el-input v-model="serverInfoForm.serverName" clearable></el-input>
      </el-form-item>
      <el-form-item label="所属地区" prop="regionName">
        <el-input v-model="serverInfoForm.regionName" clearable></el-input>
      </el-form-item>
      <el-form-item label="服务器类型" prop="serverType">
        <el-radio-group v-model="serverInfoForm.serverType">
          <el-radio label="1">应用服务器</el-radio>
          <el-radio label="2">数据库服务器</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内网ip" prop="serverInnerIp">
        <el-input v-model="serverInfoForm.serverInnerIp" clearable></el-input>
      </el-form-item>
      <el-form-item label="政务外网ip" prop="serverOuterIp">
        <el-input v-model="serverInfoForm.serverOuterIp" clearable></el-input>
      </el-form-item>
      <el-form-item label="应用类型" prop="hasOta">
        <el-switch
          v-model="serverInfoForm.hasOta"
          active-color="#13ce66"
          inactive-color="#ff4949"
          inactive-text="全流程系统"
          @change="otaOn($event, 1)">
        </el-switch>
        <span style="margin-left:10px;"></span>
        <el-switch
          style="display: inline"
          v-model="serverInfoForm.hasCw"
          active-color="#13ce66"
          inactive-color="#ff4949"
          inactive-text="综窗系统"
          @change="otaOn($event, 2)">
        </el-switch>
      </el-form-item>
      <el-form-item label="全流程端口" prop="otaPort" v-if="showOtaPort">
        <el-input v-model="serverInfoForm.otaPort" clearable></el-input>
      </el-form-item>
      <el-form-item label="综窗端口" prop="cwPort" v-if="showCwPort">
        <el-input v-model="serverInfoForm.cwPort" clearable></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button type="primary" @click="submit">确认</el-button>
    </div>
  </el-dialog>
</template>
<script>
import Menu from '@/menu/index'
import { resetObject } from '@/utils/common'
export default {
  props: {
    showEditDialog: Boolean,
    dialogWidth: {
      type: String,
      default: '700px'
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
      serverInfoForm: {
        serverName: '',
        serverInnerIp: '',
        serverOuterIp: '',
        serverType: '',
        regionName: '',
        hasOta: false,
        hasCw: false,
        otaPort: '',
        cwPort: ''
      },
      showOtaPort: false,
      showCwPort: false,
      menu: Menu
    }
  },
  methods: {
    openDialog () {
      resetObject(this.serverInfoForm)
      // this.$set(this.forms, 'serverId', null)
      this.$refs.serverInfoForm.resetFields()
    },
    submit () {
      this.serverInfoForm.hasOta = this.serverInfoForm.hasOta ? 1 : 0
      this.serverInfoForm.hasCw = this.serverInfoForm.hasOta ? 1 : 0
      this.axios.post('/server', this.serverInfoForm).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.$emit('success')
          }
        }
      })
    },
    otaOn (returnValue, param) {
      switch (param) {
        case 1:
          this.showOtaPort = returnValue
          break
        case 2:
          this.showCwPort = returnValue
          break
      }
    }
  }
}
</script>
