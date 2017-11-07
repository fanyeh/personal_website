<template lang="pug">
  #quoteMachine(class="vh-100")
    //- Loader
    .loader(v-if="loading" class="absolute abs-center")
      i(class="fa fa-spinner fa-pulse fa-2x fa-fw")
      span.sr-only Loading
    //- Quote
    div(v-else class="v-center relative" )
      transition-group(name="fade")
        span(class="f2-ns f3" v-for="(char,index) in quoteString" :key="index") {{char}}
      div(class="mt5" :class="popQuote ? 'zoomIn animated' : ''" v-if="popQuote")
        span(class="f4-ns f5 i author") {{formatAuthor}}
        a(target="_blank" :href="tweetLink")
          i(class="fa fa-twitter-square black f3-ns f4 pl2" aria-hidden="true")
    //- New Button
    div(v-if="!loading" class="absolute bottom-2 left-0 right-0")
      button(class="br-pill bg-blue white ph3 pv2 bn outline-0 f6 f5-ns pointer" @click="getQuote" :disabled="newQuote") New Quote
</template>

<script>
import axios from 'axios'
export default {
  name: 'random-quote-machine',
  data() {
    return {
      quote: '',
      author: '',
      hasQuote: false,
      tweetLink: '',
      popQuote: false,
      quoteString: [],
      loading: true,
      newQuote: true
    }
  },
  methods: {
    getQuote() {
      this.popQuote = false
      this.newQuote = true
      this.loading = true
      this.quoteString = []
      axios.get('https://andruxnet-random-famous-quotes.p.mashape.com/cat=', {
        headers: {
          'X-Mashape-Key': 'HSFe45eeAQmshHBn3fBca6HMxKwZp11mcc5jsnEwYaMoStHeST',
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((response) => {
          this.hasQuote = true
          this.quote = `" ${response.data['quote']} "`
          // this.popQuote = true
          this.author = response.data['author']
          this.tweetLink = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + this.quote + '" ' + this.author)
          this.animateQuote()
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
          this.hasQuote = false
        })
    },
    animateQuote() {
      let timer = 0
      const interval = 100
      this.quote.split('').forEach((e) => {
        setTimeout(() => {
          this.quoteString.push(e)
        }, timer)
        timer += interval
      })

      setTimeout(() => {
        this.popQuote = true
        this.newQuote = false
      }, this.quote.split('').length * interval)
    }
  },
  computed: {
    formatAuthor() {
      return this.hasQuote ? `- ${this.author} ` : ''
    },
    formatQuote() {
      return this.hasQuote ? `" ${this.quote} "` : ''
    }
  },
  mounted() {
    this.getQuote()
  }
}
</script>

<style scoped lang="scss">
button {
  &:active {
    transform: scale(0.95);
  }
  &:disabled {
    background-color: lightgray;
    color:gray;
    border:2px solid lightgray;
  }
}

button , .author {
  font-family:"Roboto";
}

.fade-enter-active,
.fade-leave-active {
  transition: all .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}

</style>
