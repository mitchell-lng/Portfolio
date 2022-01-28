<template>
  <div id="app">
    <navbar></navbar>
    <router-view></router-view>
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