<template>
  <div class="hm-comment">
    <div class="title">
      <div class="avatar">
        <img :src="$base + comment.user.head_img" alt="">
      </div>
      <div class="info">
        <p>{{comment.user.nickname}}</p>
        <p>{{comment.create_date | now}}</p>
      </div>
      <div class="right">回复</div>
    </div>
    <hm-floor :comment='comment.parent' v-if="comment.parent"></hm-floor>
    <div class="content">{{comment.content}}</div>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object
  }
}
</script>

<style lang='less' scoped>
.hm-comment {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .title {
    display: flex;
    .avatar {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .info {
      padding-left: 20px;
      line-height: 24px;
      flex: 1;
      font-size: 14px;
    }
    .right {
      font-size: 14px;
    }
  }
  .content {
    font-size: 18px;
  }
}
</style>
