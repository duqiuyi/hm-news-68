<template>
  <div class="manage">
    <hm-header>栏目列表</hm-header>
    <div class="content">
      <div class="active">
        <h4>点击删除以下频道(必须保留4项以上)</h4>
        <div class="list">
          <div class="item" v-for="item in activeList" :key="item.id" @click="delList(item.id)">{{item.name}}</div>
        </div>
      </div>
      <div class="deactive">
        <h4>点击添加以下频道</h4>
        <div class="list">
          <div class="item" v-for="item in deactiveList" :key="item.id" @click="addList(item.id)">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeList: [],
      deactiveList: []
    }
  },
  async created () {
    const activeList = JSON.parse(localStorage.getItem('activeList'))
    const deactiveList = JSON.parse(localStorage.getItem('deactiveList'))
    if (activeList) {
      this.activeList = activeList
      this.deactiveList = deactiveList
      return
    }
    const res = await this.$axios.get('/category')
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.activeList = data
      console.log(this.activeList)
    }
  },
  methods: {
    delList (id) {
      // 让 "头条" 不能点击
      if (id === 999) return
      if (this.activeList.length < 5) return
      const index = this.activeList.findIndex(item => item.id === id)
      // 往未激活的栏目中添加
      this.deactiveList.push(this.activeList[index])
      // 删除激活中的这个栏目
      this.activeList.splice(index, 1)
    },
    addList (id) {
      const index = this.deactiveList.findIndex(item => item.id === id)
      this.activeList.push(this.deactiveList[index])
      this.deactiveList.splice(index, 1)
    }
  },
  watch: {
    activeList: {
      deep: true,
      handler (value) {
        localStorage.setItem('activeList', JSON.stringify(this.activeList))
        localStorage.setItem('deactiveList', JSON.stringify(this.deactiveList))
      }
    }
  }
}
</script>

<style lang='less' scoped>
.content {
  padding: 15px;
  h4 {
    font-weight: 400;
    font-size: 14px;
    color: #858687;
    margin: 10px 0;
  }
  .list {
    overflow: hidden;
    .item {
      float: left;
      border: 1px solid #ccc;
      font-size: 16px;
      width: 22%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      margin: 5px;
      background-color: #eee;
    }
  }
}
</style>
