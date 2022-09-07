import React from 'react'
import styled from 'styled-components'
import { AiFillStar } from 'react-icons/ai'

const MovieCard = ({ poster, title, vote }) => {
  return (
    <MovieCardContainer>
      <MovieImageDiv>
        <img
          src={
            poster
              ? `https://image.tmdb.org/t/p/w300/${poster}`
              : 'https://cdn.discordapp.com/attachments/1014088216132988928/1016987090208182293/Vector.png'
          }
          alt=""
        />
      </MovieImageDiv>

      <MovieContent>
        <MovieVote>
          <MovieIconDiv>
            <AiFillStar />
          </MovieIconDiv>
          <MovieRateDiv>{vote}</MovieRateDiv>
        </MovieVote>
        <MovieContentHeader>
          <MovieTitle>{title}</MovieTitle>
        </MovieContentHeader>
      </MovieContent>
    </MovieCardContainer>
  )
}

const MovieCardContainer = styled.div`
  cursor: pointer;
  background: ${({ theme }) => theme.white};
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.1);
  width: 300px;
  height: 450px;
  margin: 2em;
  border-radius: 10px;
  transition: all 0.3s;
  position: relative;

  &:hover {
    transform: scale(1.1);
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
  padding: 10px 18px 36px 18px;
  margin: 0;
  ${({ theme }) => theme.flex}
`

const MovieContentHeader = styled.div`
  width: 100%;
  ${({ theme }) => theme.flex}
`

const MovieTitle = styled.div`
  font-size: 24px;
  margin: 0;
  line-height: 28px;
`

const MovieIconDiv = styled.div``

const MovieRateDiv = styled.div`
  margin-right: 10px;
  border-radius: 5px;
`

const MovieVote = styled.div`
  font-size: 30px;
  display: flex;
  align-items: center;
  position: absolute;
  top: 5px;
  right: 5px;
  color: ${({ theme }) => theme.hover};
`

export default MovieCard
