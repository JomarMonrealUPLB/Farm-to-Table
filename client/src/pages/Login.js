import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {users} from '../assets/dummy_data/users'


import TitleCard from '../components/TitleCard.js';
import '../components/Login.css';
import { UserType } from '../constants/UserType.js';



const Login = (props) => {
  const dummyUsers = users;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const userRaw = await fetch(process.env.REACT_APP_API_URL+ "/auth",{
      credentials: "include",
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({email: email, password: password})
    })

    const user = await userRaw.json()

    //Checks if user exists and checks if the passwords match
    if(user[0] !== null){
      sessionStorage.setItem("userType", user.type)
      sessionStorage.setItem("userEmail", user.email)
      sessionStorage.setItem("userId", user.id)

      if(user.type === 'customer'){
        //Customer HomePage
        navigate('/customer-homepage');

      }else if (user.type === 'merchant'){
        //Admin HomePage
        navigate('/admin-homepage');
      }

    }else{
      alert("Invalid Email Address or Password!");

      setPassword('');

    }

    props.onSubmit(user.type)

  }

  useEffect(() => {
    sessionStorage.setItem("userType", UserType.GUEST)
    sessionStorage.setItem("userEmail", "")
    sessionStorage.setItem("userId", "")
  }, []);

  return (
    <div className='login_page page'>
      <div className='login_page-container'>
        <div className='login_page-card'>
          <TitleCard />
        </div>
        
        <div className='login_page-main'>
          <h1>Hello there, </h1>
          <h1>Welcome Back!</h1>
          <form className='login_page-form' onSubmit={handleLogin}>

            <div>
              <label>Email Address</label>
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div>
            <label>Password</label>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">LOGIN</button>
            
          </form>
          <p>Don't have an account yet? <Link to="/signup">Sign Up</Link></p>

        </div>    
      </div>     
    </div>
  )
}

export default Login;