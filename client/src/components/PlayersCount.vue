<template>
    <div class="players-count">
        {{ getPlayersText }}
    </div>
</template>

<script>
export default {
  name: 'PlayersCount',
  props: ['players'],
  computed: {
    getPlayersText() {
      const playersText = this.players > 1 ? 'Players' : 'Player'
      return `${this.players} ${playersText} Online`
    }
  }
}
</script>