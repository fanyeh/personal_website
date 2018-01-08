<template lang="pug">
  #app(class="overflow-auto" v-cloak)
    keep-alive
      router-view
    keep-alive  
      router-view(name="fcc")
    keep-alive
      router-view(name="vue")
    keep-alive
      router-view(name="css")
    keep-alive
      router-view(name="social")
    i(class="fa fa-arrow-circle-up fixed right-2 bottom-1 silver f1 pointer grow" aria-hidden="true" @click="scrollTop")
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      isScrollToTop: false,
      scrollInterval: {}
    }
  },
  methods: {
    scrollTop() {
      let scrollStep = -window.scrollY / (800 / 5)
      this.scrollInterval = setInterval(function() {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep)
        } else {
          this.clearScrollInterval()
        }
      }, 5)
    },
    clearScrollInterval() {
      clearInterval(this.scrollInterval)
    }
  },
  mounted() {
    window.addEventListener('wheel', this.clearScrollInterval)
  },
  destroyed() {
    window.removeEventListener('wheel', this.clearScrollInterval)
  }
}
</script>
<style lang="scss">
#app  {
  font-family: 'Exo', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

[v-cloak] {
  display: none;
}

[v-cloak]::before { content: "loading…" }

button {
  -webkit-appearance:none;
  outline: none;
  cursor: pointer;
}
</style>
