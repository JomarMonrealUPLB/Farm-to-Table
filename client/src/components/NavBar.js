import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import "./NavBar.css"


const NavBar = (props) => {
  const navBarItems = props.navBarItems

  const [selectedIndex, setselectedIndex] = useState(0)


  return (
    <>
    <div className='nav_bar nav_bar_hidden'>
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
                   <div id={"nav_bar-selected-" + index} className={selectedIndex === index? "nav_bar-selected": "nav_bar-selected no_display"} title={navBarItem.path}></div>
                   {navBarItem.icon}
                  </li>
                </Link>
              )
            })
          }
    </div>

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
                      if(navBarItem.path === "/logout"){
                        props.onLogout()
                      }
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
        <Link to={"/"}>
          <div className='nav_bar-label'>
            <div className='nav_bar-title'>F2T</div>
            <div>@2024</div>
          </div>
        </Link>
      </div>
    </>
  )
}



export default NavBar