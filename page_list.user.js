// ==UserScript==
// @name         Update Prices Etsy Listing Page
// @namespace    Violentmonkey Scripts
// @version      0.2
// @description  Automatically clicks on links with "mug" in the title on the specified webpage
// @author       Raigorx Hellscream
// @match        https://www.etsy.com/your/shops/me/tools/listings/page:*
// @grant        none
// @require https://my.cdn.com/jquery.js
// @top-level-await
// ==/UserScript==

;(async function () {
  'use strict'

  const appGlobalStateName = window.sharedModule.appGlobalStateName

  let appGlobalState = null
  // avoid re-init as consequence of multiple mutation observers calls
  let isPageStateInitialized = false

  function saveAppGlobalState () {
    // debugger
    localStorage.setItem(appGlobalStateName, JSON.stringify(appGlobalState))
  }

  function createNestedProxy (target) {
    return new Proxy(target, {
      set (obj, prop, value) {
        if (typeof value === 'object' && value !== null) {
          value = createNestedProxy(value)
        }
        obj[prop] = value
        saveAppGlobalState()
        return true
      }
    })
  }

  // challenge because race using document.querySelector
  function initAppGlobalState () {
    if (!isPageStateInitialized) {
      appGlobalState = createNestedProxy(
        JSON.parse(localStorage.getItem(appGlobalStateName)) || {
          globals: {
            pageListgoingToLink: true,
            currentPage: parseInt(
              document.querySelector('.page-footer .select-custom').value
            ),
            maxPage: parseInt(
              document.querySelector('.page-footer .select-custom').options
                .length
            ),
            skippedItems: createNestedProxy({}),
            itemsInPage: createNestedProxy({})
          },
          listEdit: {
            listEditLinks: createNestedProxy([]),
            listEditcurrentIndex: 0
          }
        }
      )

      resetListEditState()
      isPageStateInitialized = true
    }
  }

  function resetListEditState () {
    if (appGlobalState.globals.currentPage <= appGlobalState.globals.maxPage) {
      appGlobalState.listEdit = {
        listEditLinks: [],
        listEditcurrentIndex: 0
      }
    }
  }

  function updateCurrentPage () {
    appGlobalState.currentPage = parseInt(
      document.querySelector('.page-footer .select-custom').value
    )
    // localStorage.setItem('pageInfo', JSON.stringify(pageState))
  }

  async function goTolistEdit () {
    setPageInfo()
    if (!appGlobalState.globals.pageListgoingToLink) return
    // put delay in config and calculate the next pag using this
    await sleep(5000)
    if (appGlobalState.listEdit.listEditLinks.length > 0) {
      // page already exists?
      window.location.href =
        appGlobalState.listEdit.listEditLinks[
          appGlobalState.listEdit.listEditcurrentIndex
        ]
    }
  }

  function initPageInfo () {
    if (
      !appGlobalState.globals.itemsInPage[appGlobalState.globals.currentPage]
    ) {
      appGlobalState.globals.itemsInPage[appGlobalState.globals.currentPage] = {
        itemsCount: appGlobalState.listEdit.listEditLinks.length,
        itemsLinks: appGlobalState.listEdit.listEditLinks
      }
      return true
    }
    return false
  }

  function setPageInfo () {
    updateCurrentPage()
    if (!initPageInfo()) {
      appGlobalState.globals.itemsInPage[
        appGlobalState.globals.currentPage
      ].itemsCount = appGlobalState.listEdit.listEditLinks.length
      appGlobalState.globals.itemsInPage[
        appGlobalState.globals.currentPage
      ].itemsLinks = appGlobalState.listEdit.listEditLinks
    }
    // debugger
  }

  function goToNextPage () {
    initAppGlobalState()
    setPageInfo()
    if (!appGlobalState.globals.pageListgoingToLink) return
    if (appGlobalState.globals.currentPage < appGlobalState.globals.maxPage) {
      appGlobalState.globals.currentPage += 1
      if (appGlobalState.globals.currentPage > appGlobalState.globals.maxPage) {
        console.log('Finish')
        console.log(JSON.parse(localStorage.getItem(appGlobalStateName)))
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

      if (appGlobalState.listEdit.listEditLinks.length === 0) {
        elements.forEach(element => {
          if (element.textContent.toLowerCase().includes('mug')) {
            const link = element.closest('a')
            link.href += '#variations'
            appGlobalState.listEdit.listEditLinks.push(link.href)
          }
        })
      }
      // debugger
      await goTolistEdit()
    }
  })

  observer.observe(document.body, { childList: true, subtree: true })
  // race condition if the above goTolistEdit() is delayed due to computer resources
  // this timeout will trigger first what is not intended, it must trigger only
  // if the current page does not have any item

  // setTimeout(() => goToNextPage(), 8000)
})()
