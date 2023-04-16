import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';

const searchFormEl = document.querySelector('.nav__form');
const inputEl = document.querySelector('.nav__input');
const moviesEl = document.querySelector('.films');
const errorEl = document.querySelector('.header__error');
const container = document.getElementById('tui-pagination-container');

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'c88bf135aa4e0b79b7c68835bd77599c';

function setScrollToUp() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

const state = {
  currentPage: 1,
  totalPages: 0,
  activeFilm: null,
  query: null,
  whatPaginated: null,
  whatchedOrQueue: null,
};

async function fetchGenres() {
  const url = new URL(`${BASE_URL}/genre/movie/list`);
  url.searchParams.append('api_key', API_KEY);

  const response = await fetch(url);
  const data = await response.json();
  return data.genres;
}

function getGenres(arrayId, genres) {
  const arr = [];

  for (const value of genres) {
    if (arrayId === 'N/A' || arrayId.length === 0) {
      arr.push('Other');
      break;
    } else if (arrayId.includes(value.id)) {
      arr.push(value.name);
    }
  }

  if (arr.length > 2) {
    arr.splice(2, arr.length - 2, 'Other');
  }

  return arr.join(', ');
}

async function fetchMoviesByQuery(query, page) {
  const url = new URL(`${BASE_URL}/search/movie`);
  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('query', query);
  url.searchParams.append('page', page);

  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  return data;
}

searchFormEl.addEventListener('submit', e => {
  e.preventDefault();

  const query = inputEl.value;
  let page = 1;

  fetchMoviesByQuery(query, page).then(res => {
    const { results } = res;
    state.results = results;

    if (inputEl.value.trim() === '') {
      errorEl.style.display = 'block';
      return;
    }

    if (state.results.length === 0) {
      errorEl.style.display = 'block';
      return;
    }

    if (inputEl.value.trim()) {
      errorEl.style.display = 'none';
      moviesEl.innerHTML = '';
      container.style.display = 'none';

      fetchMoviesByQuery(query, page)
        .then(res => {
          const { results, total_pages } = res;
          state.totalPages = total_pages;

          if (state.totalPages > 1) {
            return renderGallery(results);
          }
        })
        .then(res => {
          moviesEl.innerHTML = res;
        });

      fetchMoviesByQuery(query, page).then(data => {
        const total = data.total_results;
        const pagination = new Pagination('pagination', {
          totalItems: total,
          itemsPerPage: 20,
          visiblePages: 5,
          page: 1,
        });
        pagination.on('afterMove', event => {
          setScrollToUp();
          const { page } = event;
          fetchMoviesByQuery(query, page)
            .then(res => {
              const { results, total_pages } = res;
              state.totalPages = total_pages;

              if (state.totalPages > 1) {
                return renderGallery(results);
              }
            })
            .then(res => {
              moviesEl.innerHTML = res;
            });
          console.log(page);
        });
      });
    }
  });
});

async function renderGallery(movies) {
  const genres = await fetchGenres();
  return movies
    .map(
      ({
        poster_path,
        title,
        release_date,
        genre_ids,
        original_title,
        id,
      } = movies) => {
        const poster = poster_path
          ? `https://image.tmdb.org/t/p/w500${poster_path}`
          : 'NO_POSTER';
        const releaseYear = release_date
          ? release_date.split('-')[0]
          : 'Unknown';
        const checkGenres = genre_ids
          ? getGenres(genre_ids, genres)
          : 'Unknown';
        return `<li class="films__item" data-mvid='${id}'>
                  <div class="films__img">
                    <img src=${poster} alt='Poster ${original_title} 'data-mvid='${id}' loading='lazy' />
                  </div>
                  <div class="films__description" data-mvid='${id}'>
                    <p class="films__title" data-mvid='${id}'>
                      <b data-mvid='${id}'>${title.toUpperCase()}</b>
                    </p>
                    <div class="films__meta" data-mvid='${id}'>
                      <p class="films__genres" data-mvid='${id}'>${checkGenres}</p>
                      <p class="films__data" data-mvid='${id}'>${releaseYear}</p>
                    </div>
                  </div>
                </li>`;
      }
    )
    .join('');
}
