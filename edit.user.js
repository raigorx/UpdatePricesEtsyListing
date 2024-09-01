// ==UserScript==
// @name         Update Prices Etsy Listing Edit
// @namespace    Violentmonkey Scripts
// @version      0.1
// @description  Automatically clicks on links with "mug" in the title on the specified webpage
// @author       Raigorx Hellscream
// @match        https://www.etsy.com/your/shops/me/listing-editor/edit/*
// @grant        none
// @top-level-await
// ==/UserScript==

;(async function () {
  'use strict'

  const appGlobalStateName = window.sharedModule.appGlobalStateName

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
    const pageState = JSON.parse(localStorage.getItem(appGlobalStateName))
    if (
      pageState.listEdit.listEditcurrentIndex <
      pageState.listEdit.listEditLinks.length - 1
    ) {
      // observer.disconnect()
      pageState.listEdit.listEditcurrentIndex += 1
      const linkToClick =
        pageState.listEdit.listEditLinks[
          pageState.listEdit.listEditcurrentIndex
        ]
      localStorage.setItem(appGlobalStateName, JSON.stringify(pageState))
      window.location.href = linkToClick
    } else {
      if (pageState.globals.currentPage < pageState.globals.maxPage) {
        // observer.disconnect()
        pageState.globals.currentPage += 1
        if (pageState.globals.currentPage > pageState.globals.maxPage) {
          console.log('Finish')
          pageState.globals.totalItems = 0
          Object.values(pageState.globals.itemsInPage).forEach(page => {
            pageState.globals.totalItems += page.itemsLinks.length
          })
          localStorage.setItem(appGlobalStateName, JSON.stringify(pageState))
          console.log(pageState)

          return
        }

        localStorage.setItem(appGlobalStateName, JSON.stringify(pageState))
        window.location.href = `https://www.etsy.com/your/shops/me/tools/listings/page:${pageState.globals.currentPage}`
      }
    }
  }

  const appGlobalState = JSON.parse(localStorage.getItem(appGlobalStateName))
  initSkipState()

  function savePageState () {
    localStorage.setItem(appGlobalStateName, JSON.stringify(appGlobalState))
  }

  function createSkipButton () {
    const button = document.createElement('button')
    button.textContent = 'Skip Current Item'
    button.style.position = 'fixed'
    button.style.bottom = '10px'
    button.style.left = '10px'
    button.style.zIndex = '9999'
    button.style.padding = '10px 20px'
    button.style.backgroundColor = '#007bff'
    button.style.color = '#fff'
    button.style.border = 'none'
    button.style.borderRadius = '5px'
    button.style.cursor = 'pointer'

    button.onclick = () => window.skipCurrentItem()

    document.body.appendChild(button)
  }

  function initSkipState () {
    appGlobalState.globals.skippedItems[appGlobalState.globals.currentPage] =
      appGlobalState.globals.skippedItems[
        appGlobalState.globals.currentPage
      ] || { itemsLinks: [] }
    savePageState()
  }

  window.skipCurrentItem = function () {
    appGlobalState.globals.skippedItems[
      appGlobalState.globals.currentPage
    ].itemsLinks.push(
      appGlobalState.listEdit.listEditLinks[
        appGlobalState.listEdit.listEditcurrentIndex
      ]
    )
    savePageState()
    goToNextList()
  }

  window.onload = async function () {
    console.log(`Current State`)
    console.log(JSON.stringify(appGlobalState, null, 2))

    createSkipButton()
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
      // await sleep()
      // goToNextList()
      const submitButton = document.querySelector(submitButtonSelector)
      submitButton.disabled = false
      submitButton.onclick = function () {
        // Your event handler code here
        console.log('Submit button clicked')
        goToNextList()
      }
    } else {
      alert('No items found')
    }
  }
})()
