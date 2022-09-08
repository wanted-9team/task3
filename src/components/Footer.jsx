import React from 'react'
import styled from 'styled-components'
import { AiFillGithub } from 'react-icons/ai'

const Footer = () => {
  const thisYear = () => {
    const year = new Date().getFullYear()
    return year
  }
  return (
    <FooterContainer>
      <FooterCopyright>{`© ${thisYear()} 원티드 프리온보딩 코스 6차 9조`}</FooterCopyright>
      <FooterGithub>
        <FooterLink href="https://github.com/wanted-9team/task3">
          <AiFillGithub />
        </FooterLink>
      </FooterGithub>
    </FooterContainer>
  )
}

const FooterContainer = styled.div`
  width: 100%;
  height: 60px;
  background-color: #021e39;
  color: white;
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const FooterCopyright = styled.div`
  margin-left: 10px;
`

const FooterGithub = styled.div`
  font-size: 30px;
  margin-right: 10px;
`

const FooterLink = styled.a``

export default Footer
