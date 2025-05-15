const variantSelector = '.wt-table__row'

const colorSizeSelector =
  '.wt-table__row__cell.wt-vertical-align-top.wt-pr-xs-2.le-line-height-48.wt-no-wrap.wt-pl-xs-2'

const priceSelector = 'input.wt-input.wt-pl-xs-5'

const visibleSelector = 'input.wt-switch.wt-switch--small'

const variantElements = document.querySelectorAll(variantSelector)

const male = true

const mustNotVisibleMale = [
  ['Black', 'Unisex T-shirt XXXS'],
  ['Dark Grey Heather', 'Tank Tops'],
  ['Dark Grey Heather', 'Unisex T-shirt XXXS'],
  ['Heather Navy', 'V-Neck'],
  ['Heather Navy', 'Tank Tops'],
  ['Heather Navy', 'Unisex T-shirt XXXS'],
  ['Light Blue', 'V-Neck'],
  ['Light Blue', 'Tank Tops'],
  ['Light Blue', 'Unisex T-shirt XXXS'],
  ['Natural', 'V-Neck'],
  ['Natural', 'Tank Tops'],
  ['Natural', 'Unisex T-shirt XXXS'],
  ['Navy', 'Unisex T-shirt XXXS'],
  ['Pink', 'V-Neck'],
  ['Pink', 'Tank Tops'],
  ['Pink', 'Unisex T-shirt XXXS'],
  ['Silver', 'V-Neck'],
  ['Silver', 'Tank Tops'],
  ['Silver', 'Unisex T-shirt XXXS'],
  ['Soft Cream', 'V-Neck'],
  ['Soft Cream', 'Tank Tops'],
  ['Soft Cream', 'Unisex T-shirt XXXS'],
  ['Heather Ice Blue', 'V-Neck'],
  ['Heather Ice Blue', 'Tank Tops'],
  ['Heather Ice Blue', 'Unisex T-shirt XXXS'],
  ['Heather True Royal', 'V-Neck'],
  ['Heather True Royal', 'Tank Tops'],
  ['Heather True Royal', 'Unisex T-shirt XXXS'],
  ['Heather Mauve', 'V-Neck'],
  ['Heather Mauve', 'Tank Tops'],
  ['Heather Mauve', 'Unisex T-shirt XXXS'],
  ['Heather Maroon', 'V-Neck'],
  ['Heather Maroon', 'Tank Tops'],
  ['Heather Maroon', 'Unisex T-shirt XXXS'],
  ['Military Green', 'V-Neck'],
  ['Military Green', 'Tank Tops'],
  ['Military Green', 'Unisex T-shirt XXXS'],
  ['Heather Deep Teal', 'V-Neck'],
  ['Heather Deep Teal', 'Tank Tops'],
  ['Heather Deep Teal', 'Unisex T-shirt XXXS'],
  ['Heather Brown', 'V-Neck'],
  ['Heather Brown', 'Tank Tops'],
  ['Heather Brown', 'Unisex T-shirt XXXS'],
  ['Heather Dust', 'V-Neck'],
  ['Heather Dust', 'Tank Tops'],
  ['Heather Dust', 'Unisex T-shirt XXXS'],
  ['Dark Grey', 'V-Neck'],
  ['Dark Grey', 'Unisex T-shirt XS'],
  ['Dark Grey', 'Unisex T-shirt XXXS'],
  ['True Royal', 'Unisex T-shirt'],
  ['True Royal', 'V-Neck'],
  ['True Royal', 'Unisex T-shirt XS'],
  ['True Royal', 'Unisex T-shirt XXXS']
]

const mustNotVisibleFemale = [
  ['Black', 'Unisex T-shirt XXXS'],
  ['Dark Grey Heather', 'Tank Tops'],
  ['Dark Grey Heather', 'Unisex T-shirt XXXS'],
  ['Heather Navy', 'V-Neck'],
  ['Heather Navy', 'Tank Tops'],
  ['Heather Navy', 'Unisex T-shirt XXXS'],
  ['Light Blue', 'V-Neck'],
  ['Light Blue', 'Tank Tops'],
  ['Light Blue', 'Unisex T-shirt XXXS'],
  ['Natural', 'V-Neck'],
  ['Natural', 'Tank Tops'],
  ['Natural', 'Unisex T-shirt XXXS'],
  ['Navy', 'Tank Tops'],
  ['Navy', 'Unisex T-shirt XXXS'],
  ['Pink', 'V-Neck'],
  ['Pink', 'Tank Tops'],
  ['Pink', 'Unisex T-shirt XXXS'],
  ['Silver', 'V-Neck'],
  ['Silver', 'Tank Tops'],
  ['Silver', 'Unisex T-shirt XXXS'],
  ['Soft Cream', 'V-Neck'],
  ['Soft Cream', 'Tank Tops'],
  ['Soft Cream', 'Unisex T-shirt XXXS'],
  ['Heather Ice Blue', 'V-Neck'],
  ['Heather Ice Blue', 'Tank Tops'],
  ['Heather Ice Blue', 'Unisex T-shirt XXXS'],
  ['Heather True Royal', 'Tank Tops'],
  ['Heather True Royal', 'Unisex T-shirt XXXS'],
  ['Heather Mauve', 'V-Neck'],
  ['Heather Mauve', 'Tank Tops'],
  ['Heather Mauve', 'Unisex T-shirt XXXS'],
  ['Heather Maroon', 'V-Neck'],
  ['Heather Maroon', 'Tank Tops'],
  ['Heather Maroon', 'Unisex T-shirt XXXS'],
  ['Military Green', 'V-Neck'],
  ['Military Green', 'Tank Tops'],
  ['Military Green', 'Unisex T-shirt XXXS'],
  ['Heather Deep Teal', 'V-Neck'],
  ['Heather Deep Teal', 'Tank Tops'],
  ['Heather Deep Teal', 'Unisex T-shirt XXXS'],
  ['Heather Brown', 'V-Neck'],
  ['Heather Brown', 'Tank Tops'],
  ['Heather Brown', 'Unisex T-shirt XXXS'],
  ['Heather Dust', 'V-Neck'],
  ['Heather Dust', 'Tank Tops'],
  ['Heather Dust', 'Unisex T-shirt XXXS'],
  ['Heather Team Purple', 'V-Neck'],
  ['Heather Team Purple', 'Tank Tops'],
  ['Heather Team Purple', 'Unisex T-shirt XXXS'],
  ['Dark Grey', 'Unisex T-shirt'],
  ['Dark Grey', 'V-Neck'],
  ['Dark Grey', 'Unisex T-shirt XS'],
  ['Dark Grey', 'Unisex T-shirt XXXS'],
  ['True Royal', 'Unisex T-shirt'],
  ['True Royal', 'V-Neck'],
  ['True Royal', 'Unisex T-shirt XS'],
  ['True Royal', 'Unisex T-shirt XXXS']
]

const pricesToInput = [
  ['Unisex T-shirt S', '47.65'],
  ['Unisex T-shirt M', '47.65'],
  ['Unisex T-shirt L', '47.65'],
  ['Unisex T-shirt XL', '47.65'],
  ['Unisex T-shirt 2XL', '51.65'],
  ['Unisex T-shirt 3XL', '54.99'],
  ['V-Neck S', '50.99'],
  ['V-Neck M', '50.99'],
  ['V-Neck L', '50.99'],
  ['V-Neck XL', '50.99'],
  ['V-Neck 2XL', '54.31'],
  ['Tank Tops S', '47.65'],
  ['Tank Tops M', '47.65'],
  ['Tank Tops L', '47.65'],
  ['Tank Tops XL', '47.65'],
  ['Tank Tops 2XL', '51.65'],
  ['Unisex T-shirt XS', '47.65'],
  ['Unisex T-shirt XXXS', '24.99']
]

function setReactInputValue (element, value) {
  const input = element

  // 1. Focus the element
  input.focus()

  // 2. Set the value directly (triggers React's onChange handler)
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value'
  ).set
  nativeInputValueSetter.call(input, value)

  // 3. Dispatch proper input and change events
  input.dispatchEvent(new Event('input', { bubbles: true }))
  input.dispatchEvent(new Event('change', { bubbles: true }))

  // 4. Blur to trigger potential validation
  input.blur()
}

variantElements.forEach(variant => {
  // timeIncrement = 0
  // setTimeout(() => {
  //   setTimeout(() => {}, 600)

  // }, 500 + timeIncrement)
  // timeIncrement += 10

  let color = ''
  let size = ''
  // let price = null
  let isVisible = true
  variant.querySelectorAll(colorSizeSelector).forEach((colorSize, index) => {
    if (index === 0) color = colorSize.textContent
    if (index === 1) size = colorSize.textContent
  })

  const mustNotVisible = male ? mustNotVisibleMale : mustNotVisibleFemale

  for (const [_color, _size] of mustNotVisible) {
    if (color === _color && size.includes(_size)) {
      variant.querySelector(visibleSelector).focus()
      variant.querySelector(visibleSelector).checked = false
      isVisible = false
      variant.querySelector(visibleSelector).dispatchEvent(new Event('change'))
      variant.querySelector(visibleSelector).blur()
      // return
      break
    }
  }

  if (isVisible) {
    const priceElement = variant.querySelector(priceSelector)
    if (priceElement) {
      // price = priceElement.value
      // priceElement.value
      for (priceToInput of pricesToInput) {
        if (size === priceToInput[0]) {
          // if (size === 'V-Neck S') debugger
          // priceElement.value = priceToInput[1]
          // priceElement.focus()
          // priceElement.dispatchEvent(new Event('change'))
          // priceElement.blur()
          setReactInputValue(priceElement, priceToInput[1])
          // console.log(`${priceToInput[1]}`)
          break
        }
      }
      // pricesToInput.some(priceToInput => {
      //   if (size === priceToInput[0]) {
      //     // console.log('price set')
      //     priceElement.focus()
      //     priceElement.value = priceToInput[1]
      //     priceElement.dispatchEvent(new Event('change'))
      //     priceElement.blur()
      //     return true
      //   }
      //   return false
      // })
    }
  }
})
console.log('Finished')
