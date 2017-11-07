<template>
  <div id="twitchChannel" class="relative">
  
    <div class="f6 f5-m f5-l overflow-hidden mb2">
      <div class="button" @click="changeShowStatus('offline')">Offline</div>
      <div class="button" @click="changeShowStatus('online')">Online</div>
      <div class="button" @click="changeShowStatus('all')">All</div>
    </div>
  
    <table class="collapse ba br2 b--black-10 w-100 f7 f5-m f5-l">
      <thead>
        <tr>
          <th class="nowrap-ns ph2">Twitch Streamer</th>
          <th>Channel</th>
          <th>Status</th>
          <th>Game</th>
          <th v-if="largeScreen">Info</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(host,index) in hosts" :key="index" v-if="host.status === showStatus || showStatus === 'all'" class="">
          <td>
            <img v-if="host.status === 'online'" :src="host.channel.logo " height=50 width=50></img>
          </td>
          <td :class="host.status === 'online' ? 'highlight':''" class="ph2">
            <a :href="host.channel.url " target=_blank>{{host.name}}</a>
          </td>
          <td class="ph2" :class="host.status === 'online' ? 'highlight':''">{{host.status}}</td>
          <td class="nowrap ph2" :class="host.status === 'online' ? 'highlight':''">{{host.channel.game}}</td>
          <td v-if="largeScreen" :class="host.status === 'online' ? 'highlight':''">{{host.channel.status}}</td>
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
      showStatus: 'all',
      largeScreen: true
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
  },
  mounted () {
    this.largeScreen = !(screen.width <= 768)
  }
}
</script>

<style scoped lang='scss'>
#twitchChannel {
  font-family: 'Exo', sans-serif;
  top:50%;
  transform:translateY(-50%);
}

th , td {
  border:1px solid rgba(0,0,0,.3);
}

td {
  height:4em;
}

th {
  height:2em;
  background-color: #42b883;
  color:white;
}

.button {
  margin: 0 10px;
  float: right;
  text-align: center;
  color: #42b883;
  font-size: 1.1em;
  cursor:pointer;
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

// // Mobile
// @media (max-width: 767px) {
//   .table {
//     font-size: 1em;
//   }
// }

// @media (max-width: 575px) {
//   .button {
//     font-size: 0.9em;
//   }

//   .table {
//     font-size: 0.8em;
//   }
// }
</style>
