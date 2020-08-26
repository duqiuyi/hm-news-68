import Vue from 'vue'
import App from './App.vue'
// 导入路由
import router from './router'

// 导入通用样式
import './styles/base.less'
import './styles/iconfont.css'

// 导入vant
// 导入所有组件(方便)
// import vant from 'vant'
// import 'vant/lib/index.css'

// Vue.use(vant)

// 自动按需引入组件(轻量)
import 'vant/lib/index.css'
import { Button } from 'vant'
Vue.use(Button)

// 清除vue自带的提示信息
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
