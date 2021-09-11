const initMixins = Vue => {
  Vue.mixin({
    methods: {
      throttle(callback, delay) {
        let timer = null
        return function() {
          if (timer) {
            return
          }
          timer = setTimeout(() => {
            callback(...arguments)
            timer = null
          }, delay)
        }
      }
    }
  })
}

export default initMixins