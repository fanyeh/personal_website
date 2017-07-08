<template>
  <div>
    <div class="article" v-for="page in pages">
      <h3 class="article__title">{{page.title}}</h3>
      <hr class="article__separator">
      <a class="article__link" :href="'http://en.wikipedia.org/?curid='+page.pageid" target="_blank">
        <page :extract="page.extract"></page>
      </a>
    </div>
  </div>
</template>

<script>
import Page from './Page'

export default {
  name: 'extract',
  components: {
    Page
  },
  props: ['pages']
}
</script>

<style scoped lang='scss'>
$articleHeight: 1.5em * 12;

.article {
  height: $articleHeight;
  float: left;
  width: 98%;
  margin: 20px 1%;
  border: 3px solid #42b883;
  border-radius: 15px;
  color: #303030;
}

.article__title {
  margin: 10px;
  overflow: hidden;
  /* Single line continue ...*/
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 1em;
}

.article__link:link,
.article__link:visited {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.article__separator {
  border-color: #42b883;
  margin: 0 15px;
}

@media only screen and (min-width: 768px) {
  .article {
    // Two columns
    width: 48%;
    margin: 20px 1%;
  }
}

@media only screen and (min-width: 992px) {
  .article {
    //Three columns
    width: 31%;
    margin: 20px 1.15%;
  }
}

@media only screen and (min-width: 1200px) {
  .article {
    //Four columns
    width: 23%;
    margin: 20px 1%;
  }
}
</style>

