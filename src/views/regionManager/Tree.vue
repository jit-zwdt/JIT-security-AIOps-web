<template>
  <div>
    <ToolBar>
      <div>
          <el-button type="primary" size="small" @click="showRegionParentDialog = true"
            >新增一级地区</el-button>
        </div>
    </ToolBar>
    <el-dialog
      title="新增一级地区"
      :visible.sync="showRegionParentDialog"
      width="30%"
    >
      <el-form ref = "parentForm" :model="addForm" label-width="80px">
        <el-form-item label="一级地区" prop="regionName">
          <el-input v-model.trim="addForm.regionName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="showRegionParentDialog = false">取 消</el-button>
          <el-button type="primary" @click="submitRegionParent">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="新增下级地区"
      :visible.sync="showRegionDialog"
      width="30%"
    >
      <el-form ref="addForm" :model="addForm" label-width="80px">
        <el-form-item label="地区名称">
          <el-input v-model.trim="addForm.regionName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="showRegionDialog = false">取 消</el-button>
          <el-button type="primary" @click="submitRegion">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="编辑地区"
      :visible.sync="showEditRegionDialog"
      width="30%"
    >
      <el-form  ref="editForm" :model="addForm" label-width="80px">
        <el-form-item label="地区名称">
          <el-input v-model.trim="addForm.regionName" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="showEditRegionDialog = false">取 消</el-button>
          <el-button type="primary" @click="editRegion">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-card class="box-card">
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        :default-expand-all="false"
        :expand-on-click-node="false"
        :default-expanded-keys="expandedList"
        @node-expand="nodeExpand"
        @node-collapse="nodeCollapse">
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span>
            <el-row>
              <el-button
              size="small"
              type="text"
              @click="() => append(data)">
              增加
              </el-button>
              <el-button
              size="small"
              type="text"
              @click="() => edit(data)">
              修改
              </el-button>
              <el-button
              size="small"
              type="text"
              @click="() => remove(data)">
              删除
              </el-button>
            </el-row>
          </span>
        </span>
      </el-tree>
    </el-card>
  </div>
</template>
<script>
import ToolBar from '@/components/ToolBar.vue'
export default {
  data () {
    return {
      treeData: [],
      expandedList: [],
      addForm: {
        regionName: ''
      },
      showRegionParentDialog: false,
      showRegionDialog: false,
      showEditRegionDialog: false,
      parentId: '',
      parent: '',
      id: ''
    }
  },
  created () {
    this.getRegion()
  },
  methods: {
    append (data) {
      this.parent = data.parent
      this.id = data.id
      this.showRegionDialog = true
    },
    edit (data) {
      this.parent = data.parent
      this.id = data.id
      this.parentId = data.parentId
      this.addForm.regionName = data.label
      this.showEditRegionDialog = true
    },
    remove (data) {
      const id = data.id
      const children = data.children
      if (children.length > 0) {
        this.$message({
          message: '请先删除子节点',
          type: 'error',
          duration: '4000'
        })
      } else {
        this.axios.delete('/region/' + id).then(resp => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getRegion()
            } else if (json.code === 500) {
              this.$message({
                message: '删除失败',
                type: 'error'
              })
            }
          }
        })
      }
    },
    getRegion () {
      this.axios.get('/region').then(resp => {
        var json = resp.data
        if (json.code === 1) {
          this.treeData = json.data
        }
      })
    },
    submitRegionParent () {
      this.axios.post('/region/regionParent', this.addForm).then(resp => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.$refs.parentForm.resetField()
            this.showRegionParentDialog = false
            this.getRegion()
          }
        } else {
          this.$message({
            message: '添加失败',
            type: 'error'
          })
          this.addForm.regionName = ''
          this.showRegionParentDialog = false
          this.getRegion()
        }
      })
    },
    submitRegion () {
      const region = {
        regionName: this.addForm.regionName,
        parentId: this.id,
        parent: this.parent
      }
      this.axios.post('/region', region).then(resp => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
            this.addForm.regionName = ''
            this.showRegionDialog = false
            this.getRegion()
          }
        } else {
          this.$message({
            message: '添加失败',
            type: 'error'
          })
          this.addForm.regionName = ''
          this.showRegionDialog = false
        }
      })
    },
    editRegion () {
      const region = {
        regionName: this.addForm.regionName,
        parentId: this.parentId,
        parent: this.parent,
        regionId: this.id
      }
      this.axios.put('/region/' + this.id, region).then(resp => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.$message({
              message: '编辑成功',
              type: 'success'
            })
            this.addForm.regionName = ''
            this.showEditRegionDialog = false
            this.getRegion()
          }
        } else {
          this.$message({
            message: '编辑失败',
            type: 'error'
          })
          this.addForm.regionName = ''
          this.showEditRegionDialog = false
        }
      })
    },
    nodeExpand (data) {
      let flag = false
      this.expandedList.some(item => {
        if (item === data.id) {
          flag = true
          return true
        }
      })
      if (!flag) {
        this.expandedList.push(data.id)
      }
    },
    nodeCollapse (data) {
      this.expandedList.some((item, i) => {
        if (item === data.id) {
          this.expandedList.length = i
        }
      })
    }
  },
  components: { ToolBar }
}
</script>
<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    padding-right: 20px;
  }
</style>
