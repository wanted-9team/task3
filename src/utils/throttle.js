function throttle(callback, limit) {
  let waiting = false
  return function () {
    if (!waiting) {
      callback()
      waiting = true
      setTimeout(() => {
        waiting = false
      }, limit)
    }
  }
}

export default throttle
