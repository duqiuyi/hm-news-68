import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from './router'

// 导入通用样式
import './styles/base.less'
import './styles/iconfont.css'

// 全局注册组件
import './utils/global'
// 全局配置axios请求
import './utils/request'
// 全局注册过滤器
import './utils/filters'
// 全局导入vant
import './utils/vant'

// 导入amfe-flexible
import 'amfe-flexible'

// 清除vue自带的提示信息
Vue.config.productionTip = false

// 创建一个bus
const bus = new Vue({})
// 挂载到vue原型
Vue.prototype.$bus = bus

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
