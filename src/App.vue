<template>
  <div id="app" :class="{lock:showSide}"> 
    <header class="header-douban">
        <img src="" class="icon">
        <h1><router-link :to="{ name: 'currentMovie'}">{{ title }} </router-link></h1>
        <h2>{{subtitle}}</h2>
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
        title:"豆瓣",
        subtitle:'上映电影',
        showSide:false
    }
  },
  methods:{
  },
  watch:{
    '$route' (to, from) {
        console.log(to);
        var name = to.name;
        switch(name){
            case 'top250':
                this.subtitle = 'TOP250';
            break;
             case 'usbox':
                this.subtitle = '北美票房榜';
            break;
             case 'newmovies':
                this.subtitle = '新片榜';
            break;
        }
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
.el-tabs__nav{
  width:100%;
}
.el-tabs__item{
  width:50%;
  text-align:center;
}
.el-rate {
    padding: 0 10px;
    text-align: center;
}
.el-rate__icon {
    font-size: 14px;
}
.el-tabs__header {
    position: fixed;
    z-index: 1001;
    width: 100%;
    top:60px;
    background: #fff;
}
.el-tabs__content {
    margin-top: 105px;
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
h2{
    position: relative;
    top:-60px;
    text-align: center;
    color:#eee;
    font-weight: normal;
    font-size: 18px;
        width: 100px;
    margin: 0 auto;
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
