<template lang="pug">
  #pieces(class="relative" ref="pieces")
    div(v-for="(source, index) in sources" :key="index" @click="nextPiece(index)")
      piece(:src="source.src" :isVisible="source.visible" v-if="source.visible" v-on:hide="hidePiece" :index="index")
</template>

<script>
import Piece from 'vueProject/Pieces/Piece'
export default {
  name: 'pieces',
  components: {
    Piece
  },
  data() {
    return {
      sources: [
        {src: 'images/stocksnap/img06.jpg', visible: true},
        {src: 'images/stocksnap/img05.jpg', visible: false},
        {src: 'images/stocksnap/img04.jpg', visible: false},
        {src: 'images/stocksnap/img03.jpg', visible: false},
        {src: 'images/stocksnap/img02.jpg', visible: false},
        {src: 'images/stocksnap/img01.jpg', visible: false}
      ],
      width: 500
    }
  },
  methods: {
    nextPiece(index) {
      if (index === this.sources.length - 1) {
        index = -1
      }
      this.sources[index + 1].visible = true
    },
    hidePiece(index) {
      this.sources[index].visible = false
    }
  },
  mounted () {
    this.$refs.pieces.style.height = `${this.width}px`
  }
}
</script>

