import { Axios } from 'api'

export const popularMovieApi = async () => {
  return await Axios.get('/movie/popular')
}

export const detailMovieApi = async id => {
  return await Axios.get(`/movie/${id}`)
}

export const detailMovieVideoApi = async id => {
  return await Axios.get(`/movie/${id}/videos`)
}
