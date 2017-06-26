<template>
  <div id="app">
    <div v-if="loading">
      <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      <span class="sr-only">Loading...</span>
    </div>
    <div v-else id="info">
      <div id="desc">
        <p id="description">{{description}}</p>
      </div>
  
      <div>
        <p id="location">{{location}} , {{country}}</p>
      </div>
  
      <div id="icon">
        <i :class="iconClass"></i>
      </div>
      <div id="temp">
        <p id="temperature">{{temperature}}</p>
      </div>
  
    </div>
    <p id="credit">Powered by
      <a href="https://vuejs.org" target="_blank">
        <span style="color:#3bb981">Vue.js</span>
      </a> /
      <a href="https://openweathermap.org/" target="_blank">
        <span style="color:#ff8c00">OpenWeatherMap</span>
      </a> /
      <a href="https://erikflowers.github.io/weather-icons/" target="_blank">
        <span style="color:#934aa5">Weather Icons</span>
      </a>
    </p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'app',
  data() {
    return {
      iconID: '',
      iconClass: '',
      description: '',
      location: '',
      country: '',
      temperature: '',
      loading: true
    }
  },
  methods: {
    getWeather() {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude
        const latitude = position.coords.latitude
        const openWeatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=21a80f6db01b8c120e0935192ec025ef&units=metric`
        axios.get(openWeatherURL)
          .then((response) => {
            this.loading = false
            const data = response.data
            this.iconID = data.weather[0].id
            this.iconClass = `wi wi-owm-${this.iconID}`
            this.location = data.name
            this.description = data.weather[0].main
            this.country = data.sys.country
            this.temperature = Math.floor(data.main.temp) + 'º'
          }).catch((error) => {
            console.log(error)
          })
      })
    }
  },
  created() {
    this.getWeather()
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/weather-icons.css";
@import "../../assets/styles/font-awesome.css";

div {
  text-align: center;
}

#info {
  transform: translateY(-20%);
}

$iconSize: 200px;
#icon {
  height: $iconSize;
  margin: 90px;
}

i.wi {
  font-size: $iconSize;
  font-weight: 900;
  line-height: $iconSize;
}

#credit {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0)
}

#desc {
  height: 80px;
}

#description {
  font-size: 80px;
  font-weight: 900;
  line-height: 80px;
}

#location {
  font-size: 22px;
}

#temp {
  height: 80px;
  margin-top: 30px;
}

#temperature {
  font-size: 80px;
  font-weight: 700;
  line-height: 80px;
}
</style>
