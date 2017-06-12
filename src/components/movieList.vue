<template>
    <div class="movie-list">
        <ul class="movie-box">
            <li class="cell" v-for="item in moviedata.subjects">
                <div class="cover">
                    <router-link :to="{ name: 'detail', params: { id: item.id }}">
                        <img v-bind:src="item.images.large" alt="">
                    </router-link>
                    <p class="title">{{item.title}}</p>
                </div>
                <db-rate :rate="item.rating.average"></db-rate>
                <div class="tags">
                    <span v-for="tag in item.genres">{{tag}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import dbRate from "./dbRate"
import jsonp from 'jsonp'
export default {
    name: 'movieList',
    data() {
        return {
            moviedata:{
                subjects:[]
            }
        };
    },
    methods: {
    },
    created(){
        var that = this;
        console.log();
        jsonp('https://api.douban.com/v2/movie/'+this.$route.params.id+'?count=40', null, function (err, data) {
            if (err) {
                console.error(err.message);
            } else {
                console.log(data);
                that.moviedata = data;
            }
        });
    },
    props: ['movie'],
    components: { dbRate }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.movie-list{
    margin-top: 60px;
}

.movie-box {
    font: 0;
    padding: 5px;
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
    border: 1px solid #eee;
    padding: 2px 5px;
    display: inline-block;
    font-size: 14px;
    background: rgb(255, 234, 156);
    color: #333;
    margin: 2px 3px;
}
</style>
