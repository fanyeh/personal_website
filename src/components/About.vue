<template>
  <section>
    <div id="about">
      <img class="about-me" src="../../static/About.png"></img>
    </div>
  </section>
</template>
<script>

/* If required */
/* import otherComponent from './components/OtherComponent' */

export default {
  name: 'about',
  props: ['id'],
  data() {
    return {
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.about-me {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 100px;
  margin-bottom: 70px;
}
</style>
