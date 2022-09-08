import React, { useEffect } from 'react'
import { getSearchResults } from 'utils/MovieApi'
import { useInfiniteQuery } from '@tanstack/react-query'
import Loading from 'components/Loading'
import MovieCard from 'components/MovieCard'
import EmptyResult from 'components/EmptyResult'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SearchResults = () => {
  const location = useLocation()
  const searchWord = location.state
  const lowerSearchWord = searchWord.toLowerCase()
  const { ref, inView } = useInView()
  const navigate = useNavigate()

  const { data, isLoading, hasNextPage, fetchNextPage, isFetching, refetch } = useInfiniteQuery(
    ['search_result'],
    ({ pageParam = 1 }) => getSearchResults(lowerSearchWord, pageParam),
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
  }, [lowerSearchWord, refetch])

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  const handleNavigate = movieId => {
    navigate(`/movie_detail/${movieId}`)
  }

  if (isLoading) return <Loading />

  return (
    <SearchResultWrapper>
      {(
        <SearchWord>
          <BoldSearchWord>'{searchWord}'</BoldSearchWord>에 대한&nbsp;
          <BoldSearchWord> {data?.pages[0].total_results}</BoldSearchWord>개의 결과가 있습니다.
        </SearchWord>
      ) || <Skeleton />}
      <MovieList>
        {data?.pages.length > 0 &&
          data.pages?.map(({ results }) =>
            results.map(movie => (
              <MovieCardWrapper key={movie.id} onClick={() => handleNavigate(movie.id)}>
                <MovieCard
                  title={movie.title}
                  poster={movie.poster_path}
                  vote={movie.vote_average}
                />
              </MovieCardWrapper>
            )),
          )}
      </MovieList>
      {hasNextPage ? <div ref={ref}> {isFetching && <Loading />}</div> : <EmptyResult />}
    </SearchResultWrapper>
  )
}

export default SearchResults

const SearchResultWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`

const SearchWord = styled.div`
  ${({ theme }) => theme.flex('row', 'center', 'top')};
  font-size: 32px;
  font-weight: 400;
  padding: 1.5em 0;
  border-bottom: 1px solid #ddd;
`

const BoldSearchWord = styled.span`
  font-weight: 700;
`

const MovieList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 2fr));
  grid-auto-flow: row;
  grid-gap: 10px;
  padding: 30px 0;
  justify-items: center;
`
const MovieCardWrapper = styled.div``
