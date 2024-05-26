import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import header from '../assets/images/Farm-To-Table_Designs.png'
import profile from '../assets/images/profile-picture.png'

import '../components/ProfilePage.css';

const ProfilePage = () => {
    const {id} = useParams();
    const [user, setUser] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/users/${id}`)
          .then(response => response.json())
          .then(body => {
            console.log(body);
            setUser(body)
          })
      },[id]);

return(
    <div className='profile_page page'>
        <div className='flexed_center'>
        <img src={header} className='homepage-header'/>
        </div>

        <hr></hr>
        <h1>Profile</h1>
        <hr></hr>

        <div className='profile_page-main-container'>
            <div className='profile-page-left'>
                <img src={profile} className='profile-picture'/>      
                <p>{user.firstName} {user.middleName} {user.lastName}</p>
                <p>Type: {user.type}</p>
            </div>

            <div className='profile-page-right'>
                <div className='profile-page-gen-info'>
                <h1>General Information</h1>    
                <p><strong>User ID:</strong> {user._id}</p>
                <p><strong>First Name:</strong> {user.firstName}</p>
                <p><strong>Middle Name:</strong> {user.middleName}</p>
                <p><strong>Last Name:</strong> {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>

                </div>
                <div>
                    <h1>Table History of Orders</h1>
                </div>
        </div>

        </div>

    </div>

);

}

export default ProfilePage;