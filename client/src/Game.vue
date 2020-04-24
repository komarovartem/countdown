<template>
  <div class="game">
    <div class="header">
      <div>Your Score: 10</div>
      <PlayersCount :players="players" />
      <Results :results="results" :all-results="allResults" />
    </div>
    <div class="body">
      <Timer v-if="letters.length" :status="status" />
      <Letters :letters="letters" :status="status" :words="words" :results="results" :socket="socket" />
    </div>
    <div class="footer">
      footer
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import Letters from "./components/Letters";
import Timer from "./components/Timer";
import PlayersCount from "./components/PlayersCount";
import Results from "./components/Results";

export default {
  name: 'Game',
  components: {Letters, Timer, PlayersCount, Results},
  data() {
    return {
      status: false,
      results: [],
      allResults: [],
      socket: {},
      letters: [],
      words: [],
      players: 0,
      playersOnline: 0,
    }
  },
  watch: {
    status(val) {
      if (val) {
        this.results = this.allResults = []
      }
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

    this.socket.on('roundResults', (validatedWords, allWords) => {
      this.results = validatedWords
      this.allResults = allWords
    })
  }
}
</script>
