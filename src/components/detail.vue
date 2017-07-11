<template>
    <div class="detail" v-bind:style="{backgroundImage:'url('+detail.images.large+')',backgroundSize: 'cover',backgroundAttachment: 'fixed'}">
        <div class="top-wrap">
            <div class="content-wrap">
                <div class="title">
                    <h1>{{detail.title}} - {{detail.year}}</h1>
                </div>
                <div class="content">
                    <p v-if="detail.aka">又名:
                        <span v-for="tag in detail.aka" :key='tag'>{{tag}} / </span>
                    </p>
                    <p class="author">导演:
                        <span v-for="tag in detail.directors" :key='tag'>{{tag.name}} / </span>
                    </p>
                    <p class="casts">主演:
                        <span v-for="tag in detail.casts" :key='tag'>{{tag.name}} / </span>
                    </p>
                    <p class="types">类型:
                        <span v-for="tag in detail.genres" :key='tag'>{{tag}} / </span>
                    </p>
                </div>
                <div class="rate block">
                    <h2>----豆瓣评分----</h2>
                    <p>
                        <el-rate v-model="detail.rating.average" :max=10 disabled show-text text-color="#ff9900" disabled-void-color="#C6D1DE" text-template="{value}">
                        </el-rate>
                        <span>({{detail.collect_count}}人评价)</span>
                    </p>
                </div>
                <div class="summary block">
                    <h2>----剧情简介----</h2>
                    <p>{{detail.summary}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import jsonp from 'jsonp';
export default {
    name: 'detail',
    data() {
        return {
            title: '豆瓣电影',
            id: 1,
            detail: {
                images: '',
                rating: { avarage: 0 },
                collect_count: '',
                summary: '',
                genres: [],
                cast: [],
                aka: [],
                directors: [],
                title: '',
                year: ''
            },
            rate: 6.7
        };
    },
    created() {
        // 组件创建完后获取数据，
        // 此时 data 已经被 observed 了
        this.fetchData()
    },
    methods: {
        fetchData() {
            window.scrollTo(0, 0)
            this.id = this.$route.params.id;
            var self = this;
            this.http.get('/api/movie/subjects?id=' + this.id)
                .then(res => {
                    if (res.status === 200) {
                        self.detail = res.data;
                    }
                })
                .catch(err => {
                    console.error(err);
                })
                ;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-rate {
    text-align: left;
}

.detail {
    background: url(https://img3.doubanio.com/view/movie_poster_cover/lpst/public/p2460006593.webp) center no-repeat;
    background-size: cover;
    background-attachment: fixed;
    height: 100vh;
    height:100%;
    height:600px;
    overflow: auto;

}

.top-wrap {

    padding-top: 400px;
}

.content-wrap {
    background: #f2f7f2;
}

.title {
    padding: 20px;
    padding-bottom: 0;
}

.title h1 {
    font-size: 16px;
    color: #333;
    font-weight: normal;
}

.cover {
    padding: 0;
}

.cover img {
    width: 100%;
    height: 100%;
    max-width: 100%;
}

.content {
    margin-top: 5px;
    padding: 5px 20px;
}

.content p {
    font: 14px/1.4em a;
    color: #aaa;
    margin: 6px 0;
}

.block {
    padding: 20px;
    padding-top: 0px;
}

.rate span {
    padding-left: 10px;
    color: #aaa;
    font-size: 12px;
}

.block h2 {
    margin-bottom: 10px;
    color: #888;
    font-size: 16px;
    font-weight: normal;
    text-align: center;
}

.block p {
    font: 14px/1.4em a;
    color: #333;
}
</style>
