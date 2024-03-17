import { createHtmlPrimaryButton, generateUniqueId } from './utils'
import { getImageSrc } from './utils'

const cartContainerElement = document.getElementById('cart_section')
const cartListElement = document.getElementById('cart_products--list')
const cartTotalPriceElement = document.getElementById(
  'cart_products--total-price'
)
const cartBasePriceWithoutVATElement = document.getElementById(
  'cart_products--base-price'
)
const productsNodesList = cartListElement.childNodes
const BASE_VAT_SPAIN = 21

function createHtmlProductList(product) {
  const productListElement = document.createElement('li')
  const uniqueId = generateUniqueId()

  productListElement.classList.add('product_list')
  productListElement.setAttribute('id', product.menuId)
  productListElement.dataset.uniqueId = uniqueId
  productListElement.dataset.priceValue = getProductPrice(product)
  productListElement.innerHTML = `
  <div class='image_container'><img src="${getImageSrc(product.menuId)}"></div>
  <p>${product.menuName}</p>
  <h3>${getProductTitlePrice(product)}</h3>
  `
  productListElement.appendChild(
    createHtmlPrimaryButton('X', () => removeCartProduct(uniqueId))
  )

  return productListElement
}

export function addCartProduct(product) {
  const newProduct = createHtmlProductList(product)
  cartListElement.appendChild(newProduct)

  updateCartTotalPrice()
}

function removeCartProduct(uniqueId) {
  const productsNodesList = cartListElement.childNodes
  productsNodesList.forEach((product) => {
    if (product.getAttribute('data-unique-id') === uniqueId) {
      product.remove()
    }
  })

  updateCartTotalPrice()
}

function getProductTitlePrice(product) {
  let productPrice = getProductPrice(product)

  if (product.menuDiscoundPercent) {
    return `${productPrice}€ <span>${product.menuDiscoundPercent}%</span>`
  }

  return `${productPrice}€`
}

function getProductPrice(product) {
  let productPrice = product.menuPrice

  if (product.menuDiscoundPercent) {
    const discountValue =
      productPrice * ((100 - product.menuDiscoundPercent) / 100)
    return discountValue.toFixed(2)
  }

  return productPrice
}

function getBasePrice() {
  let basePrice = 0
  productsNodesList.forEach((product) => {
    basePrice += Number(product.getAttribute('data-price-value'))
  })
  return basePrice
}

function setBasePriceTitle() {
  const title = `Base price: ${getBasePrice().toFixed(
    2
  )} + ${BASE_VAT_SPAIN}% VAT`
  cartBasePriceWithoutVATElement.replaceChildren(title)
}

function getTotalPrice() {
  const basePrice = getBasePrice()
  const finalPrice = basePrice + basePrice * (BASE_VAT_SPAIN / 100)

  return finalPrice
}

function setTotalPriceTitle() {
  getTotalPrice()
  cartTotalPriceElement.innerHTML = `${getTotalPrice().toFixed(2)}€`
}

function updateCartTotalPrice() {
  setBasePriceTitle()
  setTotalPriceTitle()
  toggleCartVisualization()
}

function toggleCartVisualization() {
  if (productsNodesList.length > 0) {
    cartContainerElement.classList.remove('cart_closed')
    cartContainerElement.classList.add('cart_opened')
  } else {
    cartContainerElement.classList.remove('cart_opened')
    cartContainerElement.classList.add('cart_closed')
  }
}
