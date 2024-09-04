// ==UserScript==
// @name         Update Prices Etsy Listing Page
// @namespace    Violentmonkey Scripts
// @version      0.2
// @description  Automatically clicks on links with "mug" in the title on the specified webpage
// @author       Raigorx Hellscream
// @match        https://www.etsy.com/your/shops/me/tools/listings/page:*
// @grant        none
// @require https://raw.githubusercontent.com/raigorx/UpdatePricesEtsyListing/main/shared.js
// @top-level-await
// ==/UserScript==
'use strict'

const appGlobalStateName = window.sharedModule.appGlobalStateName
const saveAppGlobalState = window.sharedModule.saveAppGlobalState
const itemStatus = window.sharedModule.itemStatus
const sleep = window.sharedModule.sleep
const createResetAppStateButton = window.sharedModule.createResetAppStateButton
const createCurrentPageInput = window.sharedModule.createCurrentPageInput

let appGlobalState = null
// avoid re-init as consequence of multiple mutation observers calls
// remove?
let isPageStateInitialized = false
let hasObservedRan = false

function createStartButton () {
  const button = document.createElement('button')
  button.textContent = 'Start'
  button.style.position = 'fixed'
  button.style.bottom = '10px'
  button.style.left = '10px'
  button.style.zIndex = '9999'
  button.style.padding = '10px 20px'
  button.style.backgroundColor = '#000'
  button.style.color = '#fff'
  button.style.border = 'none'
  button.style.borderRadius = '5px'
  button.style.cursor = 'pointer'

  button.onclick = () => {
    if (appGlobalState.listEdit.listEditLinks.length === 0) {
      goToNextPage()
    } else {
      goTolistEdit()
    }
  }

  document.body.appendChild(button)
}

function createItemsFoundsInput () {
  const label = document.createElement('label')
  label.setAttribute('for', 'itemsFounds')
  label.textContent = 'Items Founds'
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
  input.setAttribute('id', 'itemsFounds')
  input.setAttribute('name', 'itemsFounds')
  input.value = appGlobalState.listEdit.listEditLinks.length

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

function getCurrentFormattedDateTime () {
  const now = new Date()

  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const day = String(now.getDate()).padStart(2, '0')

  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// challenge because race using document.querySelector
function initAppGlobalState () {
  if (!isPageStateInitialized) {
    appGlobalState = JSON.parse(localStorage.getItem(appGlobalStateName)) || {
      globals: {
        maxBackupStates: 50,
        pageListgoingToLink: true,
        currentPage: 0,
        maxPage: parseInt(
          document.querySelector('.page-footer .select-custom').options.length
        ),
        pagesInfo: {},
        itemsStateInfo: {}
        // skippedItems: createProxy({}),
        // itemsInPage: createProxy({})
      },
      listEdit: {
        listEditLinks: [],
        listEditcurrentIndex: 0
      },
      createAt: getCurrentFormattedDateTime()
    }

    // appGlobalState.globals.pagesInfo = createProxy({}, appGlobalState)
    // appGlobalState.globals.mapLinkPage = createProxy({}, appGlobalState)
    // appGlobalState.listEdit.listEditLinks = createProxy([], appGlobalState)

    resetListEditState()
    isPageStateInitialized = true
  }
}

function resetListEditState () {
  if (appGlobalState.globals.currentPage <= appGlobalState.globals.maxPage) {
    // appGlobalState.listEdit = {
    //   listEditLinks: [],
    //   listEditcurrentIndex: 0
    // }
    appGlobalState.listEdit.listEditLinks = []
    appGlobalState.listEdit.listEditcurrentIndex = 0
  }
}

function updateCurrentPage () {
  appGlobalState.globals.currentPage = parseInt(
    document.querySelector('.page-footer .select-custom').value
  )
  // localStorage.setItem('pageInfo', JSON.stringify(pageState))
}

async function goTolistEdit () {
  // setPageInfo()
  if (!appGlobalState.globals.pageListgoingToLink) return
  // put delay in config and calculate the next pag using this
  // await sleep(3000)
  if (appGlobalState.listEdit.listEditLinks.length > 0) {
    // page already exists?
    window.location.href =
      appGlobalState.listEdit.listEditLinks[
        appGlobalState.listEdit.listEditcurrentIndex
      ]
  }
}

// function initPageInfo () {
// if (!appGlobalState.globals.pagesInfo[appGlobalState.globals.currentPage]) {
//   appGlobalState.globals.pagesInfo[appGlobalState.globals.currentPage] =
//     createProxy(
//       {
//         itemsCount: appGlobalState.listEdit.listEditLinks.length,
//         itemsLinks: appGlobalState.listEdit.listEditLinks
//       },
//       appGlobalState
//     )
//   return true
// }
// return false
// }

function setPageInfo () {
  appGlobalState.globals.pagesInfo[appGlobalState.globals.currentPage] = {
    itemsCount: appGlobalState.listEdit.listEditLinks.length,
    itemsLinks: appGlobalState.listEdit.listEditLinks
    // skippedItems: []
  }
  // if (!initPageInfo()) {
  //   appGlobalState.globals.pagesInfo[
  //     appGlobalState.globals.currentPage
  //   ].itemsCount = appGlobalState.listEdit.listEditLinks.length
  //   appGlobalState.globals.pagesInfo[
  //     appGlobalState.globals.currentPage
  //   ].itemsLinks = appGlobalState.listEdit.listEditLinks
  // }
  // debugger
}

function goToNextPage () {
  // initAppGlobalState()
  // setPageInfo()
  if (!appGlobalState.globals.pageListgoingToLink) return
  if (appGlobalState.globals.currentPage < appGlobalState.globals.maxPage) {
    appGlobalState.globals.currentPage += 1
    if (appGlobalState.globals.currentPage > appGlobalState.globals.maxPage) {
      console.log('Finish')
      console.log(
        JSON.stringify(
          JSON.parse(
            localStorage.getItem(window.sharedModule.appGlobalStateName)
          ),
          null,
          2
        )
      )

      return
    }

    // localStorage.setItem('pageInfo', JSON.stringify(pageState))
    // debugger
    window.location.href = `https://www.etsy.com/your/shops/me/tools/listings/page:${appGlobalState.globals.currentPage}`
  }
}

// because the way web frameworks works, an Observer is requiered
// to know when the element exist, window.onload doesn't work
// reminder this observer execute multiple times creating a queue
const observer = new MutationObserver(async function () {
  let elements = document.querySelectorAll(
    'h2.card-meta-row-item.strong.selected-color.card-title'
  )

  if (elements.length > 0) {
    observer.disconnect()
    initAppGlobalState()
    updateCurrentPage()
    // if (!hasObservedRan) {
    //   hasObservedRan = true
    // }

    if (appGlobalState.listEdit.listEditLinks.length === 0) {
      elements.forEach(element => {
        if (element.textContent.toLowerCase().includes('mug')) {
          const link = element.closest('a')
          appGlobalState.globals.itemsStateInfo[link] = {
            page: appGlobalState.globals.currentPage,
            status: itemStatus.NO_PROCESSED
          }
          link.href += '#variations'
          appGlobalState.listEdit.listEditLinks.push(link.href)
        }
      })
    }
    setPageInfo()
    createStartButton()
    createResetAppStateButton(appGlobalState)
    createCurrentPageInput(appGlobalState)
    createItemsFoundsInput()
    saveAppGlobalState(appGlobalState)
    console.log(
      JSON.stringify(
        JSON.parse(
          localStorage.getItem(window.sharedModule.appGlobalStateName)
        ),
        null,
        2
      )
    )
    // debugger
    // await goTolistEdit()
  }
})

observer.observe(document.body, { childList: true, subtree: true })

// setTimeout(() => console.log(JSON.stringify(appGlobalState, null, 2)), 7000)

// race condition if the above goTolistEdit() is delayed due to computer resources
// this timeout will trigger first what is not intended, it must trigger only
// if the current page does not have any item
// setTimeout(() => goToNextPage(), 8000)
