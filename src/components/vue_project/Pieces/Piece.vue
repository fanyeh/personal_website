<template lang="pug">
transition(name="show")
  #piece(class="absolute abs-center")
    canvas(ref="myCanvas")
    div(class="pieces w-100 h-100" ref="pieces" @click="fade")
      img(:id="'img-' + index" class="piece"  v-for="(img,index) in pieces" :src="img")
</template>

<script>
export default {
  name: 'piece',
  props: {
    src: String,
    isVisible: {
      type: Boolean,
      default: false
    },
    index: Number
  },
  data() {
    return {
      pieces: [],
      image: new Image(),
      fadeCount: 40,
      pieceSize: 100,
      pieceCount: {}
    }
  },
  methods: {
    fade() {
      this.$refs.pieces.classList.add('fade')
    },
    fading(e) {
      this.fadeCount--
      if (this.fadeCount === 0) {
        this.$emit('hide', this.index)
      }
    },
    countPieces() {
      this.pieceCount = {
        x: Math.floor(this.image.width / this.pieceSize),
        y: Math.floor(this.image.height / this.pieceSize)
      }
      this.fadeCount = this.pieceCount.x * this.pieceCount.y
    },
    setDimension() {
      let pieces = this.$refs.pieces
      pieces.style.width = `${this.image.width}px`
      pieces.addEventListener('animationend', this.fading)
    },
    setCanvas() {
      let canvas = this.$refs.myCanvas
      let context = canvas.getContext('2d')
      canvas.style.display = 'none'
      canvas.width = this.pieceSize
      canvas.height = this.pieceSize
      for (let i = 0; i < this.pieceCount.y; i++) {
        for (let j = 0; j < this.pieceCount.x; j++) {
          context.drawImage(this.image, j * this.pieceSize, i * this.pieceSize, this.pieceSize, this.pieceSize, 0, 0, this.pieceSize, this.pieceSize)
          let pieceImg = canvas.toDataURL()
          this.pieces.push(pieceImg)
        }
      }
    },
    loadImage() {
      this.image.src = require(`../../../assets/${this.src}`)
      this.image.onload = () => {
        this.countPieces()
        this.setDimension()
        this.setCanvas()
      }
    }
  },
  mounted() {
    this.loadImage()
  }
}
</script>

<style scoped lang="scss">
.pieces {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  margin: auto;
}

.show-enter {
  opacity:0;
}

.show-enter-active {
  transition:all 2s linear;
}

.fade {
   @for $i from 0 through 39 {
    #img-#{$i} {
      animation: splash random(1500) + 500 +ms ease-in-out forwards;
    }
  }
}

@keyframes splash {
  100% {
    transform: translateY(-350px);
    opacity: 0;
  }
}
</style>
