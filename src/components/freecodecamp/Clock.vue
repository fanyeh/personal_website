<template>
  <div class="clock">
    <!-- Setting -->
    <div class="row">
      <div class="col-sm-6 clock__setting clock__setting--break">
        <p class="clock__setting-type">Break Length</p>
        <i class="fa fa-minus" aria-hidden="true" @click="reduceBreakMinute"></i>
        <span class='clock__setting-time'>{{breakTime}}</span>
        <i class="fa fa-plus" aria-hidden="true" @click="increaseBreakMinute"></i>
      </div>
      <div class="col-sm-6 clock__setting clock__setting--work">
        <p class="clock__setting-type">Session Length</p>
        <i class="fa fa-minus" aria-hidden="true" @click="reduceWorkMinute"></i>
        <span class='clock__setting-time'>{{workTime}}</span>
        <i class="fa fa-plus" aria-hidden="true" @click="increaseWorkMinute"></i>
      </div>
    </div>
    <!--Counter -->
    <div class="clock__counter" :class="workMode ? '' : 'break'">
      <div class="clock__counter--border">
        <div ref="funnel" class="clock__counter--funnel" :class="funnelAnimation"></div>
      </div>
      <div class="clock__counter--count" v-on:click="startWorkTimer">{{formatedMinute}}:{{formatedSecond}}</div>
    </div>
  
    <div class='clock__reset-btn' @click="loadDefault">Reset</div>
  
  </div>
</template>

<script>

/* If required */
export default {
  name: 'clock',
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
$vue-color: #42b883;
$airbnb-color: #fd5c63;

@mixin click-animation() {
  transition: all .09s linear;
  transform: scale(0.85);
}

.clock {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  width: 70%;
}

// Setting
.clock__setting {
  padding: 20px;
  .clock__setting-type {
    font-size: 20px;
    font-weight: 500;
  }
  .clock__setting-time {
    font-weight: 500;
    font-size: 20px;
    padding: 0 10px;
  }
  .fa-plus,
  .fa-minus {
    border: 2px solid;
    padding: 8px;
    border-radius: 50%;
  }
  .fa-plus:hover,
  .fa-minus:hover {
    color: white;
  }

  .fa-plus:active,
  .fa-minus:active {
    @include click-animation();
  }
}

.clock__setting--break {
  color: $airbnb-color;
  .fa-plus:hover,
  .fa-minus:hover {
    background-color: $airbnb-color;
  }
}

.clock__setting--work {
  color: $vue-color;
  .fa-plus:hover,
  .fa-minus:hover {
    background-color: $vue-color;
  }
}

// IPhone 5
@media (max-width: 320px) {
  .clock__setting {
    .clock__setting-type,
    .clock__setting-time {
      font-size: 0.9em;
      font-weight: 300;
    }
  }
}

// Counter
.clock__counter {
  width: 200px;
  height: 200px;
  margin: 40px auto;
  position: relative;
  border-radius: 50%;
  border: 4px solid $vue-color;
  background-color: $vue-color;
  overflow: hidden;
  .clock__counter--border {
    position: absolute;
    width: 192px;
    height: 192px;
    background-color: #303030;
    clip-path: circle(50% at 50% 50%);
  }

  .clock__counter--funnel {
    position: absolute;
    width: 192px;
    height: 192px;
    top: 192px;
  }

  .clock__counter--count {
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
    font-size: 50px;
    font-weight: 600;
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
    @include funnel-animation(work-animation, $vue-color);
  }

  .break-funnel-animation {
    @include funnel-animation(break-animation, $airbnb-color);
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

// Reset
.clock__reset-btn {
  margin: 20px auto;
  border: 2px solid;
  width: 60px;
  clear: both;
  border-radius: 10px;
  font-weight: 500;
  border-color: $vue-color;
  color: $vue-color;
  text-align: center;
}

.clock__reset-btn:hover {
  background-color: $vue-color;
  color: white;
}

.clock__reset-btn:active {
  @include click-animation();
}
</style>
