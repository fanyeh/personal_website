<template lang="pug">
  div
    div(class="container h-center")
      div(v-for="i in 4" class="bar")
    div(class="tc mt5 credit f5-ns f6") Inspired by
      a(href="https://dribbble.com/colder" target="_blank" class="ml2") Vitaly Silkin 
      span(class="mr2 silver") 's
      a(href="https://dribbble.com/shots/3678774-Dash-loader" target="_blank") Dash Loader 
</template>

<script>

export default {
  name: 'dashLoader',
  data() {
    return {}
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
$delay:3.5s;
$width:50px;
$height:15px;
$gap:25px;

.title {
  text-align: center;
  margin-top: -25px;
  margin-bottom: 30px;
  font-size: 14px;
}

.container {
  position: relative;
  width: 400px;
  height: 140px;
  background: rgb(250, 250, 250);
}

.bar {
  position: absolute;
  width: $width;
  height: $height;
  background: #49a09d;
  border-radius: $height/2;
  top: 50%;
}

@for $i from 1 through 4 {
  .bar:nth-child(#{$i}) {
    @if $i==1 {
      left: $width * 2 - $height;
      transform-origin: $height / 2 center;
    }
    @else {
      left: $width * $i + (($i - 1) * $gap);
      transform-origin: $width - $height/2 center;
    }
    animation: rotate-#{$i} $delay linear forwards infinite;
  }
}

@keyframes rotate-1 {
  0% {
    transform: rotate(0deg);
  }
  15% {
    transform: rotate(270deg);
  }
  25% {
    transform: rotate(360deg);
  }
  29% {
    transform: rotate(380deg);
  }
  37% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotate-2 {
  0% {
    transform: rotate(0deg);
  }
  4% {
    transform: rotate(-20deg);
  }
  12% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(0deg);
  }
  37.5% {
    transform: rotate(-180deg);
  }
  41.5% {
    transform: rotate(-200deg);
  }
  49.5% {
    transform: rotate(-180deg);
  }
  87.5% {
    transform: rotate(-180deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

@keyframes rotate-3 {
  0% {
    transform: rotate(0deg);
  }
  37.5% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  54% {
    transform: rotate(200deg);
  }
  62% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(180deg);
  }
  87.5% {
    transform: rotate(360deg);
  }
  91.5% {
    transform: rotate(380deg);
  }
  99% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotate-4 {
  0%,
  50% {
    transform: rotate(0deg);
  }
  65% {
    transform: rotate(-270deg);
  }
  75%,
  100% {
    transform: rotate(-360deg);
  }
  79% {
    transform: rotate(-380deg);
  }
  87% {
    transform: rotate(-360deg);
  }
}
</style>
