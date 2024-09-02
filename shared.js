'use strict'

window.sharedModule = {
  sleep: async function () {
    return new Promise(resolve => setTimeout(resolve, 6000))
  },
  appGlobalStateName: 'appGlobalState',
  createResetAppStateButton: function () {
    const button = document.createElement('button')
    button.textContent = 'Reset App State'
    button.style.position = 'fixed'
    button.style.bottom = '50px'
    button.style.left = '10px'
    button.style.zIndex = '9999'
    button.style.padding = '10px 20px'
    button.style.backgroundColor = '#007bff'
    button.style.color = '#fff'
    button.style.border = 'none'
    button.style.borderRadius = '5px'
    button.style.cursor = 'pointer'

    button.onclick = () => {
      const userConfirmed = confirm(
        'Are you sure you want to reset the app state?'
      )

      if (userConfirmed) resetAppState()
    }

    document.body.appendChild(button)
  }
}
