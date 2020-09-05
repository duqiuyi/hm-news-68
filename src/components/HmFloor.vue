<template>
  <div>
    <hm-floor :comment="comment.parent" v-if="comment.parent"></hm-floor>
    <div class="hm-floor">
      <div class="title">
        <div class="left">1.{{comment.user.nickname}}</div>
        <div class="center">{{comment.create_data | now}}</div>
        <div class="right">回复</div>
      </div>
      <div class="content">{{comment.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hm-floor',
  props: {
    comment: Object
  }
}
</script>

<style lang='less' scoped>
.hm-floor {
  margin-top: -1px;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 10px 0;
  .title {
    font-size: 14px;
    display: flex;
    .center {
      flex: 1;
      font-size: 12px;
      color: #666;
      padding-left: 10px;
    }
    .right {
      color: #666;
    }
  }
  .content {
    font-size: 16px;
    margin-top: 10px;
  }
}

</style>
