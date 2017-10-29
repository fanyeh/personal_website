<template>
  <div class='slide'>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.slide {
  position: absolute; //background-color: red;
  opacity: 0;
}
</style>
