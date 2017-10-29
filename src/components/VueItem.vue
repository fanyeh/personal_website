<template>
  <div class="container mt5">
    <hr class=" b--black-30">
    <div class="section f3 bg-white relative ph5 dib">Vue.js</div>

    <div class="separator">
      <hr class="bt b--black-30 mh7">
      <div class="separator-mark">Infinite Carousel</div>
    </div>
    <carousel></carousel>

    <div class="separator mt6">
      <hr class="bt b--black-30 mh7">
      <div class="separator-mark">Datatable</div>
    </div>
    <datatable></datatable>

    <div class="separator mt6">
      <hr class="bt b--black-30 mh7">
      <div class="separator-mark">Pieces</div>
    </div>
    <piece></piece>

  </div>
</template>

<script>
import Carousel from 'vueProject/Carousel/Carousel'
import Piece from 'vueProject/PieceImg'
import Datatable from 'vueProject/Datatable'
export default {
  name: 'vueItem',
  components: {
    Carousel,
    Piece,
    Datatable
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.container {
  font-family: 'Exo', sans-serif;
}

.section {
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
}

.separator {
  .separator-mark {
    display:inline-block;
    position:relative;
    // width:42px;
    // height: 8px;
    /* border-radius:50%; */
    border:1px solid rgba(0,0,0,.3);
    left: 50%;
    transform:translateX(-50%);
    top:-30px;
    background-color:white;
    padding:0 10px;
  }
  hr {
    margin-left:440px;
    margin-right:440px;
  }
}

</style>
