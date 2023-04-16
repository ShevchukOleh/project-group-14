import getGenres from './get-genres';
import fetchGenres from './fetch-genres';
import movieCardTpl from './templates/template-movie-card.hbs';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
const NO_POSTER = `https://i.ibb.co/r76r6Vt/oie-30214851-Ms-Wl-PTS0.png`;

export default async function renderGallery(movies, api_key, base_url) {
  const genres = await fetchGenres(api_key, base_url);

  return movies
    .map(
      ({
        genre_ids,
        poster_path,
        title,
        original_title,
        release_date,
        id,
      } = {}) => {
        const checkGenres = genre_ids
          ? getGenres(genre_ids, genres)
          : 'Unknown';
        const releaseYear = release_date
          ? release_date.slice(0, 4)
          : 'Unknoun';
        const poster = poster_path
          ? `${BASE_IMAGE_URL}w500${poster_path}`
          : NO_POSTER;
        const titleMovie = title.toUpperCase();

        return movieCardTpl({
          id,
          poster,
          original_title,
          titleMovie,
          checkGenres,
          releaseYear,
        });
      }
    )
    .join('');
}
