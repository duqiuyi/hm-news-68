<template>
  <div class="post">
    <div class="placeholder"></div>
    <div class="header">
      <div class="left">
        <span class="iconfont iconjiantou2" @click='$router.back()'></span>
      </div>
      <div class="center">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="right">
        <div class="followed" v-if="post.has_follow" @click='unfollow'>已关注</div>
        <div class="follow" v-else @click='follow'>关注</div>
      </div>
    </div>
    <div class="article">
      <div class="title">{{post.title}}</div>
      <div class="info">
        <span class="name">{{post.user.nickname}}</span>
        <span class="time">{{post.create_date | time}}</span>
      </div>
      <div v-if="post.type === 1" class="content" v-html="post.content"></div>
      <video v-else :src='getUrl(post.content)' controls autoplay muted></video>
    </div>
    <div class="buttons">
      <div class="good" @click='like' :class="{active: post.has_like}">
        <span class="iconfont icondianzan"></span>
        <span>{{post.like_length}}</span>
      </div>
      <div class="share">
        <span class="iconfont iconweixin"></span>
        <span>微信</span>
      </div>
    </div>
    <!-- 评论 -->
    <div class="comment-list">
      <h3>精彩跟帖</h3>
      <hm-comment :comment='comment' v-for="comment in commentList" :key="comment.id" @reply='onReply'></hm-comment>
    </div>
    <div class="footer-input" v-if="isShowInput">
      <input type="text" placeholder="回复" @click="onFocus">
      <span class="iconfont iconpinglun-"><i>{{count}}</i></span>
      <span class="iconfont iconshoucang" :class="{star: post.has_star}" @click='star'></span>
      <span class="iconfont iconfenxiang"></span>
    </div>
    <div class="footer-textarea" v-else>
      <textarea ref="textarea" :placeholder="'回复: ' + nickname" v-model="content"></textarea>
      <button @click="send">发送</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      post: {
        user: {}
      },
      commentList: [],
      isShowInput: true,
      content: '',
      nickname: '',
      replyId: '',
      count: ''
    }
  },
  created () {
    // 获取文章
    this.getInfo()
    // 获取文章的评论列表
    this.getCommentList()
    // 给bus注册自定义事件
    this.$bus.$on('reply', this.onReply)
  },
  destroyed () {
    this.$bus.$off('reply', this.onReply)
  },
  methods: {
    // 获取文章
    async getInfo () {
      const res = await this.$axios.get(`/post/${this.$route.params.id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
        console.log(this.post)
      }
    },
    // 获取评论列表
    async getCommentList () {
      const res = await this.$axios.get(`/post_comment/${this.$route.params.id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        console.log(this.commentList)
        this.count = this.commentList.length
      }
    },
    getUrl (url) {
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
    },
    // 封装一个函数,判断是否登录
    noLogin () {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        // 代表没有登录
        return true
      } else {
        // 代表登录
        return false
      }
    },
    async follow () {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/user_follows/${this.post.user.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    async unfollow () {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/user_unfollow/${this.post.user.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    async like () {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/post_like/${this.post.id}`)
      if (res.data.statusCode === 200) {
        this.$toast.success(res.data.message)
        this.getInfo()
      }
    },
    async star () {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/post_star/${this.post.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    async onFocus () {
      this.isShowInput = false
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    async send () {
      const res = await this.$axios.post(`/post_comment/${this.post.id}`, {
        content: this.content,
        parent_id: this.replyId
      })
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getCommentList()
        this.content = ''
        this.isShowInput = true
        this.nickname = ''
        this.replyId = ''
      }
    },
    async onReply (id, nickname) {
      this.isShowInput = false
      await this.$nextTick()
      this.$refs.textarea.focus()

      // 回显nickname
      this.nickname = '@' + nickname
      this.replyId = id
    }
  }
}
</script>

<style lang='less' scoped>
.post {
  padding-bottom: 50px;
}
.placeholder {
  height: 50px;
  background-color: #F2F2F2;
}
.header {
  position: fixed;
  top: -1px;
  width: 100%;
  background-color: #F2F2F2;
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  height: 50px;
  align-items: center;
  .left {
    margin-right: 10px;
  }
  .center {
    flex: 1;
    span {
      font-size: 50px;
    }
  }
  .right {
    font-size: 12px;
    div {
      width: 50px;
      height: 24px;
      text-align: center;
      line-height: 24px;
      border-radius: 12px;
    }
    .follow {
      border: 1px solid #f00;
      color: #fff;
      background-color: #f00;
    }
    .followed {
      border: 1px solid #ccc;
    }
  }
}
.article {
  padding: 10px;
  .title {
    font-size: 18px;
    font-weight: 700;
  }
  .info {
    font-size: 14px;
    color: #999;
    margin: 10px 0;
    .name {
      margin-right: 10px;
    }
  }
  .content {
    font-size: 14px;
    /deep/ img {
      width: 100%;
      padding: 10px 0;
    }
  }
  video {
    width: 100%;
  }
}
.buttons {
  display: flex;
  text-align: center;
  justify-content: space-around;
  font-size: 16px;
  .good,
  .share {
    border: 1px solid #ccc;
    width: 100px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    span.iconfont {
      margin-right: 10px;
      font-size: 18px;
    }
  }
  .share {
    .iconfont {
      color: green;
    }
  }
  .active {
    background-color: red;
    color: #fff;
  }
}
.comment-list {
  margin-top: 15px;
  margin-bottom: 100px;
  h3 {
    text-align: center;
    padding: 10px 0;
    border-top: 3px solid #ccc;
    font-size: 18px;
  }
}
.footer-input {
  position: fixed;
  border-top: 1px solid #ccc;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  padding: 10px;
  background-color: #F2F2F2;
  input {
    width: 180px;
    height: 30px;
    border-radius: 15px;
    background-color: #d7d7d7;
    font-size: 14px;
    border: none;
    padding-left: 15px;
    color: #999;
  }
  span {
    font-size: 22px;
  }
  span.iconpinglun- {
    position: relative;
    i {
      font-size: 10px;
      font-style: normal;
      color: #fff;
      width: 18px;
      height: 18px;
      background-color: #f00;
      border-radius: 7px;
      position: absolute;
      left: 12px;
      top: -6px;
      text-align: center;
      line-height: 18px;
    }
  }
  span.star {
    color: #f00;
  }
}
.footer-textarea {
  width: 100%;
  position: fixed;
  display: flex;
  bottom: 0;
  height: 100px;
  z-index: 999;
  align-items: flex-end;
  justify-content: space-around;
  background-color: #F2F2F2;
  padding: 0 10px;
  padding-bottom: 10px;
   textarea {
     height: 80px;
     flex: 1;
     width: 260px;
     font-size: 14px;
     border-radius: 15px;
     padding: 10px;
     border: none;
     background-color: #D7D7D7;
   }
   button {
     height: 30px;
     width: 60px;
     background-color: #f00;
     color: #fff;
     border-radius: 15px;
     font-size: 12px;
     border: none;
     line-height: 30px;
     text-align: center;
     margin-left: 10px;
   }
}
</style>
