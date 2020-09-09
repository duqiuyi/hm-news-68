<template>
  <div class="my-comment">
    <hm-header>我的跟帖</hm-header>
    <div class="list">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <!--
          :immediate-check='false' => 可以关闭list初始化后立马触发load事件
          offset="10" => 滚动条与底部的距离小于该值时触发
        -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="我是有底线的"
          :immediate-check='false'
          offset="10"
          @load="onLoad"
          >
          <div class="item" v-for='item in list' :key='item.id'>
            <div class="time">{{item.create_data | time('YYYY-MM-DD HH:mm')}}</div>
            <!-- 回复的内容 -->
            <div class="comment" v-if='item.parent'>
              <!-- 回复的名字 -->
              <div class="name">回复:{{item.parent.user.nickname}}</div>
              <div class="comment_content">{{item.parent.content}}</div>
            </div>
            <div class="content">{{item.content}}</div>
            <div class="origin">
              <span class="one-txt-cut" @click="$router.push(`/post/${item.post.id}`)">原文:{{item.post.title}}</span>
              <span class="iconfont iconjiantou1"></span>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      // 当前页
      pageIndex: 1,
      // 每页的条数
      pageSize: 7,
      // 代表加载状态,如果loading为true的时候,代表list组件正在加载数据,onload将不会重复触发
      // 当滚动到底部,触发onLoad事件的时候,自动会把loading改成true
      loading: false,
      // 代表是否结束, false代表还有数据,true代表没有更多了,默认为false
      finished: false,
      // 代表是否正在下拉刷新
      refreshing: false
    }
  },
  created () {
    this.getCommentList()
  },
  methods: {
    async getCommentList () {
      const res = await this.$axios.get('/user_comments', {
        // get请求的参数必须放到 params 中或者拼接到url地址中
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = [...this.list, ...data]
        console.log(this.list)

        // 把loading改成false
        this.loading = false

        // 判断如果没有更多数据了,就要把finished改成true
        if (data.length < this.pageSize) {
          this.finished = true
        }

        // 结束下拉刷新
        this.refreshing = false
      }
    },
    onLoad () {
      setTimeout(() => {
        // 加载下一页的数据
        this.pageIndex++
        this.getCommentList()
      }, 1000)
    },
    onRefresh () {
      setTimeout(() => {
        this.pageIndex = 1
        this.loading = true
        this.finished = false
        this.list = []
        this.getCommentList()
      }, 1000)
    }
  }
}
</script>

<style lang='less' scoped>
.item {
  border-bottom: 1px solid #ccc;
  padding: 10px 20px;
  font-size: 14px;
  .time {
    color: #b3b3b3;
    padding: 10px 0;
  }
  .comment {
    background-color: #E4E4E4;
    color: #929292;
    padding: 10px;
    line-height: 30px;
  }
  .content {
    padding: 10px 0;
  }
  .origin {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .iconfont {
      font-size: 14px;
    }
  }
}
</style>
