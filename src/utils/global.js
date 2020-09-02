// 用于全局注册组件
import Vue from 'vue'
// 全局注册头部组件
import HmHeader from '../components/HmHeader.vue'
// 全局注册logo组件
import HmLogo from '../components/HmLogo.vue'
// 全局注册导航条组件
import HmNavitem from '../components/HmNavitem.vue'

Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-navitem', HmNavitem)
