<template>
  <div>
    <div class="placeholder"></div>
    <div class="hm-header">
      <div class="back" @click='back'>
        <div class="iconfont iconjiantou2"></div>
      </div>
      <div class="title"><slot></slot></div>
      <div class="extra"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    back () {
      this.$router.back()
    }
  }
}
</script>

<style lang='less'>
.placeholder {
  height: 50px;
}
.hm-header{
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  background-color: #F2F2F2;
  height: 50px;
  border-bottom: 1px solid #ccc;
  display: flex;
  text-align: center;
  line-height: 50px;
  .back,
  .extra{
    width: 50px;
  }
  .title{
    font-size: 16px;
    flex: 1;
    font-weight: 700;
  }
}
</style>
