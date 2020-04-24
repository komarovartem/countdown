<template>
    <div class="timer">
        {{ timer }}
    </div>
</template>

<script>
export default {
  name: 'Timer',
  props: {
    status: Boolean
  },
  data() {
    return {
      timer: 0,
      time: 10,
      interval: null
    }
  },
  created() {
  if (this.status === false)
    this.timer = 0
  },
  watch: {
    status(val) {
      if (val) {
          this.timer = this.time

          this.interval = setInterval(() => {
            this.timer >= 0 && this.timer--
          }, 1000)
      } else {
        this.timer = 'Time is out. Checking a winner'
        clearInterval(this.interval)
      }
    }
  }
}
</script>

<style scoped>
    .timer {
        font-width: bold;
        font-size: 30px;
        text-align: center;
    }
</style>