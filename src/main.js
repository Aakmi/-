import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import ElementUI from 'element-ui'
import axios from 'axios'


axios.defaults.baseURL='https://lianghj.top:8888/api/private/v1/'
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$http=axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
