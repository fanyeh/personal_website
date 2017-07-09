<template>
  <div id="app" class="container-fluid">
    <router-view></router-view>
    <router-view name="portfolio"></router-view>
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
