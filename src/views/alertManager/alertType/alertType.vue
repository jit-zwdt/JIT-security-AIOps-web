<template>
  <div>
    <ToolBar>
      <div class="queryleft">
        <el-col :span="12">
          <el-input type="text" v-model="name" size="small" placeholder="名称" clearable></el-input>
        </el-col>
        <el-select v-model="statusSelect" class="datetop" filterable placeholder="状态" clearable>
          <el-option
            v-for="status in statusList"
            :key="status.value"
            :label="status.label"
            :value="status.value"
          ></el-option>
        </el-select>
        <el-button type="primary" size="small" @click="showInfo() == false" icon="el-icon-search">查询</el-button>
        <el-button type="primary" size="small" @click="showClear() == false">重置</el-button>
      </div>
      <div class="queryright"></div>
    </ToolBar>
    <el-table
      :data="tableData"
      border
      v-loading="loading"
      style="width: 100%"
      :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor"
    >
      <el-table-column label="mediatypeid" prop="mediatypeid" :resizable="false" v-if="show"></el-table-column>
      <el-table-column label="名称" prop="name" min-width="40%" :resizable="false" :sortable="true"></el-table-column>
      <el-table-column
        label="类型"
        prop="type"
        min-width="15%"
        :resizable="false"
        :formatter="formatType"
      ></el-table-column>
      <el-table-column label="状态" prop="status" min-width="15%" :resizable="false"></el-table-column>
      <el-table-column label="用于动作中" prop="actionUsed" min-width="15%" :resizable="false"></el-table-column>
      <el-table-column align="center" label="操作" min-width="15%">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            slot="reference"
            icon="el-icon-edit-outline"
            circle
            @click="confirmupdate(scope.$index, scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: '',
      statusSelect: '',
      statusList: [{
        value: '0',
        label: '启用'
      }, {
        value: '1',
        label: '禁用'
      }],
      loading: true
    }
  },
  created () {
    this.showInfo()
  },
  methods: {
    // 修改table tr行的背景色
    tableRowStyle ({ row, column, rowIndex, columnIndex }) { },
    // 修改table header的背景色
    tableHeaderColor ({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: #0086f1;color: #FFFFFF;font-weight: 500;font-size:15px'
      }
    },
    reloadData () {
      this.showEditDialog = false
      this.showhelpDialog = false
      this.showInfo()
    },
    noReloadData () {
      this.showhelpDialog = false
    },
    showInfo () {
      this.loading = true
      this.tableData = this.tableDataclear
      const _this = this
      this.setTimeoutster = window.setTimeout(() => { _this.showInfoTimeout() }, 300)
    },
    showInfoTimeout () {
      const params = {
        name: this.name,
        status: this.statusSelect
      }
      this.axios
        .post('/mediaType/getMediaTypes', params)
        .then(resp => {
          if (resp.status === 200) {
            var json = resp.data
            console.log(json)
            if (json.code === 1) {
              this.tableData = json.data
              this.loading = false
            }
          }
        })
    },
    showClear () {
      this.description = ''
      this.statusSelect = ''
    },
    formatType (row, column) {
      var t = row.type
      if (t === 0) {
        return '邮件'
      } else if (t === 1) {
        return '脚本'
      } else if (t === 2) {
        return '短信'
      } else if (t === 3) {
        return 'Jabber'
      } else if (t === 4) {
        return 'Webhook'
      }
    }
  },
  actions: {}
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
/deep/.el-input__prefix {
  margin-top: -3px;
}
/deep/.el-button {
  margin-left: 10px;
}
</style>
