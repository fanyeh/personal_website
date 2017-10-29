<template>
  <div id="app" class="container-fluid">
    <router-view></router-view>
    <router-view name="freecodecamp"></router-view>
    <vue-item></vue-item>
    <cssItem></cssItem>
    <Footer></Footer>
  </div>
</template>

<script>
import About from 'components/About'
import FreeCodeCamp from 'components/FreeCodeCamp'
import cssItem from 'components/CSSItem'
import vueItem from 'components/VueItem'
import Footer from 'components/Footer'
export default {
  name: 'app',
  components: {
    About,
    FreeCodeCamp,
    cssItem,
    vueItem,
    Footer
  }
}
</script>
