<template>
  <div class="body-main">
    <div v-if="system.windowType === 0">
      <Breadcrumb v-if="system.navType === 1" />
      <NavBar v-if="system.navType === 2" />
    </div>
    <div class="content">
      <div
        :class="{
          'content-view': system.windowType === 0,
          'content-view-2': system.windowType === 1,
        }"
      >
        <router-view />
      </div>
      <Footer v-if="system.windowType === 0" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb.vue'
import NavBar from '@/components/NavBar.vue'
import Footer from './Footer.vue'
export default {
  name: 'BodyMain',
  data () {
    return {}
  },
  methods: {},
  computed: mapState(['system']),
  components: { Breadcrumb, NavBar, Footer }
}
</script>
<style lang="scss">
@import '~@/assets/css/variables.scss';
.body-main {
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #ecf0f5;
  height: calc(100vh - #{$--top-height});
  .content {
    .content-view {
      max-height: calc(100vh - 39px - #{$--top-height} - #{$--top-height});
      // overflow: hidden;
      overflow-x: auto;
      overflow-y: auto;
      padding: 6px;
      min-height: calc(100vh - 39px - #{$--top-height} - #{$--top-height});
    }
    .content-view-2 {
      max-height: calc(100vh - 52px);
      // overflow: hidden;
      overflow-x: auto;
      overflow-y: auto;
      padding: 6px;
      min-height: calc(100vh - 39px - #{$--top-height} - #{$--top-height});
    }
  }
}
</style>
