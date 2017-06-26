<template>
  <div id="leader-board">
    <table>
      <thead>
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
        <tr v-for="(camper , index) in campers">
          <td>{{index + 1}}</td>
          <td>{{camper.username}}</td>
          <td>{{camper.recent}}</td>
          <td>{{camper.alltime}}</td>
        </tr>
      </tbody>
    </table>
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
      sortAlltime: false
    }
  },
  methods: {
    sortRecentPoints() {
      this.sortRecent = !this.sortRecent
      this.campers.sort((a, b) => {
        return this.sortRecent ? b.recent - a.recent : a.recent - b.recent
      })
    },
    sortAlltimePoints() {
      this.sortAlltime = !this.sortAlltime
      this.campers.sort((a, b) => {
        return this.sortAlltime ? b.alltime - a.alltime : a.alltime - b.alltime
      })
    }
  },
  mounted() {
    // get the top 100 campers for the last 30 days
    axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent').then((response) => {
      this.campers = response.data
    })
  }
}
</script>

<style lang="scss" scoped>
#leader-board {
  // display: inline-block;
  height: 80vh;
  overflow-y: scroll; // border: 1px solid;
}

table {
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
  width: 95%;
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
</style>
