import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useInfiniteQuery } from '@tanstack/react-query'
import { popularMovieApi } from 'utils/MovieApi'
import Carousel from './components/Carousel'
import MovieCard from 'components/MovieCard'

const MovieMain = () => {
  const observerTargetEl = useRef(null)
  const { data, fetchNextPage } = useInfiniteQuery(
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
        <MainPageHeaderTitle>추천드리는 영화들</MainPageHeaderTitle>
        <Carousel />
      </MainPageHeader>
      <MainPageSection>
        <MainPageSectionTitle>요즘 인기있는 영화들</MainPageSectionTitle>
        <MovieList>
          {data?.map(movieList => (
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
  padding: 0 10px;
  margin: 30px 0;
  border-left: 6px solid ${({ theme }) => theme.hover};
  ${({ theme }) => theme.headerFont};
`

const MainPageSection = styled.section``

const MainPageSectionTitle = styled(MainPageHeaderTitle)``

const MovieList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 2fr));
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
