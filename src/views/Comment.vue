<template>
  <!-- 在一个组件的模板中渲染当前组件 -->
  <div class="comment">
    <Comment :data='data.parent' v-if="data.parent"></Comment>
    我是评论组件
    <!-- <Comment :count="count - 1" v-if="count > 0"></Comment> -->
    <p>{{data.content}}</p>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    // count: Number,
    data: Object
  }
}
</script>

<style lang='less' scoped>
.comment {
  border: 1px solid #000;
  padding: 5px;
}
</style>
