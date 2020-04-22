<template>
    <div class="letters">
        <div class="letter" v-for="(letter, index) in letters" :key="index">
            {{ letter }}
        </div>
        <input type="text" v-bind="word" :disabled="!status" :value="status">
    </div>
</template>

<script>
export default {
  name: 'Letters',
  props: {
    letters: Array,
    status: Boolean
  },
  data() {
    return {
      word: ''
    }
  }
}
</script>

<style scoped>
    .letters {
        display: flex;
        justify-content: center;
    }

    .letter {
        flex: 0 0 40px;
        width: 40px;
        height: 40px;
        text-transform: uppercase;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>