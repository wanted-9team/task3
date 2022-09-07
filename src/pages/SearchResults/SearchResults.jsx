import React, { useEffect } from 'react'
import { getSearchResults } from 'utils/MovieApi'
import { useInfiniteQuery } from '@tanstack/react-query'
import Loading from 'components/Loading'
import MovieCard from 'components/MovieCard'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SearchResults = () => {
  const location = useLocation()
  const title = 'yes' // 추후 삭제
  // const title = location.state.title
  const lowerCaseTitle = title.toLowerCase()
  const { ref, inView } = useInView()

  const { data, isLoading, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage, refetch } =
    useInfiniteQuery(
      ['search_result'],
      ({ pageParam = 1 }) => getSearchResults(lowerCaseTitle, pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          const maxPages = lastPage.total_pages
          const nextPage = lastPage.page + 1
          return nextPage <= maxPages ? nextPage : undefined
        },
      },
    )

  useEffect(() => {
    refetch()
  }, [lowerCaseTitle, refetch])

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  if (isLoading) return <Loading />

  return (
    <SearchResultWrapper>
      {(
        <SearchWord>
          '{title}'에 대한 {data?.pages[0].total_results}개의 결과가 있습니다.
        </SearchWord>
      ) || <Skeleton />}
      <MovieList>
        {data?.pages.length > 0 &&
          data.pages?.map(({ results }) =>
            results.map(movie => (
              <MovieCardWrapper key={movie.id}>
                <MovieCard
                  title={movie.title}
                  poster={movie.poster_path}
                  vote={movie.vote_average}
                />
              </MovieCardWrapper>
            )),
          )}
      </MovieList>
      {hasNextPage ? (
        <div ref={ref}>
          <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : '마지막 페이지'}</div>
        </div>
      ) : null}
    </SearchResultWrapper>
  )
}

export default SearchResults

const SearchResultWrapper = styled.div`
  ${({ theme }) => theme.flex('column')}
`

const SearchWord = styled.p`
  font-size: 1.5rem;
  ${({ theme }) => theme.headerFont}
`

const MovieList = styled.div`
  ${({ theme }) => theme.flex('row', 'center', 'top')}
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
`
const MovieCardWrapper = styled.div`
  padding: 10px;
  width: 300px;
`
