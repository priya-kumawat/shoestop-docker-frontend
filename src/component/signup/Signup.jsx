import React, { useState } from 'react'
import './signup.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setMail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const url = 'https://shoestop-docker-backend.onrender.com/signup'

    const submitHandler = async (e) => {
        if (e) e.preventDefault()
        if (!name.trim() || !email.trim() || !password) {
            alert('Please fill all fields')
            return
        }
        setLoading(true)
        try {
            const res = await axios.post(url, {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                password
            })
            if (res.status === 200 || res.status === 201) {
                localStorage.clear()
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('userInfo', JSON.stringify({
                    name: res.data.name || name.trim(),
                    email: res.data.email || email.trim().toLowerCase(),
                    password: password
                }))
                window.location.href = '/'
            }
        } catch (err) {
            alert(err.response?.data?.message || 'Signup failed. Email may already exist.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form className='signup' onSubmit={submitHandler}>
            <h3 style={{ marginBottom: '15px', fontWeight: '700' }}>Create Account</h3>
            <input
                type="text"
                placeholder='Username'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
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
                {loading ? 'Creating Account...' : 'SignUp'}
            </button>
            <p style={{ marginTop: '15px' }}>
                Already have an account? <Link to="/login" style={{ fontWeight: 'bold', textDecoration: 'underline' }}>Login here</Link>
            </p>
        </form>
    )
}

export default Signup
