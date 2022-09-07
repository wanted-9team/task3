import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { AiOutlineMenu, AiOutlineHome, AiOutlineClose, AiOutlineSearch } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()
  const [showLinks, setShowLinks] = useState(false)
  const [searchWords, setSearchWords] = useState('')

  const handleSearchSubmit = e => {
    e.preventDefault()
    searchWords
      ? navigate('/search_results', { state: searchWords })
      : alert('검색어를 입력해주세요.')
  }

  return (
    <NavBar>
      <LeftSide>
        <Links showLinks={showLinks}>
          <NavLink to="/">
            <NavBarBtn>
              <AiOutlineHome />
            </NavBarBtn>
          </NavLink>
          <NavLink to="/upcoming">
            <NavBarBtn>#상영예정</NavBarBtn>
          </NavLink>
          <NavLink to="/now_playing">
            <NavBarBtn>#박스오피스</NavBarBtn>
          </NavLink>
          <NavLink to="/top_rated">
            <NavBarBtn>#인기</NavBarBtn>
          </NavLink>
        </Links>
        <MenuButton
          onClick={() => {
            setShowLinks(!showLinks)
          }}
        >
          {!showLinks ? <AiOutlineMenu /> : <AiOutlineClose />}
        </MenuButton>
      </LeftSide>
      <RightSide onSubmit={handleSearchSubmit}>
        <NavInput type="text" placeholder="" onChange={e => setSearchWords(e.target.value)} />
        <NavButton>
          <AiOutlineSearch />
        </NavButton>
      </RightSide>
    </NavBar>
  )
}

const NavBar = styled.div`
  background-color: ${({ theme }) => theme.navy};
  width: 100%;
  height: 80px;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  color: #fff;
`

const NavBarBtn = styled.div`
  transition: all 0.3s;
  padding: 6px 5px;
  height: 100%;
  &:hover {
    background-color: ${({ theme }) => theme.hover};
    color: ${({ theme }) => theme.navy};
    border-radius: 2px;
  }
`

const LeftSide = styled.div`
  flex: 50%;
  display: flex;
  justify-content: left;
  align-items: center;
`

const Links = styled.div`
  max-height: 80px;
  font-size: 22px;
  display: flex;

  @media only screen and (max-width: 768px) {
    display: none;
    ${({ showLinks }) =>
      showLinks &&
      css`
        position: absolute;
        left: 0px;
        top: 80px;
        height: 180px;
        width: 100%;
        background-color: ${({ theme }) => theme.navy};
        display: flex;
        flex-direction: column;
        align-items: center;
        max-height: 230px;
        & div {
          margin: 10px;
          font-size: 25px;
        }
      `}
  }

  & div {
    margin-left: 20px;
    @media only screen and (max-width: 768px) {
      font-size: 20px;
    }
  }
  a {
    height: 100%;
  }
`

const MenuButton = styled.button`
  color: white;
  margin-left: 20px;
  font-size: 20px;
  display: none;
  @media only screen and (max-width: 768px) {
    display: flex;
  }
`

const RightSide = styled.form`
  flex: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 25px;
`

const NavInput = styled.input`
  width: 220px;
  height: 30px;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  padding-left: 15px;
  color: black;
`

const NavButton = styled.button`
  color: #fff;
  height: 32px;
  width: 70px;
  font-size: 25px;
`

export default Header
