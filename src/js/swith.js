let check = document.querySelector('.check-input');
let bodyEL = document.querySelector('body');
let sunEL = document.querySelector('.header-icon-sun')
let moonEl = document.querySelector('.header-icon-moon')
let labelEL = document.querySelector('.check-lable')
let footerEl = document.querySelector('.footer')


check.addEventListener('change', checkboxClick);



function checkboxClick() {
  footerEl.classList.toggle('footer__text-theme')
  labelEL.classList.toggle('icon-moon-dark')  
  bodyEL.classList.toggle('dark-theme');
  sunEL.classList.toggle('visually-hidden')
  moonEl.classList.toggle('visually-hidden')
 
}
