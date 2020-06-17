<template>
  <div>
    <ToolBar>
      <div class="queryleft">
        <el-col :span="12">
          <el-input type="text" v-model="assetNameTop" size="small" placeholder="资产名称" clearable ></el-input>
        </el-col>
        <el-date-picker
          v-model="assetRegisterDateTop"
          type="date"
          placeholder="登记时间"
          class="datetop">
        </el-date-picker>
        <el-button type="primary" size="small" @click="showInfo() == false">查询</el-button>
        <el-button type="primary" size="small" @click="showClear()">重置</el-button>
      </div>
      <div class="queryright">
        <el-button type="primary" size="small" @click="showEditDialog = true">新增</el-button>
      </div>
    </ToolBar>
    <el-table
      :data="tableData"
      border style="width: 100%"
      :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor">>
        <el-table-column label="id" prop="id" width="100" :resizable="false" v-if="show">
        </el-table-column>
        <el-table-column label="资产名称" prop="assetName" width="150" :resizable="false">
        </el-table-column>
        <el-table-column label="资产类型" prop="assetType" width="100" :resizable="false">
        </el-table-column>
        <el-table-column label="资产编号" prop="assetNumber" width="150" :resizable="false">
        </el-table-column>
        <el-table-column label="资产状态" prop="assetState" width="100" :resizable="false">
        </el-table-column>
        <el-table-column label="数量" prop="assetAmount" width="100" :resizable="false">
        </el-table-column>
        <el-table-column label="资产所属单位" prop="assetBelongsDept" width="150" :resizable="false">
        </el-table-column>
        <el-table-column label="资产所属人" prop="assetBelongsPerson" width="100" :resizable="false">
        </el-table-column>
        <el-table-column label="资产登记时间" prop="assetRegisterDate" width="150" :resizable="false">
        </el-table-column>
        <el-table-column label="登记人" prop="assetRegistrant" width="100" :resizable="false">
        </el-table-column>
        <el-table-column label="资产修改时间" prop="assetUpdateDate" width="150" :resizable="false">
        </el-table-column>
        <el-table-column label="资产位置" prop="assetLocation" width="200" :resizable="false">
        </el-table-column>
        <el-table-column label="资产注销时间" prop="assetLogoutDate" width="150" :resizable="false">
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-popconfirm
              title="确定删除吗？" @onConfirm="confirmdelete(scope.$index, scope.row)"
            >
              <el-button
                size="mini"
                type="danger"
                slot="reference" >删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
    </el-table>
    <AssetsAdd :showEditDialog="showEditDialog" @close="showEditDialog = false" @success="reloadData"></AssetsAdd>
  </div>
</template>
<script>
import Format from '@/utils/format.js'
import AssetsAdd from '@/views/assetsManager/assetsList/assetsAdd.vue'
export default {
  data () {
    return {
      showEditDialog: false,
      tableData: [{
        id: '',
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
      }],
      assetNameTop: '',
      assetRegisterDateTop: '',
      serverResource: {
        assetName: '1',
        assetRegisterDate: ''
      }
    }
  },
  created () {
    this.showInfo()
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
    showUserAuth (params) {
      this.$router.push({ name: 'userCenterAuthlist', query: { id: this.usernane } })
    },
    reloadData () {
      this.showEditDialog = false
    },
    confirmdelete (index, row) {
      alert('index：' + index + 'row:' + row.assetName)
    },
    showInfo () {
      alert(this.assetRegisterDateTop)
      alert(Format((this.assetRegisterDateTop, 'YYYY-MM-DD HH:mm:ss')))
      this.axios.post('/assets/findByCondition', {
        param: {
          assetName: this.assetNameTop,
          assetRegisterDate: this.assetRegisterDateTop
        },
        page: 1,
        size: 10
      }).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            console.log(json.data.dataList[0])
            this.tableData = json.data.dataList
          }
        }
      })
    },
    showClear () {
      this.assetNameTop = ''
      this.assetRegisterDateTop = ''
    }
  },
  actions: {
  },
  components: { AssetsAdd }
}
</script>
<style lang="scss" scoped>
.queryleft {
  float:left;
}
.queryright {
  float:right;
}
.tableHeaderColor {
  font-size: 20;
}
.datetop /deep/ input {
  height: 32px !important;
  margin-top: 1px !important;
}
/deep/.el-input__prefix {
  margin-top: -3px;
}

</style>
