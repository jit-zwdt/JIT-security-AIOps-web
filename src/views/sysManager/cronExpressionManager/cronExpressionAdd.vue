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
              <el-tabs type="border-card">
                <el-tab-pane>
                  <span slot="label"><i class="el-icon-date"></i> 秒</span>
                  <el-radio-group @change="modifySecond" v-model="form.cron.second.cronEvery">
                    <el-row>
                      <el-col :span="24">
                        <el-radio label="1">每一秒</el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-radio label="2">从
                          <el-input v-model.number="form.cron.second.incrementStart" size="mini" style=" width: 100px" @blur="modifySecond('2')" :disabled="readOnlyStatus.second.cronEvery_2 ? false : 'disabled'"
                                    placeholder="请输入内容"></el-input>
                          秒开始，每隔
                          <el-input v-model.number="form.cron.second.incrementIncrement" size="mini" style=" width: 100px" @blur="modifySecond('2')" :disabled="readOnlyStatus.second.cronEvery_2 ? false : 'disabled'"
                                    placeholder="请输入内容"></el-input>
                          秒执行一次
                        </el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-radio label="3">周期从
                          <el-input v-model.number="form.cron.second.rangeStart" size="mini" style=" width: 100px" @blur="modifySecond('3')" :disabled="readOnlyStatus.second.cronEvery_3 ? false : 'disabled'"
                                    placeholder="请输入内容"></el-input>
                          到
                          <el-input v-model.number="form.cron.second.rangeEnd" size="mini" style=" width: 100px" @blur="modifySecond('3')" :disabled="readOnlyStatus.second.cronEvery_3 ? false : 'disabled'"
                                    placeholder="请输入内容"></el-input>
                          秒
                        </el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <el-radio label="4">具体秒数<br>
                          <el-checkbox-group @change="modifySecond('4')" :disabled="readOnlyStatus.second.cronEvery_4 ? false : 'disabled'" v-model="form.cron.second.specificSpecific">
                            <el-row>
                              <el-col :offset="1">
                                <el-checkbox label="0"></el-checkbox>
                                <el-checkbox label="1" style="margin-left: 8px"></el-checkbox>
                                <el-checkbox label="2" style="margin-left: 7px"></el-checkbox>
                                <el-checkbox label="3" style="margin-left: 7px"></el-checkbox>
                                <el-checkbox label="4" style="margin-left: 8px"></el-checkbox>
                                <el-checkbox label="5" style="margin-left: 8px"></el-checkbox>
                                <el-checkbox label="6" style="margin-left: 8px"></el-checkbox>
                                <el-checkbox label="7" style="margin-left: 7px"></el-checkbox>
                                <el-checkbox label="8" style="margin-left: 8px"></el-checkbox>
                                <el-checkbox label="9" style="margin-left: 8px"></el-checkbox>
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
                          </el-checkbox-group>
                        </el-radio>
                      </el-col>
                    </el-row>
                  </el-radio-group>
                </el-tab-pane>
                <el-tab-pane>
                  <span slot="label"><i class="el-icon-date"></i> 分</span>
                  <el-radio-group @change="modifyMinute" v-model="form.cron.minute.cronEvery">
                    <el-row>
                      <el-col :span="24">
                        <el-radio label="1">每一分</el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-radio label="2">从
                          <el-input v-model.number="form.cron.minute.incrementStart" size="mini" style=" width: 100px" @blur="modifyMinute('2')" :disabled="readOnlyStatus.minute.cronEvery_2 ? false : 'disabled'"
                                    placeholder="请输入内容"></el-input>
                          分开始，每隔
                          <el-input v-model.number="form.cron.minute.incrementIncrement" size="mini" style=" width: 100px" @blur="modifyMinute('2')" :disabled="readOnlyStatus.minute.cronEvery_2 ? false : 'disabled'"
                                    placeholder="请输入内容"></el-input>
                          分执行一次
                        </el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-radio label="3">周期从
                          <el-input v-model.number="form.cron.minute.rangeStart" size="mini" style=" width: 100px" @blur="modifyMinute('3')" :disabled="readOnlyStatus.minute.cronEvery_3 ? false : 'disabled'"
                                    placeholder="请输入内容"></el-input>
                          到
                          <el-input v-model.number="form.cron.minute.rangeEnd" size="mini" style=" width: 100px" @blur="modifyMinute('3')" :disabled="readOnlyStatus.minute.cronEvery_3 ? false : 'disabled'"
                                    placeholder="请输入内容"></el-input>
                          分
                        </el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <el-radio label="4">具体分钟数<br>
                          <el-checkbox-group @change="modifyMinute('4')" :disabled="readOnlyStatus.minute.cronEvery_4 ? false : 'disabled'" v-model="form.cron.minute.specificSpecific">
                            <el-row>
                              <el-col :offset="1">
                                <el-checkbox label="0"></el-checkbox>
                                <el-checkbox label="1" style="margin-left: 8px"></el-checkbox>
                                <el-checkbox label="2" style="margin-left: 7px"></el-checkbox>
                                <el-checkbox label="3" style="margin-left: 7px"></el-checkbox>
                                <el-checkbox label="4" style="margin-left: 8px"></el-checkbox>
                                <el-checkbox label="5" style="margin-left: 8px"></el-checkbox>
                                <el-checkbox label="6" style="margin-left: 8px"></el-checkbox>
                                <el-checkbox label="7" style="margin-left: 7px"></el-checkbox>
                                <el-checkbox label="8" style="margin-left: 8px"></el-checkbox>
                                <el-checkbox label="9" style="margin-left: 8px"></el-checkbox>
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
                          </el-checkbox-group>
                        </el-radio>
                      </el-col>
                    </el-row>
                  </el-radio-group>
                </el-tab-pane>
                <el-tab-pane>
                  <span slot="label"><i class="el-icon-date"></i> 时</span>
                  <el-radio-group @change="modifyHour" v-model="form.cron.hour.cronEvery">
                    <el-row>
                      <el-col :span="24">
                        <el-radio label="1">每时</el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-radio label="2">从
                          <el-input v-model.number="form.cron.hour.incrementStart" size="mini" style=" width: 100px" @blur="modifyHour('2')" :disabled="readOnlyStatus.hour.cronEvery_2 ? false : 'disabled'"
                                    placeholder="请输入内容"></el-input>
                          时开始，每隔
                          <el-input v-model.number="form.cron.hour.incrementIncrement" size="mini" style=" width: 100px" @blur="modifyHour('2')" :disabled="readOnlyStatus.hour.cronEvery_2 ? false : 'disabled'"
                                    placeholder="请输入内容"></el-input>
                          小时执行一次
                        </el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-radio label="3">周期从
                          <el-input v-model.number="form.cron.hour.rangeStart" size="mini" style=" width: 100px" @blur="modifyHour('3')" :disabled="readOnlyStatus.hour.cronEvery_3 ? false : 'disabled'"
                                    placeholder="请输入内容"></el-input>
                          到
                          <el-input v-model.number="form.cron.hour.rangeEnd" size="mini" style=" width: 100px" @blur="modifyHour('3')" :disabled="readOnlyStatus.hour.cronEvery_3 ? false : 'disabled'"
                                    placeholder="请输入内容"></el-input>
                          小时
                        </el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <el-radio label="4">具体小时数<br>
                          <el-checkbox-group @change="modifyHour('4')" v-model="form.cron.hour.specificSpecific" :disabled="readOnlyStatus.hour.cronEvery_4 ? false : 'disabled'">
                            <el-row>
                              <el-col :offset="1">
                                <el-checkbox label="0"></el-checkbox>
                                <el-checkbox label="1" style="margin-left: 8px"></el-checkbox>
                                <el-checkbox label="2" style="margin-left: 7px"></el-checkbox>
                                <el-checkbox label="3" style="margin-left: 7px"></el-checkbox>
                                <el-checkbox label="4" style="margin-left: 8px"></el-checkbox>
                                <el-checkbox label="5" style="margin-left: 8px"></el-checkbox>
                                <el-checkbox label="6" style="margin-left: 8px"></el-checkbox>
                                <el-checkbox label="7" style="margin-left: 7px"></el-checkbox>
                                <el-checkbox label="8" style="margin-left: 8px"></el-checkbox>
                                <el-checkbox label="9" style="margin-left: 8px"></el-checkbox>
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
                          </el-checkbox-group>
                        </el-radio>
                      </el-col>
                    </el-row>
                  </el-radio-group>
                </el-tab-pane>
                <el-tab-pane>
                  <span slot="label"><i class="el-icon-date"></i> 天</span>
                  <el-radio-group @change="modifyDay" v-model="form.cron.day.cronEvery">
                    <el-row>
                      <el-col :span="24">
                        <el-radio label="1">不指定</el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-radio label="2">每天</el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-radio label="3">从
                          <el-input v-model.number="form.cron.day.incrementStart" size="mini" style=" width: 100px" @blur="modifyDay('3')" :disabled="readOnlyStatus.day.cronEvery_3 ? false : 'disabled'"
                                    placeholder="请输入内容"></el-input>
                          天开始，每隔
                          <el-input v-model.number="form.cron.day.incrementIncrement" size="mini" style=" width: 100px" @blur="modifyDay('3')" :disabled="readOnlyStatus.day.cronEvery_3 ? false : 'disabled'"
                                    placeholder="请输入内容"></el-input>
                          天执行一次
                        </el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-radio label="4">周期从
                          <el-input v-model.number="form.cron.day.rangeStart" size="mini" style=" width: 100px" @blur="modifyDay('4')" :disabled="readOnlyStatus.day.cronEvery_4 ? false : 'disabled'"
                                    placeholder="请输入内容"></el-input>
                          到
                          <el-input v-model.number="form.cron.day.rangeEnd" size="mini" style=" width: 100px" @blur="modifyDay('4')" :disabled="readOnlyStatus.day.cronEvery_4 ? false : 'disabled'"
                                    placeholder="请输入内容"></el-input>
                          天
                        </el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-radio v-model="form.cron.day.cronLastSpecificDomDay" label="5">本月最后一天</el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-radio v-model="form.cron.day.cronLastSpecificWorkDay" label="6">本月最后一个工作日</el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <el-radio label="7">具体天数<br>
                          <el-checkbox-group @change="modifyDay('7')" v-model="form.cron.day.specificSpecific" :disabled="readOnlyStatus.day.cronEvery_7 ? false : 'disabled'">
                            <el-row>
                              <el-col :offset="1">
                                <el-checkbox label="1"></el-checkbox>
                                <el-checkbox label="2" style="margin-left: 8px"></el-checkbox>
                                <el-checkbox label="3" style="margin-left: 7px"></el-checkbox>
                                <el-checkbox label="4" style="margin-left: 7px"></el-checkbox>
                                <el-checkbox label="5" style="margin-left: 8px"></el-checkbox>
                                <el-checkbox label="6" style="margin-left: 8px"></el-checkbox>
                                <el-checkbox label="7" style="margin-left: 8px"></el-checkbox>
                                <el-checkbox label="8" style="margin-left: 7px"></el-checkbox>
                                <el-checkbox label="9" style="margin-left: 8px"></el-checkbox>
                                <el-checkbox label="10" style="margin-left: 8px"></el-checkbox>
                              </el-col>
                            </el-row>
                            <el-row>
                              <el-col :offset="1">
                                <el-checkbox label="11"></el-checkbox>
                                <el-checkbox label="12"></el-checkbox>
                                <el-checkbox label="13"></el-checkbox>
                                <el-checkbox label="14"></el-checkbox>
                                <el-checkbox label="15"></el-checkbox>
                                <el-checkbox label="16"></el-checkbox>
                                <el-checkbox label="17"></el-checkbox>
                                <el-checkbox label="18"></el-checkbox>
                                <el-checkbox label="19"></el-checkbox>
                                <el-checkbox label="20"></el-checkbox>
                              </el-col>
                            </el-row>
                            <el-row>
                              <el-col :offset="1">
                                <el-checkbox label="21"></el-checkbox>
                                <el-checkbox label="22"></el-checkbox>
                                <el-checkbox label="23"></el-checkbox>
                                <el-checkbox label="24"></el-checkbox>
                                <el-checkbox label="25"></el-checkbox>
                                <el-checkbox label="26"></el-checkbox>
                                <el-checkbox label="27"></el-checkbox>
                                <el-checkbox label="28"></el-checkbox>
                                <el-checkbox label="29"></el-checkbox>
                                <el-checkbox label="30"></el-checkbox>
                              </el-col>
                            </el-row>
                            <el-row>
                              <el-col :offset="1">
                                <el-checkbox label="31"></el-checkbox>
                              </el-col>
                            </el-row>
                          </el-checkbox-group>
                        </el-radio>
                      </el-col>
                    </el-row>
                  </el-radio-group>
                </el-tab-pane>
                <el-tab-pane>
                  <span slot="label"><i class="el-icon-date"></i> 月</span>
                  <el-radio-group @change="modifyMonth" v-model="form.cron.month.cronEvery">
                    <el-row>
                      <el-col :span="24">
                        <el-radio label="1">每月</el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-radio label="2">从
                          <el-input v-model.number="form.cron.month.incrementStart" size="mini" style=" width: 100px" @blur="modifyMonth('2')" :disabled="readOnlyStatus.month.cronEvery_4 ? false : 'disabled'"
                                    placeholder="请输入内容"></el-input>
                          月开始，每隔
                          <el-input v-model.number="form.cron.month.incrementIncrement" size="mini" style=" width: 100px" @blur="modifyMonth('2')" :disabled="readOnlyStatus.month.cronEvery_4 ? false : 'disabled'"
                                    placeholder="请输入内容"></el-input>
                          个月执行一次
                        </el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-radio label="3">周期从
                          <el-input v-model.number="form.cron.month.rangeStart" size="mini" style=" width: 100px" @blur="modifyMonth('3')" :disabled="readOnlyStatus.month.cronEvery_4 ? false : 'disabled'"
                                    placeholder="请输入内容"></el-input>
                          到
                          <el-input v-model.number="form.cron.month.rangeEnd" size="mini" style=" width: 100px" @blur="modifyMonth('3')" :disabled="readOnlyStatus.month.cronEvery_4 ? false : 'disabled'"
                                    placeholder="请输入内容"></el-input>
                          月之间
                        </el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <el-radio label="4">具体月数<br>
                          <el-checkbox-group @change="modifyMonth('4')" v-model="form.cron.month.specificSpecific" :disabled="readOnlyStatus.month.cronEvery_4 ? false : 'disabled'">
                            <el-row>
                              <el-col :offset="1">
                                <el-checkbox label="1"></el-checkbox>
                                <el-checkbox label="2"></el-checkbox>
                                <el-checkbox label="3"></el-checkbox>
                                <el-checkbox label="4"></el-checkbox>
                                <el-checkbox label="5"></el-checkbox>
                                <el-checkbox label="6"></el-checkbox>
                                <el-checkbox label="7"></el-checkbox>
                                <el-checkbox label="8"></el-checkbox>
                                <el-checkbox label="9"></el-checkbox>
                                <el-checkbox label="10"></el-checkbox>
                                <el-checkbox label="11"></el-checkbox>
                                <el-checkbox label="12"></el-checkbox>
                              </el-col>
                            </el-row>
                          </el-checkbox-group>
                        </el-radio>
                      </el-col>
                    </el-row>
                  </el-radio-group>
                </el-tab-pane>
                <el-tab-pane>
                  <span slot="label"><i class="el-icon-date"></i> 周</span>
                  <el-radio-group @change="modifyWeek" v-model="form.cron.week.cronEvery">
                    <el-row>
                      <el-col :span="24">
                        <el-radio label="1">不指定</el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-radio label="2">每周</el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-radio label="3">从
                          <el-select style="width: 100px;" size="mini" v-model="form.cron.week.incrementStart" placeholder="请选择星期" @change="modifyWeek('3')" :disabled="readOnlyStatus.week.cronEvery_3 ? false : 'disabled'">
                            <el-option v-for="(item, index) in weekConstant" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                          </el-select>
                          开始，每隔
                          <el-input v-model="form.cron.week.incrementIncrement" size="mini" style=" width: 100px" @blur="modifyWeek('3')" :disabled="readOnlyStatus.week.cronEvery_3 ? false : 'disabled'"
                                    placeholder="请输入内容"></el-input>
                          周执行一次
                        </el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-radio label="4">周期从星期
                          <el-select style="width: 100px;" size="mini" v-model="form.cron.week.rangeStart" placeholder="请选择星期" @change="modifyWeek('4')" :disabled="readOnlyStatus.week.cronEvery_4 ? false : 'disabled'">
                            <el-option v-for="(item, index) in weekConstant" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                          </el-select>
                          到
                          <el-select style="width: 100px;" size="mini" v-model="form.cron.week.rangeEnd" placeholder="请选择星期" @change="modifyWeek('4')" :disabled="readOnlyStatus.week.cronEvery_4 ? false : 'disabled'">
                            <el-option v-for="(item, index) in weekConstant" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                          </el-select>
                          之间
                        </el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-radio label="5">本月最后一个星期
                          <el-select style="width: 100px;" size="mini" v-model="form.cron.week.cronLastWeek" placeholder="请选择星期" @change="modifyWeek('5')" :disabled="readOnlyStatus.week.cronEvery_5 ? false : 'disabled'">
                            <el-option v-for="(item, index) in weekConstant" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                          </el-select>
                        </el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-radio label="6">第
                          <el-input size="mini" v-model="form.cron.week.cronWhatWeek" style=" width: 100px" @blur="modifyWeek('6')" placeholder="请输入内容" :disabled="readOnlyStatus.week.cronEvery_6 ? false : 'disabled'"></el-input>
                          周的星期
                          <el-select style="width: 100px;" size="mini" v-model="form.cron.week.cronWhatWeekDay" placeholder="请选择星期" @change="modifyWeek('6')" :disabled="readOnlyStatus.week.cronEvery_6 ? false : 'disabled'">
                            <el-option v-for="(item, index) in weekConstant" :key="index" :label="item.label" :value="item.value">
                            </el-option>
                          </el-select>
                        </el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <el-radio label="7">具体星期几<br>
                          <el-checkbox-group @change="modifyWeek('7')" v-model="form.cron.week.specificSpecific" :disabled="readOnlyStatus.week.cronEvery_7 ? false : 'disabled'">
                            <el-row>
                              <el-col :offset="1">
                                <el-checkbox v-for="(item, index) in weekConstant" :key="index" :label="item.value">{{ item.label }}</el-checkbox>
                              </el-col>
                            </el-row>
                          </el-checkbox-group>
                        </el-radio>
                      </el-col>
                    </el-row>
                  </el-radio-group>
                </el-tab-pane>
              </el-tabs>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="text-align: center;font-weight: bolder;">
              <span>{{ getCronString() }}</span>
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
  data () {
    return {
      // 加载的样式
      loading: true,
      // 无用的数据
      showfooter: true,
      // 是否可用编辑 , 保存
      isDisable: false,
      // 声明数据的方法
      form: {
        id: '',
        cronExpressionDesc: '',
        cron: {
          second: {
            cronEvery: '1',
            incrementStart: 3,
            incrementIncrement: 5,
            rangeStart: 0,
            rangeEnd: 59,
            specificSpecific: ['0']
          },
          minute: {
            cronEvery: '1',
            incrementStart: 3,
            incrementIncrement: 5,
            rangeStart: 0,
            rangeEnd: 59,
            specificSpecific: ['0']
          },
          hour: {
            cronEvery: '1',
            incrementStart: 3,
            incrementIncrement: 5,
            rangeStart: 0,
            rangeEnd: 23,
            specificSpecific: ['0']
          },
          day: {
            cronEvery: '2',
            incrementStart: 1,
            incrementIncrement: 1,
            rangeStart: 1,
            rangeEnd: 31,
            specificSpecific: ['1'],
            cronLastSpecificDomDay: 1,
            cronLastSpecificWorkDay: 1
          },
          week: {
            cronEvery: '1',
            incrementStart: 1,
            incrementIncrement: 1,
            rangeStart: 1,
            rangeEnd: 7,
            specificSpecific: ['1'],
            // 本月最后一个星期 ?
            cronLastWeek: 1,
            // 第几周
            cronWhatWeek: 1,
            // 星期几
            cronWhatWeekDay: 1
          },
          month: {
            cronEvery: '1',
            incrementStart: 3,
            incrementIncrement: 5,
            rangeStart: 1,
            rangeEnd: 12,
            specificSpecific: ['1']
          }
        }
      },
      // 校验规则
      rules: {
        cronExpressionDesc: [
          { required: true, message: '请填写表达式名称' }
        ]
      },
      // 周常量池
      weekConstant: [
        {
          label: '星期日',
          value: 1
        },
        {
          label: '星期一',
          value: 2
        },
        {
          label: '星期二',
          value: 3
        },
        {
          label: '星期三',
          value: 4
        },
        {
          label: '星期四',
          value: 5
        },
        {
          label: '星期五',
          value: 6
        },
        {
          label: '星期六',
          value: 7
        }
      ],
      // cron 数组
      cronArray: ['*', '*', '*', '*', '*', '?'],
      // readOnly 属性的动态操作属性
      readOnlyStatus: {
        second: {
          cronEvery_1: true,
          cronEvery_2: false,
          cronEvery_3: false,
          cronEvery_4: false
        },
        minute: {
          cronEvery_1: true,
          cronEvery_2: false,
          cronEvery_3: false,
          cronEvery_4: false
        },
        hour: {
          cronEvery_1: true,
          cronEvery_2: false,
          cronEvery_3: false,
          cronEvery_4: false
        },
        day: {
          cronEvery_1: false,
          cronEvery_2: true,
          cronEvery_3: false,
          cronEvery_4: false,
          cronEvery_5: false,
          cronEvery_6: false,
          cronEvery_7: false
        },
        week: {
          cronEvery_1: true,
          cronEvery_2: false,
          cronEvery_3: false,
          cronEvery_4: false,
          cronEvery_5: false,
          cronEvery_6: false,
          cronEvery_7: false
        },
        month: {
          cronEvery_1: true,
          cronEvery_2: false,
          cronEvery_3: false,
          cronEvery_4: false
        }
      }
    }
  },
  methods: {
    // 打开页面的时候回显数据的方法 如果传递的 requestData.id 不为空执行
    openDialog () {
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
    // 关闭 dialog 弹出框
    closefrom () {
      this.clearform()
      this.$emit('close')
      this.isDisable = false
    },
    // 刷新数据 清空数据
    clearform () {
      // 清空 表单赋值
      Object.assign(this.$data.form.cron, this.$options.data().form.cron)
      // 清空 cron 数组
      Object.assign(this.$data.cronArray, this.$options.data().cronArray)
      // 刷新 readOnly 状态
      Object.assign(this.$data.readOnlyStatus, this.$options.data().readOnlyStatus)
      this.$refs.form.resetFields()
      this.form.id = ''
      this.requestData.id = ''
    },
    // 添加或者修改的方法
    submitOrUpdate () {
      this.isDisable = true
      // 如果 cron 的值有不合法 的话就不发送请求了
      if (this.form.cron.second.specificSpecific.length > 0 &&
          this.form.cron.minute.specificSpecific.length > 0 &&
          this.form.cron.hour.specificSpecific.length > 0 &&
          this.form.cron.day.specificSpecific.length > 0 &&
          this.form.cron.week.specificSpecific.length > 0 &&
          this.form.cron.month.specificSpecific.length > 0) {
        const cronExpression = {
          id: this.form.id,
          cronExpressionDesc: this.form.cronExpressionDesc,
          cronExpression: this.parseCronArray()
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.axios.post(this.$api.sysManager.addCronExpression, cronExpression).then((resp) => {
              if (resp.status === 200) {
                var json = resp.data
                if (json.code === 1) {
                  this.$message({
                    message: '添加成功',
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
                  message: '添加失败',
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
      } else {
        this.$message.error('发送的表达式不合法')
        this.clearform()
        this.$emit('error')
      }
    },
    // 返回附带 cron表达式: 字头的 cron 字符串
    getCronString () {
      // 定义头数据
      let cronString = 'cron表达式: '
      // 进行数据的拼接
      cronString += this.parseCronArray()
      // 返回字符串
      return cronString
    },
    // 解析 cronArray 返回 cron 表达式
    parseCronArray () {
      // 定义头数据
      let cron = ''
      // 进行数据的拼接
      for (let i = 0; i < this.cronArray.length; i++) {
        // 如果是最后一个数据则不再后面加空格了
        if (i === this.cronArray.length - 1) {
          cron += this.cronArray[i]
        } else {
          cron += this.cronArray[i] + ' '
        }
      }
      // 返回字符串
      return cron
    },
    // 修改秒调用的方法
    modifySecond (cronEvery) {
      // 清空 second 表单赋值
      Object.assign(this.$data.readOnlyStatus.second, this.$options.data().readOnlyStatus.second)
      // 判断是否选中
      if (this.form.cron.second.cronEvery !== cronEvery) {
        return
      }
      // 首先移除 秒位的数组文字
      this.cronArray.splice(0, 1)
      // 声明需要添加的文字
      let secondCron = '*'
      if (cronEvery === '1') { // 每一秒
        // 修改 readonly 状态
        this.readOnlyStatus.second.cronEvery_1 = true
        secondCron = '*'
      } else if (cronEvery === '2') { // 从 ? 秒开始 , 每隔 ? 秒执行一次
        // 修改 readonly 状态
        this.readOnlyStatus.second.cronEvery_2 = true
        // 判断输入的值 是否符合 如果符合则进行重新赋值 三元运算
        this.form.cron.second.incrementStart = this.checkMinutesAndSeconds(this.form.cron.second.incrementStart) ? this.form.cron.second.incrementStart : '0'
        this.form.cron.second.incrementIncrement = this.checkMinutesAndSeconds(this.form.cron.second.incrementIncrement) ? this.form.cron.second.incrementIncrement : '59'
        // 正常的拼接 cron 字符串
        secondCron = this.form.cron.second.incrementStart + '/' + this.form.cron.second.incrementIncrement
      } else if (cronEvery === '3') { // 周期从 ? 到 ? 秒
        // 修改 readonly 状态
        this.readOnlyStatus.second.cronEvery_3 = true
        // 判断输入的值 是否符合 如果符合则进行重新赋值 三元运算
        this.form.cron.second.rangeStart = this.checkMinutesAndSeconds(this.form.cron.second.rangeStart) ? this.form.cron.second.rangeStart : '0'
        this.form.cron.second.rangeEnd = this.checkMinutesAndSeconds(this.form.cron.second.rangeEnd) ? this.form.cron.second.rangeEnd : '59'
        // 判断第一个值是否小于第二个值
        if (this.form.cron.second.rangeStart > this.form.cron.second.rangeEnd) {
          // 把大的值赋值给小的值
          this.form.cron.second.rangeStart = this.form.cron.second.rangeEnd
          this.$message.error('前面的值不能大于后面的值')
        }
        // 正常的拼接 cron 字符串
        secondCron = this.form.cron.second.rangeStart + '-' + this.form.cron.second.rangeEnd
      } else if (cronEvery === '4') { // 具体秒数
        // 修改 readonly 状态
        this.readOnlyStatus.second.cronEvery_4 = true
        // 赋值为 '' 不允许出现 '*' 拼接的情况
        secondCron = ''
        for (let i = 0; i < this.form.cron.second.specificSpecific.length; i++) {
          // 判断是不是最后一位
          if (i === this.form.cron.second.specificSpecific.length - 1) {
            // 拼接值
            secondCron += this.form.cron.second.specificSpecific[i]
          } else {
            // 拼接值
            secondCron += this.form.cron.second.specificSpecific[i] + ','
          }
        }
      }
      // 添加文字到数组的指定位置
      this.cronArray.splice(0, 0, secondCron)
    },
    // 修改分调用的方法
    modifyMinute (cronEvery) {
      // 清空 minute 表单赋值
      Object.assign(this.$data.readOnlyStatus.minute, this.$options.data().readOnlyStatus.minute)
      // 判断是否选中
      if (this.form.cron.minute.cronEvery !== cronEvery) {
        return
      }
      // 首先移除 分位的数组文字
      this.cronArray.splice(1, 1)
      // 声明需要添加的文字
      let minuteCron = '*'
      if (cronEvery === '1') { // 每一分
        // 修改 readonly 状态
        this.readOnlyStatus.minute.cronEvery_1 = true
        minuteCron = '*'
      } else if (cronEvery === '2') { // 从 ? 分开始 , 每隔 ? 分执行一次
        // 修改 readonly 状态
        this.readOnlyStatus.minute.cronEvery_2 = true
        // 判断输入的值 是否符合 如果符合则进行重新赋值 三元运算
        this.form.cron.minute.incrementStart = this.checkMinutesAndSeconds(this.form.cron.minute.incrementStart) ? this.form.cron.minute.incrementStart : '0'
        this.form.cron.minute.incrementIncrement = this.checkMinutesAndSeconds(this.form.cron.minute.incrementIncrement) ? this.form.cron.minute.incrementIncrement : '59'
        // 正常的拼接 cron 字符串
        minuteCron = this.form.cron.minute.incrementStart + '/' + this.form.cron.minute.incrementIncrement
      } else if (cronEvery === '3') { // 周期从 ? 到 ? 分
        // 修改 readonly 状态
        this.readOnlyStatus.minute.cronEvery_3 = true
        // 判断输入的值 是否符合 如果符合则进行重新赋值 三元运算
        this.form.cron.minute.rangeStart = this.checkMinutesAndSeconds(this.form.cron.minute.rangeStart) ? this.form.cron.minute.rangeStart : '0'
        this.form.cron.minute.rangeEnd = this.checkMinutesAndSeconds(this.form.cron.minute.rangeEnd) ? this.form.cron.minute.rangeEnd : '59'
        // 判断第一个值是否小于第二个值
        if (this.form.cron.minute.rangeStart > this.form.cron.minute.rangeEnd) {
          // 把大的值赋值给小的值
          this.form.cron.minute.rangeStart = this.form.cron.minute.rangeEnd
          this.$message.error('前面的值不能大于后面的值')
        }
        // 正常的拼接 cron 字符串
        minuteCron = this.form.cron.minute.rangeStart + '-' + this.form.cron.minute.rangeEnd
      } else if (cronEvery === '4') { // 具体分钟数
        // 修改 readonly 状态
        this.readOnlyStatus.minute.cronEvery_4 = true
        // 赋值为 '' 不允许出现 '*' 拼接的情况
        minuteCron = ''
        for (let i = 0; i < this.form.cron.minute.specificSpecific.length; i++) {
          // 判断是不是最后一位
          if (i === this.form.cron.minute.specificSpecific.length - 1) {
            // 拼接值
            minuteCron += this.form.cron.minute.specificSpecific[i]
          } else {
            // 拼接值
            minuteCron += this.form.cron.minute.specificSpecific[i] + ','
          }
        }
      }
      // 添加文字到数组的指定位置
      this.cronArray.splice(1, 0, minuteCron)
    },
    // 修改时调用的方法
    modifyHour (cronEvery) {
      // 清空 hour 表单赋值
      Object.assign(this.$data.readOnlyStatus.hour, this.$options.data().readOnlyStatus.hour)
      // 判断是否选中
      if (this.form.cron.hour.cronEvery !== cronEvery) {
        return
      }
      // 首先移除 时位的数组文字
      this.cronArray.splice(2, 1)
      // 声明需要添加的文字
      let horuCron = '*'
      if (cronEvery === '1') { // 每时
        // 修改 readonly 状态
        this.readOnlyStatus.hour.cronEvery_1 = true
        horuCron = '*'
      } else if (cronEvery === '2') { // 从 ? 时开始 , 每隔 ? 小时执行一次
        // 修改 readonly 状态
        this.readOnlyStatus.hour.cronEvery_2 = true
        // 判断输入的值 是否符合 如果符合则进行重新赋值 三元运算
        this.form.cron.hour.incrementStart = this.checkHour(this.form.cron.hour.incrementStart) ? this.form.cron.hour.incrementStart : '0'
        this.form.cron.hour.incrementIncrement = this.checkHour(this.form.cron.hour.incrementIncrement) ? this.form.cron.hour.incrementIncrement : '23'
        // 正常的拼接 cron 字符串
        horuCron = this.form.cron.hour.incrementStart + '/' + this.form.cron.hour.incrementIncrement
      } else if (cronEvery === '3') { // 周期从 ? 到 ? 小时
        // 修改 readonly 状态
        this.readOnlyStatus.hour.cronEvery_3 = true
        // 判断输入的值 是否符合 如果符合则进行重新赋值 三元运算
        this.form.cron.hour.rangeStart = this.checkHour(this.form.cron.hour.rangeStart) ? this.form.cron.hour.rangeStart : '0'
        this.form.cron.hour.rangeEnd = this.checkHour(this.form.cron.hour.rangeEnd) ? this.form.cron.hour.rangeEnd : '23'
        // 判断第一个值是否小于第二个值
        if (this.form.cron.hour.rangeStart > this.form.cron.hour.rangeEnd) {
          // 把大的值赋值给小的值
          this.form.cron.hour.rangeStart = this.form.cron.hour.rangeEnd
          this.$message.error('前面的值不能大于后面的值')
        }
        // 正常的拼接 cron 字符串
        horuCron = this.form.cron.hour.rangeStart + '-' + this.form.cron.hour.rangeEnd
      } else if (cronEvery === '4') { // 具体小时数
        // 修改 readonly 状态
        this.readOnlyStatus.hour.cronEvery_4 = true
        // 赋值为 '' 不允许出现 '*' 拼接的情况
        horuCron = ''
        for (let i = 0; i < this.form.cron.hour.specificSpecific.length; i++) {
          // 判断是不是最后一位
          if (i === this.form.cron.hour.specificSpecific.length - 1) {
            // 拼接值
            horuCron += this.form.cron.hour.specificSpecific[i]
          } else {
            // 拼接值
            horuCron += this.form.cron.hour.specificSpecific[i] + ','
          }
        }
      }
      // 添加文字到数组的指定位置
      this.cronArray.splice(2, 0, horuCron)
    },
    // 修改天调用的方法
    modifyDay (cronEvery) {
      // 清空 day 表单赋值
      Object.assign(this.$data.readOnlyStatus.day, this.$options.data().readOnlyStatus.day)
      // 判断是否选中
      if (this.form.cron.day.cronEvery !== cronEvery) {
        return
      }
      // 首先移除 天位的数组文字
      this.cronArray.splice(3, 1)
      // 声明需要添加的文字
      let dayCron = '*'
      if (cronEvery === '1') { // 不指定
        // 修改 readonly 状态
        this.readOnlyStatus.day.cronEvery_1 = true
        dayCron = '?'
      } else if (cronEvery === '2') { // 每天
        // 修改 readonly 状态
        this.readOnlyStatus.day.cronEvery_2 = true
        dayCron = '*'
      } else if (cronEvery === '3') { // 从 ? 天开始 , 每隔 ? 天执行一次
        // 修改 readonly 状态
        this.readOnlyStatus.day.cronEvery_3 = true
        // 判断输入的值 是否符合 如果符合则进行重新赋值 三元运算
        this.form.cron.day.incrementStart = this.checkDay(this.form.cron.day.incrementStart) ? this.form.cron.day.incrementStart : '1'
        this.form.cron.day.incrementIncrement = this.checkDay(this.form.cron.day.incrementIncrement) ? this.form.cron.day.incrementIncrement : '31'
        // 正常的拼接 cron 字符串
        dayCron = this.form.cron.day.incrementStart + '/' + this.form.cron.day.incrementIncrement
      } else if (cronEvery === '4') { // 周期从 ? 到 ? 天
        // 修改 readonly 状态
        this.readOnlyStatus.day.cronEvery_4 = true
        // 判断输入的值 是否符合 如果符合则进行重新赋值 三元运算
        this.form.cron.day.rangeStart = this.checkDay(this.form.cron.day.rangeStart) ? this.form.cron.day.rangeStart : '1'
        this.form.cron.day.rangeEnd = this.checkDay(this.form.cron.day.rangeEnd) ? this.form.cron.day.rangeEnd : '31'
        // 判断第一个值是否小于第二个值
        if (this.form.cron.day.rangeStart > this.form.cron.day.rangeEnd) {
          // 把大的值赋值给小的值
          this.form.cron.day.rangeStart = this.form.cron.day.rangeEnd
          this.$message.error('前面的值不能大于后面的值')
        }
        // 正常的拼接 cron 字符串
        dayCron = this.form.cron.day.rangeStart + '-' + this.form.cron.day.rangeEnd
      } else if (cronEvery === '5') { // 本月最后一天
        // 修改 readonly 状态
        this.readOnlyStatus.day.cronEvery_5 = true
        dayCron = 'L'
      } else if (cronEvery === '6') { // 本月最后一工作日
        // 修改 readonly 状态
        this.readOnlyStatus.day.cronEvery_6 = true
        dayCron = 'LW'
      } else if (cronEvery === '7') { // 具体天数
        // 修改 readonly 状态
        this.readOnlyStatus.day.cronEvery_7 = true
        // 赋值为 '' 不允许出现 '*' 拼接的情况
        dayCron = ''
        for (let i = 0; i < this.form.cron.day.specificSpecific.length; i++) {
          // 判断是不是最后一位
          if (i === this.form.cron.day.specificSpecific.length - 1) {
            // 拼接值
            dayCron += this.form.cron.day.specificSpecific[i]
          } else {
            // 拼接值
            dayCron += this.form.cron.day.specificSpecific[i] + ','
          }
        }
      }
      // 添加文字到数组的指定位置
      this.cronArray.splice(3, 0, dayCron)
      // 如果选中了不指定的按钮需要把周变为每周
      if (cronEvery === '1') { // 如果选中不指定
        // 把天位的文字变为每周
        this.cronArray.splice(5, 1)
        // 添加为通配符表示不指定的意思
        this.cronArray.splice(5, 0, '*')
        // 切换周的文字为不指定
        this.form.cron.week.cronEvery = '2'
      } else { // 没选中不指定
        // 赋值成功之后进行周位的不指定 因为冲突 移除周位的文字
        this.cronArray.splice(5, 1)
        // 添加为通配符表示不指定的意思
        this.cronArray.splice(5, 0, '?')
        // 切换周的文字为不指定
        this.form.cron.week.cronEvery = '1'
      }
    },
    // 修改周调用的方法
    modifyWeek (cronEvery) {
      // 清空 week 表单赋值
      Object.assign(this.$data.readOnlyStatus.week, this.$options.data().readOnlyStatus.week)
      // 判断是否选中
      if (this.form.cron.week.cronEvery !== cronEvery) {
        return
      }
      // 首先移除 周位的数组文字
      this.cronArray.splice(5, 1)
      // 声明需要添加的文字
      let weekCron = '?'
      if (cronEvery === '1') { // 不指定
        // 修改 readonly 状态
        this.readOnlyStatus.week.cronEvery_1 = true
        weekCron = '?'
      } else if (cronEvery === '2') { // 每周
        // 修改 readonly 状态
        this.readOnlyStatus.week.cronEvery_2 = true
        weekCron = '*'
      } else if (cronEvery === '3') { // 从 ? 开始 , 每隔 ? 周执行一次
        // 修改 readonly 状态
        this.readOnlyStatus.week.cronEvery_3 = true
        weekCron = this.form.cron.week.incrementStart + '/' + this.form.cron.week.incrementIncrement
      } else if (cronEvery === '4') { // 周期从 ? 到 ? 之间
        // 修改 readonly 状态
        this.readOnlyStatus.week.cronEvery_4 = true
        // 判断第一个值是否小于第二个值
        if (this.form.cron.week.rangeStart > this.form.cron.week.rangeEnd) {
          // 把大的值赋值给小的值
          this.form.cron.week.rangeStart = this.form.cron.week.rangeEnd
          this.$message.error('选择不合法')
        }
        // 正常的拼接 cron 字符串
        weekCron = this.form.cron.week.rangeStart + '-' + this.form.cron.week.rangeEnd
      } else if (cronEvery === '5') { // 本月最后一个星期 ?
        // 修改 readonly 状态
        this.readOnlyStatus.week.cronEvery_5 = true
        weekCron = this.form.cron.week.cronLastWeek + 'L'
      } else if (cronEvery === '6') { // 第 ? 周的星期 ?
        // 修改 readonly 状态
        this.readOnlyStatus.week.cronEvery_6 = true
        weekCron = this.form.cron.week.cronWhatWeekDay + '#' + this.form.cron.week.cronWhatWeek
      } else if (cronEvery === '7') { // 具体天数
        // 修改 readonly 状态
        this.readOnlyStatus.week.cronEvery_7 = true
        // 赋值为 '' 不允许出现 '*' 拼接的情况
        weekCron = ''
        for (let i = 0; i < this.form.cron.week.specificSpecific.length; i++) {
          // 判断是不是最后一位
          if (i === this.form.cron.week.specificSpecific.length - 1) {
            // 拼接值
            weekCron += this.form.cron.week.specificSpecific[i]
          } else {
            // 拼接值
            weekCron += this.form.cron.week.specificSpecific[i] + ','
          }
        }
      }
      // 添加文字到数组的指定位置
      this.cronArray.splice(5, 0, weekCron)
      // 如果选中了不指定的按钮需要把天变为每天
      if (cronEvery === '1') { // 如果选中不指定
        // 把天位的文字变为每天
        this.cronArray.splice(3, 1)
        // 添加为通配符表示不指定的意思
        this.cronArray.splice(3, 0, '*')
        // 切换天的文字为每天
        this.form.cron.day.cronEvery = '2'
      } else { // 没选中不指定
        // 赋值成功之后进行天位的不指定 因为冲突 移除天位的文字
        this.cronArray.splice(3, 1)
        // 添加为通配符表示不指定的意思
        this.cronArray.splice(3, 0, '?')
        // 切换天的文字为不指定
        this.form.cron.day.cronEvery = '1'
      }
    },
    // 修改月调用的方法
    modifyMonth (cronEvery) {
      // 清空 month 表单赋值
      Object.assign(this.$data.readOnlyStatus.month, this.$options.data().readOnlyStatus.month)
      // 判断是否选中
      if (this.form.cron.month.cronEvery !== cronEvery) {
        return
      }
      // 首先移除 月位的数组文字
      this.cronArray.splice(4, 1)
      // 声明需要添加的文字
      let monthCron = '*'
      if (cronEvery === '1') { // 每月
        // 修改 readonly 状态
        this.readOnlyStatus.month.cronEvery_1 = true
        monthCron = '*'
      } else if (cronEvery === '2') { // 从 ? 月开始 , 每隔 ? 个月执行一次
        // 修改 readonly 状态
        this.readOnlyStatus.month.cronEvery_2 = true
        // 判断输入的值 是否符合 如果符合则进行重新赋值 三元运算
        this.form.cron.month.incrementStart = this.checkMonth(this.form.cron.month.incrementStart) ? this.form.cron.month.incrementStart : '1'
        this.form.cron.month.incrementIncrement = this.checkMonth(this.form.cron.month.incrementIncrement) ? this.form.cron.month.incrementIncrement : '12'
        // 正常的拼接 cron 字符串
        monthCron = this.form.cron.month.incrementStart + '/' + this.form.cron.month.incrementIncrement
      } else if (cronEvery === '3') { // 周期从 ? 到 ? 月之间
        // 修改 readonly 状态
        this.readOnlyStatus.month.cronEvery_3 = true
        // 判断输入的值 是否符合 如果符合则进行重新赋值 三元运算
        this.form.cron.month.rangeStart = this.checkMonth(this.form.cron.month.rangeStart) ? this.form.cron.month.rangeStart : '1'
        this.form.cron.month.rangeEnd = this.checkMonth(this.form.cron.month.rangeEnd) ? this.form.cron.month.rangeEnd : '12'
        // 判断第一个值是否小于第二个值
        if (this.form.cron.month.rangeStart > this.form.cron.month.rangeEnd) {
          // 把大的值赋值给小的值
          this.form.cron.month.rangeStart = this.form.cron.month.rangeEnd
          this.$message.error('前面的值不能大于后面的值')
        }
        // 正常的拼接 cron 字符串
        monthCron = this.form.cron.month.rangeStart + '-' + this.form.cron.month.rangeEnd
      } else if (cronEvery === '4') { // 具体月数
        // 修改 readonly 状态
        this.readOnlyStatus.month.cronEvery_4 = true
        // 赋值为 '' 不允许出现 '*' 拼接的情况
        monthCron = ''
        for (let i = 0; i < this.form.cron.month.specificSpecific.length; i++) {
          // 判断是不是最后一位
          if (i === this.form.cron.month.specificSpecific.length - 1) {
            // 拼接值
            monthCron += this.form.cron.month.specificSpecific[i]
          } else {
            // 拼接值
            monthCron += this.form.cron.month.specificSpecific[i] + ','
          }
        }
      }
      // 添加文字到数组的指定位置
      this.cronArray.splice(4, 0, monthCron)
    },

    // 校验分秒
    checkMinutesAndSeconds (value) {
      // 如果值为 null 直接返回 false 不是数字
      if (value === '') {
        return false
      }
      // 如果输入的值小于 0 返回 fasle
      if (value < 0) {
        this.$message.error('输入的值不能小于 0')
        return false
      } else if (value > 59) { // 如果输入的值大于 60 返回 fasle
        this.$message.error('输入的值不能大于 59')
        return false
      }
      return true
    },
    // 校验时
    checkHour (value) {
      // 如果值为 null 直接返回 false 不是数字
      if (value === '') {
        return false
      }
      // 如果输入的值小于 0 返回 fasle
      if (value < 0) {
        this.$message.error('输入的值不能小于 0')
        return false
      } else if (value > 23) { // 如果输入的值大于 24 返回 fasle
        this.$message.error('输入的值不能大于 23')
        return false
      }
      return true
    },
    // 校验天
    checkDay (value) {
      // 如果值为 null 直接返回 false 不是数字
      if (value === '') {
        return false
      }
      // 如果输入的值小于 1 返回 fasle
      if (value < 1) {
        this.$message.error('输入的值不能小于 1')
        return false
      } else if (value > 31) { // 如果输入的值大于 31 返回 fasle
        this.$message.error('输入的值不能大于 31')
        return false
      }
      return true
    },
    // 校验月
    checkMonth (value) {
      // 如果值为 null 直接返回 false 不是数字
      if (value === '') {
        return false
      }
      // 如果输入的值小于 1 返回 fasle
      if (value < 1) {
        this.$message.error('输入的值不能小于 1')
        return false
      } else if (value > 12) { // 如果输入的值大于 12 返回 fasle
        this.$message.error('输入的值不能大于 12')
        return false
      }
      return true
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
