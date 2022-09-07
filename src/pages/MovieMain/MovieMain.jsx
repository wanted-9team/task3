import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useInfiniteQuery } from '@tanstack/react-query'
import { popularMovieApi } from 'utils/MovieApi'
import { useInView } from 'react-intersection-observer'
import Carousel from './components/Carousel'
import MovieCard from 'components/MovieCard'

const MovieMain = () => {

  const { ref, inView } = useInView()
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['popularMovie'],
    ({ pageParam = 1 }) => popularMovieApi(pageParam),
    {
      select: movieLists => {
        return movieLists.pages.flatMap(movieList => movieList.data.results)
      },
      getNextPageParam: (response, currentpages) => {
        const lastPage = response.data.total_pages
        if (currentpages.length < lastPage) {
          return currentpages.length + 1
        } else {
          return undefined
        }
      },
    },
  )

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  return (
    <MainPageContainer>
      <MainPageHeader>
        <Carousel />
      </MainPageHeader>
      <MainPageSection>
        <MainPageSectionHeader>요즘 인기있는 영화들</MainPageSectionHeader>
        <MovieList>
          {data?.map(movieList => (
            <MovieCard
              key={movieList.id}
              poster={movieList.poster_path}
              title={movieList.title}
              vote={movieList.vote}
            ></MovieCard>
          ))}
        </MovieList>
      </MainPageSection>
      {hasNextPage ? <ContainerBottom ref={ref}></ContainerBottom> : null}
    </MainPageContainer>
  )

}

export default MovieMain

const MainPageContainer = styled.div`
  width: 100%;
  padding: 0 50px;
`
const MainPageHeader = styled.header``
const MainPageSection = styled.section``
const MainPageSectionHeader = styled.h1`
  border-left: 6px solid ${({ theme }) => theme.hover};
  padding-left: 10px;
  ${({ theme }) => theme.headerFont};
`
const MovieList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 2fr));
  grid-auto-flow: row;
  padding: 30px 0;
  margin-top: 20px;
  border-top: 2px solid ${({ theme }) => theme.border};
  justify-items: center;
`

const ContainerBottom = styled.div`
  width: 100%;
  height: 30px;
`
