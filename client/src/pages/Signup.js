import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TitleCard from '../components/TitleCard'
import '../components/Signup.css';

const Signup = () => {
  const [users, setUsers] = useState([])
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const [confirmPassword,setConfirmPassword] = useState('');

  useEffect(() => {
    fetch( 'http://localhost:3000/users')
    .then(response => response.json())
    .then(data => setUsers(data))
  }, [])
  
  const handleSignup = async (e) => {
    e.preventDefault();
    
    const existingUser = users.find((user) => user.email === email);
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
      middleName: "",
      lastName: lastName,
      type: 'customer',
      email: email,
      password: password
    };

    //add new user
    fetch('http://localhost:3000/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
      .then(response => {
        response.text()
        alert("User added!");
      })

    //reset form 
    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
    setConfirmPassword('');

    navigate('/login');

  }


  return (
    <div className='signup_page page' > 
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
            
            <div className='double'>
            <div>
            <label>First Name</label>
              <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div>
            <label>Last Name</label>  
              <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
            </div>

            <div className='double'>
            <div>
            <label>Password</label>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
            <label>Confirm Password</label>  
              <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
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