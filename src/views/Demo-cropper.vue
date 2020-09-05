<template>
  <div class="demo">
    <van-button type="primary" @click='crop'>裁剪</van-button>
    <vue-cropper
    ref='cropper'
    autoCrop
    autoCropWidth='150'
    autoCropHeight='150'
    fixed
    img='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3913610919,869248477&fm=26&gp=0.jpg'></vue-cropper>
  </div>
</template>

<script>
// 注意: 1. 给父盒子指定宽高
//       2. 不能使用本地图片
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  methods: {
    crop () {
      this.$refs.cropper.getCropData(data => {
        console.log(data)
      })
    }
  }
}
</script>

<style lang='less'>
.demo {
  width: 100%;
  height: 100%;
  position: fixed;
}
</style>
