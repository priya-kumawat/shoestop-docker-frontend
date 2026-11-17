import React, { useContext, useState } from 'react'
import '../signup/signup.css'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { productContext } from '../contextAPI/Context'

const Login = () => {
    const navigate = useNavigate()
    const { setToken, getcart } = useContext(productContext)
    const [email, setMail] = useState('')
    const [password, setPassword] = useState('')
  
    const url = `${import.meta.env.VITE_API_URL || 'https://shoestop-docker-backend.onrender.com'}/login`
 
    const submitHandler = () => {
      if (!email || !password) {
        alert('Please enter both email and password');
        return;
      }
      axios.post(url, { email, password })
      .then(res => {
          if (res.status === 200 || res.status === 201) {
              localStorage.setItem('token', res.data.token);
              setToken(res.data.token);
              if (getcart) getcart();
              navigate('/');
          }
      })
      .catch(err => {
          alert(err.response?.data?.error || 'Invalid email or password');
      });
    }
  
    return (
      <div className='signup'>
        <h3 style={{ marginBottom: '15px' }}>Login</h3>
        <input type="text" placeholder='email' value={email} onChange={(e) => setMail(e.target.value)} />
        <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={submitHandler}>Login</button>
        <p style={{ marginTop: '15px' }}>
          New user? <Link to="/signup" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Create an account (SignUp)</Link>
        </p>
      </div>
    )
}

export default Login
