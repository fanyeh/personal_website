<template>
  <div id="random-quote-machine">
  
    <div class="quote">
      <!--<p :class="popQuote ? 'zoomIn animated' : ''">{{formatQuote}}</p>-->
      <!--<p>{{formatQuote}}</p>-->
      <p class="p_quote">
        <transition-group name="fade">
          <span v-for="(char,index) in quoteString" :key="index">{{char}}</span>
        </transition-group>
      </p>
    </div>
  
    <div class="author" :class="popQuote ? 'zoomIn animated' : ''" v-if="popQuote">
      <span class="author-name">{{formatAuthor}} </span>
      <a id="tweet" target="_blank" :href="href">
        <i class="fa fa-twitter-square fa-lg" aria-hidden="true"></i>
      </a>
    </div>
  
    <div class="quote-button">
      <span class="new-quote" @click="getQuote">New Quote</span>
    </div>
  </div>
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
      href: '',
      popQuote: false,
      quoteString: []
    }
  },
  methods: {
    getQuote() {
      this.popQuote = false
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
          this.href = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + this.quote + '" ' + this.author)
          this.animateQuote()
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
#random-quote-machine {
  display: grid;
  grid-template-rows: 7fr 3fr 1fr; // height: 100%;
  // border: 1px solid;
}

div {
  text-align: center;
}

.button:active {
  transform: scale(0.95, 0.95);
}


.quote {
  font-size: 50px;
  grid-column: 1;
  grid-row: 1;
  height: 40vh;
}

.author {
  font-size: 25px;
  grid-column: 1;
  grid-row: 2;
}

.quote-button {
  grid-column: 1;
  grid-row: 3;
}

.author-name {
  padding-right: 10px;
}

.new-quote {
  background-color: #303030;
  border-radius: 15px; // font-weight: 400;
  color: white;
  font-size: 18px;
  margin: auto;
  padding: 3px 15px;
  transition: all .1s ease-in-out;
  cursor: pointer;
}

// .p_quote {
//   margin-top: 300px;
// }
.fa {
  color: #303030;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .5s;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

{
  opacity: 0
}
</style>
