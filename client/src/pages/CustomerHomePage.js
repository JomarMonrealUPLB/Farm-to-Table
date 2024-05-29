import React from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import { CgProfile } from "react-icons/cg";
import { MdOutlineShoppingBag } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import images from '../assets/images/Farm-To-Table_Designs.png'

const CustomerHomePage = () => {
  return (
    <div className='customer_homepage page'>
      <div className='flexed_center'>
        <img src={images} className='homepage-header'/>
      </div>
      <hr></hr>
      <h1>Home</h1>
      <hr></hr>
      <div className="card-container">
                <Card 
                    title="Your Profile"
                    image = {<CgProfile size ='150px' color='white' />}
                    description="Personalize to your own preference"
                    path={`/profile-page/${sessionStorage.getItem("userId")}`}
                />
                <Card 
                    title="Shop"
                    image= {<MdOutlineShoppingBag size='150px' color ='white' />}
                    description="Choose a variety of products available at our shop"
                    path="/shopping-page"
                />
                <Card 
                    title="Shopping Cart"
                    image={<MdOutlineShoppingCart size='150px' color='white'/>}
                    description="View your own purchase history and other details"
                    path="/cart"
                />
            </div>
    </div>

  )
}

export default CustomerHomePage