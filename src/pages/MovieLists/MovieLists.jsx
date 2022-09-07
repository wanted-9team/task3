import React, { useEffect, useMemo } from 'react'
import Loading from 'components/Loading'
import MovieCard from 'components/MovieCard'
import { useLocation } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getMovieList } from 'utils/MovieApi'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'

const MovieLists = () => {
  const { pathname } = useLocation()
  const { ref, inView } = useInView()

  const { data, isLoading, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery(
      ['movieList', `${pathname}`],
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
  console.log(data)
  console.log(isLoading)
  if (isLoading) return <Loading />

  return (
    <>
      <MovieListContainer>
        {movieResults &&
          movieResults.map(movie => (
            <MovieCardWrapper key={movie.id}>
              <MovieCard title={movie.title} poster={movie.poster_path} vote={movie.vote_average} />
            </MovieCardWrapper>
          ))}
      </MovieListContainer>
      {hasNextPage ? (
        <div ref={ref}>
          <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : '마지막 페이지'}</div>
        </div>
      ) : null}
    </>
  )
}
export default MovieLists

const MovieListContainer = styled.div`
  ${({ theme }) => theme.flex}
  flex-wrap: wrap;
  width: 1200px;
  margin: 0 auto;
`

const MovieCardWrapper = styled.div`
  margin-right: 10px;
  margin-bottom: 10px;
  width: 200px;
`
