<template>
  <div>
    <ToolBar>
      <div class="queryleft">
      </div>
      <div class="queryright">
        <el-button type="primary" size="small" v-print="'#print'">打印</el-button>
        <el-button type="primary" size="small" @click="exportReport() == false">导出</el-button>
      </div>
    </ToolBar>
    <div style="background-color: white;" id="print">
      <div style="text-align: center;">
        <h2 style="padding-top: 5px">运维日报</h2>
      </div>
      <div style="width: 100%;height:100%">
        <table style="width: 100%;">
          <tr>
            <td style="width: 80%;">运维人:{{this.dailyOperationsData.operationUser}}</td>
            <td style="width: 20%;text-align: right">时间:{{this.dailyOperationsData.operationTime}}</td>
          </tr>
        </table>
        <table style="width: 100%;border: 1px solid black;text-align: center">
          <tr style="border-top: 1px solid black;">
            <th style="width: 10%;border-left: 1px solid black;">类别</th>
            <th style="width: 10%;border-left: 1px solid black;">当日新增数</th>
            <th style="width: 70%;border-left: 1px solid black;">当日新增详情</th>
            <th style="width: 10%;border-left: 1px solid black;">本月总数</th>
          </tr>
          <tr style="border-top: 1px solid black;height: 60px;">
            <td style="width: 10%;border-left: 1px solid black;">出现问题</td>
            <td style="width: 10%;border-left: 1px solid black;">{{this.dailyOperationsData.newProblemNum}}
            </td>
            <td style="width: 70%;border-left: 1px solid black;text-align: left;"
                v-html="this.dailyOperationsData.newProblemDetail">
            </td>
            <td style="width: 10%;border-left: 1px solid black;">{{this.dailyOperationsData.newProblemTotal}}
            </td>
          </tr>
          <tr style="border-top: 1px solid black;height: 60px;">
            <td style="width: 10%;border-left: 1px solid black;">认领问题</td>
            <td style="width: 10%;border-left: 1px solid black;">{{this.dailyOperationsData.claimedProblemNum}}</td>
            <td style="width: 70%;border-left: 1px solid black;text-align: left;"
                v-html="this.dailyOperationsData.claimedProblemDetail">
            </td>
            <td style="width: 10%;border-left: 1px solid black;">{{this.dailyOperationsData.claimedProblemTotal}}
            </td>
          </tr>
          <tr style="border-top: 1px solid black;height: 60px;">
            <td style="width: 10%;border-left: 1px solid black;">处理中问题</td>
            <td style="width: 10%;border-left: 1px solid black;">{{this.dailyOperationsData.processingProblemNum}}
            </td>
            <td style="width: 70%;border-left: 1px solid black;text-align: left;"
                v-html="this.dailyOperationsData.processingProblemDetail">
            </td>
            <td style="width: 10%;border-left: 1px solid black;">
              {{this.dailyOperationsData.processingProblemTotal}}
            </td>
          </tr>
          <tr style="border-top: 1px solid black;height: 60px;">
            <td style="width: 10%;border-left: 1px solid black;">解决问题</td>
            <td style="width: 10%;border-left: 1px solid black;">{{this.dailyOperationsData.solvedProblemNum}}</td>
            <td style="width: 70%;border-left: 1px solid black;text-align: left;"
                v-html="this.dailyOperationsData.solvedProblemDetail">
            </td>
            <td style="width: 10%;border-left: 1px solid black;">{{this.dailyOperationsData.solvedProblemTotail}}
            </td>
          </tr>
          <tr style="border-top: 1px solid black;height: 100px;">
            <td colspan="4" style="width: 100%;"></td>
          </tr>
          <tr style="height: 60px;">
            <td colspan="2" style="width: 20%;text-align: right">负责人（签字）</td>
            <td style="width: 40%;"></td>
            <td style="width: 20%;text-align: left">日期</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    reloadData () {
      this.showInfo()
    },
    showInfo () {
      this.loading = true
      const _this = this
      this.setTimeoutster = window.setTimeout(() => {
        _this.showInfoTimeout()
      }, 300)
    },
    showInfoTimeout () {
      this.axios.get(this.$api.dailyOperationReportManager.getDailyOperationReported, { params: { id: this.id } }).then(resp => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            this.dailyOperationsData = json.data
            this.loading = false
          }
        }
      })
    }
  },
  data () {
    return {
      loading: true,
      id: '',
      dailyOperationsData: {
        operationUser: '',
        operationTime: '',
        newProblemNum: '',
        newProblemDetail: '',
        newProblemTotal: '',
        newProblemRemark: '',
        claimedProblemNum: '',
        claimedProblemDetail: '',
        claimedProblemTotal: '',
        claimedProblemRemark: '',
        processingProblemNum: '',
        processingProblemDetail: '',
        processingProblemTotal: '',
        processingProblemRemark: '',
        solvedProblemNum: '',
        solvedProblemDetail: '',
        solvedProblemTotail: '',
        solvedProblemRemark: ''
      }
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.showInfo()
  },
  actions: {}
}
</script>
