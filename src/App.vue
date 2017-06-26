<template>
  <div id="app">
  
    <header-bar></header-bar>
    <!--<about></about>-->
    <portfolio></portfolio>
    <!--<portfolio></portfolio>-->
    <portfolio-item v-if="toggle"></portfolio-item>
    <!--<grid></grid>-->
  </div>
</template>

<script>
import About from './components/About'
import Portfolio from './components/Portfolio'
import HeaderBar from './components/HeaderBar'
import PortfolioItem from './components/PortfolioItem'
import Grid from './components/Grid'

export default {
  name: 'app',
  components: {
    About,
    Portfolio,
    HeaderBar,
    PortfolioItem,
    Grid
  },
  computed: {
    toggle() {
      return this.$store.state.showSlider
    }
  }
}
</script>

<style scoped lang='scss'>
#app {
  position: relative;
}
</style>
