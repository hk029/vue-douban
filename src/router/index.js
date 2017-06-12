import Vue from 'vue'
import Router from 'vue-router'
import currentMovie from '@/components/currentMovie'
import detail from '@/components/detail'
import movieList from '@/components/movieList'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'currentMovie',
      component: currentMovie
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/top250',
      name: 'top250',
      component: movieList
    },
    {
      path: '/usbox',
      name: 'usbox',
      component: movieList
    },
    {
      path: '/newmovies',
      name: 'newmovies',
      component: movieList
    },

  ]
})
