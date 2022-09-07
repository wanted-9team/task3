import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useInfiniteQuery } from '@tanstack/react-query'
import { popularMovieApi } from 'utils/MovieApi'
import Carousel from './components/Carousel'
import MovieCard from 'components/MovieCard'
import SkeletonCard from 'components/SkeletonCard'

const MovieMain = () => {
  const observerTargetEl = useRef(null)
  const { data, fetchNextPage, isFetching, isError } = useInfiniteQuery(
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
    const bottomWindow = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchNextPage()
        }
      },
      { threshold: 0.7 },
    )
    bottomWindow.observe(observerTargetEl.current)
  })

  return (
    <MainPageContainer>
      <MainPageHeader>
        <MainPageHeaderTitle>이런 영화를 추천해요</MainPageHeaderTitle>
        <Carousel />
      </MainPageHeader>
      <MainPageSection>
        <MainPageSectionTitle>요즘 인기있는 영화들</MainPageSectionTitle>
        <MovieList>
          {isError && <ErrorMessage>네트워크에 문제가 생겼습니다. 다시 시도해주세요</ErrorMessage>}
          {isFetching
            ? new Array(10).fill('').map((_, index) => <SkeletonCard key={index}></SkeletonCard>)
            : data?.map(movieList => (
                <MovieCard
                  key={movieList.id}
                  poster={movieList.poster_path}
                  title={movieList.title}
                  vote={movieList.vote_average}
                ></MovieCard>
              ))}
        </MovieList>
      </MainPageSection>
      <ContainerBottom ref={observerTargetEl}></ContainerBottom>
    </MainPageContainer>
  )
}

export default MovieMain

const MainPageContainer = styled.div`
  width: 100%;
  padding: 0 50px;
`
const MainPageHeader = styled.header``

const MainPageHeaderTitle = styled.h1`
  ${({ theme }) => theme.flex('row', 'flex-start')};
  padding: 0 10px;
  margin: 30px 0;
  border-left: 6px solid ${({ theme }) => theme.hover};
  ${({ theme }) => theme.headerFont};
`

const MainPageSection = styled.section``

const MainPageSectionTitle = styled(MainPageHeaderTitle)``

const MovieList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-flow: row;
  grid-gap: 10px;
  padding: 30px 0;
  border-top: 3px solid ${({ theme }) => theme.border};
  justify-items: center;
`

const ContainerBottom = styled.div`
  width: 100%;
  height: 30px;
`

const ErrorMessage = styled.p`
  font-size: 30px;
  color: red;
`
