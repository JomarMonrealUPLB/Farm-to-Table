import React, { useState } from 'react'
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
                  <li 
                    id={"nav_bar-button-" + index}
                    className='nav_bar-button'
                    onClick={(e) => {

                      const buttons= document.querySelectorAll(`.nav_bar-button`)
                      for (const key in buttons) {
                        const button = buttons[key];
                        if(button===null) break
                        if(button.id === ("nav_bar-button-" + index)){
                          button.children[0].className="nav_bar-selected"
                        } else{
                          try{
                            button.children[0].className="nav_bar-selected no_display"
                          } catch{
                            console.log("Button null")
                          }
                        }
                      }
                      
                    }}
                  >
                   <div id={"nav_bar-selected-" + index} className='nav_bar-selected'></div>
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