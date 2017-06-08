<template>
  <div class="detail">
    <div class="title"><h1>神奇女侠</h1></div>
    <div class="top-wrap">
        <div class="cover">
            <img src="https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2460006593.webp" alt="">
        </div>
        <div class="content">
            <p class="author">导演: 派蒂·杰金斯</p>
            <p class="casts">主演: 盖尔·加朵 / 克里斯·派恩 / 康妮·尼尔森 / 罗宾·怀特 / 丹尼·赫斯顿 /</p>
            <p class="types">类型: 动作 / 奇幻 / 冒险</p>
            <div class="rate"></div>
        </div>
    </div>
    <div class="summary">
        <h2>电影介绍</h2>
        <p>电影介绍介绍介绍</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'detail',
  data () {
    return {
      title: '豆瓣电影'
    };
  },
 created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      // replace getPost with your data fetching util / API wrapper
     this.title = this.$route.params.id;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.detail{
    padding:10px 20px;
}
.title h1{
    font-size:20px;
    color:#333;
    margin-bottom:20px;
}
.top-wrap .cover{
    padding:0 10px;
}
.top-wrap .cover img{
    width:100%;
    height:100%;
    max-width:100%;
}
.content {
    margin-top:5px;
    padding:10px;
}
</style>
