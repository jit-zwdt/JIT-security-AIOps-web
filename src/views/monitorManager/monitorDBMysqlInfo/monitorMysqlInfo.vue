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
              <span>{{this.$route.query.hostName}}\{{this.serverForm.agentIp}}</span>
            </p>
          </div>
          <div class="queryright" style="margin-top:-5px !important;height:40px">
            <el-button @click="backfrom()" size="mini">返回</el-button>
          </div>
        </div>
        <div class="tempList card-body">
          <div>
            <table class="dark-main-background" style="width:100%;margin-top:-5px">
              <tr style="height:40px">
                <th class="darkmainborderth">名称</th>
                <td class="darkmainbordertd">{{this.$route.query.hostName}}</td>
                <th class="darkmainborderth">监控状态</th>
                <td class="darkmainbordertd">
                  <span
                    class="label label-danger"
                    data-toggle="tooltip"
                    ata-placement="bottom"
                    v-bind:class="{changeColor:spanChangeColor,redchangeColor:spanredChangeColor}"
                    :title="makeMonitorTypeTitle()"
                  >{{this.monitorTypeValue}}</span>
                </td>
                <th class="darkmainborderth">所属主机</th>
                <td class="darkmainbordertd">{{this.$route.query.hostName}}</td>
              </tr>
              <tr style="height:40px">
                <th class="darkmainborderth">运行时间</th>
                <td class="darkmainbordertd">{{runTime}}</td>
                <th class="darkmainborderth">版本</th>
                <td class="darkmainbordertd">{{this.tomcatVersion}}</td>
                <th class="darkmainborderth">启动监控</th>
                <td class="darkmainbordertd">
                  <el-switch
                    v-model="serverForm.enableMonitor"
                    active-value="1"
                    inactive-value="0"
                    active-color="#13ce66"
                    @change="change_enableMonitor()"
                  />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </template>
    <el-tabs type="border-card" style="margin-top:5px" v-model="activeName" id="pieEcharts">
      <el-tab-pane label="概况" name="first" :key="'first'">
        <template>
          <div
            class="card dark-main-background queryleft card-width"
            v-for="(items, index) in itemstableData"
            v-bind:key="index"
          >
            <div
              class="title-bar card-header dark-main-background dark-white-color"
              style="height:40px;width:100%"
            >
              <div class="queryleft">
                <p class="title-bar-description" style>
                  <span>{{formatitemName(items.itemName)}}</span>
                </p>
              </div>
              <div class="queryright" style="margin-top:-5px !important;height:40px">
                <el-button
                  style="float: right; padding: 0px; margin-left: 5px;"
                  type="text"
                  @click="removeItems(items)"
                >
                  <i class="fa fa-remove" style="font-size: 18px;color: #979899;font-weight: 400;"></i>
                </el-button>
                <el-button
                  style="float: right; padding: 0px; margin-left: 5px;"
                  type="text"
                  @click="refreshItems(items,index)"
                >
                  <i
                    class="el-icon-refresh"
                    style="font-size: 18px;color: #979899;font-weight: 400;"
                  ></i>
                </el-button>
              </div>
            </div>
            <div class="tempList card-body">
              <div :id="getID(index)" class="echart" :onchange="getItemsData(items.itemId,index)"></div>
            </div>
          </div>
          <!--&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
          <div
                  class="card dark-main-background queryleft"
                  style="width:32.5%;margin-left:10px"
                  v-for="(items, index1) in graphstableData"
                  v-bind:key="index1"
          >
            <div
                    class="title-bar card-header dark-main-background dark-white-color"
                    style="height:40px;width:100%"
            >
              <div class="queryleft">
                <p class="title-bar-description" style>
                  <span>{{formatitemName(items.graphName)}}</span>
                </p>
              </div>
              <div class="queryright" style="margin-top:-5px !important;height:40px">
                <el-button
                        style="float: right; padding: 0px; margin-left: 5px;"
                        type="text"
                        @click="removeGraphs(items)"
                >
                  <i class="fa fa-remove" style="font-size: 18px;color: #979899;font-weight: 400;"></i>
                </el-button>
                <el-button
                        style="float: right; padding: 0px; margin-left: 5px;"
                        type="text"
                        @click="refreshGraphs(items,index1)"
                >
                  <i
                          class="el-icon-refresh"
                          style="font-size: 18px;color: #979899;font-weight: 400;"
                  ></i>
                </el-button>
              </div>
            </div>
            <div class="tempList card-body">
              <div :id="getGraphID(index1)" class="echart" :onchange="getGraphsData(items.graphId,items.graphName, index1)"></div>
            </div>
          </div>
          <!-- -&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;-->
          <div
            class="dark-main-background queryleft card-width-top"
          >
            <a
              href="javascript:void(0);"
              @click="addItems()"
              class="card card-body dark-main-background"
              style="height:392px;display: flex; justify-content: center; align-items: center; cursor: pointer;text-decoration:none;"
            >
              <div class="fa fa-plus" style="font-size: 75px;">
                <p class="text-center" style="color: #0296FE;font-size: 16px;">添加</p>
              </div>
            </a>
          </div>
        </template>
      </el-tab-pane>
      <el-tab-pane label="指标列表" name="second" :key="'second'">
        <div>
          <ToolBar>
            <div class="queryleft" style="width:100%">
              <el-col :span="6">
                <el-input type="text" v-model="nameTop" size="small" placeholder="名称" clearable></el-input>
              </el-col>
              <el-button
                type="primary"
                size="small"
                @click="showInfo() == false"
                icon="el-icon-search"
              >查询</el-button>
              <el-button
                type="primary"
                size="small"
                @click="showClear() == false"
                icon="el-icon-refresh-left"
              >重置</el-button>
            </div>
          </ToolBar>
          <el-table
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            v-loading="loading"
            border
            style="width: 100%"
            :row-style="tableRowStyle"
            :header-cell-style="tableHeaderColor"
          >
            <el-table-column label="itemid" prop="itemid" :resizable="false" v-if="show"></el-table-column>
            <el-table-column label="监控项名称" prop="name" min-width="70%"></el-table-column>
            <el-table-column label="应用集" prop="value_type" min-width="15%"></el-table-column>
            <el-table-column label="间隔" prop="delay" min-width="15%"></el-table-column>
            <el-table-column align="center" label="操作" min-width="15%" :resizable="false">
              <template slot-scope="scope">
                <el-popconfirm
                  title="是否添加指标到概况？"
                  @onConfirm="confirmSaveTrend(scope.$index, scope.row)"
                >
                  <el-button
                    size="mini"
                    type="primary"
                    slot="reference"
                    icon="fa fa-external-link"
                    circle
                    :style="{ display: checkbtn(scope.$index, scope.row) }"
                  ></el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <div class="block" style="margin-top:15px;">
            <el-pagination
              align="center"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 30, 50, 100]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.length"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="图形" name="third" :key="'third'">
        <div>
          <ToolBar>
            <div class="queryleft" style="width:100%">
              <el-col :span="6">
                <el-input type="text" v-model="nameTop" size="small" placeholder="名称" clearable></el-input>
              </el-col>
              <el-button
                      type="primary"
                      size="small"
                      @click="showGraphsInfo() == false"
                      icon="el-icon-search"
              >查询</el-button>
              <el-button
                      type="primary"
                      size="small"
                      @click="showClear() == false"
                      icon="el-icon-refresh-left"
              >重置</el-button>
              <div style="margin-left: 58%">
                <el-popover
                        placement="left"
                        width="1200"
                        trigger="click"
                        ref="gPopover"
                >
                  <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="名称" prop="name">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="图形类型">
                      <el-select v-model="form.graphtype">
                        <el-option v-for="item in graphtypeOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
                      </el-select>
                    </el-form-item>
                    <!--<el-form-item label="查看触发器">-->
                    <!--<el-checkbox v-model="form.show_legend">查看图例</el-checkbox>-->
                    <!--</el-form-item>-->
                    <el-form-item label="百分比线(左)">
                      <el-checkbox v-model="leftOption"></el-checkbox>
                      <el-input v-model="form.percent_left" v-if="leftOption === true"></el-input>
                    </el-form-item>
                    <el-form-item label="百分比线(右)">
                      <el-checkbox v-model="rightOption"></el-checkbox>
                      <el-input v-model="form.percent_right" v-if="rightOption === true"></el-input>
                    </el-form-item>
                    <el-form-item label="纵轴最小值">
                      <el-select v-model="form.ymin_type">
                        <el-option v-for="item in yOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="纵轴最大值">
                      <el-select v-model="form.ymax_type">
                        <el-option v-for="item in yOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="监控项" prop="gitems">
                      <div>
                        <el-table
                                :data="form.gitems"
                                style="width: 100%">
                          <el-table-column
                                  label="监控项id"
                                  width="180"
                                  prop="itemid"
                                  v-if="show">
                          </el-table-column>
                          <el-table-column
                                  prop="name"
                                  label="名称"
                                  width="210"
                                  show-overflow-tooltip>
                          </el-table-column>
                          <el-table-column
                                  label="功能"
                                  width="180">
                            <template slot-scope="scope" >
                              <el-form-item  :prop="'gitems.' + scope.$index + '.calc_fnc'">
                                <el-select v-model="scope.row.calc_fnc">
                                  <el-option v-for="item in fncOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
                                </el-select>
                              </el-form-item>
                            </template>
                          </el-table-column>
                          <el-table-column
                                  label="绘图风格"
                                  width="180">
                            <template slot-scope="scope" >
                              <el-form-item  :prop="'gitems.' + scope.$index + '.drawtype'">
                                <el-select v-model="scope.row.drawtype">
                                  <el-option v-for="item in drawTypeOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
                                </el-select>
                              </el-form-item>
                            </template>
                          </el-table-column>
                          <el-table-column
                                  label="纵轴Y线"
                                  width="180">
                            <template slot-scope="scope" >
                              <el-form-item  :prop="'gitems.' + scope.$index + '.yaxisside'">
                                <el-select v-model="scope.row.yaxisside">
                                  <el-option v-for="item in yAxisOptions" :key="item.value" :value="item.value" :label="item.label"></el-option>
                                </el-select>
                              </el-form-item>
                            </template>
                          </el-table-column>
                          <el-table-column
                                  label="颜色"
                                  width="180">
                            <template slot-scope="scope" >
                              <el-form-item  :prop="'gitems.' + scope.$index + '.color'">
                                <el-color-picker  v-model="scope.row.color"></el-color-picker>
                              </el-form-item>
                            </template>
                          </el-table-column>
                          <el-table-column
                                  label="操作"
                                  width="180">
                            <template slot-scope="scope">
                              <el-button
                                      size="mini"
                                      type="danger"
                                      icon="el-icon-delete"
                                      @click="handleDelete(scope.$index, scope.row)">
                                移除
                              </el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                      <el-popover
                              placement="right"
                              width="1000"
                              trigger="click"
                              ref="gList"
                      >
                        <el-table
                                :data="forShowData.slice((currentInsidePage-1)*pageSize,currentInsidePage*pageSize)"
                                v-loading="loading"
                                border
                                style="width: 100%"
                                :row-style="tableRowStyle"
                                :header-cell-style="tableHeaderColor"
                                ref="multipleTable"
                                tooltip-effect="dark"
                                @selection-change="handleSelectionChange">
                          <el-table-column
                                  type="selection"
                                  width="55"
                                  :reserve-selection="true">
                          </el-table-column>
                          <el-table-column
                                  prop="name"
                                  label="名称"
                                  show-overflow-tooltip>
                          </el-table-column>
                          <el-table-column
                                  prop="key_"
                                  label="键值"
                                  show-overflow-tooltip>
                          </el-table-column>
                          <el-table-column
                                  prop="type"
                                  label="类型"
                                  width="120">
                          </el-table-column>
                          <el-table-column
                                  prop="value_type"
                                  label="信息类型"
                                  width="120">
                          </el-table-column>
                          <el-table-column
                                  prop="status"
                                  label="状态"
                                  width="120">
                          </el-table-column>
                        </el-table>
                        <div class="block" style="margin-top:15px;">
                          <el-pagination
                                  align="center"
                                  @size-change="handleSizeInsideChange"
                                  @current-change="handleCurrentInsideChange"
                                  :current-page="currentInsidePage"
                                  :page-sizes="[10, 30, 50, 100]"
                                  :page-size="pageSize"
                                  layout="total, sizes, prev, pager, next, jumper"
                                  :total="forShowData.length"
                          ></el-pagination>
                        </div>
                        <div style="margin-top: 20px">
                          <el-button @click="rightChose">确定选择</el-button>
                          <el-button @click="toggleSelection()">取消选择</el-button>
                        </div>
                        <el-button type="text" slot="reference">新增</el-button>
                      </el-popover>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="onSubmit">提交</el-button>
                      <el-button @click="closePopover">取消</el-button>
                    </el-form-item>
                  </el-form>
                  <el-button type="danger" size="small" slot="reference" icon="el-icon-plus">新增</el-button>
                </el-popover>
              </div>
            </div>
          </ToolBar>
          <el-table
                  :data="graphData.slice((currentGraphPage-1)*pageSize,currentGraphPage*pageSize)"
                  v-loading="loading"
                  border
                  style="width: 100%"
                  :row-style="tableRowStyle"
                  :header-cell-style="tableHeaderColor"
          >
            <el-table-column label="graphid" prop="graphid" :resizable="false" v-if="show"></el-table-column>
            <el-table-column label="图形名称" prop="name" min-width="70%"></el-table-column>
            <el-table-column label="高" prop="height" min-width="15%"></el-table-column>
            <el-table-column label="宽" prop="width" min-width="15%"></el-table-column>
            <el-table-column label="图形类型" prop="graphtype" min-width="15%" :formatter="typeFormat"></el-table-column>
            <el-table-column align="center" label="操作" min-width="15%" :resizable="false">
              <template slot-scope="scope">
                <el-popconfirm
                        title="是否添加指标到概况？"
                        @onConfirm="confirmGraphSaveTrend(scope.$index, scope.row)"
                >
                  <el-button
                          size="mini"
                          type="primary"
                          slot="reference"
                          icon="fa fa-external-link"
                          circle
                  ></el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <div class="block" style="margin-top:15px;">
            <el-pagination
                    align="center"
                    @size-change="handleSizeGraphChange"
                    @current-change="handleCurrentGraphChange"
                    :current-page="currentGraphPage"
                    :page-sizes="[10, 30, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="graphData.length"
            ></el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { timesMethod } from '@/utils/formatDate.js'
import qs from 'qs'
export default {
  data () {
    return {
      itemsloading: '',
      graphsloading: '',
      show: false,
      serverForm: {
        id: '',
        objectName: '',
        businessName: '',
        agentIp: '',
        agentDnsName: '',
        agentPort: '',
        proxyMonitor: '',
        enableMonitor: '',
        subtypeId: '',
        subtypeIds: '',
        templatesId: '',
        typeId: '',
        groupId: [],
        remark: '',
        label: '',
        mssqlMacroInstance: '',
        mssqlMacroOdbc: '',
        mssqlMacroPassword: '',
        mssqlMacroUsername: '',
        oracleMacroIp: '',
        oracleMacroAsm: '',
        oracleMacroDbname: '',
        oracleMacroPassword: '',
        oracleMacroUsername: '',
        jmxType: '',
        jmxIp: '',
        jmxDnsName: '',
        jmxPort: '',
        jmxMacro: '',
        snmpType: '',
        snmpIp: '',
        snmpDnsName: '',
        snmpPort: '',
        snmpMacro: '',
        ipmiType: '',
        ipmiIp: '',
        ipmiDnsName: '',
        ipmiPort: '',
        ipmiMacro: '',
        vmMacroCpuFrequency: '',
        vmMacroPassword: '',
        vmMacroSdkLink: '',
        vmMacroUsername: '',
        assetsId: '',
        hostId: ''
      },
      tomcatVersion: '',
      switchValue: 1,
      runTime: '',
      monitorTypeValue: '',
      monitorTypeTitle: '',
      spanChangeColor: '',
      spanredChangeColor: '',
      tableData: [{
        itemid: '',
        name: '',
        delay: '',
        status: ''
      }],
      nameTop: '',
      currentPage: 1, // 当前页码
      currentInsidePage: 1, // 监控项页码
      currentGraphPage: 1, // 图形列表页码
      total: 20, // 总条数
      pageSize: 10, // 每页的数据条数
      loading: true,
      tableDataclear: [],
      setTimeoutster: '',
      setTimeoutItems: '',
      setTimeoutGraphs: '',
      handleclosebind () {
        this.nameTop = ''
        this.$parent.$parent.noReloadData()
      },
      itemstableData: [],
      activeName: 'first',
      graphstableData: [],
      form: {
        hostids: [this.$route.query.hostId],
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        ymax_type: '',
        ymin_type: '',
        graphtype: '',
        show_legend: 0,
        show_work_period: 0,
        percent_left: '',
        percent_right: '',
        gitems: []
      },
      leftOption: false,
      rightOption: false,
      yOptions: [{
        value: 0,
        label: '计算的'
      }, {
        value: 1,
        label: '固定的'
      }, {
        value: 2,
        label: '监控项'
      }],
      fncOptions: [{
        value: 1,
        label: '最小值'
      }, {
        value: 2,
        label: '平均值'
      }, {
        value: 4,
        label: '最大值'
      }, {
        value: 7,
        label: '所有值'
      }],
      drawTypeOptions: [{
        value: 0,
        label: '实线'
      }, {
        value: 1,
        label: '面积图'
      }, {
        value: 2,
        label: '粗实线'
      }, {
        value: 3,
        label: '点'
      }, {
        value: 4,
        label: '虚线'
      }, {
        value: 5,
        label: '梯度线'
      }],
      yAxisOptions: [{
        value: 0,
        label: '左侧'
      }, {
        value: 1,
        label: '右侧'
      }],
      graphtypeOptions: [{
        value: 0,
        label: '常规'
      }, {
        value: 1,
        label: '堆积图'
      }, {
        value: 2,
        label: '饼图'
      }, {
        value: 3,
        label: '分散饼图'
      }],
      forShowData: [],
      multipleSelection: [],
      multipleSelection1: [],
      color: '',
      graphData: [{
        graphid: '',
        name: '',
        height: '',
        width: '',
        graphtype: ''
      }],
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        gitems: [
          { required: true, message: '请选择监控项', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    this.showInfo()
    this.showGraphsInfo()
    this.getTomcatVersion()
    this.getMonitorTypeItems()
    this.findHostIdinfo()
    this.getShowData()
    this.getRunTime()
    this.getGraphData()
    this.form.ymax_type = this.yOptions[0].value
    this.form.ymin_type = this.yOptions[0].value
    this.form.graphtype = this.graphtypeOptions[0].value
  },
  methods: {
    // 修改table tr行的背景色
    tableRowStyle ({ row, column, rowIndex, columnIndex }) {
    },
    // 修改table header的背景色
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #0086f1;color: #FFFFFF;font-weight: 500;font-size:15px'
      }
    },
    change_enableMonitor () {
      console.log(this.$route.query.hostId)
      console.log(this.serverForm.enableMonitor)
      this.axios.put('/host/updateHostEnableMonitor/' + this.serverForm.id, qs.stringify({
        enableMonitor: this.serverForm.enableMonitor
      })).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: '修改失败',
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '修改失败',
            type: 'error'
          })
        }
        this.showInfo()
      })
    },
    reloadData () {
      this.pageSize = 10
      this.showInfo()
      this.findHostIdinfo()
    },
    showInfo (str) {
      this.loading = true
      this.tableData = this.tableDataclear
      const _this = this
      this.setTimeoutster = window.setTimeout(() => { _this.showInfoTimeout() }, 300)
    },
    showGraphsInfo (str) {
      this.loading = true
      this.graphData = this.tableDataclear
      const _this = this
      this.setTimeoutster = window.setTimeout(() => { _this.showGraphInfoTimeout() }, 300)
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
            json.data.forEach(element => {
              if (element.value_type !== 1 && element.value_type !== 2 && element.value_type !== 4) {
                this.forShowData.push(element)
              }
            })
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
    findHostIdinfo () {
      this.axios.post('/host/findHostIdinfo/' + this.$route.query.hostId).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.serverForm = json.data
          } else {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    makeMonitorTypeTitle () {
      return this.monitorTypeTitle
    },
    getTomcatVersion () {
      const region = {
        hostids: [this.$route.query.hostId],
        status: '',
        key_: 'mysql.version["{$MYSQL.HOST}","{$MYSQL.PORT}"]'
      }
      this.axios.post('/item/getItemInfoList', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            if (json.data[0].lastvalue === '') {
              this.tomcatVersion = '获取失败'
            } else {
              this.tomcatVersion = json.data[0].lastvalue
            }
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    getRunTime () {
      const region = {
        hostids: [this.$route.query.hostId],
        status: '',
        key_: 'mysql.uptime'
      }
      this.axios.post('/item/getItemInfoList', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            if (json.data[0].lastvalue === '') {
              this.runTime = '获取失败'
            } else {
              var second = json.data[0].lastvalue
              this.runTime = timesMethod.getConvertTime(second)
            }
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    showClear () {
      this.nameTop = ''
    },
    backfrom () {
      this.$router.go(-1) // 返回上一层
    },
    makeMonitorTypeItems () {
      this.monitorTypeItems.forEach(element => {
        var monitorTypeValue = ''
        console.log(element)
        if (element.available === 0) {
          monitorTypeValue = '未检测'
          this.spanChangeColor = false
          this.spanredChangeColor = false
        } else if (element.available === 1) {
          monitorTypeValue = '正常'
          this.spanChangeColor = true
          this.spanredChangeColor = false
        } else if (element.available === 2) {
          monitorTypeValue = '异常'
          this.spanChangeColor = false
          this.spanredChangeColor = true
        }
        this.monitorTypeTitle = element.jmx_error
        this.monitorTypeValue = monitorTypeValue
      })
    },
    getMonitorTypeItems () {
      const hostIds = []
      hostIds.push(this.$route.query.hostId)
      this.axios.post('/host/findHostAvailable', hostIds).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.monitorTypeItems = json.data
            this.makeMonitorTypeItems()
          }
        } else {
          this.$message({
            message: '获取分组信息失败',
            type: 'error'
          })
        }
      })
    },
    drawLine () {
    },
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    handleSizeInsideChange (val) {
      this.currentInsidePage = 1
      this.pageSize = val
    },
    handleCurrentInsideChange (val) {
      this.currentInsidePage = val
    },
    handleSizeGraphChange (val) {
      this.currentGraphPage = 1
      this.pageSize = val
    },
    handleCurrentGraphChange (val) {
      this.currentGraphPage = val
    },
    getShowData () {
      this.axios.post('/trend/findHostDetailItems/' + this.$route.query.hostId).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.itemstableData = json.data
            // json.data.forEach(element => {
            //   this.getItemsData(element.itemid)
            // })
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    getID (index) {
      return 'charts-demo-' + index
    },
    getItemsData (itemid, index) {
      var starttime = timesMethod.fun_date(0)
      var timefrom = timesMethod.getDatestamp(starttime)
      var endtime = timesMethod.fun_date(1)
      var timetill = timesMethod.getDatestamp(endtime)
      const region = {
        itemids: [itemid],
        timefrom: timefrom,
        timetill: timetill
      }
      const returndataclock = []
      const returndataavg = []
      this.axios.post('/trend/getItemInfoList', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            json.data.forEach(element => {
              var clock = timesMethod.getTimestamp(element.clock)
              returndataclock.push(clock)
              returndataavg.push(element.value_avg)
            })
            // 基于准备好的dom，初始化echarts实例
            const pieCharts = document.getElementById('charts-demo-' + index)
            var pieEcharts = document.getElementById('pieEcharts')
            pieCharts.style.width = pieEcharts.clientWidth / 3 - 70 + 'px'
            const myChart = this.$echarts.init(pieCharts)
            // 绘制图表
            myChart.setOption({
              xAxis: {
                type: 'category',
                data: returndataclock,
                // 设置字体倾斜
                axisLabel: {
                  interval: 0,
                  rotate: 45, // 倾斜度-90至90默认为0
                  margin: 2,
                  textStyle: {
                    fontWeight: 'bolder',
                    color: '#000000',
                    fontSize: '7'
                  }
                }
              },
              yAxis: {
                type: 'value'
              },
              tooltip: {
                trigger: 'axis'
              },
              series: [{
                data: returndataavg,
                type: 'line'
              }]
            })
          } else {
            // 基于准备好的dom，初始化echarts实例
            const pieCharts = document.getElementById('charts-demo-' + index)
            var pieEcharts2 = document.getElementById('pieEcharts')
            pieCharts.style.width = pieEcharts2.clientWidth / 3 - 70 + 'px'
            const myChart = this.$echarts.init(pieCharts)
            // 绘制图表
            myChart.setOption({
              xAxis: {
                type: 'category',
                data: '',
                // 设置字体倾斜
                axisLabel: {
                  interval: 0,
                  rotate: 45, // 倾斜度-90至90默认为0
                  margin: 2,
                  textStyle: {
                    fontWeight: 'bolder',
                    color: '#000000',
                    fontSize: '7'
                  }
                }
              },
              yAxis: {
                type: 'value'
              },
              tooltip: {
                trigger: 'axis'
              },
              series: [{
                data: '',
                type: 'line'
              }]
            })
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
        if (this.itemsloading !== '') {
          this.itemsloading.close()
        }
        this.setTimeoutItems = ''
      })
    },
    checkbtn (index, row) {
      if (row.value_type === 1 || row.value_type === 2 || row.value_type === 4) {
        return 'none'
      } else {
        return ''
      }
    },
    confirmSaveTrend (index, row) {
      const region = {
        hostId: row.hostid,
        itemId: row.itemid
      }
      this.axios.post('/trend/checkHostDetailItem', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (!json.data) {
            this.saveTrend(row)
          } else {
            this.$message({
              message: '添加失败【已经存在！】',
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    saveTrend (row) {
      const region = {
        hostId: row.hostid,
        itemId: row.itemid,
        itemName: row.name
      }
      this.axios.post('/trend/addHostDetailItem', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.getShowData()
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    addItems () {
      this.activeName = 'second'
    },
    removeItems (str) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.delete('/trend/deleteHostDetailItem/' + str.id).then((resp) => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              this.getShowData()
              this.activeName = 'first'
            }
          } else {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
          }
        })
      })
    },
    refreshItems (items, index) {
      if (this.setTimeoutItems === '') {
        const _this = this
        this.openloading(index)
        this.setTimeoutItems = window.setTimeout(() => { _this.getItemsData(items.itemId, index) }, 300)
      }
    },
    refreshGraphs (items, index) {
      if (this.setTimeoutGraphs === '') {
        const _this = this
        this.openGraphloading(index)
        this.setTimeoutGraphs = window.setTimeout(() => { _this.getGraphsData(items.graphId, items.graphName, index) }, 300)
      }
    },
    openloading (index) {
      this.itemsloading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)',
        target: document.querySelector('#charts-demo-' + index) // 指定区域
      })
    },
    openGraphloading (index) {
      this.graphsloading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.3)',
        target: document.querySelector('#charts-graph-demo-' + index) // 指定区域
      })
    },
    formatitemName (name) {
      var clientWidth = document.body.clientWidth
      if (clientWidth > 1500) {
        if (name !== null && name !== '' && name.length > 50) {
          name = name.substring(0, 50) + '...'
        }
      } else {
        if (name !== null && name !== '' && name.length > 25) {
          name = name.substring(0, 25) + '...'
        }
      }
      return name
    },
    removeGraphs (str) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.delete('/trend/deleteHostDetailGraph/' + str.id).then((resp) => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              this.getGraphData()
              this.activeName = 'first'
            }
          } else {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
          }
        })
      })
    },
    saveGraphTrend (row) {
      const region = {
        hostId: this.$route.query.hostId,
        graphId: row.graphid,
        graphName: row.name
      }
      this.axios.post('/trend/addHostDetailGraph', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.getGraphData()
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    confirmGraphSaveTrend (index, row) {
      const region = {
        hostId: this.$route.query.hostId,
        graphId: row.graphid
      }
      console.log(region)
      this.axios.post('/trend/checkHostDetailGraph', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          console.log(json.data)
          if (!json.data) {
            this.saveGraphTrend(row)
          } else {
            this.$message({
              message: '添加失败【已经存在！】',
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    async getGraphsData (graphid, graphName, index1) {
      var starttime = timesMethod.fun_date(0)
      var timefrom = timesMethod.getDatestamp(starttime)
      var endtime = timesMethod.fun_date(1)
      var timetill = timesMethod.getDatestamp(endtime)
      var finalResult = ''
      var gItemData = []
      var graphData = []
      var itemData = []
      var trendData = []
      const legendData = []
      var seriesData = []
      var colorData = []
      const returndataclock = []
      const params = {
        graphids: [graphid],
        hostids: [this.$route.query.hostId],
        timefrom: timefrom,
        timetill: timetill
      }
      await this.axios.post('/gItem/getResultList', params).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            finalResult = json.data
            itemData = finalResult.itemData
            gItemData = finalResult.gItemData
            graphData = finalResult.graphData
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
      itemData.forEach(element => {
        legendData.push(element.name)
      })
      if (graphData[0].graphtype === 2) {
        for (var a = 0; a < gItemData.length; a++) {
          trendData = finalResult.trendListData[a]
          var value
          var name
          switch (gItemData[a].calc_fnc) {
            case 1 : value = trendData[trendData.length - 1].value_min
              break
            case 2 : value = trendData[trendData.length - 1].value_avg
              break
            case 4 : value = trendData[trendData.length - 1].value_max
              break
          }
          name = legendData[a]
          seriesData.push({
            value: value,
            name: name
          })
          colorData.push('#' + gItemData[a].color)
        }
        console.log(seriesData)
        const pieCharts = document.getElementById('charts-graph-demo-' + index1)
        const pieEcharts = document.getElementById('pieEcharts')
        pieCharts.style.width = pieEcharts.clientWidth / 3 - 70 + 'px'
        const myChart = this.$echarts.init(pieCharts)
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          color: colorData,
          legend: {
            data: legendData
          },
          series: [
            {
              name: '监控项',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: seriesData,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      } else {
        var sum = 0
        for (var i = 0; i < gItemData.length; i++) {
          trendData = finalResult.trendListData[i]
          var data = []
          for (var j = 0; j < trendData.length; j++) {
            var clock = timesMethod.getTimestamp(trendData[j].clock)
            var index
            if (clock) {
              index = i
              sum = sum + 1
            }
            if (i === index && sum <= trendData.length) {
              returndataclock.push(clock)
            }
            switch (gItemData[i].calc_fnc) {
              case 1 : data.push(trendData[j].value_min)
                break
              case 2 : data.push(trendData[j].value_avg)
                break
              case 4 : data.push(trendData[j].value_max)
                break
            }
          }
          var series = {}
          series.name = itemData[i].name
          var type = ''
          switch (gItemData[i].drawtype) {
            case 0: type = 'line'
              break
            case 1:
              type = 'line'
              series.areaStyle = {}
              break
            case 3:
              type = 'effectScatter'
              break
            case 2:
              type = 'line'
              series.itemStyle = {
                normal: {
                  lineStyle: {
                    width: 5
                  }
                }
              }
              break
            case 4:
              type = 'line'
              series.itemStyle = {
                normal: {
                  lineStyle: {
                    type: 'dotted'
                  }
                }
              }
              break
            case 5:
              type = 'bar'
              break
          }
          series.type = type
          colorData.push('#' + gItemData[i].color)
          series.lineStyle = {
            normal: {
              color: '#' + gItemData[i].color
            }
          }
          series.data = data
          seriesData.push(series)
          console.log(seriesData)
        }
        const pieCharts = document.getElementById('charts-graph-demo-' + index1)
        const pieEcharts = document.getElementById('pieEcharts')
        pieCharts.style.width = pieEcharts.clientWidth / 3 - 70 + 'px'
        const myChart = this.$echarts.init(pieCharts)
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          color: colorData,
          legend: {
            data: legendData
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: returndataclock,
              axisLabel: {
                interval: 0,
                rotate: 45, // 倾斜度-90至90默认为0
                margin: 2,
                textStyle: {
                  fontWeight: 'bolder',
                  color: '#000000',
                  fontSize: '7'
                }
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: seriesData
        })
      }
      if (this.graphsloading !== '') {
        this.graphsloading.close()
      }
      this.setTimeoutGraphs = ''
    },
    getGraphID (index) {
      return 'charts-graph-demo-' + index
    },
    getGraphData () {
      this.axios.post('/trend/findHostDetailGraphs/' + this.$route.query.hostId).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            console.log(json.data)
            this.graphstableData = json.data
          }
        } else {
          this.$message({
            message: '查询失败',
            type: 'error'
          })
        }
      })
    },
    showGraphInfoTimeout (str) {
      const region = {
        hostids: [this.$route.query.hostId],
        name: this.nameTop
      }
      this.axios.post('/gPrototype/getGProInfoList', region).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.graphData = json.data
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
    // 提交表单
    onSubmit () {
      if (!this.form.name) {
        this.$message({
          message: '名称不能为空!',
          type: 'error'
        })
        return
      } else if (this.form.gitems.length === 0) {
        this.$message({
          message: '监控项不能为空',
          type: 'error'
        })
        return
      }
      this.axios.post('/gPrototype/createGpro', this.form).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            console.log(resp.data)
            this.$message({
              message: '新增成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: json.msg,
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: json.msg,
            type: 'error'
          })
        }
      })
      this.$refs.gPopover.doClose()
      this.showGraphsInfo()
    },
    closePopover () {
      this.$refs.gPopover.doClose()
      this.form.gitems = []
    },
    handleDelete (index, row) {
      this.form.gitems.splice(index, 1)
    },
    showRandomColor () {
      var num = '#'
      for (var i = 0; i < 6; i++) {
        var tmp = Math.ceil((Math.random() * 15))
        if (tmp > 9) {
          switch (tmp) {
            case (10):
              num += 'A'
              break
            case (11):
              num += 'B'
              break
            case (12):
              num += 'C'
              break
            case (13):
              num += 'D'
              break
            case (14):
              num += 'E'
              break
            case (15):
              num += 'F'
              break
          }
        } else {
          num += tmp
        }
      }
      return num
    },
    rightChose () {
      var _this = this.multipleSelection1
      for (var i = 0; i < _this.length; i++) {
        console.log(this.showRandomColor())
        var breaked = false
        var gitems = {
          name: '',
          itemid: '',
          color: this.showRandomColor(),
          calc_fnc: this.fncOptions[1].value,
          drawtype: this.drawTypeOptions[0].value,
          yaxisside: this.yAxisOptions[0].value
        }
        var list = this.form.gitems
        for (var j = 0; j < list.length; j++) {
          if (list[j].itemid === _this[i].itemid) {
            breaked = true
            break
          }
        }
        if (breaked) {
          continue
        }
        gitems.name = _this[i].name
        gitems.itemid = _this[i].itemid
        this.form.gitems.push(gitems)
      }
      this.$refs.gList.doClose()
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
      this.$refs.gList.doClose()
    },
    handleSelectionChange (val) {
      this.multipleSelection1 = val
    },
    typeFormat (row, column) {
      if (row.graphtype === 0) {
        return '常规'
      } else if (row.graphtype === 1) {
        return '堆积图'
      } else if (row.graphtype === 2) {
        return '饼图'
      } else if (row.graphtype === 3) {
        return '分散饼图'
      }
    }
  },
  mounted () {
    this.drawLine()
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
.toolbar > div:last-child {
  justify-content: flex-start;
}
.datetop /deep/ input {
  height: 32px !important;
  margin-top: 1px !important;
}
/deep/.el-input__prefix {
  margin-top: -3px;
}
/deep/.el-button {
  margin-left: 10px;
}
.tempList .card {
  float: left;
  overflow: hidden;
  border: 1px solid #ddd;
  box-shadow: none;
  background-color: #fff;
}
.tempList .img-container {
  height: 110px;
  width: 100%;
  background: #fff;
}
.tempList p {
  width: 200px;
}
.title-bar-title {
  font-size: 24px;
  margin-top: 0px;
  line-height: 24px;
}
.title-bar-description {
  margin-bottom: 0px;
  margin-top: -5px;
}
.dark-main-background {
  margin-top: 10px;
}
.card-header {
  background-color: #fff;
}
.card-footer {
  background-color: #fff;
  padding: 0px 15px 5px 25px;
}
.no-border {
  border: none;
}
.agent:before {
  content: 'Agent';
  font-family: sans-serif;
  font-size: 13px;
  background: #ef6c00;
  color: #fff;
  /*text-transform: uppercase;*/
  font-weight: bold;
  text-align: center;
  display: block;
  width: 6.5em;
  position: absolute;
  padding: 3px;
  top: 0.76em;
  left: -1.8em;
  -ms-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.snmp:before {
  content: 'snmp';
  font-family: sans-serif;
  font-size: 13px;
  background: #ef6c00;
  color: #fff;
  /*text-transform: uppercase;*/
  font-weight: bold;
  text-align: center;
  display: block;
  width: 6.5em;
  position: absolute;
  padding: 3px;
  top: 0.76em;
  left: -1.8em;
  -ms-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.card-footer .hosts-btn {
  width: 90px !important;
}
// .tempList {
//   height: 240px;
// }
.tempList .m-r {
  height: 220px;
}
.img-container img {
  width: 100% !important;
}
.m-r {
  margin-right: 10px !important;
}
.text-center a {
  margin-right: 10px !important;
}
.darkmainbordertd {
  min-width: 200px;
  border: 0px;
  text-align: left;
  padding: 5px 20px;
  vertical-align: middle;
}
.darkmainborderth {
  border: 0px;
  vertical-align: middle;
}
.changeColor {
  color: green;
}
.redchangeColor {
  color: red;
}
/deep/.el-tabs__nav {
  width: 100%;
}
/deep/.el-tabs__item {
  width: 33.33%;
}
a:hover {
  background-color: #c5c5c5;
}
.echart {
  width: 100%;
  height: 300px;
}
.card-width {
  width: 32.5%;
  margin-left: 10px;
}
.card-width-top {
  width: 32.5%;
  margin-left: 10px;
  margin-top: 0px;
}
@media screen and (max-width: 1500px) {
  .card-width {
    width: 32%;
    margin-left: 10px;
  }
  .card-width-top {
    width: 32%;
    margin-left: 10px;
    margin-top: 0px;
  }
}
</style>
