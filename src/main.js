import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from './router'

// 导入通用样式
import './styles/base.less'
import './styles/iconfont.css'

// 导入vant
// 导入所有组件(方便)
import Vant from 'vant'
import 'vant/lib/index.css'
// 导入amfe-flexible
import 'amfe-flexible'

Vue.use(Vant)

// 清除vue自带的提示信息
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
