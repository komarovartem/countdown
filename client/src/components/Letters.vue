<template>
    <div class="letters-game">
        <div class="letters" v-if="letters.length">
            <div class="letter" v-for="(letter, index) in letters" :key="index">
                {{ letter }}
            </div>
        </div>
        <input class="word-input" v-if="status && letters.length" type="text" v-model="word" placeholder="Write the longest possible word here">

        <div class="no-letters" v-if="!letters.length">
            This is PVP game so please wait a couple seconds until previous round will be finished
        </div>

        <div class="result">
            {{ gameResult }}

            <div class="fyi">
                {{ fyi }}
            </div>
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
    results: Array
  },
  data() {
    return {
      word: '',
      gameWord: '',
      gameResult: '',
      fyi: ''
    }
  },
  watch: {
    status(val) {
      if (val) {
        this.word = this.gameResult = this.fyi = ''
      } else {
        this.socket.emit('pushWord', this.word.toLowerCase())
      }
    },
    results() {
      // in case someone connected between rounds
      if (!this.letters.length) return;

      // prevent showing result during the game
      if (this.status) return;

      if (!this.status) {
        this.fyi = `One of the longest possible words from this round was -  ${this.words[0]}`
      }

      if (!this.word.length && this.letters.length) {
        this.gameResult = `You did not write any word so you are skipping this round`
        return
      }

      if (this.words.indexOf(this.word.toLowerCase()) === -1) {
        this.gameResult = `Sorry, the word "${this.word}" is not in a dictionary or cannot be made from these letters`
      } else {
        if (this.results[0].length > this.word.length) {
          this.gameResult = `Sorry, you have ${this.word.length} letters word, but other player had got ${this.results[0].length} letters word, so no points you`
        } else {
          this.gameResult = `Congrats, you have earned ${this.word.length} points`
          this.$parent.addScorePoints(this.word.length)
        }
      }
    }
  }
}
</script>