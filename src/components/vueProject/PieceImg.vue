<template>
  <div class="container mt3">
    <canvas ref="myCanvas"></canvas>
    <div class="pieces" ref="pieces">
      <img :id="'img-' + index" class="piece" v-for="(img,index) in pieces" :src="img">
    </div>
  </div>
</template>

<script>
export default {
  name: 'pieceImg',
  data() {
    return {
      pieces: []
    }
  },
  mounted() {
    var image = new Image()
    image.src = require('images/stocksnap/img01.jpg')
    image.onload = () => {
      this.$refs.pieces.style.width = `${image.width}px`
      var canvas = this.$refs.myCanvas
      canvas.style.display = 'none'
      var context = canvas.getContext('2d')
      const pieceSize = 100
      canvas.width = pieceSize
      canvas.height = pieceSize
      for (let i = 0; i < Math.floor(image.height / pieceSize); i++) {
        for (let j = 0; j < Math.floor(image.width / pieceSize); j++) {
          context.drawImage(image, j * pieceSize, i * pieceSize, pieceSize, pieceSize, 0, 0, pieceSize, pieceSize)
          let pieceImg = canvas.toDataURL()
          this.pieces.push(pieceImg)
        }
      }
    }
  }
}
</script>

<style lang="scss">
.pieces {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin: auto;
}

.pieces:hover {
  @for $i from 0 through 79 {
    #img-#{$i} {
      animation: splash random(2000)+ms ease-in-out forwards;
    }
  }
}

@keyframes splash {
  100% {
    transform: translateY(-400px);
    opacity: 0;
  }
}
</style>
