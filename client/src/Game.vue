<template>
    <div class="game">
        <div class="header">
            <div class="score">Your Score: <b>{{ playerScore }}</b></div>
            <div class="logo">COUNTDOWN</div>
            <PlayersCount :players="players" />
            <transition name="slide-fade">
                <Results v-if="results.length" :results="results" :all-results="allResults" />
            </transition>
        </div>
        <div class="body">
            <transition name="fade">
                <Timer v-if="letters.length" :status="status" />
            </transition>
            <Letters :letters="letters" :status="status" :words="words" :results="results" :socket="socket" :new-player="newPlayer" />
            <div class="no-letters" v-if="!letters.length">
                This is PVP game, please wait {{ countdownNextRoundSecond }} seconds until previous round will be
                finished
            </div>
        </div>
        <div class="footer">
            <div class="contribute">
                <a href="https://github.com/komarovartem/countdown" target="_blank"><i></i>Contribute</a>
            </div>
            <div class="share">
                <span>share:</span>
                <a href="https://www.facebook.com/sharer.php?u=https://countdown-game.online/" target="_blank">facebook</a>
                <a href="https://twitter.com/intent/tweet?url=https://countdown-game.online/" target="_blank">twitter</a>
            </div>
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
      newPlayer: true,
      results: [],
      allResults: [],
      socket: {},
      letters: [],
      words: [],
      players: 0,
      currentRoundSecond: 0,
      countdownNextRoundSecond: 0,
      playersOnline: 0,
      playerScore: 0,
    }
  },
  watch: {
    status(val) {
      if (val) {
        this.results = []
        this.allResults = []

        if (this.letters.length) {
          this.newPlayer = false
        }
      }
    },
    currentRoundSecond() {
      const interval = setInterval(() => {
        if (this.countdownNextRoundSecond < 1) {
          clearInterval(interval)
        } else {
          this.countdownNextRoundSecond--
        }
      }, 1000)
    }
  },
  created() {
    this.socket = io()
    this.playerScore = this.$cookie.get('score') ? Number(this.$cookie.get('score')) : 0
  },
  mounted() {
    this.socket.on('players', data => {
      this.players = data
    })

    this.socket.on('currentRoundSecond', data => {
      this.currentRoundSecond = data
      this.countdownNextRoundSecond = data
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
  },
  methods: {
    addScorePoints(points) {
      this.playerScore += points
      this.$cookie.set('score', this.playerScore, 1)
    }
  }
}
</script>
