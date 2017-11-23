import Vue from 'vue'
import ElementUI from 'element-ui'
import 'font-awesome/css/font-awesome.min.css'
import 'element-ui/lib/theme-default/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限
import qs from 'qs'

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
Vue.prototype.$qs = qs

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
