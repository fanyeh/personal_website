<template lang="pug">
  div
    div(class="container h-center")
      div(v-for="i in 20" class="circle")
    div(class="tc mt5 credit f5-ns f6") Inspired by
      a(href="https://dribbble.com/drewendly" target="_blank" class="ml2") Drew Endly 
      span(class="mr2 silver") 's
      a(href="https://dribbble.com/shots/3156979-Double-Helix-Loader-pure-scss" target="_blank") Double Helix Loader
</template>

<script>
export default {
  name: 'spiralLoader',
  data() {
    return {}
  }
}
</script>


<style scoped lang='scss'>
$size: 20px;
$gap: 40;
$jumpHeight: 100px;
$dotCount: 20;
$duration:3.5;

.title {
  text-align: center;
  font-size: 14px;
}

.container {
  text-align: center;
  position: relative;
  height: 120px;
  width: ($dotCount/2 + 2) * $gap + px;
  background: rgb(250, 250, 250);
}

.circle {
  position: absolute;
  display: block;
  width: $size;
  height: $size;
  border-radius: 50%;
}

@for $i from 1 through $dotCount {
  .circle:nth-of-type(#{$i}) {
    @if $i>$dotCount /2 {
      background-color: hsl(349, 98%, 75%);
      top: $jumpHeight;
      left: (($dotCount + 1 - $i) * $gap)+px;
      animation: rollup $duration+s $duration/9 * ($dotCount + 1 - $i) +s ease-in-out infinite;
    }
    @else {
      background-color: hsl(340, 96%, 67%);
      left: ($gap * $i) + px;
      animation: rolldown $duration+s $duration/9 * $i +s ease-in-out infinite;
    }
  }
}

@keyframes rolldown {
  0% {
    background-color: hsl(340, 86%, 67%);
    transform: scale(1);
    opacity: 1;
    top: 0;
  }
  25% {
    transform: scale(1.2);
  }
  50% {
    top: $jumpHeight;
    transform: scale(1);
  }
  75% {
    transform: scale(0.6);
    opacity: 0.2;
  }
  100% {
    top: 0;
    background-color: hsl(349, 98%, 65%);
    transform: scale(1);
  }
}

@keyframes rollup {
  0% {
    background-color: hsl(349, 98%, 75%);
    transform: scale(1);
    top: $jumpHeight;
    opacity: 1;
  }
  25% {
    transform: scale(0.6);
    opacity: 0.2;
  }
  50% {
    transform: scale(1);
    top: 0;
  }
  75% {
    transform: scale(1.2);
  }
  100% {
    background-color: hsl(340, 96%, 77%);
    transform: scale(1);
    top: $jumpHeight;
  }
}
</style>
