const BASE_URL = process.env.REACT_APP_API_URL

const configUrl = {
  popular: `${BASE_URL}/movie/popular`,
  nowPlaying: `${BASE_URL}/movie/now_playing`,
  upcoming: `${BASE_URL}/movie/upcoming`,
  topRated: `${BASE_URL}/movie/top_rated`,
  detail: `${BASE_URL}/movie/`,
  search: `${BASE_URL}/search/movie`,
}

export default configUrl
