import React from 'react'
import { Link } from 'react-router-dom';

import { PiShoppingCartSimpleLight } from "react-icons/pi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { headerIconColor, iconSize } from '../constants/IconSize';

import "./Header.css";

const Header = ({headerTitle}) => {
    const headerItems = [
        {path : "/cart", icon: <PiShoppingCartSimpleLight color={headerIconColor} size={iconSize}/>},
        {path : "/notification", icon: <IoIosNotificationsOutline color={headerIconColor} size={iconSize}/>},
        {path : "/login", icon: <CiLogout color={headerIconColor} size={iconSize} />},
    ]

    const headerIcons = headerItems.map((headerIcon, index) => 
        <Link key={index} to={headerIcon.path}>
            <li className='header-button'>{headerIcon.icon}</li>
        </Link>
    )

    return (
    <div className='header'>
        <h1>{headerTitle}</h1>
        <div className='header-buttons'>
            <ul>
                {headerIcons}
            </ul>
        </div>
    </div>
    )
}

export default Header