<template>
    <div>
        <Pdf ref="pdfSearch" :src="src" :fileId="fileId" />
        <ToolBar>
            <div class="queryleft">
                <el-input type="text" style="width: 250px" @keyup.enter.native="showInfo" v-model="nameTop" size="small" placeholder="巡检报告名称" clearable></el-input>
                <!--<el-date-picker style="width: 400px" v-model="gmtCreate" type="datetimerange" size="small" value-format="yyyy-MM-ddTHH:mm:ss.SSSZ" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>-->
                <el-date-picker
                        size="small"
                        v-model="timefrom"
                        value-format="yyyy-MM-ddTHH:mm:ss.SSSZ"
                        type="datetime"
                        clearable
                        placeholder="选择开始日期时间">
                </el-date-picker>
                <el-date-picker
                        size="small"
                        v-model="timetill"
                        value-format="yyyy-MM-ddTHH:mm:ss.SSSZ"
                        type="datetime"
                        clearable
                        placeholder="选择结束日期时间">
                </el-date-picker>
                <el-button type="primary" size="small" @click="currentPage = 1 ; selectTime()" icon="el-icon-search">查询</el-button>
                <el-button type="primary" size="small" @click="showClear() == false">重置</el-button>
            </div>
            <div class="queryright"></div>
        </ToolBar>
        <el-table
                :data="tableData"
                v-loading="loading"
                border
                style="width: 100%"
                :row-style="tableRowStyle"
                :header-cell-style="tableHeaderColor"
        >
            <el-table-column label="id" prop="id" :resizable="false" v-if="show"></el-table-column>
            <el-table-column label="巡检名称" prop="schemeName" :resizable="false"></el-table-column>
            <el-table-column label="创建时间" prop="gmtCreate" :formatter="formatDate" min-width="20%"></el-table-column>
            <el-table-column align="center" label="操作" min-width="18">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            slot="reference"
                            icon="el-icon-edit-outline"
                            @click="loadinfo(scope.$index, scope.row)"
                    >预览</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页插件 -->
        <Pagination :currentTotal="currentTotal" @pageChange="pageChange" :currentPage="currentPage"></Pagination>
    </div>
</template>
<script>
import Pdf from '@/components/Pdf.vue'
import Pagination from '@/components/Pagination.vue'
import { formatTodate } from '@/utils/format.js'
import axios from 'axios'
export default {
  components: { Pdf, Pagination },
  data () {
    return {
      // 查询文字
      nameTop: '',
      // 是否显示 id
      show: false,
      // 传入 pdf 的路径
      src: '',
      // 传入 pdf 的 filedId
      fileId: '',
      // 时间指示器
      gmtCreate: [],
      // 当前页
      currentPage: 1,
      // 一页的条数
      pageSize: 15,
      // 页面条数
      currentTotal: 0,
      loading: true,
      // 需要显示的数据对象
      tableData: [],
      timefrom: '',
      timetill: ''
    }
  },
  created () {
    // this.loadinfo()
    // 调用查询方法初始化数据
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
    selectTime () {
      if (this.timefrom !== '' && this.timetill !== '') {
        if (this.timefrom <= this.timetill) {
          this.timefrom = new Date(this.timefrom)
          this.timetill = new Date(this.timetill)
          this.showInfo()
        } else {
          this.$message({
            message: '开始时间不能大于结束时间!',
            type: 'error'
          })
        }
      } else if (this.timefrom === '' && this.timetill === '') {
        this.timefrom = ''
        this.timetill = ''
        this.showInfo()
      } else {
        this.$message({
          message: '请选择完整时间范围!',
          type: 'error'
        })
      }
    },
    // 查询方法
    showInfo () {
      this.loading = true
      this.setTimeoutster = window.setTimeout(() => {
        this.axios.post(this.$api.inspectionManager.getMonitorSchemeTimerTasks, {
          param: {
            schemeName: this.nameTop,
            parentId: '1',
            startGmtCreate: this.timefrom,
            endGmtCreate: this.timetill
          },
          page: this.currentPage,
          size: this.pageSize
        }).then((resp) => {
          if (resp.status === 200) {
            var json = resp.data
            if (json.code === 1) {
              this.tableData = json.data.dataList
              this.currentTotal = json.data.totalRow
              this.loading = false
            }
          } else {
            this.$message({
              message: '查询失败',
              type: 'error'
            })
          }
        })
      }, 300)
    },
    // 重置方法
    showClear () {
      this.nameTop = ''
      this.timefrom = ''
      this.timetill = ''
      this.showInfo()
    },
    // 格式化日期
    formatDate (row, column) {
      let data = ''
      data = row[column.property]
      if (data == null) {
        return ''
      }
      return formatTodate(data, 'YYYY-MM-DD HH:mm:ss')
    },
    // 页码改变时触发的方法
    pageChange (item) {
      this.currentPage = item.page_currentPage
      this.pageSize = item.page_pageSize
      this.showInfo()
    },
    // 点击预览进行 PDF 文件的查看
    loadinfo (index, row) {
      axios({
        method: 'post',
        url: this.$api.inspectionManager.downloadSftpPdf,
        params: {
          ftpFilePath: row.ftpUrl
        },
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        },
        responseType: 'blob'
      }).then(response => {
        const binaryData = []
        binaryData.push(response.data)
        this.pdfUrl = window.URL.createObjectURL(new Blob(binaryData, { type: 'application/pdf' }))
        window.open(this.pdfUrl)
        // 内部打开
        // const url = window.URL.createObjectURL(new Blob(binaryData, { type: 'application/pdf;chartset=utf-8' }))
        // this.src = url
        // this.$refs.pdfSearch.handleOpen()
      }).catch(function (error) {
        console.log(error)
      })
    }

  }
}
</script>
