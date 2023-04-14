export default class MoviesApiService {
  constructor() {
    this.searchQuery = '';
    this.pageTMDB = 1;
    this.TMDB_API = 'https://api.themoviedb.org/3/';
    this.MY_TMDB_KEY = '3f36abdfc741814416ed3a9d78fd33b6';
  }

  // Ключове слово. Запит
  async getMoviesSearch() {
    return fetch(
      `${this.TMDB_API}search/keyword?api_key=${this.MY_TMDB_KEY}&query=${this.searchQuery}`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }

  // Тренди дня. Запит
  async getMoviesTop() {
    return fetch(
      `${this.TMDB_API}trending/movie/day?api_key=${this.MY_TMDB_KEY}&id`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
  // Окремий фільм. Запит
  async getMovieId(id) {
    return fetch(
      `${this.TMDB_API}movie/${id}?api_key=${this.MY_TMDB_KEY}&language=en-US`
    ).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      this.incrementPage();
      return response.json();
    });
  }

  incrementPage() {
    this.pageTMDB += 1;
  }
  resetPage() {
    this.pageTMDB = 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
