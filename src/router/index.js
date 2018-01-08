import Vue from 'vue'
import Router from 'vue-router'
import AboutMe from 'components/AboutMe'
import FCCProject from 'components/FCCProject'
import FCCProjectSlider from 'components/fcc_project/FCCProjectSlider'
import CSSProject from 'components/CSSProject'
import VueProject from 'components/VueProject'
import SocialFooter from 'components/SocialFooter'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    name: 'home',
    components: {
      default: AboutMe,
      fcc: FCCProject,
      vue: VueProject,
      css: CSSProject,
      social: SocialFooter
    }
  },
  {
    path: '/fcc_project/:projectName',
    name: 'freecodecamp',
    component: FCCProjectSlider,
    props: true
  }]
})
