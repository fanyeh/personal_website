<template>
  <div class="block" :id="id" :class="classObject" @click="setPlayerStep">
  </div>
</template>

<script>

/* If required */
/* import otherComponent from './components/OtherComponent' */
import { eventBus } from '../../../main.js'

export default {
  props: ['position'],
  name: 'color-block',
  data() {
    return {
      id: this.position,
      toggle: {
        'b1': false,
        'b2': false,
        'b3': false,
        'b4': false
      },
      noClick: true
    }
  },
  methods: {
    setPlayerStep() {
      if (!this.noClick) {
        eventBus.$emit('setPlayerStep', this.id)
      }
    }
  },
  created() {
    eventBus.$on('toggleBlock', (e) => {
      this.toggle[e] = !this.toggle[e]
    })

    eventBus.$on('enableBlock', () => {
      this.noClick = false
    })

    eventBus.$on('disableBlock', () => {
      this.noClick = true
    })
  },
  computed: {
    classObject() {
      return [this.toggle[this.id] ? 'on' : 'off', this.noClick ? 'noClick' : '']
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
@import "../../../assets/styles/simmon-setting.scss";

@mixin block() {
  position: absolute;
  width: $blockSize;
  height: $blockSize;
}

div.block {
  @include block();
}

// B1 - Green
div#b1 {
  clip-path: circle(50% at 100% 100%);
}

div#b1,
div#b1.off {
  background-color: #116611;
}

div#b1:active:not(.noClick),
div#b1.on {
  background-color: #55AA55;
}

// B2 - Yellow
div#b2 {
  clip-path: circle(50% at 0 100%);
}

div#b2,
div#b2.off {
  background-color: #c6c00d;
}

div#b2:active:not(.noClick),
div#b2.on {
  background-color: #fdf863;
}

// B3 - Red
div#b3 {
  clip-path: circle(50% at 100% 0);
}

div#b3,
div#b3.off {
  background-color: #b90038;
}

div#b3:active:not(.noClick),
div#b3.on {
  background-color: #f8004b;
}

//B4 - Blue
div#b4 {
  clip-path: circle(50% at 0 0);
}

div#b4,
div#b4.off {
  background-color: #0031A3;
}

div#b4:active:not(.noClick),
div#b4.on {
  background-color: #0c56ff;
}
</style>

