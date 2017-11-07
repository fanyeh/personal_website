<template lang="pug">
transition(name="close")
  div(class="fixed h-100 w-100 bg-white tc top-0 left-0 relative z-999" ref="portfolio")
    div(class="absolute right-1 top-1")
      i(class="fa fa-times-circle fa-2x f3 f2-ns" aria-hidden="true" @click="closeSlider")
    div(class="w-100 fl ")
      div(class="w-10 fl vh-100")
        i(class="fa fa-chevron-left fa-2x relative v-center f2-ns f4"  @click="prevContent")
      div(class="w-80 fl vh-100")
        transition(name="slide-fade")
          component(:is="$route.params.projectName")
      div(class="w-10 fl vh-100")
        i(class="fa fa-chevron-right fa-2x f2-ns f4 relative v-center" @click="nextContent")
</template>

<script>
import Quote from 'freecodecamp/Quote'
import Clock from 'freecodecamp/Clock'
import Calculator from 'freecodecamp/Calculator'
import TicTacToe from 'freecodecamp/TicTacToe'
import Simmon from 'freecodecamp/Simmon/Simmon'
import Markdown from 'freecodecamp/Markdown'
import Leaderboard from 'freecodecamp/Leaderboard'
import GameOfLife from 'freecodecamp/GameOfLife'

export default {
  name: 'freeCodeCampItem',
  data() {
    return {
      contentIndex: 0,
      projects: ['quote', 'calculator', 'clock', 'ticTacToe', 'simmon', 'markdown', 'leaderboard', 'gameOfLife']
    }
  },
  components: {
    quote: Quote,
    clock: Clock,
    calculator: Calculator,
    ticTacToe: TicTacToe,
    simmon: Simmon,
    markdown: Markdown,
    leaderboard: Leaderboard,
    gameOfLife: GameOfLife
  },
  methods: {
    nextContent() {
      this.contentIndex = this.contentIndex === this.projects.length - 1 ? 0 : this.contentIndex + 1
      this.fetchContent()
    },
    prevContent() {
      this.contentIndex = this.contentIndex === 0 ? this.projects.length - 1 : this.contentIndex - 1
      this.fetchContent()
    },
    fetchContent() {
      let currentProject = this.projects[this.contentIndex]
      this.$router.push({ name: 'freecodecamp', params: { projectName: currentProject } })
    },
    closeSlider() {
      this.$refs.portfolio.style.transformOrigin = 'top right'
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped lang='scss'>
.close-enter-active, .close-leave-active {
  transition: all 0.4s ease-out;
}
.close-enter, .close-leave-to {
  transform: scale(0);
}
.close-enter-to, .close-leave {
  transform: scale(1);
}

.slide-fade-enter-active {
  transition: all .7s ease;
}
.slide-fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-leave-to , .slide-fade-enter
/* .slide-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
