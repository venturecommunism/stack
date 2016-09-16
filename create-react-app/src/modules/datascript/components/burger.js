import React, { Component } from 'react'
import Menu from 'react-burger-menu'
const BurgerMenu = Menu.slide
import Navmenu from './navmenu'

class Burger extends Component {

  render() {
    return (
      <BurgerMenu>
        <Navmenu />
      </BurgerMenu>
    )
  }
}

export default Burger;
