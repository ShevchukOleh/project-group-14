import * as basicLightbox from 'basiclightbox';
import '../sass/_modall.scss';
import handleModal from './functionHandleModal';
import { initModalButtonsHandler } from './modalControl';

import MoviesApiService from './movies_service';
const moviesApiService = new MoviesApiService();
const bodyEl = document.querySelector('.container-body');
bodyEl.addEventListener('click', largeMovieItem);

const Handlebars = require('handlebars');
const template = Handlebars.compile(
  `<div class='modal modal-click'>
    <div class='modal__container-picture'>
      <img class='modal__picture' src={{img}} alt='icon-film'/>
    </div>
    <div>
      <h2 class='modal__title'>{{title}}</h2>
      <div class='modal__char'><span class='modal__char-name'>Vote / Votes</span>
        <p class='modal__char-api'><span class='modal__char-api modal__vote'>{{vote}}</span> / <span class='modal__char-api'>{{votes}}</span></p>
      </div>
      <p class='modal__char'><span class='modal__char-name'>Popularity</span><span class='modal__char-api'>{{popularity}}</span></p>
      <p class='modal__char'><span class='modal__char-name'>Original Title</span><span class='modal__char-api'>{{origin_title}}</span></p>
      <p class='modal__char modal__char-mb'><span class='modal__char-name'>Genre</span><span class='modal__char-api'>{{genres}}</span></p>
      <p class='modal__about-title'>About</p><p class='modal__about-text'>{{about}}</p>
      <div class='modal__btn-container'>
        <button class='modal__btn modal__btn-mr' type='button' data-btn-type="modal-btn-watched" data-id={{id}}>ADD TO WATCHED</button>
        <button class='modal__btn' type='button' data-btn-type="modal-btn-queue" data-id={{id}}>ADD TO QUEUE</button>
      </div>
    </div>
  </div>`
);

async function largeMovieItem(event) {
  if (
    event.target.nodeName != 'DIV' &&
    event.target.nodeName != 'LI' &&
    event.target.nodeName != 'IMG' &&
    event.target.nodeName != 'P' &&
    event.target.nodeName != 'B'
  ) {
    return;
  }
  if (!event.target.dataset.mvid) {
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
        let imgPlug = poster_path
          ? `https://image.tmdb.org/t/p/w500${poster_path}`
          : `https://via.placeholder.com/400x600/FFFFFF/000000?text=Not+Found`;

        const info = {
          id: id,
          vote: Math.round(Number(vote_average) * 10) / 10,
          votes: vote_count,
          genres: genres.map(gener => ` ${gener.name}`),
          title: title || original_title,
          img: imgPlug,
          popularity: Math.round(Number(popularity) * 10) / 10,
          origin_title: original_title || title,
          about: overview || 'Not found',
        };
        const render = template(info);
        const instance = basicLightbox.create(render);

        instance.show(() => {
          initModalButtonsHandler();
          const ref = {
            btnEl: document.querySelector('.modal__close'),
            bodyElScroll: document.querySelector('body'),
            basicLightboxEl: document.querySelector('.basicLightbox'),
            btnYoutube: document.querySelector('.modal__play'),
          };
          ref.btnYoutube.addEventListener('click', getTrailerKey);
          ref.bodyElScroll.classList.add('no-scroll');

          ref.basicLightboxEl.addEventListener('click', handleOutBackdropTwo);
          function handleOutBackdropTwo(event) {
            if (event.target.classList[0] === 'basicLightbox') {
              instance.close(() => {
                ref.bodyElScroll.classList.remove('no-scroll');
              });
            }
          }
          ref.btnEl.addEventListener('click', handleCloseModal);
          function handleCloseModal() {
            instance.close(() => {
              ref.bodyElScroll.classList.remove('no-scroll');
            });
          }

          document.addEventListener('keydown', handleOutBackdrop);

          function handleOutBackdrop(event) {
            if (
              event.key === 'Escape' ||
              event.key === ' ' ||
              event.key === 'Enter'
            ) {
              instance.close(() => {
                ref.bodyElScroll.classList.remove('no-scroll');
              });
            }
            if (!basicLightbox.visible()) {
              document.removeEventListener('keydown', handleOutBackdrop);
              ref.btnEl.removeEventListener('click', handleCloseModal);
            }
          }
        });
        const ref = {
          modal: document.querySelector('.basicLightbox__placeholder'),
        };
        ref.modal.addEventListener('click', handleModal);
        ref.modal.insertAdjacentHTML(
          'beforeend',
          `
		<button class="modal__close">
			<svg class="modal__close-icon" width="30px" height="30px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
				<polygon points="340.2,160 255.8,244.3 171.8,160.4 160,172.2 244,256 160,339.9 171.8,351.6 255.8,267.8 340.2,352 352,340.3 267.6,256 352,171.8"></polygon>
			</svg>
		</button>
    <button class="modal__play" data-yid=${id}>
		<svg class="modal__play-icon" xmlns="http://www.w3.org/2000/svg" data-yid=${id} viewBox="0 0 50 50" style="width="150px" height="150px"><path data-yid=${id} d="M 24.402344 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.402344 16.898438 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.902344 40.5 17.898438 41 24.5 41 C 31.101563 41 37.097656 40.5 40.597656 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.097656 35.5 C 45.5 33 46 29.402344 46.097656 24.902344 C 46.097656 20.402344 45.597656 16.800781 45.097656 14.300781 C 44.699219 12.101563 42.800781 10.5 40.597656 10 C 37.097656 9.5 31 9 24.402344 9 Z M 24.402344 11 C 31.601563 11 37.398438 11.597656 40.199219 12.097656 C 41.699219 12.5 42.898438 13.5 43.097656 14.800781 C 43.699219 18 44.097656 21.402344 44.097656 24.902344 C 44 29.199219 43.5 32.699219 43.097656 35.199219 C 42.800781 37.097656 40.800781 37.699219 40.199219 37.902344 C 36.597656 38.601563 30.597656 39.097656 24.597656 39.097656 C 18.597656 39.097656 12.5 38.699219 9 37.902344 C 7.5 37.5 6.300781 36.5 6.101563 35.199219 C 5.300781 32.398438 5 28.699219 5 25 C 5 20.398438 5.402344 17 5.800781 14.902344 C 6.101563 13 8.199219 12.398438 8.699219 12.199219 C 12 11.5 18.101563 11 24.402344 11 Z M 19 17 L 19 33 L 33 25 Z M 21 20.402344 L 29 25 L 21 29.597656 Z"/></svg>
    </button>
   	`
        );
      }
    )
    .catch(er => console.log(er));
}

async function getTrailerKey(event) {
  if (
    event.target.nodeName != 'BUTTON' &&
    event.target.nodeName != 'svg' &&
    event.target.nodeName != 'puth'
  ) {
    return;
  }
  if (!event.target.dataset.yid) {
    return;
  }
  const response = await moviesApiService.getMovieTrailerbyId(
    event.target.dataset.yid
  );
  const results = await response.results;
  const movieKey = await results[0].key;
  const instance = await basicLightbox.create(`
       <iframe src="https://www.youtube.com/embed/${movieKey}" width="1200" height="650" frameborder="0"></iframe>
`);

  instance.show();
}
