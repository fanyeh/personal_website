<template>
  <div class="container">
    <div class="close-btn">
      <i class="fa fa-times-circle fa-2x" aria-hidden="true" @click="closeSlider" cp></i>
    </div>
    <div class="row slide">
      <div class="hidden-sm-down col-md-1">
        <i class="fa fa-chevron-left fa-2x slide-ctrl__btn" aria-hidden="true" @click="prevContent"></i>
      </div>
      <div class="col-md-10">
        <div class="slide-content">
          <component :is="$route.params.projectName"></component>
        </div>
      </div>
      <div class="hidden-sm-down col-md-1">
        <i class="fa fa-chevron-right fa-2x slide-ctrl__btn" aria-hidden="true" @click="nextContent"></i>
      </div>
    </div>
  </div>
</template>

<script>

/* If required */
import Quote from 'freecodecamp/Quote'
import Clock from 'freecodecamp/Clock'
import Weather from 'freecodecamp/Weather'
import Wiki from 'freecodecamp/Wiki/Wiki'
import Twitch from 'freecodecamp/Twitch'
import Calculator from 'freecodecamp/Calculator'
import TicTacToe from 'freecodecamp/TicTacToe'
import Simmon from 'freecodecamp/Simmon/Simmon'
import Markdown from 'freecodecamp/Markdown'
import Leaderboard from 'freecodecamp/Leaderboard'
import Receipe from 'freecodecamp/Receipe'
import GameOfLife from 'freecodecamp/GameOfLife'

export default {
  name: 'freeCodeCampItem',
  props: ['projectName'],
  data() {
    return {
      contentIndex: 0,
      projects: ['quote', 'weather', 'wiki', 'twitch', 'calculator', 'clock', 'ticTacToe', 'simmon', 'markdown', 'leaderboard', 'receipe', 'gameOfLife']
    }
  },
  components: {
    quote: Quote,
    clock: Clock,
    weather: Weather,
    wiki: Wiki,
    twitch: Twitch,
    calculator: Calculator,
    ticTacToe: TicTacToe,
    simmon: Simmon,
    markdown: Markdown,
    leaderboard: Leaderboard,
    receipe: Receipe,
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
      this.$router.push({ name: 'freecodecamp', params: { projectName: this.projects[this.contentIndex] } })
    },
    closeSlider() {
      document.body.style.overflow = 'auto'
      this.$router.push({ name: 'home' })
    }
  },
  mounted() {
    document.body.style.overflow = 'hidden'
  },
  destroyed() {
    document.body.style.overflow = 'auto'
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.container {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  text-align: center;
  z-index: 999;
}

.close-btn {
  text-align: right;
  padding-top: 10px;
}

.slide {
  height: 90%;
}

.slide-content {
  height: 100%;
}

.slide-ctrl__btn {
  position: relative;
  top: 50%;
  transform: translateY(-50%); // border: 1px solid;
}
</style>
