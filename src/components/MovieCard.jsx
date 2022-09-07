import React from 'react'
import styled from 'styled-components'
import { AiFillStar } from 'react-icons/ai'

const MovieCard = ({ poster, title, vote }) => {
  return (
    <MovieCardContainer>
      <MovieImageDiv>
        <img src={`https://image.tmdb.org/t/p/w500/${poster}`} alt="" />
      </MovieImageDiv>
      <MovieContent>
        <MovieContentHeader>
          <MovieTitle>{title}</MovieTitle>
          <MovieVote>
            <MovieIconDiv>
              <AiFillStar />
            </MovieIconDiv>
            <MovieRateDiv>{vote}</MovieRateDiv>
          </MovieVote>
        </MovieContentHeader>
      </MovieContent>
    </MovieCardContainer>
  )
}

const MovieCardContainer = styled.div`
  background: ${({ theme }) => theme.white};
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 315px;
  margin: 2em;
  border-radius: 10px;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.08);
  }
`
const MovieImageDiv = styled.div`
  height: 360px;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  & img {
    width: 100%;
    height: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    object-fit: cover;
  }
`

const MovieContent = styled.div`
  padding: 18px 18px 24px 18px;
  margin: 0;
`

const MovieContentHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const MovieTitle = styled.div`
  font-size: 24px;
  margin: 0;
`

const MovieIconDiv = styled.div``

const MovieRateDiv = styled.div``

const MovieVote = styled.div`
  font-size: 24px;
  display: flex;
`

export default MovieCard
