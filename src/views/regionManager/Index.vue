<template>
  <div>
    <ToolBar>
      <div>
        <el-button type="primary" size="small" @click="showEditDialog = true"
          >添加</el-button
        >
      </div>
    </ToolBar>
    <el-table
      :data="tableDate"
      border style="width: 100%">
      <el-table-column prop="serverName" label="服务器名称">
      </el-table-column>
      <el-table-column prop="regionName" label="所属地区">
      </el-table-column>
      <el-table-column prop="serverInnerIp" label="内网ip">
      </el-table-column>
      <el-table-column prop="serverOuterIp" label="政务外网ip">
      </el-table-column>
      <el-table-column prop="serverType" label="服务器用途" :formatter="serverTypeFormat">
      </el-table-column>
      <el-table-column prop="hasOta" label="应用类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.hasOta === 1" effect="dark">全流程</el-tag>
          <el-tag v-if="scope.row.hasCw === 1" type='success' effect="dark">综窗</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <Edit :showEditDialog="showEditDialog" @close="showEditDialog = false" @success="reloadData"></Edit>
  </div>
</template>
<script>
import Edit from './Edit.vue'
export default {
  data () {
    return {
      showEditDialog: false,
      tableDate: []
    }
  },
  created () {
    this.loadItems()
  },
  methods: {
    serverTypeFormat (val) {
      if (val.serverType === 1) {
        return '应用服务器'
      } else if (val.serverType === 2) {
        return '数据库服务器'
      } else {
        return '-'
      }
    },
    loadItems () {
      this.axios.get('/server').then(resp => {
        var json = resp.data
        if (json.code === 1) {
          this.tableDate = json.data
        }
      })
    },
    reloadData () {
      this.showEditDialog = false
      this.loadItems()
    }
  },
  components: { Edit }
}
</script>
