import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import fetchPopularMovies from './fetch-popular';
import getGenres from './get-genres';
import setScrollToUp from './set-scroll';
import fetchGenres from './fetch-genres';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '404ca53f902a08bf3140e0fd0ad0a560';
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
const NO_POSTER = `https://i.ibb.co/r76r6Vt/oie-30214851-Ms-Wl-PTS0.png`;

const moviesEl = document.querySelector('.films');
const container = document.getElementById('tui-pagination-container');

const instance = new Pagination(container, {
  totalItems: 10000,
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
});

let pageNumber = 1;

fetchPopularMovies(API_KEY, BASE_URL, pageNumber)
  .then(data => {
    const { page, results, total_pages } = data;
    return renderGallery(results);
  })
  .then(res => {
    return (moviesEl.innerHTML = res);
  })
  .catch(console.log);

container.addEventListener('click', handleTuiContainerClick);

function handleTuiContainerClick(event) {
  pageNumber = instance.getCurrentPage();
  setScrollToUp();

  fetchPopularMovies(API_KEY, BASE_URL, pageNumber)
    .then(data => {
      const { page, results, total_pages } = data;
      return renderGallery(results);
    })
    .then(res => {
      return (moviesEl.innerHTML = res);
    })
    .catch(console.log);
}

async function renderGallery(movies) {
  const genres = await fetchGenres(API_KEY, BASE_URL);

  return movies
    .map(
      ({
        genre_ids,
        poster_path,
        title,
        original_title,
        release_date,
      } = {}) => {
        const checkGenres = genre_ids
          ? getGenres(genre_ids, genres)
          : 'Unknown';
        const releaseYear = release_date ? release_date.slice(0, 4) : 'Unknoun';
        const poster = poster_path
          ? `${BASE_IMAGE_URL}w500${poster_path}`
          : NO_POSTER;

        return `<li class="films__item" >
                  <div class="films__img">
                    <img src=${poster} alt='Poster ${original_title}' loading='lazy' />
                  </div>
                  <div class="films__description">
                    <p class="films__title">
                      <b>${title.toUpperCase()}</b>
                    </p>
                    <div class="films__meta">
                      <p class="films__genres">${checkGenres}</p>
                      <p class="films__data">${releaseYear}</p>
                    </div>
                  </div>
                </li>`;
      }
    )
    .join('');
}





