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
          :model="serverListForm"
          ref="serverListForm"
          class="edit-forms fromadd"
          label-position="right"
          :label-width="labelWidth"
        >
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="资产名称：" prop="assetName">
              <el-input v-model="serverListForm.assetName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产编号：" prop="assetNumber">
              <el-input v-model="serverListForm.assetNumber" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="资产类型：" prop="assetType">
              <el-select v-model="serverListForm.assetType" placeholder="请选择">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产状态：" prop="assetState">
              <el-select v-model="serverListForm.assetState" placeholder="请选择">
                <el-option
                  v-for="item in stateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="数量：" prop="assetAmount">
              <el-input v-model="serverListForm.assetAmount" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产位置：" prop="assetLocation">
              <el-input v-model="serverListForm.assetLocation" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="资产所属人：" prop="assetBelongsPerson">
              <el-input v-model="serverListForm.assetBelongsPerson" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产所属单位：" prop="assetBelongsDept">
              <el-input v-model="serverListForm.assetBelongsDept" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="登记人：" prop="assetRegistrant">
              <el-input v-model="serverListForm.assetRegistrant" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产登记时间：" prop="assetRegisterDate">
              <el-date-picker
                v-model="serverListForm.assetRegisterDate"
                type="date"
                placeholder="资产登记时间"
                class="datetop">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="40">
          <el-col :span="12">
            <el-form-item label="资产修改时间：" prop="assetUpdateDate">
              <el-date-picker
                v-model="serverListForm.assetUpdateDate"
                type="date"
                placeholder="资产登记时间"
                class="datetop">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="资产注销时间：" prop="assetLogoutDate">
              <el-date-picker
                v-model="serverListForm.assetLogoutDate"
                type="date"
                placeholder="资产注销时间"
                class="datetop">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        </el-form>
      </ToolBar>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button type="primary" @click="submit">确认</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { resetObject } from '@/utils/common'
export default {
  props: {
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
      serverListForm: {
        assetName: '',
        assetType: '',
        assetNumber: '',
        assetState: '',
        assetAmount: '',
        assetBelongsDept: '',
        assetBelongsPerson: '',
        assetRegisterDate: '',
        assetRegistrant: '',
        assetUpdateDate: '',
        assetLocation: '',
        assetLogoutDate: ''
      },
      stateOptions: [{
        value: '0',
        label: '未用'
      }, {
        value: '1',
        label: '在用'
      }, {
        value: '2',
        label: '禁用'
      }],
      typeOptions: [{
        value: '1',
        label: '网络设备'
      }, {
        value: '2',
        label: '通讯设备'
      }, {
        value: '3',
        label: '服务器'
      }, {
        value: '4',
        label: '云平台'
      }]
    }
  },
  methods: {
    openDialog () {
      resetObject(this.serverListForm)
      this.$refs.serverListForm.resetFields()
    },
    submit () {
      this.assetState = ''
    }
  }
}
</script>
