<template>
  <nav class="navbar box p-0 m-0" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            id="burger"
            aria-expanded="false"
            data-target="navbar"
            v-on:click="toggleBurger()"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbar" class="navbar-menu">
        <router-link class="navbar-item" to="/">Home</router-link>
        <router-link class="navbar-item" to="/blog">Blog</router-link>
        <div class="navbar-end">
          <socialmedia></socialmedia>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import socialmedia from "@/components/socialmedia";

export default {
  name: "navbar",
  props: {},
  methods: {
    toggleBurger: function () {
      document.getElementById("burger").classList.toggle("is-active");
      document.getElementById("navbar").classList.toggle("is-active");
    },
  },
  components: {
    socialmedia
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  border-radius: 0;
}

.navbar-end {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>