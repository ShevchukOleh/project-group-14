import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

const galleryEl = document.querySelector('.gallery');

const container = document.getElementById('tui-pagination-container');
const instance = new Pagination(container, {
  totalItems: 500,
  itemsPerPage: 20,
  visiblePages: 5,
  centerAlign: true,
});
let pageNumber = 1;

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '404ca53f902a08bf3140e0fd0ad0a560';
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
const IMAGE_SIZE = 'w200';

fetchPopularMovies().then(data => {
    const { page, results, total_pages, total_results } = data;
    console.log(data);
  renderGallery(results);
}).catch(console.log);

container.addEventListener('click', handleTuiContainerClick);

function handleTuiContainerClick(event) {
    pageNumber = instance.getCurrentPage();
    console.log(pageNumber);
    fetchPopularMovies(pageNumber).then(data => {
        const { page, results, total_pages, total_results } = data;
        console.log(data);
    })
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



function renderGallery(results) {
  const markup = results
      .map(result => {
      return `<div class="movie-card">
      <img class="movie-poster" src="${BASE_IMAGE_URL}${IMAGE_SIZE}${result.poster_path}" alt="${result.title}" loading="lazy" />
      <div class="movie-info">
      <p class="movie-title">
      ${result.original_title}</p>
      </div>`;
    })
    .join('');
  galleryEl.innerHTML = markup;
}

function fetchMovies(searchQuery) {
  const searchParams = new URLSearchParams({
    api_key: `${API_KEY}`,
    query: `${searchQuery}`,
  });

  const url = `${BASE_URL}search/movie?${searchParams}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}