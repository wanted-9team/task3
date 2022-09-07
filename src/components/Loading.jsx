import React from 'react'
import styled, { keyframes } from 'styled-components'
import theme from 'styles/Theme'
const Loading = () => {
  return <Spinner />
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

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translate(-50%, -50%, 0);
  border-top: 3px solid ${theme.hover};
  border-right: 3px solid ${theme.hover};
  border-bottom: 3px solid ${theme.hover};
  border-left: 6px solid ${theme.hover};
  background: transparent;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  ${({ theme }) => theme.absolute('50%', '50%')}
`
