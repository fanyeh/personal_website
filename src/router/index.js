import Vue from 'vue'
import Router from 'vue-router'
import PortfolioItem from '@/components/PortfolioItem'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/portfolio/:name',
      component: PortfolioItem,
      props: true
    }
  ]
})
