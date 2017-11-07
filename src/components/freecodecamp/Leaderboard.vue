<template lang="pug">
  #leaderBoard(class="relative v-center")
    //- Loader
    div(v-if="loading" class="absolute abs-center")
      i(class="fa fa-spinner fa-pulse fa-2x fa-fw")
      span(class="sr-only") Loading...
    //- Table
    table(v-else class="collapse f6 f5-ns tc center w-100")
      thead
        tr(class="bg-green f4-ns")
          th(colspan="4") FreeCodeCamp Leaderboard
        tr(class="bg-green")
          th #
          th Camper Name
          th(@click="sortRecentPoints") Points in past 30 days
            i(class="fa fa-sort pl2" aria-hidden="true")
          th(@click="sortAlltimePoints") All time points
            i(class="fa fa-sort pl2" aria-hidden="true")
      tbody
        tr(v-for="(camper , index) in tableData" :key="index")
         td {{tableIndex + index + 1}}
         td {{camper.username}}
         td {{camper.recent}}
         td {{camper.alltime}}
    //- Page Control
    pagination(v-if="!loading" :dataCount="campers.length" :visibleRows="dataPerPage" v-on:fetchPage="fetchTableData")
</template>

<script>
import axios from 'axios'
import pagination from 'components/Pagination'
export default {
  name: 'app',
  components: {
    pagination
  },
  data() {
    return {
      campers: [],
      sortRecent: false,
      sortAlltime: false,
      loading: true,
      tableData: [],
      tableIndex: 0,
      dataPerPage: 20,
      buttonControl: {},
      selectedButton: 1
    }
  },
  methods: {
    sortRecentPoints() {
      this.sortRecent = !this.sortRecent
      this.tableData.sort((a, b) => {
        return this.sortRecent ? b.recent - a.recent : a.recent - b.recent
      })
    },
    sortAlltimePoints() {
      this.sortAlltime = !this.sortAlltime
      this.tableData.sort((a, b) => {
        return this.sortAlltime ? b.alltime - a.alltime : a.alltime - b.alltime
      })
    },
    pageIndexes() {
      return Math.ceil(this.campers.length / this.dataPerPage)
    },
    fetchTableData(index) {
      this.tableIndex = (index - 1) * this.dataPerPage
      this.tableData = this.campers.slice(this.tableIndex, index * this.dataPerPage)
      this.buttonControl[this.selectedButton] = false
      this.buttonControl[index] = true
      this.selectedButton = index
    }
  },
  created() {
    if (screen.width < 360) {
      this.dataPerPage = 10
    } else if (screen.width < 768) {
      this.dataPerPage = 14
    }
  },
  mounted() {
    // get the top 100 campers for the last 30 days
    this.loading = true
    axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
      .then((response) => {
        this.campers = response.data
        this.tableData = this.campers.slice(0, this.dataPerPage)
        this.loading = false
        for (let i = 1; i <= this.pageIndexes(); i++) {
          this.buttonControl[i] = false
        }
        this.buttonControl[this.selectedButton] = true
      })
  }
}
</script>

<style lang="scss" scoped>
#leaderBoard {
  font-family: "Roboto";
}

tbody>tr>td,
thead>tr>th {
  border: 1px solid #303030;
  margin: 0;
  height: 35px;
}

::-webkit-scrollbar {
  display: none;
}

button.selected {
  color: black;
}

</style>
