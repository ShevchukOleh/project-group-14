import axios from 'axios';

export default async function fetchGenres(api_key, base_url) {
  const searchParams = new URLSearchParams({
    api_key: `${api_key}`,
    language: 'en-US',
  });

  const url = `${base_url}genre/movie/list?${searchParams}`;
  const dataObj = await axios.get(url);
  const { data } = dataObj;

  return data.genres;
}