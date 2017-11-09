<template lang="pug">
  #pomodoroClock(class="relative v-center")
    //- Setting
    div(class="overflow-hidden center dib f3-ns f5")
      div(class="fl mh4-ns mh2 dark-red")
        p Break Length
        i(class="fa fa-minus f4-ns f5" aria-hidden="true" @click="reduceBreakMinute")
        span(class="mh3") {{breakTime}}
        i(class="fa fa-plus f4-ns f5" aria-hidden="true" @click="increaseBreakMinute")
      div(class="fl mh4-ns mh2 green")
        p Work Length
        i(class="fa fa-minus f4-ns f5 " aria-hidden="true" @click="reduceWorkMinute")
        span(class="mh3") {{workTime}}
        i(class="fa fa-plus f4-ns f5" aria-hidden="true" @click="increaseWorkMinute")
    //- Counter
    div(class="clock__counter relative pointer" :class="workMode ? '' : 'break'")
      div(class="clock__counter--border")
        div(ref="funnel" class="clock__counter--funnel" :class="funnelAnimation")
      div(class="black-50 relative dib center f-subheadline fw7 v-center" v-on:click="startWorkTimer") {{formatedMinute}}:{{formatedSecond}}
    //- Reset
    div(class='f4-ns f5 dib ph3 pv1 br-pill white bg-black-50' @click="loadDefault") Reset
</template>

<script>
export default {
  name: 'pomodoroClock',
  data() {
    return {
      minute: Number(25),
      second: Number(0),
      startCount: true,
      intervalID: null,
      workTime: Number(25),
      breakTime: Number(5),
      defaultWorkTime: Number(25),
      defaultBreakTime: Number(5),
      workMode: true,
      funnelAnimation: ''
    }
  },
  computed: {
    formatedSecond() {
      return this.second < 10 ? `0${this.second}` : this.second
    },
    formatedMinute() {
      return this.minute < 10 ? `0${this.minute}` : this.minute
    }
  },
  methods: {
    startWorkTimer() {
      if (this.startCount) {
        this.startAnimation()
        let self = this
        this.intervalID = setInterval(() => {
          self.second--
          if (self.second === -1) {
            self.minute--
            self.second = Number(59)
          }
          if (self.minute === -1) {
            self.workMode = !self.workMode
            self.minute = self.workMode ? self.workTime : self.breakTime
            self.second = 0
            this.setAnimationDuration(self.minute)
            this.startAnimation()
          }
        }, 1000)
      } else {
        clearInterval(this.intervalID)
        this.pauseAnimation()
      }
      this.startCount = !this.startCount
    },
    reset(mode, time) {
      clearInterval(this.intervalID)
      this.second = Number(0)
      this.workMode = mode
      this.startCount = true
      this.minute = time
      this.removeAnimation()
      this.setAnimationDuration(time)
    },
    loadDefault() {
      this.reset(true, this.defaultWorkTime)
      this.workTime = this.defaultWorkTime
      this.breakTime = this.defaultBreakTime
    },
    increaseWorkMinute() {
      this.workTime += 1
      if (this.workMode) {
        this.reset(true, this.workTime)
      }
    },
    reduceWorkMinute() {
      if (this.workTime > 1) {
        this.workTime -= 1
        if (this.workMode) {
          this.reset(true, this.workTime)
        }
      }
    },
    increaseBreakMinute() {
      this.breakTime += 1
      if (!this.workMode) {
        this.reset(false, this.breakTime)
      }
    },
    reduceBreakMinute() {
      if (this.breakTime > 1) {
        this.breakTime -= 1
        if (!this.workMode) {
          this.reset(false, this.breakTime)
        }
      }
    },
    removeAnimation() {
      this.funnelAnimation = ''
    },
    setAnimationDuration(duration) {
      this.$refs.funnel.style.animationDuration = `${duration * 60}s`
    },
    pauseAnimation() {
      this.$refs.funnel.style.animationPlayState = 'paused'
    },
    startAnimation() {
      this.funnelAnimation = this.workMode ? 'work-funnel-animation' : 'break-funnel-animation'
      this.$refs.funnel.style.animationPlayState = 'running'
    }
  },
  mounted() {
    this.setAnimationDuration(this.workTime)
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang="scss">
$workColor:#19A974;
$breakColor:#E7040F;
$clockSize: 300px;
$borderSize:16px;

.f-subheadline{
  font-size:5.5em;
}

// Counter
.clock__counter {
  font-family: 'Roboto','Exo', sans-serif;
  width: $clockSize;
  height: $clockSize;
  margin: 40px auto;
  position: relative;
  border-radius: 50%;
  border: $borderSize solid $workColor;
  background-color: $workColor;
  overflow: hidden;
  .clock__counter--border {
    position: absolute;
    width: $clockSize - $borderSize * 2;
    height: $clockSize - $borderSize * 2;
    background-color: white;
    clip-path: circle(50% at 50% 50%);
  }

  .clock__counter--funnel {
    position: absolute;
    width: $clockSize - $borderSize * 2;
    height: $clockSize - $borderSize * 2;
    top:$clockSize - $borderSize * 2;
  }

  @mixin funnel-animation($name, $color) {
    background-color: $color;
    animation-name: $name;
    animation-direction: normal;
    animation-timing-function: linear;
    animation-play-state: paused;
    animation-iteration-count: 1;
  }

  .work-funnel-animation {
    @include funnel-animation(work-animation, $workColor);
  }

  .break-funnel-animation {
    @include funnel-animation(break-animation, $breakColor);
  }

  @keyframes work-animation {
    0% {
      transform: translateY(1%);
    }
    100% {
      transform: translateY(-100%);
    }
  }

  @keyframes break-animation {
    0% {
      transform: translateY(1%);
    }
    100% {
      transform: translateY(-100%);
    }
  }
}

.break {
  border-color:$breakColor;
  background-color:$breakColor;
}

@media screen and (min-width: 320px) {
  $clockSize: 240px;
  $borderSize:8px;
  .clock__counter {
    width: $clockSize;
    height: $clockSize;
    font-size:0.8em;
    .clock__counter--border {
      width: $clockSize - $borderSize * 2;
      height: $clockSize - $borderSize * 2;
    }
    .clock__counter--funnel {
      width: $clockSize - $borderSize * 2;
      height: $clockSize - $borderSize * 2;
      top:$clockSize - $borderSize * 2;
    }
  }
}
</style>
