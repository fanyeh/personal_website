<template>
  <div id="app" class="container-fluid">
    <router-view></router-view>
    <router-view name="freecodecamp"></router-view>
    <cssItem></cssItem>
  </div>
</template>

<script>
import About from 'components/About'
import FreeCodeCamp from 'components/FreeCodeCamp'
import cssItem from 'css/CSSItem'

export default {
  name: 'app',
  components: {
    About,
    FreeCodeCamp,
    cssItem
  }
}
</script>
