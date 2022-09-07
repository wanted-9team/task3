import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { AiOutlineMenu } from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai'
import { AiOutlineSearch } from 'react-icons/ai'

const Header = () => {
  const [showLinks, setShowLinks] = useState(false)

  return (
    <NavBar>
      <LeftSide>
        <Links showLinks={showLinks}>
          <div>
            <NavLink to="/">Home</NavLink>
          </div>
          <div>
            <NavLink to="/upcoming">Upcoming</NavLink>
          </div>
          <div>
            <NavLink to="/now_playing">Now Playing </NavLink>
          </div>
          <div>
            <NavLink to="/top_rated">Top Rated</NavLink>
          </div>
        </Links>
        <MenuButton
          onClick={() => {
            setShowLinks(!showLinks)
          }}
        >
          {!showLinks ? <AiOutlineMenu /> : <AiOutlineClose />}
        </MenuButton>
      </LeftSide>
      <RightSide>
        <NavInput type="text" placeholder="" />
        <NavButton>
          <AiOutlineSearch />
        </NavButton>
      </RightSide>
    </NavBar>
  )
}

const NavBar = styled.div`
  background-color: #021e39;
  width: 100%;
  height: 80px;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  color: #fff;
`

const LeftSide = styled.div`
  flex: 50%;
  display: flex;
  justify-content: left;
  align-items: center;
`

const Links = styled.div`
  max-height: 80px;
  font-size: 25px;
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
        background-color: #021e39;
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
    margin-left: 15px;
    @media only screen and (max-width: 768px) {
      font-size: 20px;
    }
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

const RightSide = styled.div`
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
