<template>
  <div class="mt4">
    <div class='container'>
      <div class='loader tongue'></div>
      <div class='loader hair'></div>
      <div class='loader head'></div>
      <div class='loader chin'></div>
      <div class='loader eye'></div>
      <div class='loader mouth'></div>
    </div>
    <h6 class="credit">Inspired from
      <a href="https://dribbble.com/royveldkamp" target="_blank">Roy Veldkamp</a>'s
      <a href="https://dribbble.com/shots/2030551-Bird-Loader" target="_blank"> Bird Loader</a>
    </h6>
  </div>
</template>

<script>

/* If required */
/* import otherComponent from './components/OtherComponent' */

export default {
  name: 'birdLoader',
  data() {
    return {}
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
@mixin bgColorAndSize($color, $width, $height) {
  background-color: $color;
  width: $width;
  height: $height;
}

@mixin pos($top, $left) {
  top: $top;
  left: $left;
}

$duration: 3s;

.credit {
  text-align: center;
  margin-top: 50px;
  font-size: 14px;
}

.container {
  position: relative;
  width: 200px;
  height: 200px;
  background-color: rgb(250, 250, 250);
}

.loader {
  position: absolute;
}

.hair {
  @include bgColorAndSize(rgb(130, 43, 21), 90px, 180px);
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
  @include pos(10px, 10px);
  transform-origin: center right;
  animation: hair $duration ease-out forwards infinite;
}

.head {
  @include bgColorAndSize(white, 60px, 60px);
  @include pos(40px, 40px);
  transform-origin: bottom right;
  border-top-left-radius: 100%;
  animation: head $duration ease-out infinite;
}

.chin {
  @include bgColorAndSize(rgb(231, 231, 231), 60px, 60px);
  @include pos(100px, 40px);
  border-bottom-left-radius: 100%;
  transform-origin: top right;
  animation: chin $duration ease-out infinite;
}

.mouth {
  @include bgColorAndSize(rgb(247, 206, 66), 60px, 60px);
  @include pos(40px, 100px);
  border-top-right-radius: 100%;
  transform-origin: bottom left;
  animation: mouth $duration ease-out infinite;
}

.eye {
  @include bgColorAndSize(black, 30px, 30px);
  @include pos(70px, 70px);
  border-radius: 50%;
  animation: eye $duration ease-out infinite;
}

.tongue {
  @include bgColorAndSize(rgb(247, 165, 0), 30px, 30px);
  @include pos(100px, 100px);
  border-bottom-right-radius: 100%;
  transform-origin: top left;
  animation: tongue $duration ease-out infinite;
}

@keyframes hair {
  25%,
  50% {
    transform: rotate(180deg)
  }
  75%,
  100% {
    transform: rotate(360deg)
  }
}

@keyframes mouth {
  25%,
  50% {
    transform: rotate(-90deg)
  }
  75%,
  100% {
    transform: rotate(0deg)
  }
}

@keyframes tongue {
  25%,
  50% {
    transform: rotate(90deg)
  }
  75%,
  100% {
    transform: rotate(0deg)
  }
}

@keyframes eye {
  25%,
  50% {
    transform: translateX(30px)
  }
  75%,
  100% {
    transform: translateX(0px)
  }
}

@keyframes head {
  25%,
  50% {
    transform: rotate(-270deg)
  }
  75%,
  100% {
    transform: rotate(-360deg)
  }
}

@keyframes chin {
  25%,
  50% {
    transform: rotate(-90deg)
  }
  75%,
  100% {
    transform: rotate(-360deg)
  }
}
</style>
