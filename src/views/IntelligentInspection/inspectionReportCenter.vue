<template>
  <div>
    <Pdf ref="pdfSearch" :src="src" :fileId="fileId" />
    <ToolBar>
      <div class="queryleft">
        <el-input type="text" v-model="nameTop" size="small" placeholder="巡检报告名称" clearable></el-input>
        <el-button type="primary" size="small" @click="showInfo() == false" icon="el-icon-search">查询</el-button>
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
      <el-table-column label="巡检名称" prop="name" :resizable="false"></el-table-column>
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
  </div>
</template>
<script>
import Pdf from '@/components/Pdf.vue'
import axios from 'axios'
export default {
  components: { Pdf },
  data () {
    return {
      nameTop: '',
      show: false,
      src: '',
      fileId: '',
      tableData: [
        {
          id: '1',
          name: '巡检-监控信息'
        }
      ]
    }
  },
  created () {
    // this.loadinfo()
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
    showInfoshowInfo () {
    },
    showClear () {
      this.nameTop = ''
    },
    loadinfo () {
      // this.axios
      //   .post(this.$api.inspectionManager.makePdf, { responseType: 'arraybuffer' }).then(resp => {
      //     console.log(resp)
      //     if (resp.status === 200) {
      //       var json = resp.data
      //       console.log(json)
      //       const binaryData = []
      //       binaryData.push(json)
      //       this.pdfUrl = window.URL.createObjectURL(new Blob(binaryData, { type: 'application/pdf' }))
      //       window.open(this.pdfUrl)
      //       // console.log(binaryData)
      //       // const url = window.URL.createObjectURL(new Blob(binaryData, { type: 'application/pdf;chartset=utf-8' }))
      //       // // 将转化后 url 赋值给 vue-pdf 插件
      //       // this.src = url
      //       // this.$refs.pdfSearch.handleOpen()
      //     }
      //   })
      axios({
        method: 'post',
        url: this.$api.inspectionManager.makePdf,
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        },
        responseType: 'blob'
      }).then(response => {
        const binaryData = []
        binaryData.push(response.data)
        console.log(response.data)
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
