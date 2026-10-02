const API_BASE_URL = 'https://api.themoviedb.org/3'
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

const apiKey = import.meta.env.VITE_TMDB_API_KEY
const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN

async function request(path, params = {}) {
  if (!accessToken && !apiKey) {
    throw new Error('Configuration TMDB manquante. Ajoutez VITE_TMDB_ACCESS_TOKEN ou VITE_TMDB_API_KEY dans votre fichier .env.')
  }

  const searchParams = new URLSearchParams({
    language: 'fr-FR',
    include_adult: 'false',
    ...params,
  })
  if (!accessToken) searchParams.set('api_key', apiKey)

  const response = await fetch(`${API_BASE_URL}${path}?${searchParams}`, {
    headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
  })

  if (!response.ok) {
    throw new Error('TMDB ne répond pas correctement. Réessayez dans quelques instants.')
  }
  return response.json()
}

export function getPosterUrl(path, size = 'w500') {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : null
}

export function getBackdropUrl(path, size = 'w1280') {
  return path ? `${IMAGE_BASE_URL}/${size}${path}` : null
}

export async function getTrendingMovies() {
  return request('/trending/movie/day')
}

export async function searchMovies(query, page = 1) {
  return request('/search/movie', { query, page })
}

export async function getMovieDetails(id) {
  return request(`/movie/${id}`)
}
