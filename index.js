module.exports = {
    install (Vue) {
        const onlineOnlyDirective = {
            bind: function (el) {
                let prevDisplay = el.style.display;

                if (window) {
                    if (!navigator.onLine) {
                        el.style.display = 'none'
                    }
                    window.addEventListener('offline',  () => {
                        prevDisplay = el.style.display
                        el.style.display = 'none'
                      })
                    window.addEventListener('online',  () => {
                        el.style.display = prevDisplay
                    })
                }

            }
        }

        const offlineOnlyDirective = {
            bind: function (el) {
                prevDisplay = el.style.display

                if (window) {
                    if (navigator.onLine) {
                        el.style.display = 'none'
                    }
                    window.addEventListener('online',  () => {
                        prevDisplay = el.style.display
                        el.style.display = 'none'
                    })
                    window.addEventListener('offline',  () => {
                        el.style.display = prevDisplay
                    })
                }
            }
        }

        const offlineHooksMixin = {
            mounted () {
                if (window) {
                    window.addEventListener('online',  () => {
                        this.$emit('online')
                    })
                    window.addEventListener('offline',  () => {
                        this.$emit('offline')
                    })
                }
            }
        }
        
        Vue.directive('online', onlineOnlyDirective)
        Vue.directive('offline', offlineOnlyDirective)
        Vue.mixin(offlineHooksMixin)
    }
}
