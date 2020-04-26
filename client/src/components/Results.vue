<template>
    <div class="results">
        <div class="results-header">
            {{ getResults }}
        </div>
        <div v-for="(words, index) in playersLetters" :key="index" v-html="getResultLine(words, index)" />
        <div>
            {{ getLazyPlayers }}
        </div>
    </div>
</template>

<script>
export default {
  name: 'Result',
  props: ['results', 'allResults'],
  computed: {
    getResults() {
      return `${this.allResults.length} players have played this round.`
    },
    playersLetters() {
      const letters = {
        '9w': [],
        '8w': [],
        '7w': [],
        '6w': [],
        '5w': [],
        '4w': [],
        '3w': [],
        '2w': [],
        '1w': [],
      }

      this.results.forEach(word => {
        letters[word.length + 'w'].push(word)
      })

      return letters
    },
    getLazyPlayers() {
      const lazyPlayers = this.allResults.length - this.results.length

      if (lazyPlayers > 0) {
        const players = lazyPlayers > 1 ? 'players' : 'player'
        return `${lazyPlayers} ${players} did not write any proper words`
      } else {
        return ''
      }
    }
  },
  methods: {
    getResultLine(words, index) {
      if (!words.length) return

      const players = words.length > 1 ? 'players' : 'player'
      return `<b>${words.length}</b> ${players} had <b>${ index.slice(0, -1) }</b> letters word`
    }
  }
}
</script>