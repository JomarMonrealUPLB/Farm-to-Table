import React from 'react'
import { Link } from 'react-router-dom';
import "./NavBar.css"

import { LiaHomeSolid } from "react-icons/lia";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { PiUserCircleLight } from "react-icons/pi";
import { iconColor, iconSize } from '../constants/IconSize';



const NavBar = () => {
  const navBarItems = [
    {path : "/", icon: <LiaHomeSolid color={iconColor} size={iconSize}/>},
    {path : "/shopping", icon: <LiaShoppingBagSolid color={iconColor} size={iconSize}/>},
    {path : "/profile", icon: <PiUserCircleLight color={iconColor} size={iconSize} />},

  ]

  return (
    <>
      <div className='nav_bar nav_bar_hidden'/>

      <div className='nav_bar'>
        <ul className='nav_bar-buttons'>
          {
            navBarItems.map((navBarItem,index) =>{
              return(
                <Link key={index} to={navBarItem.path}>
                  <li className='nav_bar-button'>
                   {navBarItem.icon}
                  </li>
                </Link>
              )
            })
          }
        </ul>
      </div>
    </>
  )
}



export default NavBar