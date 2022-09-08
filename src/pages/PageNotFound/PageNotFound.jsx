import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const PageNotFound = () => {
  const [count, setCount] = useState(5)
  const navigate = useNavigate()
  useEffect(() => {
    const countTimer = setInterval(() => {
      setCount(prev => prev - 1)
    }, 1000)

    const resetTimer = setTimeout(() => {
      clearInterval(countTimer)
      navigate('/', { replace: true })
    }, 6000)

    return () => clearTimeout(resetTimer)
  }, [])

  return (
    <PageContainer>
      <h3>잘못된 접근입니다.</h3>
      <br />
      <h3>{count}초 후에 메인페이지로 이동합니다.</h3>
    </PageContainer>
  )
}

export default PageNotFound

const PageContainer = styled.div`
  ${({ theme }) => theme.flex('column')}
  ${({ theme }) => theme.headerFont};
  text-align: center;
  height: calc(100vh - 120px);
`
