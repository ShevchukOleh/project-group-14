import * as basicLightbox from 'basiclightbox';
import '../sass/_modal.scss';

import templateFunction from './template-modal.hbs';
import MoviesApiService from './movies_service';
const moviesApiService = new MoviesApiService();
const btnEl = document.querySelector('.modal__btn-mr');
btnEl.addEventListener('click', largeMovieItem);

function largeMovieItem(event) {
  console.log(event.target);
  if (
    event.target.nodeName != 'BUTTON'
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
        //         const opt = {
        //   vote:
        //   votes:
        // }
        genres: genres.map(gener => ` ${gener.name}`),
        title: original_title,
        img: `https://image.tmdb.org/t/p/w500${poster_path}`,
        popularity: popularity,
        origin_title: original_title,
        about: overview,
      };
      console.log('templateFunction(info): ', templateFunction(info));
      const render = templateFunction(info);
      const instance = basicLightbox.create(render);

      console.log('instance: ', instance);
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
