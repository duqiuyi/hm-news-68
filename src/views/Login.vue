<template>
  <div>
    登录组件
    <van-button type="primary">主要按钮</van-button>
    <van-button type="info">信息按钮</van-button>
    <van-button type="default">默认按钮</van-button>
    <van-button type="warning">警告按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-icon name='chat-o'></van-icon>
    <div class="box">
      <p>我是p标签</p>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less'>
.box{
  width: 75px;
  height: 75px;
  background-color: pink;
  p{
    color: red;
  }
}
</style>
