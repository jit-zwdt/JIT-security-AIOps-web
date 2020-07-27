<template>
  <div>
    <template>
      <div class="card dark-main-background">
        <div
          class="title-bar card-header dark-main-background dark-white-color"
          style="margin-top:-10px !important;height:40px"
        >
          <div class="queryleft">
            <p class="title-bar-description" style>
              <span>添加</span>
            </p>
          </div>
          <div class="queryright" style="margin-top:-5px !important;height:40px">
            <el-button @click="backfrom()" size="mini">返回</el-button>
          </div>
        </div>
        <el-tabs type="border-card">
          <el-tab-pane label="触发器">
            <div class="queryCenter">
              <el-form
                :model="serverForm"
                ref="serverForm"
                class="edit-forms fromadd"
                label-position="right"
                label-width="150px"
                :rules="editFormRules"
              >
                <el-form-item label="触发器原型ID" prop="triggerid" v-if="show">
                  <el-input v-model="serverForm.triggerid" clearable></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="description">
                  <el-input v-model="serverForm.description" clearable></el-input>
                </el-form-item>
                <el-form-item label="Operational data" prop="opdata">
                  <el-input v-model="serverForm.opdata" clearable></el-input>
                </el-form-item>
                <el-form-item label="严重性" prop="priority">
                  <el-radio-group v-model="serverForm.priority" size="small" class="formqueryleft">
                    <el-radio-button label="0">未分类</el-radio-button>
                    <el-radio-button label="1">信息</el-radio-button>
                    <el-radio-button label="2">警告</el-radio-button>
                    <el-radio-button label="3">一般严重</el-radio-button>
                    <el-radio-button label="4">严重</el-radio-button>
                    <el-radio-button label="5">灾难</el-radio-button>
                  </el-radio-group>
                  <!--0 - (default 默认) not classified; 未分类；1 - information; 信息；2 - warning; 警告；3 - average; 一般严重；4 - high; 严重；5 - disaster. 灾难。 -->
                </el-form-item>
                <el-form-item label="表达式" prop="expression">
                  <el-input type="textarea" v-model="serverForm.expression" clearable></el-input>
                </el-form-item>
                <el-form-item label="事件成功迭代" prop="recovery_mode">
                  <el-radio-group v-model="serverForm.recovery_mode" size="small" class="formqueryleft">
                    <el-radio-button label="0">表达式</el-radio-button>
                    <el-radio-button label="1">恢复表达式</el-radio-button>
                    <el-radio-button label="2">无</el-radio-button>
                  </el-radio-group>
                  <!-- 正常事件生成模式:0 - 表达式； 1 - 恢复表达式；2 - None. 无-->
                </el-form-item>
                <el-form-item label="恢复表达式" prop="recovery_expression">
                  <el-input type="textarea" v-model="serverForm.recovery_expression" clearable></el-input>
                  <!-- 生成的触发器恢复表达式。-->
                </el-form-item>
                <el-form-item label="问题事件生成模式" prop="type">
                  <el-input v-model="serverForm.type" clearable></el-input>
                  <!-- 触发器原型是否可以生成多个异常事件: 0 -  不生成多个事件；1 - 生成多个事件。-->
                </el-form-item>
                <el-form-item label="事件成功关闭" prop="correlation_mode">
                  <el-input v-model="serverForm.correlation_mode" clearable></el-input>
                  <!-- 正常事件关闭0 - (default 默认) All problems; 所有异常 1 - All problems if tag values match. 匹配标签值的所有异常。-->
                </el-form-item>
                <el-form-item label="匹配标记" prop="correlation_tag">
                  <el-input v-model="serverForm.correlation_tag" clearable></el-input>
                </el-form-item>
                <el-form-item label="允许手动关闭" prop="manual_close">
                  <el-input v-model="serverForm.manual_close" clearable></el-input>
                  <!-- 0不允许 1允许-->
                </el-form-item>
                <el-form-item label="URL" prop="url">
                  <el-input v-model="serverForm.url" clearable></el-input>
                  <!-- 关联到触发器原型的URL -->
                </el-form-item>
                <el-form-item label="描述" prop="comments">
                  <el-input v-model="serverForm.comments" clearable></el-input>
                </el-form-item>
                <el-form-item label="已启用" prop="status">
                  <el-input v-model="serverForm.status" clearable></el-input>
                  <!--触发器原型是否在启用状态或禁用状态：0 - (default 默认) enabled; 已启用；1 - disabled. 已禁用。 -->
                </el-form-item>
                <el-form-item label="触发器原型父模板的ID" prop="templateid" v-if="show">
                  <el-input v-model="serverForm.templateid" clearable></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane label="标记">4444</el-tab-pane>
          <el-tab-pane label="依赖关系">5555</el-tab-pane>
        </el-tabs>
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false,
      serverForm: {
        priority: '0',
        recovery_mode: '0'
      },
      editFormRules: {
        description: [{
          required: true,
          message: '请输入名称',
          trigger: 'blur'
        }],
        expression: [{
          required: true,
          message: '请输入表达式',
          trigger: 'blur'
        }]
      }
    }
  },
  created () {
    // this.showInfo()
  },
  methods: {
    reloadData () {
      this.showInfo()
    },
    showInfo (str) {
      this.loading = true
      this.tableData = this.tableDataclear
      const _this = this
      this.setTimeoutster = window.setTimeout(() => { _this.showInfoTimeout() }, 300)
    },
    showInfoTimeout (str) {
      const region = {
        hostids: [this.$route.query.hostId],
        name: this.nameTop
      }
      this.axios.post('/item/getItemInfoList', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.tableData = json.data
            this.currentPage = 1
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
        this.loading = false
      })
    },
    backfrom () {
      this.$router.go(-1) // 返回上一层
    }
  },
  actions: {
  },
  components: {}
}
</script>
<style lang="scss" scoped>
.queryleft {
  float: left;
}
.queryright {
  float: right;
}
.title-bar-description {
  margin-bottom: 0px;
  margin-top: -5px;
}
/deep/.el-input__prefix {
  margin-top: -3px;
}
.dark-main-background {
  margin-top: 10px;
}
.card-header {
  background-color: #fff;
}
/deep/.el-tabs__nav {
  width: 100%;
}
.fromadd {
  width: 60%;
}
.fromadd .el-form-item {
  text-align: center;
}
.queryCenter {
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
}
.formqueryleft {
  float: left;
}
</style>
