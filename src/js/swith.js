let check = document.querySelector('.check-input');
check.addEventListener('change', checkboxClick);
let bodyEL = document.querySelector('body');
let colorEl = document.querySelector('.films__title');
let tui = document.querySelectorAll('.tui-pagination');
console.log(tui);

function checkboxClick() {
  bodyEL.classList.toggle('dark-theme');
  console.log(colorEl);
  colorEl.style.color = 'white';
  tui.style.color = 'yellow';
}
