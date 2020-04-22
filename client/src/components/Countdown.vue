<template>
    <div class="countdown">
        {{ timer }}
    </div>
</template>

<script>
export default {
  name: 'Countdown',
  props: {
    status: Boolean
  },
  data() {
    return {
      timer: 0,
      time: 5,
      interval: null
    }
  },
  watch: {
    status(newVal) {
      if (newVal) {
          this.timer = this.time

          this.interval = setInterval(() => {
            this.timer >= 0 && this.timer--
          }, 1000)
      } else {
        this.timer = 0
        clearInterval(this.interval)
      }
    }
  }
}
</script>

<style scoped>
    .countdown {

    }
</style>