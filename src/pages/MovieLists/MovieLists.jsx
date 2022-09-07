import React, { useEffect, useMemo } from 'react'
import Loading from 'components/Loading'
import MovieCard from 'components/MovieCard'
import MovieListPageTitle from './MovieListPageTitle'
import { useLocation } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getMovieList } from 'utils/MovieApi'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'

const MovieLists = () => {
  const { pathname } = useLocation()
  const { ref, inView } = useInView()

  const movieListQueryKey = pathname.slice(1, pathname.length)

  const { data, isLoading, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery(
    [`${movieListQueryKey}`, `${pathname}`],
    ({ pageParam = 1 }) => getMovieList(pathname, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
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

  if (isLoading) return <Loading />

  return (
    <MoviePageContainer>
      <MovieListPageTitle movieListQueryKey={movieListQueryKey} />
      <MovieListBox>
        {movieResults &&
          movieResults.map(movie => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              poster={movie.poster_path}
              vote={movie.vote_average}
            />
          ))}
      </MovieListBox>
      {hasNextPage ? <div ref={ref}>{isFetching ? <Loading /> : null}</div> : null}
    </MoviePageContainer>
  )
}
export default MovieLists

const MoviePageContainer = styled.div`
  width: 1200px;
  margin: 0 auto;
  position: relative;
`

const MovieListBox = styled.div`
  ${({ theme }) => theme.flex('row', 'space-around')};
  flex-wrap: wrap;
`
