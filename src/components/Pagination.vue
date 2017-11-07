<template lang="pug">
  #pagination(class="overflow-hidden fr mt2")
      transition(name="fade")
        button(v-if="showPreviousPage" @click="changePage(-1)" class="bg-white mh1 ba outline-0")
          i(class="fa fa-chevron-left f6-ns f7 black-30" aria-hidden="true")
      button(
        v-for="page in visiblePages" 
        :key="page" 
        "@click"="fetchPageData(page)" 
        :class="[{'highlight' : hoverPage(page)},{'bn':isSpreader(page)}, 'bg-white', 'mh1' ,'ba','f5-ns','outline-0','f6']" 
        :disabled="isSpreader(page)") {{page}}
      transition(name="fade")
        button(v-if="showNextPage" @click="changePage(1)" class="bg-white mh1 ba outline-0")
          i(class="fa fa-chevron-right f6-ns f7 black-30" aria-hidden="true")
</template>

<script>

export default {
  name: 'pagination',
  props: {
    visibleRows: {
      type: Number,
      default: 15
    },
    dataCount: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      selectedPage: 1,
      showPreviousPage: false,
      showNextPage: true,
      visiblePages: [],
      totalPages: [],
      pageSize: 5
    }
  },
  methods: {
    changePage(offset) {
      this.fetchPageData((this.selectedPage += offset))
    },
    fetchPageData(page) {
      this.selectedPage = page
      this.$emit('fetchPage', page)
      this.calcVisiblePages()
      this.showPreviousPage = page !== 1
      this.showNextPage = page !== this.totalPages.length
    },
    isSpreader(page) {
      return page === '...'
    },
    hoverPage(page) {
      return page === this.selectedPage
    },
    calcVisiblePages() {
      if (this.selectedPage < this.pageSize) {
        if (this.totalPages.length > (this.pageSize + 2)) {
          this.visiblePages = [].concat(
            this.totalPages.slice(0, this.pageSize),
            ['...'],
            this.totalPages.slice(-2)
          )
        } else {
          this.visiblePages = [].concat(this.totalPages.slice(0, this.pageSize + 2))
        }
      } else if (this.selectedPage >= this.totalPages.length - (this.pageSize - 1)) {
        this.visiblePages = [].concat(
          this.totalPages.slice(0, 2),
          ['...'],
          this.totalPages.slice(-this.pageSize)
        )
      } else {
        this.visiblePages = [].concat(
          this.totalPages.slice(0, 2),
          ['...'],
          this.totalPages.slice(this.selectedPage - (Math.floor(this.pageSize / 2) + 1), this.selectedPage + Math.floor(this.pageSize / 2)),
          ['...'],
          this.totalPages.slice(-2)
        )
      }
    },
    calcTotalPages() {
      this.totalPages = []
      for (let i = 1; i <= Math.ceil(this.dataCount / this.visibleRows); i++) {
        this.totalPages.push(i)
      }
    }
  },
  mounted () {
    this.calcTotalPages()
    this.calcVisiblePages()
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
/* Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.highlight {
  background-color: green;
  color: white;
  border-color: green;
}
</style>
