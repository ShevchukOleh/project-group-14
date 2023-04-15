import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';
import fetchPopularMovies from './fetch-popular';
import renderGallery from './render-gallery';
import setScrollToUp from './set-scroll';

export const BASE_URL = 'https://api.themoviedb.org/3/';
export const API_KEY = '404ca53f902a08bf3140e0fd0ad0a560';

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
    const { page, results, total_pages, total_results } = data;
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
      const { page, results, total_pages, total_results } = data;
      return renderGallery(results, API_KEY, BASE_URL);
    })
    .then(res => {
      return (moviesEl.innerHTML = res);
    })
    .catch(console.log);
}


