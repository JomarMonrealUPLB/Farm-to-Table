import React, { useEffect, useState } from 'react'
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

  const [selectedIndex, setselectedIndex] = useState(0)


  return (
    <>
      <div className='nav_bar nav_bar_hidden'/>

      <div className='nav_bar'>
        <ul className='nav_bar-buttons'>
          {
            navBarItems.map((navBarItem,index) =>{
              return(
                <Link key={index} to={navBarItem.path}>
                  <li 
                    id={"nav_bar-button-" + index}
                    className='nav_bar-button'
                    onClick={(e) => {
                      setselectedIndex(index)
                    }}
                  >
                   <div id={"nav_bar-selected-" + index} className={selectedIndex === index? "nav_bar-selected": "nav_bar-selected no_display"}></div>
                   {navBarItem.icon}
                  </li>
                </Link>
              )
            })
          }
        </ul>
        <div className='nav_bar-label'>
          <div className='nav_bar-title'>F2T</div>
          <div>@2024</div>
        </div>
      </div>
    </>
  )
}



export default NavBar