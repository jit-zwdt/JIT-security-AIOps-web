<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <ToolBar>
            <div class="queryleft">
              <el-button type="primary" size="small" @click="addDepartment('0') == false" icon="el-icon-plus">添加一级部门
              </el-button>
              <el-button
                  type="primary"
                  size="small"
                  @click="addDepartment() == false"
                  icon="el-icon-circle-plus-outline"
              >添加子部门
              </el-button>
              <el-button
                  type="primary"
                  size="small"
                  @click="modifyDepartment() == false"
                  icon="el-icon-circle-plus-outline"
              >修改部门
              </el-button>
            </div>
            <div class="queryright">
              <el-button
                  type="primary"
                  size="small"
                  @click="delDepartment() == true"
                  icon="el-icon-delete"
              >批量删除
              </el-button>
            </div>
          </ToolBar>

          <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText">
          </el-input>
          <div class="tree">
            <el-tree
                class="filter-tree"
                show-checkbox
                :data="treeData"
                :props="defaultProps"
                :highlight-current="true"
                :check-strictly="true"
                default-expand-all
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                @node-click="handleNodeClick"
                ref="tree">
            </el-tree>
          </div>
        </div>
      </el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple showDetail" v-if="showDetail">
          <H6>详细信息：</H6>
          <el-form ref="showNode" :model="showNode" label-width="200px">
            <el-row>
              <el-col :span="24">
                <el-form-item label="机构/部门名称：" prop="departName">{{showNode.departName}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="部门编码：" prop="departCode">{{showNode.departCode}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话：" prop="mobile">{{showNode.mobile}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="传真：" prop="fax">{{showNode.fax}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="地址：" prop="address">{{showNode.address}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="机构类别：" prop="departCategory">{{showNode.departCategory === '1'?'组织机构':'岗位'}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态：" prop="status">{{showNode.status === 1?'启用':'不启用'}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="英文名：" prop="departNameEn">{{showNode.departNameEn}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="缩写：" prop="departNameAbbr">{{showNode.departNameAbbr}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="备注：" prop="remark">{{showNode.remark}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="排序：" prop="departOrder">{{showNode.departOrder}}
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="描述：" prop="remark">{{showNode.description}}
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <departmentAdd
        :title="title"
        :showEditDialog="showEditDialog"
        @close="showEditDialog = false"
        :reqestData="reqestData"
        @success="reloadData"
        @error="reloadData"
    ></departmentAdd>
  </div>
</template>
<script>
import departmentAdd from '@/views/sysManager/departmentManager/departmentAdd.vue'
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
      this.showNodeDetail(data.id)
    },
    addDepartment (val) { // add
      if (val !== '0') { // sub department
        const checkedNodes = this.$refs.tree.getCheckedNodes(false, false)
        if (checkedNodes.length > 0) {
          if (checkedNodes.length > 1) {
            this.$message({
              message: '只能勾选一个上级部门！',
              type: 'warning'
            })
            return false
          } else {
            this.reqestData.parentName = checkedNodes[0].label
            this.reqestData.parentId = checkedNodes[0].id
          }
        } else {
          this.$message({
            message: '请勾选上级部门！',
            type: 'warning'
          })
          return false
        }
      } else {
        this.reqestData.parentId = '0'
      }
      this.title = '添加部门'
      this.showEditDialog = true
    },
    modifyDepartment (val) { // modify
      const checkedNodes = this.$refs.tree.getCheckedNodes(false, false)
      if (checkedNodes.length > 0) {
        if (checkedNodes.length > 1) {
          this.$message({
            message: '只能勾选一个待修改部门！',
            type: 'warning'
          })
          return false
        } else {
          this.reqestData.id = checkedNodes[0].id
          this.title = '修改部门'
          this.showEditDialog = true
        }
      } else {
        this.$message({
          message: '请勾选待修改部门！',
          type: 'warning'
        })
        return false
      }
    },
    delDepartment (val) { // delete
      const checkedNodes = this.$refs.tree.getCheckedNodes(false, false)
      if (checkedNodes.length < 1) {
        this.$message({
          message: '请勾选待删除部门！',
          type: 'warning'
        })
        return false
      } else {
        const ids = []
        checkedNodes.forEach(function (ele) {
          ids.push(ele.id)
        })
        if (ids.length > 0) {
          this.axios.delete(this.$api.sysManager.delDepartment + ids.join(',')).then((resp) => {
            if (resp.status === 200) {
              var json = resp.data
              if (json.code === 1) {
                this.$message({
                  message: '操作成功！',
                  type: 'success'
                })
                this.getTreeNodes()
              } else {
                this.$message({
                  message: '删除部门信息失败！',
                  type: 'error'
                })
              }
            } else {
              this.$message({
                message: '删除部门信息失败！',
                type: 'error'
              })
            }
          })
        }
      }
    },
    getTreeNodes () {
      this.axios.get(this.$api.sysManager.getDepartmentInfos).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.treeData = json.data
          } else {
            this.$message({
              message: '获取部门列表信息失败！',
              type: 'error'
            })
          }
        } else {
          this.$message({
            message: '获取部门列表信息失败！',
            type: 'error'
          })
        }
      })
    },
    reloadData () {
      this.getTreeNodes()
    },
    showNodeDetail (id) {
      this.axios.get(this.$api.sysManager.getDepartment + id).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.showDetail = true
            this.showNode = json.data
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
    },
    checkSelected () {
      if (this.$refs.tree.getCurrentNode() === null) {
        return false
      } else {
        return true
      }
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
      reqestData: {
        parentId: '0',
        parentName: ''
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      showEditDialog: false,
      showNode: {
        id: '',
        parentId: '',
        departName: '',
        departCode: '',
        mobile: '',
        fax: '',
        address: '',
        departCategory: '1',
        status: '1',
        departNameEn: '',
        departNameAbbr: '',
        remark: '',
        departOrder: '',
        description: ''
      },
      showDetail: false,
      title: ''
    }
  },
  components: { departmentAdd }
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

  .tree {
    overflow-y: auto;
    overflow-x: scroll;
    height: 680px;
    overflow-x: hidden;
  }

  .showDetail {
    height: 770px;
  }
</style>
