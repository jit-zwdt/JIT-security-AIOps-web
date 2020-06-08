<template>
  <el-table
    :data="items"
    height="250"
    boder
    style="width: 100%">
    <el-table-column
      prop="serverName"
      label="服务器名称">
    </el-table-column>
    <el-table-column
      prop="serverInnerIp"
      label="服务器内网ip">
    </el-table-column>
    <el-table-column
      prop="serverOuterIp"
      label="服务器外网ip">
    </el-table-column>
    <el-table-column
      prop="serverType"
      label="服务器类型">
    </el-table-column>
    <el-table-column
      prop="serverUse"
      label="服务器用途">
    </el-table-column>
    <el-table-column
      label="操作">
      <template slot-scope="scope">
      <el-button @click="deleteItem(scope.row.serverId)" type="danger" size="medium">删除</el-button>
      <el-button @click="editItem(scope.row.serverId)" type="warning" size="medium">编辑</el-button>
    </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data () {
    return {
      items: []
    }
  },
  created () {
    this.loadItems()
  },
  methods: {
    loadItems () {
      this.axios.get('/server').then(resp => {
        var json = resp.data
        if (json.code === 1) {
          this.items = json.data
        }
      })
    },
    deleteItem (id) {
      this.axios.delete('/server/' + id).then(resp => {
        var json = resp.data
        if (json.code === 1) {
          alert('删除成功')
          this.loadItems()
        }
      })
    },
    editItem (id) {
      this.$router.push({ name: 'Edit', params: { serverId: id } })
    }
  }
}

</script>
<style>

</style>
