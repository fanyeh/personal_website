<template lang="pug">
  div(class="absolute bottom-1 overflow-hidden dib h-center")
    div(v-bind:class="[isOff ? 'isOn' : 'isOff' , 'label']" class="dib fl f7 pa1 fw7") OFF
    div(v-on:click="switchOn" class="w2 bg-black fl br2 overflow-hidden")
      div(v-bind:class="[isOff ? 'turnOff' : 'turnOn']" class="relative w1 h1 fl bg-silver")
    div(v-bind:class="[isOff ? 'isOff' : 'isOn' , 'label']" class="dib fl f7 pa1 fw7") ON
</template>

<script>
import { eventBus } from '../../../main.js'
export default {
  name: 'switch-control',
  data() {
    return {
      isOff: true
    }
  },
  methods: {
    switchOn() {
      this.isOff = !this.isOff
      eventBus.$emit('toggleCount')
    }
  }
}
</script>

<style scoped lang='scss'>
$color: #282828;
.isOff {
  color: $color;
  transition: .3s
}

.isOn {
  color: red;
  transition: .3s
}

.turnOn {
  transform:translateX(16px);
  transition: .3s ease-in-out;
}

.turnOff {
  transform:translateX(0px);
  transition: .3s ease-in-out;
}
</style>
