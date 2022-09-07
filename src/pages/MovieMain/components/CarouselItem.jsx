import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const CarouselItem = ({ movietitle, movieimg, movieOverView, backgroundColor, movieId }) => {
  const navigate = useNavigate()

  const goDetail = () => {
    navigate(`/movie_detail/${movieId}`)
  }
  return (
    <CarouselItemWrapper onClick={() => goDetail(movieId)}>
      <MovieImage src={`https://image.tmdb.org/t/p/w500/${movieimg}`} />
      <MovieTitle backgroundColor={backgroundColor}>{movietitle}</MovieTitle>
      <OverViewText>{movieOverView}</OverViewText>
    </CarouselItemWrapper>
  )
}

export default CarouselItem

const CarouselItemWrapper = styled.div`
  position: relative;
  width: 100%;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`

const MovieImage = styled.img`
  width: 100%;
  height: auto;
`

const MovieTitle = styled.p`
  ${({ theme }) => theme.headerFont}
  ${({ theme }) => theme.absolute('30px', 'none', 'none', '30px')}
  font-size: 50px;
  color: ${({ backgroundColor }) => (backgroundColor === 'dark' ? 'white' : 'black')};
  opacity: 0.8;
`

const OverViewText = styled.p`
  ${({ theme }) => theme.absolute(0, 0, 0, 0)}
  padding: 100px 80px;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  word-spacing: 3px;
  letter-spacing: 1px;
  line-height: 28px;
  opacity: 0;
  transition: all 0.4s;
  &:hover {
    opacity: 1;
  }
`
