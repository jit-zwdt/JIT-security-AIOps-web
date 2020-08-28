<template>
    <el-dialog
            @opened="openDialog"
            :width="dialogWidth"
            :title="title"
            :visible.sync="showEditDialog"
            :show-close="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            append-to-body
    >
        <div>
                <div class="tree">
                    <el-row>
                        <el-col :span="6">
                            <span>上级部门:</span>
                        </el-col>
                        <el-col :span="18">
                            <el-tree
                                    class="filter-tree"
                                    show-checkbox
                                    :data="treeData"
                                    :props="defaultProps"
                                    :check-strictly="true"
                                    default-expand-all
                                    :expand-on-click-node="false"
                                    :filter-node-method="filterNode"
                                    @check-change="handleCheckChange"
                                    node-key="id"
                                    ref="tree">
                            </el-tree>
                        </el-col>
                    </el-row>
                </div>
        </div>
        <div slot="footer" class="dialog-footer" >
            <el-button type="primary" @click="submitOrUpdate()" >确认</el-button>
            <el-button @click="closefrom()">取消</el-button>
        </div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                append-to-body>
            <span>部门信息不能为空!</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </el-dialog>
</template>
<script>
export default {
  props: {
    titleType: {},
    id: {},
    showEditDialog: Boolean,
    dialogWidth: {
      type: String,
      default: '500px'
    },
    title: {
      type: String,
      default: '部门搜索'
    },
    labelWidth: {
      type: String,
      default: '200px'
    }
  },
  data () {
    return {
      dialogVisible: false,
      i: 0,
      treeData: [],
      props: {
        label: 'name',
        children: 'zones'
      },
      count: 1,
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
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      rules: {}
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    openDialog () {
      this.axios.get('/sys/department/getDepartmentInfos').then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.treeData = json.data
            const id = this.id
            if (id !== undefined && id !== '') {
              this.axios.get('/sys/department/getDepartment/' + id).then((resp) => {
                if (resp.status === 200) {
                  const json = resp.data
                  if (json.code === 1) {
                    this.$refs.tree.setCheckedNodes([json.data])
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
    closefrom () {
      this.clearform()
      this.$emit('close')
    },
    clearform () {
      this.$refs.tree.setCheckedNodes([])
    },
    submitOrUpdate () {
      if (this.$refs.tree.getCheckedNodes().length > 0) {
        this.$emit('success', this.$refs.tree.getCheckedNodes()[0])
        this.closefrom()
      } else {
        this.dialogVisible = true
      }
    },
    handleCheckChange (data, checked, indeterminate) {
      this.i++
      if (this.i % 2 === 0) {
        if (checked) {
          this.$refs.tree.setCheckedNodes([])
          this.$refs.tree.setCheckedNodes([data])
          // 交叉点击节点
        } else {
          this.$refs.tree.setCheckedNodes([])
          // 点击已经选中的节点，置空
        }
      }
      // var a = this.$refs.tree.getCheckedNodes().length
      // if (a > 0) {
      //   if (checked) {
      //     this.$refs.tree.setCheckedNodes([])
      //     this.$refs.tree.setCheckedNodes([data])
      //     // 交叉点击节点
      //   } else {
      //     this.$refs.tree.setCheckedNodes([])
      //     // 点击已经选中的节点，置空
      //   }
      // }
    }
  }
}
</script>
<style>
    .fromadd {
        width: 100%;
    }
    .tree {
        overflow-y: auto;
        overflow-x: scroll;
        overflow-x: hidden;
        height: 200px;
    }
</style>
