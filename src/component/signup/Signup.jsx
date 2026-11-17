import React, { useContext, useState } from 'react'
import './signup.css'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { productContext } from '../contextAPI/Context'

const Signup = () => {
  const navigate = useNavigate()
  const { setToken } = useContext(productContext)
  const [name, setName] = useState('')
  const [email, setMail] = useState('')
  const [password, setPassword] = useState('')

  const url = `${import.meta.env.VITE_API_URL || 'https://shoestop-docker-backend.onrender.com'}/signup`

  const submitHandler = () => {
    if (!name || !email || !password) {
      alert('Please fill all fields');
      return;
    }
    axios.post(url, { name, email, password })
    .then(res => {
        if (res.status === 200 || res.status === 201) {
            localStorage.setItem('token', res.data.token); localStorage.setItem('userInfo', JSON.stringify({ name: res.data.name || name, email: res.data.email || email, password: password }));
            setToken(res.data.token);
            navigate('/');
        }
    })
    .catch(err => {
        alert(err.response?.data?.message || 'Signup failed. Email may already exist.');
    });
  }

  return (
    <div className='signup'>
      <h3 style={{ marginBottom: '15px' }}>Sign Up</h3>
      <input type="text" placeholder='username' value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder='email' value={email} onChange={(e) => setMail(e.target.value)} />
      <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={submitHandler}>SignUp</button>
      <p style={{ marginTop: '15px' }}>
        Already have an account? <Link to="/login" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Login here</Link>
      </p>
    </div>
  )
}

export default Signup
