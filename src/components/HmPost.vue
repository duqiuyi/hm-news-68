<template>
  <div class="post">
    <div class="single-img-post" v-if='post.cover.length < 3'>
      <div class="info">
          <div class="title">{{post.title}}</div>
          <div class="user">
            <span>{{post.user.nickname}}</span>
            <span>{{post.comment_length}}跟帖</span>
          </div>
        </div>
        <div class="img">
          <img :src="$url(post.cover[0].url)" alt="">
        </div>
    </div>
    <div class="multiple-img-post" v-else>
      <div class="title">{{post.title}}</div>
      <div class="imgs">
        <img :src="$url(post.cover[0].url)" alt="">
        <img :src="$url(post.cover[1].url)" alt="">
        <img :src="$url(post.cover[2].url)" alt="">
      </div>
      <div class="user">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>

<style lang='less' scoped>
.user {
  color: #666;
  font-size: 14px;
  span:first-child {
    margin-right: 10px;
  }
}
.single-img-post {
  border-bottom: 1px solid #ccc;
  padding: 15px;
  display: flex;
  .info {
    flex: 1;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .img {
    img {
      width: 122px;
      height: 74px;
      margin-left: 10px;
      // 作用与background-size差不多,只不过是作用于图片的
      // cover优点: 保证图片覆盖完整的大小; 缺点: 一部分会被截取
      // contain优点:图片能完整展示   缺点: 会有留白
      object-fit: cover;
    }
  }
}
.multiple-img-post {
  border-bottom: 1px solid #ccc;
  padding: 15px;
  .title {
    font-size: 16px;
  }
  .imgs {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    img{
      width: 112px;
      height: 74px;
    }
  }
}
</style>
