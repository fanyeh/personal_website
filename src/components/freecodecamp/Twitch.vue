<template>
  <div id="twitch">
    <div class="row">
      <div class="button" @click="changeShowStatus('offline')">Offline</div>
      <div class="button" @click="changeShowStatus('online')">Online</div>
      <div class="button" @click="changeShowStatus('all')">All</div>
    </div>
    <br>
    <div class="row">
      <div class="title cell col-2">
        <div class="content">Twitch Streamer</div>
      </div>
      <div class="title cell col-2">
        <div class="content">Channel</div>
      </div>
      <div class="title cell col-2">
        <div class="content">Status</div>
      </div>
      <div class="title cell col-2">
        <div class="content">Game</div>
      </div>
      <div class="title cell col-4">
        <div class="content">Info</div>
      </div>
    </div>
  
    <div class="row _content" v-for="(host,index) in hosts" :key="index">
      <template v-if="host.status === showStatus || showStatus === 'all'">
        <div class="item cell col-2">
          <div class="content">
            <img v-if="host.status === 'online'" :src="host.channel.logo " height=50 width=50></img>
          </div>
        </div>
        <div class="item cell col-2 ">
          <div class="content" :class="host.status === 'online' ? 'highlight':''">
            <a :href="host.channel.url " target=_blank>{{host.name}}</a>
          </div>
        </div>
        <div class="item cell col-2 ">
          <div class="content" :class="host.status === 'online' ? 'highlight':''">{{host.status}}</div>
        </div>
        <div class="item cell col-2 ">
          <div class="content" :class="host.status === 'online' ? 'highlight':''">{{host.channel.game}}</div>
        </div>
        <div class="item cell col-4 ">
          <div class="content" :class="host.status === 'online' ? 'highlight':''">{{host.channel.status}}</div>
        </div>
      </template>
    </div>
    <br>
    <p class="footer">Powered by
      <span>
        <a href="https://vuejs.org ">Vue.js</a>
      </span>
    </p>
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
$itemBorder: 2px;
$gridSize: 80%;
$gridUnit: $gridSize * 1 / 12;
$col-2: $gridUnit / $gridSize * 100% * 2;
$col-4: $gridUnit / $gridSize * 100% * 4;
$col-6: $gridUnit / $gridSize * 100% * 6;

#twitch {
  height: 90vh;
}

div {
  text-align: center;
}

.button {
  width: 80px;
  height: 30px;
  float: right;
  text-align: center;
  color: #42b883;
  font-size: 18px; // font-weight: 500;
}

.button:hover {
  text-decoration: underline;
}

.row {
  width: $gridSize;
  overflow: hidden;
  margin: auto;
}

.cell {
  border-bottom: 1px solid #303030;
  position: relative;
  float: left;
  color: #303030;
  vertical-align: middle;
}

.title {
  height: 40px;
  font-weight: 700;
}

.item {
  height: 80px;
}

.content {
  position: absolute;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  img {
    display: table-cell;
    vertical-align: middle;
    margin: 0 auto;
    border: none;
    border-radius: 50%;
  }
}

.col-2 {
  width: $col-2;
}

.col-4 {
  width: $col-4;
}

.col-6 {
  width: $col-6;
}

a:link,
a:visited {
  color: inherit;
  cursor: pointer;
}

p {
  margin-top: 40px;
  color: #303030;
}

span {
  color: #42b883;
  a {
    text-decoration: none;
  }
}

.highlight {
  color: #42b883;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
