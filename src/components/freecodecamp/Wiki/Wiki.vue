<template>
  <div class="wiki">
    <div :class="moveSearchBar ? 'on-search':''">
      <input class="wiki__search-input" type="search" v-on:keyup.enter="getWiki" v-model="searchTxt" placeholder="Enter search text"></input>
      <p class="wiki__random">
        <a href="https://en.wikipedia.org/wiki/Special:Random " target="_blank ">Random</a>
      </p>
    </div>
    <div class="wiki__extract" :class="searched ? 'expand' : ''">
      <extract :pages="searchPages" v-if="searched"></extract>
    </div>
  </div>
</template>

<script>
import Extract from './Extract'
import axios from 'axios'
export default {
  name: 'app',
  components: {
    Extract
  },
  data() {
    return {
      searchTxt: '',
      searchPages: {},
      searched: false,
      moveSearchBar: false
    }
  },
  methods: {
    getWiki() {
      this.moveSearchBar = true
      const api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&origin=*&gsrlimit=20&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='
      axios.get(api + this.searchTxt)
        .then((response) => {
          this.searchPages = response.data.query.pages
          this.searched = true
        })
    }
  }
}
</script>

<style scoped lang='scss'>
div {
  text-align: center;
}

.wiki__search-input {
  width: 85%;
  height: 35px;
  border: none;
  border: 4px solid #42b883;
  border-radius: 30px;
  font-size: 16px;
  padding-left: 15px;
  padding-right: 10px;
  text-align: left;
}

.wiki__search-input:focus {
  outline-width: 0;
}

.wiki__random {
  display: inline-block;
  margin-top: 1%;
  padding: 0 5px;
  border-radius: 20px;
  border: 2px solid #303030;
  a {
    color: #303030;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
  }
}

.wiki__random:hover {
  background-color: #303030;
  a {
    color: white;
  }
}

.wiki__extract {
  margin-top: 3%;
  overflow-y: auto;
}

.expand {
  height: 80vh;
}

::-webkit-scrollbar {
  display: none;
}
</style>
