import React, { useEffect, useState } from 'react'
import { detailMovieApi, detailMovieVideoApi } from 'utils/MovieApi'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { toBeInTheDocument } from '@testing-library/jest-dom/dist/matchers'

const MovieDetail = ({ id }) => {
  const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w300/'
  const BASE_LOGO_URL = 'https://image.tmdb.org/t/p/w200/'
  const BASE_VIDEO_URL = 'https://youtube.com/embed/'
  const currentId = useParams()

  const getDetailMovieInfo = async () => {
    return await detailMovieApi(currentId.id)
  }

  const getMovieVideoInfo = async () => {
    return await detailMovieVideoApi(currentId.id)
  }
  const {
    isLoading: isDetailLoading,
    error: detailError,
    data: movieDetail,
  } = useQuery(['detail_movie'], getDetailMovieInfo, {
    select: data => data.data,
  })

  const {
    isLoading: isVideoLoading,
    error: videoError,
    data: video,
  } = useQuery(['detail_movie_video'], getMovieVideoInfo, {
    select: data => data.data.results,
  })

  const parseYear = release_date => {
    if (release_date) return release_date.split('-')[0]
  }

  useEffect(() => {
    console.log(video)
  })
  if (isDetailLoading || isVideoLoading) return 'Loading'

  if (detailError || videoError)
    return 'An error has occured: ' + detailError?.message + 'or' + videoError?.message

  // 제목, 포스터, 별점, 제작 연도, 장르
  return (
    <>
      <TotalContainer>
        <SummaryContainer>
          <PosterImage src={`${BASE_IMG_URL}${movieDetail.poster_path}`} />
          <SummaryBodyContainer>
            <TitleContainer>
              <KOTitle>
                {movieDetail.title} ({parseYear(movieDetail.release_date)})
              </KOTitle>
              <ENTitleAndRunningTime>
                {movieDetail.original_title} • {movieDetail.runtime} minutes
              </ENTitleAndRunningTime>
            </TitleContainer>
            <GenreContainer>
              {movieDetail.genres.map(genre => {
                return <Genre key={genre.id}>{genre.name}</Genre>
              })}
            </GenreContainer>
            <Tagline>{movieDetail.tagline}</Tagline>
            <OverViewTitle>개요</OverViewTitle>
            <Overview>{movieDetail.overview}</Overview>
            <OverViewTitle>제작사</OverViewTitle>
            <ProductionContainer>
              {movieDetail.production_companies.map(production => {
                return <ProductionLogo src={`${BASE_LOGO_URL}${production.logo_path}`} />
              })}
            </ProductionContainer>
          </SummaryBodyContainer>
        </SummaryContainer>
        <VideoContainer>
          <VideoTitle>{video[0].name}</VideoTitle>
          <Video
            src={`${BASE_VIDEO_URL}${video[0].key}?autoplay=1&mute=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></Video>
        </VideoContainer>
      </TotalContainer>
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

const VideoContainer = styled.div`
  ${({ theme }) => theme.flex('column', 'center', 'center')}
  align-content: space-around;
  margin-top: 30px;
`
const VideoTitle = styled.div`
  font-size: 40px;
  margin: 10px;
  font-weight: 600;
`

const Video = styled.iframe`
  width: 400px;
  height: 300px;
`
