// 处理 axios 请求
import Vue from 'vue'
// 全局导入axios
import axios from 'axios'
import router from '../router'
import { Toast } from 'vant'

// 把axios挂载到vue的原型
Vue.prototype.$axios = axios

// 给axios配置默认的baseURL基准地址
const Url = 'http://localhost:3000'
axios.defaults.baseURL = Url
Vue.prototype.$base = Url

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

Vue.prototype.$url = function (url) {
  if (url.startsWith('http')) {
    // 网络图片
    return url
  } else {
    return Url + url
  }
}
