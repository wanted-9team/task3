import React from 'react'
import styled from 'styled-components'

const MovieListPageTitle = ({ movieListQueryKey }) => {
  switch (movieListQueryKey) {
    case 'now_playing':
      return (
        <TitleWapper>
          <TitleText>박스오피스</TitleText>
        </TitleWapper>
      )
    case 'upcoming':
      return (
        <TitleWapper>
          <TitleText>상영예정</TitleText>
        </TitleWapper>
      )
    case 'top_rated':
      return (
        <TitleWapper>
          <TitleText>인기 영화</TitleText>
        </TitleWapper>
      )
    default:
      return null
  }
}

export default MovieListPageTitle

const TitleWapper = styled.div`
  ${({ theme }) => theme.flex('row', 'flex-start')}
  border-bottom: 1px solid ${({ theme }) => theme.border};
  height: 60px;
`

const TitleText = styled.h2`
  border-left: 6px solid ${({ theme }) => theme.hover};
  padding-left: 10px;
  ${({ theme }) => theme.headerFont}
`
