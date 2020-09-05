// 用于全局注册组件
import Vue from 'vue'
// 全局注册头部组件
import HmHeader from '../components/HmHeader.vue'
// 全局注册logo组件
import HmLogo from '../components/HmLogo.vue'
// 全局注册导航条组件
import HmNavitem from '../components/HmNavitem.vue'
// 文章组件
import HmPost from '../components/HmPost.vue'
// 评论组件
import HmComment from '../components/HmComment.vue'
// 楼层组件
import HmFloor from '../components/HmFloor.vue'

Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-navitem', HmNavitem)
Vue.component('hm-post', HmPost)
Vue.component('hm-comment', HmComment)
Vue.component('hm-floor', HmFloor)
