'use strict'

window.sharedModule = {
  sleep: async function () {
    return new Promise(resolve => setTimeout(resolve, 6000))
  },
  appGlobalStateName: 'appGlobalState'
}
