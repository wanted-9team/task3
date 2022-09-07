import React from 'react'
import styled, { keyframes } from 'styled-components'
import { AiTwotoneStar } from 'react-icons/ai'

const SkeletonCard = () => {
  return (
    <MovieCardContainer>
      <MovieImageDiv></MovieImageDiv>

      <MovieContent>
        <MovieVote>
          <MovieIconDiv>
            <AiTwotoneStar />
          </MovieIconDiv>
          <MovieRateDiv></MovieRateDiv>
        </MovieVote>
        <MovieContentHeader>
          <MovieTitle></MovieTitle>
        </MovieContentHeader>
      </MovieContent>
    </MovieCardContainer>
  )
}

const SkeletonAnimation = keyframes`
    0% {
        background-color: rgba(165, 165, 165, 0.1);
        color: rgba(165, 165, 165, 0.1);

    }

    50% {
        background-color: rgba(165, 165, 165, 0.3);
        color: rgba(165, 165, 165, 0.1);

    }

    100% {
        background-color: rgba(165, 165, 165, 0.1);
        color: rgba(165, 165, 165, 0.1);

    }
`

const MovieCardContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.white};
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.1);
  width: 300px;
  height: 450px;
  margin: 2em;
  border-radius: 10px;
  translate: all 0.3s;

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
  animation: ${SkeletonAnimation} 1.8s infinite ease-in-out;

  & img {
    width: 100%;
    height: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    object-fit: cover;
    animation: ${SkeletonAnimation} 1.8s infinite ease-in-out;
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
  width: 200px;
  height: 40px;
  border-radius: 10px;
  margin: 0;
  animation: ${SkeletonAnimation} 1.8s infinite ease-in-out;
`

const MovieIconDiv = styled.div`
  color: rgb(165, 165, 165);
`

const MovieRateDiv = styled.div`
  margin-right: 10px;
  animation: ${SkeletonAnimation} 1.8s infinite ease-in-out;
`

const MovieVote = styled.div`
  font-size: 30px;
  display: flex;
  position: absolute;
  top: 5px;
  right: 5px;
`

export default SkeletonCard
