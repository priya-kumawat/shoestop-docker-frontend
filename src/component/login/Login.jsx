import React, { useState } from 'react'
import '../signup/signup.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [email, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const url = 'https://shoestop-docker-backend.onrender.com/login'

    const submitHandler = async (e) => {
        if (e) e.preventDefault()
        if (!email.trim() || !password) {
            alert('Please enter both email and password')
            return
        }
        setLoading(true)
        try {
            const res = await axios.post(url, {
                email: email.trim().toLowerCase(),
                password
            })
            if (res.status === 200 || res.status === 201) {
                localStorage.clear()
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userInfo', JSON.stringify({
                    name: res.data.name || email.split('@')[0],
                    email: res.data.email || email.trim().toLowerCase(),
                    password: password
                }))
                window.location.href = '/'
            }
        } catch (err) {
            alert(err.response?.data?.error || 'Login failed. Please check your email and password.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className='signup' onSubmit={submitHandler}>
            <h3 style={{ marginBottom: '15px', fontWeight: '700' }}>Login</h3>
            <input
                type="email"
                placeholder='Email ID'
                value={email}
                onChange={(e) => setMail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Logging in...' : 'Login'}
            </button>
            <p style={{ marginTop: '15px' }}>
                New user? <Link to="/signup" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Create an account (SignUp)</Link>
            </p>
        </form>
    )
}

export default Login
