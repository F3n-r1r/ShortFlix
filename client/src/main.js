import router from './router'
import store from './store'
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';

Vue.config.productionTip = false

// Automatically use Axios in component when we do this.$http
Vue.prototype.$http = axios;
// Get token from localstorage
const token = localStorage.getItem('token');
// Set Authorization header to token, so its automatically send with every request
if(token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token;
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
