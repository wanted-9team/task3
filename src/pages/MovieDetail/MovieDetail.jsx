import React, { useEffect, useState } from 'react'
import { detailMovieApi } from 'utils/MovieApi'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers'

const MovieDetail = ({ id }) => {
  const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w300/'
  const BASE_LOGO_URL = 'https://image.tmdb.org/t/p/w200/'
  const currentId = useParams()

  const getDetailMovieInfo = async () => {
    return await detailMovieApi(currentId.id)
  }
  const { isLoading, error, data } = useQuery(['getDetail'], getDetailMovieInfo, {
    select: data => data.data,
  })

  const parseYear = release_date => {
    if (release_date) return release_date.split('-')[0]
  }

  useEffect(() => {
    console.log(data)
  })
  if (isLoading) return 'Loading'

  if (error) return 'An error has occured: ' + error.message

  // 제목, 포스터, 별점, 제작 연도, 장르
  return (
    <>
      {data !== [] ? (
        <TotalContainer>
          <SummaryContainer>
            <PosterImage src={`${BASE_IMG_URL}${data.poster_path}`} />
            <SummaryBodyContainer>
              <TitleContainer>
                <KOTitle>
                  {data.title} ({parseYear(data.release_date)})
                </KOTitle>
                <ENTitleAndRunningTime>
                  {data.original_title} • {data.runtime} minutes
                </ENTitleAndRunningTime>
              </TitleContainer>
              <GenreContainer>
                {data.genres.map(genre => {
                  return <Genre key={genre.id}>{genre.name}</Genre>
                })}
              </GenreContainer>
              <Tagline>{data.tagline}</Tagline>
              <OverViewTitle>개요</OverViewTitle>
              <Overview>{data.overview}</Overview>
              <OverViewTitle>제작사</OverViewTitle>
              <ProductionContainer>
                {data.production_companies.map(production => {
                  return <ProductionLogo src={`${BASE_LOGO_URL}${production.logo_path}`} />
                })}
              </ProductionContainer>
            </SummaryBodyContainer>
          </SummaryContainer>
        </TotalContainer>
      ) : (
        <div>NOT FOUND</div>
      )}
    </>
  )
}

export default MovieDetail

const TotalContainer = styled.div`
  ${({ theme }) => theme.flex('column', 'center', 'center')}
`
const SummaryContainer = styled.div`
  ${({ theme }) => theme.flex('row', 'center', 'center')}
  align-content: space-around;
`

const PosterImage = styled.img`
  width: 300px;
  height: 450px;
  border-radius: 20px;
`

const SummaryBodyContainer = styled.div`
  width: 300px;
  height: 450px;
  ${({ theme }) => theme.flex('column', 'space-around', 'start')}
  text-align: justify;
  margin: 10px;
`

const TitleContainer = styled.div`
  ${({ theme }) => theme.flex('column', 'start', 'start')}
  ${({ theme }) => theme.headerFont};
`
const KOTitle = styled.div`
  font-size: 40px;
`

const ENTitleAndRunningTime = styled.div``

const GenreContainer = styled.div`
  ${({ theme }) => theme.flex('row', 'space-around', 'center')}
`

const Genre = styled.div`
  border: solid 1px ${({ theme }) => theme.border};
  padding: 5px;
  margin: 5px;
`

const Tagline = styled.div`
  ${({ theme }) => theme.flex('column', 'start', 'center')}
  font-style: italic;
  font-size: 25px;
`
const OverViewTitle = styled.div`
  font-weight: 800;
`
const Overview = styled.div``

const ProductionContainer = styled.div`
  ${({ theme }) => theme.flex('row', 'center', 'center')}
  margin: 10px;
`

const ProductionLogo = styled.img`
  width: 70px;
  margin: 7px;
`
