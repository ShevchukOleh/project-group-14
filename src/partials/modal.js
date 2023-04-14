import * as basicLightbox from 'basiclightbox';
import '../sass/_modall.scss';

import MoviesApiService from './movies_service';
const moviesApiService = new MoviesApiService();
const pEl = document.querySelector('.modal__about-text');
pEl.addEventListener('click', largeMovieItem);

const Handlebars = require('handlebars');
const template = Handlebars.compile(
  "<div class='modal'><div class='modal__container-picture'><img class='modal__picture' src={{img}} alt='icon-film'/></div><div><h2 class='modal__title'>{{title}}</h2><div class='modal__char'><span class='modal__char-name'>Vote / Votes</span><p class='modal__char-api'><span class='modal__char-api modal__vote'>{{vote}}</span> / <span class='modal__char-api'>{{votes}}</span></p></div><p class='modal__char'><span class='modal__char-name'>Popularity</span><span class='modal__char-api'>{{popularity}}</span></p><p class='modal__char'><span class='modal__char-name'>Original Title</span><span class='modal__char-api'>{{origin_title}}</span></p><p class='modal__char modal__char-mb'><span class='modal__char-name'>Genre</span><span class='modal__char-api'>{{genres}}</span></p><p class='modal__about-title'>About</p><p class='modal__about-text'>{{about}}</p><div class='modal__btn-container'><button class='modal__btn modal__btn-mr' type='button'>ADD TO WATCHED</button><button class='modal__btn' type='button'>ADD TO QUEUE</button></div><button class='modal__close' type='button'><svg width='30' height='30'><use class='modal__close-icon' href='./symbol-defs.svg#icon-close_40px'></use></svg></button></div></div>"
);

function largeMovieItem(event) {
  if (
    event.target.nodeName != 'P'
    // event.target.nodeName != 'A' &&
    // event.target.nodeName != 'IMG' &&
    // event.target.nodeName != 'P' &&
    // event.target.nodeName != 'SPAN'
  ) {
    return;
  }
  const markup = moviesApiService
    .getMovieId(event.target.dataset.id)
    .then(({ genres, poster_path, original_title, popularity, overview }) => {
      const info = {
        vote: '10',
        votes: '1000',
        genres: genres.map(gener => ` ${gener.name}`),
        title: original_title,
        img: `https://image.tmdb.org/t/p/w500${poster_path}`,
        popularity: popularity,
        origin_title: original_title,
        about: overview,
      };
      const render = template(info);
      const instance = basicLightbox.create(render);

      instance.show();
    })
    .catch(er => console.log(er));

  document.addEventListener('keydown', handleOutBackdrop);

  function handleOutBackdrop(event) {
    if (event.key === 'Escape' || event.key === ' ' || event.key === 'Enter') {
      instance.close();
    }
    if (!basicLightbox.visible()) {
      document.removeEventListener('keydown', handleOutBackdrop);
    }
  }
}
