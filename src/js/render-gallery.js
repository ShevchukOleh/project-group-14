import getGenres from './get-genres';
import fetchGenres from './fetch-genres';

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
        const releaseYear = release_date ? release_date.slice(0, 4) : 'Unknoun';
        const poster = poster_path
          ? `${BASE_IMAGE_URL}w500${poster_path}`
          : NO_POSTER;

        return `<li class="films__item" data-mvid='${id}'>
                  <div class="films__img">
                    <img src=${poster} alt='Poster ${original_title}'data-mvid='${id}' loading='lazy' />
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