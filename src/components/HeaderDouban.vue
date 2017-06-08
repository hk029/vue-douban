<template>
  <div class="header-douban">
    <header>
        <img src="" class="icon">
        <h1><router-link :to="{ name: 'currentMovie'}">{{ title }} </router-link></h1>
        <span class="more-func"></span>
    </header>
  </div>
</template>

<script>
export default {
  name: 'header-douban',
  data () {
    return {
      title: '豆瓣电影'
    };
  },
  methods: {
    test () {
      this.msg = 'hehe';
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header-douban{
  position:fixed;
  width:100%;
  z-index:10000;
  top:0;
}
header{
  background-color: rgb(0, 181, 29);
  padding:20px 20px;
}
h1{
  color:#fff;
  font-size: 20px;
}
.more-func{
    background: url(../img/func.png) center no-repeat;
    height: 24px;
    width: 20px;
    position: absolute;
    right: 20px;
    top: 20px;
    background-size: cover;
}
</style>
