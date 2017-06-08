<template>
  <div class="current-movie">
    <el-tabs v-model="activeName">
        <el-tab-pane label="当前热映" name="current" class="nav-top">
          <ul class="movie-box">
            <li class="cell" v-for="item in movie.current.subjects">  
                <div class="cover">
                <router-link :to="{ name: 'detail', params: { id: item.id }}">
                  <img v-bind:src="item.images.large" alt="">
                </router-link>
                <p class="title">{{item.title}}</p>
              </div>
             <div class="tags">
                <span v-for="tag in item.genres">{{tag}}</span>
              </div>         
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="即将上映" name="future">
          <ul class="movie-box">
            <li class="cell" v-for="item in movie.commingsoon.subjects">  
                <div class="cover">
                <router-link :to="{ name: 'detail', params: { id: item.id }}">
                  <img v-bind:src="item.images.large" alt="">
                </router-link>
                <p class="title">{{item.title}}</p>
              </div>
             <div class="tags">
                <span v-for="tag in item.genres">{{tag}}</span>
              </div>         
            </li>
          </ul>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
    name: 'current-movie',
    data() {
      return {
        activeName: 'current',
        rate:'3.7'
      };
    },
    methods: {
    },
    props:['movie']
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.el-tabs__nav{
  width:100%;
}
.el-tabs__item{
  width:50%;
  text-align:center;
}
.el-rate {
    padding: 0 10px;
}
.el-rate__icon {
    font-size: 14px;
}
.movie-box{
  font:0;
  padding:5px;
}
.movie-box .cell{
  width:49%;
  font:14px;
  display:inline-block;
  box-sizing:border-box;
  margin-bottom:15px;
  vertical-align:top;
}
.cover{
  padding:0 5px;
} 
.cover img{
    width: 100%;
    height: 200px;
    max-width: 150px;
    display: block;
    margin: 0 auto;
} 
.movie-box .title{
  margin:5px 0;
  font-size:16px;
  text-align:center;
}
.movie-box .tags{
  width:100%;
  overflow:hidden;
  text-wrap:nowrap;
  margin:10px 0;
  text-align:center;

}
.movie-box .tags span{
  border:1px solid #eee;
  padding:2px 5px;
  display:inline-block;
  font-size:14px;
  background:rgb(255, 234, 156);
  color:#333;
  margin: 2px 3px;
}
</style>
