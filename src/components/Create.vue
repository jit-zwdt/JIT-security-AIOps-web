<template>
    <div class="container">
        <div class="card-header">
            <h3>创建</h3>
        </div>
        <div class="card-body">
            <form v-on:submit.prevent="addItem">
                <div class="form-group">
                    <label>服务器名称</label>
                    <input type="text" class="form-control" v-model="serverResource.serverName">
                </div>
                 <div class="form-group">
                    <label>服务器内网ip</label>
                    <input type="text" class="form-control" v-model="serverResource.serverInnerIp">
                </div>
                 <div class="form-group">
                    <label>服务器外网ip</label>
                    <input type="text" class="form-control" v-model="serverResource.serverOuterIp">
                </div>
                 <div class="form-group">
                    <label>服务器类型</label>
                    <select class="form-control" v-model="serverResource.serverType">
                       <option value="1">应用服务器</option>
                       <option value="2">数据库服务器</option>
                       <option value="3">多用途服务器</option>
                    </select>
                </div>
                 <div class="form-group">
                    <label>服务器用途</label>
                    <textarea class="form-control" v-model="serverResource.serverUse" rows="3"></textarea>
                </div>
                <div class="form-group">
                     <button type="submit" class="btn btn-primary">保存</button>
                     <button type="button" class="btn btn-secondary ml-2" @click="back">返回</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      serverResource: {}
    }
  },
  methods: {
    addItem () {
      var _this = this
      this.axios.post('/server', this.serverResource).then((resp) => {
        if (resp.status === 200) {
          var json = resp.data
          if (json.code === 1) {
            alert(json.msg)
            _this.$router.replace({ path: '/index' })
          }
        }
      })
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
