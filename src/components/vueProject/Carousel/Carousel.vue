<template lang="pug">
  #carousel(class="tc relative container")
    div(class='loader' ref="loader")
    controller(v-on:loopLeft='loopLeft' v-on:loopRight='loopRight' v-if="visible")
      slide(v-for="(key , index) in visibleImageIndex" :key='index')
        img(class='v-center relative' :src='imgSource[key]')
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
.container {
  height: 550px; 
}

.loader-fade {
  visibility: hidden;
  opacity: 0;
}
</style>
