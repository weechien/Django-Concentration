// Timer to record time taken to solve the game
const Timer = (() => {
  let clock = 0
  let offset = 0
  let interval = null

  // Constructor function
  return function(container) {
    const start = () => {
      if (!interval) {
        const minutes = parseInt(container.innerText.split(':')[0]) * 60000
        const seconds = parseInt(container.innerText.split(':')[1]) * 1000
        clock = minutes + seconds
        offset = Date.now()
        interval = setInterval(update, 1000)
      }
    }
    const stop = () => {
      if (interval) {
        clearInterval(interval)
        interval = null
      }
    }
    const update = () => {
      const now = Date.now()
      clock += now - offset
      offset = now
      render()
    }
    const render = () => {
      let time = ''
      const minutes = Math.floor(clock / 60000)
      const seconds = Math.floor(clock / 1000 - minutes * 60)
      time += minutes < 10 ? '0' + minutes : '' + minutes
      time += seconds < 10 ? ':0' + seconds : ':' + seconds
      container.innerText = time
    }
    this.start = start
    this.stop = stop
  }
})()
