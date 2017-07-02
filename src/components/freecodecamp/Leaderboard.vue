<template>
  <div id="leader-board">
    <div v-if="loading" class="loading">
      <i class="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
      <span class="sr-only">Loading...</span>
    </div>
  
    <table v-else>
      <thead>
        <tr>
          <th colspan="4">Camper Leaderboard</th>
        </tr>
        <tr>
          <th>#</th>
          <th>Camper Name</th>
          <th @click="sortRecentPoints">Points in past 30 days
            <i class="fa fa-sort" aria-hidden="true"></i>
          </th>
          <th @click="sortAlltimePoints">All time points
            <i class="fa fa-sort" aria-hidden="true"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(camper , index) in tableData" :key="index">
          <td>{{tableIndex + index + 1}}</td>
          <td>{{camper.username}}</td>
          <td>{{camper.recent}}</td>
          <td>{{camper.alltime}}</td>
        </tr>
      </tbody>
    </table>
  
    <div class="page-btn">
      <button v-for="n in pageIndexes()" class="btn btn-sm" @click="fetchTableData(n)" :class="buttonControl[n] ? 'selected' : ''">{{n}}</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data() {
    return {
      campers: [],
      sortRecent: false,
      sortAlltime: false,
      loading: true,
      tableData: [],
      tableIndex: 0,
      dataPerPage: 15,
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
table {
  border-collapse: collapse;
  margin: auto;
  text-align: center;
  width: 100%;
}

tbody>tr>td,
thead>tr>th {
  border: 1px solid #303030;
  margin: 0;
  height: 35px;
}

thead>tr>th {
  background-color: #42b883;
  text-align: center;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

::-webkit-scrollbar {
  display: none;
}

.page-btn {
  text-align: right;
  width: 100%;
  margin: 20px auto;
  button {
    margin: 0 1px;
    width: 32px;
    background-color: #42b883;
    color: white;
  }
}

button.selected {
  color: black;
  text-decoration: underline;
}
</style>
