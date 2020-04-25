<template>
    <div class="timer">
        {{ getTimerTest }} {{ timer }}
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
      time: 30,
      interval: null
    }
  },
  watch: {
    status(val) {
      clearInterval(this.interval)
      if (val) {
        this.timer = 30
      } else {
        this.timer = 20
      }

      this.interval = setInterval(() => {
        this.timer >= 0 && this.timer--
      }, 1000)
    }
  },
  computed: {
    getTimerTest() {
      if (!this.status) {
        return 'Time is out. Next round stars in: '
      } else {
        return ''
      }
    }
  }
}
</script>