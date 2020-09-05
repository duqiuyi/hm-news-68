// 定义全局的过滤器
import Vue from 'vue'
// 全局导入moment
import moment from 'moment'
// 给moment全局定义语言环境
moment.locale('zh-CN')

Vue.filter('time', (input, str = 'YYYY-MM-DD') => {
  return moment(input).format(str)
})

Vue.filter('now', input => {
  return moment(input).fromNow()
})
