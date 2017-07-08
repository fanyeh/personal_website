<template>
  <div class="container-fluid">
    <div class="vertical-line"></div>
    <div class="row">
      <div class="col-12 col-md-6 header border--left border--right">
        <div>Markdown</div>
      </div>
      <div class="col-md-6 header border--right hidden-sm-down">
        <div>Preview</div>
      </div>
    </div>
    <div class="row">
      <!-- Markdown -->
      <div class="col-12 col-md-6 content border--left">
        <div class="row content__markdown">
          <div class="col-1">
            <div v-for="n in lineNumber" class="line-number">{{n}}</div>
          </div>
          <div class="col-11">
            <textarea v-model="inputText" v-on:input="resize" v-on:click="select" ref="markdown"></textarea>
          </div>
        </div>
      </div>
      <!-- Preview -->
      <div class="col-md-6 content hidden-sm-down">
        <div class="content__preview" v-html="parser "></div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked'
export default {
  name: 'app',
  data() {
    return {
      inputText: 'Heading\n=======\n\nSub-heading\n-----------\n \n### Another deeper heading\n \nParagraphs are separated\nby a blank line.\n\nLeave 2 spaces at the end of a line to do a  \nline break\n\nText attributes *italic*, **bold**, \n`monospace`, ~~strikethrough~~ .\n\nShopping list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\nThe rain---not the reign---in\nSpain.\n\n *[Herman Fassett](https://freecodecamp.com/hermanfassett)*',
      selectPos: 'test'
    }
  },
  methods: {
    resize() {
      let textarea = this.$refs.markdown
      textarea.style.height = 'auto'
      textarea.style.height = textarea.scrollHeight + 'px'
      textarea.scrollTop = textarea.scrollHeight
      window.scrollTo(window.scrollLeft, (textarea.scrollTop + textarea.scrollHeight))
    },
    select() {
      this.selectPos = this.$refs.markdown.selectionStart
    }
  },
  computed: {
    parser() {
      return marked(this.inputText)
    },
    lineNumber() {
      return this.inputText.split('\n').length
    }
  }
}
</script>

<style scoped lang='scss'>
$line-height:28px;
$editor-height: 85vh;
//Header
.header {
  border-bottom: 1px solid;
  border-top: 1px solid;
  background-color: lightgrey;
}

// Content
.content {
  border-bottom: 1px solid;
  border-right: 1px solid;
  overflow-y: scroll;
  height: $editor-height;
  padding-bottom: 0;
  padding-top: 5px;
  .content__markdown {
    width: 100%;
    height: auto;
    textarea {
      border: none;
      width: 100%;
      height: 100%;
      font-size: 14px;
      line-height: $line-height;
      resize: none;
      padding: 0;
      &:focus {
        outline: 0;
      }
    }
    .line-number {
      height: $line-height;
      color: grey;
      font-size: 12px;
      position: relative;
      top: 5px;
      width: 15px;
    }
  }
  .content__preview {
    height: 100%;
    text-align: left;
    padding-left: 10px;
  }
}

.vertical-line {
  position: absolute;
  width: 0px;
  height: $editor-height;
  top: 26px;
  left: 50px;
  border: 1px inset;
}

.border--right {
  border-right: 1px solid;
}

.border--left {
  border-left: 1px solid;
}

@media (max-width:1200px) {
  .vertical-line {
    left: 35px;
  }
}

.col-1,
.col-11,
.col-12 {
  padding-right: 0;
}
</style>
