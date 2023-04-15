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

        instance.show(() => {
          initModalButtonsHandler();

          const btnEl = document.querySelector('.modal__close');
          btnEl.addEventListener('click', handleCloseModal);
          function handleCloseModal() {
            instance.close();
          }

          document.addEventListener('keydown', handleOutBackdrop);
          function handleOutBackdrop(event) {
            if (
              event.key === 'Escape' ||
              event.key === ' ' ||
              event.key === 'Enter'
            ) {
              instance.close();
            }
            if (!basicLightbox.visible()) {
              document.removeEventListener('keydown', handleOutBackdrop);
              btnEl.removeEventListener('click', handleCloseModal);
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
	`
        );
      }
    )
    .catch(er => console.log(er));
}
