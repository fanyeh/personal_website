<template>
  <div id="app" class="container-fluid">
    <router-view class="view one"></router-view>
    <router-view class="view two" name="portfolio"></router-view>
  </div>
</template>

<script>
import About from 'components/About'
import Portfolio from 'components/Portfolio'

export default {
  name: 'app',
  components: {
    About,
    Portfolio
  }
}
</script>

<style scoped lang='scss'>

</style>
