<template>
  <div class="demo">
    <!-- <Comment :count="5"></Comment> -->
    <Comment :data='obj'></Comment>
  </div>
</template>

<script>
import Comment from './Comment.vue'
export default {
  components: {
    Comment
  },
  data () {
    return {
      obj: {
        content: '我吃饱了',
        parent: {
          content: '你吃饱了吗',
          parent: {
            content: '是很好,所以我们去野餐了',
            parent: {
              content: '今天天气挺好的'
            }
          }
        }
      }
    }
  }
}
</script>

<style>

</style>
