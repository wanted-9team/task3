import React, { useEffect, useMemo } from 'react'
import Loading from 'components/Loading'
import MovieCard from 'components/MovieCard'
import MovieListPageTitle from './components/MovieListPageTitle'
import EmptyResult from 'components/EmptyResult'
import { useNavigate, useLocation } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getMovieListApi } from 'utils/MovieApi'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'

const MovieLists = () => {
  const { pathname } = useLocation()
  const { ref, inView } = useInView()
  const navigate = useNavigate()
  const movieListQueryKey = pathname.slice(1, pathname.length)

  const { data, isLoading, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery(
    [`${movieListQueryKey}`, `${pathname}`],
    ({ pageParam = 1 }) => getMovieListApi(movieListQueryKey, pageParam),
    {
      getNextPageParam: (lastPage, _) => {
        const maxPages = lastPage.total_pages
        const nextPage = lastPage.page + 1
        return nextPage <= maxPages ? nextPage : undefined
      },
    },
  )

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  const movieResults = useMemo(() => {
    const results = data?.pages.flatMap(page => page.results)
    return results || null
  }, [data])

  const handleNavigate = movieId => {
    navigate(`/movie_detail/${movieId}`)
  }

  if (isLoading) return <Loading />

  return (
    <MoviePageContainer>
      <MovieListPageTitle movieListQueryKey={movieListQueryKey} />
      <MovieListBox>
        {movieResults &&
          movieResults.map(movie => (
            <MovieCardWrapper key={movie.id} onClick={() => handleNavigate(movie.id)}>
              <MovieCard title={movie.title} poster={movie.poster_path} vote={movie.vote_average} />
            </MovieCardWrapper>
          ))}
      </MovieListBox>
      {hasNextPage ? <div ref={ref}> {isFetching && <Loading />}</div> : <EmptyResult />}
    </MoviePageContainer>
  )
}
export default MovieLists

const MoviePageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`
const MovieCardWrapper = styled.div``
const MovieListBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 2fr));
  grid-auto-flow: row;
  grid-gap: 10px;
  padding: 30px 0;
  justify-items: center;
`
