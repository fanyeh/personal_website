<template>
  <section>
    <div class="container">
      <div class="item header">
        <i class="fa fa-times-circle fa-2x" aria-hidden="true" @click="closeSlider"></i>
      </div>
      <div class="item prev" @click="prevContent">
        <i class="fa fa-chevron-left fa-2x" aria-hidden="true"></i>
      </div>
      <div class="item project">
        <div :is="currentProject"></div>
      </div>
      <div class="item next" @click="nextContent">
        <i class="fa fa-chevron-right fa-2x" aria-hidden="true"></i>
      </div>
    </div>
  </section>
</template>

<script>

/* If required */
import Quote from '../components/freecodecamp/Quote'
import Clock from '../components/freecodecamp/Clock'
import Weather from '../components/freecodecamp/Weather'
import Wiki from '../components/freecodecamp/Wiki/Wiki'
import Twitch from '../components/freecodecamp/Twitch'
import Calculator from '../components/freecodecamp/Calculator/Calculator'
import TicTacToe from '../components/freecodecamp/TicTacToe'
import Simmon from '../components/freecodecamp/Simmon/Simmon'
import Markdown from '../components/freecodecamp/Markdown'
import Leaderboard from '../components/freecodecamp/Leaderboard'
import Receipe from '../components/freecodecamp/Receipe'
import GameOfLife from '../components/freecodecamp/GameOfLife'

export default {
  name: 'portfolio-item',
  data() {
    return {
      name: '',
      contentIndex: 0,
      currentProject: '',
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
  watch: {
    name: function (val, newVal) {
      this.contentIndex = this.projects.indexOf(val)
      this.fetchContent()
    }
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
      this.currentProject = this.projects[this.contentIndex]
    },
    closeSlider() {
      this.$store.commit('toggle')
    }
  },
  mounted() {
    this.contentIndex = this.projects.indexOf(this.$store.state.selectedProject)
    this.fetchContent()
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.container {
  display: grid;
  grid-template-columns: 1fr 10fr 1fr;
  grid-template-rows: 50px auto 50px;
  grid-gap: 5px;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
}

.item {
  align-self: center;
  justify-self: center;
}

.prev {
  grid-column: 1;
  grid-row: 2;
}

.project {
  grid-column: 2;
  grid-row: 2;
  justify-self: stretch; // align-self: stretch;
}

.next {
  grid-column: 3;
  grid-row: 2;
}

.header {
  grid-column: 3/4;
  grid-row: 1/2; // justify-self: right;
  justify-self: stretch;
  text-align: right;
}

.fa-times-circle {
  margin-right: 20px;
}
</style>
