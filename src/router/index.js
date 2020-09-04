import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入组件
import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
import User from '../views/user/User.vue'
import UserEdit from '../views/user/UserEdit.vue'
import MyFollow from '../views/user/MyFollow.vue'
import MyComment from '../views/user/MyComment.vue'
import MyStar from '../views/user/MyStar.vue'

import Demo from '../views/Demo.vue'

import Index from '../views/news/index.vue'
import Manage from '../views/news/Manage.vue'
import PostDetail from '../views/news/PostDetail.vue'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  { path: '/login', component: Login, name: 'login' },
  {
    path: '/register',
    component: Register,
    name: 'register'
    // beforeEnter (to, from, next) {
    //   console.log('路由独享守卫')
    //   next()
    // }
  },
  { path: '/user', component: User, name: 'user' },
  { path: '/user-edit', component: UserEdit, name: 'user-edit' },
  { path: '/demo', component: Demo, name: 'demo' },
  { path: '/follow', component: MyFollow, name: 'myfollow' },
  { path: '/comment', component: MyComment, name: 'mycomment' },
  { path: '/star', component: MyStar, name: 'mystar' },
  { path: '/', component: Index, name: 'index' },
  { path: '/manage', component: Manage, name: 'manage' },
  { path: '/post/:id', component: PostDetail, name: 'post' }
]

const router = new VueRouter({
  routes
})

// 配置全局导航守卫
// to: 到哪去
// from: 从哪里来
// next: 是一个函数,代表是否放行
// 前置导航守卫
// router.beforeEach(function (to, from, next) { // 只要路由发生跳转,跳转之前这个函数就要执行

// })

// 后置导航守卫 => 没有next函数
// router.afterEach(function (to, from) {
//   console.log(to, from)
// })

// 判断to的path是否是 /user,判断用户是否是去个人中心
// 1.如果不是去个人中心, next()
// 2.如果是去个人中心,判断是否有token,如果有就next(),没有就跳转到登录
router.beforeEach(function (to, from, next) {
  // if (to.name === 'user') {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     next()
  //   } else {
  //     router.push('/user')
  //   }
  // } else {
  //   next()
  // }
  // 优化
  const token = localStorage.getItem('token')
  const authUrl = ['/user', '/user-edit', '/follow', '/comment', '/star']
  if (!authUrl.includes(to.path) || token) {
    next()
  } else {
    router.push('/login')
  }
})

export default router
