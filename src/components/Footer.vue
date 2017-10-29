<template lang="pug">
  .container(class="mt6")
    hr(class="b--black-30")
    .section(class="f3 bg-white  relative ph5 dib") Find me on
    div(class="mt1 tc mb4")
      i(class="fa fa-facebook fa-2x mh4 ph3 black-70" aria-hidden="true")
      i(class="fa fa-linkedin fa-2x mh4 ph3 black-70" aria-hidden="true")
      i(class="fa fa-github fa-2x mh4 ph3 black-70" aria-hidden="true")
</template>

<script>

/* If required */
/* import otherComponent from './components/OtherComponent' */

export default {
  name: 'footer',
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

.section {
  top: -33px;
  left: 50%;
  transform: translateX(-50%);
}

</style>
