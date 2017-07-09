<template>
  <div class="container">
    <hr>
    <div class="separator">
      <a class="separator__link" href="https://www.freecodecamp.com" taget="_blank">
        <p>freeCodeCamp</p>
      </a>
    </div>
  
    <div class="masonry">
      <div class="masonry__item" v-for="(project,index) in projects" :key="index">
        <p class="project-title">{{project}}</p>
        <hr>
        <router-link :to="{name: 'portfolio' , params: {projectName:project}}">
          <img :src="projectImagePath(project)" width="100%"></img>
        </router-link>
      </div>
    </div>
  
    <div class="credit">
      <p>Projects are created by use of&nbsp
        <a href="https://vuejs.org" target="_blank">
          <span style="color:#3bb981">Vue.js</span>
        </a> /
        <a href="https://openweathermap.org/" target="_blank">
          <span style="color:#ff8c00">OpenWeatherMap</span>
        </a> /
        <a href="https://erikflowers.github.io/weather-icons/" target="_blank">
          <span style="color:#934aa5">Weather Icons</span>
        </a> /
        <a href="http://fontawesome.io" target="_blank">
          <span style="color:rgb(38,158,118)">Font Awesome</span>
        </a> /
        <a href="http://getbootstrap.com/" target="_blank">
          <span style="color:rgb(92,68,129)">Bootstrap</span>
        </a>
      </p>
    </div>
    <!--<transition name="fade">
                      <router-view></router-view>
                    </transition>-->
  </div>
</template>

<script>
export default {
  name: 'freecodecamp',
  data() {
    return {
      projects: ['quote', 'weather', 'wiki', 'twitch', 'calculator', 'clock', 'ticTacToe', 'simmon', 'markdown', 'leaderboard', 'receipe', 'gameOfLife']
    }
  },
  methods: {
    projectImagePath(project) {
      return require('../assets/images/freecodecamp/' + project + '.png')
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.container {
  font-family: 'Exo', sans-serif;
}

.separator {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 20px;
  background-color: white;
  padding: 0 30px;
  margin-top: -15px;
}

.separator__link {
  text-decoration: none;
  color: #303030;
}

.project-title {
  text-align: center;
  margin: 5px 0;
  font-weight: 100;
}

hr {
  margin: 0 10px;
}

.credit {
  text-align: center;
  font-size: 14px;
  clear: both;
  margin-top: 40px;
}

.masonry {
  -moz-column-count: 1;
  -webkit-column-count: 1;
  column-count: 1;
  column-gap: 0.9em;
  margin-top: 50px;
}

.masonry__item {
  display: inline-block;
  margin: 0 0 1em;
  width: 100%;
  border: 1px solid #eee;
  cursor: pointer;
  box-shadow: 2px 2px 4px #eee;
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

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 2s ease;
}

.fade-leave {}

.fade-leave-active {
  transition: opacity 2s ease;
  opacity: 0;
}
</style>
