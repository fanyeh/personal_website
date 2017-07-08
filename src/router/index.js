import Vue from 'vue'
import Router from 'vue-router'
import PortfolioItem from 'components/PortfolioItem'
import About from 'components/About'
import Portfolio from 'components/Portfolio'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'home',
    components: {
      default: About,
      portfolio: Portfolio
    }
  },
  {
    path: '/portfolio/:projectName',
    name: 'portfolio',
    component: PortfolioItem,
    props: true
  }
  ]
})
