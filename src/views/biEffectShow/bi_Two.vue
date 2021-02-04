<template>
  <div></div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created () {
    const routeData = this.$router.resolve({
      name: 'bi_Two_Info'
    })
    window.open(routeData.href, '_blank')
  }
}
</script>
<style lang="scss" scoped>
</style>
