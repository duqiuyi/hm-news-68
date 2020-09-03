// 定义全局的过滤器
import Vue from 'vue'
// 全局导入moment
import moment from 'moment'

Vue.filter('time', (input, str = 'YYYY-MM-DD') => {
  return moment(input).format(str)
})
