import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {users} from '../assets/dummy_data/users'


import TitleCard from '../components/TitleCard.js';
import '../components/Login.css';



const Login = () => {
  const dummyUsers = users;
  console.log(dummyUsers);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = dummyUsers.find((user) => user.email === email);
    
    //Checks if user exists and checks if the passwords match
    if(user && user.password === password){
      if(user.type === 'customer'){
        //Customer HomePage
        window.location= "/customer-homepage";

      }else if (user.type === 'merchant'){
        //Admin HomePage
        window.location= "/admin-homepage";
      }

    }else{
      alert("Invalid Email Address or Password!");

      setPassword('');

    }

  }

  return (
    <div className='login_page page' style={{backgroundColor: "white"}}>
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
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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