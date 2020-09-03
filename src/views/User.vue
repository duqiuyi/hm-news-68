<template>
  <div class="user">
    <div class="header" @click='$router.push("/user-edit")'>
      <div class="avatar">
        <!-- 路径为绝对路径 -->
        <img :src="$axios.defaults.baseURL + user.head_img" alt="">
      </div>
      <div class="info">
        <div class="name">
          <span v-if="user.gender === 1" class="iconfont iconxingbienan"></span>
          <span v-else class="iconfont iconxingbienv"></span>
          <span>{{user.nickname}}</span>
        </div>
        <div class="time">{{user.create_date | time}}</div>
      </div>
      <div class="arror">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <!-- 导航条 -->
    <hm-navitem to='/follow'>
      <template>我的关注</template>
      <template v-slot:content>关注的内容</template>
    </hm-navitem>
    <hm-navitem to='/comment'>
      <template>我的跟帖</template>
      <template #content>跟帖/回复</template>
    </hm-navitem>
    <hm-navitem>
      <template>我的收藏</template>
      <template #content>文章/视频</template>
    </hm-navitem>
    <hm-navitem to='/user-edit'>
      <template>设置</template>
    </hm-navitem>
    <div style="margin: 15px">
      <van-button type="primary" block @click='logout'>退出</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: ''
    }
  },
  async created () {
    // token 必须放入请求头中,请求头 Authorization
    // const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    // const res = await this.$axios.get(`/user/${userId}`, {
    //   // 设置请求头
    //   headers: {
    //     Authorization: token
    //   }
    // })
    const res = await this.$axios.get(`/user/${userId}`) // => 通过axios的拦截器进行添加
    // console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
    } else if (statusCode === 401) {
      this.$toast.fail('用户验证失败')
      this.$router.push('/login')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    }
  },
  methods: {
    async logout () {
      // console.log('qwe')
      // 弹出框提醒
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确定要退出吗?'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        this.$router.push('/login')
        this.$toast.success('退出成功')
      } catch {
        this.$toast('取消退出')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.user {
  .header {
    display: flex;
    align-items: center;
    font-size: 14px;
    padding: 27px 20px;
    border-bottom: 5px solid #ccc;
    .avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      flex: 1;
      padding-left: 20px;
      .name {
        .iconxingbienan {
          margin-right: 5px;
          color: skyblue;
        }
        .iconxingbienv {
          margin-right: 5px;
          color: pink;
        }
      }
      .time{
        margin-top: 10px;
        color: #666;
      }
    }
  }
}
</style>
