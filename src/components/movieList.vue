<template>
    <div class="movie-list" :style="{'height':height + 'px'}">
        <ul class="movie-box">
            <li class="cell" v-for="item in moviedata.subjects" :key='item'>
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
</template>

<script>
import dbRate from "./dbRate"
import jsonp from 'jsonp'
export default {
    name: 'movieList',
    data() {
        return {
            dataLock: false,
            height: 0,
            hasNext: true,
            cur: 0,
            moviedata: {
                subjects: []
            }
        };
    },
    methods: {
        getData() {
            var _this = this;
            var page = this.cur;
            if (this.hasNext) {
                this.http.get('/api/top250?page=' + page)
                    .then(res => {
                        if (res.status === 200) {
                            setTimeout((function (data) {
                                return function () {
                                    _this.moviedata.subjects = _this.moviedata.subjects.concat(data.subjects);
                                    _this.cur = page + 1;
                                    _this.hasNext = data.hasNext;
                                    _this.dataLock = false;
                                }
                            })(res.data), 500);
                            console.log(res);
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    })
                    ;
            } else {
                this.dataLock = false;
                document.querySelector('.movie-list .loading').style.display = 'none';
            }
        }
    },
    created() {
        var _this = this;
        this.height = window.innerHeight - 60;
        this.getData();

    },
    mounted() {
        var _this = this;
        document.querySelector('.movie-list').onscroll = function () {
            if (!_this.dataLock && this.scrollTop + this.offsetHeight >= this.scrollHeight) {
                console.log('.movie-list');
                _this.dataLock = true;
                _this.getData();
            }
        };
    },
    props: ['movie'],
    components: { dbRate }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.movie-list {
    margin-top: 60px;
    overflow: auto;
    height: 300px;
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
