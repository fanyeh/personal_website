<template>
  <div>
    <p ref="extract" :class="showContinue ? 'continue' : ''">{{extract}}</p>
  </div>
</template>

<script>

/* If required */
/* import otherComponent from './components/OtherComponent' */

export default {
  name: 'page',
  props: ['extract'],
  data() {
    return {
      showContinue: false
    }
  },
  mounted() {
    const scrollHeight = this.$refs.extract.scrollHeight
    const clientHeight = this.$refs.extract.clientHeight
    this.showContinue = scrollHeight > clientHeight
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
$lineHeight: 1.5em;
$height: 1.5em * 8;
p {
  position: relative;
  margin: 15px 15px;
  text-align: justify;
  font-size: 16px;
  line-height: $lineHeight;
  /* 高度为需要显示的行数*行高，比如这里我们显示两行，则为3 */
  height: $height;
  overflow: hidden;
}

p.continue:after {
  content: "...";
  position: absolute;
  font-weight: bold;
  bottom: 0;
  right: 0;
  padding: 0 9px;
  background-color: white;
}
</style>
