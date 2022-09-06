import { Axios } from 'api'

export const popularMovieApi = async () => {
  return await Axios.get('/movie/popular')
}
