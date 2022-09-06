import React from 'react'
import { NavLink } from 'react-router-dom'
const Header = () => {
  return (
    <div>
      <NavLink to="/upcoming">upcoming</NavLink>
      <NavLink to="/now_playing">nowplaying</NavLink>
      <NavLink to="/top_rated">upcoming</NavLink>
    </div>
  )
}

export default Header
