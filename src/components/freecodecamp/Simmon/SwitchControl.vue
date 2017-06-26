<template>
  <div id="switch-control">
    <div v-bind:class="[isOff ? 'isOn' : 'isOff' , 'label']">OFF</div>
    <div id="switch-container" v-on:click="switchOn">
      <div v-bind:class="[isOff ? 'turnOff' : 'turnOn']" id="switch-button"></div>
    </div>
    <div v-bind:class="[isOff ? 'isOff' : 'isOn' , 'label']">ON
    </div>
  </div>
</template>
<script>

/* If required */
/* import otherComponent from './components/OtherComponent' */
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

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
$height: 20px;
$color: #282828;

div#switch-control {
  display: table-cell;
  position: absolute;
  width: 130px;
  height: $height; // border: solid 1px black;
}

div#switch-container {
  display: inline-block;
  width: 60px;
  height: $height;
  background-color: $color;
  border-radius: 5px;
}

div#switch-button {
  position: absolute;
  width: 28px;
  height: 14px;
  background-color: #0c56ff;
  border-radius: 4px;
  top: 3px; // left: 37px;
}

div.label {
  font-size: 10px;
  font-weight: 900;
  display: inline-block;
  width: 30px;
  height: $height;
  top: 30%;
  transform: translateY(-30%);
}

.isOff {
  color: $color;
  transition: .3s
}

.isOn {
  color: red;
  transition: .3s
}

.turnOn {
  left: 64px;
  transition: .3s ease-in-out;
}

.turnOff {
  left: 38px;
  transition: .3s ease-in-out;
}
</style>
