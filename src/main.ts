import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'normalize.css/normalize.css'
import './styles/index.scss'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './components'
import './filters'
import './router/permission'

Vue.use(Element, {
  size: 'small',
  zIndex: 3000
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
