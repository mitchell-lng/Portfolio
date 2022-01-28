import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'

import Home from './pages/Home.vue'
import Blog from "@/pages/Blog";

Vue.use(Router)

Vue.config.productionTip = false

require('@/assets/main.scss');

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog
    }
  ]
})

new Vue({
  el: '#app',
  render: h => h(App),
  router
})