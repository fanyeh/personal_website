<template lang="pug">
  #app(class="overflow-auto")
    router-view
    router-view(name="freecodecamp")
    vue-item
    cssItem
    Social
    i(class="fa fa-arrow-circle-up fixed right-2 bottom-1 silver f1 pointer grow" aria-hidden="true" @click="scrollTop")
</template>

<script>
import About from 'components/About'
import FreeCodeCamp from 'components/FreeCodeCamp'
import cssItem from 'components/CSSItem'
import vueItem from 'components/VueItem'
import Social from 'components/Social'
export default {
  name: 'app',
  components: {
    About,
    FreeCodeCamp,
    cssItem,
    vueItem,
    Social
  },
  data () {
    return {
      isScrollToTop: false
    }
  },
  methods: {
    scrollTop() {
      if (!this.isScrollToTop) {
        let scrollStep = -window.scrollY / (800 / 5)
        let scrollInterval = setInterval(function() {
          if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep)
          } else {
            clearInterval(scrollInterval)
            this.isScrollToTop = !this.isScrollToTop
          }
        }, 5)
      }
    }
  }
}
</script>
<style lang="scss">
#app  {
  font-family: 'Exo', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

button {
  -webkit-appearance:none;
  outline: none;
  cursor: pointer;
}
</style>
