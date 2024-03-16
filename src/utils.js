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

export function generateUniqueId() {
	return "id" + Date.now().toString(36) + Math.random().toString(36).substr(2);
}