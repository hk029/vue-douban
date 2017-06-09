<template>

  <div class="sidenav-com">
     
     <div class="mask" v-show="show"></div>
    
      <transition
        name="custom-classes-transition"
        enter-active-class="animated slideInRight"
        leave-active-class="animated fadeOutRight"
     >
     <div class="sidenav" v-show="show">
        <div class="top-wrap">
            <div class="icon"><img src="../img/logo.jpg" alt=""></div>
            <p class="author">作者：voidsky</p>
            <p class="version">version:1.0</p>
        </div>
        <div class="nav-block" v-on:click="hideThis">
          <h2 class="title cur">豆瓣电影</h2>
          <h3 class="cat">榜单</h3>
          <p class="item">Top250</p>
          <router-link :to="{name: 'detail'}" class="item" >美剧榜</router-link>
          <p class="item">新片榜</p>
        </div>
     </div>
       </transition> 
  </div>

</template>

<script>
export default {
  name: 'sidenavCom',
  data () {
    return {
      myshow:this.show
    };
  },
  watch:{

  },
  methods: {
    hideThis () {
      this.$emit('hide');
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  props:['title','show']
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-wrap{
  height:200px;
  text-align:center;
}
.top-wrap .icon{
  width:100%;
}
.top-wrap .icon img{
  width:80%;
}

.nav-block .title{
    height: 56px;
    line-height: 56px;
    font-size: 16px;
    font-weight:normal;
    color: rgb(72, 106, 82);
    padding: 0 20px;
    cursor: pointer;
    position: relative;
    transition: border-color .3s,background-color .3s,color .3s;
    box-sizing: border-box;
    white-space: nowrap;
    background:rgb(209, 229, 215);
}

.title.cur{
  color:#00b51d;
}
.nav-block .cat{
    padding-top: 15px;
    line-height: normal;
    font-weight:normal;
    font-size: 14px;
    padding-left: 20px;
    color: rgb(151, 190, 164);
}
.nav-block .item{
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: rgb(72, 106, 82);
    padding: 0 40px;
    transition: border-color .3s,background-color .3s,color .3s;
    box-sizing: border-box;
}
.nav-block ul{
  background:rgb(228, 241, 234);
}
.nav-block ul li{
  padding-left:20px;
  font:16px/2em a;
  margin:10px 0;
  border-bottom:1px solid #aaa;

}
.mask{
    background:rgba(0,0,0,0.2);
    position:fixed;
    z-index:10001;
    width:100%;
    height:100%;
    top:0px;
}
.sidenav{
    width:50%;
    height:100%;
    position:fixed;
    top:0px;
    right:0;
    z-index:10002;
    background:rgb(228, 241, 234);
}
.light{
    background:rgb(228, 241, 234);
}
</style>
