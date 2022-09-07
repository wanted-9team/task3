import { Axios } from 'api'

export const popularMovieApi = async currentPage => {
  return await Axios.get('/movie/popular', { params: { page: currentPage } })
}
export const getMovieList = async (url, page) => {
  try {
    const res = await Axios({
      url: `/movie${url}`,
      method: 'get',
      params: {
        page,
      },
    })

    return res.data
  } catch (err) {
    console.log(err)
    return err
  }
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
