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
        <div class="followed" v-if="false">已关注</div>
        <div class="follow" v-else>关注</div>
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
      <div class="good">
        <span class="iconfont icondianzan"></span>
        <span>112</span>
      </div>
      <div class="share">
        <span class="iconfont iconweixin"></span>
        <span>微信</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      post: {
        user: {}
      }
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    async getInfo () {
      const res = await this.$axios.get(`/post/${this.$route.params.id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
        console.log(this.post)
      }
    },
    getUrl (url) {
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
    }
  }
}
</script>

<style lang='less' scoped>
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
}
</style>
