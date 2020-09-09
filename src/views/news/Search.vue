<template>
  <div class="search">
    <div class="header">
      <div class="left" @click="goBack">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <input type="search" placeholder="请输入关键字" v-model="keyword" @keyup.enter='search' @input="recommend">
        <span class="iconfont iconsearch"></span>
      </div>
      <div class="right" @click="search">搜索</div>
    </div>
    <div class="recommend-list" v-if="recommendList.length">
      <div class="item one-txt-cut" v-for="item in recommendList" :key="item.id" @click="goSearch(item.title)">{{item.title}}</div>
    </div>
    <div class="list" v-else-if="list.length">
      <hm-post v-for="item in list" :key="item.id" :post="item"></hm-post>
    </div>
    <div class="content" v-else>
      <div class="history">
        <h4>历史记录</h4>
        <div class="list">
          <div class="item" v-for="item in history" :key="item" @click="goSearch(item)">{{item}}</div>
        </div>
      </div>
      <hr>
      <div class="hot">
        <h4>热门搜索</h4>
        <div class="list">
          <div class="item" v-for="item in hot" :key="item" @click="goSearch(item)">{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from '../../utils/tool'
export default {
  data () {
    return {
      keyword: '',
      list: [],
      history: [],
      hot: [],
      // 推荐列表
      recommendList: []
    }
  },
  created () {
    this.history = JSON.parse(localStorage.getItem('history')) || []
    // 假设发送请求,获取数据
    this.hot = ['关晓彤', '姑娘', '华为', '埃及']
  },
  methods: {
    async search () {
      if (!this.keyword) return this.$toast('请输入搜索关键字')
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.keyword
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        console.log(this.list)
      }
      // 把keywords添加到缓存中
      // 1. 如果原来有这个历史记录,删除即可
      // 2. 添加到数组的前面
      this.history = this.history.filter(item => item !== this.keyword)
      this.history.unshift(this.keyword)
      localStorage.setItem('history', JSON.stringify(this.history))

      this.recommendList = ''
    },
    goBack () {
      if (this.keyword) {
        this.list = ''
        this.keyword = ''
      } else {
        this.$router.back()
      }
    },
    goSearch (item) {
      this.keyword = item
      this.search()
    },
    // async recommend () {
    //   if (this.keyword === '') return
    //   const res = await this.$axios.get('/post_search_recommend', {
    //     params: {
    //       keyword: this.keyword
    //     }
    //   })
    //   console.log(res.data)
    // }
    // 用定时器 => 防抖
    // recommend () {
    //   if (this.keyword === '') return
    //   setTimeout(async () => {
    //     const res = await this.$axios.get('/post_search_recommend', {
    //       params: {
    //         keyword: this.keyword
    //       }
    //     })
    //     console.log(res)
    //   }, 1000)
    // }
    recommend: debounce(async function () {
      if (this.keyword === '') return
      const res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.keyword
        }
      })
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.recommendList = data
        console.log(this.recommendList)
      }
    }, 1000)
  },
  watch: {
    keyword (value) {
      if (value === '') {
        this.list = ''
      }
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  height: 60px;
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 14px;
  padding: 0 15px;
  .center {
    flex: 1;
    position: relative;
    input {
      width: 260px;
      height: 40px;
      border: 1px solid #ccc;
      border-radius: 30px;
      padding-left: 30px;
    }
    span {
      position: absolute;
      left: 30px;
      top: 13px;
    }
  }
}
.content {
  padding: 15px;
  .hot {
    margin-top: 15px;
  }
  h4 {
    font-size: 16px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    .item {
      background-color: #ddd;
      font-size: 14px;
      margin: 15px 5px;
      padding: 7px;
    }
  }
}
.recommend-list {
  font-size: 14px;
  padding: 0 15px;
  .item {
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
  }
}
</style>
