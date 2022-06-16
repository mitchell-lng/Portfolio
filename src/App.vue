<template>
  <div id="app">
    <navbar></navbar>
    <div class="router">
      <router-view></router-view>
    </div>
    <footing></footing>
  </div>
</template>

<script>
import navbar from "@/components/navbar";
import footing from "@/components/footing";

export default {
  name: 'App',
  components: {
    navbar,
    footing
  },
}
</script>

<style scoped>
.router {
  min-height: 80vh;
}
</style>