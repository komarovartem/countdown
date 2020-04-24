<template>
  <div class="game">
    <div class="header">
      <div>Your Score: 10</div>
      <PlayersCount :players="players" />
    </div>
    <div class="body">
      <Timer v-if="letters.length" :status="status" />
      <Letters :letters="letters" :status="status" :words="words" />
    </div>
    <div class="footer">
      Statistic: 1 players has 5 letters word - homes, 23 players has word
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import Letters from "./components/Letters";
import Timer from "./components/Timer";
import PlayersCount from "./components/PlayersCount";

export default {
  name: 'Game',
  components: {Letters, Timer, PlayersCount},
  data() {
    return {
      status: false,
      socket: {},
      letters: [],
      words: [],
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

    this.socket.on('updateLetters', (letters, words) => {
      this.letters = letters
      this.words = words
    })

    this.socket.on('updateGameStatus', status => {
      this.status = status
    })
  }
}
</script>
