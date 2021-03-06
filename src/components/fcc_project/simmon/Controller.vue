<template lang="pug">
  .control
    label(class="f1 fw5 black-60 dib mt4") Simon
    #scoreBoard
      label(class="white f3 lh-title" :class="blinkScore ? 'blink' :''") {{formatScore}}
    #startBtn(@click="startGame")
    #strictBtn(@click="turnStrictMode")
    #count(class="label") Count
    #start(class="label") Start
    #strict(class="label") Strict
    #strictLight
      #light(v-if="strictMode")
    switch-control
    audio(src="https://s3.amazonaws.com/freecodecamp/simonSound1.mp3" ref="b1")
    audio(src="https://s3.amazonaws.com/freecodecamp/simonSound2.mp3" ref="b2")
    audio(src="https://s3.amazonaws.com/freecodecamp/simonSound3.mp3" ref="b3")
    audio(src="https://s3.amazonaws.com/freecodecamp/simonSound4.mp3" ref="b4")
</template>

<script>
import SwitchControl from './SwitchControl'
import { eventBus } from '../../../main.js'
export default {
  name: 'controller',
  data() {
    return {
      score: -1,
      gameStart: false,
      strictMode: false,
      switchOn: false,
      steps: [],
      playerSteps: [],
      blinkScore: false,
      interaction: false
    }
  },
  components: {
    SwitchControl
  },
  methods: {
    startGame() {
      if (this.interaction) {
        if (!this.gameStart) {
          this.gameStart = !this.gameStart
          this.scoreBlink()
        } else {
          this.resetGame(this.scoreBlink)
        }
      }
    },
    resetGame(callback) {
      this.steps = []
      this.playerSteps = []
      this.score = 0
      callback()
    },
    turnStrictMode() {
      if (this.interaction) {
        this.strictMode = !this.strictMode
      }
    },
    enableInteraction() {
      this.interaction = true
      eventBus.$emit('enableBlock')
    },
    disableInteraction() {
      this.interaction = false
      eventBus.$emit('disableBlock')
    },
    scoreBlink() {
      this.blinkScore = true
      setTimeout(() => {
        this.blinkScore = false
        this.setSteps()
      }, 1600)
    },
    setSteps() {
      const randomStep = Math.floor(Math.random() * (4 - 1 + 1)) + 1
      this.steps.push(`b${randomStep}`)
      this.score++
      this.runSteps()
    },
    runSteps() {
      this.disableInteraction()
      let sequence = []
      this.steps.forEach(e => {
        const s = () => new Promise((resolve, reject) => {
          setTimeout(() => {
            eventBus.$emit('toggleBlock', e)
            this.$refs[e].play()
            setTimeout(() => {
              eventBus.$emit('toggleBlock', e)
              resolve(e)
            }, 500)
          }, 500)
        })
        sequence.push(s)
      })
      sequence.reduce((prev, cur) => prev.then(cur), Promise.resolve()).then((e) => {
        this.enableInteraction()
      })
    }
  },
  computed: {
    formatScore() {
      if (this.score === -2) {
        return '!!'
      } else if (this.score === -1) {
        return ''
      } else if (this.score === 0) {
        return '--'
      } else if (this.score < 10) {
        return `0${this.score}`
      }
      return this.score
    }
  },
  created() {
    eventBus.$on('toggleCount', () => {
      this.score = !this.switchOn ? 0 : -1
      if (!this.switchOn) {
        this.disableInteraction()
      }
      this.switchOn = !this.switchOn
      this.interaction = this.switchOn
      this.strictMode = false
    })
    eventBus.$on('setPlayerStep', (block) => {
      this.$refs[block].play()
      this.playerSteps.push(block)
      const matechResult = this.playerSteps.every((e, index) => {
        return e === this.steps[index]
      })
      // Completely mateched
      if (matechResult) {
        if (this.playerSteps.length === this.steps.length) {
          this.playerSteps = []
          setTimeout(() => {
            this.setSteps()
          }, 1000)
        }
      } else {
        eventBus.$emit('disableBlock')
        let currentScore = this.score
        this.score = -2
        this.playerSteps = []
        this.blinkScore = true
        setTimeout(() => {
          this.blinkScore = false
          if (this.strictMode) {
            this.resetGame(this.setSteps)
          } else {
            this.score = currentScore
            this.runSteps()
          }
        }, 1600)
      }
    })
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
@import "../../../assets/styles/simmon-setting.scss";
@mixin btn($color) {
  background-color: $color;
  border-radius: 50%;
  border: 4px solid $borderColor;
  transition: all .1s linear;
}

.control {
  @include componentSize(absolute, $blockSize/2 - $border/3, $blockSize/2 - $border/3);
  @include componentPos($border/3/2, $border/3/2, '');
  background-color: white;
  border-radius: 50%;
  font-family: 'Exo', sans-serif;
}

#switch-control {
  @include componentPos(($blockSize/2 - $border/2 - 35px) + 2, ($blockSize/2 - $border/2 - 120)/2, '');
}

#startBtn {
  @include componentSize(absolute, $blockSize/22, $blockSize/22);
  @include componentPos(($blockSize/2-$border/3 - $blockSize/15)/2+11, ($blockSize/2-$border/3 - $blockSize/15)/2+22, '');
  @include btn(red);
}

#strictBtn {
  @include componentSize(absolute, $blockSize/22, $blockSize/22);
  @include componentPos(($blockSize/2-$border/3 - $blockSize/15)/2+11, ($blockSize/2-$border/3 - $blockSize/15)/2+70, '');
  @include btn(yellow);
}

#scoreBoard {
  @include componentSize(absolute, $blockSize/9.2, $blockSize/14);
  @include componentPos(($blockSize/2-$border/3 - $blockSize/16)/2+5, 30px, '');
  background-color: yellow;
  border-radius: 15%;
  border: 3px solid $borderColor;
  background-color: $borderColor;
  text-align: center;
}

@keyframes fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes blink {
  50% {
    opacity: 0.0;
  }
}

.blink {
  animation: fade 0.1s, blink 0.8s step-start infinite;
}

.label {
  position: absolute;
  font-size: 0.5em;
  font-weight: 900;
  top: 130px;
}

div#count {
  left: 38px;
}

div#start {
  left: 105px;
}

div#strict {
  left: 153px;
}

div#strictLight {
  @include componentSize(absolute, 10px, 10px);
  @include componentPos(($blockSize/2-$border/3 - $blockSize/15)/2-1, ($blockSize/2-$border/3 - $blockSize/15)/2+75, '');
  border-radius: 50%;
  background-color: $borderColor;
}

div#light {
  @include componentSize(absolute, 6px, 6px);
  @include componentPos(2px, 2px, '');
  border-radius: 50%;
  background-color: red;
}

div#startBtn:active {
  transform: scale(0.8, 0.8);
}

div#strictBtn:active {
  transform: scale(0.8, 0.8);
}
</style>
