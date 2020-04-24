<template>
    <div class="letters-game">
        <div class="letters" v-if="letters.length">
            <div class="letter" v-for="(letter, index) in letters" :key="index">
                {{ letter }}
            </div>
        </div>
        <input class="word-input" v-if="letters.length" type="text" v-bind="word" :disabled="!status" placeholder="Write the longest possible word here">

        <div class="no-letters" v-else>
            Wait a couple seconds until previous game will be finished
        </div>

        <div>
            {{ words }} <br>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Letters',
  props: {
    letters: Array,
    words: Array,
    status: Boolean
  },
  data() {
    return {
      word: '',
      gameWord: '',
      gameResult: ''
    }
  },
  watch: {
  },
}
</script>