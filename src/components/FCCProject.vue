<template lang="pug">
  #fccProject(class="w-80 center" ref='fcc')
    hr(class="light-silver bt")
    a(class="top--2-ns top-c h-center f2-ns f3 bg-white relative ph5-ns ph4 dib link mb5 black" href="https://www.freecodecamp.com" target="_blank") FreeCodeCamp
      
    .masonry
      .masonry__item(v-for="(project,index) in projects" :key="index")
        router-link(:to="{name: 'freecodecamp' , params: {projectName:project}}"  class='link mid-gray')
          p(class="tc f4-ns f6 f1 mt2 mb1 ") {{projectNames[index]}}
          hr(class="mh3 bt b--light-gray")
          div(class="relative h-75")
            img(:src="projectImagePath(project)" class="db center")
</template>

<script>

export default {
  name: 'fccProject',
  data() {
    return {
      projects: ['quote', 'calculator', 'clock', 'ticTacToe', 'simmon', 'markdown', 'gameOfLife', 'leaderboard'],
      projectNames: ['Quote Machine', 'Calculator', 'Pomodoro Clock', 'TicTacToe', 'Simmon Game', 'Markdown Viewer', 'Game of Life', 'Leaderboard']
    }
  },
  methods: {
    projectImagePath(project) {
      return require('../assets/images/freecodecamp/' + project + '.png')
    }
  }
}
</script>

<style scoped lang='scss'>
.masonry {
  width:90%;
  -moz-column-count: 1;
  -webkit-column-count: 1;
  column-count: 1;
  column-gap: 0.8em;
  margin:0 5%;
}

.masonry__item {
  display: inline-block;
  margin: 0 0 1em;
  width: 100%;
  height:400px;
  border: 1px solid #eee;
  cursor: pointer;
  box-shadow: 2px 2px 4px #eee;
  border-radius:3%;
  overflow:hidden;
}

@media only screen and (min-width: 768px) {
  .masonry {
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-count: 2;
  }
}

@media only screen and (min-width: 992px) {
  .masonry {
    -moz-column-count: 3;
    -webkit-column-count: 3;
    column-count: 3;
  }
}

@media only screen and (min-width: 1200px) {
  .masonry {
    -moz-column-count: 4;
    -webkit-column-count: 4;
    column-count: 4;
  }
}

img {
  position:relative;
  max-height:350px;
  z-index:1;
}

.link {
  text-decoration: none;
  &:visited {
    color:black;
  }
}
</style>
