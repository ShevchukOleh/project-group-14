export default function fetchPopularMovies(api_key, base_url, pageNumber) {
  const searchParams = new URLSearchParams({
    api_key: `${api_key}`,
    page: `${pageNumber}`,
    language: 'en-US',
  });

  const url = `${base_url}/movie/popular?${searchParams}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
