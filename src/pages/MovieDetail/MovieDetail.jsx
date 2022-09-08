import React from 'react'
import { detailMovieApi, detailMovieVideoApi } from 'utils/MovieApi'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styled from 'styled-components'
import { AiFillStar } from 'react-icons/ai'

const MovieDetail = () => {
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

  if (isDetailLoading || isVideoLoading) return <Skeleton count={2} />

  if (detailError || videoError)
    return 'An error has occured: ' + detailError?.message + 'or' + videoError?.message

  return (
    <>
      <TotalContainer>
        <SummaryContainer>
          <PosterImage
            src={
              movieDetail.poster_path
                ? `${BASE_IMG_URL}${movieDetail.poster_path}`
                : 'https://cdn.discordapp.com/attachments/1014088216132988928/1016987090208182293/Vector.png'
            }
          />

          <SummaryBodyContainer>
            <TitleContainer>
              <KOTitle>
                {movieDetail.title}({parseYear(movieDetail.release_date)})
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
            <MovieVote>
              <MovieIconDiv>
                <AiFillStar />
              </MovieIconDiv>
              <MovieRateDiv>{movieDetail.vote_average}</MovieRateDiv>
            </MovieVote>
            <Tagline>{movieDetail.tagline}</Tagline>
            <OverViewTitle>개요</OverViewTitle>
            {movieDetail.overview !== '' ? (
              <Overview>{movieDetail.overview}</Overview>
            ) : (
              <div>한국어 개요가 존재하지 않습니다.</div>
            )}

            <OverViewTitle>제작사</OverViewTitle>
            <ProductionContainer>
              {movieDetail.production_companies.map(production => {
                if (production.logo_path !== null)
                  return <ProductionLogo src={`${BASE_LOGO_URL}${production.logo_path}`} />
                return <div></div>
              })}
            </ProductionContainer>
          </SummaryBodyContainer>
        </SummaryContainer>
        {video && video.length !== 0 ? (
          <VideoContainer>
            <VideoTitle>{video[0].name}</VideoTitle>
            <Video
              src={`${BASE_VIDEO_URL}${video[0].key}?autoplay=1&mute=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></Video>
          </VideoContainer>
        ) : (
          <NotFoundContainer>재생할 콘텐츠가 존재하지 않습니다.</NotFoundContainer>
        )}
      </TotalContainer>
    </>
  )
}

export default MovieDetail

const TotalContainer = styled.div`
  ${({ theme }) => theme.flex('column', 'center', 'center')}
  margin: 50px;
  padding: 10px;
  height: 900px;
`
const SummaryContainer = styled.div`
  ${({ theme }) => theme.flex('row', 'center', 'center')}
  align-content: space-around;
  margin-bottom: 30px;
`

const PosterImage = styled.img`
  width: 300px;
  height: 450px;
  border-radius: 20px;
`

const SummaryBodyContainer = styled.div`
  width: 500px;
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
  margin-top: 10px;
  margin-bottom: 10px;
`
const Overview = styled.div``

const ProductionContainer = styled.div`
  ${({ theme }) => theme.flex('row', 'center', 'center')}
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
  width: 500px;
  height: 400px;
`

const NotFoundContainer = styled.div`
  margin: 20px;
  font-size: 30px;
  font-weight: 600;
`

const MovieVote = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
  color: ${({ theme }) => theme.hover};
`
const MovieIconDiv = styled.div``

const MovieRateDiv = styled.div`
  margin-right: 10px;
  border-radius: 5px;
`
