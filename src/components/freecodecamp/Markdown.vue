<template>
  <div id="app">
    <div class="container">
      <div class="colum">
        <textarea v-model="inputText"></textarea>
      </div>
      <div class="colum marked" v-html="parser"></div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
export default {
  name: 'app',
  data() {
    return {
      inputText: 'Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](https://freecodecamp.com/hermanfassett)*'
    }
  },
  computed: {
    parser() {
      return marked(this.inputText)
    }
  }
}
</script>

<style scoped lang='scss'>
#app {
  text-align: center;
}

.container {
  display: inline-block;
  overflow: hidden;
  width: 80%;
}

.colum {
  display: inline-block;
  border: 2px solid black;
  width: 46%;
  height: 80vh;
  margin: 1%;
  border-radius: 20px;
  overflow: hidden;
  text-align: left;
}

.marked {
  padding-left: 25px;
}

textarea {
  display: inline-block;
  border: none;
  width: 100%;
  height: 100%;
  resize: none;
  padding-left: 25px;
  padding-top: 10px;

  font-size: 16px;
}
</style>
