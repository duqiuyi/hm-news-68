<template>
  <div class="uersedit">
    <hm-header>编辑资料</hm-header>
    <!-- 头像 -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + user.head_img" alt="">
      <van-uploader :after-read="afterRead" />
    </div>
    <!-- 导航 -->
    <hm-navitem @click='showNickname'>
      <template>昵称</template>
      <template #content>{{user.nickname}}</template>
    </hm-navitem>
    <hm-navitem @click='showPassword'>
      <template>密码</template>
      <template #content>******</template>
    </hm-navitem>
    <hm-navitem @click='showGender'>
      <template>性别</template>
      <template #content>{{user.gender === 1 ? '男' : '女 '}}</template>
    </hm-navitem>
    <!-- 修改昵称的弹框 -->
    <van-dialog v-model="isShowNickname" title="昵称修改" show-cancel-button @confirm='updataNickname'>
      <van-field v-model="nickname" ref='nickname' placeholder="请输入用户名" />
    </van-dialog>
    <!-- 修改密码的弹框 -->
    <van-dialog v-model="isShowPassword" title="请修改密码" show-cancel-button @confirm='updataPassword'>
      <van-field v-model="password" ref='password' placeholder="请输入密码" />
    </van-dialog>
    <!-- 修改性别 -->
    <van-dialog v-model="isShowGender" title="修改性别" show-cancel-button @confirm='updataGender'>
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <!-- 裁剪的模态框 -->
    <div class="mask" v-show='isShowMask'>
      <van-button type="primary" class="crop" @click='crop'>裁剪</van-button>
      <van-button type="danger" class="cancel" @click='isShowMask=false'>取消</van-button>
      <VueCropper
      :img='imgUrl'
      ref='cropper'
      autoCrop
      autoCropWidth='100'
      autoCropHeight='100'
      fixed
      >
      </VueCropper>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  data () {
    return {
      user: '',
      isShowNickname: false,
      nickname: '',
      isShowPassword: false,
      password: '',
      isShowGender: false,
      gender: 1,
      isShowMask: false,
      imgUrl: ''
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      // 发送请求获取个人信息
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
      }
    },
    async showNickname () {
      this.isShowNickname = true
      this.nickname = this.user.nickname
      // 等待dom更新
      await this.$nextTick()
      // 需要自动获取焦点
      this.$refs.nickname.focus()
    },
    // 封装修改函数
    async updateuser (data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      if (res.data.statusCode === 200) {
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    async updataNickname () {
      this.updateuser({
        nickname: this.nickname
      })
    },
    async showPassword () {
      this.isShowPassword = true
      this.password = this.user.password
      await this.$nextTick()
      this.$refs.password.focus()
    },
    async updataPassword () {
      // const userId = localStorage.getItem('userId')
      // const res = await this.$axios.post(`/user_update/${userId}`, {
      //   password: this.password
      // })
      // if (res.data.statusCode === 200) {
      //   this.getUserInfo()
      //   this.$toast.success('修改成功')
      // }
      this.updateuser({
        password: this.password
      })
    },
    showGender () {
      this.isShowGender = true
      this.gender = this.user.gender
    },
    updataGender () {
      this.updateuser({
        gender: this.gender
      })
    },
    isImg (name) {
      if (name.endsWith('.jpeg') || name.endsWith('.jpg') || name.endsWith('.png')) {
        return true
      } else {
        return false
      }
    },
    afterRead (file) {
      // 校验图片的类型和大小,满足才上传
      if (!this.isImg(file.file.name)) {
        return this.$toast.fail('图片格式错误')
      }
      if (file.file.size >= 100 * 1024) {
        return this.$toast.fail('图片太大')
      }
      // 显示裁剪框
      this.isShowMask = true
      // 设置裁剪图片
      this.imgUrl = file.content
    },
    crop () {
      this.$refs.cropper.getCropBlob(async blob => {
        // console.log(data)
        // 此时可以自行将文件上传至服务器
        // console.log(file)
        // 如果通过ajax上传文件,请求体不能直接是一个普通对象,必须是一个formData对象
        // 创建一个空的formData对象
        const fd = new FormData()
        // 给 formData 对象添加上传的文件
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          // 修改用户对象
          this.updateuser({
            head_img: data.url
          })
        }
        // 隐藏裁剪框
        this.isShowMask = false
      })
    }
  },
  components: {
    VueCropper
  }
}
</script>

<style lang='less' scoped>
// scoped 会给当前所有组件添加 data-v-xxxx 属性,但是不包括动态渲染的属性
.avatar {
  padding: 40px 0;
  text-align: center;
  position: relative;
  img {
    widows: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .van-uploader {
    position: absolute;
    left: 50%;
    top: 40px;
    transform: translate(-50%);
    width: 100px;
    height: 100px;
    opacity: 0;
  }
}
// 深度选择器的三种写法
// >>> ===> css写法
// /deep/ ===> less写法
// ::v-deep ===> sass写法
/deep/ .van-dialog__content{
  padding: 20px;
  .van-field {
    border: 1px solid #ccc;
  }
}
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
  .crop,
  .cancel {
    position: fixed;
    top: 0;
    z-index: 1;
  }
  .cancel {
    right: 0;
  }
}
</style>
