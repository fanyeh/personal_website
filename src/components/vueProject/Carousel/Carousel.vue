<template>
  <div class="container mt4">
    <div class='loader' ref="loader"></div>
    <controller v-on:loopLeft='loopLeft' v-on:loopRight='loopRight' v-if="visible">
      <slide v-for="(key , index) in visibleImageIndex" :key='index'>
        <img class='carousel-img' :src='imgSource[key]'>
      </slide>
    </controller>
  </div>
</template>

<script>
import Controller from 'vueProject/Carousel/Controller'
import Slide from 'vueProject/Carousel/Slide'

export default {
  name: 'carousel',
  data() {
    return {
      sourceLength: 18,
      slideCount: 7,
      imgSource: [],
      visibleImageIndex: [],
      currentLeft: 0,
      currentRight: 6,
      visibleImages: [],
      visible: false,
      loadedImg: 0
    }
  },
  components: {
    Controller,
    Slide
  },
  watch: {
    loadedImg: function(value) {
      if (value === this.slideCount) {
        this.$refs.loader.classList.add('loader-fade')
      }
    }
  },
  methods: {
    loadImageSources() {
      return new Promise((resolve, reject) => {
        this.imgSource = this.loadAssets(this.sourceLength, (index) => {
          let imgID = index + 1
          imgID = imgID < 10 ? `0${imgID}` : imgID
          return require(`images/stocksnap/img${imgID}.jpg`)
        })
        resolve()
      })
    },
    loadvisibleImageIndex() {
      return new Promise((resolve, reject) => {
        this.visibleImageIndex = this.loadAssets(this.slideCount, (index) => {
          return index
        })
        this.visible = true
        resolve()
      })
    },
    loadAssets(length, callback) {
      let asset = []
      for (let i = 0; i < length; i++) {
        asset.push(callback(i))
      }
      return asset
    },
    loopLeft() {
      let callback = (current) => { this.currentRight = current }
      this.currentLeft = this.loop(this.currentLeft, this.slideCount, this.slideCount - 1, callback)
    },
    loopRight() {
      let callback = (current) => { this.currentLeft = current }
      this.currentRight = this.loop(this.currentRight, -this.slideCount, 0, callback)
    },
    loop(boundary, offset, limit, callback) {
      let next = this.nextImageIndex(boundary, offset)
      this.updateBoundaryImage(boundary, next, callback)
      return this.newBoundary(boundary, limit)
    },
    nextImageIndex(current, offset) {
      let next = this.currentImageIndex(current) + offset
      return next < 0 ? this.sourceLength + next : next % this.sourceLength
    },
    currentImageIndex(index) {
      return this.visibleImageIndex[index]
    },
    updateBoundaryImage(current, next, callback) {
      this.visibleImageIndex.splice(current, 1, next)
      callback(current)
    },
    newBoundary(current, limit) {
      let origin = limit === 0 ? this.slideCount - 1 : 0
      let next = limit === 0 ? current - 1 : current + 1
      return current === limit ? origin : next
    },
    imageLoaded() {
      this.visibleImages = this.$el.querySelectorAll('.carousel-img')
      this.visibleImages.forEach((e) => {
        e.onload = () => {
          this.loadedImg += 1
        }
      })
    }
  },
  mounted() {
    this.loadImageSources()
      .then(() => {
        this.loadvisibleImageIndex()
      })
      .then(() => {
        this.imageLoaded()
      })
  }
}
</script>

<style scoped lang='scss'>
// :root {
//   background-color: #222831;
//   text-align: center;
// }
.container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
  color: white; // width: 100%;
  //margin-top: 50px; // height: 100%;
  height: 350px; // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
}

img {
  width: 100%;
  position: absolute;
  margin: auto;
  border: 4px solid white;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backface-visibility: hidden;
}

.loader {
  // position: fixed;
  // width: 100vw;
  // height: 100vh;
  // background-color: #222831;
  // top: 0;
  // left: 0;
  // z-index: 999;
  // transition: all 3s;
}

.loader-fade {
  visibility: hidden;
  opacity: 0;
}
</style>
