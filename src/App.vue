<template>
  <div class="main">
    <h2>Stand up in</h2>
    <timer
      @timer-start="handleTimerStart"
      @timer-done="handleTimerDone"
      :max-time="20"
      :set-title="true">
    </timer>
    <div v-if="isTimerDone"><button @click="$refs.timer.restartTimer">Restart</button></div>
  </div>
</template>

<script lang="coffee">
import Timer from './Timer.vue'

export default
  name: 'app'

  components:
    timer: Timer

  data: ->
    {
      isTimerDone: null
    }

  methods:
    handleTimerStart: -> @isTimerDone = false

    handleTimerDone: ->
      window.alert("It's time to stand up")
      @isTimerDone = true
</script>

<style lang="sass">
  html, body, .main
    height: 100%

  html
    font-size: 100%
    box-sizing: border-box

  *, *::after, *::before
    box-sizing: inherit

  body
    background-color: #343434
    color: #cfcfcf
    font-family: Arial, Helvetica, sans-serif
    font-size: 24px

  .main
    width: 100%
    margin-left: auto
    margin-right: auto
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

    h2
      font-size: 5vw
      margin-bottom: 1rem

    .time
      font-size: 2vw
      display: flex
</style>
