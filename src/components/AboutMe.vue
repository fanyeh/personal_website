<template lang="pug">
  #aboutMe(class="tc mt5-ns mt3 relative mb6-l mb7-m mb6")
    //- Title
    div(class="mb4-ns mb0 mt4 f-5-ns f1 fw7") Hi , I'm <span class="initial relative f-5-ns f1 fw">J</span>ack
    //- Image
    div(class="mw8 center overflow-hidden")
      //- Run
      div(v-if="largeScreen" class="fl w-33-l pa2 relative")
        img(class="absolute mt7 right-0" src="~images/about_me/about-me-left.svg")
        div(class="mr4")
          div(class="about-me__animation--runner mt7 mb2 center")
          label(class="mr2 black-60") somtimes I run
      //- Center
      div(class="fl w-100 w-33-l pa2 mb6-l mb3 mb4-m")
        img(class="mt4 w-100-l w-60 w-50-m" src="~images/about_me/about-me-img.png" ref="aboutMeImg")

      //- Cycling
      div(v-if="largeScreen" class="fl w-33-l pa2 relative")
        img(class="absolute left--1 mt5" src="~images/about_me/about-me-right.svg")
        div(class="ml6 mt5")
          div(class="about-me__animation--cycling ml1")
          label(class="fl mt2 black-60") somtimes I ride
    //- Message
    div(class="center dib")
      span(class="f3-ns f4") sometimes I write codes
      p(class="f5-ns f7 mb2 mt3 mt4-l tl ml3-ns ml1 black-60") {{typeConsoleString}}
        span(v-if="!showError " class="blink f5-ns f7") |
      transition(name="fade ")
        p(class="dark-red mb2 pl0-ns pl1 f6-ns f7" v-if="showError") {{errorMsg}}
      p(class="f5-ns f7 tl ml3-ns ml1 black-60" v-if="showError ") {{typeOopsString}}
</template>
<script>

/* If required */
export default {
  name: 'aboutMe',
  props: ['id'],
  data() {
    return {
      consoleString: ['> '],
      defaultMsg: 'hello( world! )',
      errorString: ['> '],
      errorMsg: 'ReferenceError: hello is not defined !',
      oopsString: ['> '],
      oopsMsg: 'oooops !',
      showError: false,
      largeScreen: true
    }
  },
  methods: {
    animateText(text, target) {
      let timer = 0
      const interval = 200
      text.split('').forEach((e) => {
        setTimeout(() => {
          target.push(e)
        }, timer)
        timer += interval
      })
    },
    animateErrorMsg() {
      const errorTimeout = 300 * this.defaultMsg.length + 1000
      setTimeout(() => {
        this.showError = true
        setTimeout(() => {
          this.animateText(this.oopsMsg, this.oopsString)
        }, 1000)
      }, errorTimeout)
    },
    animationDefaultMsg() {
      setTimeout(() => {
        this.animateText(this.defaultMsg, this.consoleString)
      }, 1000)
    }
  },
  computed: {
    typeConsoleString() {
      return this.consoleString.join('')
    },
    typeOopsString() {
      return this.oopsString.join('')
    }
  },
  mounted() {
    this.animationDefaultMsg()
    this.animateErrorMsg()
    this.largeScreen = !(screen.width <= 768)
  }
}
</script>

<style scoped lang='scss'>
#aboutMe {
  height:783px;
}

.about-me__animation--runner {
  width: 82.25px;
  height: 89px;
  background: url('~images/about_me/run.svg');
  &:hover {
    animation: run 1.2s steps(16) infinite;
  }
}

@keyframes run {
  100% {
    background-position: -1316px;
  }
}

.about-me__animation--cycling {
  width: 100.8px;
  height: 91px;
  background: url('~images/about_me/cycling.svg');
  &:hover {
    animation: cycling .5s steps(5) infinite;
  }
}

@keyframes cycling {
  100% {
    background-position: -504px;
  }
}

.blink {
  animation: blink 1s infinite;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all .5s;
  opacity:1;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.initial {
  padding-left:20px;
  padding-right:16px;
  color:white;
  &:before {
    content:"";
    position:absolute;
    width:70px;
    height: 70px;
    background-color:black;
    border-radius:50%;
    z-index:-1;
    left:-4px;
    top:20px;
  }
}

@media only screen and (max-width: 30em) {
  .initial {
  padding-right:12px;
  &:before {
      width:45px;
      height: 45px;
      top:12px;
      left:4px;
    }
  }
}

@media only screen and (max-width: 48em) {
  #about {
    height: 60vh;
  }
}

</style>
