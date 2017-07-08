<template>
  <div class="simmon">
    <div class='game'>
      <color-block v-for="block in blocks" :position="block" :key="block"></color-block>
      <div class="v-line"></div>
      <div class="h-line"></div>
      <div class="control-block">
        <controller></controller>
      </div>
    </div>
  </div>
</template>

<script>
import Controller from './Controller'
import ColorBlock from './ColorBlock'

export default {
  name: 'app',
  data() {
    return {
      blocks: ['b1', 'b2', 'b3', 'b4']
    }
  },
  components: {
    ColorBlock,
    Controller
  }
}
</script>

<style scoped lang="scss">
@import "../../../assets/styles/simmon-setting.scss";

@media (min-width: 767px) {
  $gamePad: 410px;
  $blockSize: 350px;
}

.simmon {
  height: 100%;
}

.game {
  @include componentSize(relative, $gamePad, $gamePad); // margin: auto;
  border-radius: 50%;
  background-color: $borderColor;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.v-line {
  @include componentSize(absolute, $border/2, $gamePad - $border/2);
  @include componentPos( 5, ($gamePad - $border/2)/2, '');
  background-color: $borderColor;
}

.h-line {
  @include componentSize(absolute, $gamePad - $border/2, $border/2);
  @include componentPos( ($gamePad - $border/2)/2, 5, '');
  background-color: $borderColor;
}

#b1 {
  @include componentPos($blockOffSetTop, $blockOffSetTop, '');
}

#b2 {
  @include componentPos($blockOffSetTop, '', $blockOffSetTop);
}

#b3 {
  @include componentPos($blockOffSetBot, $blockOffSetTop, '');
}

#b4 {
  @include componentPos($blockOffSetBot, '', $blockOffSetTop);
}

.control-block {
  @include componentSize(absolute, $blockSize/2, $blockSize/2);
  @include componentPos(($gamePad - ($blockSize/2))/2, ($gamePad - ($blockSize/2))/2, '');
  background-color: $borderColor;
  border-radius: 50%;
}

@media (max-width:767px) {
  .game-board {
    transform: scale(0.7);
  }
}

@media (max-width:361px) {
  .game-board {
    transform: scale(0.6)
  }
}
</style>
