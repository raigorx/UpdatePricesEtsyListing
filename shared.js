'use strict'

window.sharedModule = {
  appGlobalStateName: 'appGlobalState',
  sleep: async function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  },
  // createProxy: function (target, appGlobalState) {
  //   return new Proxy(target, {
  //     set (obj, prop, value) {
  //       // if (typeof value === 'object' && value !== null) {
  //       //   value = window.sharedModule.createProxy(value)
  //       // }
  //       obj[prop] = value
  //       window.sharedModule.saveAppGlobalState(appGlobalState)
  //       return true
  //     }
  //   })
  // },
  itemStatus: Object.freeze({
    SKIPPED: 'SKIPPED',
    PROCESSED: 'PROCESSED',
    NO_PROCESSED: 'NO-PROCESSED'
  }),
  saveAppGlobalState: function (appGlobalState) {
    localStorage.setItem(
      window.sharedModule.appGlobalStateName,
      JSON.stringify(appGlobalState)
    )
  },
  resetAppState: function (appGlobalState) {
    const backupKey = `${window.sharedModule.appGlobalStateName}_backup`
    const currentState = localStorage.getItem(
      window.sharedModule.appGlobalStateName
    )
    let backups = JSON.parse(localStorage.getItem(backupKey)) || []
    if (currentState !== null) {
      backups.unshift(currentState)
    }
    if (backups.length > appGlobalState.globals.maxBackupStates) {
      backups = backups.slice(0, appGlobalState.globals.maxBackupStates)
    }

    localStorage.setItem(backupKey, JSON.stringify(backups))

    localStorage.removeItem(window.sharedModule.appGlobalStateName)
    alert('App state has been reset successfully')
  },
  createResetAppStateButton: function (appGlobalState) {
    const button = document.createElement('button')
    button.textContent = 'Reset App State'
    button.style.position = 'fixed'
    button.style.bottom = '50px'
    button.style.left = '10px'
    button.style.zIndex = '9999'
    button.style.padding = '10px 20px'
    button.style.backgroundColor = '#000'
    button.style.color = '#fff'
    button.style.border = 'none'
    button.style.borderRadius = '5px'
    button.style.cursor = 'pointer'

    button.onclick = () => {
      const userConfirmed = confirm(
        'Are you sure you want to reset the app state?'
      )

      if (userConfirmed) window.sharedModule.resetAppState(appGlobalState)
    }

    document.body.appendChild(button)
  },
  createCurrentPageInput: function (appGlobalState) {
    const label = document.createElement('label')
    label.setAttribute('for', 'currentPage')
    label.textContent = 'Current Page'
    label.style.position = 'fixed'
    label.style.bottom = '138px'
    label.style.left = '10px'
    label.style.zIndex = '9999'
    label.style.padding = '0 10px'
    label.style.color = '#FFF'
    label.style.fontWeight = 'bold'
    label.style.borderRadius = '5px'
    label.style.backgroundColor = '#000'

    const input = document.createElement('input')
    input.setAttribute('type', 'number')
    input.setAttribute('id', 'currentPage')
    input.setAttribute('name', 'currentPage')
    input.setAttribute('min', '1')
    input.setAttribute('max', appGlobalState.globals.maxPage)
    input.value = appGlobalState.globals.currentPage
    input.style.position = 'fixed'
    input.style.bottom = '94px'
    input.style.left = '10px'
    input.style.zIndex = '9999'
    input.style.padding = '10px'
    input.style.width = '50px'
    input.style.backgroundColor = '#000'
    input.style.color = '#FFF'
    input.style.border = '1px solid #ccc'
    input.style.borderRadius = '5px'
    input.style.borderRadius = '5px'
    input.disabled = true

    // button.onclick = () => console.log(JSON.parse(localStorage.getItem(appGlobalStateName)))
    document.body.appendChild(label)
    document.body.appendChild(input)
  },
  createItemsLeftInput: function (appGlobalState) {
    const label = document.createElement('label')
    label.setAttribute('for', 'itemsLeft')
    label.textContent = 'Items Lefts'
    label.style.position = 'fixed'
    label.style.bottom = '210px'
    label.style.left = '10px'
    label.style.zIndex = '9999'
    label.style.padding = '0 10px'
    label.style.color = '#FFF'
    label.style.fontWeight = 'bold'
    label.style.borderRadius = '5px'
    label.style.backgroundColor = '#000'

    const input = document.createElement('input')
    input.setAttribute('type', 'number')
    input.setAttribute('id', 'itemsLeft')
    input.setAttribute('name', 'itemsLeft')
    input.value =
      appGlobalState.listEdit.listEditLinks.length -
      appGlobalState.listEdit.listEditcurrentIndex

    input.style.position = 'fixed'
    input.style.bottom = '166px'
    input.style.left = '10px'
    input.style.zIndex = '9999'
    input.style.padding = '10px'
    input.style.width = '50px'
    input.style.backgroundColor = '#000'
    input.style.color = '#FFF'
    input.style.border = '1px solid #ccc'
    input.style.borderRadius = '5px'
    input.style.borderRadius = '5px'
    input.disabled = true

    // button.onclick = () => console.log(JSON.parse(localStorage.getItem(appGlobalStateName)))
    document.body.appendChild(label)
    document.body.appendChild(input)
  }
}
