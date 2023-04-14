import * as basicLightbox from 'basiclightbox';
import '../sass/_modall.scss';

// import templateFunction from './templates/template-modal.hbs';
import MoviesApiService from './movies_service';
const moviesApiService = new MoviesApiService();
const pEl = document.querySelector('.modal__about-text');
pEl.addEventListener('click', largeMovieItem);

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
      const render = templateFunction(info);
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
