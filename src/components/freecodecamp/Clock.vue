<template>
  <div id='clock'>
    <div class="set">
      <div class='setting break'>
        <p>Break Length</p>
        <i class="fa fa-minus" aria-hidden="true" @click="reduceBreakMinute"></i>
        <span class='time'>{{breakTime}}</span>
        <i class="fa fa-plus" aria-hidden="true" @click="increaseBreakMinute"></i>
      </div>
      <div class='setting work'>
        <p>Session Length</p>
        <i class="fa fa-minus" aria-hidden="true" @click="reduceWorkMinute"></i>
        <span class='time'>{{workTime}}</span>
        <i class="fa fa-plus" aria-hidden="true" @click="increaseWorkMinute"></i>
      </div>
    </div>
  
    <div id="time-box" :class="workMode ? '' : 'break'">
      <div id="border">
        <div ref="funnel" id="funnel" :class="funnelAnimation"></div>
      </div>
      <div id="counter" v-on:click="startWorkTimer">{{formatedMinute}}:{{formatedSecond}}</div>
    </div>
    <div id='reset' @click="loadDefault">Reset</div>
  </div>
</template>

<script>

/* If required */
/* import otherComponent from './components/OtherComponent' */

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
      if (this.workTime > 2) {
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
      if (this.breakTime > 2) {
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

div {
  color: $vue-color; // background-color: #303030;
  text-align: center;
}

#clock {
  width: 100%;
  margin: auto;
}

span {
  font-weight: 500;
  font-size: 20px;
}

.button {
  width: 28px;
  height: 28px;
  display: inline-block;
  border-radius: 50%;
  font-weight: 500;
  font-size: 20px;
}

.button:active {
  @include click-animation();
}

.button.work {
  border: 1px solid $vue-color;
  color: $vue-color;
  margin-top: 10px;
}

.button.work:hover {
  background-color: $vue-color;
  color: white;
}

.button.break {
  border: 1px solid $airbnb-color;
  color: $airbnb-color;
  margin-top: 10px;
}

.button.break:hover {
  background-color: $airbnb-color;
  color: white;
}

div.setting {
  display: inline-block;
  padding: 20px;
  p {
    font-size: 20px;
    font-weight: 500;
  }
}

.break {
  color: $airbnb-color;
}

.work {
  color: $vue-color;
}

#reset {
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

#reset:hover {
  background-color: $vue-color;
  color: white;
}

#reset:active {
  @include click-animation();
}

.time {
  padding: 0 10px 0 10px;
}

#time-box {
  width: 200px;
  height: 200px;
  margin: 40px auto;
  position: relative;
  border-radius: 50%;
  border: 4px solid $vue-color;
  overflow: hidden;

  #counter {
    color: #303030; // margin: auto 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
    font-size: 50px;
    font-weight: 900;
  }

  #funnel {
    position: absolute;
    width: 190px;
    height: 190px;
    top: 190px;
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

  #border {
    position: absolute;
    width: 190px;
    height: 190px;
    background-color: transparent;
    top: 5px;
    left: 5px;
    clip-path: circle(50% at 50% 50%);
  }
}

#time-box.break {
  border: 4px solid $airbnb-color;
}

.break {
  .fa-plus {
    border: 2px solid;
    padding: 8px;
    border-radius: 50%;
  }

  .fa-plus:hover {
    background-color: $airbnb-color;
    color: white;
  }

  .fa-minus {
    border: 2px solid;
    padding: 8px;
    border-radius: 50%;
  }

  .fa-minus:hover {
    background-color: $airbnb-color;
    color: white;
  }
}

.work {
  .fa-plus {
    border: 2px solid;
    padding: 8px;
    border-radius: 50%;
  }

  .fa-plus:hover {
    background-color: $vue-color;
    color: white;
  }

  .fa-minus {
    border: 2px solid;
    padding: 8px;
    border-radius: 50%;
  }

  .fa-minus:hover {
    background-color: $vue-color;
    color: white;
  }
}
</style>
