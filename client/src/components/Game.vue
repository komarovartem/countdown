<template>
    <div class="game">
        <h1>{{ players }}</h1>
        <Letters :letters="letters" :status="status" />
        <Countdown :status="status" />
    </div>
</template>

<script>
import io from 'socket.io-client'
import Letters from "./Letters";
import Countdown from "./Countdown";

export default {
  name: 'Game',
  components: {Letters, Countdown},
  data() {
    return {
      status: false,
      socket: {},
      letters: [],
      players: 0,
      playersOnline: 0,
    }
  },
  created() {
    this.socket = io('http://192.168.1.103:3000')
  },
  mounted() {
    this.socket.on('players', data => {
      this.players = data
    })

    this.socket.on('updateLetters', data => {
      this.letters = data
    })

    this.socket.on('updateGameStatus', status => {
      this.status = status
    })
  }
}
</script>

<style scoped>

</style>
