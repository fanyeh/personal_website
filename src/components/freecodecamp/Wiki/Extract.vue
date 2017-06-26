<template>
  <div id="article-container">
    <div class="article" v-for="page in pages">
      <h3>{{page.title}}</h3>
      <hr>
      <a :href="'http://en.wikipedia.org/?curid='+page.pageid" target="_blank">
        <page :extract="page.extract"></page>
      </a>
    </div>
  </div>
</template>

<script>

/* If required */
/* import otherComponent from './components/OtherComponent' */
import Page from './Page'

export default {
  name: 'extract',
  components: {
    Page
  },
  props: ['pages']
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
$articleHeight: 1.5em * 12;

#article-container {
  width: 70%;
  margin: 2% auto;
  overflow: hidden;
}

.article {
  height: $articleHeight;
  float: left;
  width: 30%;
  margin: 20px 1.15%;
  border: 3px solid #42b883;
  border-radius: 15px;
  color: #303030;
}

div#article-container {
  div {
    a:link,
    a:visited {
      text-decoration: none;
      color: inherit;
      cursor: pointer;
    }
    h2 {
      margin: 10px;
      overflow: hidden;
      /* Single line continue ...*/
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

hr {
  border-color: #42b883;
  margin: 0 15px;
}
</style>

