<template lang="pug">
  .slide
    slot
</template>

<script>
export default {
  name: 'slide',
  data() {
    return {}
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.slide {
  position: absolute;
  opacity: 1;
  border:4px solid white;
}
</style>
