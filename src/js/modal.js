import * as basicLightbox from 'basiclightbox';
import '../sass/_modall.scss';
import handleModal from './functionHandleModal';

import MoviesApiService from './movies_service';
const moviesApiService = new MoviesApiService();
const bodyEl = document.querySelector('.container-body');
bodyEl.addEventListener('click', largeMovieItem);

const Handlebars = require('handlebars');
const template = Handlebars.compile(
  "<div class='modal modal-click'><div class='modal__container-picture'><img class='modal__picture' src={{img}} alt='icon-film'/></div><div><h2 class='modal__title'>{{title}}</h2><div class='modal__char'><span class='modal__char-name'>Vote / Votes</span><p class='modal__char-api'><span class='modal__char-api modal__vote'>{{vote}}</span> / <span class='modal__char-api'>{{votes}}</span></p></div><p class='modal__char'><span class='modal__char-name'>Popularity</span><span class='modal__char-api'>{{popularity}}</span></p><p class='modal__char'><span class='modal__char-name'>Original Title</span><span class='modal__char-api'>{{origin_title}}</span></p><p class='modal__char modal__char-mb'><span class='modal__char-name'>Genre</span><span class='modal__char-api'>{{genres}}</span></p><p class='modal__about-title'>About</p><p class='modal__about-text'>{{about}}</p><div class='modal__btn-container'><button class='modal__btn modal__btn-mr' type='button' data-id={{id}}>ADD TO WATCHED</button><button class='modal__btn' type='button' data-id={{id}}>ADD TO QUEUE</button></div><button class='modal__close' type='button'><svg width='30' height='30'><use class='modal__close-icon' href='./symbol-defs.svg#icon-close_40px'></use></svg></button></div></div>"
);

async function largeMovieItem(event) {
  if (
    event.target.nodeName != 'LI' &&
    event.target.nodeName != 'IMG' &&
    event.target.nodeName != 'P' &&
    event.target.nodeName != 'SPAN'
  ) {
    return;
  }
  const markup = await moviesApiService
    .getMovieId(event.target.dataset.mvid)
    .then(
      ({
        genres,
        poster_path,
        original_title,
        popularity,
        overview,
        vote_average,
        vote_count,
        title,
        id,
      }) => {
        const info = {
          id: id,
          vote: vote_average,
          votes: vote_count,
          genres: genres.map(gener => ` ${gener.name}`),
          title: title || original_title,
          img: `https://image.tmdb.org/t/p/w500${poster_path}`,
          popularity: popularity,
          origin_title: original_title || title,
          about: overview,
        };
        const render = template(info);
        const instance = basicLightbox.create(render);

        instance.show();
        const ref = {
          modal: document.querySelector('.basicLightbox__placeholder'),
        };
        ref.modal.addEventListener('click', handleModal);
      }
    )
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
