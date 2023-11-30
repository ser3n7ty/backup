import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import * as echarts from 'echarts' // ECharts

// 引入样式
import 'vue-easytable/libs/theme-default/index.css'
// 引入组件库
import VeTable from 'vue-easytable'

Vue.use(ElementUI)
Vue.use(VeTable)
Vue.use({ locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
Vue.prototype.$message = ElementUI.Message
// 全局导入 echarts
Vue.prototype.$echarts = echarts

// 获取 sessionStorage 中的 token，恢复到 store 中
const token = sessionStorage.getItem('token')
if (token) {
  store.commit('SET_TOKEN', token)
}
