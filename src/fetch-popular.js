import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

const galleryEl = document.querySelector('.gallery');
const container = document.getElementById('tui-pagination-container');

const instance = new Pagination(container, {
  totalItems: 10000,
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
});

let pageNumber = 1;

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '404ca53f902a08bf3140e0fd0ad0a560';
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
const IMAGE_SIZE = 'w200';

fetchPopularMovies()
  .then(data => {
    const { page, results, total_pages, total_results } = data;

    return renderGallery(results);
  })
  .then(res => {
    return (galleryEl.innerHTML = res);
  })
  .catch(console.log);

container.addEventListener('click', handleTuiContainerClick);

function handleTuiContainerClick(event) {
  pageNumber = instance.getCurrentPage();
  fetchPopularMovies(pageNumber)
    .then(data => {
      const { page, results, total_pages, total_results } = data;

      return renderGallery(results);
    })
    .then(res => {
      return (galleryEl.innerHTML = res);
    })
    .catch(console.log);
}

function fetchPopularMovies(pageNumber) {
  const searchParams = new URLSearchParams({
    api_key: `${API_KEY}`,
    page: `${pageNumber}`,
  });

  const url = `${BASE_URL}movie/popular?${searchParams}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

async function renderGallery(movies) {
  const genres = await fetchGenres();

  return movies
    .map(({ genre_ids, poster_path, title, original_title, release_date } = {}) => {
      const checkGenres = genre_ids ? getGenres(genre_ids, genres) : 'Unknown';

      return `<div class="movie-card">
      <img class="movie-poster"
        src="${BASE_IMAGE_URL}${IMAGE_SIZE}${poster_path}" 
        alt="${title}" 
        loading="lazy" />
      <div class="movie-info">
      <p class="movie-title">
      ${original_title}</p>
      <p class="movie-genres">${checkGenres}</p>
      <p class="movie-date">
      ${release_date.slice(0, 4)}</p>
      </div>`;
    })
    .join('');
}

function fetchGenres() {
  const searchParams = new URLSearchParams({
    api_key: `${API_KEY}`,
    language: 'en-US',
  });

  const url = `${BASE_URL}genre/movie/list?${searchParams}`;
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => data.genres);
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
