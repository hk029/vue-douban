<template>
  <div id="app" :class="{lock:showSide}"> 
    <header class="header-douban">
        <img src="" class="icon">
        <h1><router-link :to="{ name: 'currentMovie'}">{{ title }} </router-link></h1>
        <span class="more-func" @click="showSide=true"></span>
    </header>
    <transition name="el-fade-in">
        <router-view :movie="indata"></router-view>
    </transition>
     <sidenav-com :show="showSide" @hide="showSide=false"></sidenav-com>

  </div>
</template>

<script>
import sidenavCom from './components/sidenavCom.vue'
import jsonp from 'jsonp';
export default {
  name: 'app',
  components: { sidenavCom},
  data (){
    return {
        indata:{
            current:{
                subjects:[]
            },
            commingsoon:{
                subjects:[]
            }
        },
        title:"豆瓣电影",
        showSide:false
    }
  },
  methods:{
  },
  watch:{
    '$route' (to, from) {
        // console.log(to);
        // console.log(from);
    }
  },
  created(){
        var that = this;
        jsonp('https://api.douban.com/v2/movie/in_theaters?count=40', null, function (err, data) {
            if (err) {
                console.error(err.message);
            } else {
                console.log(data);
                that.indata.current = data;
            }
        });
        jsonp('https://api.douban.com/v2/movie/coming_soon?count=40', null, function (err, data) {
            if (err) {
                console.error(err.message);
            } else {
                console.log(data);
                that.indata.commingsoon = data;
            }
        });
    }
}
</script>

<style>
#app {
  height: 100%;
  margin:0;
}
.lock{
   position:fixed;
}
.header-douban{
    position: fixed;
    width: 100%;
    z-index: 10000;
    top: 0;
    height: 60px;
    line-height: 60px;
}
header{
  background-color: rgb(0, 181, 29);
}
h1{
  color:#fff;
     font-size: 20px;
    padding-left: 20px;
}
.more-func{
    background: url(./img/func.png) center no-repeat;
    height: 24px;
    width: 20px;
    position: absolute;
    right: 20px;
    top: 20px;
    background-size: cover;
}

</style>
