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
              <el-form-item label="表达式名称：" prop="cronExpressionDesc">
                <el-input v-model="form.cronExpressionDesc" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-tabs type="border-card" stretch="true">
                <el-tab-pane>
                  <span slot="label"><i class="el-icon-date"></i> 秒</span>
                  <el-row>
                    <el-col :span="24">
                      <el-radio v-model="radio" label="1">每一秒</el-radio>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-radio v-model="radio" label="1">从
                        <el-input v-model="input" size="mini" style=" width: 100px" placeholder="请输入内容"></el-input>
                        秒开始，每隔
                        <el-input v-model="input" size="mini" style=" width: 100px" placeholder="请输入内容"></el-input>
                        秒执行一次
                      </el-radio>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-radio v-model="radio" label="1">周期从
                        <el-input v-model="input" size="mini" style=" width: 100px" placeholder="请输入内容"></el-input>
                        到
                        <el-input v-model="input" size="mini" style=" width: 100px" placeholder="请输入内容"></el-input>
                        秒
                      </el-radio>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-radio v-model="radio" label="1">具体秒数<br>
                        <el-row>
                          <el-col :offset="1">
                            <el-checkbox label="00"></el-checkbox>
                            <el-checkbox label="01"></el-checkbox>
                            <el-checkbox label="02"></el-checkbox>
                            <el-checkbox label="03"></el-checkbox>
                            <el-checkbox label="04"></el-checkbox>
                            <el-checkbox label="05"></el-checkbox>
                            <el-checkbox label="06"></el-checkbox>
                            <el-checkbox label="07"></el-checkbox>
                            <el-checkbox label="08"></el-checkbox>
                            <el-checkbox label="09"></el-checkbox>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :offset="1">
                            <el-checkbox label="10"></el-checkbox>
                            <el-checkbox label="11"></el-checkbox>
                            <el-checkbox label="12"></el-checkbox>
                            <el-checkbox label="13"></el-checkbox>
                            <el-checkbox label="14"></el-checkbox>
                            <el-checkbox label="15"></el-checkbox>
                            <el-checkbox label="16"></el-checkbox>
                            <el-checkbox label="17"></el-checkbox>
                            <el-checkbox label="18"></el-checkbox>
                            <el-checkbox label="19"></el-checkbox>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :offset="1">
                            <el-checkbox label="20"></el-checkbox>
                            <el-checkbox label="21"></el-checkbox>
                            <el-checkbox label="22"></el-checkbox>
                            <el-checkbox label="23"></el-checkbox>
                            <el-checkbox label="24"></el-checkbox>
                            <el-checkbox label="25"></el-checkbox>
                            <el-checkbox label="26"></el-checkbox>
                            <el-checkbox label="27"></el-checkbox>
                            <el-checkbox label="28"></el-checkbox>
                            <el-checkbox label="29"></el-checkbox>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :offset="1">
                            <el-checkbox label="30"></el-checkbox>
                            <el-checkbox label="31"></el-checkbox>
                            <el-checkbox label="32"></el-checkbox>
                            <el-checkbox label="33"></el-checkbox>
                            <el-checkbox label="34"></el-checkbox>
                            <el-checkbox label="35"></el-checkbox>
                            <el-checkbox label="36"></el-checkbox>
                            <el-checkbox label="37"></el-checkbox>
                            <el-checkbox label="38"></el-checkbox>
                            <el-checkbox label="39"></el-checkbox>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :offset="1">
                            <el-checkbox label="40"></el-checkbox>
                            <el-checkbox label="41"></el-checkbox>
                            <el-checkbox label="42"></el-checkbox>
                            <el-checkbox label="43"></el-checkbox>
                            <el-checkbox label="44"></el-checkbox>
                            <el-checkbox label="45"></el-checkbox>
                            <el-checkbox label="46"></el-checkbox>
                            <el-checkbox label="47"></el-checkbox>
                            <el-checkbox label="48"></el-checkbox>
                            <el-checkbox label="49"></el-checkbox>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :offset="1">
                            <el-checkbox label="50"></el-checkbox>
                            <el-checkbox label="51"></el-checkbox>
                            <el-checkbox label="52"></el-checkbox>
                            <el-checkbox label="53"></el-checkbox>
                            <el-checkbox label="54"></el-checkbox>
                            <el-checkbox label="55"></el-checkbox>
                            <el-checkbox label="56"></el-checkbox>
                            <el-checkbox label="57"></el-checkbox>
                            <el-checkbox label="58"></el-checkbox>
                            <el-checkbox label="59"></el-checkbox>
                          </el-col>
                        </el-row>
                      </el-radio>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane>
                  <span slot="label"><i class="el-icon-date"></i> 分</span>
                  <el-row>
                    <el-col :span="24">
                      <el-radio v-model="radio" label="1">每一分</el-radio>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-radio v-model="radio" label="1">从
                        <el-input v-model="input" size="mini" style=" width: 100px" placeholder="请输入内容"></el-input>
                        分开始，每隔
                        <el-input v-model="input" size="mini" style=" width: 100px" placeholder="请输入内容"></el-input>
                        分执行一次
                      </el-radio>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-radio v-model="radio" label="1">周期从
                        <el-input v-model="input" size="mini" style=" width: 100px" placeholder="请输入内容"></el-input>
                        到
                        <el-input v-model="input" size="mini" style=" width: 100px" placeholder="请输入内容"></el-input>
                        分
                      </el-radio>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-radio v-model="radio" label="1">具体分钟数<br>
                        <el-row>
                          <el-col :offset="1">
                            <el-checkbox label="00"></el-checkbox>
                            <el-checkbox label="01"></el-checkbox>
                            <el-checkbox label="02"></el-checkbox>
                            <el-checkbox label="03"></el-checkbox>
                            <el-checkbox label="04"></el-checkbox>
                            <el-checkbox label="05"></el-checkbox>
                            <el-checkbox label="06"></el-checkbox>
                            <el-checkbox label="07"></el-checkbox>
                            <el-checkbox label="08"></el-checkbox>
                            <el-checkbox label="09"></el-checkbox>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :offset="1">
                            <el-checkbox label="10"></el-checkbox>
                            <el-checkbox label="11"></el-checkbox>
                            <el-checkbox label="12"></el-checkbox>
                            <el-checkbox label="13"></el-checkbox>
                            <el-checkbox label="14"></el-checkbox>
                            <el-checkbox label="15"></el-checkbox>
                            <el-checkbox label="16"></el-checkbox>
                            <el-checkbox label="17"></el-checkbox>
                            <el-checkbox label="18"></el-checkbox>
                            <el-checkbox label="19"></el-checkbox>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :offset="1">
                            <el-checkbox label="20"></el-checkbox>
                            <el-checkbox label="21"></el-checkbox>
                            <el-checkbox label="22"></el-checkbox>
                            <el-checkbox label="23"></el-checkbox>
                            <el-checkbox label="24"></el-checkbox>
                            <el-checkbox label="25"></el-checkbox>
                            <el-checkbox label="26"></el-checkbox>
                            <el-checkbox label="27"></el-checkbox>
                            <el-checkbox label="28"></el-checkbox>
                            <el-checkbox label="29"></el-checkbox>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :offset="1">
                            <el-checkbox label="30"></el-checkbox>
                            <el-checkbox label="31"></el-checkbox>
                            <el-checkbox label="32"></el-checkbox>
                            <el-checkbox label="33"></el-checkbox>
                            <el-checkbox label="34"></el-checkbox>
                            <el-checkbox label="35"></el-checkbox>
                            <el-checkbox label="36"></el-checkbox>
                            <el-checkbox label="37"></el-checkbox>
                            <el-checkbox label="38"></el-checkbox>
                            <el-checkbox label="39"></el-checkbox>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :offset="1">
                            <el-checkbox label="40"></el-checkbox>
                            <el-checkbox label="41"></el-checkbox>
                            <el-checkbox label="42"></el-checkbox>
                            <el-checkbox label="43"></el-checkbox>
                            <el-checkbox label="44"></el-checkbox>
                            <el-checkbox label="45"></el-checkbox>
                            <el-checkbox label="46"></el-checkbox>
                            <el-checkbox label="47"></el-checkbox>
                            <el-checkbox label="48"></el-checkbox>
                            <el-checkbox label="49"></el-checkbox>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :offset="1">
                            <el-checkbox label="50"></el-checkbox>
                            <el-checkbox label="51"></el-checkbox>
                            <el-checkbox label="52"></el-checkbox>
                            <el-checkbox label="53"></el-checkbox>
                            <el-checkbox label="54"></el-checkbox>
                            <el-checkbox label="55"></el-checkbox>
                            <el-checkbox label="56"></el-checkbox>
                            <el-checkbox label="57"></el-checkbox>
                            <el-checkbox label="58"></el-checkbox>
                            <el-checkbox label="59"></el-checkbox>
                          </el-col>
                        </el-row>
                      </el-radio>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane>
                  <span slot="label"><i class="el-icon-date"></i> 时</span>
                  <el-row>
                    <el-col :span="24">
                      <el-radio v-model="radio" label="1">每一小时</el-radio>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-radio v-model="radio" label="1">从
                        <el-input v-model="input" size="mini" style=" width: 100px" placeholder="请输入内容"></el-input>
                        分开始，每隔
                        <el-input v-model="input" size="mini" style=" width: 100px" placeholder="请输入内容"></el-input>
                        小时执行一次
                      </el-radio>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-radio v-model="radio" label="1">周期从
                        <el-input v-model="input" size="mini" style=" width: 100px" placeholder="请输入内容"></el-input>
                        到
                        <el-input v-model="input" size="mini" style=" width: 100px" placeholder="请输入内容"></el-input>
                        小时
                      </el-radio>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <el-radio v-model="radio" label="1">具体小时数<br>
                        <el-row>
                          <el-col :offset="1">
                            <el-checkbox label="00"></el-checkbox>
                            <el-checkbox label="01"></el-checkbox>
                            <el-checkbox label="02"></el-checkbox>
                            <el-checkbox label="03"></el-checkbox>
                            <el-checkbox label="04"></el-checkbox>
                            <el-checkbox label="05"></el-checkbox>
                            <el-checkbox label="06"></el-checkbox>
                            <el-checkbox label="07"></el-checkbox>
                            <el-checkbox label="08"></el-checkbox>
                            <el-checkbox label="09"></el-checkbox>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :offset="1">
                            <el-checkbox label="10"></el-checkbox>
                            <el-checkbox label="11"></el-checkbox>
                            <el-checkbox label="12"></el-checkbox>
                            <el-checkbox label="13"></el-checkbox>
                            <el-checkbox label="14"></el-checkbox>
                            <el-checkbox label="15"></el-checkbox>
                            <el-checkbox label="16"></el-checkbox>
                            <el-checkbox label="17"></el-checkbox>
                            <el-checkbox label="18"></el-checkbox>
                            <el-checkbox label="19"></el-checkbox>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :offset="1">
                            <el-checkbox label="20"></el-checkbox>
                            <el-checkbox label="21"></el-checkbox>
                            <el-checkbox label="22"></el-checkbox>
                            <el-checkbox label="23"></el-checkbox>
                          </el-col>
                        </el-row>
                      </el-radio>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane>
                  <span slot="label"><i class="el-icon-date"></i> 天</span>
                  我的行程
                </el-tab-pane>
                <el-tab-pane>
                  <span slot="label"><i class="el-icon-date"></i> 月</span>
                  我的行程
                </el-tab-pane>
                <el-tab-pane>
                  <span slot="label"><i class="el-icon-date"></i> 年</span>
                  我的行程
                </el-tab-pane>
              </el-tabs>
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

    export default {
        props: {
            showEditDialog: Boolean,
            requestData: {
                id: String
            },
            dialogWidth: {
                type: String,
                default: '600px'
            },
            title: {
                type: String,
                default: ''
            },
            labelWidth: {
                type: String,
                default: '125px'
            }
        },
        data() {
            return {
                loading: true,
                showfooter: true,
                isDisable: false,
                form: {
                    id: '',
                    cronExpressionDesc: ''
                },
                rules: {
                    cronExpressionDesc: [
                        {required: true, message: '请填写表达式名称'}
                    ]
                }
            }
        },
        methods: {
            openDialog() {
                const id = this.requestData.id
                if (id !== undefined && id !== '') {
                    this.axios.get(this.$api.sysManager.getCronExpression + id).then((resp) => {
                        if (resp.status === 200) {
                            const json = resp.data
                            if (json.code === 1) {
                                this.form = json.data
                            } else {
                                this.$message({
                                    message: '获取信息失败！',
                                    type: 'error'
                                })
                            }
                        } else {
                            this.$message({
                                message: '获取信息失败！',
                                type: 'error'
                            })
                        }
                    })
                }
            },
            closefrom() {
                this.clearform()
                this.$emit('close')
                this.isDisable = false
            },
            clearform() {
                this.$refs.form.resetFields()
                this.form.id = ''
                this.requestData.id = ''
            },
            submitOrUpdate() {
                this.isDisable = true
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.axios.post(this.$api.sysManager.addCronExpression, this.form).then((resp) => {
                            if (resp.status === 200) {
                                var json = resp.data
                                if (json.code === 1) {
                                    this.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    })
                                    this.$emit('success')
                                    this.closefrom()
                                } else {
                                    this.$message({
                                        message: json.msg,
                                        type: 'error'
                                    })
                                    this.isDisable = false
                                    return false
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

<style lang="scss" scoped>
  /deep/ .el-checkbox {
    margin-right: 15px
  }

  /deep/ .el-checkbox__label {
    padding-left: 2px;
  }

</style>
