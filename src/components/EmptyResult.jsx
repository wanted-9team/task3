import React from 'react'
import styled from 'styled-components'
const EmptyResult = () => {
  return (
    <EmptyResultContainer>
      <h2>더이상 결과가 없습니다.! 😔</h2>
    </EmptyResultContainer>
  )
}

export default EmptyResult

const EmptyResultContainer = styled.div`
  width: 100%;
  text-align: center;
  padding: 16px 0;
`
