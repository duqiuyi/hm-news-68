<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <div class="search_box" @click="$router.push('/search')">
          <span class="iconfont iconsearch"></span>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="user" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <!-- tab栏的展示更多 -->
    <van-sticky class="more-sticky">
      <div class="more" @click='$router.push("/manage")'>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </van-sticky>
    <!-- tab栏效果 -->
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="tab.name" v-for="tab in tabList" :key='tab.id'>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            finished-text="我是有底线的"
            @load="onLoad"
            >
            <hm-post :post='item' v-for="item in newsList" :key='item.id'></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  // 组件的名字
  name: 'index',
  data () {
    return {
      active: 0,
      // 用于存放栏目列表数据
      tabList: [],
      newsList: [],
      pageIndex: 1,
      pageSize: 6,
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  // 缓存组件激活的时候触发
  activated () {
    console.log('activated')
  },
  // 缓存组件不激活的时候触发
  deactivated () {
    console.log('deactivated')
  },
  created () {
    this.getTabList()
  },
  methods: {
    async getTabList () {
      // 先判断缓存中是否存在
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      if (activeList) {
        this.tabList = activeList
        // 发送请求获得第一个tab栏的数据
        this.getNewsList(this.tabList[0].id)
        return
      }
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
      // 当每次进行切换的时候,都保持当前栏目下的列表为空
      if (this.pageIndex === 1) {
        this.newsList = []
      }
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
        this.newsList = [...this.newsList, ...data]
        console.log(this.newsList)
        // 隐藏加载状态
        this.loading = false
        // 隐藏刷新状态
        this.refreshing = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad () {
      setTimeout(() => {
        this.pageIndex++
        this.getNewsList(this.tabList[this.active].id)
      }, 1000)
    },
    onRefresh () {
      this.newsList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      setTimeout(() => {
        this.getNewsList(this.tabList[this.active].id)
      }, 1000)
    }
  },
  // 事件监听,监听active的变化,如果变化了说明栏目切换了
  watch: {
    // 监听变化
    active (value) {
      // console.log(value)
      // 清空原来栏目下的数据
      this.newsList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      setTimeout(() => {
        // 重新加载当前分类下的数据
        this.getNewsList(this.tabList[value].id)
      }, 1000)
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
.more {
    position: absolute;
    right: 0;
    z-index: 999;
    height: 44px;
    line-height: 44px;
    width: 15%;
    text-align: center;
    background-color: #e4e4e4;
}
/deep/ .van-tabs__wrap {
  width: 85%;
}
/deep/ .van-tabs__nav{
  background-color: #e4e4e4;
}
.more-sticky {
  /deep/ .van-sticky--fixed {
    z-index: 1000;
  }
}
</style>
