<template>
    <div>
        <ToolBar>
            <div class="queryleft">
                <el-input type="text" v-model="name" size="small" placeholder="字典名称" clearable></el-input>
                <el-input type="text" v-model="code" size="small" placeholder="字典编码" clearable></el-input>
                <el-button type="primary" size="small" @click="currentPage = 1 ; showInfo() == false" icon="el-icon-search">查询</el-button>
                <el-button type="primary" size="small" @click="showClear() == false">重置</el-button>
            </div>
            <div class="queryright">
                <el-button
                        type="primary"
                        size="small"
                        icon="el-icon-plus"
                        @click="showDictionaryAdd()== true"
                >新增
                </el-button>
            </div>
        </ToolBar>
        <el-table
                :data="tableData"
                v-loading="loading"
                border
                style="width: 100%"
                :row-style="tableRowStyle"
                :header-cell-style="tableHeaderColor"
        >
            <el-table-column label="序号" prop="num" min-width="5%" :resizable="false"></el-table-column>
            <el-table-column label="字典名称" prop="dictionaryEntity.dictName" min-width="10%" :resizable="false"></el-table-column>
            <el-table-column
                    label="字典编码"
                    prop="dictionaryEntity.dictCode"
                    min-width="10%"
                    :resizable="false"
            ></el-table-column>
            <el-table-column label="描述" prop="dictionaryEntity.description" min-width="20%" :resizable="false"></el-table-column>
            <el-table-column align="center" label="操作" min-width="10%">
                <template slot-scope="scope">
                    <el-popconfirm title="确定删除吗？" @onConfirm="confirmdelete(scope.$index, scope.row)">
                        <el-button size="mini" type="danger" slot="reference" icon="el-icon-delete">删除</el-button>
                    </el-popconfirm>
                    <el-button
                            size="mini"
                            type="primary"
                            slot="reference"
                            icon="el-icon-edit-outline"
                            @click="dictionaryUpdate(scope.$index, scope.row)"
                    >编辑</el-button>
                    <el-button
                            size="mini"
                            type="primary"
                            slot="reference"
                            icon="el-icon-setting"
                            @click="dictionaryConfig (scope.row)"
                    >子项</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block" style="margin-top:15px;">
            <el-pagination
                    align="left"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[15, 30, 50, 100]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalCount"
            ></el-pagination>
        </div>
        <dictionaryAdd
                :title="titleType"
                :id="id"
                :showEditDialog="showEditDialog"
                @close="showEditDialog = false"
                @success="reloadData"
                @error="reloadData"
        ></dictionaryAdd>
        <el-drawer
                :title="title"
                :visible.sync="drawer"
                size = "30%"
                :direction="direction"
                :before-close="handleClose"
        >
            <div class="card dark-main-background">
                <ToolBar>
                    <div class="queryleft" style="width: 50%">
                        <el-col :span="12">
                            <el-input type="text" v-model="itemText" size="small" placeholder="名称" clearable></el-input>
                        </el-col>
                        <el-col :span="12">
                            <el-select v-model="status" class="datetop" size="small" filterable placeholder="状态" clearable>
                                <el-option
                                        v-for="status in statusList"
                                        :key="status.value"
                                        :label="status.label"
                                        :value="status.value"
                                ></el-option>
                            </el-select>
                        </el-col>
                    </div>
                    <div class="queryright" style="width: 50%">
                        <el-button type="primary" size="small" @click="currentPageDictItem = 1 ; showDictItem()" icon="el-icon-search">查询</el-button>
                        <el-button type="primary" size="small" @click="showDictItemClear()">重置</el-button>
                    </div>
                </ToolBar>
                <ToolBar>
                    <div>
                        <el-button
                                type="primary"
                                size="small"
                                icon="el-icon-plus"
                                @click="showDictionaryItemAdd()== true"
                        >新增
                        </el-button>
                    </div>
                </ToolBar>
                <el-table
                        :data="tableItemData"
                        border
                        style="width: 100%;height: 50px"
                        :row-style="tableRowStyle"
                        :header-cell-style="tableHeaderColor"
                >
                    <el-table-column label="名称" prop="itemText" min-width="25%" :resizable="false"></el-table-column>
                    <el-table-column
                            label="数据值"
                            prop="itemValue"
                            min-width="20%"
                            :resizable="false"
                    ></el-table-column>
                    <el-table-column label="状态" prop="status" min-width="15%" :resizable="false" :formatter="statusFormat"></el-table-column>
                    <el-table-column align="center" label="操作" min-width="40%">
                        <template slot-scope="scope">
                            <el-popconfirm title="确定删除吗？" @onConfirm="deleteDictItem(scope.row)">
                                <el-button size="mini" type="danger" slot="reference" icon="el-icon-delete">删除</el-button>
                            </el-popconfirm>
                            <el-button
                                    size="mini"
                                    type="primary"
                                    slot="reference"
                                    icon="el-icon-edit-outline"
                                    @click="dictionaryItemUpdate(scope.$index, scope.row)"
                            >编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block" style="margin-top:15px;">
                    <el-pagination
                            align="left"
                            @size-change="handleSizeChangeDictItem"
                            @current-change="handleCurrentChangeDictItem"
                            :current-page="currentPageDictItem"
                            :page-sizes="[10]"
                            :page-size="pageSizeDictItem"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="totalDictItemCount"
                    ></el-pagination>
                </div>
            </div>
            <dictionaryItemAdd
                    :title="titleType"
                    :id="id"
                    :dictId="dictId"
                    :showEditDialog="showEditDictItemDialog"
                    @close="showEditDictItemDialog = false"
                    @success="reloadDataItem"
                    @error="reloadDataItem"
            ></dictionaryItemAdd>
        </el-drawer>
    </div>
</template>
<script>
import qs from 'qs'
import dictionaryAdd from '@/views/sysManager/dictionaryManager/dictionaryAdd.vue'
import dictionaryItemAdd from '@/views/sysManager/dictionaryManager/dictionaryItemAdd.vue'
export default {
  data () {
    return {
      title: '',
      totalCount: 0,
      totalDictItemCount: 0,
      currentPage: 1, // 当前页码
      pageSize: 15, // 每页的数据条数
      currentPageDictItem: 1, // 当前页码
      pageSizeDictItem: 10, // 每页的数据条数
      showEditDialog: false,
      showEditDictItemDialog: false,
      name: '',
      code: '',
      id: '',
      tableData: [],
      tableItemData: [],
      titleType: '',
      drawer: false,
      direction: 'rtl',
      itemText: '',
      status: '',
      dictId: '',
      loading: true,
      statusList: [{
        value: 0,
        label: '未启用'
      }, {
        value: 1,
        label: '已启用'
      }]
    }
  },
  created () {
    this.showInfo()
  },
  methods: {
    handleSizeChange (val) {
      this.currentPage = 1
      this.pageSize = val
      this.showInfoTimeout()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.showInfoTimeout()
    },
    handleSizeChangeDictItem (val) {
      this.currentPageDictItem = 1
      this.pageSizeDictItem = val
      this.showDictItemInfo()
    },
    handleCurrentChangeDictItem (val) {
      this.currentPageDictItem = val
      this.showDictItemInfo()
    },
    // 修改table tr行的背景色
    tableRowStyle ({ row, column, rowIndex, columnIndex }) {
    },
    // 修改table header的背景色
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #0086f1;color: #FFFFFF;font-weight: 500;font-size:15px'
      }
    },
    handleClose (done) {
      this.currentPageDictItem = 1
      this.tableItemData = []
      done()
    },
    reloadData () {
      this.showInfo()
    },
    reloadDataItem () {
      this.showDictItemInfo()
    },
    statusFormat (val) {
      var back
      if (val.status === 1) {
        back = '已启用'
      } else {
        back = '未启用'
      }
      return back
    },
    showInfo () {
      this.loading = true
      this.tableData = this.tableDataclear
      const _this = this
      this.setTimeoutster = window.setTimeout(() => {
        _this.showInfoTimeout()
      }, 300)
    },
    showInfoTimeout () {
      this.axios
        .post(this.$api.sysManager.getDictionarys, qs.stringify({
          name: this.name,
          code: this.code,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }))
        .then(resp => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              this.tableData = json.data.list
              this.totalCount = json.data.count
            }
          }
          this.loading = false
        })
    },
    showClear () {
      this.name = ''
      this.code = ''
    },
    showDictItemClear () {
      this.itemText = ''
      this.status = ''
    },
    showDictionaryAdd () {
      this.titleType = '添加'
      this.id = -1
      this.showEditDialog = true
    },
    showDictionaryItemAdd () {
      this.titleType = '添加'
      this.id = -1
      this.showEditDictItemDialog = true
    },
    confirmdelete (index, row) {
      this.axios.delete(this.$api.sysManager.deleteDictionary + row.dictionaryEntity.id).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.showInfo()
          }
        } else {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
          this.showInfo()
        }
      })
    },
    deleteDictItem (row) {
      this.axios.delete(this.$api.sysManager.deleteDictionaryItem + row.id).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.showDictItemInfo()
          }
        } else {
          this.$message({
            message: '删除失败',
            type: 'error'
          })
          this.showDictItemInfo()
        }
      })
    },
    dictionaryUpdate (index, row) {
      this.titleType = '修改'
      this.id = row.dictionaryEntity.id
      this.showEditDialog = true
    },
    dictionaryItemUpdate (index, row) {
      this.titleType = '修改'
      this.id = row.id
      this.showEditDictItemDialog = true
    },
    dictionaryConfig (row) {
      this.dictId = row.dictionaryEntity.id
      this.title = '字典项列表（' + row.dictionaryEntity.dictName + '）'
      this.showDictItemInfo()
    },
    showDictItem () {
      this.currentPageDictItem = 1
      this.showDictItemInfo()
    },
    showDictItemInfo () {
      this.axios.post(this.$api.sysManager.getDictionaryItemByDicId, qs.stringify({
        id: this.dictId,
        itemText: this.itemText,
        status: this.status,
        currentPage: this.currentPageDictItem,
        pageSize: this.pageSizeDictItem
      })).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.tableItemData = json.data.list
            this.totalDictItemCount = json.data.count
          }
        }
      })
      this.drawer = true
    }
  },
  actions: {},
  components: { dictionaryAdd, dictionaryItemAdd }
}
</script>
<style lang="scss" scoped>
    .queryleft {
        float: left;
    }

    .queryright {
        float: right;
    }

    .tableHeaderColor {
        font-size: 20;
    }

    .datetop /deep/ input {
        height: 32px !important;
        margin-top: 1px !important;
    }

    /deep/ .el-input__prefix {
        margin-top: -3px;
    }

    /deep/ .el-button {
        margin-left: 10px;
    }
</style>
