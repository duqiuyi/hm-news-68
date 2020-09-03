<template>
  <div>
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="register">
      <van-field
        v-model="user.username"
        placeholder="请输入用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="user.nickname"
        placeholder="请输入你的昵称"
        :rules="rules.nickname"
      />
      <van-field
        v-model="user.password"
        type="password"
        placeholder="请输入密码"
        :rules="rules.password"
      />
      <div>
        <van-button block type="info" native-type="submit">
          提交
        </van-button>
      </div>
      <div class="tips">已有账号?去<router-link to="/login">登录</router-link></div>
    </van-form>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      user: {
        username: '',
        nickname: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '用户名长度为5-11位数字', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '密码长度为3-9位数字', trigger: 'onChange' }
        ],
        nickname: [
          { required: true, message: '昵称不能为空', trigger: 'onChange' },
          { pattern: /^[\u4e00-\u9fa5]{2,6}$/, message: '昵称必须为2-6位中文', trigger: 'onChange' }
        ]
      }
    }
  },
  methods: {
    async register () {
      const res = await this.$axios.post('/register', this.user)
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        // 拼接参数
        // this.$router.push(`/login?username=${this.user.username}&password=${this.user.password}`)
        // 另一种写法
        this.$router.push({
          // path: '/login',
          // query: {
          //   username: this.user.username,
          //   password: this.user.password
          // }
          // 简写
          // query: this.user

          // 通过 params 传参
          name: 'login',
          params: this.user
        })
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.van-form{
  padding: 0 25px;
  .van-cell{
    background-color: transparent;
    border-bottom: 1px solid #757575;
    margin-bottom: 15px;
  }
  .van-button--info{
    background-color: #D81E06;
    border: 1px solid #D81E06;
    margin-top: 40px;
  }
  .tips{
    font-size: 14px;
    text-align: right;
    margin-top: 16px;
    a{
      color: tomato;
    }
  }
}
</style>
