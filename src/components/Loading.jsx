import React from 'react'
import styled, { keyframes } from 'styled-components'
import theme from 'styles/Theme'
const Loading = () => {
  return (
    <Wrapper>
      <Spinner />
      <h2>Loading...</h2>
    </Wrapper>
  )
}

export default Loading

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const Wrapper = styled.div`
  position: fixed;
  bottom: 10%;
  right: 1%;
  display: flex;
  align-items: center;
`
const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translate(-50%, -50%, 0);
  border-top: 3px solid ${theme.purpleLight};
  border-right: 3px solid ${theme.purpleLight};
  border-bottom: 3px solid ${theme.purpleLight};
  border-left: 6px solid ${theme.purpleDark};
  background: transparent;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`
