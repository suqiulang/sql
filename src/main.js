import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/common/clearDefault.css'
import '@/common/detail.css'
import '@/mock/mock.js'
import '@/router/guard'
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  beforeCreate(){
     Vue.prototype.$bus=this
  },
  render: h => h(App),
}).$mount('#app')
