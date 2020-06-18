<template>
  <div>
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        :background="false"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :pager-count="5"
        :page-sizes="pageSizes"
        :page-size="page.page_pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="currentTotal"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    currentTotal: {
      type: Number
    }, // 总条数
    currentPage: {
      type: Number
    }
  },
  data () {
    return {
      pageSizes: [10, 20, 50, 100],
      page: {
        page_currentPage: 1,
        page_pageSize: 15
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      this.page.page_pageSize = val
      this.$emit('pageChange', this.page)
    },
    handleCurrentChange (val) {
      this.page.page_currentPage = val
      this.$emit('pageChange', this.page)
    }
  }
}
</script>
