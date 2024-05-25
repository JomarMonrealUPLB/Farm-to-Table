import React from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import { CgProfile } from "react-icons/cg";
import images from '../assets/images/Farm-To-Table_Designs.png'
import { GrGroup } from "react-icons/gr";
import { IoMdPaper } from "react-icons/io";
import { GoGraph } from "react-icons/go";
import { MdFormatListBulleted } from 'react-icons/md';
import { iconColor } from '../constants/IconSize';

const AdminHomePage = () => {
  return (
    <div className='admin_homepage page'>
      <div className='flexed_center'>
        <img src={images} className='homepage-header'/>
      </div>
      <hr></hr>
      <h1>Account Management</h1>
      <hr></hr>
      <div className="card-container">
                <Card 
                    title="Manage Users"
                    image = {<GrGroup size ='150px' color='white' />}
                    description="See all the users who can access the website and manage them"
                    path="/account-management"
                />
      </div>
      <hr></hr>
      <h1>Products Management</h1>
      <hr></hr>
      <div className="card-container">
                <Card 
                    title="Product Listing"
                    image = {<MdFormatListBulleted color={iconColor} size={"150px"}/>}
                    description="Manage your products here"
                    path="/product-listings"
                />
                <Card 
                    title="Fulfill Orders"
                    image= {<IoMdPaper size='150px' color ='white' />}
                    description="Verify and confirm all orders here"
                    path="/order-fulfillment"
                />
                <Card 
                    title="Sales Report"
                    image={<GoGraph size='150px' color='white'/>}
                    description="View list of products sold and financial statistics"
                    path="/sales-report"
                />
            </div>
    </div>

  )
}

export default AdminHomePage