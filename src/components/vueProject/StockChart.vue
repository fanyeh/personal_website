<template lang='pug'>
  div#stockChart
    i#closeButton(class="fa fa-times-circle fa-2x fr mr2 mt2 white" aria-hidden="true" @click="closeChart")
    i#loader(v-if="isLoading" :class="[{'rotate':isLoading},'fa','fa-spinner','fa-3x' ,'white' ]" aria-hidden="true")
    div(v-else id="chart")
</template>

<script>
import Highcharts from 'highcharts/highstock'
import axios from 'axios'
export default {
  props: {
    symbol: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      isLoading: false
    }
  },
  name: 'stockChart',
  methods: {
    showChart() {
      this.isLoading = true
      axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.symbol}&outputsize=full&apikey=UKTITI21V5PTLP17`)
        .then((response) => {
          this.isLoading = false
          this.$nextTick(() => {
            Highcharts.stockChart('chart', {
              rangeSelector: {
                selected: 1
              },
              title: {
                text: `${this.symbol} Stock Price`
              },
              series: [{
                name: this.symbol,
                data: this.preprocessedData(response, 500)
              }]
            })
          })
        })
    },
    preprocessedData(response, numberOfRecord) {
      let stockData = response.data['Time Series (Daily)']
      let stockDate = Object.keys(stockData)
      let closeValue = []
      stockDate.forEach((date) => {
        closeValue.push([new Date(date).getTime(), +stockData[date]['4. close']])
      })
      return closeValue.slice(0, numberOfRecord).reverse()
    },
    lockBackground() {
      document.body.style.overflow = 'hidden'
    },
    unlockBackground() {
      document.body.style.overflow = 'auto'
    },
    closeChart() {
      this.unlockBackground()
      this.$store.commit('toggleStockChart')
    }
  },
  mounted () {
    this.lockBackground()
    this.showChart()
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scope lang='scss'>
@mixin center-block() {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#stockChart {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
}

#chart {
  @include center-block;
  width: 80vw;
  height: 80vh;
  background-color: lightgray;
}

#loader {
  @include center-block;
  /* Animation */
  &.rotate {
    animation: spin 1s infinite linear;
  }
}

@keyframes spin {
  from {transform:rotate(0deg);}
  to {transform:rotate(360deg);}
}
</style>
