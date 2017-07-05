<template>
    <div id="app" :class="{lock:showSide}">
        <header class="header-douban">
            <h1>
                <router-link :to="{ name: 'currentMovie'}">{{ title }} </router-link>
            </h1>
            <h2>{{subtitle}}</h2>
            <span class="more-func" @click="showSide=true"></span>
        </header>
        <transition name="el-fade-in">
            <div class="content">
                <router-view :movie="indata"></router-view>
            </div>
        </transition>
        <sidenav-com :show="showSide" @hide="showSide=false"></sidenav-com>
    </div>
</template>

<script>
import sidenavCom from './components/sidenavCom.vue'
import jsonp from 'jsonp';
export default {
    name: 'app',
    components: { sidenavCom },
    data() {
        return {
            indata: {
                current: {
                    subjects: []
                },
                commingsoon: {
                    subjects: []
                }
            },
            title: "豆瓣",
            subtitle: '上映电影',
            showSide: false
        }
    },
    methods: {
    },
    watch: {
        '$route'(to, from) {
            console.log(to);
            var name = to.name;
            switch (name) {
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
    created() {
        var self = this;
        this.http.get('/api/current?page=0').then(res=>{
            console.log(res);
            if(res.status === 200){
                self.indata.current = res.data;
                self.indata.commingsoon = res.data.commingsoon;
            }
        });
        this.http.get('/api/commingsoon?page=0').then(res=>{
            console.log(res);
            if(res.status === 200){
                self.indata.commingsoon = res.data;
            }
        });
    }
}
</script>

<style>
#app {
    height: 100%;
    margin: 0;
}

.lock {
    position: fixed;
}

.content .el-tabs__nav {
    width: 100%;
}

.content .el-tabs__item {
    width: 50%;
    text-align: center;
}

.content .el-rate {
    padding: 0 10px;
    text-align: center;
}

.content .el-rate__icon {
    font-size: 14px;
}

.content .el-tabs__header {
    position: fixed;
    z-index: 1001;
    width: 100%;
    top: 60px;
    background: #fff;
}

.content .el-tabs__content {
    margin-top: 105px;
}

.header-douban {
    position: fixed;
    width: 100%;
    z-index: 10000;
    top: 0;
    height: 60px;
    line-height: 60px;
    background-color: rgb(0, 181, 29);
}

.header-douban h1 {
    color: #fff;
    font-size: 20px;
    padding-left: 20px;
}

.header-douban h2 {
    position: relative;
    top: -60px;
    text-align: center;
    color: #eee;
    font-weight: normal;
    font-size: 18px;
    width: 100px;
    margin: 0 auto;
}

.header-douban .more-func {
    background: url(./img/func.png) center no-repeat;
    height: 24px;
    width: 20px;
    position: absolute;
    right: 20px;
    top: 20px;
    background-size: cover;
}
</style>
