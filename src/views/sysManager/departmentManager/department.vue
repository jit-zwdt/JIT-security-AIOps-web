<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="8"><div class="grid-content bg-purple">
        <ToolBar>
          <div class="queryleft">
            <el-button type="primary" size="small" @click="addDepartment(0) == false" icon="el-icon-plus">添加一级部门</el-button>
            <el-button
                type="primary"
                size="small"
                @click="addDepartment() == false"
                icon="el-icon-circle-plus-outline"
            >添加子部门</el-button>
          </div>
          <div class="queryright">
            <el-button
                type="primary"
                size="small"
                @click="delDepartment() == true"
                icon="el-icon-delete"
            >批量删除</el-button>
          </div>
        </ToolBar>
        <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText">
        </el-input>
        <el-tree
            class="filter-tree"
            show-checkbox
            :data="treeData"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
            ref="tree">
        </el-tree>
      </div></el-col>
      <el-col :span="16"><div class="grid-content bg-purple">详情</div></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick (data) {
      console.log(data)
    },
    addDepartment (val) { // add
      console.log(val)
    },
    delDepartment (val) { // delete
      console.log(val)
    },
    getTreeNodes () {
      this.axios.get('/sys/department/getDepartmentInfos').then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.treeData = json.data
          } else {
            this.$message({
              message: '获取部门信息失败！',
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '获取部门信息失败！',
            type: 'error'
          })
        }
      })
    }
  },
  created () {
  },
  mounted () {
    this.getTreeNodes()
  },
  destroyed () {
  },
  data () {
    return {
      filterText: '',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  }
}
</script>
<style>
  .bg-purple {
    background: #ffffff;
  }
  .grid-content {
    border-radius: 2px;
    min-height: 100%;
  }
</style>
