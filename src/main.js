// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
<<<<<<< HEAD
import axios from 'axios'
// 使用axios
Vue.prototype.$http = axios
Vue.config.productionTip = false
=======

Vue.config.productionTip = false

>>>>>>> 02e8e0e0170988d9a146625f3c5822e56957a99e
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
