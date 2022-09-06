import React, { useEffect } from 'react'
import Loading from 'components/Loading'
import MovieCard from 'components/MovieCard'
import { useLocation } from 'react-router-dom'
import { useInfiniteQuery } from '@tanstack/react-query'
import { getMovieList } from 'utils/MovieApi'
import { useInView } from 'react-intersection-observer'
import * as S from './MovieLists.style'

const MovieLists = () => {
  const { pathname } = useLocation()
  const { ref, inView } = useInView()

  const { data, isLoading, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage, refetch } =
    useInfiniteQuery(['movieList'], ({ pageParam = 1 }) => getMovieList(pathname, pageParam), {
      getNextPageParam: (lastPage, allPages) => {
        const maxPages = lastPage.total_pages
        const nextPage = lastPage.page + 1
        return nextPage <= maxPages ? nextPage : undefined
      },
    })

  useEffect(() => {
    refetch()
  }, [pathname, refetch])
  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  if (isLoading) return <Loading />

  return (
    <>
      <S.MovieListContainer>
        {data.pages?.length > 0 &&
          data.pages?.map(({ results }) =>
            results.map(movie => (
              <S.MovieCardWrapper key={movie.id}>
                <MovieCard
                  title={movie.title}
                  poster={movie.poster_path}
                  vote={movie.vote_average}
                />
              </S.MovieCardWrapper>
            )),
          )}
      </S.MovieListContainer>
      {hasNextPage ? (
        <div ref={ref}>
          <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : '마지막 페이지'}</div>
        </div>
      ) : null}
    </>
  )
}
export default MovieLists
