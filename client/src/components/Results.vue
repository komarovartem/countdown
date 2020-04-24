<template>
    <div class="results">
        <div class="results-header">
            {{ getResults }}
        </div>
    </div>
</template>

<script>
export default {
  name: 'Result',
  props: ['results', 'allResults'],
  computed: {
    getResults() {
      if (this.allResults.length) {
        return `${this.allResults.length} players have played this round.`
      } else {
        return ''
      }
    }
  }
}
</script>