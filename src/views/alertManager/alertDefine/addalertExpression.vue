<template>
  <el-dialog
    @opened="openDialog"
    :width="dialogWidth"
    :title="title"
    :visible.sync="addalertExpressionDialog"
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
          :rules="rules"
        >
          <el-row>
            <el-col>
              <el-form-item label="监控项" prop="name">
                <div class="queryleft" style="width:90%">
                  <el-input v-model="serverForm.name" clearable></el-input>
                </div>
                <div class="queryleft" style="width:5%;margin-left:10px">
                  <el-button @click="chooseItems()" type="text" size="small">选择</el-button>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="功能" prop="function">
                <el-select
                  v-model="functionvalue"
                  class="selectfunction"
                  filterable
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in functionvalueStatus"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="最后一个 (T)" prop="last">
                <div class="queryleft" style="width:40%">
                  <el-input v-model="serverForm.last" clearable></el-input>
                </div>
                <div class="queryleft" style="width:5%;margin-left:10px">计数</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="间隔(秒)" prop="interval">
                <div class="queryleft" style="width:40%">
                  <el-input v-model="serverForm.interval" clearable></el-input>
                </div>
                <div class="queryleft" style="width:5%;margin-left:10px">时间</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item label="结果" prop="result">
                <div class="queryleft" style="width:15%">
                  <el-select v-model="resultvalue" filterable placeholder="请选择" clearable>
                    <el-option
                      v-for="item in resultStatus"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
                <div class="queryleft" style="width:40%;margin-left:10px">
                  <el-input v-model="serverForm.result" clearable></el-input>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </ToolBar>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closefrom()">取消</el-button>
      <el-button type="primary" @click="submitOrUpdate('serverListForm')">插入</el-button>
    </div>
    <ChooseItems
      :chooseItemsDialog="chooseItemsDialog"
      @close="chooseItemsDialog = false"
      @success="reloadData"
      @error="reloadData"
    ></ChooseItems>
  </el-dialog>
</template>
<script>
import ChooseItems from '@/views/alertManager/alertDefine/chooseItems.vue'
export default {
  props: {
    addalertExpressionDialog: Boolean,
    dialogWidth: {
      type: String,
      default: '800px'
    },
    title: {
      type: String,
      default: '条件'
    },
    labelWidth: {
      type: String,
      default: '120px'
    }
  },
  data () {
    return {
      chooseItemsDialog: false,
      functionvalue: '0',
      resultvalue: '=',
      serverForm: {
        name: '',
        function: ''
      },
      functionvalueStatus: [{
        value: '0',
        label: 'last() - 最后（最近）的 T 值'
      }, {
        value: '1',
        label: 'max() - 周期 T 内的最大值'
      }],
      resultStatus: [{
        value: '=',
        label: '='
      }, {
        value: '<>',
        label: '<>'
      }],
      rules: {
        name: [{
          required: true,
          message: '请输入监控项',
          trigger: 'blur'
        }]
      },
      handleclosebind () {
        this.$parent.$parent.noReloadData()
      }
    }
  },
  methods: {
    openDialog () {
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
    },
    reloadData () {
      // this.showInfo()
    },
    chooseItems () {
      // this.chooseItemsDialog = true
    }
  },
  components: { ChooseItems }
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
.selectfunction {
  width: 100%;
}
</style>
