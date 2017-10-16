import Vue from 'vue'
import Router from 'vue-router'
import About from 'components/About'
import FreeCodeCamp from 'components/FreeCodeCamp'
import FreeCodeCampItem from 'components/FreeCodeCampItem'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'home',
    components: {
      default: About,
      freecodecamp: FreeCodeCamp
    }
  },
  {
    path: '/freecodecamp/:projectName',
    name: 'freecodecamp',
    component: FreeCodeCampItem,
    props: true
  }]
})
