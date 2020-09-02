// 定义全局的过滤器
import Vue from 'vue'
// 全局导入moment
import moment from 'moment'

Vue.filter('time', input => {
  return moment(input).format('YYYY-MM-DD')
})
