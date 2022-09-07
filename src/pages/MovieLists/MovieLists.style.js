import styled from 'styled-components'

export const MovieListContainer = styled.div`
  ${({ theme }) => theme.flex('row')}
  flex-wrap: wrap;
  width: 1200px;
  margin: 0 auto;
`

export const MovieCardWrapper = styled.div`
  margin-right: 10px;
  margin-bottom: 10px;
  width: 200px;
`
