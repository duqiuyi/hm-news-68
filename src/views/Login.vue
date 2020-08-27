<template>
  <div>
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="login">
      <van-field
        v-model="username"
        placeholder="请输入用户名"
        :rules="rules.username"
      />
      <van-field
        v-model="password"
        type="password"
        placeholder="请输入密码"
        :rules="rules.password"
      />
      <div>
        <van-button block type="info" native-type="submit">
          提交
        </van-button>
      </div>
      <div class="tips">已有账号?去<router-link to="/register">注册</router-link></div>
    </van-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '用户名长度为5-11位数字', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '请填写密码', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '密码长度为3-9位数字', trigger: 'onChange' }
        ]
      }
    }
  },
  methods: {
    async login () {
      const res = await axios.post('http://localhost:3000/login', {
        username: this.username,
        password: this.password
      })
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        // 保存token
        // 跳转到个人中心
        this.$router.push('/user')
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang='less'>
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
