<template>
  <div class="calculatorButton" :id="calcId" v-on:click="showId">
    {{calcId}}
  </div>
</template>

<script>

export default {
  name: 'calculatorButton',
  props: ['calcId'],
  data() {
    return {}
  },
  methods: {
    showId() {
      this.$emit('calcAction', this.calcId)
    }
  }
}
</script>

<style scoped>
.calculatorButton {
  text-align: center;
  width: 70px;
  height: 30px;
  border-radius: 10px;
  border: 2px solid #42b883;
  font-size: 20px;
}

div:hover {
  background-color: #42b883;
}



















/*div {
  width: 70px;
  height: 35px;
  border-radius: 10px;
  border: 2px solid #42b883;
  font-size: 25px;
}*/
</style>

