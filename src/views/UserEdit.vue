<template>
  <div class="uersedit">
    <hm-header>编辑资料</hm-header>
    <!-- 头像 -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + user.head_img" alt="">
    </div>
    <!-- 导航 -->
    <hm-navitem @click='showNickname'>
      <template>昵称</template>
      <template #content>{{user.nickname}}</template>
    </hm-navitem>
    <hm-navitem @click='showPassword'>
      <template>密码</template>
      <template #content>******</template>
    </hm-navitem>
    <hm-navitem @click='showGender'>
      <template>性别</template>
      <template #content>{{user.gender === 1 ? '男' : '女 '}}</template>
    </hm-navitem>
    <!-- 修改昵称的弹框 -->
    <van-dialog v-model="isShowNickname" title="昵称修改" show-cancel-button @confirm='updataNickname'>
      <van-field v-model="nickname" placeholder="请输入用户名" />
    </van-dialog>
    <!-- 修改密码的弹框 -->
    <van-dialog v-model="isShowPassword" title="请修改密码" show-cancel-button @confirm='updataPassword'>
      <van-field v-model="password" placeholder="请输入密码" />
    </van-dialog>
    <!-- 修改性别 -->
    <van-dialog v-model="isShowGender" title="修改性别" show-cancel-button @confirm='updataGender'>
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: '',
      isShowNickname: false,
      nickname: '',
      isShowPassword: false,
      password: '',
      isShowGender: false,
      gender: 1
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      // 发送请求获取个人信息
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    },
    showNickname () {
      this.isShowNickname = true
      this.nickname = this.user.nickname
    },
    // 封装修改函数
    async updateuser (data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      if (res.data.statusCode === 200) {
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    async updataNickname () {
      this.updateuser({
        nickname: this.nickname
      })
    },
    showPassword () {
      this.isShowPassword = true
      this.password = this.user.password
    },
    async updataPassword () {
      // const userId = localStorage.getItem('userId')
      // const res = await this.$axios.post(`/user_update/${userId}`, {
      //   password: this.password
      // })
      // if (res.data.statusCode === 200) {
      //   this.getUserInfo()
      //   this.$toast.success('修改成功')
      // }
      this.updateuser({
        password: this.password
      })
    },
    showGender () {
      this.isShowGender = true
      this.gender = this.user.gender
    },
    updataGender () {
      this.updateuser({
        gender: this.gender
      })
    }
  }
}
</script>

<style lang='less' scoped>
// scoped 会给当前所有组件添加 data-v-xxxx 属性,但是不包括动态渲染的属性
.avatar {
  padding: 40px 0;
  text-align: center;
  img {
    widows: 100px;
    height: 100px;
    border-radius: 50%;
  }
}
// 深度选择器的三种写法
// >>> ===> css写法
// /deep/ ===> less写法
// ::v-deep ===> sass写法
/deep/ .van-dialog__content{
  padding: 20px;
  .van-field {
    border: 1px solid #ccc;
  }
}
</style>
