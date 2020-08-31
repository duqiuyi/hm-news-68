<template>
  <div class="nav-item" @click='clickFn'>
    <div class="title"><slot></slot></div>
    <div class="content"><slot name='content'></slot></div>
    <div class="arrow">
      <div class="iconfont iconjiantou1"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickFn () {
      // console.log('123')
      // console.log(this.to)
      if (this.to) {
        this.$router.push(this.to)
      }
      // 触发click事件
      this.$emit('click')
    }
  },
  props: {
    to: String
  }
}
</script>

<style lang='less' scoped>
.nav-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  height: 50px;
  font-size: 14px;
  margin-left: 15px;
  padding-right: 15px;
  .content {
    flex: 1;
    text-align: right;
    color: #666;
  }
  .arrow {
    .iconfont {
      margin-left: 5px;
    }
  }
}
</style>
