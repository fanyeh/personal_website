<template>
  <section>
    <div id="about" class="about-me">
      <div class="row">
        <!-- Left animation -->
        <div class="col-sm-2 col-md-2 col-lg-3 col-xl-4 hidden-sm-down">
          <div class="about-me__animation about-me__animation--left">
            <div class="about-me__animation--runner"></div>
            <label class="about-me__caption about-me__caption--xs about-me__caption--runner">somtimes I run</label>
          </div>
        </div>
        <div class="col-sm-2 col-md-2 col-lg-1 col-xl-1 hidden-sm-down">
          <img class="img-fluid about-me__left" src="~images/about/about-me-left.svg"></img>
        </div>
        <!-- Center image and console -->
        <div class="col-sm-4 col-md-4 col-lg-4 col-xl-2">
          <p class="about-me__caption ">I'm Jack</p>
          <img class="img-fluid about-me__img" src="~images/about/about-me-img.svg"></img>
          <p class="about-me__caption about-me__caption--sm ">sometimes I write codes</p>
          <div class=" about-me__console ">
            <!--<audio ref="audioElm " src="../../static/type.mp3 "></audio>-->
            <p class="about-me__console--msg ">{{typeConsoleString}}
              <span v-if="!showError " class="about-me__console--msg about-me__console--msg--blink ">|</span>
            </p>
            <transition name="fade ">
              <p class="about-me__console--msg about-me__console--msg--error " v-if="showError ">{{errorMsg}}</p>
            </transition>
            <p class="about-me__console--msg " v-if="showError ">{{typeOopsString}}</p>
          </div>
        </div>
        <!-- Right animation -->
        <div class="col-sm-2 col-md-2 col-lg-1 col-xl-1 hidden-sm-down">
          <img class="img-fluid about-me__right" src="~images/about/about-me-right.svg"></img>
        </div>
        <div class="col-sm-2 col-md-2 col-lg-3 col-xl-4 hidden-sm-down">
          <div class="about-me__animation about-me__animation--right">
            <div class="about-me__animation--cycling"></div>
            <label class="about-me__caption about-me__caption--xs about-me__caption--cycling">somtimes I ride</label>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>

/* If required */
export default {
  name: 'about',
  props: ['id'],
  data() {
    return {
      consoleString: ['> '],
      defaultMsg: 'hello()',
      errorString: ['> '],
      errorMsg: 'ReferenceError: hello is not defined !',
      oopsString: ['> '],
      oopsMsg: 'oooops !',
      showError: false
    }
  },
  methods: {
    animateText(text, target) {
      let timer = 0
      const interval = 200
      text.split('').forEach((e) => {
        setTimeout(() => {
          target.push(e)
          // this.$refs.audioElm.play()
        }, timer)
        timer += interval
      })
    }
  },
  computed: {
    typeConsoleString() {
      return this.consoleString.join('')
    },
    typeOopsString() {
      return this.oopsString.join('')
    }
  },
  mounted() {
    setTimeout(() => {
      this.animateText(this.defaultMsg, this.consoleString)
      const errorTimeout = 300 * this.defaultMsg.length + 1000
      setTimeout(() => {
        this.showError = true
        setTimeout(() => {
          this.animateText(this.oopsMsg, this.oopsString)
        }, 1000)
      }, errorTimeout)
    }, 1000)
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.about-me {
  text-align: center;
  margin-top: 5%;
  margin-bottom: 5%;
}

.about-me__img {
  margin-top: 3%;
  margin-bottom: 5%;
}

.about-me__left {
  position: absolute;
  right: 0;
  top: 55%;
}

.about-me__right {
  position: absolute;
  left: 0;
  top: 30%;
}

.about-me__caption--xs {
  color: grey;
}

.about-me__animation {
  display: inline-block;
  position: absolute;
}

.about-me__animation--left {
  right: 10px;
  top: 42%;
}

.about-me__animation--right {
  left: 10px;
  top: 28%;
}

.about-me__animation--runner {
  margin: 0 auto;
  width: 82.25px;
  height: 89px;
  background: url('~images/about/run.svg');
}

.about-me__caption--runner {
  text-align: left;
  margin-top: 5px;
}

.about-me__animation--runner:hover {
  animation: run 1.2s steps(16) infinite;
}

@keyframes run {
  100% {
    background-position: -1316px;
  }
}

.about-me__animation--cycling {
  margin: 0 auto;
  width: 100.8px;
  height: 91px;
  background: url('~images/about/cycling.svg');
}

.about-me__caption--cycling {
  text-align: left;
  margin-top: 5px;
}

.about-me__animation--cycling:hover {
  animation: cycling .5s steps(5) infinite;
}

@keyframes cycling {
  100% {
    background-position: -504px;
  }
}

.about-me__console {
  margin-top: 10px auto;
  position: relative;
  display: inline-block;
  height: 80px;
  width: 100%;
  text-align: left;
}

p.about-me__console--msg {
  font-weight: 400;
  color: grey;
  margin: 3px;
}

.about-me__console-msg--blink {
  animation: blink 1s infinite;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade {
  animation: fade 1s;
}

p.about-me__console--msg--error {
  color: #dd0000;
  padding-left: 12px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0
}

// IPad or below 
@media (max-width: 768px) {
  .about-me__caption {
    font-size: 1.8em;
  }

  .about-me__caption--sm {
    font-size: 1em;
  }

  .about-me__caption--xs {
    font-size: 0.8em;
  }

  .about-me__console--msg {
    font-size: 0.6em;
  }
}

// IPad pro
@media (min-width: 992px) {

  .about-me__caption {
    font-size: 2.2em;
  }

  .about-me__caption--sm {
    font-size: 1.5em;
  }
  .about-me__caption--xs {
    font-size: 1.2em;
  }
  .about-me__console {
    p {
      font-size: .9em;
    }
  }
}

// Desktop 
@media (min-width: 1200px) {
  .about-me__caption {
    font-size: 3.3em;
  }

  .about-me__caption--sm {
    font-size: 1.6em;
  }
  .about-me__caption--xs {
    font-size: 1em;
  }

  .about-me__console {
    p {
      font-size: 0.8em;
    }
  }
}
</style>
