<template>
  <header>
    <nav>
      <div class="tab-bar">
        <ul>
          <li class="tab" @click="scrollTo('contact')">
            <span>Contact</span>
          </li>
          <li class="tab" @click="scrollTo('freecodecamp')">
            <span>freeCodeCamp</span>
          </li>
          <li class="tab" @click="scrollTo('about')">
            <span>About</span>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>

/* If required */
/* import otherComponent from './components/OtherComponent' */

export default {
  name: 'header-bar',
  data() {
    return {}
  },
  methods: {
    scrollTo(id) {
      let element = document.getElementById(id)
      window.scrollTo(0, element.offsetTop + 20)
    },
    toggle() {
      this.$store.commit('toggle')
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.tab-bar {
  margin: 15px 20px;
  overflow: hidden;
}

.tab {
  margin: 0 10px;
  padding-bottom: 5px;
  float: right;
  height: 25px;
}

span:hover {
  padding-bottom: 2px;
  border-bottom: 1.5px solid #4a4a4a;
}

// .tab:hover {
//   border-bottom: 1.5px solid #4a4a4a; // text-decoration: underline;
// }
ul {
  list-style-type: none;
}
</style>
