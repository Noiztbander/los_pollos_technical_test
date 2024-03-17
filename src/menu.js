import menuData from './menu.json'
import { addCartProduct } from './cart'
import { createHtmlPrimaryButton } from './utils'
import { getImageSrc } from './utils'

const INITIAL_SELECTED_PRODUCT = menuData.menuList[0]
const selectedProductInformationElement = document.getElementById(
  'selected_product--information'
)
const selectedProductImageContainerElement = document.getElementById(
  'selected_product--image-container'
)
const productsRowElement = document.getElementById('products_list')

function createHtmlImage(product) {
  const productImageElement = document.createElement('img')
  productImageElement.setAttribute('src', getImageSrc(product.menuId))
  productImageElement.setAttribute('alt', product.menuDescription)
  productImageElement.setAttribute('id', product.menuId)
  return productImageElement
}

function createProductGallery() {
  menuData.menuList.forEach((product) => {
    const newProductContainerElement = document.createElement('button')
    newProductContainerElement.classList.add('product_container')

    const productImageElement = createHtmlImage(product)
    productImageElement.addEventListener('click', () =>
      setSelectedProduct(product)
    )

    newProductContainerElement.appendChild(productImageElement)
    productsRowElement.appendChild(newProductContainerElement)
  })
}

function setSelectedProduct(selectedProduct) {
  const productImageElement = createHtmlImage(selectedProduct)

  selectedProductInformationElement.classList.add(
    'product_information--container'
  )
  selectedProductInformationElement.innerHTML = `
  <h1 data-inviewport="title-show-up">${selectedProduct.menuName}</h1>
  <p>${selectedProduct.menuDescription}</p>
  <h3>Price: <span>${selectedProduct.menuPrice}€</span></h3>
  `

  if (selectedProduct.menuDiscoundPercent) {
    const newSaleElement = document.createElement('div')
    newSaleElement.classList.add('sale_container')
    newSaleElement.innerHTML = `
    <p>Discount: ${selectedProduct.menuDiscoundPercent}%</p>
    `
    selectedProductInformationElement.appendChild(newSaleElement)
  }

  selectedProductInformationElement.appendChild(
    createHtmlPrimaryButton('Add to cart', () =>
      addCartProduct(selectedProduct)
    )
  )

  selectedProductImageContainerElement.replaceChildren(productImageElement)
}

createProductGallery()
setSelectedProduct(INITIAL_SELECTED_PRODUCT)
