<template>
  <div class="timer">{{ timeLeftString }}</div>
</template>

<script lang="coffee">
export default
  name: 'timer'

  props:
    # Unit: minutes
    maxTime:
      default: 1
      type: Number

    setTitle:
      default: true
      type: Boolean

  data: ->
    {
      # Unit: seconds
      timeLeft: 0

      currentTimerInterval: null
      documentUnwatch: null
    }

  computed:
    maxTimeSeconds: -> @maxTime * 60
    isFinished: -> @timeLeft < 1
    timeLeftString: ->
      mins = Math.floor((@timeLeft / 60) % 60)
      secs = Math.floor(@timeLeft % 60)

      return "#{(if mins > 0 then "#{mins}m " else '')}#{(if secs > 0 then "#{secs}s" else '')}"

  created: ->
    # If prop allows it, we can modify the document title.
    @initDocumentTitleWatcher() if @setTitle

    # Finally, init and start the timer.
    @restartTimer()

  beforeDestroy: ->
    @stopTimer()
    @documentUnwatch() if @documentUnwatch?

  methods:
    initDocumentTitleWatcher: ->
      @documentUnwatch = @$watch 'timeLeft', (value) ->
        suffix = 'standup'

        if value > 0 then document.title = "#{@timeLeftString} until #{suffix}"
        if @isFinished then document.title = "!!! Time to #{suffix} !!!"

    restartTimer: ->
      @initTimer()
      @startTimer()

    initTimer: -> @timeLeft = @maxTimeSeconds

    startTimer: ->
      @$emit 'timer-start'
      @stopTimer()
      @currentTimerInterval = setInterval(@handleStopwatch.bind(@), (1 * 1000))

    stopTimer: ->
      clearInterval @currentTimerInterval if @currentTimerInterval > 0

    handleStopwatch: ->
      @timeLeft -= 1

      if @timeLeft < 1
        @$emit 'timer-done'
        @stopTimer()

</script>

<style lang="sass">
</style>
