<template lang='pug'>
  div(ref="datatable" class="overflow-hidden mt3")
    .scrollbar-measure("ref"="scrollBar")
    div(class="mb4")
      //- Search field
      div(class="ph1 pv1 fr ba bw1 br2 dib bdc")
        i(class="fa fa-search fdc" aria-hidden="true")
        input.search-field(v-model="filter.text" type="text" "@keyup"="findMatches" placeholder="Search")
        
      //- Column selector
      div(class="relative")
        span("@click.stop"="toggleColumns" :class="{'column__toggle': showColumns}" class="column ph2 pv1") Columns
          i(v-if="showColumns" class="fa fa-caret-up ml2 f4" aria-hidden="true")
          i(v-else class="fa fa-caret-down ml2" aria-hidden="true")
        div.column-items(:class="{'column-items__show': showColumns}" "@click.stop"="" class="pa2")
          div(v-for="(header , index) in rawHeader" class="pv2")
            input.column-checkbox(type="checkbox" v-model="visibleCols[header]" :id="'c_' + index" )
            label(:for="'c_' + index",class="white f6") {{header}}

    //- Table
    .datatable(":style"="style.container" class="w-100 relative top-1 overflow-x-auto ")
      table(class="collapse f5 w-100")
        thead
          tr
            th(v-for="(header, headerIndex) in tableHeader" :key="headerIndex" "@click.stop"="sortTable(header)" class="tl pl3 pr2 bc pointer lh-copy f5 near-black") {{header}} &nbsp
              i(class="fa fa-sort fr lh-copy" aria-hidden="true" )
        tbody
          tr.stripe(v-for="(data,index) in tableData" :key="index" ":id"="index")
            td(v-for="(header, headerIndex) in tableHeader" :key="headerIndex" ":style"="style.cell" class="pl3 pr1 nowrap mid-gray") 
              span.symbol(v-if="header === 'Symbol'" @click="showStockChart(data[header])") {{data[header]}}
              span(v-else) {{data[header]}}
    //- Pagination
    div(class="fr page-btns")
      transition(name="fade")
        button(v-if="showPreviousPage" @click="changePage(-1)" class="bg-white mh1 ba")
          i(class="fa fa-chevron-left f7 black-30" aria-hidden="true")
      button(
        v-for="page in visiblePages" 
        :key="page" 
        "@click"="fetchPageData(page)" 
        :class="[{'highlight' : hoverPage(page)},{'bn':isSpreader(page)}, 'bg-white', 'mh1' ,'ba','f6' ,'black-67']" 
        :disabled="isSpreader(page)") {{page}}
      transition(name="fade")
        button(v-if="showNextPage" @click="changePage(1)" class="bg-white ba mh1")
          i(class="fa fa-chevron-right f7 black-30" aria-hidden="true")

    <stockChart v-if="$store.state.showStockChart" :symbol="symbolForChart"></stockChart>
</template>

<script>

import stockChart from './stockChart'
import json from 'json/nasdaq.json'

export default {
  name: 'datatable',
  components: {
    stockChart
  },
  data() {
    return {
      tableHeader: [],
      tableData: [],
      filteredDataCount: 0,
      indexSort: false,
      rawData: [],
      rawHeader: [],
      rowHeight: 30,
      colWidth: 130,
      visibleRows: 20,
      visibleCols: {},
      scrollbarWidth: 0,
      visiblePages: [],
      totalPages: [],
      selectedPage: 1,
      showColumns: false,
      showPreviousPage: false,
      showNextPage: true,
      showChart: false,
      symbolForChart: null,
      filter: {
        rule: new RegExp('', 'gi'),
        text: ''
      },
      style: {}
    }
  },
  watch: {
    visibleCols: {
      handler: function(newCols) {
        this.tableHeader = this.rawHeader.filter(header => newCols[header])
        this.processData()
      },
      deep: true
    }
  },
  methods: {
    showStockChart(symbol) {
      this.$store.commit('toggleStockChart')
      this.symbolForChart = symbol
    },
    fetchPageData(page) {
      this.selectedPage = page
      this.calcVisiblePages()
      this.processData()
      this.showPreviousPage = page !== 1
      this.showNextPage = page !== this.totalPages.length
    },
    calcTotalPages(count) {
      this.totalPages = []
      for (let i = 1; i <= Math.ceil(count / this.visibleRows); i++) {
        this.totalPages.push(i)
      }
    },
    toggleColumns() {
      this.showColumns = !this.showColumns
    },
    isSpreader(page) {
      return page === '...'
    },
    calcVisiblePages() {
      if (this.selectedPage < 7) {
        if (this.totalPages.length > 9) {
          this.visiblePages = [].concat(
            this.totalPages.slice(0, 7),
            ['...'],
            this.totalPages.slice(-2)
          )
        } else {
          this.visiblePages = [].concat(this.totalPages.slice(0, 7))
        }
      } else if (this.selectedPage > this.totalPages.length - 6) {
        this.visiblePages = [].concat(
          this.totalPages.slice(0, 2),
          ['...'],
          this.totalPages.slice(-7)
        )
      } else {
        this.visiblePages = [].concat(
          this.totalPages.slice(0, 2),
          ['...'],
          this.totalPages.slice(this.selectedPage - 4, this.selectedPage + 3),
          ['...'],
          this.totalPages.slice(-2)
        )
      }
    },
    hoverPage(page) {
      return page === this.selectedPage
    },
    changePage(offset) {
      this.fetchPageData((this.selectedPage += offset))
    },
    findMatches() {
      this.filter.rule = new RegExp(this.filter.text, 'gi')
      this.selectedPage = 1
      this.processData()
    },
    processData() {
      const pageStart = (this.selectedPage - 1) * this.visibleRows
      const pageEnd = this.selectedPage * this.visibleRows

      /* Filter */
      this.tableData = this.rawData.filter(data => !Object.values(data).every(value => !this.filter.rule.test(value)))

      // Update Pages
      this.calcTotalPages(this.tableData.length)
      this.calcVisiblePages()
      this.updateStyle()

      /* Pagination */
      this.tableData = this.tableData.slice(pageStart, pageEnd)
    },
    sortTable(header) {
      this.indexSort = !this.indexSort
      /* Sort number */
      this.rawData.sort((a, b) => {
        return this.indexSort ? predicate(a[header], b[header]) : predicate(b[header], a[header])
      })
      function predicate(_a, _b) {
        if (_a > _b) {
          return 1
        } else if (_b > _a) {
          return -1
        }
        return 0
      }
      this.processData()
    },
    calcScrollbarWidth() {
      this.scrollbarWidth = this.$refs.scrollBar.offsetWidth - this.$refs.scrollBar.clientWidth
      this.$refs.scrollBar.remove()
    },
    calcHeight(offset = 0) {
      return this.rowHeight * this.visibleRows + offset
    },
    updateStyle() {
      this.style = {
        cell: {
          height: `${this.rowHeight}px`,
          minWidth: `${this.colWidth}px`
        },
        container: {
          height: `${this.calcHeight(this.scrollbarWidth + this.rowHeight)}px`
        }
      }
    },
    loadData() {
      this.tableData = this.rawData = json
      this.tableHeader = this.rawHeader = Object.keys(json[0]).filter(header => !(header === 'ADR TSO' || header === '' || header === 'Summary Quote'))
      this.visibleCols = Object.assign(...this.tableHeader.map(h => ({ [h]: true })))
    },
    hideColumnList() {
      this.$refs.datatable.addEventListener('click', (e) => {
        this.showColumns = false
      })
    }
  },
  created() {
    this.loadData()
  },
  mounted() {
    this.calcScrollbarWidth()
    this.updateStyle()
    this.hideColumnList()
  }
}
</script>

<style lang="scss" scoped>
$mainColor: #65b7cf;
$selectedColor: #c8ecf6;

.bc {
  background-color:$mainColor;
}

.bdc {
  border-color:$mainColor;
}
.fdc {
  color:$mainColor;
}

.column,
input,
button {
  &:focus {
    outline: none;
  }
}

.symbol:hover {
  cursor: pointer;
  text-decoration: underline;
}

/* Custom Scrollbar */
.datatable::-webkit-scrollbar {
  width: 1em;
}

.datatable::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
}

.datatable::-webkit-scrollbar-thumb {
  background-color: rgb(200, 200, 200);
  outline: 1px solid slategrey;
}

/* Table Stripes */
.stripe {
  &:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.1);
  }
  &:hover {
    background-color: $selectedColor;
  }
}

.highlight {
  background-color: $mainColor;
  color: white;
  border-color: $mainColor;
}

/* Fake scroll bar for height measurement */
.scrollbar-measure {
  width: 100px;
  height: 100px;
  overflow: scroll;
  position: absolute;
}

/* Pagination Button */
button {
  font-family:"Roboto";
  &:hover:not(.highlight) {
    border-color: $mainColor;
    color: $mainColor;
    .fa {
      color: $mainColor;
    }
  }
}

/* Filter */
.search-field {
  border: none;
  margin-left: 5px;
  width: 200px;

  &::-webkit-input-placeholder {
    font-family: "Exo", sans-serif;
  }
  &::-moz-placeholder {
    font-family: "Exo", sans-serif;
  }
  /* firefox 19+ */
  &:-ms-input-placeholder {
    font-family: "Exo", sans-serif;
  }
  /* ie */
  &:-moz-placeholder {
    font-family: "Exo", sans-serif;
  }
}

/* Column selector */
.column {
  float: left;
  border: 2px solid $mainColor;
  // padding: 0px 5px 0px 5px;
  border-radius: 5px;
  transition: all 0.1s;
  color: grey;
  cursor: pointer;
}

.column__toggle {
  background: $mainColor;
  color: white;
}

.column-items {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  display: inline-block;
  background: $mainColor;
  border-radius: 5px;
  left: 30px;
  top: 41px;
  z-index: 999;
  box-shadow: 8px 8px 34px -4px rgba(0, 0, 0, 0.75);
  transition: all 0.2s;
  transform-origin: left top;
  transform: scale(0);
  &:before {
    $triangleSize: 8px;
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: $triangleSize solid transparent;
    border-right: $triangleSize solid transparent;
    border-bottom: $triangleSize solid $mainColor;
    top: -7px;
    left: 15px;
  }
}

.column-items__show {
  visibility: visible;
  opacity: 1;
  transform: scale(1);
}

/* Custom Checkbox */
[type="checkbox"]:not(:checked),
[type="checkbox"]:checked {
  position: absolute;
  left: -9999px;
}

[type="checkbox"]:not(:checked) + label,
[type="checkbox"]:checked + label {
  position: relative;
  padding-left: 1.95em;
  cursor: pointer;
}

[type="checkbox"]:not(:checked) + label:before,
[type="checkbox"]:checked + label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 1.4em;
  height: 1.4em;
  background: #fff;
  border-radius: 3px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

[type="checkbox"]:not(:checked) + label:after,
[type="checkbox"]:checked + label:after {
  font-family: FontAwesome;
  content: "\f00c";
  position: absolute;
  top: 0.4em;
  left: 0.2em;
  line-height: 0.8;
  color: $mainColor;
  transition: all 0.2s;
}

[type="checkbox"]:not(:checked) + label:after {
  opacity: 0;
  transform: scale(0);
}

[type="checkbox"]:checked + label:after {
  opacity: 1;
  transform: scale(1);
}

/* Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

table {
  font-family: 'Roboto';
}

.page-btns {
  margin-top:20px;
}
</style>
