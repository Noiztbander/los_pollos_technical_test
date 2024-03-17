import productBeerUrl from '@/assets/images/gastro/gasto-item-beer.jpg'
import productChickenBurgerUrl from '@/assets/images/gastro/gasto-item-chicken-buger.jpg'
import productChickenWingsUrl from '@/assets/images/gastro/gasto-item-chicken-wings.jpg'
import productFrenchFriesUrl from '@/assets/images/gastro/gasto-item-french-fries.jpg'
import productFriedChickenUrl from '@/assets/images/gastro/gasto-item-fried-chicken.jpg'
import productMilkShakeUrl from '@/assets/images/gastro/gasto-item-milksake.jpg'

export function createHtmlPrimaryButton(text, action) {
  const buttonElement = document.createElement('button')
  buttonElement.setAttribute('type', 'button')
  buttonElement.setAttribute('alt', text)
  buttonElement.classList.add('primary_btn')
  buttonElement.innerHTML = text
  if (action) {
    buttonElement.addEventListener('click', action)
  }
  return buttonElement
}

export function getImageSrc(menuId) {
  const options = {
    0: productChickenBurgerUrl,
    1: productChickenWingsUrl,
    2: productBeerUrl,
    3: productFrenchFriesUrl,
    4: productMilkShakeUrl,
    5: productFriedChickenUrl,
  }
  return options[menuId]
}

export function generateUniqueId() {
  return 'id' + Date.now().toString(36) + Math.random().toString(36).substr(2)
}
