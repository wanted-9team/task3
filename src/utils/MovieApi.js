import { Axios } from 'api'

export const popularMovieApi = async currentPage => {
  return await Axios.get('/movie/popular', { params: { page: currentPage } })
}

export const getMovieListApi = async (query, page) => {
  const res = await Axios({
    url: `/movie/${query}`,
    method: 'get',
    params: {
      page,
    },
  })
  return res.data
}

export const getSearchResults = async (title, page) => {
  const res = await Axios({
    url: `/search/movie`,
    method: 'get',
    params: {
      query: title,
      page,
    },
  })
  return res.data
}

export const detailMovieApi = async id => {
  return await Axios.get(`/movie/${id}`)
}

export const detailMovieVideoApi = async id => {
  return await Axios.get(`/movie/${id}/videos`)
}
