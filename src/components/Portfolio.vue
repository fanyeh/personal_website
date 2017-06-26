<template>
  <div>
    <div class="container">
      <div class="grid-item" v-for="project in projects">
        <p>{{project}} Image</p>
        <hr>
        <p @click='setSelectedProject(project)'>{{project}} title</p>
      </div>
    </div>
  </div>
</template>

<script>

/* If required */
/* import otherComponent from './components/OtherComponent' */
import PortfolioItem from './PortfolioItem'

export default {
  name: 'grid',
  data() {
    return {
      projects: ['quote', 'weather', 'wiki', 'twitch', 'calculator', 'clock', 'ticTacToe', 'simmon', 'markdown', 'leaderboard', 'receipe', 'gameOfLife'],
      selectedProject: ''
    }
  },
  components: {
    PortfolioItem
  },
  methods: {
    setSelectedProject(p) {
      this.$store.commit('setProject', { project: p })
      this.$store.commit('toggle')
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.container {
  width: 70%;
  margin: 2% auto;
  overflow: hidden;
}

.grid-item {
  height: 200px;
  float: left;
  width: 22.5%;
  margin: 20px 1%;
  border: 2px solid;
  border-radius: 15px;
  color: #303030;
  cursor: pointer;
}
</style>
