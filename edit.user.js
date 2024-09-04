// ==UserScript==
// @name         Update Prices Etsy Listing Edit
// @namespace    Violentmonkey Scripts
// @version      0.1
// @description  Automatically clicks on links with "mug" in the title on the specified webpage
// @author       Raigorx Hellscream
// @match        https://www.etsy.com/your/shops/me/listing-editor/edit/*
// @grant        none
// @require https://raw.githubusercontent.com/raigorx/UpdatePricesEtsyListing/main/shared.js
// @top-level-await
// ==/UserScript==
'use strict'

const appGlobalStateName = window.sharedModule.appGlobalStateName
const saveAppGlobalState = window.sharedModule.saveAppGlobalState
const itemStatus = window.sharedModule.itemStatus
const createResetAppStateButton = window.sharedModule.createResetAppStateButton

const newPrices = {
  'all white 11 oz': 26.65,
  'handle 15 oz': 36.65,
  'handle 11 oz': 29.31,
  'all black 15 oz': 36.65,
  'all white 15 oz': 35.99
}

const variantPriceBaseSelector = '#field-variations > div'
const variantPricePossibleSelector =
  'div.wt-display-block.wt-overflow-x-auto table > tbody > tr:nth-child(1) > td.wt-table__row__cell.wt-vertical-align-top.wt-pr-xs-2.le-line-height-48.wt-no-wrap.wt-pl-xs-2'

const submitButtonSelector =
  '#form-footer > div > div.le-footer__actions.wt-display-flex-xs.wt-flex-direction-row-lg.wt-no-wrap.wt-flex-direction-column-xs.wt-flex-grow-xs-1.wt-justify-content-flex-end.wt-width-full-xs.wt-width-auto-lg > button.wt-btn.wt-btn--primary'

// const globalDelay = 6000

function goToNextList () {
  // validate that in fact them exist
  // const pageState = JSON.parse(localStorage.getItem(appGlobalStateName))
  if (
    appGlobalState.listEdit.listEditcurrentIndex <
    appGlobalState.listEdit.listEditLinks.length - 1
  ) {
    // observer.disconnect()
    appGlobalState.listEdit.listEditcurrentIndex += 1
    const nextItemLink =
      appGlobalState.listEdit.listEditLinks[
        appGlobalState.listEdit.listEditcurrentIndex
      ]
    saveAppGlobalState(appGlobalState)
    window.location.href = nextItemLink
  } else {
    if (currentItemPage < appGlobalState.globals.maxPage) {
      // observer.disconnect()
      appGlobalState.globals.currentPage = currentItemPage + 1
      if (appGlobalState.globals.currentPage > appGlobalState.globals.maxPage) {
        saveAppGlobalState(appGlobalState)
        alert('Last item in final page reached')
        // appGlobalStateName.globals.totalItems = 0
        // Object.values(appGlobalStateName.globals.pagesInfo).forEach(page => {
        //   appGlobalStateName.globals.totalItems += page.itemsLinks.length
        // })
        // localStorage.setItem(appGlobalStateName, JSON.stringify(pageState))
        // console.log(pageState)

        return
      }
      saveAppGlobalState(appGlobalState)
      // localStorage.setItem(appGlobalStateName, JSON.stringify(pageState))
      window.location.href = `https://www.etsy.com/your/shops/me/tools/listings/page:${pageState.globals.currentPage}`
    }
  }
}

const appGlobalState = JSON.parse(localStorage.getItem(appGlobalStateName))
const currentLink = window.location.href.split('#')[0]
const currentItemPage = appGlobalState.globals.itemsStateInfo[currentLink].page

// initSkipState()

// function savePageState (appGlobalState) {
//   localStorage.setItem(appGlobalStateName, JSON.stringify(appGlobalState))
// }

function createSkipButton () {
  const button = document.createElement('button')
  button.textContent = 'Skip Current Item'
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

  button.onclick = () => window.skipCurrentItem()

  document.body.appendChild(button)
}

function createItemStatusDiv () {
  const div = document.createElement('div')
  div.textContent = `${appGlobalState.globals.itemsStateInfo[currentLink].status}`
  div.style.position = 'fixed'
  div.style.bottom = '237px'
  div.style.left = '10px'
  div.style.zIndex = '9999'
  div.style.padding = '10px 20px'
  div.style.backgroundColor = '#000'
  div.style.color = '#fff'
  div.style.border = 'none'

  document.body.appendChild(div)
}

// function initSkipState () {
//   appGlobalState.globals.pagesInfo[currentItemPage].skippedItems =
//     appGlobalState.globals.pagesInfo[currentItemPage].skippedItems || []
//   savePageState()
// }

window.skipCurrentItem = function () {
  // appGlobalState.globals.pagesInfo[currentItemPage].skippedItems.push(
  //   currentLink
  // )
  if (
    appGlobalState.globals.itemsStateInfo[currentLink].status !==
    itemStatus.PROCESSED
  ) {
    appGlobalState.globals.itemsStateInfo[currentLink].status =
      itemStatus.SKIPPED
  }
  saveAppGlobalState(appGlobalState)
  goToNextList()
}

window.onload = async function () {
  createSkipButton()
  createItemStatusDiv()
  window.sharedModule.createResetAppStateButton(appGlobalState)
  window.sharedModule.createCurrentPageInput(appGlobalState)
  window.sharedModule.createItemsLeftInput(appGlobalState)
  const possibleVariantPrices = document.querySelectorAll(
    variantPriceBaseSelector
  )

  let variantPrice = null

  for (const possibleVariantPrice of possibleVariantPrices) {
    variantPrice = possibleVariantPrice.querySelector(
      variantPricePossibleSelector
    )
    if (variantPrice) {
      variantPrice = possibleVariantPrice.querySelectorAll(
        'div.wt-display-block.wt-overflow-x-auto > table > tbody > tr'
      )
      break
    }
  }

  let matchCount = 0

  if (variantPrice) {
    // console.log(variantPrice)

    variantPrice.forEach(function (row, index) {
      const variantTD = row.querySelector(
        '.wt-table__row__cell.wt-vertical-align-top.wt-pr-xs-2.le-line-height-48.wt-no-wrap.wt-pl-xs-2'
      )

      const variantPriceInput = row.querySelector(
        'input[type="text"].wt-input.wt-pl-xs-5'
      )

      if (variantTD && variantPriceInput) {
        Object.keys(newPrices).forEach(function (key) {
          if (variantTD.textContent.toLowerCase().includes(key)) {
            matchCount++

            // race condition prone
            const intervalId = setInterval(() => {
              variantPriceInput.value = newPrices[key]
              variantPriceInput.focus()
              variantPriceInput.blur()
            }, 50)
            setTimeout(() => clearInterval(intervalId), 2000)

            // console.log('Value: ', input.value)
          }
        })
      }
    })

    if (matchCount !== variantPrice.length) {
      const errorMsg = `The numbers of variant prices do not match variants founds.
        variants founds ${matchCount} variant prices ${variantPrice.length}`

      alert(errorMsg)

      throw new Error(errorMsg)
    }
    // console.log(
    //   JSON.parse(localStorage.getItem('pageInfo')).globals.itemsInPage
    // )
    // console.log(JSON.parse(localStorage.getItem('pageInfo')).listEdit)
    // await sleep(2000)
    // goToNextList()
    const submitButton = document.querySelector(submitButtonSelector)
    submitButton.disabled = false
    submitButton.onclick = function () {
      console.log('Submit button clicked')
      appGlobalState.globals.itemsStateInfo[currentLink].status =
        itemStatus.PROCESSED
      saveAppGlobalState(appGlobalState)
      goToNextList()
    }
  } else {
    alert('No input prices found, Reloading the page can fix the problem')
  }
  saveAppGlobalState(appGlobalState)
  console.log(`Current State`)
  console.log(
    JSON.stringify(
      JSON.parse(localStorage.getItem(window.sharedModule.appGlobalStateName)),
      null,
      2
    )
  )
}
