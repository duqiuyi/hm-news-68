import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from './router'

// 导入通用样式
import './styles/base.less'
import './styles/iconfont.css'

// 导入vant
// 导入所有组件(方便)
import Vant, { Toast } from 'vant'
import 'vant/lib/index.css'
// 导入amfe-flexible
import 'amfe-flexible'

// 全局注册头部组件
import HmHeader from './components/HmHeader.vue'
// 全局注册logo组件
import HmLogo from './components/HmLogo.vue'
// 全局注册导航条组件
import HmNavitem from './components/HmNavitem.vue'
// 全局导入axios
import axios from 'axios'
// 全局导入moment
import moment from 'moment'

// 把axios挂载到vue的原型
Vue.prototype.$axios = axios

// 给axios配置默认的baseURL基准地址
axios.defaults.baseURL = 'http://localhost:3000'

// axios 的请求拦截器
axios.interceptors.request.use(function (config) {
  // config指的是请求的配置信息
  // console.log('拦截到了请求', config)
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// axios 的响应拦截器
axios.interceptors.response.use(function (response) {
  // console.log('拦截到了响应', response)
  const { statusCode, message } = response.data
  if (statusCode === 401 && message === '用户信息验证失败') {
    // 1.跳转到登录页面
    router.push('/login')
    // 2.清除失效的信息
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    // 3.提示用户验证失败
    Toast.fail('登录信息失效')
  }
  return response
})

Vue.use(Vant)

Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-navitem', HmNavitem)

Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})

// 清除vue自带的提示信息
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
