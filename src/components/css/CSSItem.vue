<template>
  <div class="container">
    <hr>
    <div class="separator">
      <p>CSS</p>
    </div>

    <bird-loader></bird-loader>
    <hr>
    <spiral-loader></spiral-loader>
    <hr>
    <dash-loader></dash-loader>
  </div>
</template>

<script>

/* If required */
/* import otherComponent from './components/OtherComponent' */
import BirdLoader from 'css/BirdLoader'
import SpiralLoader from 'css/SpiralLoader'
import DashLoader from 'css/DashLoader'
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
<style scoped lang='scss'>
.container {
  font-family: 'Exo', sans-serif;
}

.separator {
  display: inline-block;
  position: relative;
  top: -85px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  background-color: white;
  padding: 0 30px; //margin-top: -175px;
}

hr {
  margin: 70px 10px;
}
</style>
