import Vue from 'vue'
import Router from 'vue-router'
import AboutMe from 'components/AboutMe'
import FCCProject from 'components/FCCProject'
import FCCProjectSlider from 'components/fcc_project/FCCProjectSlider'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'home',
    components: {
      default: AboutMe,
      freecodecamp: FCCProject
    }
  },
  {
    path: '/fcc_project/:projectName',
    name: 'freecodecamp',
    component: FCCProjectSlider,
    props: true
  }]
})
