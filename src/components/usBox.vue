<template>
    <div class="us-box">
        <ul class="movie-box">
            <li class="box-cell" v-for="item in moviedata.subjects" :key='item'>
                <div class="rank">{{item.rank}}.</div>
                <div class="movie-detail">
                    <div class="cover">
                        <router-link :to="{ name: 'detail', params: { id: item.subject.id }}">
                            <img v-bind:src="item.subject.images.large" alt="">
                        </router-link>
                    </div>
                    <div class="info">
                        <router-link :to="{ name: 'detail', params: { id: item.subject.id }}">
                            <p class="title">{{item.subject.title}}</p>
                        </router-link>
                        <p class="box">实时票房：
                            <span class="num">{{formateBox(item.box)}}</span>
                        </p>
                        <p class="rate">豆瓣评分：
                            <db-rate :rate="item.subject.rating.average"></db-rate>
                        </p>
                        <div class="tags">
                            <span v-for="tag in item.subject.genres" :key='tag'>{{tag}}</span>
                        </div>
                    </div>
    
                </div>
    
            </li>
        </ul>
    </div>
</template>

<script>
import dbRate from "./dbRate"
import jsonp from 'jsonp'
export default {
    name: 'usBox',
    data() {
        return {
            moviedata: {
                date: '',
                subjects: []
            }
        };
    },
    methods: {
        formateBox(box) {
            if (box > 100000000) {
                return (box / 100000000).toFixed(2) + '亿';
            }
            else if (box > 10000) {
                return (box / 10000).toFixed(0) + '万';
            }

        }
    },
    computed: {

    },
    created() {
        var self = this;
        console.log();
        this.http.get('/api/usbox')
            .then(res => {
                if (res.status === 200) {
                    console.log(res);
                    self.moviedata.subjects = res.data.subjects;
                }
            })
            .catch(err => {
                console.error(err);
            })
            ;
    },
    props: ['movie'],
    components: { dbRate }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.us-box {
    margin-top: 60px;
}

.movie-box {
    font: 0;
    padding: 5px;
}

.movie-box .box-cell {
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
}

.box-cell .rank {
    display: inline-block;
    vertical-align: top;
    font: 20px/1.4em a;
    color: gold;
    min-width: 30px;
    font-style: italic;
}

.box-cell .movie-detail {
    display: inline-block;
    vertical-align: top;
}

.movie-detail .cover {
    display: inline-block;
    padding: 0 5px;
    vertical-align: top;
}

.movie-detail .info {
    display: inline-block;
    vertical-align: top;
    text-align: left;
    padding-left: 10px;
}

.movie-detail .info {
    display: inline-block;
    vertical-align: top;
    text-align: left;
}

.movie-detail .info p {
    font-size: 14px;
    margin-bottom: 20px;
}


.movie-detail .info .box .num {
    color: #fe6d0e;
    font-weight: bold;
}


.movie-detail .db-rate {
    padding-left: 0;
}

.movie-detail .cover img {
    height: 160px;
    max-width: 150px;
    display: block;
    margin: 0 auto;
    box-shadow: 4px 4px 8px #8f8e8e;
}

.movie-detail .info .title {
    margin: 10px 0 20px;
    font-size: 16px;
    line-height: 16px;
    font-family: "Microsoft YaHei", Arial, Helvetica, sans-serif, "宋体";
    font-weight: bold;
    color: green;
    width: 140px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}

.movie-detail .tags {
    width: 100%;
    overflow: hidden;
    margin: 10px 0;
}

.movie-detail .tags span {
    border: 1px solid #eee;
    padding: 2px 5px;
    display: inline-block;
    font-size: 14px;
    background: rgb(255, 234, 156);
    color: #333;
    margin: 2px 3px;
}
</style>
