<template>
  <div class="sidenav-com">
    <div class="mask" v-show="show"></div>
    <transition name="custom-classes-transition" enter-active-class="animated slideInRight" leave-active-class="animated fadeOutRight">
      <div class="sidenav" v-show="show">
        <span class="close" v-on:click="hideThis">
          <img src="../img/x.png" alt="">
        </span>
        <div class="top-wrap">
          <div class="icon">
            <img src="../img/logo.png" alt="">
          </div>
          <p class="appname">豆瓣WebApp</p>
          <p class="version">version:1.0</p>
          <p class="author">作者：voidsky</p>
        </div>
        <div class="nav-block" v-on:click="hideThis" v-for="item in nav" :key=item>
          <h2 :class="['title', {cur:item.current}]">{{item.title}}</h2>
          <div class="cat-wrap" v-for="cat in item.cats" :key=cat>
            <h3 class="cat">{{cat.title}}</h3>
            <router-link :to="{ name: router.routeName, params: { id: router.id }}" class="item" v-for="router of cat.subs" :key=router>{{router.name}}</router-link>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'sidenavCom',
  data() {
    return {
      myshow: this.show,
      nav: [{
        'title': '豆瓣电影',
        'current': true,
        'cats': [
          {
            'title': '当前上映',
            'subs': [{
              'routeName': 'currentMovie',
              'name': '当前热映',
              'id': 'currentMovie',
              'key': 'currentMovie'
            }]
          }, {
            'title': '榜单',
            'subs': [{
              'routeName': 'top250',
              'name': 'top250',
              'id': 'top250',
              'key': 'top250'
            },
            {
              'routeName': 'usbox',
              'name': '北美票房榜',
              'id': 'us_box',
              'key': 'us_box'
            },
            {
              'routeName': 'newmovies',
              'name': '新片榜',
              'id': 'new_movies',
              'key': 'new_movies'
            }]
          }]
      }, {
        'title': '豆瓣读书',
        'current': false,
        'cats': []
      }]
    };
  },
  watch: {

  },
  methods: {
    hideThis() {
      this.$emit('hide');
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  props: ['title', 'show']
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.top-wrap {
  text-align: center;
  font: 14px/1.4em a;
  margin-bottom: 20px;
  padding-top: 20px;
}

.top-wrap .icon {
  width: 100%;
}

.top-wrap .icon img {
  width: 80%;
}

.nav-block .title {
  height: 56px;
  line-height: 56px;
  font-size: 16px;
  font-weight: normal;
  color: rgb(72, 106, 82);
  padding: 0 20px;
  cursor: pointer;
  position: relative;
  transition: border-color .3s, background-color .3s, color .3s;
  box-sizing: border-box;
  white-space: nowrap;
  background: rgb(209, 229, 215);
  top: 0;
  width: 100%;
}

.title.cur {
  color: #00b51d;
}

.nav-block .cat {
  padding-top: 15px;
  line-height: normal;
  font-weight: normal;
  font-size: 14px;
  padding-left: 20px;
  color: rgb(151, 190, 164);
}

.nav-block .item {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: rgb(72, 106, 82);
  padding: 0 40px;
  transition: border-color .3s, background-color .3s, color .3s;
  box-sizing: border-box;
  display: block;
}

.nav-block ul {
  background: rgb(228, 241, 234);
}

.nav-block ul li {
  padding-left: 20px;
  font: 16px/2em a;
  margin: 10px 0;
  border-bottom: 1px solid #aaa;
}

.mask {
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  z-index: 10001;
  width: 100%;
  height: 100%;
  top: 0px;
}

.sidenav {
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10002;
  background: rgb(228, 241, 234);
}

.light {
  background: rgb(228, 241, 234);
}

.close {
  width: 30px;
  height: 30px;
  font-size: 30px;
  position: absolute;
  top: 0;
  left: -30px;
  color: #333;
  font-weight: bold;
}

.close img {
  width: 20px;
  height: 20px;
}
</style>
