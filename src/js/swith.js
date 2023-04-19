let check = document.querySelector('.check-input');
let bodyEL = document.querySelector('body');
let sunEL = document.querySelector('.header-icon-sun');
let moonEl = document.querySelector('.header-icon-moon');
let labelEL = document.querySelector('.check-lable');
let footerEl = document.querySelector('.footer');

check.addEventListener('change', checkboxClick);
window.addEventListener('load', onLoadTheme);

function checkboxClick() {
  changeTheme();
}

function onLoadTheme() {
  check.addEventListener('click', onInputClick);
  let summ = 0;
  function onInputClick() {
    summ += 1;

    if (summ % 2 === 1) {
      localStorage.setItem('theme', 'dark');
    }
    if (summ % 2 === 0) {
      localStorage.removeItem('theme');
    }
  }

  if (localStorage.getItem('theme') === 'dark') {
    summ = 1;
    changeTheme();
  }
}

function changeTheme() {
  footerEl.classList.toggle('footer__text-theme');
  labelEL.classList.toggle('icon-moon-dark');
  bodyEL.classList.toggle('dark-theme');
  sunEL.classList.toggle('visually-hidden');
  moonEl.classList.toggle('visually-hidden');
}
