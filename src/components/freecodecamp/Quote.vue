<template>
  <div>
    <div v-if="loading" class="loader">
      <i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
      <span class="sr-only">Loading...</span>
    </div>
  
    <div class="quote" v-else>
      <transition-group name="fade">
        <span class="mb-0 quote__txt" v-for="(char,index) in quoteString" :key="index">{{char}}</span>
      </transition-group>
      <div class="quote__author" :class="popQuote ? 'zoomIn animated' : ''" v-if="popQuote">
        <span class="quote__author-name">{{formatAuthor}}</span>
        <a id="tweet" target="_blank" :href="href">
          <i class="fa fa-twitter-square" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  
    <div class="quote__btn">
      <button class="btn btn-default" @click="getQuote" :disabled="newQuote">New Quote</button>
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
          this.href = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + this.quote + '" ' + this.author)
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
.quote {
  position: absolute;
  text-align: center;
  width: 100%;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
}

.quote__btn {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.btn:active {
  transform: scale(0.90);
}

.fa-twitter-square {
  color: black;
}

.quote__author {
  margin-top: 70px;
}

.quote__author-name {
  font-style: italic;
}

.btn {
  background: #303030;
  color: white;
}

.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.fade-enter-active,
.fade-leave-active {
  transition: all .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}

// Mobile
@media (max-width: 767px) {
  .quote__txt {
    font-size: 1.1em;
  }

  .quote__author-name {
    font-size: 0.8em;
  }

  .quote {
    top: 20%;
  }

  .btn {
    transform: scale(0.7);
  }
}

// IPad
@media (min-width: 768px) {
  .quote__txt {
    font-size: 1.75em;
  }

  .quote__author-name {
    font-size: 1.3em;
  }

  .fa {
    font-size: 1.3em;
  }
}

// IPad pro
@media (min-width: 992px) {
  .quote__txt {
    font-size: 2.5em;
  }

  .quote__author-name {
    font-size: 1.75em;
  }
  .fa {
    font-size: 1.75em;
  }
}

// Desktop 
@media (min-width: 1200px) {
  .quote__txt {
    font-size: 3em;
  }
  .quote__author-name {
    font-size: 1.55em;
  }

  .fa {
    font-size: 1.9em;
  }
}
</style>
