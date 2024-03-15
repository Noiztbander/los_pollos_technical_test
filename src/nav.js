const navMenuButton = document.getElementById('nav_menu--button')
const navMenu = document.getElementById('nav_menu')

const onNavButtonClick = () => {
  navMenuButton.classList.toggle('menu_button--opened')
  navMenu.classList.toggle('nav_opened')
}

navMenuButton.addEventListener('click', onNavButtonClick)
