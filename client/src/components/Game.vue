<template>
  <div class="game">
    <h1>{{ players }}</h1>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'Game',
  data() {
    return {
      socket: {},
      players: 0,
      playersOnline: 0,
    }
  },
  created() {
    this.socket = io('http://localhost:3000')
  },
  mounted() {
    this.socket.on('players', data => {
      this.players = data
    })
  },
  watch: {
    playersOnline: function () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
