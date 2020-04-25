<template>
  <div class="game">
    <div class="header">
      <div>Your Score: {{ playerScore }}</div>
      <PlayersCount :players="players" />
      <Results v-if="results.length" :results="results" :all-results="allResults" />
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
      playerScore: 0
    }
  },
  watch: {
    status(val) {
      if (val) {
        this.results = []
        this.allResults = []
      }
    }
  },
  created() {
    this.socket = io()
  },
  mounted() {
    this.socket.on('players', data => {
      this.players = data
    })

    this.socket.on('updateLetters', (letters, words) => {
      this.letters = letters
      this.words = words
      console.log(letters, words)
    })

    this.socket.on('updateGameStatus', status => {
      this.status = status
    })

    this.socket.on('roundResults', (validatedWords, allWords) => {
      this.results = validatedWords
      this.allResults = allWords
    })
  },
  methods: {
    addScorePoints(points) {
      this.playerScore += points
    }
  }
}
</script>
