import Vue from 'vue'
import Router from 'vue-router'
import currentMovie from '@/components/currentMovie'
import detail from '@/components/detail'

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
    }
  ]
})
