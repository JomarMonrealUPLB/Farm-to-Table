import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {users} from '../assets/dummy_data/users'

import TitleCard from '../components/TitleCard'
import '../components/Signup.css';

const Signup = () => {
  const dummyUsers = users;

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const [confirmPassword,setConfirmPassword] = useState('');
  

  const handleSignup = async (e) => {
    e.preventDefault();

    const existingUser = dummyUsers.find((user) => user.email === email);
    if (existingUser) {
      alert('Email already exists. Please use a different email.');
      return;
    }


    //check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    //object for new user
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      type: 'customer',
      email: email,
      password: password
    };

    //add new user
    dummyUsers.push(newUser);

    //reset form 
    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
    setConfirmPassword('');

    console.log(users);

  }


  return (
    <div className='signup_page page' style={{backgroundColor: "white"}}> 
      <div className='signup_page-container'>
        <div className='login_page-card'>
          <TitleCard />
        </div>
        
        <div className='signup_page-main'>
          <h1>Welcome to, </h1>
          <h1>Farm to Table!</h1>
          <form className='signup_page-form' onSubmit={handleSignup}>
            <div>
              <label>Email Address</label>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div>
            <label>First Name</label>
              <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            <label>Last Name</label>  
              <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>

            <div>
            <label>Password</label>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <label>Confirm Password</label>  
              <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>

            <button type="submit">SIGN UP</button>
            
          </form>
          <p>Already have an account? <Link to="/">Login</Link></p>

        </div>  
      </div>
    </div>
  )
}

export default Signup