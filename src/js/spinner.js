window.addEventListener('load', () => {
  // let preloader = document.querySelector('.loader');
  let bodyEl = document.querySelector('body');
  // preloader.style.display = 'none';
  bodyEl.classList.remove('scroll');
});

export const getLoader = () => {
  return `
  <div class="loader-wrapper">
    <span class="loader"></span>
  </div>`
};

export const delayLoader = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 500)
  })
};