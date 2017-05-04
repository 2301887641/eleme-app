// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// 这里引入整体的styl样式
import './common/stylus/index.styl'

// 使用axios
Vue.prototype.$http = axios
Vue.config.productionTip = false
// 错误状态码
window.ERROR_OK = 0
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
