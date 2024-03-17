// eslint-disable-next-line no-unused-vars
const inViewport = (entries, _observer) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('is-inViewport', entry.isIntersecting)
  })
}

const Obs = new IntersectionObserver(inViewport)
const obsOptions = {
  root: null,
  rootMargin: '10px',
  threshold: 0.5,
}

document.querySelectorAll('[data-inviewport]').forEach((el) => {
  Obs.observe(el, obsOptions)
})
