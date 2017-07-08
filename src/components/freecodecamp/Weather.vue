<template>
  <div id="app">
  
    <div v-if="loading" class="loader">
      <i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
      <span class="sr-only">Loading...</span>
    </div>
  
    <div v-else class="weather">
      <div class="weather__description">{{description}}</div>
      <div class="weather__location">{{location}} , {{country}}</div>
      <i class="weather__icon" :class="iconClass"></i>
      <div class="weather__temperature">{{temperature}}</div>
    </div>
  
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
$iconSize: 8em;
$description: 5em;
$location: 1.375em;
$temperature: 4em;
$icon_margin: 0.5em;
$modifier: 1.5;
$font_weight:700;

#app {
  text-align: center;
}

.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.weather {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.weather__icon {
  font-size: $iconSize;
  margin: $icon_margin;
}

.weather__description {
  font-size: $description;
}

.weather__location {
  font-size: $location;
}

.weather__temperature {
  font-size: $temperature;
}

// IPad pro or above
@media (min-width: 992px) {
  .weather__icon {
    font-size: $iconSize * $modifier;
    margin: $icon_margin;
  }

  .weather__description {
    font-size: $description * $modifier;
    font-weight: $font_weight;
  }

  .weather__location {
    font-size: $location * $modifier;
  }

  .weather__temperature {
    font-size: $temperature * $modifier;
    font-weight: $font_weight;
  }
}
</style>
