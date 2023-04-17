let preloader = document.querySelector('.loader-wrapper');
let bodyEl = document.querySelector('body');

window.addEventListener('load', () => {
  preloader.style.display = 'none';
  bodyEl.classList.remove('scroll');
});

export function spinnerOn() {
  bodyEl.classList.add('scroll');
  preloader.style.display = 'block';
}

export function spinnerOff() {
  setTimeout(() => {
    preloader.style.display = 'none';
    bodyEl.classList.remove('scroll');
  }, 500);
}

// export const getLoader = () => {
//   return `
//   <div class="loader-wrapper">
//     <span class="loader"></span>
//   </div>`;
// };

// export const delayLoader = async () => {
//   await new Promise((resolve) => {
//     setTimeout(() => {
//       resolve()
//     }, 500)
//   })
// };
