<template>
    <div class="letters-game" v-if="letters.length">
        <div class="letters">
            <div class="letter" v-for="(letter, index) in roundLetters" :key="index">
                {{ letter }}
            </div>
        </div>
        <input v-if="status" ref="input" class="word-input" type="text" v-model="word" placeholder="Write the longest possible word here">
        <div class="result" v-if="!status">
            {{ gameResult }}
            <div class="fyi" v-html="fyi" />
        </div>
    </div>
</template>

<script>
export default {
  name: 'Letters',
  props: {
    letters: Array,
    words: Array,
    status: Boolean,
    socket: Object,
    results: Array,
    newPlayer: Boolean
  },
  data() {
    return {
      word: '',
      gameWord: '',
      gameResult: '',
      fyi: '',
      roundLetters: []
    }
  },
  watch: {
    letters(letters) {
      this.roundLetters = ['','','','','','','','','']
      const alphabet = String('abcdefghijklmnopqrstuvwxyz').split('')
      let index = 0

      const interval = setInterval(() => {
        for (let i = 0; i <= 8; i++) {
          if (index <= i) {
            this.roundLetters.splice(i, 1, alphabet[Math.floor(Math.random() * 26)])
          }
        }
      }, 20)

      const lettersInterval = setInterval(() => {
        this.roundLetters.splice(index, 1, letters[index])
        index++
      }, 500)

      setTimeout(() => {
        clearInterval(interval)
        clearInterval(lettersInterval)
        this.roundLetters = letters
      }, 5000)
    },
    status(val) {
      if (val) {
        this.word = this.gameResult = this.fyi = ''
        this.$refs.input && this.$nextTick(() => this.$refs.input.focus())
      } else {
        this.socket.emit('pushWord', this.word.toLowerCase())
        if (!this.newPlayer) {
            this.fyi = 'Please wait. Checking results...'
        }
      }
    },
    results() {
      // in case someone connected between rounds
      if (!this.letters.length) return;

      // prevent showing result during the game
      if (this.status) return;

      if (!this.status) {
        this.fyi = `One of the longest possible words from this round was -  <b>${this.words[0]}</b>`
      }

      if (!this.word.length && this.letters.length) {
        this.gameResult = `You did not write any word so you are skipping this round`
        return
      }

      if (this.words.indexOf(this.word.toLowerCase()) === -1) {
        this.gameResult = `Sorry, the word "${this.word}" is not in a dictionary or cannot be made from these letters`
      } else {
        if (this.results[0].length > this.word.length) {
          this.gameResult = `Sorry, you have ${this.word.length} letters word, but other player has ${this.results[0].length} letters word, so no points for you`
        } else {
          this.gameResult = `Congrats, you have earned ${this.word.length} points`
          this.$parent.addScorePoints(this.word.length)
        }
      }
    }
  }
}
</script>