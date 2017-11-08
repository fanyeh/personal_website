<template lang="pug">
  #controller(class='' ref='container')
    i(class="fa fa-3x fa-angle-left v-center" aria-hidden="true" @click='slideLeft')
    i(class="fa fa-3x fa-angle-right v-center" aria-hidden="true" @click='slideRight')
    slot
</template>

<script>

export default {
  name: 'controller',
  props: {
    preload: {
      type: Boolean,
      default: true
    },
    slideSize: {
      type: [Number, String],
      default: 550
    },
    rotateAngle: {
      type: Number,
      default: 30
    },
    zOffset: {
      type: Number,
      default: -100
    },
    slideGap: {
      type: Number,
      default: 250
    },
    slideGapOffset: {
      type: Number,
      default: 40
    },
    timingFunction: {
      type: String,
      default: 'ease-out'
    },
    transitionDuration: {
      type: Number,
      default: 0.6
    }
  },
  data() {
    return {
      styles: [],
      slides: [],
      slideCount: 0,
      xOffset: 0,
      midIndex: 0,
      multipliers: [],
      transitionCount: 0,
      slideQueue: []
    }
  },
  watch: {
    transitionCount: function(count) {
      if (count === this.slideCount) {
        this.transitionCount = 0
        if (this.slideQueue.length > 0) {
          this.slideQueue.shift()()
        }
      }
    }
  },
  methods: {
    init() {
      this.loadSlides()
      this.createMultipliers()
      this.createOffset()
      this.applyStyle(this.createStyle)
    },
    transitionEnd() {
      this.transitionCount += 1
    },
    loadSlides() {
      this.slides = [].slice.call(this.$el.querySelectorAll('.slide'))
      this.slideCount = this.slides.length
      this.slides.forEach((e) => {
        e.addEventListener('click', this.slideBySelect)
        e.addEventListener('transitionend', this.transitionEnd)
      })
      this.midIndex = Math.floor(this.slideCount / 2)
      this.transitionCount = 0
    },
    createOffset() {
      // this.$refs.container.style.height = `${this.slideSize}px`
      this.xOffset = (this.$refs.container.clientWidth - (this.slideCount * this.slideSize)) / 2
    },
    createMultipliers() {
      let multiplier = []
      let offset = 0
      let middleMultiplier = { ratio: 0, offset: 0, dir: 0 }
      for (let i = this.midIndex + 1; i > 1; i--) {
        multiplier.push({
          ratio: i, offset: offset, dir: 1
        })
        offset += 1
      }
      this.multipliers = [...multiplier, middleMultiplier, ...multiplier.slice().reverse().map((e) => {
        let o = Object.assign({}, e)
        o.ratio *= -1
        o.offset *= -1
        o.dir *= -1
        return o
      })]
    },
    createStyle(index) {
      let style = {
        transform: {
          z: Math.abs(this.multipliers[index].ratio) * this.zOffset,
          x: index * this.slideSize + this.xOffset + this.multipliers[index].ratio * this.slideGap - this.multipliers[index].offset * this.slideGapOffset,
          rotateY: this.multipliers[index].dir * this.rotateAngle
        },
        zIndex: -Math.abs(this.multipliers[index].ratio),
        opacity: 1,
        visibility: 'visible'
      }
      if (this.preload && index % (this.slideCount - 1) === 0) {
        style.opacity = 0
        style.visibility = 'hidden'
      }

      this.styles.push(style)
      return style
    },
    applyStyle(callback) {
      this.slides.forEach((e, index) => {
        this.animate(e, callback(index))
      })
    },
    animate(e, s) {
      e.style.transition = `all ${this.timingFunction} ${this.transitionDuration}s`
      e.style.opacity = s.opacity
      e.style.zIndex = s.zIndex
      e.style.visibility = s.visibility
      e.style.transform = `rotateY(${s.transform.rotateY}deg) translate3d(0px,0px,${s.transform.z}px)`
      e.style.left = `${s.transform.x}px`
      e.style.width = `${this.slideSize}px`
      e.style.height = `${this.slideSize}px`
    },
    slideLeft() {
      this.$emit('loopLeft')
      this.styles.unshift(this.styles.pop())
      this.applyStyle((index) => {
        return this.styles[index]
      })
    },
    slideRight() {
      this.$emit('loopRight')
      this.styles.push(this.styles.shift())
      this.applyStyle((index) => {
        return this.styles[index]
      })
    },
    reset() {
      this.styles = []
      this.createOffset()
      this.applyStyle(this.createStyle)
    },
    slideBySelect(e) {
      let index = this.slides.indexOf(e.currentTarget)
      let rotateAngle = this.styles[index].transform.rotateY
      let offset = this.styles[index].transform.z / this.zOffset - 1
      for (let i = 0; i < offset; i++) {
        let next = rotateAngle > 0 ? this.slideRight : this.slideLeft
        this.slideQueue.push(next)
      }
      this.slideQueue.shift()()
    }
  },
  mounted() {
    this.init()
    window.addEventListener('resize', this.reset)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.reset)
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
$perspective:800px;
#controller {
  transform-style: preserve-3d;
  perspective: $perspective;
  position: absolute;
  width: 100%;
  height:100%;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.fa {
  background-color: white;
  color: #222831;
  position: absolute;
  width: 48px;
  border-radius: 50%;
  opacity: 0.7;
  z-index: 999;
}

.fa-angle-left {
  left: 4em;
}

.fa-angle-right {
  right: 4em;
}
</style>
