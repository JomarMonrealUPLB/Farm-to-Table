import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import profile from '../assets/images/profile-picture.png'

import '../components/ProfilePage.css';
import { UserType } from '../constants/UserType';
import Header from '../components/Header';
import OrderTabs from '../components/OrderTabs';

const ProfilePage = () => {
    const {id} = useParams();
    const [user, setUser] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/users/${id}`)
          .then(response => response.json())
          .then(body => {
            console.log(body);
            setUser(body)
          })
      },[id]);

return(
    <div className='profile_page page'>
        <Header headerTitle={'User Profile'}/>
        <div className='profile_page-main-container'>
            <div className='profile-page-left'>
                <img src={profile} className='profile-picture'/>      
                <p>{user.firstName} {user.middleName} {user.lastName}</p>
                <p>Type: {user.type? user.type.toUpperCase(): ""}</p>
                {
                    sessionStorage.getItem("userType") === UserType.MERCHANT? null: 
                    <button onClick={()=>{
                            setIsEditMode(!isEditMode)
                            if(isEditMode){
                                fetch(`${process.env.REACT_APP_API_URL}/users/${id}`,
                                    {
                                        method:"PATCH",
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(user)
                                    }
                                )
                                    .then(response => {
                                    console.log(response.text());
                                    alert("Profile Updated");
                                    })
                            }
                        }} 
                        style={{backgroundColor: "white",color: "var(--primary-green-dark)",fontWeight: "bold"}}>
                            { isEditMode? "Save Profile" : "Edit Profile"}
                    </button>
                }
            </div>

            <div className='profile-page-right'>
                <div className='profile-page-gen-info'>
                    <h1>General Information</h1>    
                    <p><strong>User ID:</strong> 
                    <span style={{display: "block", padding: "0px"}}>{user._id}</span> </p>
                    <p><strong>First Name:</strong> 
                        <input 
                            className='editable_text' 
                            type='text' value={user.firstName} 
                            style={{pointerEvents: isEditMode? "auto": "none", borderBottom: isEditMode? "1px solid white": "none"}}
                            onChange={(e)=>setUser({...user, firstName: e.target.value })}
                            /> </p>
                    <p><strong>Middle Name:</strong> 
                        <input 
                            className='editable_text' 
                            type='text' value={user.middleName} 
                            style={{pointerEvents: isEditMode? "auto": "none", borderBottom: isEditMode? "1px solid white": "none"}}
                            onChange={(e)=>setUser({...user, middleName: e.target.value })}
                            /></p>
                    <p><strong>Last Name:</strong> 
                        <input 
                            className='editable_text' 
                            type='text' value={user.lastName} 
                            style={{pointerEvents: isEditMode? "auto": "none", borderBottom: isEditMode? "1px solid white": "none"}}
                            onChange={(e)=>setUser({...user, lastName: e.target.value })}
                            /></p>
                    <p><strong>Email:</strong> 
                        <input 
                            className='editable_text' 
                            type='text' value={user.email} 
                            style={{pointerEvents: isEditMode? "auto": "none", borderBottom: isEditMode? "1px solid white": "none"}}
                            onChange={(e)=>setUser({...user, email: e.target.value })}
                        />
                    </p>
                </div>
            </div>
        </div>
        <OrderTabs email={user.email}/>
    </div>

);

}

export default ProfilePage;