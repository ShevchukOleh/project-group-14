import { LOCAL_STORAGE_FIELDS_NAME } from '../constant/constant';
import { getListOfFilm } from './localStore';
import { BASE_IMAGE_URL } from './render-gallery';
import { spinnerOn, spinnerOff } from './spinner';

const refs = {
  btnHeaderWatched: document.querySelector('button[data-watched]'),
  btnHeaderQueue: document.querySelector('button[data-queue]'),
  galleryContainer: document.querySelector('.library-films'),
};

refs.btnHeaderWatched.addEventListener('click', onBtnHeaderWathedClick);
refs.btnHeaderQueue.addEventListener('click', onBtnHeaderQueueClick);

async function onBtnHeaderWathedClick(e) {
  spinnerOn();
  const listWatches = getListOfFilm(LOCAL_STORAGE_FIELDS_NAME.LIST_OF_WATCHES);

  const markup = await createGalleryCardMarkup(listWatches);

  refs.btnHeaderWatched.classList.add('active');
  refs.btnHeaderQueue.classList.remove('active');
  spinnerOff();
  if (listWatches.length === 0) {
    refs.galleryContainer.innerHTML =
      '<li style="color: #b92f2c;margin-left: auto; margin-right: auto; text-align: center">Your list empty! Add any films!</li>';
    return;
  }
  return (refs.galleryContainer.innerHTML = markup);
}
setTimeout(() => onBtnHeaderWathedClick(), 100);

async function onBtnHeaderQueueClick(e) {
  spinnerOn();
  const listQueue = getListOfFilm(LOCAL_STORAGE_FIELDS_NAME.LIST_OF_QUEUE);
  const markup = await createGalleryCardMarkup(listQueue);

  refs.btnHeaderWatched.classList.remove('active');
  refs.btnHeaderQueue.classList.add('active');
  spinnerOff();

  if (listQueue.length === 0) {
    refs.galleryContainer.innerHTML =
      '<li style="color: #b92f2c;margin-left: auto; margin-right: auto; text-align: center">Your list empty! Add any films!</li>';
    return;
  }
  return (refs.galleryContainer.innerHTML = markup);
}

const getGenres = genres => {
  const result = genres
    .slice(0, 2)
    .map(({ name }) => name)
    .join(', ');
  return genres.length > 2 ? result + ', Other' : result;
};

function createGalleryCardMarkup(films) {
  return films
    .map(({ genres, poster_path, title, original_title, release_date, id }) => {
      return `<li class="films__item" data-mvid='${id}'>
                  <div class="films__img">
                    <img src="${BASE_IMAGE_URL}w500${poster_path}" alt='Poster ${original_title}'data-mvid='${id}' loading='lazy' />
                  </div>
                  <div class="films__description" data-mvid='${id}'>
                    <p class="films__title" data-mvid='${id}'>
                      <b data-mvid='${id}'>${title.toUpperCase()}</b>
                    </p>
                    <div class="films__meta" data-mvid='${id}'>
                      <p class="films__genres" data-mvid='${id}'>${getGenres(
        genres
      )}</p>
                      <p class="films__data" data-mvid='${id}'>${release_date.slice(
        0,
        4
      )}</p>
                    </div>
                  </div>
                </li>`;
    })
    .join('');
}
