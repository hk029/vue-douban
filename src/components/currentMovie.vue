<template>
  <div class="current-movie">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="当前热映" name="current" class="nav-top">
        <div class="current" :style='{height:innerHeight+"px"}'>
          <ul class="movie-box">
            <li class="cell" v-for="item in movie.current.subjects" :key='item'>
              <div class="cover">
                <router-link :to="{ name: 'detail', params: { id: item.id }}">
                  <img v-bind:src="item.images.large" alt="">
                </router-link>
                <p class="title">{{item.title}}</p>
              </div>
              <db-rate :rate="item.rating.average"></db-rate>
              <div class="tags">
                <span v-for="tag in item.genres" :key='tag'>{{tag}}</span>
              </div>
            </li>
          </ul>
          <div class="loading">
            <img src="../img/loading.gif" alt="">
            <p>Loading...</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="即将上映" name="commingsoon">
        <div class="commingsoon" :style='{height:innerHeight+"px"}'>
          <ul class="movie-box">
            <li class="cell" v-for="item in movie.commingsoon.subjects" :key='item'>
              <div class="cover">
                <router-link :to="{ name: 'detail', params: { id: item.id }}">
                  <img v-bind:src="item.images.large" alt="">
                </router-link>
                <p class="title">{{item.title}}</p>
              </div>
              <div class="tags">
                <span v-for="tag in item.genres" :key='tag'>{{tag}}</span>
              </div>
            </li>
          </ul>
          <div class="loading">
            <img src="../img/loading.gif" alt="">
            <p>Loading...</p>
          </div>
        </div>
  
      </el-tab-pane>
      </transition>
    </el-tabs>
  </div>
</template>

<script>
import dbRate from "./dbRate"
export default {
  name: 'current-movie',
  data() {
    return {
      activeName: 'current',
      rate: '3.7',
      dataLock: false,
      innerHeight:400,
      page: { current: { cur: 0, hasNext: true }, commingsoon: { cur: 0, hasNext: true } },
      movie: {
        current: {
          subjects: []
        },
        commingsoon: {
          subjects: []
        }
      },
    };
  },
  methods: {
    getNum(item) {
      return item / 2;
    },
    handleClick(tab, event) {
      window.scrollTo(0, 0);
      this.activeName = tab._self.name;
      console.log(this.activeName);
    },
    getData(name) {
      var page = this.page[name].cur;
      var _this = this;
      if (this.page[name].hasNext) {
        this.http.get('/api/' + name + '?page=' + page).then(res => {
          console.log(res, page);
          if (res.status === 200) {
            setTimeout((function (data) {
              return function () {
                _this.movie[name].subjects = _this.movie[name].subjects.concat(data.subjects);
                _this.page[name].cur = page + 1;
                _this.page[name].hasNext = data.hasNext;
                _this.dataLock = false;
              }
            })(res.data), 500);
          }
        });
      }else{
        _this.dataLock = false;
        document.querySelector('.' + name + ' .loading').style.display = 'none';
      }
    },
  },
  components: { dbRate },
  created() {
    var _this = this;
    this.innerHeight = window.innerHeight - 105;
    this.getData('current');
    this.getData('commingsoon');  
  },
  mounted() {
     var _this = this;
     document.querySelector('.current').onscroll = function () {
       if (!_this.dataLock && this.scrollTop + this.offsetHeight >= this.scrollHeight) {
         console.log('current');
        _this.dataLock = true;
        console.log(_this.activeName);
        _this.getData('current');
      }
    };

    document.querySelector('.commingsoon').onscroll = function () {
      if (!_this.dataLock && this.scrollTop + this.offsetHeight >= this.scrollHeight) {
        console.log('commingsoon');
        _this.dataLock = true;
        console.log(_this.activeName);
        _this.getData('commingsoon');
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.current-movie {
  margin-top: 60px;
}

.movie-box {
  font: 0;
  padding: 5px;
}

.current, .commingsoon{
  height: 400px;
  overflow: auto;
}
.movie-box .cell {
  width: 49%;
  font: 14px;
  display: inline-block;
  box-sizing: border-box;
  margin-bottom: 15px;
  vertical-align: top;
}

.cover {
  padding: 0 5px;
}

.cover img {
  width: 100%;
  height: 200px;
  max-width: 150px;
  display: block;
  margin: 0 auto;
}

.movie-box .title {
  margin: 10px 0;
  font-size: 14px;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.movie-box .tags {
  width: 100%;
  overflow: hidden;
  text-wrap: nowrap;
  margin: 10px 0;
  text-align: center;
}

.movie-box .tags span {
  border: 1px solid #dac26f;
  padding: 2px 5px;
  display: inline-block;
  font-size: 14px;
  background: #f5eed7;
  color: #af9223;
  margin: 2px 3px;
  border-radius: 3px;
}

</style>
