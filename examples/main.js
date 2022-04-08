// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '../packages/store/store'
import 'utils/setHtmlFontSize'
import '../packages/assets/index.css'
import myComponents from '../packages/index'

Vue.use(myComponents)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
