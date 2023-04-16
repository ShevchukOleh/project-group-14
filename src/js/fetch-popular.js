import axios from 'axios';

export default async function fetchPopularMovies(
  api_key,
  base_url,
  pageNumber
) {
  const searchParams = new URLSearchParams({
    api_key: `${api_key}`,
    page: `${pageNumber}`,
    language: 'en-US',
  });

  const url = `${base_url}/movie/popular?${searchParams}`;
  const dataObj = await axios.get(url);
  const { data } = dataObj;

  return data;
}