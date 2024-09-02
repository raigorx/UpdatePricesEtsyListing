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
  },
  createShowAppStateButton: function () {
    const label = document.createElement('label')
    label.setAttribute('for', 'currentPage')
    label.textContent = 'Current Page'
    label.style.position = 'fixed'
    label.style.bottom = '90px'
    label.style.left = '10px'
    label.style.zIndex = '9999'
    label.style.padding = '10px 0'
    label.style.color = '#333'
    label.style.fontWeight = 'bold'

    const input = document.createElement('input')
    input.setAttribute('type', 'number')
    input.setAttribute('id', 'currentPage')
    input.setAttribute('name', 'currentPage')
    input.setAttribute('min', '1')
    input.setAttribute('max', appGlobalState.globals.maxPage)
    input.value = appGlobalState.globals.currentPage
    input.style.position = 'fixed'
    input.style.bottom = '80px'
    input.style.left = '10px'
    input.style.zIndex = '9999'
    input.style.padding = '10px'
    input.style.width = '50px'
    input.style.backgroundColor = '#f4f4f4'
    input.style.color = '#333'
    input.style.border = '1px solid #ccc'
    input.style.borderRadius = '5px'
    input.style.cursor = 'pointer'

    // button.onclick = () => console.log(JSON.parse(localStorage.getItem(appGlobalStateName)))
    document.body.appendChild(label)
    document.body.appendChild(input)
  }
}
