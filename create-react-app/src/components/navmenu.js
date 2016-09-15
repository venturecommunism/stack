import React from 'react'

const NavMenu = ({format}) => {
  return (
    <ul className={format === "burger" ? "burger-menu" : "navmenu"}>
      <li><a href='/house/messages'>Messages</a></li>
      <li><a href='/house/finances'>Finance</a></li>
      <li><a href='/house/chores'>Chores</a></li>
      <li><a href='/dashboard'>Dashboard</a></li>
    </ul>
  )
}

export default NavMenu
