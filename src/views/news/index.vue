<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <div class="search_box">
          <span class="iconfont iconsearch"></span>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="user">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <!-- tab栏效果 -->
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="tab.name" v-for="tab in tabList" :key='tab.id'>
        <hm-post :post='item' v-for="item in newsList" :key='item.id'></hm-post>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      // 用于存放栏目列表数据
      tabList: [],
      newsList: [],
      pageIndex: 1,
      pageSize: 20
    }
  },
  created () {
    this.getTabList()
  },
  methods: {
    async getTabList () {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        // console.log(this.tabList)

        // 发送请求,获取第一个tab栏的数据
        this.getNewsList(this.tabList[0].id)
      }
    },
    async getNewsList (id) {
      // 发送请求获取新闻数据
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.newsList = data
        console.log(this.newsList)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  display: flex;
  height: 50px;
  background-color: #f00;
  line-height: 50px;
  text-align: center;
  color: #fff;
  .logo,
  .user {
    width: 70px;
  }
  .logo {
    span {
      font-size: 50px;
    }
  }
  .user {
    span {
      font-size: 24px;
    }
  }
  .search {
    flex: 1;
    .search_box {
      height: 34px;
      line-height: 34px;
      background-color: rgba(255, 255, 255, .5);
      margin-top: 8px;
      border-radius: 17px;
      font-size: 14px;
      span:first-child {
        margin-right: 5px;
      }
    }
  }
}
/deep/ .van-tabs__nav{
  background-color: #e4e4e4;
}
</style>
