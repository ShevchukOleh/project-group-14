window.addEventListener('load', () => {
  let preloader = document.querySelector('.loader');
  let bodyEl = document.querySelector('body');
  preloader.style.display = 'none';
  bodyEl.classList.remove('scroll');
});
