<template>
  <div id="app">
    <router-view></router-view>
    <router-view name="freecodecamp"></router-view>
    <vue-item></vue-item>
    <cssItem></cssItem>
    <Social></Social>
  </div>
</template>

<script>
import About from 'components/About'
import FreeCodeCamp from 'components/FreeCodeCamp'
import cssItem from 'components/CSSItem'
import vueItem from 'components/VueItem'
import Social from 'components/Social'
export default {
  name: 'app',
  components: {
    About,
    FreeCodeCamp,
    cssItem,
    vueItem,
    Social
  }
}
</script>
<style>
#app  {
  font-family: 'Exo', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
