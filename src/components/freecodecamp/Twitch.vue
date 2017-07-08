<template>
  <div class="twitch container-fluid">
  
    <div class="row status">
      <div class="button" @click="changeShowStatus('offline')">Offline</div>
      <div class="button" @click="changeShowStatus('online')">Online</div>
      <div class="button" @click="changeShowStatus('all')">All</div>
    </div>
    <br>
  
    <table class="table table-responsive">
      <thead>
        <tr>
          <th>Twitch Streamer</th>
          <th>Channel</th>
          <th>Status</th>
          <th class="hidden-sm-down">Game</th>
          <th class="hidden-sm-down">Info</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(host,index) in hosts" :key="index" v-if="host.status === showStatus || showStatus === 'all'">
          <td>
            <img v-if="host.status === 'online'" :src="host.channel.logo " height=50 width=50></img>
          </td>
          <td :class="host.status === 'online' ? 'highlight':''">
            <a :href="host.channel.url " target=_blank>{{host.name}}</a>
          </td>
          <td :class="host.status === 'online' ? 'highlight':''">{{host.status}}</td>
          <td class="hidden-sm-down" :class="host.status === 'online' ? 'highlight':''">{{host.channel.game}}</td>
          <td class="hidden-sm-down" :class="host.status === 'online' ? 'highlight':''">{{host.channel.status}}</td>
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
      hosts: [
        {
          name: 'godjj',
          status: '',
          channel: {}
        },
        {
          name: 'ESL_SC2',
          status: '',
          channel: {}
        },
        {
          name: 'OgamingSC2',
          status: '',
          channel: {}
        },
        {
          name: 'cretetion',
          status: '',
          channel: {}
        },
        {
          name: 'freecodecamp',
          status: '',
          channel: {}
        },
        {
          name: 'storbeck',
          status: '',
          channel: {}
        }
      ],
      api: 'https://wind-bow.glitch.me/twitch-api/streams/',
      showStatus: 'all'
    }
  },
  methods: {
    changeShowStatus(newStatus) {
      this.showStatus = newStatus
      newStatus !== 'offline' ? this.sortOnline() : this.sortOffline()
    },
    sortOffline() {
      this.hosts.sort((a, b) => {
        return a.status > b.status
      })
    },
    sortOnline() {
      this.hosts.sort((a, b) => {
        return a.status < b.status
      })
    }
  },
  created() {
    this.hosts.forEach((host) => {
      axios.get(this.api + host.name)
        .then((response) => {
          const stream = response.data.stream
          if (stream === null) {
            host.status = 'offline'
            host.channel.url = `https://www.twitch.tv/${host.name}`
          } else {
            host.status = 'online'
            host.channel = stream.channel
          }
          this.sortOnline()
        })
    })
  }
}
</script>

<style scoped lang='scss'>
.table>thead>tr>th {
  text-align: center;
}

.table-responsive {
  display: table;
}

.button {
  margin: 0 10px;
  float: right;
  text-align: center;
  color: #42b883;
  font-size: 1.1em;
}

.button:hover {
  text-decoration: underline;
}

a:link,
a:visited {
  color: inherit;
  cursor: pointer;
}

.highlight {
  color: #42b883;
}

.status {
  float: right;
  margin-bottom: 2%;
}

// Mobile
@media (max-width: 767px) {
  .table {
    font-size: 1em;
  }
}

@media (max-width: 575px) {
  .button {
    font-size: 0.9em;
  }

  .table {
    font-size: 0.8em;
  }
}
</style>
