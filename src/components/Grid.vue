<template>
  <div class="container">
    <div class="item header">
      <div class="close-btn">Close</div>
    </div>
    <div class="item a">&lt</div>
    <div class="item b">B</div>
    <div class="item c">&gt</div>
  </div>
</template>

<script>

/* If required */
/* import otherComponent from './components/OtherComponent' */

export default {
  name: 'grid',
  data() {
    return {}
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.container {
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  grid-template-rows: 50px auto 50px; // grid-gap: 10px 10px;
  border: 1px solid red;
  height: 99.8vh;
}

.item {
  background-color: yellow;
  border: 1px solid;
}

.a {
  grid-column: 1;
  grid-row: 2;
  align-self: center;
  justify-self: center;
}

.b {
  grid-column: 2;
  grid-row: 2;
}

.c {
  grid-column: 3;
  grid-row: 2;
  align-self: center;
  justify-self: center;
}

.header {
  grid-column: 3/4;
  grid-row: 1/2;
  align-self: center;
  justify-self: center;
}
</style>
