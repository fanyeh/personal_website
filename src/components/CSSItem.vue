<template>
<div class="container mt6">
    <hr class=" b--black-30">
    <div class="section f3 bg-white  relative ph5 dib">CSS</div>
    <h6 class="tc f5 mt2">Bird Loader</h6>
    <bird-loader></bird-loader>
    <hr class="mt5 mh7 bt b--dashed  b--black-30">
    <h6 class="tc f5 mt4">Double Helix Loader</h6>
    <spiral-loader></spiral-loader>
    <hr class="mt5 mh7 bt b--dashed  b--black-30">
    <h6 class="tc f5 mt4">Dash Loader</h6>
    <dash-loader></dash-loader>
  </div>
</template>

<script>

/* If required */
/* import otherComponent from './components/OtherComponent' */
import BirdLoader from 'pureCSS/BirdLoader'
import SpiralLoader from 'pureCSS/SpiralLoader'
import DashLoader from 'pureCSS/DashLoader'
export default {
  name: 'cssItem',
  components: {
    BirdLoader,
    SpiralLoader,
    DashLoader
  },
  data() {
    return {}
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.container {
  font-family: 'Exo', sans-serif;
}

.section {
  top: -33px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
