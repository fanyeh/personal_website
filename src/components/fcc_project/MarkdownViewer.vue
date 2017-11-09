<template lang="pug">
  #markdownViewer(class="ba overflow-hidden relative b--light-silver v-center")
    //- Header
    div(class="w-50 fl bg-light-silver pa2 br bw1 b--moon-gray mid-gray f4 header") Markdown
    div(class="w-50 fl bg-light-silver pa2 mid-gray f4 header") Preview
    //- Markdown
    div(class="w-50 fl tl vh-75 overflow-y-auto relative")
      div(class="w2 absolute bg-light-gray")
        div(v-for="n in lineNumber" class="pv1 ph2 tr  br b--light-silver light-silver f5 relative" ) {{n}}
      div(class="w-95 ml4 pl2 fr h-100 pl1" )
        textarea(v-model="inputText" v-on:input="resize" ref="markdown" class="w-100 h-100 overflow-hidden bn pa0")
    //- Preview
    div(class="w-50 fl tl")
      div(v-html="parser" class="pl2 overflow-y-auto preview")
</template>

<script>
import marked from 'marked'
export default {
  name: 'markdownViewer',
  data() {
    return {
      inputText: 'Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](https://freecodecamp.com/hermanfassett)*',
      selectPos: 'test',
      lineNumber: 0,
      lineHeight: 26,
      visibleLineNumber: 0
    }
  },
  methods: {
    resize() {
      let textarea = this.$refs.markdown
      textarea.style.height = 'auto'
      this.calcLineNumber(textarea.scrollHeight)
      textarea.style.height = textarea.scrollHeight + 'px'
      textarea.scrollTop = textarea.scrollHeight
      window.scrollTo(window.scrollLeft, (textarea.scrollTop + textarea.scrollHeight))
    },
    calcLineNumber(height) {
      if (this.visibleLineNumber > height / this.lineHeight) {
        this.lineNumber = this.visibleLineNumber
      } else {
        this.lineNumber = height / this.lineHeight
      }
    }
  },
  computed: {
    parser() {
      return marked(this.inputText)
    }
  },
  mounted() {
    this.visibleLineNumber = this.$refs.markdown.scrollHeight / this.lineHeight
    this.calcLineNumber(this.$refs.markdown.scrollHeight)
  }
}
</script>

<style scoped lang='scss'>
#markdownViewer {
  font-family: 'Roboto';
}

.header {
  font-family: 'Exo';
}

.preview {
  overflow-wrap: break-word;
}

textarea {
  resize: none;
  line-height: 26px;
  &:focus {
    outline: 0;
  }
}

.w-95 {
  width:95%;
}
</style>
