<template>
    <div class="contrainer">
        <nav class="navbar navbar-expand-sm bg-light">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <router-link :to="{ name: 'Create' } " class="nav-link">创建</router-link>
                </li>
                 <li class="nav-item">
                    <router-link :to="{ name: 'Index' } " class="nav-link">列表</router-link>
                </li>
            </ul>
        </nav>
        <list-server></list-server>
    </div>
</template>
<script>
import ListServer from './List.vue'
export default {
  components: {
    ListServer
  }
}
</script>
<style>
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }
</style>
