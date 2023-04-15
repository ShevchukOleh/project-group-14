import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import fetchPopularMovies from './fetch-popular';
import renderGallery from './render-gallery';
//import getGenres from './get-genres';
import setScrollToUp from './set-scroll';
//import fetchGenres from './fetch-genres';

export const BASE_URL = 'https://api.themoviedb.org/3/';
export const API_KEY = '404ca53f902a08bf3140e0fd0ad0a560';
//const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
//const NO_POSTER = `https://i.ibb.co/r76r6Vt/oie-30214851-Ms-Wl-PTS0.png`;

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
    return renderGallery(results, API_KEY, BASE_URL);
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
      return renderGallery(results, API_KEY, BASE_URL);
    })
    .then(res => {
      return (moviesEl.innerHTML = res);
    })
    .catch(console.log);
}


